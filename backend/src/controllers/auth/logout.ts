import { sessionModal } from "db/schema/session.js";
import { Request, Response } from "express";
import { clearAcCookie, clearRefCookie } from "service/session/session_cookies.js";

export const Logout = async (req: Request, res: Response) => {

  const { sessionId } = req.session;

  if (!sessionId) {
    return res.status(401).json({
      message: "Invalid request"
    })
  }

  const session = await sessionModal.findOneAndDelete({ sessionId });

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
