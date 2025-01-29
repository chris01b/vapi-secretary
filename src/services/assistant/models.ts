import {
  OpenAiModel,
  OpenAiMessage,
  OpenAiModelModel,
  CreateTransferCallToolDto,
  CreateFunctionToolDto,
  CreateEndCallToolDto,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig, PricingMode } from "../../config/env.config";

export const getModelConfig = (
  systemMessage: OpenAiMessage,
  tools: Array<
    CreateTransferCallToolDto | CreateFunctionToolDto | CreateEndCallToolDto
  >,
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
