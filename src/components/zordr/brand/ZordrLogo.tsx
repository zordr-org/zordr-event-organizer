type ZordrLogoProps = {
  showTagline?: boolean;
  compact?: boolean;
};

export default function ZordrLogo({
  showTagline = false,
  compact = false,
}: ZordrLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-xl bg-emerald-600 font-bold text-white ${
          compact ? "h-8 w-8 text-sm" : "h-10 w-10 text-base"
        }`}
      >
        Z
      </div>

      <div className={compact ? "hidden sm:block" : ""}>
        <div className="font-semibold tracking-tight text-slate-900">
          Zordr
        </div>

        {showTagline && (
          <div className="text-xs text-slate-500">
            Events. Experiences. Together.
          </div>
        )}
      </div>
    </div>
  );
}