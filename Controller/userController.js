import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();




// export async function getAll(req, res, next) {
//     try {
//         const response = await Model.find({});
//         return res.status(200).send({ success: true, response });
//     } catch (err) {
//         return next(err);
//     }
// }

// get all admin 

export async function getAllAdmin(req, res, next) {
    try {
        if (req.user.role === "admin") {
            const response = await User.find({});
            return res.status(200).send({ success: true, response });
        } else {
            return res.status(200).send("You're not Authorized");
        }
    } catch (err) {
        return next(err);
    }
};

// to get admin by Id


export async function getAdminById(req, res, next) {
    try {
        if (req.user.role === "admin") {
            const { id } = req.params;
            const response = await User.findOne({ _id: id });
            if (response) {
                return res.status(200).send({ success: true, response });
            } else {
                return res.status(404).send("Not found");
            }
        } else {
            return res.status(403).send("You're not authorized");
        }
    } catch (err) {
        return next(err);
    }
};

// Sign Up 

export async function signUp(req, res) {
    try {
        const {
            fullName,
            phoneNumber,
            address,
            email,
            password,
            role,
        } = req.body;

        if (!fullName || !phoneNumber || !address || !email || !password) {
            return res.status(400).send("All input is required");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            phoneNumber,
            address,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            role,
        });

        const token = jwt.sign(
            { user_id: user._id, email, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );

        res.cookie("access-token", token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
        });

        user.token = token;

        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

// update admin by Id

export async function updateAdminById(req, res, next) {
    try {
      let { id } = req.params;
      let body = req.body;
      const { password } = req.body;
      if (password) {
        let encryptedUserPassword = await bcrypt.hash(password, 10);
        req.body.password = encryptedUserPassword;
      }
      const user = await User.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      if (!user) return res.status(404).send("id not found");
      res.status(200).send({ success: "User updated", user });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  // delet Admin by Id

  export async function deleteAdminById(req, res, next) {
    try {
        const { id } = req.params;
        const response = await User.findByIdAndDelete({ _id: id });
        if (!response) {
            return res.status(404).send("id not found");
        }
        return res.status(200).send({ success: true, response });
    } catch (err) {
        return next(err);
    }
};

// Admin LogIn

export const logIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ success: false, message: "Incorrect email or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ success: false, message: "Incorrect email or password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
      res.cookie("access-token", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).send({
        success: true,
        message: "Authentication successful",
        token: token,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  };

// Log Out Admin 

export async function logOut(req, res, next) {
    try {
        res.clearCookie("access-token");
        return res.status(200).send("Logged out successfully!");
    } catch (err) {
        return next(err);
    }
};

