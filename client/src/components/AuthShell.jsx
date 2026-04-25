const AuthShell = ({ title, subtitle, children, footer }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-xl shadow-black/30 backdrop-blur">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
        </div>
        {children}
        <p className="mt-6 text-sm text-zinc-400">{footer}</p>
      </section>
    </main>
  );
};

export default AuthShell;
