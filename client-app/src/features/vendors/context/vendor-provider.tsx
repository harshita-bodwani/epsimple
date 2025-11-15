import { useState } from 'react';
import { VendorContext } from './vendor-context';
import type { VendorContextType } from './vendor-context';
import type { Vendor } from '../api/vendors-api';

export function VendorProvider({ children }: { children: React.ReactNode }) {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);

  const openCreateDrawer = () => {
    setSelectedVendor(null);
    setDrawerMode('create');
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setDrawerMode('edit');
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedVendor(null);
  };

  const openBulkUploadDialog = () => setIsBulkUploadDialogOpen(true);
  const closeBulkUploadDialog = () => setIsBulkUploadDialogOpen(false);

  const value: VendorContextType = {
    selectedVendor,
    setSelectedVendor,
    isDrawerOpen,
    setIsDrawerOpen,
    drawerMode,
    setDrawerMode,
    openCreateDrawer,
    openEditDrawer,
    closeDrawer,
    isBulkUploadDialogOpen,
    openBulkUploadDialog,
    closeBulkUploadDialog,
  };

  return (
    <VendorContext.Provider value={value}>
      {children}
    </VendorContext.Provider>
  );
}
