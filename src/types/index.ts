import { ServerMessageResponseMessageResponse } from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../config/env.config";

export interface AuthenticateUserParams {
  firstName: string;
  lastName: string;
  reasonForCalling: string;
}

export interface EndCallParams {
  message: string;
}

export type ToolFunction = (
  params: any,
  name: string,
  toolCallId: string,
  config: EnvConfig
) => Promise<ServerMessageResponseMessageResponse>;
