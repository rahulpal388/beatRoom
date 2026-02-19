import "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string | null;
        _id: string | null
      };
      session: {
        sessionId: string | null
      }
    }
  }
}
