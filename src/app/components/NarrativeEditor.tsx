import { Edit3, Save, X, TrendingUp, Download, BarChart3, CheckCircle, RotateCcw, Sparkles, Shield } from 'lucide-react';
import { useState, useRef } from 'react';
import { AuditTrail } from './AuditTrail';
import { Visualization } from './Visualization';

interface NarrativeEditorProps {
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

export function NarrativeEditor({ isFullScreen = false, onToggleFullScreen }: NarrativeEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [showRepromptModal, setShowRepromptModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [repromptText, setRepromptText] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  const narrativeHTML = `<div class="sar-report">
<div class="breadcrumb">SAR Dashboard > SAR/2026/BARCL/00047</div>

<h1 class="main-title">Suspicious Activity Report</h1>

<div class="section-card">
  <div class="section-header">1. Subject Details</div>
  <div class="section-content">
    <p>This report concerns <strong>John Doe</strong>, customer reference CUS-2026-A4421, a British national born on 15 March 1978. The subject holds a Personal Retail Banking account (Account Number: ACC-004A421) which was opened on 14 September 2025. The customer's KYC risk rating is classified as Medium-High. The subject is not identified as a Politically Exposed Person. As of the date of this report, the account status is Active with an average monthly balance of £4,200.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">2. Grounds for Suspicion</div>
  <div class="section-content">
    <h3 class="subsection-title">2.1 Overview</h3>
    <p>Suspicious transaction activity was identified between 16 November 2025 and 02 February 2026, indicative of potential structuring behavior designed to avoid mandatory reporting thresholds. The pattern of transactions, their timing, amounts, and lack of legitimate commercial justification raise significant concerns regarding possible money laundering activity contrary to the Proceeds of Crime Act 2002 and Money Laundering Regulations 2017.</p>
    
    <div class="divider"></div>
    
    <h3 class="subsection-title">2.2 Transaction Activity</h3>
    <p>During the relevant period, a total of five transactions were identified across the subject's account. On 16 November 2025 at 20:51 hours, a debit transaction of £8,900.00 was processed involving a UK individual counterparty, with the transaction value falling below the £10,000 reporting threshold. On 17 November 2025 at 15:51 hours, a credit transaction of £8,730.00 was received from a UK individual, again below threshold. On 20 December 2025 at 23:51 hours, a debit of £8,340.00 was processed to a UK individual counterparty, maintaining the pattern of sub-threshold transactions. On 01 January 2026 at 22:51 hours, a debit of £8,810.00 was made to a UK individual. Finally, on 02 February 2026 at 06:51 hours, a credit of £8,430.00 was received from a UK individual. Each transaction was deliberately structured to remain below the £10,000 mandatory reporting threshold.</p>
    
    <div class="divider"></div>
    
    <h3 class="subsection-title">2.3 Pattern Analysis</h3>
    <p>Analysis of the transaction pattern reveals characteristics consistent with deliberate structuring or "smurfing" behavior. The transactions demonstrate a calculated approach with amounts ranging narrowly between £8,340.00 and £8,900.00, showing a standard deviation of £236. This consistency in value, combined with the deliberate positioning of all amounts below regulatory thresholds, suggests intentional fragmentation of larger sums to evade detection and reporting requirements. The timing of transactions occurring during out-of-hours periods (late evening and early morning) further supports the assessment of deliberate concealment activity. The aggregate value of all identified transactions totals £43,250.00, representing substantial movement of funds through structured means.</p>
    
    <div class="divider"></div>
    
    <h3 class="subsection-title">2.4 Absence of Legitimate Explanation</h3>
    <p>The subject has failed to provide adequate commercial or personal justification for the identified transaction pattern. The frequency, timing, amount consistency, and counterparty relationships do not align with the customer's stated occupation, income profile, or normal account usage patterns as established during customer due diligence procedures. Despite the subject's cooperation with routine account inquiries, no satisfactory explanation has been forthcoming regarding the specific structuring behavior observed. The absence of legitimate business purpose, combined with the deliberate threshold avoidance, reinforces the assessment that these activities are suspicious in nature and warrant formal reporting to the relevant authorities.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">3. Financial Summary</div>
  <div class="section-content">
    <p>The financial analysis of the subject's account activity during the relevant period reveals a total transaction value of <strong>£43,250.00</strong> across five separate transactions. The average transaction value is calculated at <strong>£8,650.00</strong>, with a standard deviation of <strong>£236</strong>, demonstrating unusually consistent transaction sizing. The account activity shows four transfers classified as out-of-hours transactions, occurring outside normal banking hours. Analysis of transaction direction reveals a balanced pattern with no sanctions check matches identified against any counterparties. The consistency in transaction values, combined with the temporal distribution and threshold avoidance behavior, presents a statistical profile consistent with structured money laundering activity rather than legitimate commercial or personal banking behavior.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">4. Regulatory & Legal Basis</div>
  <div class="section-content">
    <p>This Suspicious Activity Report is submitted in accordance with the statutory obligations imposed under the <strong>Proceeds of Crime Act 2002 (POCA)</strong>, specifically sections 330-332 relating to failure to disclose knowledge or suspicion of money laundering. The report is made pursuant to the <strong>Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017)</strong>, which mandate the reporting of suspicious activity to the National Crime Agency. This disclosure is consistent with the National Crime Agency's SAR submission guidelines and aligns with the Joint Money Laundering Steering Group (JMLSG) Guidance, Part I, Chapter 5. This report is made in good faith and in the reasonable belief that the information disclosed tends to show that a person has engaged in money laundering as defined under POCA 2002. The submitting institution acknowledges the prohibition against tipping off as specified under section 333A of POCA 2002 and confirms that no disclosure of this report or its contents has been made to the subject or any related parties.</p>
  </div>
</div>

<div class="section-card">
  <div class="section-header">5. Conclusion</div>
  <div class="section-content">
    <p>Based on the comprehensive analysis of the identified transaction patterns, the deliberate structuring behavior to avoid regulatory thresholds, and the absence of any legitimate commercial or personal justification, it is the professional assessment of this institution that the subject's account activity presents a credible suspicion of money laundering. The consistency in transaction amounts, the timing of transfers during out-of-hours periods, and the systematic threshold avoidance demonstrate sophisticated financial behavior inconsistent with the customer's profile and stated business activities. This Suspicious Activity Report is therefore submitted to the National Crime Agency for further investigation and appropriate action in accordance with regulatory requirements.</p>
    
    <div class="signature-section">
      <div class="signature-block">
        <div class="signature-line"></div>
        <div class="signature-label">Analyst Signature</div>
        <div class="signature-name">A. Sharma (ANL-0042)</div>
        <div class="signature-date">19 March 2026</div>
      </div>
      <div class="signature-block">
        <div class="signature-line"></div>
        <div class="signature-label">Manager Signature</div>
        <div class="signature-name">S. Turner</div>
        <div class="signature-date">19 March 2026</div>
      </div>
    </div>
  </div>
</div>

<div class="footer-section">
  <span>Report Ref: SAR/2026/BARCL/00047</span>
  <span>Case Ref: CASE-2026-0001</span>
  <span>Page 1 of 3</span>
  <span>STRICTLY CONFIDENTIAL</span>
</div>
</div>`;

  const [narrative, setNarrative] = useState(narrativeHTML);

  const phases = [
    { label: 'Data Parsing', duration: 1200 },
    { label: 'Transaction Pattern Analysis', duration: 1400 },
    { label: 'Risk Indicator Detection', duration: 1300 },
    { label: 'Narrative Construction', duration: 1500 },
  ];

  const handleSave = () => {
    if (editableRef.current) {
      setNarrative(editableRef.current.innerHTML);
    }
    setIsEditing(false);
  };

  const handleApprove = () => {
    setIsApproved(true);
    // Here you would typically send the approval to your backend
    setTimeout(() => {
      alert('SAR Report approved successfully!');
    }, 300);
  };

  const handleReprompt = () => {
    setShowRepromptModal(true);
  };

  const handleRepromptSubmit = () => {
    if (!repromptText.trim()) {
      alert('Please enter reprompt instructions');
      return;
    }

    setShowRepromptModal(false);
    setIsRegenerating(true);
    setCurrentPhase(0);
    setIsApproved(false);

    // Simulate regeneration with animation
    let phaseIndex = 0;
    const cyclePhases = () => {
      if (phaseIndex < phases.length) {
        setCurrentPhase(phaseIndex);
        phaseIndex++;
        setTimeout(cyclePhases, phases[phaseIndex - 1].duration);
      } else {
        setTimeout(() => {
          setIsRegenerating(false);
          setRepromptText('');
          // In a real app, this would update with new narrative based on the reprompt
        }, 600);
      }
    };

    cyclePhases();
  };

  // If showing Audit Trail or Visualization, render them instead of the narrative
  if (showAuditTrail) {
    return <AuditTrail onBack={() => setShowAuditTrail(false)} />;
  }

  if (showVisualization) {
    return <Visualization onBack={() => setShowVisualization(false)} />;
  }

  // If regenerating, show the animation
  if (isRegenerating) {
    return (
      <div className="w-full h-full overflow-y-auto bg-[#FAFAFA]">
        <div className="max-w-[1100px] mx-auto py-10 px-8">
          <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-sm">
            {/* Progress Line */}
            <div className="h-0.5 bg-[#F5F5F5] overflow-hidden">
              <div className="h-full bg-[#00AEEF] animate-pulse" style={{ 
                width: `${((currentPhase + 1) / phases.length) * 100}%`,
                transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}></div>
            </div>

            <div className="p-10">
              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-[#F0F9FF] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#0284c7]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[17px] text-[#1A1A1A] mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    Regenerating SAR Narrative
                  </h4>
                  <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                    Analyzing data with your custom instructions
                  </p>
                </div>
              </div>

              {/* Processing Phases */}
              <div className="space-y-3 mb-8">
                {phases.map((phase, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 transition-all duration-300"
                    style={{
                      opacity: index <= currentPhase ? 1 : 0.3,
                    }}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                      index < currentPhase 
                        ? 'bg-[#10B981]' 
                        : index === currentPhase 
                        ? 'bg-[#00AEEF] animate-pulse' 
                        : 'bg-[#E8E8E8]'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[13px] transition-all duration-300 ${
                          index <= currentPhase ? 'text-[#1A1A1A]' : 'text-[#999999]'
                        }`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: index === currentPhase ? 500 : 400 }}>
                          {phase.label}
                        </span>
                        {index < currentPhase && (
                          <span className="text-[11px] text-[#10B981]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                            Complete
                          </span>
                        )}
                        {index === currentPhase && (
                          <span className="text-[11px] text-[#00AEEF]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                            Processing...
                          </span>
                        )}
                      </div>
                      {index === currentPhase && (
                        <div className="mt-1.5 h-0.5 bg-[#F0F9FF] rounded-full overflow-hidden">
                          <div className="h-full bg-[#00AEEF] rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Footer */}
              <div className="pt-6 border-t border-[#F5F5F5]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#00AEEF] rounded-full animate-pulse"></div>
                    <span className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                      System processing in progress
                    </span>
                  </div>
                  <span className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                    Phase {currentPhase + 1} of {phases.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full overflow-y-auto" style={{ background: '#F5F7FA' }}>
        <div className="max-w-[1200px] mx-auto py-6 px-6">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-end gap-3 mb-6">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 h-[36px] bg-white border border-[#D1D5DB] text-[#2C2C2C] hover:bg-[#F9FAFB] text-[13px] rounded-md transition-all flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  <Edit3 className="w-[14px] h-[14px]" />
                  Edit Report
                </button>
                <button
                  className="px-4 h-[36px] bg-[#2F6FED] hover:bg-[#1E5FDD] text-white text-[13px] rounded-md transition-all flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  <Download className="w-[14px] h-[14px]" />
                  Export PDF
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 h-[36px] bg-white border border-[#D1D5DB] hover:border-[#6B6B6B] text-[#6B6B6B] text-[13px] rounded-md transition-all flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                >
                  <X className="w-[14px] h-[14px]" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 h-[36px] bg-[#10B981] hover:bg-[#059669] text-white text-[13px] rounded-md transition-all flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  <Save className="w-[14px] h-[14px]" />
                  Save Changes
                </button>
              </>
            )}
          </div>

          {/* Approval Badge */}
          {isApproved && (
            <div className="bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border border-[#10B981]/30 rounded-xl p-4 flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-[14px] text-[#1A1A1A]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  SAR Report Approved
                </p>
                <p className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                  This report has been approved and is ready for submission
                </p>
              </div>
            </div>
          )}

          {/* Document Container */}
          <div 
            ref={editableRef}
            contentEditable={isEditing}
            suppressContentEditableWarning
            className={`bg-white rounded-lg shadow-sm ${
              isEditing ? 'border-2 border-[#00AEEF]' : ''
            }`}
            style={{ boxShadow: '0px 1px 3px rgba(0,0,0,0.05)' }}
            dangerouslySetInnerHTML={{ __html: narrative }}
            onFocus={(e) => {
              if (isEditing) {
                e.currentTarget.style.outline = 'none';
              }
            }}
          />

          {/* Action Buttons - All in one row */}
          {!isEditing && (
            <div className="flex flex-col items-center gap-3 mt-6">
              {/* First Row: Audit Trail & Visualization */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowAuditTrail(true)}
                  className="px-5 h-[40px] bg-[#2F6FED] hover:bg-[#1E5FDD] text-white text-[14px] rounded-lg transition-all flex items-center gap-2.5 shadow-sm"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  <TrendingUp className="w-[16px] h-[16px]" />
                  View Audit Trail
                </button>
                <button
                  onClick={() => setShowVisualization(true)}
                  className="px-5 h-[40px] bg-[#2F6FED] hover:bg-[#1E5FDD] text-white text-[14px] rounded-lg transition-all flex items-center gap-2.5 shadow-sm"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  <BarChart3 className="w-[16px] h-[16px]" />
                  Visualization
                </button>
              </div>

              {/* Second Row: Approve & Reprompt */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleApprove}
                  disabled={isApproved}
                  className={`px-5 h-[40px] ${
                    isApproved 
                      ? 'bg-[#D1FAE5] text-[#065F46] cursor-not-allowed' 
                      : 'bg-[#10B981] hover:bg-[#059669] text-white'
                  } text-[14px] rounded-lg transition-all flex items-center gap-2.5 shadow-sm`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  <CheckCircle className="w-[16px] h-[16px]" />
                  {isApproved ? 'Approved' : 'Approve SAR'}
                </button>
                <button
                  onClick={handleReprompt}
                  className="px-5 h-[40px] bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[14px] rounded-lg transition-all flex items-center gap-2.5 shadow-sm"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  <RotateCcw className="w-[16px] h-[16px]" />
                  Reprompt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reprompt Modal */}
      {showRepromptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRepromptModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-[600px] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-[#E8E8E8]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-[#DC2626]" />
                </div>
                <h3 className="text-[20px] text-[#003366]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  Regenerate SAR Narrative
                </h3>
              </div>
              <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Provide specific instructions to regenerate the SAR report with updated guidance
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Reprompt Instructions <span className="text-[#DC2626]">*</span>
              </label>
              <textarea
                value={repromptText}
                onChange={(e) => setRepromptText(e.target.value)}
                placeholder="E.g., Focus more on the regulatory compliance aspect, Add more details about the transaction timeline, Use more formal language..."
                className="w-full bg-white border border-[#E8E8E8] px-4 py-3 text-[14px] text-[#1A1A1A] rounded-lg transition-all focus:outline-none focus:border-[#00AEEF] resize-none placeholder:text-[#999999]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, minHeight: '160px' }}
                rows={6}
                autoFocus
              />

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                  <div className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full flex-shrink-0"></div>
                  <span>Specify regulatory frameworks or compliance standards</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                  <div className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full flex-shrink-0"></div>
                  <span>Request changes to narrative structure or emphasis</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                  <div className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full flex-shrink-0"></div>
                  <span>Add or modify specific details or sections</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#E8E8E8] flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRepromptModal(false);
                  setRepromptText('');
                }}
                className="px-6 h-[42px] border border-[#E8E8E8] rounded-lg text-[14px] text-[#6B6B6B] hover:bg-[#F5F5F5] transition-all"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={handleRepromptSubmit}
                className="px-6 h-[42px] bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg text-[14px] transition-all flex items-center gap-2 shadow-sm"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                <Sparkles className="w-4 h-4" />
                Regenerate SAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Banking UI Styling */}
      <style>{`
        .sar-report {
          font-family: 'Inter', sans-serif;
          padding: 24px;
        }
        
        .breadcrumb {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #6B7280;
          margin-bottom: 16px;
        }
        
        .main-title {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #1F3A5F;
          margin-bottom: 16px;
          letter-spacing: 0.2px;
        }
        
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
          padding: 10px 16px;
          border-bottom: 1px solid #E5E7EB;
          letter-spacing: 0.2px;
        }
        
        .section-content {
          padding: 16px;
        }
        
        .section-content p {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #2C2C2C;
          line-height: 1.6;
          margin-bottom: 12px;
          max-width: 700px;
          letter-spacing: 0.2px;
        }
        
        .section-content p:last-child {
          margin-bottom: 0;
        }
        
        .section-content strong {
          font-weight: 600;
          color: #1F3A5F;
        }
        
        .subsection-title {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1F3A5F;
          margin-top: 12px;
          margin-bottom: 6px;
          letter-spacing: 0.2px;
        }
        
        .divider {
          height: 1px;
          background: #E5E7EB;
          margin: 12px 0;
        }
        
        .signature-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 24px;
          max-width: 500px;
        }
        
        .signature-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .signature-line {
          width: 200px;
          height: 1px;
          background: #9CA3AF;
          margin-bottom: 8px;
        }
        
        .signature-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #6B7280;
          margin-bottom: 4px;
        }
        
        .signature-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #2C2C2C;
        }
        
        .signature-date {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #6B7280;
        }
        
        .footer-section {
          background: #F9FAFB;
          border-top: 1px solid #E5E7EB;
          padding: 12px 16px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 0 0 8px 8px;
        }
        
        .footer-section span {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #6B7280;
        }
      `}</style>
    </>
  );
}