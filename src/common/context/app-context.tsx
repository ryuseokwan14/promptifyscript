"use client";

import { createContext, useContext } from "react";
import { Product, ScriptItem, LocationItem, MasterTemplates, User, GenerationResult } from "@/types";

export interface AppContextType {
  products: Product[];
  scripts: ScriptItem[];
  locations: string[];
  locationItems: LocationItem[];
  templates: MasterTemplates;
  user: User | null;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  addProduct: (product: Omit<Product, "id">) => Promise<Product | null>;
  updateProduct: (product: Partial<Product> & { id: string }) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addScript: (productId: string, text: string) => Promise<void>;
  addBatchScripts: (productId: string, texts: string[]) => Promise<boolean>;
  deleteScript: (id: string) => Promise<void>;
  addLocation: (location: string, vibe?: "casual_aesthetic" | "urban_adventure" | "universal") => Promise<void>;
  addBatchLocations: (names: string[], vibe?: "casual_aesthetic" | "urban_adventure" | "universal") => Promise<boolean>;
  updateLocation: (id: string, name: string, vibe: string) => Promise<void>;
  deleteLocation: (location: string) => Promise<void>;
  updateTemplates: (female: string, male: string) => Promise<void>;
  resetTemplates: () => Promise<void>;
  login: (email: string) => void;
  logout: () => void;
  generatePrompt: (productId?: string) => GenerationResult | null;
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
