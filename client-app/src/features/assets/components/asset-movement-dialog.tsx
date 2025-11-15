import { History, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AssetCurrentLocation } from './asset-current-location'
import { AssetMovementHistory } from './asset-movement-history'

interface AssetMovementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assetId: number
  assetTagId: string
  assetName: string
}

export function AssetMovementDialog({
  open,
  onOpenChange,
  assetId,
  assetTagId,
  assetName,
}: AssetMovementDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex max-h-[90vh] max-w-4xl flex-col overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <History className='h-5 w-5' />
            Asset Movement & Location
          </DialogTitle>
          <DialogDescription>
            {assetTagId} - {assetName}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue='current'
          className='flex flex-1 flex-col overflow-hidden'
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='current' className='flex items-center gap-2'>
              <MapPin className='h-4 w-4' />
              Current Location
            </TabsTrigger>
            <TabsTrigger value='history' className='flex items-center gap-2'>
              <History className='h-4 w-4' />
              Movement History
            </TabsTrigger>
          </TabsList>

          <div className='mt-4 flex-1 overflow-y-auto'>
            <TabsContent value='current' className='mt-0'>
              <AssetCurrentLocation assetId={assetId} assetTagId={assetTagId} />
            </TabsContent>

            <TabsContent value='history' className='mt-0'>
              <AssetMovementHistory assetId={assetId} assetTagId={assetTagId} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
