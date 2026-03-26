import { TrendingUp, ArrowRight, DollarSign, Calendar, MapPin, AlertTriangle, Search, Activity, BarChart3, Network } from 'lucide-react';
import { useState } from 'react';

interface Transaction {
  id: number;
  amount: number;
  source: string;
  date: string;
  time: string;
  destination: string;
  risk: 'normal' | 'warning' | 'suspicious';
}

export function TransactionVisualization() {
  const [aiPrompt, setAiPrompt] = useState('');

  // Sample data
  const transactions: Transaction[] = [
    { id: 1, amount: 150000, source: 'ACC-1234-5678', date: 'Jan 1', time: '09:23', destination: 'ACC-5678-9012', risk: 'normal' },
    { id: 2, amount: 200000, source: 'ACC-5678-1234', date: 'Jan 1', time: '11:45', destination: 'ACC-5678-9012', risk: 'warning' },
    { id: 3, amount: 75000, source: 'ACC-9012-3456', date: 'Jan 2', time: '08:15', destination: 'ACC-5678-9012', risk: 'normal' },
    { id: 4, amount: 180000, source: 'ACC-3456-7890', date: 'Jan 2', time: '14:32', destination: 'ACC-5678-9012', risk: 'warning' },
    { id: 5, amount: 120000, source: 'ACC-7890-1234', date: 'Jan 3', time: '10:08', destination: 'ACC-5678-9012', risk: 'suspicious' },
    { id: 6, amount: 95000, source: 'ACC-2345-6789', date: 'Jan 4', time: '13:22', destination: 'ACC-5678-9012', risk: 'warning' },
    { id: 7, amount: 165000, source: 'ACC-6789-0123', date: 'Jan 5', time: '16:45', destination: 'ACC-5678-9012', risk: 'suspicious' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'normal': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-500' };
      case 'warning': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', dot: 'bg-yellow-500' };
      case 'suspicious': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. AI Prompt Analysis Section */}
      <div className="bg-white border border-gray-300 rounded-lg p-5">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs text-slate-700 font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              AI-Driven Analysis Prompt
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask AI to analyze patterns... (e.g., 'Show me high-risk transaction clusters')"
                className="flex-1 bg-white border border-gray-300 rounded-md px-4 py-2.5 text-slate-900 text-sm hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Search className="w-4 h-4" />
                Analyze Data
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
              AI will dynamically update visualizations based on your query using LangChain + Llama 3.1
            </p>
          </div>
        </div>
      </div>

      {/* 2. Case Summary Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Transaction Amount */}
        <div className="bg-white border border-gray-300 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-xs text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Total Amount
            </div>
          </div>
          <div className="text-2xl font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            ₹50,00,000
          </div>
          <div className="text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            ~$60,000 USD
          </div>
        </div>

        {/* Number of Transactions */}
        <div className="bg-white border border-gray-300 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-xs text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Transactions
            </div>
          </div>
          <div className="text-2xl font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            47
          </div>
          <div className="text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            Unique sources
          </div>
        </div>

        {/* Time Window */}
        <div className="bg-white border border-gray-300 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-xs text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Time Window
            </div>
          </div>
          <div className="text-2xl font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            7 Days
          </div>
          <div className="text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            Jan 1 - Jan 7, 2026
          </div>
        </div>

        {/* Destination Risk */}
        <div className="bg-white border border-gray-300 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-xs text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Destination Risk
            </div>
          </div>
          <div className="text-xl font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            High Risk
          </div>
          <div className="text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            Offshore jurisdiction
          </div>
        </div>
      </div>

      {/* 3. Transaction Network Graph Area */}
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Transaction Network Flow
            </h3>
            <p className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Cytoscape.js network visualization placeholder
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Interactive Graph</span>
          </div>
        </div>

        {/* Network Graph Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
          <div className="flex items-center justify-center gap-8">
            {/* Source Accounts */}
            <div className="flex flex-col gap-3">
              <div className="text-xs text-slate-600 font-medium text-center mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Source Accounts (47)
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-32 h-10 bg-blue-100 border border-blue-300 rounded-md flex items-center justify-center">
                  <span className="text-xs text-blue-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ACC-{i}234-{i}678
                  </span>
                </div>
              ))}
              <div className="w-32 h-10 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center">
                <span className="text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  +42 more...
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="w-8 h-8 text-blue-600" />
              <span className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>Inflow</span>
            </div>

            {/* Target Account */}
            <div className="flex flex-col gap-3">
              <div className="text-xs text-slate-600 font-medium text-center mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Target Account
              </div>
              <div className="w-40 h-32 bg-yellow-50 border-2 border-yellow-400 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ACC-5678-9012
                  </div>
                  <div className="text-xl font-bold text-yellow-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ₹50L
                  </div>
                  <div className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Accumulated
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="w-8 h-8 text-red-600" />
              <span className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>&lt; 24h</span>
            </div>

            {/* Offshore Destination */}
            <div className="flex flex-col gap-3">
              <div className="text-xs text-slate-600 font-medium text-center mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Offshore Destination
              </div>
              <div className="w-40 h-32 bg-red-50 border-2 border-red-400 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    International Wire
                  </div>
                  <div className="text-xl font-bold text-red-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ₹50L
                  </div>
                  <div className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Transferred Out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Transaction Pattern Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Transaction Amount Over Time */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Transaction Amount Over Time
              </h3>
              <p className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Plotly line chart placeholder
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>

          {/* Chart Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <div className="text-sm text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Interactive Plotly Line Chart
              </div>
              <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Time-series visualization of transaction amounts
              </div>
            </div>
          </div>
        </div>

        {/* Right: Top Sending Accounts */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Top Sending Accounts
              </h3>
              <p className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Plotly bar chart placeholder
              </p>
            </div>
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>

          {/* Chart Placeholder */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <div className="text-sm text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Interactive Plotly Bar Chart
              </div>
              <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Ranked account volume distribution
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Transaction Timeline */}
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          Transaction Timeline
        </h3>
        <p className="text-xs text-slate-600 mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
          Chronological event sequence with risk indicators
        </p>

        <div className="space-y-3">
          {transactions.map((txn) => {
            const colors = getRiskColor(txn.risk);
            return (
              <div key={txn.id} className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 ${colors.dot} rounded-full`}></div>
                    <div className="text-xs text-slate-500 w-20" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {txn.date}<br />{txn.time}
                    </div>
                    <div className="text-sm text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <span className="font-medium">From:</span> <span className="font-mono text-xs">{txn.source}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="text-sm text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <span className="font-medium">To:</span> <span className="font-mono text-xs">{txn.destination}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-sm font-semibold ${colors.text}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      ₹{(txn.amount / 1000).toFixed(0)}K
                    </div>
                    <div className={`px-2.5 py-1 ${colors.bg} border ${colors.border} rounded text-xs font-medium ${colors.text}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {txn.risk.charAt(0).toUpperCase() + txn.risk.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final Outbound Transaction */}
          <div className="bg-red-50 border border-red-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="text-xs text-slate-500 w-20" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Jan 7<br />16:45
                </div>
                <div className="text-sm text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="font-medium">From:</span> <span className="font-mono text-xs">ACC-5678-9012</span>
                </div>
                <ArrowRight className="w-4 h-4 text-red-600" />
                <div className="text-sm text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="font-medium">To:</span> <span className="font-mono text-xs">Offshore Account (International Wire)</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-red-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ₹50,00,000
                </div>
                <div className="px-2.5 py-1 bg-red-100 border border-red-300 rounded text-xs font-medium text-red-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Suspicious
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. AI Analysis Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
              AI Investigation Summary
            </h3>
            <p className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Pattern detection powered by LangChain + Llama 3.1
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <div className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong>Rapid Fund Accumulation:</strong> 47 incoming transactions from distinct sources within 7-day window, totaling ₹50,00,000
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <div className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong>Structuring Pattern:</strong> Individual transaction amounts range from ₹50,000 to ₹2,00,000, potentially evading reporting thresholds
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <div className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong>Immediate Outflow:</strong> Complete balance transferred to offshore account within 24 hours of final deposit
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <div className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong>High-Risk Jurisdiction:</strong> Destination account located in offshore jurisdiction with weak AML controls
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <div className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong>Typology Match:</strong> Activity consistent with layering and integration phases of money laundering
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center gap-2 text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span><strong>Risk Level:</strong> High - Immediate SAR filing recommended</span>
          </div>
        </div>
      </div>
    </div>
  );
}
