import {
  createAccessToken,
  createRefreshToken,
  verifyJwtToken,
} from "../utils/jwtTokens.js";
import { userModel } from "../db/schema/user.js";
import { NextFunction, Request, Response } from "express";

const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  try {
    if (!accessToken) {
      if (refreshToken) {
        const { verify, data } = verifyJwtToken({ token: refreshToken });
        console.log(refreshToken);

        if (verify) {
          console.log(data);
          const user = await userModel.findOne({ email: data!.email });
          const accessToken = createAccessToken({
            email: user!.email,
            userId: user!.userId,
          });
          const newRefreshToken = createRefreshToken({
            email: user!.email,
            userId: user!.userId,
          });

          res
            .cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production" ? true : false,
              sameSite: "strict",
              maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            .cookie("accessToken", accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production" ? true : false,
              sameSite: "strict",
              maxAge: 1000 * 60 * 15,
            });

          req.params.userId = user!.userId;
          console.log("calling next after creating refreshToken");
          next();
        } else {
          // loggout user
          res.status(200).json({
            message: "logout invalid refreshToken ",
          });
        }
      } else {
        // loggout user
        res.status(200).json({
          message: "logout no refreshToken and accessToken ",
        });
        // loggout user
      }

      return;
    }

    const { verify, data } = verifyJwtToken({ token: accessToken });

    if (verify) {
      const user = await userModel.findOne({ email: data?.email });
      req.params.userId = user!.userId;

      console.log("calling next after verifying accessToken");
      next();
    } else {
      res.send("asdfgh");
    }
  } catch (error) {
    res.status(411).json({
      message: "Invalid token",
    });
  }
};

export default verifyTokenMiddleware;
