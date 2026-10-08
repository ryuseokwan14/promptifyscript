export interface Product {
  id: string;
  name: string;
  gender: "female" | "male";
  itemDesc?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  imageFit?: string | null;
  imageTexture?: string | null;
  imageAtmosphere?: string | null;
}

export interface ScriptItem {
  id: string;
  productId: string;
  text: string;
  variationType?: string;
  estimatedSeconds?: number;
  retention?: number;
  usedCount?: number;
}

export interface LocationItem {
  id: string;
  name: string;
  vibe: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface MasterTemplates {
  female: string;
  male: string;
}

export interface User {
  email: string;
  name: string;
  role: "SUPERADMIN" | "CREATOR";
}

export interface CycleInfo {
  scriptCycleReset: boolean;
  scriptIsLastInCycle: boolean;
  scriptRemaining: number;
  scriptTotal: number;
  scriptCycleNumber: number;
  locationCycleReset: boolean;
  locationIsLastInCycle: boolean;
  locationRemaining: number;
  locationTotal: number;
}

export type VibeType = "universal" | "casual_aesthetic" | "urban_adventure";

export interface GenerationResult {
  prompt: string;
  location: string;
  script: string;
  tokens: number;
  product: Product;
  cycleInfo?: CycleInfo;
  vibe?: VibeType;
}
