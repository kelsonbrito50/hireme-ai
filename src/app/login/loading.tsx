export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="h-10 bg-muted animate-pulse rounded-md w-2/3 mx-auto" />
        <div className="h-4 bg-muted animate-pulse rounded-md w-1/2 mx-auto" />
        <div className="space-y-4 mt-6">
          <div className="h-10 bg-muted animate-pulse rounded-md" />
          <div className="h-10 bg-muted animate-pulse rounded-md" />
          <div className="h-10 bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
}
