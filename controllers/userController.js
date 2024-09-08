import { User } from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


// Create User
export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const saveUser = await userData.save();
    res.status(200).json({
      message: "User Created Successfully ",
      userData: saveUser
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update User
export const updateUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { id } = userData;
    const userExist = await User.findById({ _id: id })
    if (!userExist) {
      return res.status(400).json({ message: "User not Exist" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updateUser);


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userExist = await User.findById({ _id: id })
    if (!userExist) {
      return res.status(400).json({ message: "User not Exist" });
    }
    await User.findByIdAndDelete(id);
    return res.status(201).json({ message: "User Deleted Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length == 0) {
      res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



export const register = async (req, res) => {
  try {
    const { email, password, } = req.body;

    //check all the fields are submitted
    if (!email || !password) {
      return res.status(400).json({
        message: "please submit all details.",
        success: false,
      });
    }

    // check email exist or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "email already exists",
        success: false,
      });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating the user in mongoDB
    await User.create({
      email,
      password: hashedPassword,

    });

    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Login logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check all the fields are submitted
    if (!email || !password) {
      return res.status(400).json({
        message: "please submit all details.",
        success: false,
      });
    }

    // check email exist
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "email or password incorrect",
        success: false,
      });
    }


    console.log(user);
    // check password is valid
    const matched = await bcrypt.compare(password, user.password)

    if (!matched) {
      return res.status(400).json({
        message: "email or password incorrect",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
      userEmail: user.email,
    };

    // jwt token signing
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      email: user.email,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.email}`,
      });
  } catch (error) {
    console.log(error);
  }
};


// //logout logic
// export const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };




