'use client';

import { motion } from 'framer-motion';
import { QrCode, Shield } from 'lucide-react';
import type { CertificateData } from '@/lib/certificate';
import { CERT_STYLE_CONFIG } from '@/lib/certificate';

interface CertificatePreviewProps {
  data: CertificateData;
  certId?: string;
  scale?: number;
}

export default function CertificatePreview({ data, certId, scale = 1 }: CertificatePreviewProps) {
  const config = CERT_STYLE_CONFIG[data.certStyle];
  const id = certId || 'PX-PREVIEW-0000';
  const date = data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${100 / scale}%`,
      }}
    >
      {/* Certificate card */}
      <div
        className="relative w-full aspect-[1.41/1] rounded-xl overflow-hidden select-none"
        style={{ background: config.colors.bg }}
        id="certificate-render"
      >
        {/* Outer border frame */}
        <div
          className="absolute inset-3 rounded-lg"
          style={{ border: `2px solid ${config.colors.border}40` }}
        />
        <div
          className="absolute inset-5 rounded-lg"
          style={{ border: `1px solid ${config.colors.border}20` }}
        />

        {/* Corner ornaments */}
        {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-6 h-6`}
            style={{
              borderTop: pos.includes('top') ? `2px solid ${config.colors.border}` : 'none',
              borderBottom: pos.includes('bottom') ? `2px solid ${config.colors.border}` : 'none',
              borderLeft: pos.includes('left') ? `2px solid ${config.colors.border}` : 'none',
              borderRight: pos.includes('right') ? `2px solid ${config.colors.border}` : 'none',
            }}
          />
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center">
          {/* Header */}
          <div>
            <div
              className="text-xs font-mono tracking-[0.3em] uppercase mb-1 opacity-60"
              style={{ color: config.colors.accent }}
            >
              {data.organization || 'Organization Name'}
            </div>
            <div
              className="text-[10px] font-mono tracking-[0.15em] uppercase opacity-40"
              style={{ color: config.colors.text }}
            >
              Certificate of Achievement
            </div>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-4">
            {/* Decorative line */}
            <div className="flex items-center gap-3 w-full max-w-xs">
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${config.colors.border}60, transparent)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.colors.border }} />
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${config.colors.border}60, transparent)` }} />
            </div>

            <div
              className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50"
              style={{ color: config.colors.text }}
            >
              This certifies that
            </div>

            <div
              className="font-display text-3xl font-bold leading-tight"
              style={{ color: config.colors.title }}
            >
              {data.recipientName || 'Recipient Name'}
            </div>

            <div
              className="font-mono text-[10px] tracking-[0.15em] uppercase opacity-50"
              style={{ color: config.colors.text }}
            >
              has successfully completed
            </div>

            <div
              className="text-xl font-bold font-display"
              style={{ color: config.colors.text }}
            >
              {data.achievementTitle || 'Achievement Title'}
            </div>

            {data.description && (
              <div
                className="text-[11px] max-w-xs leading-relaxed opacity-60 mt-1"
                style={{ color: config.colors.text }}
              >
                {data.description}
              </div>
            )}

            {/* Decorative line */}
            <div className="flex items-center gap-3 w-full max-w-xs mt-1">
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${config.colors.border}60, transparent)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.colors.border }} />
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${config.colors.border}60, transparent)` }} />
            </div>
          </div>

          {/* Footer */}
          <div className="w-full flex items-end justify-between">
            {/* Date + Signature */}
            <div className="text-left">
              <div
                className="font-display text-sm font-semibold italic mb-1"
                style={{ color: config.colors.text, opacity: 0.7 }}
              >
                Authorized
              </div>
              <div
                className="w-20 h-px mb-1"
                style={{ background: `${config.colors.border}80` }}
              />
              <div
                className="text-[9px] opacity-40 font-mono"
                style={{ color: config.colors.text }}
              >
                {date}
              </div>
            </div>

            {/* QR Placeholder */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-12 h-12 rounded flex items-center justify-center"
                style={{ border: `1px solid ${config.colors.border}40`, background: `${config.colors.accent}10` }}
              >
                <QrCode className="w-6 h-6 opacity-40" style={{ color: config.colors.title }} />
              </div>
              <div
                className="text-[7px] font-mono opacity-30"
                style={{ color: config.colors.text }}
              >
                VERIFY
              </div>
            </div>

            {/* Cert ID */}
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Shield className="w-2.5 h-2.5 opacity-40" style={{ color: config.colors.title }} />
                <span className="text-[8px] font-mono opacity-30" style={{ color: config.colors.text }}>
                  ON-CHAIN
                </span>
              </div>
              <div
                className="text-[8px] font-mono opacity-40"
                style={{ color: config.colors.text }}
              >
                {id}
              </div>
            </div>
          </div>
        </div>

        {/* Style-specific overlays */}
        {data.certStyle === 'cyberpunk' && (
          <>
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, rgba(168,85,247,0.015) 0px, rgba(168,85,247,0.015) 1px, transparent 1px, transparent 4px)',
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </>
        )}
        {data.certStyle === 'gold' && (
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.05) 0%, transparent 70%)',
            }}
          />
        )}
      </div>
    </div>
  );
}
