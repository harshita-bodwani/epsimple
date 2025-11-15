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
import type { SiteCategory } from '../api/schema'
import { useSiteCategoryContext } from '../context/site-category-provider'

interface SiteCategoryRowActionsProps {
  row: Row<SiteCategory>
}

export function SiteCategoryRowActions({ row }: SiteCategoryRowActionsProps) {
  const { setEditingCategory, setIsDrawerOpen, setIsDeleteDialogOpen } =
    useSiteCategoryContext()
  const siteCategory = row.original

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
            setEditingCategory(siteCategory)
            setIsDrawerOpen(true)
          }}
        >
          <Pen className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setEditingCategory(siteCategory)
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
