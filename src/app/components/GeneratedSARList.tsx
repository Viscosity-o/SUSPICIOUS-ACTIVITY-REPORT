import {
  FileText,
  Download,
  Calendar,
  User,
  AlertCircle,
  ChevronRight,
  Clock,
  Edit3,
  GitBranch,
  X,
  Maximize2,
} from "lucide-react";
import { useState } from "react";

interface SARVersion {
  version: number;
  date: string;
  editedBy: string;
  changes: string;
  narrative: string;
}

interface SARItem {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: string;
  risk: string;
  versions: SARVersion[];
}

export function GeneratedSARList() {
  const [selectedSAR, setSelectedSAR] = useState<string | null>(
    null,
  );
  const [selectedVersion, setSelectedVersion] = useState<{
    [key: string]: number;
  }>({});
  const [isFullScreen, setIsFullScreen] = useState(false);

  const sars: SARItem[] = [
    {
      id: "SAR-2026-001",
      customer: "John Doe",
      amount: "₹50,00,000",
      date: "Feb 14, 2026",
      status: "Approved",
      risk: "High",
      versions: [
        {
          version: 3,
          date: "Feb 14, 2026 3:45 PM",
          editedBy: "Sarah Johnson (Compliance Officer)",
          changes:
            "Added regulatory reference section and improved typology descriptions",
          narrative: `<div class="sar-narrative">
<h1>SUSPICIOUS ACTIVITY REPORT - NARRATIVE</h1>
<div class="sar-meta">
  <p><strong>Case ID:</strong> SAR-2026-001</p>
  <p><strong>Date Filed:</strong> February 14, 2026</p>
  <p><strong>Subject:</strong> Rapid Fund Movement - Potential Money Laundering</p>
</div>

<h2>I. SUMMARY OF SUSPICIOUS ACTIVITY</h2>
<p>On January 1-7, 2026, customer <strong>John Doe</strong> (Customer ID: CUST-2024-001, Account: ACC-5678-9012) received a total of ₹50,00,000 (approximately $60,000 USD) through 47 separate incoming wire transfers from distinct source accounts. Within 24 hours of the final deposit, the entire balance was transferred via international wire to an offshore account in a high-risk jurisdiction.</p>

<h2>II. ACCOUNT AND CUSTOMER BACKGROUND</h2>
<p>The subject account was opened in March 2024. The customer's stated occupation is "consultant" with reported annual income of ₹8,00,000. The account typically maintained a balance below ₹1,00,000 prior to this activity. KYC documentation was last verified in January 2025 and is current.</p>

<h2>III. DESCRIPTION OF SUSPICIOUS ACTIVITY</h2>
<p>Between January 1-7, 2026, the following pattern was observed:</p>
<table class="sar-table">
  <thead>
    <tr>
      <th>Metric</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Incoming Transfers</td>
      <td>47 wire transfers from different source accounts</td>
    </tr>
    <tr>
      <td>Transfer Range</td>
      <td>₹50,000 to ₹2,00,000 per transaction</td>
    </tr>
    <tr>
      <td>Time Window</td>
      <td>7 days (January 1-7, 2026)</td>
    </tr>
    <tr>
      <td>Total Amount</td>
      <td>₹50,00,000</td>
    </tr>
    <tr>
      <td>Outbound Transfer</td>
      <td>Immediate international wire to offshore account</td>
    </tr>
    <tr>
      <td>Business Justification</td>
      <td>None apparent</td>
    </tr>
  </tbody>
</table>

<h2>IV. MONEY LAUNDERING TYPOLOGIES</h2>
<p>This activity is consistent with established money laundering patterns:</p>
<h3>1. Structuring/Smurfing</h3>
<p>Multiple transfers below reporting thresholds designed to avoid regulatory detection.</p>

<h3>2. Layering</h3>
<p>Rapid movement through multiple accounts to obscure the origin of funds.</p>

<h3>3. Integration</h3>
<p>Quick conversion to international transfer for reintegration into legitimate economy.</p>

<h2>V. REGULATORY REFERENCES</h2>
<p>This activity triggers reporting requirements under:</p>
<ul>
  <li><strong>Bank Secrecy Act (BSA)</strong></li>
  <li><strong>FinCEN SAR Filing Requirements</strong></li>
  <li><strong>FATF Recommendation 20</strong> (Suspicious Transaction Reporting)</li>
</ul>

<h2>VI. CONCLUSION</h2>
<p>Based on the rapid accumulation of funds from multiple sources followed by immediate international transfer, combined with the account's historical profile and lack of business justification, this activity is deemed <strong class="highlight-red">suspicious and potentially indicative of money laundering</strong>.</p>
<p>The financial institution has taken no action regarding the account pending regulatory guidance.</p>
</div>`,
        },
        {
          version: 2,
          date: "Feb 14, 2026 2:30 PM",
          editedBy: "Michael Chen (AML Analyst)",
          changes:
            "Clarified transaction timeline and added account background details",
          narrative: `<div class="sar-narrative">
<h1>SUSPICIOUS ACTIVITY REPORT - NARRATIVE</h1>
<div class="sar-meta">
  <p><strong>Case ID:</strong> SAR-2026-001</p>
  <p><strong>Date Filed:</strong> February 14, 2026</p>
  <p><strong>Subject:</strong> Rapid Fund Movement</p>
</div>

<h2>I. SUMMARY OF SUSPICIOUS ACTIVITY</h2>
<p>Customer John Doe received ₹50,00,000 through multiple wire transfers and immediately transferred funds internationally.</p>

<h2>II. ACCOUNT BACKGROUND</h2>
<p>Account opened March 2024. Customer occupation: consultant. Annual income: ₹8,00,000. KYC verified January 2025.</p>

<h2>III. SUSPICIOUS ACTIVITY DETAILS</h2>
<p>47 incoming transfers from January 1-7, 2026. Amounts: ₹50,000 to ₹2,00,000 each. Total: ₹50,00,000. Immediate international transfer followed.</p>

<h2>IV. CONCLUSION</h2>
<p>Activity suggests possible money laundering through rapid fund movement.</p>
</div>`,
        },
        {
          version: 1,
          date: "Feb 14, 2026 1:15 PM",
          editedBy: "AI System (Initial Generation)",
          changes: "Initial AI-generated narrative",
          narrative: `<div class="sar-narrative">
<h1>SUSPICIOUS ACTIVITY REPORT</h1>
<p>Customer John Doe received multiple transfers totaling ₹50,00,000 and transferred funds offshore. 47 transactions detected between January 1-7, 2026. Potential money laundering activity.</p>
</div>`,
        },
      ],
    },
    {
      id: "SAR-2026-002",
      customer: "Jane Smith",
      amount: "₹35,00,000",
      date: "Feb 13, 2026",
      status: "Under Review",
      risk: "Medium",
      versions: [
        {
          version: 2,
          date: "Feb 13, 2026 4:20 PM",
          editedBy: "David Park (Senior Analyst)",
          changes: "Enhanced customer background section",
          narrative: `<div class="sar-narrative">
<h1>SUSPICIOUS ACTIVITY REPORT - NARRATIVE</h1>
<div class="sar-meta">
  <p><strong>Case ID:</strong> SAR-2026-002</p>
  <p><strong>Subject:</strong> Unusual Cash Deposit Pattern</p>
</div>

<h2>SUMMARY</h2>
<p>Customer Jane Smith made 23 cash deposits over 14 days, each below ₹2,00,000, totaling ₹35,00,000. Pattern suggests potential structuring to avoid reporting thresholds.</p>
</div>`,
        },
        {
          version: 1,
          date: "Feb 13, 2026 2:00 PM",
          editedBy: "AI System (Initial Generation)",
          changes: "Initial AI-generated narrative",
          narrative: `<div class="sar-narrative">
<h1>SUSPICIOUS ACTIVITY REPORT</h1>
<p>Customer Jane Smith deposited ₹35,00,000 in cash over 14 days in 23 transactions. Possible structuring activity.</p>
</div>`,
        },
      ],
    },
    {
      id: "SAR-2026-003",
      customer: "Robert Wilson",
      amount: "₹80,00,000",
      date: "Feb 12, 2026",
      status: "Submitted",
      risk: "Critical",
      versions: [
        {
          version: 1,
          date: "Feb 12, 2026 5:30 PM",
          editedBy: "AI System (Initial Generation)",
          changes: "Initial AI-generated narrative",
          narrative: `<div class="sar-narrative">
<h1>SUSPICIOUS ACTIVITY REPORT - NARRATIVE</h1>
<div class="sar-meta">
  <p><strong>Case ID:</strong> SAR-2026-003</p>
  <p><strong>Subject:</strong> High-Value Cryptocurrency Conversion</p>
</div>

<h2>SUMMARY</h2>
<p>Customer Robert Wilson converted ₹80,00,000 to cryptocurrency through multiple transactions. High-risk jurisdiction involvement detected. Potential tax evasion and money laundering.</p>
</div>`,
        },
      ],
    },
  ];

  const handleSelectSAR = (id: string) => {
    setSelectedSAR(id);
    if (!selectedVersion[id]) {
      const sar = sars.find((s) => s.id === id);
      if (sar) {
        setSelectedVersion((prev) => ({
          ...prev,
          [id]: sar.versions[0].version,
        }));
      }
    }
  };

  const handleCloseSAR = () => {
    setSelectedSAR(null);
    setIsFullScreen(false);
  };

  const selectVersion = (sarId: string, version: number) => {
    setSelectedVersion((prev) => ({
      ...prev,
      [sarId]: version,
    }));
  };

  const selectedSARData = sars.find(
    (s) => s.id === selectedSAR,
  );
  const currentVersion = selectedSAR
    ? selectedVersion[selectedSAR] ||
      selectedSARData?.versions[0].version
    : null;
  const versionData = selectedSARData?.versions.find(
    (v) => v.version === currentVersion,
  );

  return (
    <div className="flex h-full overflow-hidden bg-white">
      {/* SAR List - Horizontal Cards */}
      {!selectedSAR && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-12 py-16">
            {/* Header */}
            <div className="mb-12">
              <h2
                className="text-[26px] text-[#003366] mb-2 font-light"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              >
                SAR History
              </h2>
              <p
                className="text-[16px] text-[#666666]"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              >
                View all generated SAR reports with version history
              </p>
            </div>

            {/* SAR Cards - Horizontal Layout */}
            <div className="space-y-5">
              {sars.map((sar) => {
                const statusColors = {
                  'Approved': { bg: '#E8F5E9', border: '#4CAF50', text: '#2E7D32', dot: '#4CAF50' },
                  'Under Review': { bg: '#FFF9E6', border: '#FFC107', text: '#F57C00', dot: '#FFC107' },
                  'Submitted': { bg: '#E3F2FD', border: '#2196F3', text: '#1565C0', dot: '#2196F3' }
                };
                
                const riskColors = {
                  'High': { bg: '#FFEBEE', text: '#C62828', icon: '#EF5350' },
                  'Medium': { bg: '#FFF9E6', text: '#EF6C00', icon: '#FF9800' },
                  'Critical': { bg: '#FCE4EC', text: '#880E4F', icon: '#E91E63' }
                };

                const statusColor = statusColors[sar.status as keyof typeof statusColors];
                const riskColor = riskColors[sar.risk as keyof typeof riskColors];

                return (
                  <div
                    key={sar.id}
                    className="bg-white border-2 border-[#E0E0E0] p-8 cursor-pointer transition-all duration-300 hover:border-[#00AEEF] hover:shadow-lg group"
                    onClick={() => handleSelectSAR(sar.id)}
                    style={{ borderRadius: '4px' }}
                  >
                    <div className="flex items-center gap-8">
                      {/* Left Section - Case ID and Icon */}
                      <div className="flex items-center gap-4 min-w-[280px]">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#00AEEF] to-[#0089C7] flex items-center justify-center flex-shrink-0 shadow-md" style={{ borderRadius: '4px' }}>
                          <FileText className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3
                            className="text-[20px] text-[#003366] mb-1 group-hover:text-[#00AEEF] transition-colors"
                            style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}
                          >
                            {sar.id}
                          </h3>
                          <div className="flex items-center gap-2 text-[14px] text-[#666666]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                            <Calendar className="w-4 h-4" />
                            {sar.date}
                          </div>
                        </div>
                      </div>

                      {/* Middle Section - Customer Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-[16px] text-[#003366]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                          <User className="w-4 h-4 text-[#00AEEF]" />
                          <span>{sar.customer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[18px] text-[#00AEEF] font-semibold" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                          {sar.amount}
                        </div>
                        <div className="text-[14px] text-[#666666]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                          {sar.versions.length} version{sar.versions.length !== 1 ? 's' : ''} • Last updated {sar.versions[0].date}
                        </div>
                      </div>

                      {/* Right Section - Status and Risk */}
                      <div className="flex items-center gap-4 min-w-[320px] justify-end">
                        {/* Status Badge */}
                        <div 
                          className="px-5 py-2.5 border-2 transition-all"
                          style={{ 
                            backgroundColor: statusColor.bg,
                            borderColor: statusColor.border,
                            borderRadius: '24px'
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor.dot }}></div>
                            <span 
                              className="text-[14px] font-medium"
                              style={{ 
                                color: statusColor.text,
                                fontFamily: "'Libre Franklin', sans-serif",
                                fontWeight: 400
                              }}
                            >
                              {sar.status}
                            </span>
                          </div>
                        </div>

                        {/* Risk Badge */}
                        <div 
                          className="px-5 py-2.5 transition-all"
                          style={{ 
                            backgroundColor: riskColor.bg,
                            borderRadius: '24px'
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" style={{ color: riskColor.icon }} />
                            <span 
                              className="text-[14px] font-medium"
                              style={{ 
                                color: riskColor.text,
                                fontFamily: "'Libre Franklin', sans-serif",
                                fontWeight: 400
                              }}
                            >
                              {sar.risk}
                            </span>
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <ChevronRight className="w-6 h-6 text-[#CCCCCC] group-hover:text-[#00AEEF] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Full SAR View - Takes Whole Area */}
      {selectedSAR && selectedSARData && versionData && (
        <div
          className={`flex-1 overflow-y-auto ${isFullScreen ? "fixed inset-0 z-50 bg-white" : "bg-white"}`}
        >
          <div className="max-w-[1200px] mx-auto px-12 py-16 space-y-8">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between">
              <div className="border-l-[3px] border-[#00AEEF] pl-4">
                <h2 className="text-[26px] font-semibold text-[#003366] mb-1">
                  {selectedSARData.id}
                </h2>
                <p className="text-[16px] text-[#666666]">
                  Customer: {selectedSARData.customer}
                </p>
              </div>
              <button
                onClick={handleCloseSAR}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Version Selector */}
            <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-indigo-400" />
                <span
                  className="text-sm text-gray-300"
                  style={{ fontFamily: "Queens, serif" }}
                >
                  Version History
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedSARData.versions.map((version) => (
                  <button
                    key={version.version}
                    onClick={() =>
                      selectVersion(
                        selectedSAR,
                        version.version,
                      )
                    }
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      currentVersion === version.version
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300 border border-gray-700/50"
                    }`}
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    v{version.version}
                  </button>
                ))}
              </div>
            </div>

            {/* Version Metadata */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div
                    className="text-xs text-gray-400 mb-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    Version
                  </div>
                  <div
                    className="text-sm text-white flex items-center gap-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    <span className="w-7 h-7 bg-indigo-600/20 border border-indigo-500/30 rounded flex items-center justify-center text-indigo-400 text-sm">
                      {versionData.version}
                    </span>
                    {versionData.version ===
                      selectedSARData.versions[0].version && (
                      <span className="text-xs text-green-400">
                        Latest
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    className="text-xs text-gray-400 mb-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    Edited By
                  </div>
                  <div
                    className="text-sm text-white flex items-center gap-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    <Edit3 className="w-4 h-4 text-gray-400" />
                    {versionData.editedBy}
                  </div>
                </div>
                <div>
                  <div
                    className="text-xs text-gray-400 mb-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    Last Modified
                  </div>
                  <div
                    className="text-sm text-white flex items-center gap-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    {versionData.date}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div
                  className="text-xs text-gray-400 mb-2"
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  Changes in this version
                </div>
                <div
                  className="text-sm text-gray-300"
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  {versionData.changes}
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="bg-white rounded-lg p-8 border border-gray-300 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h4
                  className="text-lg text-gray-900 flex items-center gap-2"
                  style={{ fontFamily: "Queens, serif" }}
                >
                  <FileText className="w-5 h-5 text-indigo-600" />
                  SAR Narrative - Version {versionData.version}
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setIsFullScreen(!isFullScreen)
                    }
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-all shadow-lg flex items-center gap-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    <Maximize2 className="w-4 h-4" />
                    {isFullScreen
                      ? "Exit Full Screen"
                      : "Full Screen"}
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-all shadow-lg flex items-center gap-2"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <div
                className="sar-narrative-content max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
                dangerouslySetInnerHTML={{
                  __html: versionData.narrative,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sar-narrative {
          font-family: Arial, sans-serif;
          color: #1a1a1a;
          line-height: 1.8;
        }
        
        .sar-narrative h1 {
          font-family: Arial, sans-serif;
          font-size: 24px;
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 3px solid #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .sar-narrative h2 {
          font-family: Arial, sans-serif;
          font-size: 18px;
          font-weight: bold;
          color: #1e40af;
          margin-top: 28px;
          margin-bottom: 14px;
          padding: 8px 12px;
          background: linear-gradient(to right, #dbeafe, transparent);
          border-left: 4px solid #3b82f6;
        }
        
        .sar-narrative h3 {
          font-family: Arial, sans-serif;
          font-size: 16px;
          font-weight: bold;
          color: #1e40af;
          margin-top: 20px;
          margin-bottom: 10px;
          padding-left: 12px;
          border-left: 3px solid #60a5fa;
        }
        
        .sar-narrative p {
          font-family: Arial, sans-serif;
          font-size: 14px;
          color: #374151;
          margin-bottom: 12px;
          text-align: justify;
        }
        
        .sar-meta {
          background: #f3f4f6;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          border-left: 4px solid #6366f1;
        }
        
        .sar-meta p {
          margin-bottom: 6px;
          font-size: 14px;
        }
        
        .sar-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-family: Arial, sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .sar-table thead {
          background: linear-gradient(to right, #1e40af, #3b82f6);
          color: white;
        }
        
        .sar-table th {
          padding: 14px;
          text-align: left;
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .sar-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
          color: #374151;
        }
        
        .sar-table tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        .sar-table tbody tr:hover {
          background-color: #eff6ff;
        }
        
        .sar-narrative ul {
          list-style: none;
          padding-left: 0;
          margin: 16px 0;
        }
        
        .sar-narrative ul li {
          padding: 8px 0 8px 28px;
          position: relative;
          font-family: Arial, sans-serif;
          font-size: 14px;
          color: #374151;
        }
        
        .sar-narrative ul li:before {
          content: "▸";
          position: absolute;
          left: 8px;
          color: #3b82f6;
          font-weight: bold;
        }
        
        .sar-narrative strong {
          color: #1e40af;
          font-weight: bold;
        }
        
        .highlight-red {
          color: #dc2626;
          background: #fee2e2;
          padding: 2px 6px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}