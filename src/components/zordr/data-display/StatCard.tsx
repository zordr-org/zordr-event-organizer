import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
};

export default function StatCard({
  label,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            {icon}
          </div>
        )}
      </div>
    </article>
  );
}