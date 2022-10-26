import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { token } = req.body;

    if (!process.env.JWT_SECRET) {
      res.status(500).send({ message: "Missing secret" });
      return;
    }

    if (typeof token != "string") {
      res.status(500).send({ message: "Invalid token" });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
        return;
      }

      if (decoded.username !== process.env.USER_HASH) {
        res.status(401).send({ message: "Invalid username" });
        return;
      }
    });
    res.status(200).send({ message: "success" });
    return;
  }

  res.status(405).send({ message: "Invalid method" });
}
