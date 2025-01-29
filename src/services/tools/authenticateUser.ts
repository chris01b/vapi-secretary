import {
  ServerMessageResponse,
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
): Promise<ServerMessageResponse> => {
  const { firstName, lastName, reasonForCalling } = params;

  console.log("authenticateUser:", firstName, lastName, reasonForCalling);

  // TODO: Perform actual authentication logic here
  const isAuthenticated = true;

  if (isAuthenticated) {
    const completeMessage: ToolMessageComplete = {
      type: "request-complete",
      /**
       * When role=system, `content` is passed to the model in a system message. Example:
       *     system: default one
       *     assistant:
       *     user:
       *     assistant:
       *     user:
       *     assistant:
       *     user:
       *     assistant: tool called
       *     tool: your server response
       *     <--- system prompt as hint
       *     ---> model generates response which is spoken
       * This is useful when you want to provide a hint to the model about what to say next.
       */
      content: `Call the transferCall function with '${config.myPhoneNumber}'`,
      role: ToolMessageCompleteRole.System,
    };

    const toolCallResult: ToolCallResult = {
      name,
      toolCallId,
      result: "User authenticated successfully.",
      message: [completeMessage],
    };

    return {
      messageResponse: { results: [toolCallResult] },
    };
  } else {
    const failedMessage: ToolMessageFailed = {
      type: "request-failed",
      content: "Authentication failed. Ending call now.",
      endCallAfterSpokenEnabled: true,
    };

    const toolCallResult: ToolCallResult = {
      name,
      toolCallId,
      error: "Authentication failed.",
      message: [failedMessage],
    };

    return {
      messageResponse: { results: [toolCallResult] },
    };
  }
};
