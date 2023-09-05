import type { NextApiRequest, NextApiResponse } from "next/types";
import getCalendar, { DAYS } from "~/server/calendar/calendar";
import { isObject } from "~/utils/guards";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    req.body === undefined ||
    req.body === null ||
    req.body === "" ||
    typeof req.body !== "string"
  ) {
    res.status(400).json({ error: "No body provided" });
    return;
  }

  const parsedBody = JSON.parse(req.body);
  if (
    parsedBody === undefined ||
    parsedBody === null ||
    parsedBody === "" ||
    !isObject(parsedBody)
  ) {
    res.status(400).json({ error: "No body provided" });
    return;
  }
  if (
    "link" in parsedBody === false ||
    "daysInAdvance" in parsedBody === false ||
    parsedBody.link === undefined ||
    parsedBody.daysInAdvance === undefined
  ) {
    res.status(400).json({ error: "No link or daysInAdvance provided" });
    return;
  }

  const linkParam = parsedBody.link;
  const daysInAdvanceParam = parsedBody.daysInAdvance;

  const daysInAdvance = parseInt(daysInAdvanceParam) ?? DAYS;
  const link = linkParam ?? "";

  if (link == "" || typeof link !== "string") {
    res.status(400).json({ error: "No link provided" });
    return;
  }

  if (daysInAdvance < 1) {
    res.status(400).json({ error: "Days in advance must be at least 1" });
    return;
  }

  try {
    const calendarData = await getCalendar(link, daysInAdvance);
    res.status(200).send(calendarData);
    return;
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
    return;
  }
}
