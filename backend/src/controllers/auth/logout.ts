import { sessionModal } from "db/schema/session.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { clearAcCookie, clearRefCookie } from "service/session/session_cookies.js";

export const Logout = async (req: Request, res: Response) => {

  const { sessionId } = req.session;
  const { _id } = req.user

  if (!sessionId || !_id) {
    return res.status(401).json({
      message: "Invalid request"
    })
  }

  console.log(`_id => ${_id}`)
  console.log(`sessionId => ${sessionId}`)

  const session = await sessionModal.findOneAndDelete({ sessionId: sessionId, user_id: _id });
  console.log(session)
  if (!session) {
    return res.status(500).json({
      message: "error logging out"
    })
  }

  clearRefCookie(res);
  clearAcCookie(res);

  res.status(200).json({
    message: "logout successfully"
  })


};
