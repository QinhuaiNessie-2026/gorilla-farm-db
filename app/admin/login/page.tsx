import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-md px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">管理员登录</h1>
          <Link
            href="/"
            className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium backdrop-blur hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]"
          >
            返回首页
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur shadow-[0_18px_40px_rgba(0,0,0,0.10)]">
          <div className="text-sm font-semibold text-[color:var(--moss)]">
            占位页
          </div>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-faint)]">
            这里后续可以接入你选择的认证方式（例如 NextAuth、JWT、或内网账号系统）。
          </p>

          <div className="mt-5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--chip)] p-4 text-sm text-[color:var(--text-muted)]">
            当前尚未实现登录表单与权限控制。
          </div>
        </div>
      </div>
    </div>
  );
}

