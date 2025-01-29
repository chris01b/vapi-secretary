import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  CreateAssistantDto,
  ServerMessageResponseAssistantRequest,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../../config/env.config";
import { buildAssistant } from "../../../services/assistant/assistantBuilder";

export const assistantRequestHandler = async (
  req: VercelRequest,
  res: VercelResponse,
  config: EnvConfig
): Promise<void> => {
  try {
    const assistant: CreateAssistantDto = buildAssistant(config);
    const response: ServerMessageResponseAssistantRequest = { assistant };
    res.status(200).json(response);
  } catch (error: any) {
    console.error("Error processing assistant request:", error);
    res.status(500).json({ error: error.message });
  }
};
