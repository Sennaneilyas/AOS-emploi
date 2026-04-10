import { Link } from "react-router-dom";

/**
 * @param {{
 *  to: string
 *  children: import("react").ReactNode
 *  variant?: "primary" | "secondary" | "ghost"
 * }} props
 */
function Button({ to, children, variant = "primary" }) {
  const classByVariant = {
    primary: "bg-navy text-white hover:bg-navy-light",
    secondary: "bg-brand-orange text-white hover:bg-navy-light",
    ghost: "border border-gray-200 bg-white text-navy hover:bg-gray-50",
  };

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-150 ${classByVariant[variant]}`}
    >
      {children}
    </Link>
  );
}

export default Button;
