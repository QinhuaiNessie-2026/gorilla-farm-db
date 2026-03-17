import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">数据概览</h1>
          <Link
            href="/"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium backdrop-blur hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
          >
            返回首页
          </Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-faint)]">
          这里将展示跨模块的趋势、关联与风险提示（按地块/时间/批次/物种）。
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Panel title="近期事件" hint="按影响等级排序" />
          <Panel title="物种观察" hint="重点监测/入侵标签" />
          <Panel title="农作物批次" hint="生命周期节点完成度" />
          <Panel title="预警" hint="阈值/异常检测" />
        </div>
      </div>
    </div>
  );
}

function Panel({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold tracking-tight font-[family:var(--font-display)]">
            {title}
          </div>
          <div className="mt-1 text-sm text-[color:var(--text-subtle)]">{hint}</div>
        </div>
        <div className="h-9 w-9 rounded-2xl bg-[color:var(--natgeo)]/90 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
      </div>
      <div className="mt-4 text-sm text-[color:var(--text-faint)]">
        这里是占位内容，后续可以接数据库查询与图表组件。
      </div>
    </div>
  );
}

