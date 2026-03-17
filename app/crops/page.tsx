import Link from "next/link";

export default function CropsPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">农作物记录</h1>
          <Link
            href="/"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium backdrop-blur hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
          >
            返回首页
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-faint)]">
          这里将承载播种、移栽、施肥、采收、批次与地块关联等数据录入与查询。
        </p>
        <div className="mt-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur">
          <div className="text-sm font-semibold text-[color:var(--moss)]">
            下一步建议
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-[color:var(--text-muted)]">
            <li>建立“地块/样地”与“批次”基础表</li>
            <li>定义农作物生命周期事件（播种/施肥/病害/采收）字段</li>
            <li>支持图片/附件作为证据链</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

