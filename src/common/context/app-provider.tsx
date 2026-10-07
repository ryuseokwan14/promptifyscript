"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Product, ScriptItem, LocationItem, MasterTemplates, User, GenerationResult } from "@/types";
import { AppContext } from "./app-context";
import {
  getProductsAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  deleteBatchProductsAction,
} from "@/modules/products";
import {
  getScriptsAction,
  createScriptAction,
  createBatchScriptsAction,
  deleteScriptAction,
  deleteBatchScriptsAction,
} from "@/modules/scripts";
import {
  getLocationsAction,
  createLocationAction,
  createBatchLocationsAction,
  updateLocationAction,
  deleteLocationAction,
  deleteBatchLocationsAction,
} from "@/modules/locations";
import {
  getTemplatesAction,
  updateTemplatesAction,
  resetTemplatesAction,
} from "@/modules/templates";
import { getCurrentUserAction, logoutAction } from "@/modules/auth";
import { compileVideoPrompt } from "@/modules/generator/utils/assemble-prompt";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [scripts, setScripts] = useState<ScriptItem[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [locationItems, setLocationItems] = useState<LocationItem[]>([]);
  const [templates, setTemplates] = useState<MasterTemplates>({ female: "", male: "" });
  const [user, setUser] = useState<User | null>(null);
  const [creatorEmail, setCreatorEmail] = useState<string>("najmishfwn@gmail.com");
  const [activeProductId, setActiveProductId] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshData = useCallback(async () => {
    try {
      const [prodRes, scrRes, locRes, tplRes, authRes] = await Promise.all([
        getProductsAction(),
        getScriptsAction(),
        getLocationsAction(),
        getTemplatesAction(),
        getCurrentUserAction(),
      ]);

      if (authRes.user) {
        setUser(authRes.user);
      }
      if (authRes.creatorEmail) {
        setCreatorEmail(authRes.creatorEmail);
      }

      if (prodRes.success && prodRes.data) {
        const prodList = prodRes.data as unknown as Product[];
        setProducts(prodList);
        if (prodList.length > 0) {
          setActiveProductId((prev) =>
            prodList.some((p) => p.id === prev) ? prev : prodList[0].id
          );
        }
      }

      if (scrRes.success && scrRes.data) {
        setScripts(scrRes.data as unknown as ScriptItem[]);
      }

      if (locRes.success && locRes.data) {
        setLocationItems(locRes.data);
        setLocations(locRes.data.map((l) => l.name));
      }

      if (tplRes.success && tplRes.data) {
        setTemplates(tplRes.data);
      }
    } catch (err) {
      console.error("Gagal menyinkronkan data dari Supabase:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshData();
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshData]);

  const addProduct = async (item: Omit<Product, "id">): Promise<Product | null> => {
    const res = await createProductAction({
      name: item.name,
      gender: item.gender as "female" | "male",
      itemDesc: item.itemDesc || `${item.name} fitting premium modern`,
      icon: item.icon,
      imageUrl: item.imageUrl,
      imageFit: item.imageFit,
      imageTexture: item.imageTexture,
      imageAtmosphere: item.imageAtmosphere,
    });

    if (res.success && res.data) {
      const newProd = res.data as unknown as Product;
      setProducts((prev) => [newProd, ...prev]);
      setActiveProductId(newProd.id);
      return newProd;
    }
    return null;
  };

  const updateProduct = async (updated: Partial<Product> & { id: string }) => {
    const res = await updateProductAction(updated);
    if (res.success && res.data) {
      const saved = res.data as unknown as Product;
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
    }
  };

  const deleteProduct = async (id: string) => {
    const res = await deleteProductAction({ id });
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setScripts((prev) => prev.filter((s) => s.productId !== id));
      setActiveProductId((prev) => {
        if (prev === id) {
          const remaining = products.filter((p) => p.id !== id);
          return remaining[0]?.id || "";
        }
        return prev;
      });
    }
  };

  const deleteBatchProducts = async (ids: string[]): Promise<boolean> => {
    if (ids.length === 0) return false;
    const res = await deleteBatchProductsAction({ ids });
    if (res.success) {
      const idSet = new Set(ids);
      setProducts((prev) => prev.filter((p) => !idSet.has(p.id)));
      setScripts((prev) => prev.filter((s) => !idSet.has(s.productId)));
      setActiveProductId((prev) => {
        if (idSet.has(prev)) {
          const remaining = products.filter((p) => !idSet.has(p.id));
          return remaining[0]?.id || "";
        }
        return prev;
      });
      return true;
    }
    return false;
  };

  const addScript = async (productId: string, text: string) => {
    const res = await createScriptAction({ productId, text });
    if (res.success && res.data) {
      setScripts((prev) => [res.data as unknown as ScriptItem, ...prev]);
    }
  };

  const addBatchScripts = async (productId: string, texts: string[]): Promise<boolean> => {
    const res = await createBatchScriptsAction({ productId, texts });
    if (res.success && res.data) {
      const scrRes = await getScriptsAction();
      if (scrRes.success && scrRes.data) {
        setScripts(scrRes.data as unknown as ScriptItem[]);
      }
      return true;
    }
    return false;
  };

  const deleteScript = async (id: string) => {
    const res = await deleteScriptAction({ id });
    if (res.success) {
      setScripts((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const deleteBatchScripts = async (ids: string[]): Promise<boolean> => {
    if (ids.length === 0) return false;
    const res = await deleteBatchScriptsAction({ ids });
    if (res.success) {
      const idSet = new Set(ids);
      setScripts((prev) => prev.filter((s) => !idSet.has(s.id)));
      return true;
    }
    return false;
  };

  const addLocation = async (
    loc: string,
    vibe?: "casual_aesthetic" | "urban_adventure" | "universal"
  ) => {
    const res = await createLocationAction({ name: loc, vibe });
    if (res.success && res.data) {
      setLocationItems((prev) => [res.data, ...prev]);
      setLocations((prev) => [res.data.name, ...prev]);
    }
  };

  const addBatchLocations = async (
    names: string[],
    vibe?: "casual_aesthetic" | "urban_adventure" | "universal"
  ): Promise<boolean> => {
    const res = await createBatchLocationsAction({ names, vibe });
    if (res.success && res.data) {
      setLocationItems(res.data);
      setLocations(res.data.map((l) => l.name));
      return true;
    }
    return false;
  };

  const updateLocation = async (id: string, name: string, vibe: string) => {
    const res = await updateLocationAction({
      id,
      name,
      vibe: vibe as "casual_aesthetic" | "urban_adventure" | "universal",
    });
    if (res.success && res.data) {
      const updated = res.data;
      setLocationItems((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
      setLocations((prev) =>
        prev.map((loc) => {
          const old = locationItems.find((l) => l.id === id);
          return old && old.name === loc ? updated.name : loc;
        })
      );
    }
  };

  const deleteLocation = async (locOrId: string) => {
    const res = await deleteLocationAction({ name: locOrId, id: locOrId });
    if (res.success && res.data) {
      const deletedId = res.data.id;
      const deletedName = res.data.name;
      setLocationItems((prev) => prev.filter((l) => l.id !== deletedId && l.name !== deletedName));
      setLocations((prev) => prev.filter((l) => l !== deletedName && l !== deletedId));
    }
  };

  const deleteBatchLocations = async (idsOrNames: string[]): Promise<boolean> => {
    if (idsOrNames.length === 0) return false;
    const res = await deleteBatchLocationsAction({ idsOrNames });
    if (res.success) {
      const targetSet = new Set(idsOrNames);
      setLocationItems((prev) => prev.filter((l) => !targetSet.has(l.id) && !targetSet.has(l.name)));
      setLocations((prev) => prev.filter((l) => !targetSet.has(l)));
      return true;
    }
    return false;
  };

  const updateTemplates = async (female: string, male: string) => {
    const res = await updateTemplatesAction({ female, male });
    if (res.success && res.data) {
      setTemplates(res.data);
    }
  };

  const resetTemplates = async () => {
    const res = await resetTemplatesAction();
    if (res.success && res.data) {
      setTemplates(res.data);
    }
  };

  const login = (email: string, role?: "SUPERADMIN" | "CREATOR") => {
    const isSuper = role === "SUPERADMIN" || email === "superadmin121";
    const u: User = {
      email,
      name: isSuper ? "Master Superadmin" : email.split("@")[0] || "Creator",
      role: isSuper ? "SUPERADMIN" : "CREATOR",
    };
    setUser(u);
  };

  const logout = async () => {
    try {
      await logoutAction();
    } finally {
      setUser(null);
      router.push("/login");
      router.refresh();
    }
  };

  const refreshCurrentUser = async () => {
    const authRes = await getCurrentUserAction();
    if (authRes.user) {
      setUser(authRes.user);
    }
    if (authRes.creatorEmail) {
      setCreatorEmail(authRes.creatorEmail);
    }
  };

  const generatePrompt = (productId?: string): GenerationResult | null => {
    const targetId = productId || activeProductId;
    const product = products.find((p) => p.id === targetId) || products[0];
    if (!product) return null;

    return compileVideoPrompt({
      product,
      scripts,
      locations,
      templates,
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        scripts,
        locations,
        locationItems,
        templates,
        user,
        creatorEmail,
        refreshCurrentUser,
        activeProductId,
        setActiveProductId,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteBatchProducts,
        addScript,
        addBatchScripts,
        deleteScript,
        deleteBatchScripts,
        addLocation,
        addBatchLocations,
        updateLocation,
        deleteLocation,
        deleteBatchLocations,
        updateTemplates,
        resetTemplates,
        login,
        logout,
        generatePrompt,
        refreshData,
        isLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
