import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--paper)] text-[color:var(--ink)]">
      {/* Background: paper + topo + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.22]"
          style={{
            backgroundImage: "url(/the_farm.jpg)",
            filter: "saturate(0.9) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(58,122,91,0.18),transparent_60%),radial-gradient(900px_500px_at_80%_10%,rgba(215,197,154,0.22),transparent_55%),radial-gradient(900px_650px_at_30%_90%,rgba(138,90,60,0.14),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.22] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,rgba(15,26,20,0.06),rgba(15,26,20,0.06)_1px,transparent_1px,transparent_9px),repeating-linear-gradient(90deg,rgba(15,26,20,0.04),rgba(15,26,20,0.04)_1px,transparent_1px,transparent_11px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_0%,transparent,rgba(0,0,0,0.22)),radial-gradient(closest-side_at_50%_100%,transparent,rgba(0,0,0,0.22))] opacity-[0.18]" />
      </div>

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-1.5 rounded-full bg-[color:var(--natgeo)] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-[color:var(--moss)]">
              Gorilla Farm
            </div>
            <div className="text-base font-semibold tracking-tight font-[family:var(--font-display)]">
              生态数据库
              <span className="ml-2 align-middle text-xs font-semibold tracking-wide text-[color:var(--text-subtle)]">
                Ecological Database
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/admin/login"
          className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium backdrop-blur transition hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--natgeo)] shadow-[0_0_0_2px_rgba(247,208,0,0.25)]" />
          管理员登录
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:pt-14">
        <section className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--chip)] px-3 py-1 text-xs font-semibold tracking-wide text-[color:var(--moss)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--leaf)]" />
              记录 · 溯源 · 复盘
              <span className="mx-1 text-[color:var(--text-subtle)]">/</span>
              Record · Trace · Review
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight font-[family:var(--font-display)] sm:text-5xl">
              <span className="block">红山森林动物园</span>
              <span className="block">南门新区农田生态系统记录</span>
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-[color:var(--text-muted)]">
              “唯有了解，才会关心；唯有关心，才会行动；唯有行动，生命才有希望。”
              <span className="ml-2 text-[color:var(--text-subtle)]">
                — Jane Goodall
              </span>
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur shadow-[0_18px_40px_rgba(0,0,0,0.10)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold tracking-[0.18em] text-[color:var(--text-subtle)]">
                    FIELD SNAPSHOT
                  </div>
                  <div className="mt-1 text-lg font-semibold tracking-tight font-[family:var(--font-display)]">
                    今日农田与栖息地概览
                  </div>
                </div>
                <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--chip-strong)] px-3 py-1 text-xs font-semibold tracking-wide text-[color:var(--text-faint)]">
                  实验农田 · 大型湿地
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <SnapshotStat
                  title="作物块"
                  subtitle="Plots"
                  value="24"
                  note="正在记录管理措施"
                />
                <SnapshotStat
                  title="重点物种"
                  subtitle="Key Species"
                  value="38"
                  note="含大雁等迁徙物种"
                />
                <SnapshotStat
                  title="事件记录"
                  subtitle="Events"
                  value="120+"
                  note="气候 · 病虫害 · 保护"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <EntryCard
              href="/crops"
              title="农作物记录"
              subtitle="Crops"
              desc="播种、移栽、施肥、采收与批次溯源。"
              tone="leaf"
              icon="sprout"
            />
            <EntryCard
              href="/species"
              title="物种记录"
              subtitle="Species"
              desc="植物/动物/昆虫观察、数量、栖息地与照片证据。"
              tone="moss"
              icon="paw"
            />
            <EntryCard
              href="/events"
              title="生态事件"
              subtitle="Ecological Events"
              desc="病虫害、极端天气、引入/扩散与干预措施。"
              tone="clay"
              icon="storm"
            />
            <EntryCard
              href="/dashboard"
              title="数据概览"
              subtitle="Dashboard"
              desc="按地块与时间查看趋势、关联与风险提示。"
              tone="sand"
              icon="compass"
            />
          </div>
        </section>

        <footer className="mt-14 flex flex-col gap-2 border-t border-[color:var(--border)] pt-6 text-sm text-[color:var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Gorilla Farm</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--natgeo)]" />
              红山森林动物园志愿者作品
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function EntryCard({
  href,
  title,
  subtitle,
  desc,
  tone,
  icon,
}: {
  href: string;
  title: string;
  subtitle: string;
  desc: string;
  tone: "leaf" | "moss" | "clay" | "sand";
  icon: "sprout" | "paw" | "storm" | "compass";
}) {
  const toneColor =
    tone === "leaf"
      ? "var(--leaf)"
      : tone === "moss"
        ? "var(--moss)"
        : tone === "clay"
          ? "var(--clay)"
          : "var(--sand)";

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--natgeo)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition group-hover:opacity-35"
        style={{ background: `radial-gradient(circle, ${toneColor}, transparent 65%)` }}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold tracking-tight font-[family:var(--font-display)]">
            {title}
          </div>
          <div className="mt-0.5 text-xs font-semibold tracking-wide text-[color:var(--text-subtle)]">
            {subtitle}
          </div>
          <div className="mt-1 text-sm leading-6 text-[color:var(--text-faint)]">{desc}</div>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--chip)]"
          style={{ boxShadow: `0 0 0 1px color-mix(in srgb, ${toneColor} 22%, transparent)` }}
        >
          <Icon kind={icon} toneColor={toneColor} />
        </div>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--text-muted)]">
        进入
        <span
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}

function SnapshotStat({
  title,
  subtitle,
  value,
  note,
}: {
  title: string;
  subtitle: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--chip)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
      <div className="text-xs font-semibold tracking-wide text-[color:var(--text-faint)]">
        {title}
        <span className="ml-2 text-[color:var(--text-subtle)]">{subtitle}</span>
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--text)]">
        {value}
      </div>
      <div className="mt-1 text-xs text-[color:var(--text-subtle)]">{note}</div>
    </div>
  );
}

function Icon({ kind, toneColor }: { kind: string; toneColor: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  const stroke = { stroke: toneColor, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (kind === "sprout") {
    return (
      <svg {...common}>
        <path {...stroke} d="M12 21v-8" />
        <path {...stroke} d="M12 13c0-6 5-8 9-8 0 6-4 8-9 8Z" />
        <path {...stroke} d="M12 13c0-5-4-7-9-7 0 5 4 7 9 7Z" />
      </svg>
    );
  }
  if (kind === "paw") {
    return (
      <svg {...common}>
        <path {...stroke} d="M8.5 12.5c-1.7 0-3 1.4-3 3.1 0 2.6 2.7 4.4 6.5 4.4s6.5-1.8 6.5-4.4c0-1.7-1.3-3.1-3-3.1-1 0-1.9.5-2.5 1.2-.6-.7-1.5-1.2-2.5-1.2Z" />
        <path {...stroke} d="M7.2 9.7c-.6-.9-.4-2.1.4-2.7.9-.6 2.1-.4 2.7.4.6.9.4 2.1-.4 2.7-.9.6-2.1.4-2.7-.4Z" />
        <path {...stroke} d="M14.1 10.1c-.8-.6-1-1.8-.4-2.6.6-.8 1.8-1 2.6-.4.8.6 1 1.8.4 2.6-.6.8-1.8 1-2.6.4Z" />
        <path {...stroke} d="M11 9.2c-.7-.7-.7-1.9 0-2.6.7-.7 1.9-.7 2.6 0 .7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0Z" />
      </svg>
    );
  }
  if (kind === "storm") {
    return (
      <svg {...common}>
        <path {...stroke} d="M7 16a4 4 0 0 1 0-8 5 5 0 0 1 9.6 1.4A3.5 3.5 0 0 1 17.5 16H7Z" />
        <path {...stroke} d="M11 21l2-4h-2l2-4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path {...stroke} d="M12 2l7 7-7 13L5 9l7-7Z" />
      <path {...stroke} d="M12 2v20" />
      <path {...stroke} d="M5 9h14" />
    </svg>
  );
}
