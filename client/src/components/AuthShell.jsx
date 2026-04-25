const AuthShell = ({ title, subtitle, children, footer }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-3 py-6 sm:px-4 sm:py-8">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-xl shadow-black/30 backdrop-blur sm:p-7">
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl font-semibold text-white sm:text-2xl">{title}</h1>
          <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
        </div>
        {children}
        <p className="mt-6 text-sm text-zinc-400">{footer}</p>
      </section>
    </main>
  );
};

export default AuthShell;
