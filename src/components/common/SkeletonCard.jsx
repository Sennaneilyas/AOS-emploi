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
          className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="mt-4 h-6 w-4/5 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-full rounded bg-gray-100" />
          <div className="mt-2 h-4 w-11/12 rounded bg-gray-100" />
        </div>
      ))}
    </>
  );
}

export default SkeletonCard;
