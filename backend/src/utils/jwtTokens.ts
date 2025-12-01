import Jwt from "jsonwebtoken";

export const createAccessToken = (data: { email: string; userId: string }) => {
  console.log(`env => ${process.env.JWT_SECRET!}`);

  return Jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "15m" }); // valid for 15 min
};

export const createRefreshToken = (data: { email: string; userId: string }) => {
  console.log(`env => ${process.env.JWT_SECRET!}`);

  return Jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "7d" }); // valid for 7 days
};

export const verifyJwtToken = (data: {
  token: string;
}): {
  verify: boolean;
  data: {
    email: string;
    userId: string;
  } | null;
} => {
  try {
    console.log(`env => ${process.env.JWT_SECRET!}`);
    console.log(data.token);
    const token = Jwt.verify(
      data.token,
      process.env.JWT_SECRET!
    ) as Jwt.JwtPayload;

    return {
      verify: true,
      data: {
        email: token.email,
        userId: token.userId,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      verify: false,
      data: null,
    };
  }
};
