import { useContext } from 'react';
import { VendorContext } from '../context/vendor-context';
import type { VendorContextType } from '../context/vendor-context';

export function useVendor(): VendorContextType {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error('useVendor must be used within VendorProvider');
  }
  return context;
}
