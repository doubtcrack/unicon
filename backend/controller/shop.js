const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const upload = require("../multer");
const cloudinary = require("../cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const activateTemplateEmail = require("../emailTemplates/activate");
const resetTemplateEmail = require("../emailTemplates/reset");

// Create shop
router.post(
  "/create-shop",
  upload.single("file"),
  catchAsyncErrors(createShop)
);

// Activate seller
router.post("/activation", catchAsyncErrors(activateSeller));

// Login shop
router.post("/login-shop", catchAsyncErrors(loginShop));

// Get shop info
router.get("/getSeller", isSeller, catchAsyncErrors(getSeller));

// Logout from shop
router.get("/logout", catchAsyncErrors(logout));

// Forgot password
router.post("/forgot-password", catchAsyncErrors(forgotPassword));

// Reset password
router.put("/reset", catchAsyncErrors(resetPassword));

// Get shop info by ID
router.get("/get-shop-info/:id", catchAsyncErrors(getShopInfo));

// Update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(updateShopAvatar)
);

// Update seller info
router.put("/update-seller-info", isSeller, catchAsyncErrors(updateSellerInfo));

// Admin routes
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(getAllSellers)
);
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(deleteSeller)
);

module.exports = router;

// Controller functions

async function createShop(req, res, next) {
  try {
    if (!req.file?.path) {
      return res.status(400).json({ message: "Upload Profile Avatar" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "contributor",
    });

    const { name, email, password } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return res.status(400).json({ message: "Account already exists" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please Enter all Fields" });
    }

    const seller = new Shop({
      name: name,
      email: email,
      password: password,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    });

    const activationToken = createActivationToken(seller);

    const activationUrl = `${process.env.CLIENT_URL1}/seller/activation/${activationToken}`;

    await sendMail({
      email: seller.email,
      name: seller.name,
      url: activationUrl,
      subject: "Activate your Seller Account",
      template: activateTemplateEmail,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email (${seller.email}) to activate your shop!`,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function activateSeller(req, res, next) {
  try {
    const { activation_token } = req.body;
    const newSeller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );
    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const {
      name,
      email,
      password,
      avatar,
      cloudinary_id,
      address,
      phoneNumber,
    } = newSeller;
    let seller = await Shop.findOne({ email });

    if (seller) {
      return next(new ErrorHandler("Seller already exists", 400));
    }

    seller = await Shop.create({
      name,
      email,
      avatar,
      password,
      cloudinary_id,
      address,
      phoneNumber,
    });
    sendShopToken(seller, 201, res);
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function loginShop(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }

    const seller = await Shop.findOne({ email }).select("+password");
    if (!seller) {
      return next(new ErrorHandler("Seller doesn't exist!", 400));
    }

    const isPasswordValid = await seller.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide correct information", 400));
    }

    sendShopToken(seller, 201, res);
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function getSeller(req, res, next) {
  try {
    const seller = await Shop.findById(req.seller._id);
    if (!seller) {
      return next(new ErrorHandler("Seller doesn't exist", 400));
    }
    res.status(200).json({ success: true, seller });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function logout(req, res, next) {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({ success: true, message: "Logout successful!" });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const seller = await Shop.findOne({ email });

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 404));
    }

    const resetToken = generateResetToken(seller);
    const resetUrl = `${process.env.CLIENT_URL1}/seller/reset/${resetToken}`;

    await sendMail({
      email: seller.email,
      name: seller.name,
      url: resetUrl,
      subject: "Password Reset",
      template: resetTemplateEmail,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function resetPassword(req, res, next) {
  try {
    const { reset_token } = req.body;

    const decoded = jwt.verify(reset_token, process.env.RESET_SECRET);

    if (!decoded) {
      return next(new ErrorHandler("Expired or invalid token", 400));
    }
    const { email } = decoded;

    const seller = await Shop.findById(email);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 404));
    }

    seller.password = password;
    await seller.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function getShopInfo(req, res, next) {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({ success: true, shop });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function updateShopAvatar(req, res, next) {
  try {
    const existsSeller = await Shop.findById(req.seller._id);
    await cloudinary.uploader.destroy(existsSeller.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      avatar: result?.secure_url,
      cloudinary_id: result?.public_id,
    });
    res.status(200).json({ success: true, seller });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function updateSellerInfo(req, res, next) {
  try {
    const { name, description, address, phoneNumber } = req.body;
    const shop = await Shop.findById(req.seller._id);
    if (!shop) {
      return next(new ErrorHandler("Seller not found", 400));
    }
    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.phoneNumber = phoneNumber;
    await shop.save();
    res.status(201).json({ success: true, shop });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function getAllSellers(req, res, next) {
  try {
    const sellers = await Shop.find().sort({ createdAt: -1 });
    res.status(201).json({ success: true, sellers });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function deleteSeller(req, res, next) {
  try {
    const seller = await Shop.findById(req.params.id);
    if (!seller) {
      return next(
        new ErrorHandler("Seller is not available with this id", 400)
      );
    }
    await Shop.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ success: true, message: "Seller deleted successfully!" });
  } catch (error) {
    next(new ErrorHandler(error.message, error.status || 500));
  }
}

// Helper functions

function createActivationToken(seller) {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
}

function generateResetToken(seller) {
  return jwt.sign({ id: seller._id }, process.env.RESET_SECRET, {
    expiresIn: "30m",
  });
}
