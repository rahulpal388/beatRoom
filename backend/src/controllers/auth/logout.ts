import { sessionModal } from "../../db/schema/session.js";
import { NextFunction, Request, Response } from "express";
import { clearAcCookie, clearRefCookie } from "../../service/session/session_cookies.js";
import { apiError } from "@utils/apiError.js";

export const Logout = async (req: Request, res: Response, next: NextFunction) => {

  const { sessionId } = req.session;
  const { _id } = req.user

  if (!sessionId || !_id) {
    return next(new apiError(401, "Invalid Input", {
      message: "Invalid request"
    }))
  }


  const session = await sessionModal.findOneAndDelete({ sessionId: sessionId, user_id: _id });
  if (!session) {
    return next(new apiError(500, "Error loggin out", {
      message: "Server Error"
    }))
  }

  clearRefCookie(res);
  clearAcCookie(res);

  res.status(200).json({
    message: "logout successfully"
  })


};
