import * as dotenv from "dotenv";
dotenv.config();

export enum PricingMode {
  LowCost = "lowCost",
  Gpt4ORealtime = "gpt-4o-realtime",
}

export interface EnvConfig {
  openaiApiKey: string;
  vapiApiKey: string;
  vapiBaseUrl: string;
  myTimezone: string;
  pricingMode: PricingMode;
  myName: string;
  myPhoneNumber: string;
}

export const envConfig: EnvConfig = {
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  vapiApiKey: process.env.VAPI_API_KEY || "",
  vapiBaseUrl: process.env.VAPI_BASE_URL || "https://api.vapi.ai",
  myTimezone: "America/New_York",
  pricingMode: PricingMode.LowCost,
  myName: process.env.MY_NAME || "Chris",
  myPhoneNumber: process.env.MY_PHONE_NUMBER || "+18042221111",
};
