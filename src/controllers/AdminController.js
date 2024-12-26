const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../config/vars");
const {
  User,
  ProfilePicture,
  Customer,
  Employee,
  OTPModel,
  Contact,
  PartnerRequest,
  Purches,
} = require("../models");
const saltRounds = 10;
const {
  IsExists,
  Insert,
  FindOne,
  Find,
  CompressImageAndUpload,
  FindAndUpdate,
  Delete,
  HandleSuccess,
  HandleError,
  HandleServerError,
  Aggregate,
  ValidateEmail,
  PasswordStrength,
  ValidateAlphanumeric,
  ValidateLength,
  ValidateMobile,
  GeneratePassword,
  IsExistsOne,
} = require("./BaseController");

module.exports = {
  AddUser: async (req, res, next) => {
    try {
      const { name, phone, email, password, role } = req.body;

      if (password === "") {
        return HandleError(res, "Please enter the password !");
      }

      if (!ValidateEmail(email.trim())) {
        return HandleError(
          res,
          "Please enter a valid email id i.e abc@gmail.com"
        );
      }

      let isUserExists = await IsExistsOne({
        model: User,
        where: { email: email },
      });
      if (isUserExists) {
        return HandleError(res, "Email already exists!");
      }

      isUserExists = await IsExistsOne({
        model: User,
        where: { phone },
      });
      if (isUserExists) {
        return HandleError(res, "Phone already exists!");
      }

      const password_hash = await bcrypt.hash(password, saltRounds);

      const createUser = await Insert({
        model: User,
        data: { name, email, phone, password: password_hash, role },
      });

      if (!createUser) {
        return HandleError(res, "Failed to Register !");
      }

      return HandleSuccess(res, createUser);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  GetUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) return HandleError(res, "User ID is required !");
      const user = await FindOne({
        model: User,
        where: {
          _id: id,
        },
      });
      if (!user) return HandleError(res, "User Not Found !");
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  GetUsersByRole: async (req, res, next) => {
    try {
      const { role } = req.params;

      if (!role) {
        return HandleError(res, "Role parameter is required !");
      }

      // Assuming you have a User model and a FindAll function
      const users = await Find({
        model: User,
        where: {
          role: role,
        },
      });

      if (!users || users.length === 0) {
        return HandleError(res, `No users found with role '${role}'`);
      }

      return HandleSuccess(res, users);
    } catch (err) {
      return HandleServerError(res, req, err);
    }
  },
  GetAllUsers: async (req, res, next) => {
    try {
      const users = await Find({
        model: User,
      });
      if (!users || users.length === 0) {
        return HandleError(res, "No users found!");
      }
      return HandleSuccess(res, users);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  //update a user
  UpdateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, phone, email, password, confirmPassword, role } = req.body;
      if (!id) return HandleError(res, "User ID is required!");
      let user = await FindOne({
        model: User,
        where: {
          _id: id,
        },
      });
      if (!user) return HandleError(res, "User Not Found!");
      if (password !== confirmPassword) {
        return HandleError(res, "Password do not match!");
      }
      if (!ValidateEmail(email.trim()))
        return HandleError(
          res,
          "Please enter a valid email id i.e abc@gmail.com"
        );

      user = await FindAndUpdate({
        model: User,
        where: { _id: id },
        data: {
          name,
          phone,
          email,
          password: await bcrypt.hash(password, saltRounds),
          role,
        },
      });

      if (!user) return HandleError(res, "Failed to update User!");

      return HandleSuccess(res, user);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  DeleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) return HandleError(res, "User ID is required!");
      const user = await FindOne({
        model: User,
        where: {
          _id: id,
        },
      });
      if (!user) return HandleError(res, "User Not Found!");
      const deletedUser = await Delete({
        model: User,
        where: { _id: id },
      });
      if (!deletedUser) return HandleError(res, "Failed to delete User!");
      return HandleSuccess(res, deletedUser);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  // API to get contact us form data one gor by id one of all of them
  GetContactFormData: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) return HandleError(res, "Contact Form Data ID is required!");
      const contactFormData = await FindOne({
        model: Contact,
        where: {
          _id: id,
        },
      });
      if (!contactFormData)
        return HandleError(res, "Contact Form Data Not Found!");
      return HandleSuccess(res, contactFormData);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  // get all the contatcs
  GetAllContactFormData: async (req, res, next) => {
    try {
      const contactFormData = await Find({
        model: Contact,
      });
      if (!contactFormData || contactFormData.length === 0)
        return HandleError(res, "No Contact Form Data found!");
      return HandleSuccess(res, contactFormData);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  // API to update contact us form data
  UpdateContactFormData: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, phone, message } = req.body;
      if (!id) return HandleError(res, "Contact Form Data ID is required!");
      const contactFormData = await FindOne({
        model: Contact,
        where: {
          _id: id,
        },
      });
      if (!contactFormData)
        return HandleError(res, "Contact Form Data Not Found!");

      const updatedContactFormData = await FindAndUpdate({
        model: Contact,
        where: { _id: id },
        data: {
          name,
          email,
          phone,
          message,
        },
      });
      if (!updatedContactFormData)
        return HandleError(res, "Failed to update Contact Form Data!");
      return HandleSuccess(res, updatedContactFormData);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  // get all the partneer requests
  GetAllPartnershipRequests: async (req, res, next) => {
    try {
      const partnershipRequests = await Find({
        model: PartnerRequest,
      });
      if (!partnershipRequests || partnershipRequests.length === 0)
        return HandleError(res, "No Partnership Requests found!");
      return HandleSuccess(res, partnershipRequests);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  // get a single partnership request by id
  GetPartnershipRequestById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) return HandleError(res, "Partnership Request ID is required!");
      const partnershipRequest = await FindOne({
        model: PartnerRequest,
        where: {
          _id: id,
        },
      });
      if (!partnershipRequest)
        return HandleError(res, "Partnership Request Not Found!");
      return HandleSuccess(res, partnershipRequest);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  // get all purchases
  GetAllPurchases: async (req, res, next) => {
    try {
      const purchases = await Find({
        model: Purches,
        populate: "user",
      });
      if (!purchases || purchases.length === 0)
        return HandleError(res, "No Purchases found!");
      return HandleSuccess(res, purchases);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
  // get a single purchase by id
  GetPurchaseById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) return HandleError(res, "Purchase ID is required!");
      const purchase = await FindOne({
        model: Purches,
        where: {
          _id: id,
        },
      });
      if (!purchase) return HandleError(res, "Purchase Not Found!");
      return HandleSuccess(res, purchase);
    } catch (err) {
      HandleServerError(res, req, err);
    }
  },
};
