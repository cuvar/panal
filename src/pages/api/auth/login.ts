import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!process.env.JWT_SECRET) {
      res.status(500).send({ message: "Missing secret" });
      return;
    }

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET);

    if (
      username !== process.env.USER_HASH ||
      password !== process.env.PASSWORD_HASH
    ) {
      res.status(401).send({ message: "Invalid username or password" });
      return;
    }

    const period = Number(process.env.TOKEN_PERIOD);
    res
      .status(200)
      .send({ token: token, tokenHours: period > 0 ? period : 24 });
    return;
  }

  res.status(405).send({ message: "Invalid method" });
}
