import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getUserDetail = async (req: Request, res: Response) => {
  const { userId } = req.user;
  console.log(`userId ${userId}`)

  if (!userId) {
    return res.status(401).json({
      message: "no user found"
    })
  }

  try {
    const user = await userModel.findOne(
      { userId },
      {},
      { projection: { _id: 0, userId: 1, username: 1, profile_image: 1 } }
    );


    if (!user) {
      throw new Error("error while finding user details")
    }

    res.status(200).json({
      profile_image: user.profile_image,
      userId: user.userId,
      username: user.username
    });

  } catch (error) {
    res.status(500).json({
      message: "error while getting the information ",
    });
  }
};
