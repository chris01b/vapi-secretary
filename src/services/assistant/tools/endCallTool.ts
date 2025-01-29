import {
  CreateEndCallToolDto,
  ToolMessageStart,
  ToolMessageFailed,
} from "@vapi-ai/server-sdk/api/types";

export const getEndCallTool = (): CreateEndCallToolDto => {
  const startMessage: ToolMessageStart = {
    type: "request-start",
    content: "Goodbye.",
  };

  const failedMessage: ToolMessageFailed = {
    type: "request-failed",
    content:
      "DEBUG: Ending call tool failed. This was not your fault. Manually ending call now.",
    endCallAfterSpokenEnabled: true,
  };

  return {
    type: "endCall",
    messages: [startMessage, failedMessage],
  };
};
