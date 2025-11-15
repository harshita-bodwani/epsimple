import { useState } from 'react'
import {
  Download,
  FileUp,
  ChevronDown,
  Loader2,
  FileSpreadsheet,
} from 'lucide-react'
import { toast } from 'sonner'
import { downloadFile } from '@/lib/api-utils'
import { useExport } from '@/hooks/useExport'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSiteCategoryContext } from '../context/site-category-provider'

export function SiteCategoryPrimaryButtons() {
  const { setIsBulkUploadDialogOpen } = useSiteCategoryContext()
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false)

  const { isExporting, handleExport } = useExport({
    entityName: 'SiteCategory',
    exportEndpoint: '/api/site-categories/export',
  })

  const handleDownloadTemplate = async () => {
    setIsDownloadingTemplate(true)
    try {
      await downloadFile(
        '/api/site-categories/bulk-upload/template',
        'SiteCategory_Upload_Template.xlsx'
      )
      toast.success('Template downloaded successfully')
    } catch (error) {
      toast.error('Failed to download template', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
      })
    } finally {
      setIsDownloadingTemplate(false)
    }
  }

  return (
    <div className='flex items-center gap-2'>
      {/* Bulk Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='h-9 px-3 text-sm font-medium'
          >
            <FileUp className='mr-2 h-4 w-4' />
            Bulk Actions
            <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-64'>
          <DropdownMenuItem
            onClick={handleDownloadTemplate}
            className='cursor-pointer'
            disabled={isDownloadingTemplate}
          >
            {isDownloadingTemplate ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin text-blue-600' />
            ) : (
              <Download className='mr-2 h-4 w-4 text-blue-600' />
            )}
            <span>Download Template</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsBulkUploadDialogOpen(true)}
            className='cursor-pointer'
          >
            <FileUp className='mr-2 h-4 w-4 text-orange-600' />
            <span>Bulk Upload</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleExport}
            className='cursor-pointer'
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin text-purple-600' />
            ) : (
              <FileSpreadsheet className='mr-2 h-4 w-4 text-purple-600' />
            )}
            <span>Export All Data</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
