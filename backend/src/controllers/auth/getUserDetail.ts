import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getUserDetail = async (req: Request, res: Response) => {
  const { _id } = req.user;

  if (!_id) {
    return res.status(401).json({
      message: "no user found"
    })
  }

  try {
    const user = await userModel.findOne(
      { _id },
      {},
      { projection: { _id: 1, userId: 1, username: 1, email: 1, profile_image: 1 } }
    );


    if (!user) {
      throw new Error("error while finding user details")
    }

    res.status(200).json({
      profile_image: user.profile_image,
      userId: user.userId,
      username: user.username,
      email: user.email
    });

  } catch {
    res.status(500).json({
      message: "error while getting the information ",
    });
  }
};
