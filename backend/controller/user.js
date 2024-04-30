const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const User = require("../model/user");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const upload = require("../multer");
const cloudinary = require("../cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const activateTemplateEmail = require("../emailTemplates/activate");
const resetTemplateEmail = require("../emailTemplates/reset");

// Route to create a new user
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(createUser)
);

// Route to activate user account
router.post("/activation", catchAsyncErrors(activateUser));

// Route to log in a user
router.post("/login-user", catchAsyncErrors(loginUser));

// Route to get user information
router.get("/getuser", isAuthenticated, catchAsyncErrors(getUser));

// Route to log out a user
router.get("/logout", catchAsyncErrors(logoutUser));

// Route for user forgot password
router.post("/forgot-password", catchAsyncErrors(forgotPassword));

// Route for verifying reset Token
router.get("/reset/:reset_token", catchAsyncErrors(resetVerify));

// Route for resetting user password
router.post("/reset", catchAsyncErrors(resetPassword));

// Route to update user information
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(updateUserInfo)
);

// Route to update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(updateAvatar)
);

// Route to update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(updateUserAddresses)
);

// Route to delete a user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(deleteUserAddress)
);

// Route to update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(updateUserPassword)
);

// Route to get user information by ID (for admins)
router.get("/user-info/:id", catchAsyncErrors(getUserInfoById));

// Route to get all users (for admins)
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(getAllUsers)
);

// Route to delete a user (for admins)
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(deleteUser)
);

module.exports = router;

// Controller functions

async function createUser(req, res, next) {
  try {
    if (!req.file?.path) {
      return res.status(400).json({ message: "Upload Profile Avatar" });
    }

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile",
    });

    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please Enter all Fields" });
    }
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `${process.env.CLIENT_URL1}/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        name: user.name,
        url: activationUrl,
        subject: "Activate your account",
        template: activateTemplateEmail,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}

async function activateUser(req, res, next) {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const { name, email, password, avatar, cloudinary_id } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    user = await User.create({
      name,
      email,
      avatar,
      password,
      cloudinary_id,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function logoutUser(req, res, next) {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = generateResetToken(user);
    const resetUrl = `${process.env.CLIENT_URL1}/reset/${resetToken}`;

    await sendMail({
      email: user.email,
      name: user.name,
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

async function resetVerify(req, res, next) {
  try {
    const { reset_token } = req.params;

    const decoded = jwt.verify(reset_token, process.env.RESET_SECRET);
    if (!decoded) {
      return next(new ErrorHandler("Expired or invalid token", 400));
    }
    res
      .status(200)
      .json({ success: true, message: "Reset Token Verified!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.status || 500));
  }
}

async function resetPassword(req, res, next) {
  try {
    const { reset_token, password } = req.body;

    const decoded = jwt.verify(reset_token, process.env.RESET_SECRET);

    if (!decoded) {
      return next(new ErrorHandler("Expired or invalid token", 400));
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Reset Token Verified!" });
  } catch (error) {
    return next(new ErrorHandler(error.message, error.status || 500));
  }
}
async function updateUserInfo(req, res, next) {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function updateAvatar(req, res, next) {
  try {
    const existsUser = await User.findById(req.user.id);

    // Delete image from cloudinary
    if (existsUser?.cloudinary_id) {
      await cloudinary.uploader.destroy(existsUser?.cloudinary_id);
    }

    // Upload image to cloudinary

    const data = await cloudinary.uploader.upload(req.file.path);
    const user = await User.findByIdAndUpdate(req.user.id, {
      avatar: data?.secure_url,
      cloudinary_id: data?.public_id,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function updateUserAddresses(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      return next(
        new ErrorHandler(`${req.body.addressType} address already exists`)
      );
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      // add the new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function deleteUserAddress(req, res, next) {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function updateUserPassword(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password doesn't matched with each other!", 400)
      );
    }
    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function getUserInfoById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

//Admin Access

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User is not available with this id", 400));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

// Helper functions

function createActivationToken(user) {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "30m",
  });
}

function generateResetToken(user) {
  return jwt.sign({ id: user._id }, process.env.RESET_SECRET, {
    expiresIn: "30m",
  });
}
