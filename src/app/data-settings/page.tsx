"use client";

import React, { useState } from "react";
import { Header } from "@/common/components/header";
import { Footer } from "@/common/components/footer";
import { useApp } from "@/common/context/app-context";
import { exportBackupJSON } from "@/common/utils/export-backup";
import {
  SettingsHeader,
  SettingsSyncBar,
  SettingsTabsRail,
  ProductCatalogTab,
  ScriptsTab,
  LocationsTab,
  MasterTemplatesTab,
  SecurityTab,
  SettingsTab,
  useUnsavedWarning,
} from "@/modules/settings";

export default function DataSettingsPage() {
  const {
    products,
    scripts,
    locations,
    locationItems,
    templates,
    user,
    creatorEmail,
    refreshCurrentUser,
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
  } = useApp();

  const [activeTab, setActiveTab] = useState<SettingsTab>("products");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const [prevTemplates, setPrevTemplates] = useState(templates);
  const [draftFemale, setDraftFemale] = useState(templates.female);
  const [draftMale, setDraftMale] = useState(templates.male);
  const [hasEdited, setHasEdited] = useState(false);

  if (!hasEdited && prevTemplates !== templates) {
    setPrevTemplates(templates);
    setDraftFemale(templates.female);
    setDraftMale(templates.male);
  }

  const hasUnsavedChanges = draftFemale !== templates.female || draftMale !== templates.male;
  useUnsavedWarning(hasUnsavedChanges);

  const filterProductId = products.some((p) => p.id === selectedProductId)
    ? selectedProductId
    : products[0]?.id || "";

  const handleExportJSON = () => {
    exportBackupJSON({
      version: "2.4",
      exportDate: new Date().toISOString(),
      products,
      scripts,
      locations,
      templates,
    });
  };

  const handleSaveAll = async () => {
    if (hasUnsavedChanges) {
      await updateTemplates(draftFemale, draftMale);
      setHasEdited(false);
    }
    setSaveStatus("Semua perubahan berhasil disimpan & disinkronkan!");
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleDraftChange = (female: string, male: string) => {
    setHasEdited(true);
    setDraftFemale(female);
    setDraftMale(male);
  };

  const handleTabChange = (newTab: SettingsTab) => {
    if (hasUnsavedChanges && newTab !== activeTab) {
      const confirmChange = window.confirm("Data perubahan belum disimpan. Ingin pindah tab?");
      if (!confirmChange) return;
    }
    setActiveTab(newTab);
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="w-full pt-16 flex-1 px-3 sm:px-gutter max-w-7xl mx-auto pb-24 sm:pb-space-xl">
        <div className="flex flex-col w-full py-space-sm sm:py-space-md gap-space-md sm:gap-space-lg">
          <SettingsSyncBar productsCount={products.length} />
          <SettingsHeader onExportJSON={handleExportJSON} />
          {saveStatus && (
            <div className="bg-secondary-container/20 border border-secondary/40 text-secondary px-4 py-2.5 rounded-xl flex items-center gap-2 animate-fade-in">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span className="font-body-md font-medium">{saveStatus}</span>
            </div>
          )}
          <SettingsTabsRail
            activeTab={activeTab}
            productsCount={products.length}
            scriptsCount={scripts.length}
            locationsCount={locations.length}
            onTabChange={handleTabChange}
          />
          <div className="flex flex-col gap-space-xl">
            {activeTab === "products" && (
              <ProductCatalogTab
                products={products}
                scripts={scripts}
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
                onDeleteBatchProducts={deleteBatchProducts}
                onSelectProductForScripts={(id) => {
                  setSelectedProductId(id);
                  setActiveTab("scripts");
                }}
              />
            )}
            {activeTab === "scripts" && (
              <ScriptsTab
                products={products}
                scripts={scripts}
                selectedProductId={filterProductId}
                onFilterChange={setSelectedProductId}
                onAddScript={addScript}
                onAddBatchScripts={addBatchScripts}
                onDeleteScript={deleteScript}
                onDeleteBatchScripts={deleteBatchScripts}
              />
            )}
            {activeTab === "locations" && (
              <LocationsTab
                locations={locations}
                locationItems={locationItems}
                onAddLocation={addLocation}
                onAddBatchLocations={addBatchLocations}
                onUpdateLocation={updateLocation}
                onDeleteLocation={deleteLocation}
                onDeleteBatchLocations={deleteBatchLocations}
              />
            )}
            {activeTab === "templates" && (
              <MasterTemplatesTab
                templates={templates}
                draftFemale={draftFemale}
                draftMale={draftMale}
                hasUnsavedChanges={hasUnsavedChanges}
                onDraftChange={handleDraftChange}
                onSaveTemplates={handleSaveAll}
              />
            )}
            {activeTab === "security" && (
              <SecurityTab
                user={user}
                creatorEmail={creatorEmail}
                onRefreshUser={refreshCurrentUser}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
