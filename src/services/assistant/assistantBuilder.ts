import {
  CreateAssistantDto,
  CreateAssistantDtoBackgroundSound,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig } from "../../config/env.config";
import { getSystemMessage } from "./systemMessage";
import { getVoiceConfig } from "./voices";
import { getModelConfig } from "./openAiModels";
import { getTools } from "./tools";

export const buildAssistant = (config: EnvConfig): CreateAssistantDto => {
  const systemMessage = getSystemMessage();
  const tools = getTools(config);
  const model = getModelConfig(systemMessage, tools, config);
  const voice = getVoiceConfig(config);

  return {
    name: `${config.myName}'s Secretary`,
    backgroundSound: CreateAssistantDtoBackgroundSound.Off,
    backgroundDenoisingEnabled: true,
    maxDurationSeconds: config.maxDurationSeconds,
    model,
    voice,
  };
};
