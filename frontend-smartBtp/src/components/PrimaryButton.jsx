import React from 'react';

/**
 * PrimaryButton – reusable button component with loading and disabled states.
 *
 * Props:
 *   - children: button label or inner JSX
 *   - onClick: click handler
 *   - loading: boolean – shows spinner and disables button
 *   - disabled: boolean – disables button
 *   - type: "button" | "submit" | "reset" (default "button")
 *   - className: additional Tailwind classes
 */
export default function PrimaryButton({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
}) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary font-headline-md text-headline-md py-3 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 ${className}`}
    >
      {loading && (
        <span className="material-symbols-outlined animate-spin" aria-hidden="true">
          sync
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}
