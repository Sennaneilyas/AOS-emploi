/**
 * @param {{
 *  message: string
 *  onRetry?: () => void
 *  retryLabel?: string
 * }} props
 */
function ErrorBanner({ message, onRetry, retryLabel }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-start">
      <p className="text-sm font-medium text-red-700">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition-colors duration-150 hover:bg-red-100"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}

export default ErrorBanner;
