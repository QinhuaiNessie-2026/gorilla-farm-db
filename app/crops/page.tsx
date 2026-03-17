import Link from "next/link";
import CropsBrowser from "./CropsBrowser";

export default function CropsPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium backdrop-blur hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
          >
            ← 返回首页
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--chip)] px-4 py-2 text-sm font-semibold text-[color:var(--text-faint)] backdrop-blur hover:bg-[color:var(--chip-strong)]"
          >
            去事件记录 → / Events
          </Link>
        </div>
      </div>

      <CropsBrowser />
    </div>
  );
}

