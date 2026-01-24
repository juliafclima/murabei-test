export default function BookCardSkeleton() {
   return (
      <div className="columns-1 lg:columns-2 gap-8 mb-10">
         {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[200px] w-full bg-muted animate-pulse rounded-xl mb-8" />
         ))}
      </div>
   );
}
