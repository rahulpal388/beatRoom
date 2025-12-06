import { Request, Response } from "express";

export const Logout = async (req: Request, res: Response) => {
  // const cookie = req.cookies
  // console.log(cookie);
  // const { verify, data } = verifyJwtToken({ token: cookie.refreshToken })
  // if (!data) {
  //     return res.status(401).json({
  //         message: "error logout"
  //     })
  // }
  // await DBClient.user.update({
  //     where: {
  //         email: data.email
  //     },
  //     data: {
  //         refreshToken: undefined
  //     }
  // })
  // res.status(200)
  //     .clearCookie("accessToken")
  //     .clearCookie("refreshToken")
  //     .json({
  //         message: "logged out successfully"
  //     })
};
