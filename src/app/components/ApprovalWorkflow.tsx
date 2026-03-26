import { CheckCircle, UserCheck, Send, AlertTriangle, Clock, Sparkles, Download, FileCheck } from 'lucide-react';
import { useState } from 'react';

export function ApprovalWorkflow() {
  const [approvalStep, setApprovalStep] = useState<'review' | 'approved' | 'revision' | 'regenerating'>('review');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [streamedText, setStreamedText] = useState('');

  const fullNarrative = `SUSPICIOUS ACTIVITY REPORT - NARRATIVE

Case ID: SAR-2026-001
Date Filed: February 14, 2026
Subject: Rapid Fund Movement - Potential Money Laundering

I. SUMMARY OF SUSPICIOUS ACTIVITY

On January 1-7, 2026, customer John Doe (Customer ID: CUST-2024-001, Account: ACC-5678-9012) received a total of ₹50,00,000 (approximately $60,000 USD) through 47 separate incoming wire transfers from distinct source accounts. Within 24 hours of the final deposit, the entire balance was transferred via international wire to an offshore account in a high-risk jurisdiction.

II. ACCOUNT AND CUSTOMER BACKGROUND

The subject account was opened in March 2024. The customer's stated occupation is "consultant" with reported annual income of ₹8,00,000. The account typically maintained a balance below ₹1,00,000 prior to this activity. KYC documentation was last verified in January 2025 and is current.

III. DESCRIPTION OF SUSPICIOUS ACTIVITY

Between January 1-7, 2026, the following pattern was observed:

• 47 incoming wire transfers from different source accounts
• Transfer amounts ranged from ₹50,000 to ₹2,00,000
• All transfers occurred within a 7-day window
• Total aggregate amount: ₹50,00,000
• Immediate outbound wire transfer to offshore account
• No apparent business or personal justification

IV. MONEY LAUNDERING TYPOLOGIES

This activity is consistent with established money laundering patterns:

1. Structuring/Smurfing: Multiple transfers below reporting thresholds
2. Layering: Rapid movement through multiple accounts
3. Integration: Quick conversion to international transfer

V. REGULATORY REFERENCES

This activity triggers reporting requirements under:
• Bank Secrecy Act (BSA)
• FinCEN SAR Filing Requirements
• FATF Recommendation 20 (Suspicious Transaction Reporting)

VI. CONCLUSION

Based on the rapid accumulation of funds from multiple sources followed by immediate international transfer, combined with the account's historical profile and lack of business justification, this activity is deemed suspicious and potentially indicative of money laundering.

The financial institution has taken no action regarding the account pending regulatory guidance.`;

  const handleRegenerate = () => {
    setApprovalStep('regenerating');
    setStreamedText('');
    
    let currentIndex = 0;
    const words = fullNarrative.split(' ');
    
    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        setStreamedText(prev => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setTimeout(() => {
          setApprovalStep('review');
          setRevisionNotes('');
        }, 500);
      }
    }, 50);
  };

  const handleSubmitToFinCEN = () => {
    setShowSubmitConfirm(false);
    setShowSubmitSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Status */}
      <div className="border border-[#DDDDDD] p-8 bg-white" style={{ borderRadius: '4px' }}>
        <div className="border-l-[3px] border-[#00AEEF] pl-4 mb-6">
          <h2 className="text-[26px] font-semibold text-[#003366] mb-1" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>Approval Workflow</h2>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#008000] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#003366]" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>Generated</div>
                <div className="text-[13px] text-[#666666]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>AI draft complete</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="h-px bg-[#DDDDDD]"></div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                approvalStep === 'review' || approvalStep === 'revision'
                  ? 'bg-[#00AEEF]' 
                  : 'bg-[#008000]'
              }`}>
                {approvalStep === 'review' || approvalStep === 'revision' ? (
                  <Clock className="w-5 h-5 text-white" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#003366]">Review</div>
                <div className="text-[13px] text-[#666666]">Analyst approval</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className={`h-px ${approvalStep === 'approved' ? 'bg-[#008000]' : 'bg-[#DDDDDD]'}`}></div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                approvalStep === 'approved' 
                  ? 'bg-[#008000]' 
                  : 'bg-[#DDDDDD]'
              }`}>
                <Send className={`w-5 h-5 ${approvalStep === 'approved' ? 'text-white' : 'text-[#666666]'}`} />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#003366]">Submit</div>
                <div className="text-[13px] text-[#666666]">File to FinCEN</div>
              </div>
            </div>
          </div>
        </div>

        {/* Regenerating Status */}
        {approvalStep === 'regenerating' && (
          <div className="border border-green-300 rounded-lg p-6 bg-green-50">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 border border-green-300 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-green-600 animate-pulse" />
              </div>
              <div>
                <h4 className="text-slate-900 text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Regenerating SAR Narrative...</h4>
                <p className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>AI is incorporating your feedback and regenerating the narrative</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-300 max-h-[400px] overflow-y-auto">
              <div className="text-slate-900 text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                {streamedText}
                <span className="inline-block w-2 h-4 bg-green-600 ml-1 animate-pulse"></span>
              </div>
            </div>
          </div>
        )}

        {/* Current Status Card */}
        {approvalStep === 'review' && (
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-4">
              <UserCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-slate-900 text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Analyst Review Required
                </h3>
                <p className="text-slate-700 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Please review the AI-generated narrative, verify all facts, and ensure compliance with regulatory requirements before approval.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 mb-4">
              <label className="flex items-start gap-3 text-sm cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded mt-0.5 border-gray-300" />
                <span className="text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Verified all transaction data is accurate
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded mt-0.5 border-gray-300" />
                <span className="text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Confirmed suspicious activity typology matches
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded mt-0.5 border-gray-300" />
                <span className="text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Reviewed regulatory citations for accuracy
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded mt-0.5 border-gray-300" />
                <span className="text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  No discriminatory or biased language detected
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded mt-0.5 border-gray-300" />
                <span className="text-slate-700 group-hover:text-slate-900 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Narrative is clear and defensible to regulators
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-blue-200">
              <button 
                onClick={() => setApprovalStep('revision')}
                className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-slate-700 rounded-md text-sm transition-all border border-gray-300"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              >
                Request Revision
              </button>
              <button 
                onClick={() => setApprovalStep('approved')}
                className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              >
                <CheckCircle className="w-4 h-4" />
                Approve SAR
              </button>
            </div>
          </div>
        )}

        {approvalStep === 'approved' && (
          <div className="border border-green-300 bg-green-50 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-slate-900 text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  SAR Approved
                </h3>
                <p className="text-slate-700 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  This SAR narrative has been reviewed and approved. Ready for submission to FinCEN.
                </p>
              </div>
            </div>

            {/* Approval Details */}
            <div className="bg-white rounded-lg p-4 mb-4 space-y-2 border border-green-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Approved By</span>
                <span className="text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>John Smith (Analyst)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Approval Date</span>
                <span className="text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>February 14, 2026 14:35:42</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Approval ID</span>
                <span className="text-slate-900 font-mono">APV-2026-001</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Send className="w-4 h-4" />
              Submit to FinCEN
            </button>
          </div>
        )}

        {approvalStep === 'revision' && (
          <div className="border border-amber-300 bg-amber-50 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-slate-900 text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Revision Requested
                </h3>
                <p className="text-slate-700 text-xs leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Provide feedback for AI to regenerate the narrative with corrections.
                </p>
                <textarea
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="Describe the changes needed..."
                  rows={4}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-slate-900 text-sm hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setApprovalStep('review')}
                className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-slate-700 rounded-md text-sm font-medium border border-gray-300 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleRegenerate}
                className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Sparkles className="w-4 h-4" />
                Regenerate SAR
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Role-Based Access Indicator */}
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>John Smith</div>
              <div className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>Senior Compliance Analyst</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-md text-xs font-medium text-green-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              Full Access
            </span>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-slate-900 text-lg font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>Submit SAR to FinCEN?</h3>
                <p className="text-slate-600 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>This action cannot be undone</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Case ID:</span>
                  <span className="text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>SAR-2026-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Filing Entity:</span>
                  <span className="text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>First National Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Submission Method:</span>
                  <span className="text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>BSA E-Filing System</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-slate-700 rounded-md text-sm font-medium border border-gray-300 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitToFinCEN}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Success Modal */}
      {showSubmitSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h3 className="text-2xl text-slate-900 mb-2 font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                Successfully Submitted!
              </h3>
              <p className="text-slate-600 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your SAR has been successfully submitted to FinCEN
              </p>
              
              {/* Submission Details */}
              <div className="bg-slate-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Case ID:</span>
                    <span className="text-slate-900 font-mono" style={{ fontFamily: 'Inter, sans-serif' }}>SAR-2026-001</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Submission ID:</span>
                    <span className="text-slate-900 font-mono" style={{ fontFamily: 'Inter, sans-serif' }}>BSA-20260214-8472</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Submitted:</span>
                    <span className="text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Feb 14, 2026 at 2:45 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Status:</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <FileCheck className="w-3 h-3" />
                      Accepted
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                className="flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => setShowSubmitSuccess(false)}
                className="flex-1 px-5 py-3 bg-gray-200 hover:bg-gray-300 text-slate-700 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}