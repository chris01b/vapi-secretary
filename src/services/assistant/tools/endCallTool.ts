import {
  CreateFunctionToolDto,
  OpenAiFunction,
  ToolMessageComplete,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../../config/env.config";

export const getEndCallTool = (config: EnvConfig): CreateFunctionToolDto => {
  const endCallFunction: OpenAiFunction = {
    name: "endCall",
    description: `Ends the call with the caller's message for ${config.myName}.`,
    parameters: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: `The message to deliver to ${config.myName}.`,
        },
      },
      required: ["message"],
    },
  };

  const completeMessage: ToolMessageComplete = {
    type: "request-complete",
    content: "Goodbye.",
    endCallAfterSpokenEnabled: true,
  };

  return {
    type: "function",
    function: endCallFunction,
    messages: [completeMessage],
  };
};
