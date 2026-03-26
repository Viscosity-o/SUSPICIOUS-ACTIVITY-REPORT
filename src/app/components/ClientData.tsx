import { Search, FileText, Download, Upload, Database, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface UploadedFile {
  name: string;
  type: 'Transaction Data' | 'Case Exports' | 'Customer KYC' | 'Account Details';
  size: string;
  uploadDate: string;
  content: string;
}

interface CaseData {
  caseId: string;
  clientName: string;
  uploadDate: string;
  status: 'Processing' | 'Ready' | 'Error';
  files: UploadedFile[];
}

export function ClientData() {
  const [caseIdSearch, setCaseIdSearch] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock database of uploaded case data
  const casesDatabase: Record<string, CaseData> = {
    'SAR-2026-001': {
      caseId: 'SAR-2026-001',
      clientName: 'John Doe',
      uploadDate: 'Feb 14, 2026 at 2:30 PM',
      status: 'Ready',
      files: [
        {
          name: 'transaction_data.csv',
          type: 'Transaction Data',
          size: '2.4 MB',
          uploadDate: 'Feb 14, 2026',
          content: `Transaction ID,Date,Amount,Type,Account From,Account To,Description
TXN-001,2026-01-01,₹150000,Wire Transfer,ACC-9876-5432,ACC-5678-9012,International wire - Hong Kong
TXN-002,2026-01-01,₹85000,Wire Transfer,ACC-4321-8765,ACC-5678-9012,International wire - Singapore  
TXN-003,2026-01-02,₹120000,Wire Transfer,ACC-5555-1234,ACC-5678-9012,Domestic wire transfer
TXN-004,2026-01-02,₹95000,Wire Transfer,ACC-7777-9999,ACC-5678-9012,International wire - UAE
TXN-005,2026-01-03,₹180000,Wire Transfer,ACC-2222-3333,ACC-5678-9012,International wire - Switzerland
TXN-006,2026-01-03,₹75000,Wire Transfer,ACC-8888-4444,ACC-5678-9012,Domestic wire transfer
TXN-007,2026-01-04,₹160000,Wire Transfer,ACC-6666-7777,ACC-5678-9012,International wire - Cayman Islands
TXN-008,2026-01-04,₹110000,Wire Transfer,ACC-3333-2222,ACC-5678-9012,International wire - Panama
TXN-009,2026-01-05,₹200000,Wire Transfer,ACC-1111-5555,ACC-5678-9012,International wire - BVI
TXN-010,2026-01-05,₹90000,Wire Transfer,ACC-9999-8888,ACC-5678-9012,Domestic wire transfer
TXN-011,2026-01-06,₹145000,Wire Transfer,ACC-4444-6666,ACC-5678-9012,International wire - Hong Kong
TXN-012,2026-01-06,₹125000,Wire Transfer,ACC-7777-1111,ACC-5678-9012,International wire - Singapore
TXN-013,2026-01-07,₹5000000,Wire Transfer,ACC-5678-9012,OFF-9999-9999,Outbound international - Offshore Account`
        },
        {
          name: 'case_exports.json',
          type: 'Case Exports',
          size: '856 KB',
          uploadDate: 'Feb 14, 2026',
          content: `{
  "case_id": "SAR-2026-001",
  "alert_date": "2026-01-08",
  "case_type": "Money Laundering - Structuring",
  "risk_score": 92,
  "investigation_notes": [
    "Customer received 47 wire transfers over 7-day period",
    "Total amount: ₹5,000,000",
    "Immediate outbound transfer to offshore jurisdiction",
    "No business justification provided",
    "Pattern consistent with layering typology"
  ],
  "red_flags": [
    "Multiple incoming wires from different sources",
    "Rapid fund movement",
    "High-risk jurisdiction transfer",
    "Activity inconsistent with customer profile",
    "Structuring below reporting thresholds"
  ],
  "timeline": {
    "alert_triggered": "2026-01-08 09:15:00",
    "case_assigned": "2026-01-08 10:30:00",
    "investigation_started": "2026-01-08 14:00:00",
    "sar_initiated": "2026-02-14 13:00:00"
  }
}`
        },
        {
          name: 'customer_kyc.pdf',
          type: 'Customer KYC',
          size: '1.2 MB',
          uploadDate: 'Feb 14, 2026',
          content: `KNOW YOUR CUSTOMER (KYC) DOCUMENT

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name: John Doe
Customer ID: CUST-2024-001
Date of Birth: March 15, 1985
Nationality: Indian
PAN: ABCDE1234F
Aadhar: XXXX-XXXX-5678

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Address: 123 MG Road, Bangalore, Karnataka 560001
Email: john.doe@email.com
Phone: +91 98765 43210
Alternative Phone: +91 87654 32109

Employment Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Occupation: Consultant
Employer: Self-Employed
Annual Income: ₹800,000
Source of Funds: Consulting fees, professional services

Account Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Account Number: ACC-5678-9012
Account Type: Savings Account
Opening Date: March 10, 2024
Branch: Bangalore Main Branch
IFSC Code: BARC0001234

KYC Verification:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Initial KYC Date: March 10, 2024
Last Updated: January 15, 2025
Verification Status: VERIFIED
Risk Category: Medium
Next Review Date: January 15, 2026

Documents Submitted:
• PAN Card (verified)
• Aadhar Card (verified)
• Passport (verified)
• Address Proof - Utility Bill (verified)
• Income Proof - ITR (verified)

Politically Exposed Person (PEP): NO
Sanctions List Screening: CLEAR
Adverse Media Check: CLEAR`
        },
        {
          name: 'account_details.txt',
          type: 'Account Details',
          size: '45 KB',
          uploadDate: 'Feb 14, 2026',
          content: `ACCOUNT DETAILS REPORT
═══════════════════════════════════════════════════════

Account Number: ACC-5678-9012
Customer ID: CUST-2024-001
Customer Name: John Doe

ACCOUNT SUMMARY
───────────────────────────────────────────────────────

Account Type: Savings Account
Currency: INR (Indian Rupees)
Opening Date: March 10, 2024
Current Status: Active
Branch: Bangalore Main Branch (BARC0001234)

BALANCE HISTORY
───────────────────────────────────────────────────────

Current Balance: ₹15,000
Average Monthly Balance (Last 6 months): ₹85,000
Minimum Balance: ₹5,000
Maximum Balance: ₹5,100,000 (Jan 7, 2026)

TRANSACTION STATISTICS (Last 12 months)
───────────────────────────────────────────────────────

Total Credits: 89 transactions | ₹12,500,000
Total Debits: 45 transactions | ₹12,485,000
Average Credit: ₹140,449
Average Debit: ₹277,444

Domestic Transfers: 42
International Transfers: 47
Cash Deposits: 0
Cash Withdrawals: 0
Check Deposits: 0

UNUSUAL ACTIVITY ALERTS
───────────────────────────────────────────────────────

⚠ Alert #1 (Jan 8, 2026): High volume of incoming wire transfers
   - 47 transfers in 7 days
   - Total amount: ₹5,000,000
   - Status: Under Investigation

⚠ Alert #2 (Jan 8, 2026): Large outbound international transfer
   - Single transfer: ₹5,000,000
   - Destination: High-risk jurisdiction
   - Status: Flagged for review

RISK INDICATORS
───────────────────────────────────────────────────────

• Rapid fund accumulation from multiple sources
• Immediate transfer to offshore account
• Activity inconsistent with stated occupation
• No apparent business justification
• Pattern matches money laundering typologies

ACCOUNT RESTRICTIONS
───────────────────────────────────────────────────────

Current Restrictions: MONITORING ENHANCED
Reason: Suspicious activity investigation
Effective Date: January 8, 2026
Reviewed By: AML Compliance Team`
        }
      ]
    },
    'SAR-2026-002': {
      caseId: 'SAR-2026-002',
      clientName: 'Jane Smith',
      uploadDate: 'Feb 13, 2026 at 4:15 PM',
      status: 'Ready',
      files: [
        {
          name: 'transaction_data.csv',
          type: 'Transaction Data',
          size: '1.8 MB',
          uploadDate: 'Feb 13, 2026',
          content: `Transaction ID,Date,Amount,Type,Account From,Account To,Description
TXN-201,2026-01-15,₹185000,Cash Deposit,CASH,ACC-7890-1234,Branch cash deposit
TXN-202,2026-01-16,₹195000,Cash Deposit,CASH,ACC-7890-1234,Branch cash deposit
TXN-203,2026-01-17,₹175000,Cash Deposit,CASH,ACC-7890-1234,Branch cash deposit
TXN-204,2026-01-18,₹190000,Cash Deposit,CASH,ACC-7890-1234,Branch cash deposit
TXN-205,2026-01-19,₹180000,Cash Deposit,CASH,ACC-7890-1234,Branch cash deposit`
        },
        {
          name: 'case_exports.json',
          type: 'Case Exports',
          size: '512 KB',
          uploadDate: 'Feb 13, 2026',
          content: `{
  "case_id": "SAR-2026-002",
  "alert_date": "2026-01-30",
  "case_type": "Structuring - Cash Deposits",
  "risk_score": 78,
  "investigation_notes": [
    "Customer made 23 cash deposits over 14 days",
    "All deposits below ₹200,000 threshold",
    "Total amount: ₹3,500,000",
    "Pattern suggests intentional structuring"
  ]
}`
        },
        {
          name: 'customer_kyc.pdf',
          type: 'Customer KYC',
          size: '980 KB',
          uploadDate: 'Feb 13, 2026',
          content: `KNOW YOUR CUSTOMER (KYC) DOCUMENT

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name: Jane Smith
Customer ID: CUST-2024-002
Date of Birth: July 22, 1990
Nationality: Indian

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Address: 456 Park Street, Mumbai, Maharashtra 400001
Email: jane.smith@email.com
Phone: +91 98765 43211`
        },
        {
          name: 'account_details.txt',
          type: 'Account Details',
          size: '32 KB',
          uploadDate: 'Feb 13, 2026',
          content: `ACCOUNT DETAILS REPORT
═══════════════════════════════════════════════════════

Account Number: ACC-7890-1234
Customer ID: CUST-2024-002
Customer Name: Jane Smith

ACCOUNT SUMMARY
───────────────────────────────────────────────────────

Account Type: Current Account
Currency: INR
Opening Date: June 5, 2024
Current Status: Active - Under Review`
        }
      ]
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      const foundCase = casesDatabase[caseIdSearch.toUpperCase()];
      setSelectedCase(foundCase || null);
      setSelectedFile(null);
      setIsSearching(false);
    }, 800);
  };

  const handleClearSearch = () => {
    setCaseIdSearch('');
    setSelectedCase(null);
    setSelectedFile(null);
  };

  const handleFileSelect = (file: UploadedFile) => {
    setSelectedFile(file);
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5" strokeWidth={1.5} />;
  };

  const getFileTypeColor = (type: string) => {
    const colors = {
      'Transaction Data': { bg: '#E0F2FE', text: '#0369a1', border: '#BAE6FD' },
      'Case Exports': { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
      'Customer KYC': { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
      'Account Details': { bg: '#E0E7FF', text: '#3730A3', border: '#C7D2FE' }
    };
    return colors[type as keyof typeof colors] || colors['Transaction Data'];
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[28px] text-[#003366] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Client Data Audit
          </h2>
          <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            Search uploaded RAG data by Case ID to view transaction details, KYC documents, and case information
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#999999]" strokeWidth={2} />
              <input
                type="text"
                placeholder="Enter Case ID (e.g., SAR-2026-001)"
                value={caseIdSearch}
                onChange={(e) => setCaseIdSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-[#FAFAFA] border border-[#E8E8E8] pl-12 pr-4 h-[46px] rounded-lg text-[14px] text-[#1A1A1A] placeholder-[#999999] focus:outline-none focus:border-[#00AEEF] focus:bg-white transition-all"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!caseIdSearch || isSearching}
              className="h-[46px] px-8 bg-[#00AEEF] hover:bg-[#0284c7] disabled:bg-[#E8E8E8] disabled:text-[#999999] text-white rounded-lg text-[14px] transition-all shadow-sm"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            {(caseIdSearch || selectedCase) && (
              <button
                onClick={handleClearSearch}
                className="h-[46px] px-6 bg-white border border-[#E8E8E8] hover:bg-[#F5F5F5] text-[#6B6B6B] rounded-lg text-[14px] transition-all"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* No Search State */}
        {!selectedCase && !isSearching && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-[#F5F5F5] rounded-xl flex items-center justify-center mb-4">
              <Database className="w-10 h-10 text-[#CCCCCC]" strokeWidth={1.5} />
            </div>
            <p className="text-[15px] text-[#6B6B6B] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Enter a Case ID to retrieve uploaded data
            </p>
            <p className="text-[13px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Available cases: SAR-2026-001, SAR-2026-002
            </p>
          </div>
        )}

        {/* No Results State */}
        {!selectedCase && caseIdSearch && !isSearching && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-[#FEF2F2] rounded-xl flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-[#DC2626]" strokeWidth={1.5} />
            </div>
            <p className="text-[15px] text-[#DC2626] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              No data found for Case ID: {caseIdSearch}
            </p>
            <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Please check the Case ID and try again
            </p>
          </div>
        )}

        {/* Results View - Vertical Layout */}
        {selectedCase && (
          <div className="space-y-6">
            {/* Case Information Card */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[22px] text-[#003366]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      {selectedCase.caseId}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-[12px] ${
                      selectedCase.status === 'Ready' ? 'bg-[#D1FAE5] text-[#065F46]' :
                      selectedCase.status === 'Processing' ? 'bg-[#FEF3C7] text-[#92400E]' :
                      'bg-[#FEE2E2] text-[#991B1B]'
                    }`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      {selectedCase.status}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                    Client: {selectedCase.clientName}
                  </p>
                </div>
                <div className="flex items-center gap-8 pl-8 border-l border-[#E8E8E8]">
                  <div>
                    <label className="block text-[11px] text-[#999999] mb-1 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      Upload Date
                    </label>
                    <p className="text-[13px] text-[#1A1A1A]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                      {selectedCase.uploadDate}
                    </p>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#999999] mb-1 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      Files Uploaded
                    </label>
                    <p className="text-[13px] text-[#1A1A1A]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                      {selectedCase.files.length} documents
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Files List */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
              <h4 className="text-[15px] text-[#003366] mb-5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Uploaded Files
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedCase.files.map((file, index) => {
                  const colors = getFileTypeColor(file.type);
                  const isSelected = selectedFile?.name === file.name;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleFileSelect(file)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#00AEEF] bg-[#F0F9FF] shadow-sm'
                          : 'border-[#E8E8E8] hover:border-[#00AEEF]/40 hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: colors.bg }}
                        >
                          <FileText 
                            className="w-5 h-5" 
                            strokeWidth={1.5}
                            style={{ color: colors.text }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] text-[#1A1A1A] mb-1.5 truncate" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="text-[11px] px-2 py-0.5 rounded"
                              style={{ 
                                backgroundColor: colors.bg,
                                color: colors.text,
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600
                              }}
                            >
                              {file.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>Uploaded {file.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* File Content Viewer - Below Files */}
            {selectedFile ? (
              <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
                {/* File Header */}
                <div className="border-b border-[#E8E8E8] p-5 bg-[#FAFAFA]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: getFileTypeColor(selectedFile.type).bg }}
                      >
                        <FileText 
                          className="w-5 h-5" 
                          strokeWidth={1.5}
                          style={{ color: getFileTypeColor(selectedFile.type).text }}
                        />
                      </div>
                      <div>
                        <h3 className="text-[15px] text-[#003366] mb-0.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                          {selectedFile.name}
                        </h3>
                        <p className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                          {selectedFile.type} • {selectedFile.size} • Uploaded {selectedFile.uploadDate}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 h-[36px] bg-white border border-[#E8E8E8] hover:bg-[#F5F5F5] text-[#1A1A1A] rounded-lg text-[13px] transition-all">
                      <Download className="w-4 h-4" strokeWidth={2} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Download</span>
                    </button>
                  </div>
                </div>

                {/* File Content */}
                <div className="p-6 max-h-[600px] overflow-y-auto">
                  <pre 
                    className="text-[12px] text-[#1A1A1A] leading-relaxed whitespace-pre-wrap font-mono"
                    style={{ fontFamily: "'Monaco', 'Courier New', monospace" }}
                  >
                    {selectedFile.content}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E8E8E8] rounded-xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F5F5F5] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#CCCCCC]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Select a file above to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}