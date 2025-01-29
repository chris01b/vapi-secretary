import { VercelRequest, VercelResponse } from "@vercel/node";
import { setCors } from "../../utils/cors.utils";
import { envConfig } from "../../config/env.config";
import { assistantRequestHandler } from "./handlers/assistantRequestHandler";
import { statusUpdateHandler } from "./handlers/statusUpdateHandler";
import { toolCallHandler } from "./handlers/toolCallHandler";

export default async (req: VercelRequest, res: VercelResponse) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const payload = req.body.message;

    try {
      switch (payload.type) {
        case "assistant-request":
          await assistantRequestHandler(req, res, envConfig);
          break;
        case "status-update":
          await statusUpdateHandler(req, res, envConfig);
          break;
        case "tool-calls":
          await toolCallHandler(req, res, envConfig);
          break;
        default:
          res
            .status(400)
            .json({ error: `Unhandled message type: ${payload.type}` });
      }
    } catch (error: any) {
      console.error("Error processing webhook:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(404).json({ error: "Not found" });
  }
};
