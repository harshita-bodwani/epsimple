import { useState } from 'react'
import { format } from 'date-fns'
import {
  ArrowRight,
  Calendar,
  Loader2,
  PackageOpen,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  assetMovementApi,
  type AssetMovementHistory,
} from '../api/asset-movement-api'
import { getLocationIcon, getLocationBadgeColor } from '../lib/location-utils'

interface AssetMovementHistoryProps {
  assetId: number
  assetTagId?: string
}

const parseLocationFromMovement = (
  movement: AssetMovementHistory,
  direction: 'from' | 'to'
) => {
  if (direction === 'from') {
    if (movement.fromFactory) {
      // Determine the type based on the value
      const isNewlyPlaced = movement.fromFactory
        .toLowerCase()
        .includes('newly placed')
      return {
        type: isNewlyPlaced ? 'Newly Placed' : 'Factory',
        name: movement.fromFactory,
        code: isNewlyPlaced ? 'NEW' : 'FACTORY',
      }
    }
    if (movement.fromSiteId) {
      return {
        type: 'Site',
        name: movement.fromSiteName || '',
        code: movement.fromSiteCode || '',
      }
    }
    if (movement.fromWarehouseId) {
      return {
        type: 'Warehouse',
        name: movement.fromWarehouseName || '',
        code: movement.fromWarehouseCode || '',
      }
    }
    if (movement.fromDatacenterId) {
      return {
        type: 'Datacenter',
        name: movement.fromDatacenterName || '',
        code: movement.fromDatacenterCode || '',
      }
    }
    return null
  } else {
    if (movement.toSiteId) {
      return {
        type: 'Site',
        name: movement.toSiteName || '',
        code: movement.toSiteCode || '',
      }
    }
    if (movement.toWarehouseId) {
      return {
        type: 'Warehouse',
        name: movement.toWarehouseName || '',
        code: movement.toWarehouseCode || '',
      }
    }
    if (movement.toDatacenterId) {
      return {
        type: 'Datacenter',
        name: movement.toDatacenterName || '',
        code: movement.toDatacenterCode || '',
      }
    }
    return null
  }
}

export function AssetMovementHistory({
  assetId,
  assetTagId,
}: AssetMovementHistoryProps) {
  const [page, setPage] = useState(0)
  const pageSize = 20

  const { data, isLoading, error } = assetMovementApi.useMovementHistory(
    assetId,
    page,
    pageSize
  )

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <TrendingUp className='h-5 w-5' />
            Movement History
          </CardTitle>
          <CardDescription>
            {assetTagId && `Asset: ${assetTagId}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center py-8'>
            <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <TrendingUp className='h-5 w-5' />
            Movement History
          </CardTitle>
          <CardDescription>
            {assetTagId && `Asset: ${assetTagId}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-destructive text-sm'>
            Failed to load movement history
          </p>
        </CardContent>
      </Card>
    )
  }

  const movements = data?.content || []
  const hasMovements = movements.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <TrendingUp className='h-5 w-5' />
          Movement History
        </CardTitle>
        <CardDescription>
          {assetTagId && `Asset: ${assetTagId}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasMovements ? (
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <PackageOpen className='text-muted-foreground/50 mb-4 h-12 w-12' />
            <p className='text-muted-foreground text-sm font-medium'>
              No movement history
            </p>
            <p className='text-muted-foreground mt-1 text-xs'>
              This asset hasn't been moved yet
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {/* Timeline */}
            <div className='relative space-y-6'>
              {movements.map((movement, index) => {
                const fromLocation = parseLocationFromMovement(movement, 'from')
                const toLocation = parseLocationFromMovement(movement, 'to')
                const isLast = index === movements.length - 1

                return (
                  <div key={movement.id} className='relative pl-8'>
                    {/* Timeline line */}
                    {!isLast && (
                      <div className='bg-border absolute top-6 bottom-0 left-[11px] w-[2px]' />
                    )}

                    {/* Timeline dot */}
                    <div className='border-background bg-primary absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2'>
                      <div className='bg-primary-foreground h-2 w-2 rounded-full' />
                    </div>

                    {/* Movement card */}
                    <div className='bg-card rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md'>
                      <div className='mb-3 flex items-start justify-between gap-4'>
                        <div className='flex-1'>
                          <div className='mb-1 flex items-center gap-2'>
                            <Badge variant='outline' className='font-medium'>
                              {movement.movementType}
                            </Badge>
                            <span className='text-muted-foreground flex items-center gap-1 text-xs'>
                              <Calendar className='h-3 w-3' />
                              {format(new Date(movement.movedAt), 'PPp')}
                            </span>
                          </div>
                          {movement.movementDescription && (
                            <p className='text-muted-foreground mt-1 text-xs'>
                              {movement.movementDescription}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* From and To locations */}
                      <div className='flex flex-wrap items-center gap-3'>
                        {/* From location */}
                        {fromLocation && (
                          <div className='flex items-center gap-2'>
                            <Badge
                              variant='outline'
                              className={cn(
                                'flex items-center gap-1.5 px-2.5 py-1',
                                getLocationBadgeColor(fromLocation.type)
                              )}
                            >
                              {getLocationIcon(fromLocation.type)}
                              <div className='flex flex-col items-start'>
                                <span className='text-[10px] font-semibold uppercase opacity-70'>
                                  From
                                </span>
                                <span className='text-xs font-medium'>
                                  {fromLocation.code || fromLocation.name}
                                </span>
                              </div>
                            </Badge>
                          </div>
                        )}

                        {/* Arrow */}
                        {fromLocation && toLocation && (
                          <ArrowRight className='text-muted-foreground h-4 w-4 flex-shrink-0' />
                        )}

                        {/* To location */}
                        {toLocation && (
                          <div className='flex items-center gap-2'>
                            <Badge
                              variant='outline'
                              className={cn(
                                'flex items-center gap-1.5 px-2.5 py-1',
                                getLocationBadgeColor(toLocation.type)
                              )}
                            >
                              {getLocationIcon(toLocation.type)}
                              <div className='flex flex-col items-start'>
                                <span className='text-[10px] font-semibold uppercase opacity-70'>
                                  To
                                </span>
                                <span className='text-xs font-medium'>
                                  {toLocation.code || toLocation.name}
                                </span>
                              </div>
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <>
                <Separator />
                <div className='flex items-center justify-between'>
                  <p className='text-muted-foreground text-xs'>
                    Page {page + 1} of {data.totalPages}
                  </p>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        setPage((p) => Math.min(data.totalPages - 1, p + 1))
                      }
                      disabled={page >= data.totalPages - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
