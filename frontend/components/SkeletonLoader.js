'use client';

export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-border"></div>
        <div className="h-4 bg-border rounded w-32"></div>
      </div>
      <div className="h-3 bg-border rounded w-full mb-2"></div>
      <div className="h-3 bg-border rounded w-3/4 mb-4"></div>
      <div className="h-2 bg-border rounded-full w-full"></div>
    </div>
  );
}

export function SkeletonLine({ width = 'w-full' }) {
  return <div className={`h-4 bg-border rounded ${width} animate-pulse`}></div>;
}

export function SkeletonContent() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-border rounded w-48"></div>
      <div className="h-4 bg-border rounded w-full"></div>
      <div className="h-4 bg-border rounded w-5/6"></div>
      <div className="h-4 bg-border rounded w-4/6"></div>
      <div className="h-32 bg-border rounded w-full mt-4"></div>
      <div className="h-4 bg-border rounded w-full"></div>
      <div className="h-4 bg-border rounded w-3/4"></div>
    </div>
  );
}
