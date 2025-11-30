import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  //   console.log(`token is ${token}`);

  //   if (!token) {
  //     res.status(411).json({
  //       message: "No authorization token",
  //     });

  //     return;
  //   }

  try {
    // const verifyToken = Jwt.verify(token, process.env.JWT_SECRET!);

    // const decode = Jwt.decode(token);

    // if (!(typeof verifyToken === "string")) {
    //   console.log(decode);
    //   console.log(verifyToken);
    //   console.log(`token => ${token}`);
    req.body.userId = "123";
    next();
    // }
  } catch (error) {
    res.status(411).json({
      message: "Invalid token",
    });
  }
};

export default verifyToken;
