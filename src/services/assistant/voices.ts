import {
  AssistantVoice,
  OpenAiVoiceId,
  ElevenLabsVoiceModel,
} from "@vapi-ai/server-sdk/api/types";
import { EnvConfig, PricingMode } from "../../config/env.config";

export const getVoiceConfig = (config: EnvConfig): AssistantVoice => {
  switch (config.pricingMode) {
    case PricingMode.Gpt4ORealtime:
      return {
        provider: "openai",
        voiceId: OpenAiVoiceId.Sage,
        speed: 4.0,
      };
    case PricingMode.LowCost:
    default:
      return {
        provider: "11labs",
        voiceId: "op7kYoLc9OwePUfCvB9w", // Replace with your actual voice ID
        model: ElevenLabsVoiceModel.ElevenTurboV25,
      };
  }
};
