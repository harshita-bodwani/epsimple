import { ArrowRight, History, Info } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface AssetPlacementConfirmDialogProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly onConfirm: () => void
  readonly assetTagId: string
  readonly currentLocationType: 'site' | 'warehouse' | 'datacenter'
  readonly currentLocationName: string
  readonly currentLocationCode: string
  readonly newLocationType: 'site' | 'warehouse' | 'datacenter'
}

const locationTypeLabels = {
  site: 'Site',
  warehouse: 'Warehouse',
  datacenter: 'Datacenter',
}

export function AssetPlacementConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  assetTagId,
  currentLocationType,
  currentLocationName,
  currentLocationCode,
  newLocationType,
}: AssetPlacementConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            <History className='h-5 w-5' />
            Move Asset
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-sm'>
                <Info className='h-4 w-4 flex-shrink-0' />
                <p>
                  Asset{' '}
                  <span className='font-mono font-semibold'>{assetTagId}</span>{' '}
                  is currently placed
                </p>
              </div>

              {/* Current Location */}
              <div className='bg-muted/50 rounded-lg border p-4'>
                <p className='text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase'>
                  Current Location
                </p>
                <div className='space-y-1'>
                  <Badge variant='outline' className='mb-1'>
                    {locationTypeLabels[currentLocationType]}
                  </Badge>
                  <p className='text-foreground font-medium'>
                    {currentLocationName}
                  </p>
                  <p className='text-muted-foreground font-mono text-sm'>
                    {currentLocationCode}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className='flex justify-center'>
                <ArrowRight className='text-muted-foreground h-5 w-5' />
              </div>

              {/* New Location */}
              <div className='bg-primary/5 border-primary/20 rounded-lg border p-4'>
                <p className='text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase'>
                  New Location
                </p>
                <Badge variant='default'>
                  {locationTypeLabels[newLocationType]}
                </Badge>
              </div>

              <Separator />

              {/* Info box */}
              <div className='space-y-2 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950/30'>
                <div className='flex items-start gap-2'>
                  <History className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400' />
                  <div className='space-y-1 text-sm'>
                    <p className='font-medium text-blue-900 dark:text-blue-100'>
                      Movement will be tracked
                    </p>
                    <p className='text-xs text-blue-700 dark:text-blue-300'>
                      The current placement will be marked as vacated and the
                      movement will be recorded in the asset's history. You can
                      view the full movement history from the asset details.
                    </p>
                  </div>
                </div>
              </div>

              <p className='text-foreground text-sm font-medium'>
                Do you want to proceed with moving this asset?
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            <History className='mr-2 h-4 w-4' />
            Move Asset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
