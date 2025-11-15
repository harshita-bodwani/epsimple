import { useNavigate } from '@tanstack/react-router'
import type { Row } from '@tanstack/react-table'
import {
  MoreHorizontal,
  Pencil,
  Trash,
  History,
  MapPin,
  Receipt,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Asset } from '../api/schema'
import { useAsset } from '../hooks/use-asset'

interface AssetRowActionsProps {
  row: Row<Asset>
}

export function AssetRowActions({ row }: AssetRowActionsProps) {
  const asset = row.original
  const navigate = useNavigate()
  const {
    setIsDrawerOpen,
    setEditingAsset,
    setIsDeleteDialogOpen,
    setAssetToDelete,
    setIsMovementDialogOpen,
    setAssetForMovement,
    setIsPlacementDialogOpen,
    setAssetForPlacement,
  } = useAsset()

  const handleEdit = () => {
    setEditingAsset(asset)
    setIsDrawerOpen(true)
  }

  const handleDelete = () => {
    setAssetToDelete(asset)
    setIsDeleteDialogOpen(true)
  }

  const handleViewMovement = () => {
    setAssetForMovement(asset)
    setIsMovementDialogOpen(true)
  }

  const handlePlaceAsset = () => {
    setAssetForPlacement(asset)
    setIsPlacementDialogOpen(true)
  }

  const handleManageExpenditures = () => {
    navigate({
      to: '/asset-expenditure-and-activity-works',
      search: { assetId: asset.id },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
        >
          <MoreHorizontal className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
        <DropdownMenuItem onClick={handlePlaceAsset}>
          <MapPin className='mr-2 h-4 w-4' />
          Place Asset
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleManageExpenditures}>
          <Receipt className='mr-2 h-4 w-4' />
          Manage Expenditures
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewMovement}>
          <History className='mr-2 h-4 w-4' />
          Movement History
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className='mr-2 h-4 w-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className='text-destructive'>
          <Trash className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
