import {
  ServerMessageResponse,
  ServerMessageResponseToolCalls,
  ToolCallResult,
  ToolMessageComplete,
  ToolMessageFailed,
  ToolMessageCompleteRole,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../config/env.config";
import { EndCallParams } from "../../types";

export const endCall = async (
  params: EndCallParams,
  name: string,
  toolCallId: string,
  config: EnvConfig
): Promise<ServerMessageResponseToolCalls> => {
  const { message } = params;

  try {
    console.log("endCall:", message);

    const toolCallResult: ToolCallResult = {
      name,
      toolCallId,
      result: "success",
    };

    return {
      results: [toolCallResult],
    };
  } catch (error) {
    console.error("endCall error:", error);

    const failedMessage: ToolMessageFailed = {
      type: "request-failed",
      content:
        "DEBUG: End call failed due to an internal error. Ending call now.",
      endCallAfterSpokenEnabled: true,
    };

    const toolCallResult: ToolCallResult = {
      name,
      toolCallId,
      error: "Internal error.",
      message: [failedMessage],
    };

    return {
      results: [toolCallResult],
    };
  }
};
