import Link from "next/link";

export default function SpeciesPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">物种记录</h1>
          <Link
            href="/"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium backdrop-blur hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
          >
            返回首页
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-faint)]">
          这里将承载物种观察（植物/动物/昆虫）、数量/迹象、栖息地与照片证据等。
        </p>
        <div className="mt-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur">
          <div className="text-sm font-semibold text-[color:var(--moss)]">
            下一步建议
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-[color:var(--text-muted)]">
            <li>建立物种名录（学名/俗名/分类/保护等级）</li>
            <li>观察记录关联地块、时间、观察者与证据</li>
            <li>为“入侵物种/重点监测”增加标签与提醒</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

