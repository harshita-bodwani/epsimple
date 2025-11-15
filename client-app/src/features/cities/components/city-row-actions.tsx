import { type Row } from '@tanstack/react-table'
import { MoreHorizontal, Pen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { City } from '../api/schema'
import { useCityContext } from '../context/city-provider'

interface CityRowActionsProps {
  row: Row<City>
}

export function CityRowActions({ row }: CityRowActionsProps) {
  const { setEditingCity, setIsDrawerOpen, setIsDeleteDialogOpen } =
    useCityContext()
  const city = row.original

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
        <DropdownMenuItem
          onClick={() => {
            setEditingCity(city)
            setIsDrawerOpen(true)
          }}
        >
          <Pen className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setEditingCity(city)
            setIsDeleteDialogOpen(true)
          }}
        >
          <Trash2 className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
