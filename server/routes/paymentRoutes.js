const express = require("express");
const multer = require("multer");
const {
  createPayment,
  updatePaymentStatus,
  getPayments,
} = require("../controllers/paymentController");
const { trainerAuth, auth } = require("../middlewares/authMiddleware");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", auth, upload.single("image"), createPayment);
router.put("/status", trainerAuth, updatePaymentStatus);
router.get("/", trainerAuth, getPayments);

module.exports = router;
