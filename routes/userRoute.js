import express from "express";
import {
    getAllAdmin,
    getAdminById,
    signUp,
    updateAdminById,
    deleteAdminById,
    logIn,
    logOut
} from "../Controller/userController.js";
import { admin } from "../middleware/auth.js";
import verifyUser from "../middleware/auth.js";
const router = express.Router();

// to get all admin
router.get("/", verifyUser, admin, getAllAdmin);

//to get admin by Id
router.get("/:id", verifyUser, admin, getAdminById);

//to signup 
router.post("/signup", signUp);

//to edit admin by Id
router.put("/:id", verifyUser, updateAdminById);

//to delet admin by Id
router.delete("/:id", verifyUser, admin, deleteAdminById);

//to login 
router.post("/login", logIn);

//to logout
router.post("/logout", logOut);

export default router