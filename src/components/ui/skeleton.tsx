import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Specific skeleton components for different sections
function SectionSkeleton({ 
  className,
  title = true,
  description = true,
  cards = 0,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: boolean;
  description?: boolean;
  cards?: number;
}) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {title && <Skeleton className="h-12 w-3/4 mx-auto" />}
      {description && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      )}
      {cards > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: cards }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HeroSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-6 text-center py-24", className)} {...props}>
      <Skeleton className="h-16 w-2/3 mx-auto" />
      <Skeleton className="h-6 w-4/5 mx-auto" />
      <Skeleton className="h-6 w-3/4 mx-auto" />
      <div className="pt-6">
        <Skeleton className="h-12 w-40 mx-auto" />
      </div>
    </div>
  )
}

function ContactSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      <Skeleton className="h-12 w-1/2 mx-auto" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-32" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}

export { 
  Skeleton, 
  SectionSkeleton, 
  HeroSkeleton, 
  ContactSkeleton 
}