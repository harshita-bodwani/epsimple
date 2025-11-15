import { createContext } from 'react';
import type { VendorType } from '../api/schema';

export interface VendorTypesContextType {
  selectedVendorType: VendorType | null;
  setSelectedVendorType: (vendorType: VendorType | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  isBulkUploadDialogOpen: boolean;
  setIsBulkUploadDialogOpen: (isOpen: boolean) => void;
  openBulkUploadDialog: () => void;
  closeBulkUploadDialog: () => void;
}

export const VendorTypesContext = createContext<VendorTypesContextType | undefined>(undefined);
