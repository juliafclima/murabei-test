import { Skeleton } from "@/components/ui/skeleton"

export function Loading() {
  return (
    <div className="flex flex-col space-y-3 mb-8">
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}