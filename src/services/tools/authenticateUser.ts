import {
  ServerMessageResponse,
  ServerMessageResponseToolCalls,
  ToolCallResult,
  ToolMessageComplete,
  ToolMessageFailed,
  ToolMessageCompleteRole,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../config/env.config";
import { AuthenticateUserParams } from "../../types";

export const authenticateUser = async (
  params: AuthenticateUserParams,
  name: string,
  toolCallId: string,
  config: EnvConfig
): Promise<ServerMessageResponseToolCalls> => {
  try {
    const { firstName, lastName, reasonForCalling } = params;

    console.log("authenticateUser:", firstName, lastName, reasonForCalling);

    // TODO: Perform actual authentication logic here
    const isAuthenticated = true;

    if (isAuthenticated) {
      const completeMessage: ToolMessageComplete = {
        type: "request-complete",
        content: `{
  "id": "6_transfer",
  "description": "Transfer the caller to {{name}}.",
  "instructions": [
    "Call the 'transferCall' function with {{phoneNumber}}."
  ],
  "examples": [
    "I'm transferring you to {{name}}. Please stay on the line.",
  ]
}`,
        role: ToolMessageCompleteRole.System,
      };

      const toolCallResult: ToolCallResult = {
        name,
        toolCallId,
        result: `${config.myName} is available.`,
        message: [completeMessage],
      };

      return {
        results: [toolCallResult],
      };
    } else {
      const rejectedMessage: ToolMessageComplete = {
        type: "request-complete",
        content: `{
  "id": "8_end_call_with_message",
  "description": "End the call with a message for {{name}}.",
  "instructions": [
    "Call the 'endCall' function with parameter 'message'"
  ]
}`,
        role: ToolMessageCompleteRole.System,
      };

      const toolCallResult: ToolCallResult = {
        name,
        toolCallId,
        result: `${config.myName} is unavailable.`,
        message: [rejectedMessage],
      };

      return {
        results: [toolCallResult],
      };
    }
  } catch (error) {
    console.error("Authentication error:", error);

    const failedMessage: ToolMessageFailed = {
      type: "request-failed",
      content:
        "DEBUG: Authentication failed due to an internal error. Ending call now.",
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
