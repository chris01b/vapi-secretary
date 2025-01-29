import { VercelRequest, VercelResponse } from "@vercel/node";
import { ServerMessageStatusUpdate } from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../../config/env.config";

export const statusUpdateHandler = async (
  req: VercelRequest,
  res: VercelResponse,
  config: EnvConfig
): Promise<void> => {
  try {
    const payload: ServerMessageStatusUpdate = req.body.message;

    console.log("Status Update:", payload.status);

    res.status(200).json({});
  } catch (error: any) {
    console.error("Error processing status update:", error);
    res.status(500).json({ error: error.message });
  }
};
