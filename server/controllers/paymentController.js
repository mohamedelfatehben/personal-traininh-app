const Payment = require("../models/Payment");
const User = require("../models/User");
const Plan = require("../models/Plan");

// Create payment
exports.createPayment = async (req, res) => {
  const { userId, planId, amount, type, subscriptionEnd } = req.body;
  const image = req.file;

  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    const paymentData = {
      user: userId,
      plan: planId,
      amount,
      type,
      status: "pending",
      subscriptionEnd,
    };

    if (type === "remote") {
      if (!image) {
        return res
          .status(400)
          .json({ msg: "Image is required for remote payments" });
      }
      paymentData.image = image.buffer.toString("base64");
    }

    const payment = new Payment(paymentData);
    await payment.save();

    user.nextPayment = payment._id;
    await user.save();

    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  const { paymentId, status } = req.body;

  try {
    const payment = await Payment.findById(paymentId).populate("plan");

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    payment.status = status;
    await payment.save();

    // If the payment is accepted, update the user's current plan and subscription end date
    if (status === "accepted") {
      const user = await User.findById(payment.user);
      const plan = payment.plan;
      let subscriptionEndDate;
      const currentDate = new Date();

      if (plan.paymentType === "monthly") {
        subscriptionEndDate = new Date(
          currentDate.setMonth(currentDate.getMonth() + 1)
        );
      } else if (plan.paymentType === "15 days") {
        subscriptionEndDate = new Date(
          currentDate.setDate(currentDate.getDate() + 15)
        );
      } else if (plan.paymentType === "weekly") {
        subscriptionEndDate = new Date(
          currentDate.setDate(currentDate.getDate() + 7)
        );
      } else if (plan.paymentType === "by day" && plan.days) {
        subscriptionEndDate = new Date(
          currentDate.setDate(currentDate.getDate() + plan.days)
        );
      }

      user.subscriptionEnd = subscriptionEndDate;
      user.currentPlan = plan._id;
      user.currentPayment = user.nextPayment;
      user.nextPayment = null;
      await user.save();
    }
    const updatedUser = await User.findById(payment.user)
      .populate("currentPlan")
      .populate("currentPayment")
      .populate({
        path: "nextPayment",
        populate: {
          path: "plan", // Populate plan details within nextPayment
        },
      });
    res.json({ payment, updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update an existing payment
exports.updatePayment = async (req, res) => {
  const { amount, type, subscriptionEnd } = req.body;
  const { paymentId } = req.params;
  const image = req.file;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    payment.amount = amount || payment.amount;
    payment.type = type || payment.type;
    payment.subscriptionEnd = subscriptionEnd || payment.subscriptionEnd;

    if (type === "remote" && image) {
      payment.image = image.buffer.toString("base64");
      payment.status = "pending";
    }

    const plan = await Plan.findById(payment.plan);
    await payment.save();
    res.json({ ...payment._doc, plan: plan });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user").populate("plan");
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
