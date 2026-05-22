'use client';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-[#050810]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Blobs */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 animate-blob animation-delay-2000"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-5 animate-blob animation-delay-4000"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 8, 16, 0.7) 100%)',
        }}
      />
    </div>
  );
}
