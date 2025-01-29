import { VercelRequest, VercelResponse } from "@vercel/node";
import { ServerMessageToolCalls } from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../../config/env.config";
import functions from "../../../services/tools";
import { ToolFunction } from "../../../types";

export const toolCallHandler = async (
  req: VercelRequest,
  res: VercelResponse,
  config: EnvConfig
): Promise<void> => {
  try {
    const payload: ServerMessageToolCalls = req.body.message;
    const { toolCallList } = payload;

    if (!toolCallList || toolCallList.length === 0) {
      throw new Error("Invalid Request.");
    }

    const firstToolCall = toolCallList[0];
    const { name, arguments: parameters } = firstToolCall.function;
    const toolCallId = firstToolCall.id;

    if (Object.prototype.hasOwnProperty.call(functions, name)) {
      const toolFunc: ToolFunction = functions[name];
      const functionResult = await toolFunc(
        parameters,
        name,
        toolCallId,
        config
      );
      res.status(200).json(functionResult);
    } else {
      throw new Error(`Function "${name}" not found.`);
    }
  } catch (error: any) {
    console.error("Error processing tool call:", error);
    res.status(500).json({ error: error.message });
  }
};
