import { ToolFunction } from "../../types";
import { authenticateUser } from "./authenticateUser";

const functions: Record<string, ToolFunction> = {
  authenticateUser,
};

export default functions;
