import {
  CreateTransferCallToolDto,
  OpenAiFunction,
  ToolMessageStart,
  ToolMessageFailed,
  ConditionOperator,
  Condition,
  TransferDestinationNumber,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../../config/env.config";

export const getTransferCallTool = (
  config: EnvConfig
): CreateTransferCallToolDto => {
  const transferCallFunction: OpenAiFunction = {
    name: "transferCall",
    description:
      "Use this function to transfer the call. Only use it when following instructions that explicitly ask you to use the transferCall function. DO NOT call this function unless you are instructed to do so.",
    parameters: {
      type: "object",
      properties: {
        destination: {
          type: "string",
          enum: [config.myPhoneNumber],
          description: "The destination to transfer the call to.",
        },
      },
      required: ["destination"],
    },
  };

  const destinationCondition: Condition = {
    param: "destination",
    operator: ConditionOperator.Eq,
    value: config.myPhoneNumber as unknown as Record<string, unknown>,
  };

  const startMessage: ToolMessageStart = {
    type: "request-start",
    content: `I am forwarding your call to ${config.myName}. Please stay on the line.`,
    conditions: [destinationCondition],
  };

  const failedMessage: ToolMessageFailed = {
    type: "request-failed",
    content:
      "DEBUG: Forwarding call failed. This was not your fault. Ending call now.",
    endCallAfterSpokenEnabled: true,
  };

  const destination: TransferDestinationNumber = {
    type: "number",
    number: config.myPhoneNumber,
    message: `I am forwarding your call to ${config.myName}. Please stay on the line.`,
    callerId: "{{customer.number}}",
    transferPlan: {
      mode: "warm-transfer-wait-for-operator-to-speak-first-and-then-say-summary",
    },
  };

  return {
    type: "transferCall",
    function: transferCallFunction,
    destinations: [destination],
    messages: [startMessage, failedMessage],
  };
};
