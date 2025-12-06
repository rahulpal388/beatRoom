import { userModel } from "../../db/schema/user.js";
import { Request, Response } from "express";

export const getUserDetail = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findOne(
      { userId },
      {},
      { projection: { _id: 0, userId: 1, username: 1 } }
    );

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "error while getting the information ",
    });
  }
};
