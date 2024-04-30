const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const path = require("path");
const upload = require("../multer");
const cloudinary = require("../cloudinary");
const router = express.Router();

// create new message
router.post(
  "/create-new-message",
  upload?.single("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Upload image to cloudinary
      const result = req.file
        ? await cloudinary.uploader.upload(req.file.path, {
            folder: "conversation",
          })
        : null;

      const messageData = req.body;

      if (req.file) {
        // const filename = req.file.filename;
        // const fileUrl = path.join(filename);
        messageData.images = result.secure_url;
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

//delete message with messageId
router.delete(
  "/delete-messages/:id",
  catchAsyncErrors(async (req, res, next) => {try {
    const messageId = req.params.id;
    const deletedMessage = await Messages.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

     // Extract the image key from the message URL
     const imageUrl = deletedMessage.images;
     if(imageUrl){
     const imageKey = imageUrl.substring(imageUrl.lastIndexOf("/") + 1, imageUrl.lastIndexOf("."));

     // Delete the image from Cloudinary
     await cloudinary.uploader.destroy('conversation/' + imageKey);
}
    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
})
)

module.exports = router;
