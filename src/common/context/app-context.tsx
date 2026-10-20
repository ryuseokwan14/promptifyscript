"use client";

import { createContext, useContext } from "react";
import { Product, ScriptItem, LocationItem, ActionItem, MasterTemplates, User, GenerationResult, VibeType } from "@/types";

export interface AppContextType {
  products: Product[];
  scripts: ScriptItem[];
  locations: string[];
  locationItems: LocationItem[];
  actions: string[];
  actionItems: ActionItem[];
  universalLocations: string[];
  locationCounts: {
    universal: number;
    casual_aesthetic: number;
    urban_adventure: number;
  };
  templates: MasterTemplates;
  user: User | null;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  activeVibe: VibeType | null;
  setActiveVibe: (vibe: VibeType | null) => void;
  includeAction: boolean;
  setIncludeAction: (include: boolean) => void;
  addProduct: (product: Omit<Product, "id">) => Promise<Product | null>;
  updateProduct: (product: Partial<Product> & { id: string }) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  deleteBatchProducts: (ids: string[]) => Promise<boolean>;
  addScript: (productId: string, text: string) => Promise<void>;
  addBatchScripts: (productId: string, texts: string[]) => Promise<boolean>;
  deleteScript: (id: string) => Promise<void>;
  deleteBatchScripts: (ids: string[]) => Promise<boolean>;
  addLocation: (location: string, vibe?: "casual_aesthetic" | "urban_adventure" | "universal") => Promise<void>;
  addBatchLocations: (names: string[], vibe?: "casual_aesthetic" | "urban_adventure" | "universal") => Promise<boolean>;
  updateLocation: (id: string, name: string, vibe: string) => Promise<void>;
  deleteLocation: (location: string) => Promise<void>;
  deleteBatchLocations: (idsOrNames: string[]) => Promise<boolean>;
  addAction: (name: string) => Promise<void>;
  addBatchActions: (names: string[]) => Promise<boolean>;
  updateAction: (id: string, name: string) => Promise<void>;
  deleteAction: (nameOrId: string) => Promise<void>;
  deleteBatchActions: (idsOrNames: string[]) => Promise<boolean>;
  updateTemplates: (female: string, male: string) => Promise<void>;
  resetTemplates: () => Promise<void>;
  login: (email: string, role?: "SUPERADMIN" | "CREATOR") => void;
  logout: () => Promise<void>;
  creatorEmail: string;
  refreshCurrentUser: () => Promise<void>;
  generatePrompt: (productId?: string, vibe?: VibeType | null, withAction?: boolean) => GenerationResult | null;
  compileLivePrompt: (productId: string, withAction?: boolean) => GenerationResult | null;
  resetDeckCycle: (productId?: string) => Promise<void>;
  refreshData: () => Promise<void>;
  isLoaded: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
