export function AuthLayout({ children }) {
  return (
    <main className="flex min-h-dvh flex-col p-2">
      <div className="flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-neutral-50 lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5    ">
        {children}
      </div>
    </main>
  )
}
