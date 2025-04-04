const FeedbackModel = require("../models/FeedbackModel");

// Post Feedback
const PostFeedback = async (req, res) => {
    try {
        const {
            clientName,
            designation,
            company,
            comment,
            systemCapacity,
            systemType,
            location,
            annual_energy_generation,
            annual_savings
        } = req.body;

        // Check for missing fields
        if (![clientName, designation, company, comment, systemCapacity, systemType, location, annual_energy_generation, annual_savings].every(Boolean)) {
            return res.status(400).json({ msg: "Please provide all required fields" });
        }

        // Create new feedback
        const newFeedback = await FeedbackModel.create({
            clientName,
            designation,
            company,
            comment,
            systemCapacity,
            systemType,
            location,
            annual_energy_generation,
            annual_savings
        });

        return res.status(201).json({ msg: "Feedback successfully added", data: newFeedback });
    } catch (error) {
        console.error("Error adding feedback:", error);
        return res.status(500).json({ msg: "Internal server error occurred", error: error.message });
    }
};

// Fetch All Feedbacks
const FetchFeedback = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find({});

        if (!feedbacks.length) {
            return res.status(404).json({ msg: "No feedbacks found" });
        }

        return res.status(200).json({ msg: "Feedbacks fetched successfully", data: feedbacks });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return res.status(500).json({ msg: "Internal server error occurred", error: error.message });
    }
};

// Delete One Feedback by ID
const DeleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return res.status(404).json({ msg: "Feedback not found" });
        }

        return res.status(200).json({ msg: "Feedback deleted successfully" });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        return res.status(500).json({ msg: "Internal server error occurred", error: error.message });
    }
};

// Delete All Feedbacks
const DeleteAllFeedbacks = async (req, res) => {
    try {
        await FeedbackModel.deleteMany({});
        return res.status(200).json({ msg: "All feedbacks deleted successfully" });
    } catch (error) {
        console.error("Error deleting all feedbacks:", error);
        return res.status(500).json({ msg: "Internal server error occurred", error: error.message });
    }
};

// Update Feedback by ID
const UpdateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedFeedback = await FeedbackModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedFeedback) {
            return res.status(404).json({ msg: "Feedback not found" });
        }

        return res.status(200).json({ msg: "Feedback updated successfully", data: updatedFeedback });
    } catch (error) {
        console.error("Error updating feedback:", error);
        return res.status(500).json({ msg: "Internal server error occurred", error: error.message });
    }
};

module.exports = { PostFeedback, FetchFeedback, DeleteFeedback, DeleteAllFeedbacks, UpdateFeedback };
