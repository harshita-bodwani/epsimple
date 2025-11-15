import { useState } from 'react';
import { VendorCategoriesContext } from './vendor-categories-context';
import type { VendorCategoriesContextType } from './vendor-categories-context';
import type { VendorCategory } from '../api/schema';

export function VendorCategoriesProvider({ children }: { children: React.ReactNode }) {
  const [selectedVendorCategory, setSelectedVendorCategory] = useState<VendorCategory | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);

  const openBulkUploadDialog = () => setIsBulkUploadDialogOpen(true);
  const closeBulkUploadDialog = () => setIsBulkUploadDialogOpen(false);

  const value: VendorCategoriesContextType = {
    selectedVendorCategory,
    setSelectedVendorCategory,
    isDrawerOpen,
    setIsDrawerOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isBulkUploadDialogOpen,
    openBulkUploadDialog,
    closeBulkUploadDialog,
  };

  return (
    <VendorCategoriesContext.Provider value={value}>
      {children}
    </VendorCategoriesContext.Provider>
  );
}
