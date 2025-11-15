import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVendor } from '../hooks/use-vendor';

export const CreateVendorButton = () => {
  const { openCreateDrawer } = useVendor();

  return (
    <div className="flex items-center justify-between space-y-2">
      <Button onClick={openCreateDrawer}>
        <Plus className="mr-2 h-4 w-4" />
        Add Vendor
      </Button>
    </div>
  );
};
