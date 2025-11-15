import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { GenericBulkUploadDialog } from '@/components/bulk-upload/GenericBulkUploadDialog'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { payeeTypesApi } from '../api/payee-types-api'
import { usePayeeTypes } from '../context/payee-types-provider'
import { PayeeTypesMutateDrawer } from './payee-types-mutate-drawer'

export function PayeeTypesDialogs() {
  const queryClient = useQueryClient()
  const {
    selectedPayeeType,
    setSelectedPayeeType,
    isDrawerOpen,
    setIsDrawerOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isBulkUploadDialogOpen,
    setIsBulkUploadDialogOpen,
  } = usePayeeTypes()

  const deleteMutation = useMutation({
    mutationFn: payeeTypesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payee-types'] })
      toast.success('Payee type deleted successfully')
      setIsDeleteDialogOpen(false)
      setSelectedPayeeType(null)
    },
  })

  const handleDelete = () => {
    if (selectedPayeeType) {
      deleteMutation.mutate(selectedPayeeType.id)
    }
  }

  return (
    <>
      <PayeeTypesMutateDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        currentRow={selectedPayeeType}
      />
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title='Delete Payee Type'
        desc={`Are you sure you want to delete the payee type "${selectedPayeeType?.payeeType}"? This action cannot be undone.`}
        handleConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
        destructive
      />
      <GenericBulkUploadDialog
        open={isBulkUploadDialogOpen}
        onOpenChange={setIsBulkUploadDialogOpen}
        config={{
          entityName: 'Payee Type',
          uploadEndpoint: '/api/payee-types/bulk-upload',
          errorReportEndpoint: '/api/payee-types/export-errors',
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payee-types'] })
          },
        }}
      />
    </>
  )
}
