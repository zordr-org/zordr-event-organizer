import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

type FormFieldProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    hint?: string;
    children?: ReactNode;
  };

export default function FormField({
  label,
  error,
  hint,
  id,
  className = "",
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${
          error
            ? "border-red-400"
            : "border-slate-200"
        } ${className}`}
        {...inputProps}
      />

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}