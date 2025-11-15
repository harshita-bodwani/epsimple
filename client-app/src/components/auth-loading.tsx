import { Loader2 } from 'lucide-react'

export function AuthLoading() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
        <p className='text-muted-foreground text-sm'>Initializing...</p>
      </div>
    </div>
  )
}
