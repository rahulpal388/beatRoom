import { verifyOtpType } from "../../zodTypes/authType.js";
import { Request, Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
} from "../../utils/jwtTokens.js";
import { hashPassword } from "../../utils/bcryptPassword.js";
import { generateUniqueUserId } from "../../utils/generateUniqueId.js";
import { optModel } from "../../db/schema/otp.js";
import { userModel } from "../../db/schema/user.js";

export const verifyOtp_signin = async (req: Request, res: Response) => {
  try {
    const { success, data } = verifyOtpType.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Invalid input",
      });
    }

    const dbOtp = await optModel.findOne({ email: data.email });

    if (!dbOtp) {
      res.status(401).json({
        message: "otp expire resend again ",
      });
      return;
    }

    console.log("opt is this ======> ", dbOtp.otp);

    if (dbOtp.otp === data.otp) {
      const passwordHash = hashPassword(data.password);
      const userId = generateUniqueUserId(data.email);
      const accessToken = createAccessToken({
        email: data.email,
        userId: userId,
      });
      const refreshToken = createRefreshToken({
        email: data.email,
        userId: userId,
      });

      const user = await userModel.create({
        userId: userId,
        username: data.username,
        email: data.email,
        password: passwordHash,
        accessToken: accessToken,
        refreshToken: refreshToken,
        history: [],
        likes: {
          "likes.songs": [],
          "likes.albums": [],
          "likes.playlists": [],
          "likes.userPlaylist": [],
        },
      });

      return res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 15,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .json({
          message: "use logged in successful ",
          userId: user.userId,
          username: user.username,
          profile: user.image,
        });
    } else {
      res.status(401).json({
        message: "Incorrect OTP",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(411).json({
      message: "can't verify otp",
    });
  }
};
