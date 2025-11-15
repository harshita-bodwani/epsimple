import { useQueryClient } from '@tanstack/react-query'
import { GenericBulkUploadDialog } from '@/components/bulk-upload/GenericBulkUploadDialog'
import { useCostTypes } from '../context/cost-types-provider'

export function CostTypesDialogs() {
  const queryClient = useQueryClient()
  const { isBulkUploadDialogOpen, closeBulkUploadDialog } = useCostTypes()

  const handleBulkUploadSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['cost-types'] })
  }

  const bulkUploadConfig = {
    entityName: 'CostType',
    uploadEndpoint: '/api/cost-types/bulk-upload',
    errorReportEndpoint: '/api/cost-types/export-errors',
    onSuccess: handleBulkUploadSuccess,
  }

  return (
    <>
      <GenericBulkUploadDialog
        open={isBulkUploadDialogOpen}
        onOpenChange={closeBulkUploadDialog}
        config={bulkUploadConfig}
      />
    </>
  )
}
