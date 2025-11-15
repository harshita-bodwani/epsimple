import { type Row } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { MovementType } from '../api/schema'
import { useMovementTypes } from '../context/movement-types-provider'

interface DataTableRowActionsProps {
  row: Row<MovementType>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const movementType = row.original
  const { setSelectedMovementType, setIsDrawerOpen, setIsDeleteDialogOpen } =
    useMovementTypes()

  const handleEdit = () => {
    setSelectedMovementType(movementType)
    setIsDrawerOpen(true)
  }

  const handleDelete = () => {
    setSelectedMovementType(movementType)
    setIsDeleteDialogOpen(true)
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
          <Pencil className='mr-2 h-4 w-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className='text-destructive'>
          <Trash className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
