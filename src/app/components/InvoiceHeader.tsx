import { FileText } from 'lucide-react';

export function InvoiceHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>SAR Narrative Generator</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
