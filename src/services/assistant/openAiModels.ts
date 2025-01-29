import {
  OpenAiModel,
  OpenAiMessage,
  OpenAiModelModel,
  OpenAiModelToolsItem,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig, PricingMode } from "../../config/env.config";

export const getModelConfig = (
  systemMessage: OpenAiMessage,
  tools: OpenAiModelToolsItem[],
  config: EnvConfig
): OpenAiModel => {
  switch (config.pricingMode) {
    case PricingMode.Gpt4ORealtime:
      return {
        provider: "openai",
        model: OpenAiModelModel.Gpt4ORealtimePreview20241217,
        temperature: 0.7,
        messages: [systemMessage],
        tools,
      };
    case PricingMode.LowCost:
    default:
      return {
        provider: "openai",
        model: OpenAiModelModel.Gpt4OMini,
        temperature: 0,
        messages: [systemMessage],
        tools,
      };
  }
};
