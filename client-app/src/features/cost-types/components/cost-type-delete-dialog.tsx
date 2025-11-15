import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { costTypesApi } from '../api/cost-types-api'
import { useCostTypes } from '../context/cost-types-provider'

export function CostTypeDeleteDialog() {
  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedCostType,
    setSelectedCostType,
  } = useCostTypes()

  const deleteMutation = costTypesApi.useDelete()

  const handleDelete = async () => {
    if (selectedCostType) {
      await deleteMutation.mutateAsync(selectedCostType.id)
      setIsDeleteDialogOpen(false)
      setSelectedCostType(null)
    }
  }

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the cost
            type &quot;{selectedCostType?.typeName}&quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setSelectedCostType(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
