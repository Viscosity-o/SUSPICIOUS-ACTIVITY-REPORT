import { ArrowLeft, Clock, Edit, RefreshCw, User, GitBranch, ChevronDown, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VersionHistoryProps {
  onBack: () => void;
  versions?: Version[]; // Optional: pass versions from backend
  sarId?: string; // Optional: SAR ID for display
}

interface Version {
  version: string;
  type: 'Generated' | 'Edited' | 'Reprompted';
  timestamp: string;
  user: string;
  changes: string;
  sections: string[];
  promptChanges?: string;
  systemPrompt: string;
  userPrompt: string;
  narrative: {
    sections: { title: string; content: string }[];
  };
}

export function VersionHistory({ onBack, versions: propVersions, sarId = 'SAR-1023' }: VersionHistoryProps) {
  // Default mock data (for demonstration) - this would come from backend in production
  const defaultVersions: Version[] = [
    {
      version: 'v3.1',
      type: 'Edited',
      timestamp: '2026-03-21 14:32:15',
      user: 'analyst_01',
      changes: 'Refined narrative clarity in grounds for suspicion section',
      sections: ['Section III - Grounds for Suspicion'],
      systemPrompt: 'You are an expert AML compliance analyst specializing in generating Suspicious Activity Reports (SARs) for financial institutions. Analyze the provided transaction data and customer profile to identify patterns of suspicious activity. Generate a comprehensive SAR narrative following regulatory guidelines including Proceeds of Crime Act 2002 and Money Laundering Regulations 2017.',
      userPrompt: 'Customer: John Doe (CUS-2026-A4421). Account: ACC-004A421. Transaction Period: 16 Nov 2025 - 02 Feb 2026. Total Transactions: 5. Aggregate Value: £43,250.00. Flagged Patterns: Structuring (5 instances), Threshold Avoidance (5 instances), Out-of-hours activity (4 instances). Generate comprehensive SAR narrative with enhanced clarity in grounds for suspicion section.',
      narrative: {
        sections: [
          {
            title: 'I. EXECUTIVE SUMMARY',
            content: 'This Suspicious Activity Report concerns JOHN DOE (CUS-2026-A4421), holder of account ACC-004A421, in relation to five suspicious transactions totalling £43,250.00 conducted between 16 November 2025 and 02 February 2026. The transactions exhibit deliberate structuring below regulatory reporting thresholds, with four of five transactions occurring during out-of-hours periods. The pattern demonstrates characteristics consistent with money laundering activity under the Proceeds of Crime Act 2002, warranting formal reporting to the National Crime Agency. [REFINED FOR CLARITY - v3.1]'
          },
          {
            title: 'II. SUBJECT INFORMATION',
            content: 'Full Name: John Doe\nCustomer Reference: CUS-2026-A4421\nAccount Number: ACC-004A421\nAccount Type: Personal Current Account\nAccount Opening Date: 14 March 2024\nDeclared Occupation: Consultant\nResidential Address: 42 Kensington Gardens, London, SW7 4LB\nDate of Birth: 15 June 1978\nNationality: British\n\nThe customer has maintained the account for approximately 23 months with historically normal transaction patterns until the suspicious activity period commenced in November 2025.'
          },
          {
            title: 'III. GROUNDS FOR SUSPICION',
            content: 'The grounds for suspicion are clearly established through multiple indicators of deliberate threshold avoidance and structured financial activity:\n\n1. TRANSACTION STRUCTURING PATTERN\nFive transactions identified with amounts ranging from £8,340.00 to £8,900.00, all deliberately positioned below the £10,000 reporting threshold. This precise calibration demonstrates knowledge of regulatory thresholds and intentional circumvention. The transactions occurred on: 16 November 2025 (£8,900.00), 17 November 2025 (£8,730.00), 20 December 2025 (£8,340.00), 01 January 2026 (£8,810.00), and 02 February 2026 (£8,430.00).\n\n2. OUT-OF-HOURS ACTIVITY\nFour out of five transactions were conducted during late evening or early morning hours (20:51, 23:51, 22:51, 06:51), with only one transaction during normal banking hours (15:51). This timing pattern indicates deliberate avoidance of real-time scrutiny and manual review processes typically active during business hours.\n\n3. STATISTICAL CONSISTENCY\nThe standard deviation across transaction amounts is £236, representing an unusually low variance. The average transaction value of £8,650 with such minimal deviation suggests calculated structuring rather than organic financial behavior. Natural transaction patterns typically exhibit greater variability.\n\n4. CUSTOMER PROFILE MISMATCH\nThe transaction pattern is inconsistent with the customer\'s declared occupation as a Consultant and known income profile. The regular high-value transactions below threshold limits suggest coordination rather than legitimate business activity. [ENHANCED CLARITY - v3.1]'
          },
          {
            title: 'IV. FINANCIAL SUMMARY',
            content: 'Total Transaction Value: £43,250.00 across five transactions\nAverage Transaction: £8,650.00\nStandard Deviation: £236 (indicating deliberate consistency)\nTransaction Frequency: Five transactions over 79 days (periodic pattern)\nTransaction Direction: Three debits, two credits (balanced flow pattern)\nThreshold Positioning: All transactions 12-16% below £10,000 CTR threshold\nCumulative Risk Score: 87/100 (High Risk)\n\nThe financial analysis confirms systematic threshold avoidance with mathematical precision inconsistent with legitimate commercial activity.'
          },
          {
            title: 'V. SUPPORTING DOCUMENTATION',
            content: '• Account transaction history (16 Nov 2025 - 02 Feb 2026)\n• Customer due diligence records\n• Account opening documentation\n• Historical transaction pattern analysis (14 Mar 2024 - 15 Nov 2025)\n• Source of funds verification attempts\n• Enhanced monitoring alerts and system flags\n• Internal compliance review notes'
          },
          {
            title: 'VI. REGULATORY REFERENCES',
            content: 'This report is submitted in accordance with:\n\n• Proceeds of Crime Act 2002 (POCA), Sections 330-332 - Statutory obligation to report knowledge or suspicion of money laundering\n• Money Laundering Regulations 2017 (MLR 2017), Regulation 30 - Requirements for suspicious activity reporting\n• NCA SAR Guidelines (Current Edition) - Standard format and content requirements\n• JMLSG Guidance, Part I, Chapter 5 - Industry guidance on identifying suspicious activity patterns including structuring\n\nThe activity described meets the threshold for reasonable grounds to know or suspect that the customer is engaged in money laundering as defined under POCA 2002.'
          }
        ]
      }
    },
    {
      version: 'v1.0',
      type: 'Generated',
      timestamp: '2026-03-20 14:15:30',
      user: 'analyst_01',
      changes: 'Initial SAR generation based on transaction data analysis',
      sections: ['All Sections'],
      systemPrompt: 'You are an expert AML compliance analyst specializing in generating Suspicious Activity Reports (SARs) for financial institutions. Analyze the provided transaction data and customer profile to identify patterns of suspicious activity. Generate a comprehensive SAR narrative following regulatory guidelines including Proceeds of Crime Act 2002 and Money Laundering Regulations 2017.',
      userPrompt: 'Customer: John Doe (CUS-2026-A4421). Account: ACC-004A421. Transaction Period: 16 Nov 2025 - 02 Feb 2026. Total Transactions: 5. Aggregate Value: £43,250.00. Flagged Patterns: Structuring (5 instances), Threshold Avoidance (5 instances), Out-of-hours activity (4 instances). Generate comprehensive SAR narrative.',
      narrative: {
        sections: [
          {
            title: 'I. EXECUTIVE SUMMARY',
            content: 'This Suspicious Activity Report concerns JOHN DOE (CUS-2026-A4421), holder of account ACC-004A421, in relation to five suspicious transactions totalling £43,250.00 conducted between 16 November 2025 and 02 February 2026. The transactions exhibit deliberate structuring below regulatory reporting thresholds, with four of five transactions occurring during out-of-hours periods. The pattern demonstrates characteristics consistent with money laundering activity under the Proceeds of Crime Act 2002, warranting formal reporting to the National Crime Agency.'
          },
          {
            title: 'II. SUBJECT INFORMATION',
            content: 'Full Name: John Doe\nCustomer Reference: CUS-2026-A4421\nAccount Number: ACC-004A421\nAccount Type: Personal Current Account\nAccount Opening Date: 14 March 2024\nDeclared Occupation: Consultant\nResidential Address: 42 Kensington Gardens, London, SW7 4LB\nDate of Birth: 15 June 1978\nNationality: British\n\nThe customer has maintained the account for approximately 23 months with historically normal transaction patterns until the suspicious activity period commenced in November 2025.'
          },
          {
            title: 'III. GROUNDS FOR SUSPICION',
            content: 'The grounds for suspicion are established through multiple indicators:\n\n1. TRANSACTION STRUCTURING PATTERN\nFive transactions identified with amounts ranging from £8,340.00 to £8,900.00, all positioned below the £10,000 reporting threshold.\n\n2. OUT-OF-HOURS ACTIVITY\nFour out of five transactions were conducted during late evening or early morning hours.\n\n3. STATISTICAL CONSISTENCY\nThe standard deviation across transaction amounts is £236, representing unusually low variance.'
          },
          {
            title: 'IV. FINANCIAL SUMMARY',
            content: 'Total Transaction Value: £43,250.00 across five transactions\nAverage Transaction: £8,650.00\nStandard Deviation: £236\nTransaction Frequency: Five transactions over 79 days\nTransaction Direction: Three debits, two credits\nThreshold Positioning: All transactions below £10,000 CTR threshold'
          },
          {
            title: 'V. SUPPORTING DOCUMENTATION',
            content: '• Account transaction history (16 Nov 2025 - 02 Feb 2026)\n• Customer due diligence records\n• Account opening documentation\n• Historical transaction pattern analysis\n• Enhanced monitoring alerts'
          },
          {
            title: 'VI. REGULATORY REFERENCES',
            content: 'This report is submitted in accordance with:\n\n• Proceeds of Crime Act 2002 (POCA), Sections 330-332\n• Money Laundering Regulations 2017 (MLR 2017), Regulation 30\n• NCA SAR Guidelines (Current Edition)\n• JMLSG Guidance, Part I, Chapter 5\n\nThe activity described meets the threshold for reasonable grounds to know or suspect money laundering.'
          }
        ]
      }
    }
  ];

  // Use provided versions or default mock data
  const versions = propVersions || defaultVersions;

  // Set selected version to the first (latest) version
  const [selectedVersion, setSelectedVersion] = useState(versions[0]?.version || 'v1.0');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Update selected version when versions prop changes
  useEffect(() => {
    if (versions.length > 0 && !versions.find(v => v.version === selectedVersion)) {
      setSelectedVersion(versions[0].version);
    }
  }, [versions, selectedVersion]);

  // Calculate statistics based on actual versions
  const totalVersions = versions.length;
  const totalEdits = versions.filter(v => v.type === 'Edited').length;
  const totalReprompts = versions.filter(v => v.type === 'Reprompted').length;
  const currentVersionNumber = versions[0]?.version || 'v1.0';

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Generated':
        return 'bg-[#ECFDF5] text-[#10B981] border-[#D1FAE5]';
      case 'Edited':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#FDE68A]';
      case 'Reprompted':
        return 'bg-[#EFF6FF] text-[#0284c7] border-[#DBEAFE]';
      default:
        return 'bg-[#F5F5F5] text-[#6B6B6B] border-[#E8E8E8]';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Generated':
        return <GitBranch className="w-4 h-4" />;
      case 'Edited':
        return <Edit className="w-4 h-4" />;
      case 'Reprompted':
        return <RefreshCw className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Get current selected version data
  const selectedVersionData = versions.find(v => v.version === selectedVersion) || versions[0];

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1200px] mx-auto py-6 px-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 h-[36px] bg-white border border-[#D1D5DB] text-[#2C2C2C] hover:bg-[#F9FAFB] text-[13px] rounded-md transition-all mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            <ArrowLeft className="w-[14px] h-[14px]" />
            Back to Audit Trail
          </button>
          <div>
            <h1 className="text-[22px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Version History – {sarId}
            </h1>
            <p className="text-[13px] text-[#6B7280] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Complete version tracking with edit and reprompt history
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#6B7280]" />
              <span className="text-[11px] text-[#6B7280] font-medium uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                Total Versions
              </span>
            </div>
            <div className="text-[24px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {totalVersions}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Edit className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-[11px] text-[#6B7280] font-medium uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                Manual Edits
              </span>
            </div>
            <div className="text-[24px] font-bold text-[#F59E0B]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {totalEdits}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-[#0284c7]" />
              <span className="text-[11px] text-[#6B7280] font-medium uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                AI Reprompts
              </span>
            </div>
            <div className="text-[24px] font-bold text-[#0284c7]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {totalReprompts}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="w-4 h-4 text-[#10B981]" />
              <span className="text-[11px] text-[#6B7280] font-medium uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                Current Version
              </span>
            </div>
            <div className="text-[24px] font-bold text-[#10B981]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {currentVersionNumber}
            </div>
          </div>
        </div>

        {/* Version Selector Dropdown */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden mb-6">
          <div className="bg-[#F1F5F9] px-6 py-3 border-b border-[#E5E7EB]">
            <h2 className="text-[16px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
              View Version Details
            </h2>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label className="text-[13px] font-semibold text-[#003366] mb-2 block" style={{ fontFamily: "'Inter', sans-serif" }}>
                Select Version
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 h-[44px] bg-white border border-[#D1D5DB] text-[#2C2C2C] hover:border-[#00AEEF] text-[14px] rounded-md transition-all"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#1F3A5F]">{selectedVersion}</span>
                    {selectedVersionData && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border font-medium ${getTypeColor(selectedVersionData.type)}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                        {getTypeIcon(selectedVersionData.type)}
                        {selectedVersionData.type}
                      </span>
                    )}
                    {selectedVersion === currentVersionNumber && (
                      <span className="px-2 py-0.5 bg-[#10B981] text-white rounded-full text-[9px] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                        CURRENT
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#6B7280] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-[#E5E7EB] rounded-md shadow-lg max-h-[300px] overflow-y-auto">
                    {versions.map((version, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedVersion(version.version);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#F9FAFB] transition-all border-b border-[#F3F4F6] last:border-b-0 ${
                          selectedVersion === version.version ? 'bg-[#EFF6FF]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {version.version}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border font-medium ${getTypeColor(version.type)}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                            {getTypeIcon(version.type)}
                            {version.type}
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 bg-[#10B981] text-white rounded-full text-[9px] font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                              CURRENT
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#6B7280]" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {version.timestamp}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Prompt Section */}
        {selectedVersionData && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden mb-6">
            <div className="bg-[#F1F5F9] px-6 py-3 border-b border-[#E5E7EB]">
              <h2 className="text-[16px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
                AI Prompt Used ({selectedVersion})
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-[12px] font-semibold text-[#003366] mb-2 uppercase tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                    System Prompt
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-4 text-[13px] text-[#2C2C2C] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {selectedVersionData.systemPrompt}
                  </div>
                </div>

                <div>
                  <div className="text-[12px] font-semibold text-[#003366] mb-2 uppercase tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                    User Prompt
                  </div>
                  <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-md p-4 text-[13px] text-[#1F3A5F] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {selectedVersionData.userPrompt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SAR Narrative Display */}
        {selectedVersionData && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="bg-[#F1F5F9] px-6 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-bold text-[#1F3A5F]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Generated SAR Narrative ({selectedVersion})
                </h2>
                <p className="text-[12px] text-[#6B7280] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {selectedVersionData.type} by {selectedVersionData.user} on {selectedVersionData.timestamp}
                </p>
              </div>
              <FileText className="w-5 h-5 text-[#1F3A5F]" />
            </div>

            <div className="p-6">
              {selectedVersionData.narrative.sections.map((section, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="bg-[#003366] px-4 py-2 rounded-t-md">
                    <h3 className="text-[14px] font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {section.title}
                    </h3>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] border-t-0 rounded-b-md p-4">
                    <div className="text-[13px] text-[#2C2C2C] leading-relaxed whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
