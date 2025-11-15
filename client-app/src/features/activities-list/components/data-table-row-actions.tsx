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
import type { ActivitiesList } from '../api/schema'
import { useActivitiesList } from '../context/activities-list-provider'

interface DataTableRowActionsProps {
  row: Row<ActivitiesList>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const activitiesList = row.original
  const {
    setSelectedActivitiesList,
    setIsDrawerOpen,
    setIsDeleteDialogOpen,
    setIsEditMode,
  } = useActivitiesList()

  const handleEdit = () => {
    setSelectedActivitiesList(activitiesList)
    setIsEditMode(true)
    setIsDrawerOpen(true)
  }

  const handleDelete = () => {
    setSelectedActivitiesList(activitiesList)
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
