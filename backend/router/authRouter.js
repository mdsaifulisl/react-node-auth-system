const express = require("express");
const router = express.Router();
const db = require("../db/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saiful01741899@gmail.com",
    pass: "cvvhhuhcrclslews",
  },
});

// -------- Register Route --------
router.post("/register", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (result.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const otp = generateOTP();

    db.query(
      "INSERT INTO users (name, email, otp, otp_expires_at, is_verified) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE), 0)",
      [name, email, otp],
      (err) => {
        if (err) {
          console.error("Insert Error:", err);
          return res.status(500).json({ message: "User creation failed" });
        }

        transporter.sendMail({
          from: "saiful01741899@gmail.com",
          to: email,
          subject: "Verify your account",
          text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        });

        res.json({ message: "Registration successful. OTP sent to email." });
      }
    );
  });
});

// -------- Verify OTP Route --------
router.post("/verify-otp", async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password)
    return res
      .status(400)
      .json({ message: "Email, OTP and Password required" });

  db.query(
    "SELECT * FROM users WHERE email = ? AND otp = ? AND otp_expires_at > NOW()",
    [email, otp],
    async (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (result.length === 0)
        return res.status(400).json({ message: "Invalid or expired OTP" });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "UPDATE users SET password = ?, otp = NULL, otp_expires_at = NULL, is_verified = 1 WHERE email = ?",
        [hashedPassword, email],
        (err) => {
          if (err) {
            console.error("Password save error:", err);
            return res.status(500).json({ message: "Password save failed" });
          }

          res.json({ message: "OTP verified and password saved successfully" });
        }
      );
    }
  );
});

// --------Login----------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (result.length === 0)
        return res.status(400).json({ message: "Invalid email or password" });

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      res.json({ message: "Login successful" });
    }
  );
});

// Forgot
router.post("/forgot-otp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    db.query(
      "UPDATE users SET otp = ?, otp_expires_at = ? WHERE email = ?",
      [otp, expiresAt, email],
      (err2) => {
        if (err2) {
          return res.status(500).json({ message: "OTP save failed" });
        }

        transporter.sendMail({
          from: "saiful01741899@gmail.com",
          to: email,
          subject: "Password Reset OTP",
          text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        });

        return res.json({
          success: true,
          message: "OTP sent to your email",
        });
      }
    );
  });
});

router.post("/forgot-verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  db.query(
    "SELECT id FROM users WHERE email = ? AND otp = ? AND otp_expires_at > NOW()",
    [email, otp],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      return res.json({
        success: true,
        message: "OTP verified",
      });
    }
  );
});


router.post("/set-new-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Email not found" });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "UPDATE users SET password = ?, otp = NULL, otp_expires_at = NULL WHERE email = ?",
          [hashedPassword, email],
          (err2) => {
            if (err2) {
              return res
                .status(500)
                .json({ message: "Password update failed" });
            }

            return res.json({
              success: true,
              message: "Password updated successfully",
            });
          }
        );
      } catch (error) {
        return res.status(500).json({ message: "Hashing failed" });
      }
    }
  );
});

module.exports = router;


