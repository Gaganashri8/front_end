import { ArrowRight, CircleAlert, X } from "@/lib/lucide-react";
import { Button } from "@/components/ui/button";
import { MockBadge } from "./StatusBadge";

export function EvidenceDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" data-testid="evidence-drawer">
      <button aria-label="Close evidence drawer" className="absolute inset-0 cursor-default bg-slate-900/20" onClick={onClose} data-testid="evidence-drawer-backdrop" />
      <aside className="relative h-full w-full max-w-lg animate-in slide-in-from-right border-l border-slate-200 bg-white shadow-2xl duration-300" aria-label="Why this alert">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <div className="mb-2 flex items-center gap-2"><CircleAlert size={16} className="text-amber-600" /><MockBadge future /></div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900" data-testid="evidence-drawer-title">Why this alert?</h2>
            <p className="mt-1 text-sm text-slate-500">Evidence drawer is ready for the confirmed risk contract.</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close evidence drawer" data-testid="evidence-drawer-close-button"><X size={18} /></Button>
        </div>
        <div className="space-y-6 overflow-y-auto p-6">
          <section data-testid="evidence-drawer-empty-state" className="border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">No risk alert record was returned</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-800">The running API currently exposes only the template status endpoints. No alert, event, score, or provenance fields are being inferred in this view.</p>
          </section>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Contributing evidence", "Waiting for /risk/alerts"],
              ["Methodology", "Waiting for backend response"],
              ["Historical events", "No records returned"],
              ["Limitations", "Decision support only"],
            ].map(([label, value]) => (
              <div key={label} className="border border-slate-200 bg-slate-50 p-3" data-testid={`evidence-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-medium text-slate-700">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500"><ArrowRight size={14} className="text-blue-600" /> When the backend exposes evidence, related wells can be highlighted without inventing IDs.</div>
        </div>
      </aside>
    </div>
  );
}