import type { Row } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { AssetExpenditureAndActivityWork } from '../api/schema'
import { useAssetExpenditureAndActivityWork } from '../context/asset-expenditure-and-activity-work-provider'

interface AssetExpenditureAndActivityWorkRowActionsProps {
  row: Row<AssetExpenditureAndActivityWork>
}

export function AssetExpenditureAndActivityWorkRowActions({
  row,
}: AssetExpenditureAndActivityWorkRowActionsProps) {
  const { setSelectedExpenditure, openDrawer, openDeleteDialog } =
    useAssetExpenditureAndActivityWork()

  const handleEdit = () => {
    setSelectedExpenditure(row.original)
    openDrawer()
  }

  const handleDelete = () => {
    setSelectedExpenditure(row.original)
    openDeleteDialog()
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
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
