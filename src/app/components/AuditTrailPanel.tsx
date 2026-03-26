import { FileSearch, TrendingUp, Database, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function AuditTrailPanel() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const auditSteps = [
    {
      id: 1,
      title: 'Data Ingestion',
      timestamp: '14:32:15',
      status: 'completed',
      details: [
        'Loaded 47 transaction records',
        'Validated customer KYC data',
        'Retrieved account history (24 months)',
        'Cross-referenced with watchlist databases'
      ],
      dataPoints: [
        'Customer ID: CUST-2024-001',
        'Account Number: ACC-5678-9012',
        'Transaction Count: 47',
        'Date Range: Jan 1-7, 2026'
      ]
    },
    {
      id: 2,
      title: 'Pattern Detection',
      timestamp: '14:32:28',
      status: 'completed',
      details: [
        'Identified rapid fund accumulation pattern',
        'Detected structuring behavior (multiple sources)',
        'Flagged immediate outbound transfer',
        'Matched to "layering" typology with 94% confidence'
      ],
      patterns: [
        { name: 'Structuring/Smurfing', confidence: 89, matched: true },
        { name: 'Layering', confidence: 94, matched: true },
        { name: 'Trade-Based ML', confidence: 12, matched: false },
        { name: 'Cash Intensive', confidence: 8, matched: false }
      ]
    },
    {
      id: 3,
      title: 'Typology Matching',
      timestamp: '14:32:41',
      status: 'completed',
      details: [
        'Retrieved 12 similar historical cases',
        'Matched FATF typology: Money Laundering via multiple accounts',
        'Referenced FinCEN advisory FIN-2019-A003',
        'Identified high-risk jurisdiction in destination'
      ],
      regulations: [
        'Bank Secrecy Act §5318(g)',
        'FATF Recommendation 20',
        'FinCEN SAR Filing Requirements',
        '31 CFR 1020.320'
      ]
    },
    {
      id: 4,
      title: 'Risk Assessment',
      timestamp: '14:32:55',
      status: 'completed',
      details: [
        'Calculated aggregate risk score: 87/100',
        'Evaluated customer risk profile: Medium → High',
        'Assessed geographic risk: High',
        'Transaction velocity analysis: Critical'
      ],
      riskFactors: [
        { factor: 'Transaction Volume', score: 92, weight: 'High' },
        { factor: 'Geographic Risk', score: 88, weight: 'High' },
        { factor: 'Customer Profile', score: 65, weight: 'Medium' },
        { factor: 'Transaction Velocity', score: 95, weight: 'Critical' }
      ]
    },
    {
      id: 5,
      title: 'Narrative Generation',
      timestamp: '14:33:12',
      status: 'completed',
      details: [
        'LLM Model: Llama 3.1 70B',
        'Temperature: 0.3 (deterministic)',
        'Generated 1,847 tokens',
        'Included 6 sections per FinCEN format',
        'Added regulatory citations (4 references)',
        'Bias check: Passed (no discriminatory language detected)'
      ],
      reasoning: 'Generated structured narrative following FinCEN SAR form requirements. Prioritized factual description of transaction patterns. Included regulatory references for defensibility. Applied conservative language to maintain objectivity.'
    },
    {
      id: 6,
      title: 'Compliance Validation',
      timestamp: '14:33:25',
      status: 'warning',
      details: [
        'Format validation: Passed',
        'Required sections: Complete',
        'Citation accuracy: 2 warnings',
        'PII masking: Applied',
        'Bias detection: Passed'
      ],
      warnings: [
        'FATF Recommendation number should be more specific',
        'FinCEN form version reference needs verification'
      ]
    }
  ];

  return (
    <div className="border-l border-gray-800/50 w-[420px] bg-[#0d0d0d] flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-800/50">
        <h2 className="text-lg font-light text-white mb-1 tracking-tight flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-indigo-400" />
          Audit Trail
        </h2>
        <p className="text-xs text-gray-400 font-light">Complete reasoning and data lineage</p>
      </div>

      {/* Overall Summary */}
      <div className="p-6 border-b border-gray-800/50 bg-gray-900/20">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-400 font-light mb-1">Processing Time</div>
            <div className="text-lg font-light text-white">53s</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-light mb-1">Confidence</div>
            <div className="text-lg font-light text-green-400">87%</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-light mb-1">Data Points</div>
            <div className="text-lg font-light text-white">142</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-light mb-1">Patterns Found</div>
            <div className="text-lg font-light text-amber-400">2</div>
          </div>
        </div>
      </div>

      {/* Audit Steps */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {auditSteps.map((step) => (
          <div
            key={step.id}
            className={`border rounded-lg overflow-hidden transition-all ${
              step.status === 'completed'
                ? 'border-green-600/30 bg-green-600/5'
                : 'border-amber-600/30 bg-amber-600/5'
            }`}
          >
            <button
              onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
              className="w-full p-4 flex items-start gap-3 hover:bg-gray-900/30 transition-all"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.status === 'completed'
                  ? 'bg-green-600/20 border border-green-500/30'
                  : 'bg-amber-600/20 border border-amber-500/30'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-normal text-white tracking-tight">{step.title}</h3>
                  <span className="text-xs text-gray-500 font-light">{step.timestamp}</span>
                </div>
                <p className="text-xs text-gray-400 font-light">
                  {step.details.length} operations completed
                </p>
              </div>
            </button>

            {expandedStep === step.id && (
              <div className="px-4 pb-4 border-t border-gray-700/30 pt-4">
                {/* Details */}
                <div className="mb-4">
                  <h4 className="text-xs text-gray-400 font-normal mb-2 uppercase tracking-wider">
                    Operations
                  </h4>
                  <div className="space-y-1.5">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <div className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-gray-300 font-light">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Points */}
                {step.dataPoints && (
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-400 font-normal mb-2 uppercase tracking-wider">
                      Data Points
                    </h4>
                    <div className="space-y-1">
                      {step.dataPoints.map((point, idx) => (
                        <div key={idx} className="text-xs font-mono text-gray-400 bg-gray-900/50 px-2 py-1 rounded">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Patterns */}
                {step.patterns && (
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-400 font-normal mb-2 uppercase tracking-wider">
                      Pattern Analysis
                    </h4>
                    <div className="space-y-2">
                      {step.patterns.map((pattern, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className={`font-light ${pattern.matched ? 'text-green-400' : 'text-gray-500'}`}>
                            {pattern.name}
                          </span>
                          <span className={`font-normal ${pattern.matched ? 'text-green-400' : 'text-gray-500'}`}>
                            {pattern.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regulations */}
                {step.regulations && (
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-400 font-normal mb-2 uppercase tracking-wider">
                      Regulatory References
                    </h4>
                    <div className="space-y-1">
                      {step.regulations.map((reg, idx) => (
                        <div key={idx} className="text-xs text-indigo-400 font-light bg-indigo-600/5 px-2 py-1 rounded border border-indigo-600/20">
                          {reg}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk Factors */}
                {step.riskFactors && (
                  <div className="mb-4">
                    <h4 className="text-xs text-gray-400 font-normal mb-2 uppercase tracking-wider">
                      Risk Analysis
                    </h4>
                    <div className="space-y-2">
                      {step.riskFactors.map((risk, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-300 font-light">{risk.factor}</span>
                            <span className="text-white font-normal">{risk.score}/100</span>
                          </div>
                          <div className="w-full bg-gray-800/50 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                risk.score >= 90
                                  ? 'bg-red-500'
                                  : risk.score >= 70
                                  ? 'bg-amber-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${risk.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reasoning */}
                {step.reasoning && (
                  <div>
                    <h4 className="text-xs text-gray-400 font-normal mb-2 uppercase tracking-wider flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      AI Reasoning
                    </h4>
                    <p className="text-xs text-gray-300 font-light leading-relaxed bg-gray-900/50 p-3 rounded border border-gray-700/30">
                      {step.reasoning}
                    </p>
                  </div>
                )}

                {/* Warnings */}
                {step.warnings && (
                  <div className="mt-4">
                    <h4 className="text-xs text-amber-400 font-normal mb-2 uppercase tracking-wider">
                      Warnings
                    </h4>
                    <div className="space-y-1.5">
                      {step.warnings.map((warning, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 font-light">{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Export Audit Log */}
      <div className="p-4 border-t border-gray-800/50">
        <button className="w-full px-4 py-2.5 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-lg text-sm font-normal border border-gray-700/50 transition-all flex items-center justify-center gap-2">
          <Database className="w-4 h-4" />
          Export Audit Log
        </button>
      </div>
    </div>
  );
}
