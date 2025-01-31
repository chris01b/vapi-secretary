import { ToolFunction } from "../../types";
import { authenticateUser } from "./authenticateUser";
import { endCall } from "./endCall";

const functions: Record<string, ToolFunction> = {
  authenticateUser,
  endCall,
};

export default functions;
