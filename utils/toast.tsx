import toast from 'react-hot-toast';
import { CheckCircle2, AlertTriangle, Loader2, ExternalLink } from 'lucide-react';

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  loading: (msg: string) => toast.loading(msg),

  tx: (txHash: string) =>
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          <div>
            <div className="text-white text-sm font-medium">Transaction submitted</div>
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 text-xs flex items-center gap-1 hover:underline"
            >
              View on BaseScan <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button onClick={() => toast.dismiss(t.id)} className="ml-2 text-gray-500 text-xs">✕</button>
        </div>
      ),
      { duration: 6000 }
    ),

  minting: () =>
    toast.loading('Minting certificate via UGF...', { id: 'minting' }),

  mintSuccess: () => {
    toast.dismiss('minting');
    toast.success('Certificate minted! 🎉', { id: 'minting' });
  },
};
