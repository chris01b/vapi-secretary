import {
  CreateTransferCallToolDto,
  CreateFunctionToolDto,
  CreateEndCallToolDto,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../../config/env.config";
import { getTransferCallTool } from "./transferCallTool";
import { getAuthenticateUserTool } from "./authenticateUserTool";
import { getEndCallTool } from "./endCallTool";

export const getTools = (
  config: EnvConfig
): Array<
  CreateTransferCallToolDto | CreateFunctionToolDto | CreateEndCallToolDto
> => {
  const transferCallTool = getTransferCallTool(config);
  const authenticateUserTool = getAuthenticateUserTool(config);
  const endCallTool = getEndCallTool();
  return [transferCallTool, authenticateUserTool, endCallTool];
};
