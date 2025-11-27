import { Request, Response } from "express";

// task 2: delete it just for testing
const rooms = [
  {
    name: "Chill Vibes",
    link: "https://beatroom.com/room/abc123",
    createdAt: new Date("2025-09-01T18:30:00Z"),
  },
  {
    name: "LoFi Beats",
    link: "https://beatroom.com/room/def456",
    createdAt: new Date("2025-09-01T17:45:00Z"),
  },
  {
    name: "Hip Hop Zone",
    link: "https://beatroom.com/room/ghi789",
    createdAt: new Date("2025-09-01T17:00:00Z"),
  },
  {
    name: "EDM Party",
    link: "https://beatroom.com/room/jkl012",
    createdAt: new Date("2025-09-01T16:30:00Z"),
  },
  {
    name: "Rock Classics",
    link: "https://beatroom.com/room/mno345",
    createdAt: new Date("2025-09-01T15:45:00Z"),
  },
  {
    name: "Jazz Night",
    link: "https://beatroom.com/room/pqr678",
    createdAt: new Date("2025-09-01T15:00:00Z"),
  },
  {
    name: "Pop Hits",
    link: "https://beatroom.com/room/stu901",
    createdAt: new Date("2025-09-01T14:30:00Z"),
  },
  {
    name: "Metal Madness",
    link: "https://beatroom.com/room/vwx234",
    createdAt: new Date("2025-09-01T13:45:00Z"),
  },
  {
    name: "Indie Chill",
    link: "https://beatroom.com/room/yz567",
    createdAt: new Date("2025-09-01T13:00:00Z"),
  },
  {
    name: "Classical Evening",
    link: "https://beatroom.com/room/abc890",
    createdAt: new Date("2025-09-01T12:30:00Z"),
  },
];

export const getRooms = (req: Request, res: Response) => {
  // const userId = req.body.userId;

  // console.log(`getRoom user id is => ${userId}`)

  // task 1 : find the user and his rooms

  res.status(200).json({
    rooms,
  });
};
