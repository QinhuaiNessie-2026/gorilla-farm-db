import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">生态事件</h1>
          <Link
            href="/"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium backdrop-blur hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
          >
            返回首页
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-faint)]">
          这里将承载病虫害、极端天气、引入/扩散、干预措施与影响评估等事件时间线。
        </p>
        <div className="mt-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur">
          <div className="text-sm font-semibold text-[color:var(--moss)]">
            下一步建议
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-[color:var(--text-muted)]">
            <li>定义事件类型、等级、影响范围与处置结果字段</li>
            <li>关联地块/样地、农作物批次、物种观察记录</li>
            <li>支持图片、气象数据与传感器数据作为证据</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

