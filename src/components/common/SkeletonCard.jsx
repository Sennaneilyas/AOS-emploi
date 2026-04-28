/**
 * @param {{
 *  count?: number
 * }} props
 */
function SkeletonCard({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index + 1}`}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          {/* Image skeleton */}
          <div className="aspect-[16/10] animate-pulse bg-gray-200" />
          
          <div className="p-6">
            <div className="flex animate-pulse items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-200" />
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="h-6 w-4/5 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-50">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonCard;
