"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CropRecord } from "./mockData";
import { cropRecords } from "./mockData";

type SolarTerm = {
  name: string;
  month: number; // 1-12
  day: number; // 1-31 (approx)
};

const SOLAR_TERMS: SolarTerm[] = [
  { name: "立春", month: 2, day: 4 },
  { name: "雨水", month: 2, day: 19 },
  { name: "惊蛰", month: 3, day: 6 },
  { name: "春分", month: 3, day: 21 },
  { name: "清明", month: 4, day: 5 },
  { name: "谷雨", month: 4, day: 20 },
  { name: "立夏", month: 5, day: 5 },
  { name: "小满", month: 5, day: 21 },
  { name: "芒种", month: 6, day: 6 },
  { name: "夏至", month: 6, day: 21 },
  { name: "小暑", month: 7, day: 7 },
  { name: "大暑", month: 7, day: 22 },
  { name: "立秋", month: 8, day: 7 },
  { name: "处暑", month: 8, day: 23 },
  { name: "白露", month: 9, day: 7 },
  { name: "秋分", month: 9, day: 23 },
  { name: "寒露", month: 10, day: 8 },
  { name: "霜降", month: 10, day: 23 },
  { name: "立冬", month: 11, day: 7 },
  { name: "小雪", month: 11, day: 22 },
  { name: "大雪", month: 12, day: 7 },
  { name: "冬至", month: 12, day: 21 },
  { name: "小寒", month: 1, day: 6 },
  { name: "大寒", month: 1, day: 20 },
];

const MONTH_LABELS = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

function monthIndexFromISO(iso: string) {
  const d = new Date(iso);
  return d.getMonth(); // 0-11
}

export default function CropsBrowser() {
  const [selected, setSelected] = useState<CropRecord | null>(null);

  const recordsByYear = useMemo(() => {
    const years = Array.from(new Set(cropRecords.map((r) => r.seasonYear))).sort(
      (a, b) => b - a,
    );
    return years.map((year) => ({
      year,
      records: cropRecords
        .filter((r) => r.seasonYear === year)
        .sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1)),
    }));
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-[family:var(--font-display)]">
            农作物记录浏览
            <span className="ml-2 align-middle text-xs font-semibold tracking-wide text-[color:var(--text-subtle)]">
              Crops
            </span>
          </h1>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-faint)]">
            按节气与月份快速定位记录；作物以“创建/上传时间”标注在时间轴上。点击作物卡片图片查看详情。
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 backdrop-blur shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
        <Timeline records={cropRecords} />
      </div>

      <div className="mt-8 space-y-10">
        {recordsByYear.map(({ year, records }) => (
          <section key={year}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-tight font-[family:var(--font-display)]">
                {year} 季度记录
                <span className="ml-2 align-middle text-xs font-semibold tracking-wide text-[color:var(--text-subtle)]">
                  Season Records
                </span>
              </h2>
              <div className="text-xs font-semibold tracking-wide text-[color:var(--text-subtle)]">
                {records.length} 条
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {records.map((r) => (
                <CropCard key={r.id} record={r} onOpen={() => setSelected(r)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {selected ? (
        <DetailModal record={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}

function Timeline({ records }: { records: CropRecord[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [recordTip, setRecordTip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="text-xs font-extrabold tracking-[0.18em] text-[color:var(--text-subtle)]">
          TIMELINE
        </div>
        <div className="text-xs font-semibold tracking-wide text-[color:var(--text-subtle)]">
          节气分段 · 月份刻度
        </div>
      </div>

      {recordTip ? (
        <div
          className="pointer-events-none absolute z-50 -translate-x-1/2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-1 text-xs font-semibold text-[color:var(--text-faint)] shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
          style={{ left: recordTip.x, top: recordTip.y }}
        >
          {recordTip.text}
        </div>
      ) : null}

      <div
        ref={scrollerRef}
        className="relative overflow-x-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--chip)]"
        onScroll={() => setRecordTip(null)}
      >
        <div className="min-w-[900px] px-4 py-4">
          {/* Seasonal bands */}
          {/* Outer container must allow tooltip overflow */}
          <div className="relative h-16 overflow-visible rounded-xl border border-[color:var(--border)] bg-white/10">
            {/* Inner layer clips the gradient to rounded corners */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,170,196,0.34) 0%, rgba(255,221,231,0.20) 18%, rgba(95,197,145,0.30) 34%, rgba(209,245,225,0.18) 50%, rgba(255,170,104,0.30) 66%, rgba(255,231,204,0.18) 80%, rgba(255,255,255,0.30) 92%, rgba(219,235,243,0.16) 100%)",
                }}
              />
            </div>

            {/* Month ticks */}
            <div className="pointer-events-none absolute inset-0">
              <div className="grid h-full grid-cols-12">
                {MONTH_LABELS.map((label, idx) => (
                  <div key={label} className="relative">
                    <div className="absolute inset-y-0 left-0 w-px bg-[color:var(--border)]/70" />
                    <div className="absolute bottom-2 left-2 text-xs font-semibold text-[color:var(--text-faint)]">
                      {label}
                    </div>
                    {idx === 11 ? (
                      <div className="absolute inset-y-0 right-0 w-px bg-[color:var(--border)]/70" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Record markers (based on startedAt / uploadedAt) */}
            <div className="absolute inset-0 z-20">
              {records.map((r) => {
                const d = new Date(r.startedAt);
                const month0 = d.getMonth();
                const day = Math.min(30, Math.max(1, d.getDate()));
                const xPct = (month0 + day / 30) / 12;
                const dot =
                  r.status === "已完成"
                    ? "rgba(255,170,104,0.95)"
                    : r.status === "暂停"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(95,197,145,0.95)";
                return (
                  <div
                    key={r.id}
                    className="absolute top-0 h-full w-8 -translate-x-1/2"
                    style={{ left: `${(xPct * 100).toFixed(4)}%` }}
                  >
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full shadow-[0_0_0_2px_rgba(0,0,0,0.18)]"
                      style={{
                        width: 10,
                        height: 10,
                        background: dot,
                        boxShadow:
                          "0 0 0 2px rgba(0,0,0,0.18), 0 0 0 6px rgba(255,255,255,0.10)",
                      }}
                      onMouseEnter={(e) => {
                        const dotRect = e.currentTarget.getBoundingClientRect();
                        const rootRect = rootRef.current?.getBoundingClientRect();
                        if (!rootRect) return;
                        setRecordTip({
                          text: `${r.name} · ${r.startedAt}`,
                          x: dotRect.left - rootRect.left + dotRect.width / 2,
                          y: dotRect.top - rootRect.top - 44,
                        });
                      }}
                      onMouseLeave={() => setRecordTip(null)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Solar terms ticks */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {SOLAR_TERMS.map((t) => {
                const month0 = t.month - 1;
                const xPct = (month0 + Math.min(30, Math.max(1, t.day)) / 30) / 12;
                return (
                  <div
                    key={t.name}
                    className="group absolute top-0 h-full"
                    style={{ left: `calc(${(xPct * 100).toFixed(4)}% - 0.5px)` }}
                  >
                    <div className="h-full w-px bg-[color:var(--moss)]/55" />
                    <div className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-1 text-xs font-semibold text-[color:var(--text-faint)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] group-hover:block">
                      {t.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[color:var(--text-subtle)]">
            <span>春 / Spring</span>
            <span>夏 / Summer</span>
            <span>秋 / Autumn</span>
            <span>冬 / Winter</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CropCard({ record, onOpen }: { record: CropRecord; onOpen: () => void }) {
  const startMonth = monthIndexFromISO(record.startedAt) + 1;

  return (
    <div className="group overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur shadow-[0_14px_32px_rgba(0,0,0,0.10)] transition hover:-translate-y-0.5 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full overflow-hidden"
        aria-label={`查看 ${record.name} 记录详情`}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={record.coverImage}
            alt={`${record.name} 记录封面`}
            fill
            className="object-cover opacity-[0.92] transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.38))]" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div>
              <div className="text-base font-semibold tracking-tight text-white drop-shadow">
                {record.name}
                {record.variety ? (
                  <span className="ml-2 text-xs font-semibold text-white/80">
                    {record.variety}
                  </span>
                ) : null}
              </div>
              <div className="mt-1 text-xs font-semibold text-white/80 drop-shadow">
                {record.plot} · {startMonth}月开始
              </div>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
              {record.status}
            </span>
          </div>
        </div>
      </button>

      <div className="p-5">
        <div className="text-sm leading-6 text-[color:var(--text-faint)]">
          {record.summary}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {record.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[color:var(--border)] bg-[color:var(--chip)] px-3 py-1 text-xs font-semibold text-[color:var(--text-faint)]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[color:var(--text-subtle)]">
          <span>{record.events.length} 条事件</span>
          <span className="transition group-hover:translate-x-0.5">查看详情 →</span>
        </div>
      </div>
    </div>
  );
}

function DetailModal({
  record,
  onClose,
}: {
  record: CropRecord;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--surface-strong)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5 backdrop-blur">
          <div>
            <div className="text-xs font-extrabold tracking-[0.18em] text-[color:var(--text-subtle)]">
              RECORD DETAIL
            </div>
            <div className="mt-1 text-xl font-semibold tracking-tight font-[family:var(--font-display)]">
              {record.name}
              {record.variety ? (
                <span className="ml-2 align-middle text-sm font-semibold text-[color:var(--text-faint)]">
                  {record.variety}
                </span>
              ) : null}
            </div>
            <div className="mt-1 text-sm text-[color:var(--text-faint)]">
              {record.plot} · {record.seasonYear} · {record.status}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--chip)] px-4 py-2 text-sm font-semibold text-[color:var(--text-faint)] hover:bg-[color:var(--chip-strong)]"
          >
            关闭
          </button>
        </div>

        <div className="grid gap-0 overflow-y-auto sm:grid-cols-12">
          <div className="sm:col-span-5">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={record.coverImage}
                alt={`${record.name} 详情图片`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.30))]" />
            </div>
          </div>
          <div className="p-5 sm:col-span-7">
            <div className="text-sm leading-7 text-[color:var(--text-faint)]">
              {record.summary}
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold tracking-tight font-[family:var(--font-display)]">
                事件时间线
                <span className="ml-2 align-middle text-xs font-semibold tracking-wide text-[color:var(--text-subtle)]">
                  Events
                </span>
              </div>
              <div className="mt-3 space-y-3">
                {record.events
                  .slice()
                  .sort((a, b) => (a.date > b.date ? -1 : 1))
                  .map((e) => (
                    <div
                      key={e.id}
                      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--chip)] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-sm font-semibold text-[color:var(--text)]">
                          {e.type}
                          <span className="ml-2 text-xs font-semibold text-[color:var(--text-subtle)]">
                            {e.date}
                          </span>
                        </div>
                      </div>
                      {e.note ? (
                        <div className="mt-1 text-sm text-[color:var(--text-faint)]">
                          {e.note}
                        </div>
                      ) : null}
                      {e.image ? (
                        <button
                          type="button"
                          onClick={() => setLightbox(e.image ?? null)}
                          className="mt-3 block w-full overflow-hidden rounded-xl border border-[color:var(--border)] bg-white/5 text-left"
                          aria-label={`查看 ${e.type} 配图`}
                        >
                          <div className="relative aspect-[16/9] w-full">
                            <Image
                              src={e.image}
                              alt={`${e.type} 配图`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 420px"
                            />
                          </div>
                        </button>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur hover:bg-white/15"
          >
            关闭
          </button>
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={lightbox}
                alt="事件配图"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

