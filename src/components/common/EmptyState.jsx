/**
 * @param {{
 *  message: string
 * }} props
 */
function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}

export default EmptyState;
