import {
  CreateFunctionToolDto,
  OpenAiFunction,
  ToolMessageStart,
  ToolMessageDelayed,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../../config/env.config";

export const getAuthenticateUserTool = (
  config: EnvConfig
): CreateFunctionToolDto => {
  const authenticateUserFunction: OpenAiFunction = {
    name: "authenticateUser",
    description: `Checks the caller's information to authenticate and unlock the ability to transfer the call to ${config.myName}.`,
    parameters: {
      type: "object",
      properties: {
        firstName: {
          type: "string",
          description: "The caller's first name.",
        },
        lastName: {
          type: "string",
          description: "The caller's last name.",
        },
        reasonForCalling: {
          type: "string",
          description: `The full explanation of why the caller wants to contact ${config.myName}.`,
        },
      },
      required: ["firstName", "lastName", "reasonForCalling"],
    },
  };

  const startMessage: ToolMessageStart = {
    type: "request-start",
    content: "I am verifying your details.",
  };

  return {
    type: "function",
    function: authenticateUserFunction,
    messages: [startMessage],
  };
};
