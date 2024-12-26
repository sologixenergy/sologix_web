const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");
const Admin = Controllers.Admin;

// User Management
router.post("/users", Admin.AddUser); // POST /api/users - Create a new user
router.get("/users/:id", Admin.GetUserById); // GET /api/users/:id - Get user by ID
router.get("/users/role/:role", Admin.GetUsersByRole); // GET /api/users/role/:role - Get users by role
router.get("/users", Admin.GetAllUsers); // GET /api/users - Get all users
router.put("/users/:id", Admin.UpdateUser); // PUT /api/users/:id - Update a user
router.delete("/users/:id", Admin.DeleteUser); // DELETE /api/users/:id - Delete a user

// Contact Form Data
router.get("/contact-form/:id", Admin.GetContactFormData); // GET /api/contact-form/:id - Get contact form data by ID
router.get("/contact-form", Admin.GetAllContactFormData); // GET /api/contact-form - Get all contact form data
router.put("/contact-form/:id", Admin.UpdateContactFormData); // PUT /api/contact-form/:id - Update contact form data

// Partnership Requests
router.get("/partnership-requests", Admin.GetAllPartnershipRequests); // GET /api/partnership-requests - Get all partnership requests
router.get("/partnership-requests/:id", Admin.GetPartnershipRequestById); // GET /api/partnership-requests/:id - Get partnership request by ID

// Purchases
router.get("/purchases", Admin.GetAllPurchases); // GET /api/purchases - Get all purchases
router.get("/purchases/:id", Admin.GetPurchaseById); // GET /api/purchases/:id - Get purchase by ID
module.exports = router;
