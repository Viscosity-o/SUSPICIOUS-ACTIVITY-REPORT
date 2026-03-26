import { ArrowLeft } from 'lucide-react';
import TransactionGraph from "./TransactionGraph";

interface VisualizationProps {
  onBack: () => void;
}

export function Visualization({ onBack }: VisualizationProps) {
  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1200px] mx-auto py-6 px-6">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 h-[36px] bg-white border border-[#D1D5DB] text-[#2C2C2C] hover:bg-[#F9FAFB] text-[13px] rounded-md transition-all mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            <ArrowLeft className="w-[14px] h-[14px]" />
            Back to Narrative
          </button>
          <div>
            <h1 className="text-[22px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Visualization
            </h1>
            <p className="text-[13px] text-[#6B7280] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Visual analysis and insights
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-lg font-semibold text-[#1F3A5F]">
          Transaction Network
        </h2>
        <p className="text-sm text-gray-500">
          Visual representation of account interactions
        </p>
         <ul className="list-disc list-inside text-sm text-gray-500 ml-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <li><strong>Nodes</strong> = Account numbers</li>
      <li><strong>Arrow →</strong> = Transaction flow</li>
      <li><strong>Weight</strong> = Transaction amount (₹)</li>
    </ul>
      </div>
    </div>

    {/* Graph Area */}
    <div className="w-full h-[500px] bg-[#F9FAFB] rounded-xl border border-gray-100 flex items-center justify-center">

      {/* Placeholder (remove later) */}
     
        
     <TransactionGraph />
     
      

    </div>

  </div>
</div>
      </div>
    </div>
  );
}
