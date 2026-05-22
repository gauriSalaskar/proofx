'use client';

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/5 animate-pulse">
      {/* Certificate preview placeholder */}
      <div className="p-4 pb-0">
        <div className="aspect-[1.41/1] rounded-xl bg-white/5 shimmer" />
      </div>
      {/* Card info */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/5 rounded-lg w-3/4 shimmer" />
        <div className="h-3 bg-white/5 rounded-lg w-1/2 shimmer" />
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-8 bg-white/5 rounded-lg shimmer" />
          <div className="w-8 h-8 bg-white/5 rounded-lg shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ className = '' }: { className?: string }) {
  return <div className={`bg-white/5 rounded shimmer ${className}`} />;
}

export function SkeletonVerify() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-12 bg-white/5 rounded-2xl shimmer" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="aspect-[1.41/1] bg-white/5 rounded-2xl shimmer" />
        <div className="space-y-4">
          <div className="h-40 bg-white/5 rounded-2xl shimmer" />
          <div className="h-32 bg-white/5 rounded-2xl shimmer" />
          <div className="h-24 bg-white/5 rounded-2xl shimmer" />
        </div>
      </div>
    </div>
  );
}
