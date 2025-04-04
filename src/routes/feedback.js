const express = require("express");
const {
    PostFeedback,
    FetchFeedback,
    DeleteFeedback,
    DeleteAllFeedbacks,
    UpdateFeedback
} = require("../controllers/FeedbackController");

const router = express.Router();

// Create Feedback
router.post("/postfeedback", PostFeedback);

// Get All Feedbacks
router.get("/fetch-All-Feedbacks", FetchFeedback);

// Delete One Feedback by ID
router.delete("/deletefeedback/:id", DeleteFeedback);

// Delete All Feedbacks
router.delete("/delete-All-Feedbacks", DeleteAllFeedbacks);

// Update Feedback by ID
router.put("/updatefeedback/:id", UpdateFeedback);

module.exports = router;
