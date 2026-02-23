export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-2xl px-4">
        <div className="h-8 bg-muted animate-pulse rounded-md w-1/3" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-2/3" />
        <div className="grid gap-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
