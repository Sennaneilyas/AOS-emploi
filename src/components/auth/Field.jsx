/**
 * Shared form field wrapper for auth forms.
 * Renders a labeled input with an icon, optional hint, and error message.
 *
 * @param {{ label: string, icon: import("lucide-react").LucideIcon, error?: string, hint?: string, children: React.ReactNode }} props
 */
function Field({ label, icon: Icon, error, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-navy">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-400">
          <Icon size={16} />
        </span>
        {children}
      </div>
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Field;
