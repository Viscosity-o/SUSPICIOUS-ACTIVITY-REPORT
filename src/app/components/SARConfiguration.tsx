import { Sparkles, Zap, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SARConfigurationProps {
  onGenerateSAR?: () => void;
  // Backend control props
  useBackendControl?: boolean; // Set to true to control via backend
  onGenerateStart?: (progressCallback: (phase: number) => void, completeCallback: () => void) => void;
}

export function SARConfiguration({ onGenerateSAR, useBackendControl = false, onGenerateStart }: SARConfigurationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');

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

  const phases = [
    { label: 'Data Parsing', duration: 1200 },
    { label: 'Transaction Pattern Analysis', duration: 1400 },
    { label: 'Risk Indicator Detection', duration: 1300 },
    { label: 'Narrative Construction', duration: 1500 },
  ];

  // Backend-controlled progress handler
  const handleBackendProgress = (phase: number) => {
    setCurrentPhase(phase);
  };

  // Backend-controlled completion handler
  const handleBackendComplete = () => {
    setTimeout(() => {
      setIsGenerating(false);
      onGenerateSAR?.();
    }, 600);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setCurrentPhase(0);
    
    if (useBackendControl && onGenerateStart) {
      // Backend-controlled mode: pass callbacks to parent
      onGenerateStart(handleBackendProgress, handleBackendComplete);
    } else {
      // Auto mode: simulate with timers (for demo/testing)
      let phaseIndex = 0;
      const cyclePhases = () => {
        if (phaseIndex < phases.length) {
          setCurrentPhase(phaseIndex);
          phaseIndex++;
          setTimeout(cyclePhases, phases[phaseIndex - 1].duration);
        } else {
          setTimeout(() => {
            setIsGenerating(false);
            onGenerateSAR?.();
          }, 600);
        }
      };
      
      cyclePhases();
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto py-10 px-8">
      <div className="space-y-6">
        {/* Advanced Prompting */}
        <div className="bg-white border border-[#E8E8E8] rounded-xl p-8">
          <h3 className="text-[16px] text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
            <div className="w-8 h-8 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#0284c7]" />
            </div>
            Advanced Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                Custom Instructions (Optional)
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Add custom instructions to guide the AI's narrative generation..."
                className="w-full bg-white border border-[#E8E8E8] px-4 py-3 text-[14px] text-[#1A1A1A] rounded-lg transition-all focus:outline-none focus:border-[#00AEEF] resize-none placeholder:text-[#999999]"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300, minHeight: '120px' }}
                rows={4}
              />
            </div>
            
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                <div className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full flex-shrink-0"></div>
                <span>Use specific regulatory frameworks or compliance standards</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                <div className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full flex-shrink-0"></div>
                <span>Emphasize certain typologies or risk factors</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                <div className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full flex-shrink-0"></div>
                <span>Request specific formatting or section structures</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Enterprise Generation Display */}
        {isGenerating && (
          <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-sm">
            {/* Secure Intake Progress Line */}
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
                  <h4 className="text-[17px] text-[#1A1A1A] mb-1" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    Intelligence Processing
                  </h4>
                  <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                    Analyzing transaction data and generating compliance report
                  </p>
                </div>
              </div>

              {/* Analytical Processing Phases */}
              <div className="space-y-3 mb-8">
                {phases.map((phase, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 transition-all duration-300"
                    style={{
                      opacity: index <= currentPhase ? 1 : 0.3,
                      transform: index === currentPhase ? 'translateY(0)' : 'translateY(0)',
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
                        }`} style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: index === currentPhase ? 500 : 400 }}>
                          {phase.label}
                        </span>
                        {index < currentPhase && (
                          <span className="text-[11px] text-[#10B981]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                            Complete
                          </span>
                        )}
                        {index === currentPhase && (
                          <span className="text-[11px] text-[#00AEEF]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                            Processing...
                          </span>
                        )}
                      </div>
                      {/* Subtle progress indicator for current phase */}
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
                    <span className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                      System processing in progress
                    </span>
                  </div>
                  <span className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                    Phase {currentPhase + 1} of {phases.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        {!isGenerating && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleGenerate}
              className="px-10 h-12 bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[14px] rounded-lg transition-all flex items-center gap-3 shadow-md hover:shadow-lg"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
            >
              <Sparkles className="w-5 h-5" />
              Generate SAR Narrative
            </button>
          </div>
        )}
      </div>
    </div>
  );
}