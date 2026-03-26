import { ArrowLeft, Database, AlertTriangle, Brain } from 'lucide-react';
import { useState } from 'react';
import { VersionHistory } from './VersionHistory';

interface AuditTrailProps {
  onBack: () => void;
}

export function AuditTrail({ onBack }: AuditTrailProps) {
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // If showing Version History, render it instead
  if (showVersionHistory) {
    return <VersionHistory onBack={() => setShowVersionHistory(false)} />;
  }

  // Mock data for the audit trail
  const inputDataSummary = [
    { label: 'Customer Reference', value: 'CUS-2026-A4421' },
    { label: 'Customer Name', value: 'John Doe' },
    { label: 'Account Number', value: 'ACC-004A421' },
    { label: 'Date Range', value: '16 Nov 2025 - 02 Feb 2026' },
    { label: 'Total Transactions', value: '5' },
    { label: 'Transaction Value', value: '£43,250.00' },
    { label: 'Data Sources', value: 'Transaction Records, Customer Profile, Account History' },
    { label: 'Analysis Date', value: '19 March 2026' }
  ];

  const triggeredAlerts = [
    { rule: 'Structuring Pattern Detection', severity: 'High', instances: '5', description: 'Multiple transactions below £10,000 threshold' },
    { rule: 'Threshold Avoidance', severity: 'High', instances: '5', description: 'All transactions positioned below regulatory reporting limits' },
    { rule: 'Out-of-Hours Activity', severity: 'Medium', instances: '4', description: 'Transactions during late evening and early morning periods' },
    { rule: 'Consistent Value Pattern', severity: 'Medium', instances: '5', description: 'Transaction amounts showing unusual consistency (Std Dev: £236)' }
  ];

  const aiPromptDetails = {
    system: 'You are an expert AML compliance analyst specializing in generating Suspicious Activity Reports (SARs) for financial institutions. Analyze the provided transaction data and customer profile to identify patterns of suspicious activity. Generate a comprehensive SAR narrative following regulatory guidelines including Proceeds of Crime Act 2002 and Money Laundering Regulations 2017.',
    input: 'Customer: John Doe (CUS-2026-A4421). Account: ACC-004A421. Transaction Period: 16 Nov 2025 - 02 Feb 2026. Total Transactions: 5. Aggregate Value: £43,250.00. Flagged Patterns: Structuring (5 instances), Threshold Avoidance (5 instances), Out-of-hours activity (4 instances). Generate comprehensive SAR narrative with grounds for suspicion, financial analysis, and regulatory references.'
  };

  const groundsForSuspicion = [
    {
      aspect: 'Transaction Pattern',
      finding: 'Five transactions identified with amounts ranging from £8,340.00 to £8,900.00, all deliberately positioned below the £10,000 reporting threshold',
      evidence: 'Transaction dates: 16 Nov 2025 (£8,900), 17 Nov 2025 (£8,730), 20 Dec 2025 (£8,340), 01 Jan 2026 (£8,810), 02 Feb 2026 (£8,430)'
    },
    {
      aspect: 'Timing Analysis',
      finding: 'Four out of five transactions occurred during out-of-hours periods (late evening or early morning)',
      evidence: 'Transaction times: 20:51, 15:51, 23:51, 22:51, 06:51 - indicating deliberate avoidance of normal banking scrutiny'
    },
    {
      aspect: 'Statistical Consistency',
      finding: 'Unusually low standard deviation of £236 across transaction amounts',
      evidence: 'Average transaction: £8,650. Range: £560. This consistency suggests calculated structuring rather than organic financial behavior'
    },
    {
      aspect: 'Customer Profile Mismatch',
      finding: 'Transaction pattern inconsistent with customer\'s stated occupation and income profile',
      evidence: 'Customer occupation: Consultant. Declared income: Not aligned with transaction volumes and patterns observed'
    }
  ];

  const financialSummary = [
    { metric: 'Total Transaction Value', value: '£43,250.00', significance: 'Substantial aggregate despite individual threshold avoidance' },
    { metric: 'Average Transaction', value: '£8,650.00', significance: 'Consistently below £10,000 CTR threshold' },
    { metric: 'Standard Deviation', value: '£236', significance: 'Extremely low variance indicating deliberate structuring' },
    { metric: 'Transaction Frequency', value: '5 over 79 days', significance: 'Periodic pattern suggesting planned activity' },
    { metric: 'Debit vs Credit Balance', value: '3 Debits, 2 Credits', significance: 'Balanced flow pattern typical of layering activity' },
    { metric: 'Sanctions Screening', value: 'No matches', significance: 'No direct sanctions exposure identified' }
  ];

  const regulatoryBasis = [
    {
      framework: 'Proceeds of Crime Act 2002 (POCA)',
      sections: 'Sections 330-332',
      relevance: 'Statutory obligation to report knowledge or suspicion of money laundering to National Crime Agency'
    },
    {
      framework: 'Money Laundering Regulations 2017 (MLR 2017)',
      sections: 'Regulation 30',
      relevance: 'Requirements for suspicious activity reporting and customer due diligence procedures'
    },
    {
      framework: 'NCA SAR Guidelines',
      sections: 'Current Edition',
      relevance: 'Standard format and content requirements for Suspicious Activity Report submission'
    },
    {
      framework: 'JMLSG Guidance',
      sections: 'Part I, Chapter 5',
      relevance: 'Industry guidance on identifying and reporting suspicious activity patterns including structuring'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]';
      case 'Medium':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#FDE68A]';
      default:
        return 'bg-[#F5F5F5] text-[#6B6B6B] border-[#E8E8E8]';
    }
  };

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[22px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Audit Trail – Explainable AI
              </h1>
              <p className="text-[13px] text-[#6B7280] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                Complete transparency and traceability of AI-generated SAR analysis
              </p>
            </div>
            <button
              onClick={() => setShowVersionHistory(true)}
              className="px-4 h-[36px] bg-[#00AEEF] text-white hover:bg-[#0284c7] text-[13px] rounded-md transition-all"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              View Version
            </button>
          </div>
        </div>

        {/* 1. Input Data Summary */}
        <div className="section-card">
          <div className="section-header">
            <Database className="w-5 h-5 text-[#1F3A5F]" />
            <span>1. Input Data Summary</span>
          </div>
          <div className="section-content">
            <table className="audit-table">
              <tbody>
                {inputDataSummary.map((item, idx) => (
                  <tr key={idx}>
                    <td className="table-label">{item.label}</td>
                    <td className="table-value">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Triggered Alerts & Rules */}
        <div className="section-card">
          <div className="section-header">
            <AlertTriangle className="w-5 h-5 text-[#1F3A5F]" />
            <span>2. Triggered Alerts & Rules</span>
          </div>
          <div className="section-content">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>Severity</th>
                  <th>Instances</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {triggeredAlerts.map((alert, idx) => (
                  <tr key={idx}>
                    <td className="font-medium">{alert.rule}</td>
                    <td>
                      <span className={`severity-badge ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td>{alert.instances}</td>
                    <td className="text-[#6B7280]">{alert.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. AI Prompt Details */}
        <div className="section-card">
          <div className="section-header">
            <Brain className="w-5 h-5 text-[#1F3A5F]" />
            <span>3. AI Prompt Details</span>
          </div>
          <div className="section-content">
            <div className="prompt-section">
              <div className="prompt-label">System Prompt</div>
              <div className="prompt-box">
                {aiPromptDetails.system}
              </div>
            </div>
            <div className="prompt-section">
              <div className="prompt-label">Input Summary</div>
              <div className="prompt-box">
                {aiPromptDetails.input}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Grounds for Suspicion */}
        <div className="section-card">
          <div className="section-header">
            <AlertTriangle className="w-5 h-5 text-[#1F3A5F]" />
            <span>4. Grounds for Suspicion</span>
          </div>
          <div className="section-content">
            {groundsForSuspicion.map((item, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h4 className="font-semibold text-[#1F3A5F] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                  {item.aspect}
                </h4>
                <p className="text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: '1.6' }}>
                  {item.finding}
                </p>
                <p className="text-[#6B7280] mb-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: '1.6' }}>
                  <span className="font-medium">Evidence:</span> {item.evidence}
                </p>
                <p className="text-[13px]">
                  <button
                    onClick={onBack}
                    className="text-[#2F6FED] hover:text-[#1E5FDD] font-semibold underline"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    SAR-1023
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Financial Summary */}
        <div className="section-card">
          <div className="section-header">
            <Database className="w-5 h-5 text-[#1F3A5F]" />
            <span>5. Financial Summary</span>
          </div>
          <div className="section-content">
            {financialSummary.map((item, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h4 className="font-semibold text-[#1F3A5F] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                  {item.metric}
                </h4>
                <p className="font-semibold text-[#1F3A5F] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
                  {item.value}
                </p>
                <p className="text-[#6B7280] mb-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: '1.6' }}>
                  <span className="font-medium">Significance:</span> {item.significance}
                </p>
                <p className="text-[13px]">
                  <button
                    onClick={onBack}
                    className="text-[#2F6FED] hover:text-[#1E5FDD] font-semibold underline"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    SAR-1023
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Regulatory & Legal Basis */}
        <div className="section-card">
          <div className="section-header">
            <Brain className="w-5 h-5 text-[#1F3A5F]" />
            <span>6. Regulatory & Legal Basis</span>
          </div>
          <div className="section-content">
            {regulatoryBasis.map((item, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h4 className="font-semibold text-[#1F3A5F] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                  {item.framework}
                </h4>
                <p className="text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: '1.6' }}>
                  <span className="font-medium">Relevant Sections:</span> {item.sections}
                </p>
                <p className="text-[#6B7280] mb-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: '1.6' }}>
                  <span className="font-medium">Application to Case:</span> {item.relevance}
                </p>
                <p className="text-[13px]">
                  <button
                    onClick={onBack}
                    className="text-[#2F6FED] hover:text-[#1E5FDD] font-semibold underline"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    SAR-1023
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Styling */}
      <style>{`
        .section-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          margin-bottom: 20px;
          overflow: hidden;
          box-shadow: 0px 1px 3px rgba(0,0,0,0.05);
        }
        
        .section-header {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #1F3A5F;
          background: #F1F5F9;
          padding: 12px 16px;
          border-bottom: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .section-content {
          padding: 20px;
        }
        
        .audit-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Inter', sans-serif;
        }
        
        .audit-table thead {
          background: #F9FAFB;
        }
        
        .audit-table th {
          text-align: left;
          padding: 10px 12px;
          font-size: 13px;
          font-weight: 600;
          color: #1F3A5F;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .audit-table td {
          padding: 12px 12px;
          font-size: 13px;
          color: #2C2C2C;
          border-bottom: 1px solid #F3F4F6;
          vertical-align: top;
        }
        
        .audit-table tbody tr:last-child td {
          border-bottom: none;
        }
        
        .audit-table tbody tr:hover {
          background: #F9FAFB;
        }
        
        .table-label {
          font-weight: 500;
          color: #2C2C2C;
          width: 30%;
        }
        
        .table-value {
          color: #2C2C2C;
        }
        
        .severity-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid;
        }
        
        .prompt-section {
          margin-bottom: 16px;
        }
        
        .prompt-section:last-child {
          margin-bottom: 0;
        }
        
        .prompt-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #6B7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .prompt-box {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #2C2C2C;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 14px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}