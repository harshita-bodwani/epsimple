import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { SiteCodeGenerator } from '../api/schema'
import { useSiteCodeGeneratorContext } from '../context/site-code-generator-provider'

interface SiteCodeGeneratorRowActionsProps {
  row: Row<SiteCodeGenerator>
}

export function SiteCodeGeneratorRowActions({
  row,
}: SiteCodeGeneratorRowActionsProps) {
  const {
    setEditingGenerator,
    setIsDrawerOpen,
    setGeneratorToDelete,
    setIsDeleteDialogOpen,
  } = useSiteCodeGeneratorContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setEditingGenerator(row.original)
            setIsDrawerOpen(true)
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setGeneratorToDelete(row.original)
            setIsDeleteDialogOpen(true)
          }}
          className='text-destructive focus:text-destructive'
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
