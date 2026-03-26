import { Shield, Brain, FileText, CheckCircle, Database, Lock, ArrowRight, Menu, X, TrendingUp, Users, Zap, Award, Search } from 'lucide-react';
import { useState } from 'react';
import barclaysBuilding from  '../../assets/a99940d037be85e8b7a7c4d577116225b365d6e0.png';
import barclaysLogo from '../../assets/8aaed975500a30811cee81ad6dd27c38362b1e50.png';

interface LandingPageProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

export function LandingPage({ onSignIn, onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#292b3d] overflow-x-hidden">
      {/* Hero Section with Extended Background - Barclays Style */}
      <section className="bg-[#161b2f] relative overflow-hidden">
        <div className="relative h-[500px] sm:h-[600px] lg:h-[672px] w-full">
          {/* Background Image - Extended to top */}
          <div className="absolute inset-0">
            <img 
              src={barclaysBuilding} 
              alt="Barclays"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 sm:from-black/70 sm:via-black/50 sm:to-transparent"></div>
          </div>

          {/* Navbar Overlay - Transparent */}
          <nav className="relative z-40">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
              {/* Top Row - Logo and Buttons */}
              <div className="h-[60px] sm:h-[72px] flex items-center justify-between">
                {/* Barclays Logo */}
                <div className="flex items-center">
                  <img 
                    src={barclaysLogo} 
                    alt="Barclays"
                    className="h-[36px] sm:h-[48px] lg:h-[56px] w-auto"
                  />
                </div>

                {/* Right Side - Buttons */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    className="px-4 sm:px-6 h-[36px] sm:h-[38px] bg-[#00D4FF] hover:bg-[#00B8E6] text-[#1a1a1a] text-[13px] sm:text-[14px] rounded-full transition-all"
                    style={{ fontFamily: "'Arial', sans-serif", fontWeight: 600 }}
                  >
                    Contact Us
                  </button>
                  <button className="w-[36px] sm:w-[38px] h-[36px] sm:h-[38px] flex items-center justify-center text-[#00D4FF] hover:text-white transition-colors">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Content Overlay */}
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-full flex items-center">
            <div className="max-w-[700px]">
              <div className="text-[11px] sm:text-[13px] text-[#00D4FF] mb-4 sm:mb-6 tracking-widest" style={{ fontFamily: "'Arial', sans-serif", fontWeight: 600, letterSpacing: '2px' }}>
                BARCLAYS COMPLIANCE
              </div>
              
              <h1 className="text-[32px] sm:text-[48px] lg:text-[64px] text-white mb-6 sm:mb-8 leading-tight" style={{ fontFamily: "'Georgia', serif", fontWeight: 400 }}>
                Intelligent Compliance.<br />Superior Results.
              </h1>
              
              <p className="text-[14px] sm:text-[16px] lg:text-[17px] text-white/90 mb-8 sm:mb-12 leading-relaxed" style={{ fontFamily: "'Arial', sans-serif", fontWeight: 400 }}>
                Every day, we harness the power of AI to transform suspicious activity reporting. Our sole focus is delivering excellence by combining advanced machine learning, regulatory expertise, and complete transparency to help compliance teams detect financial crime and drive superior outcomes.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 sm:px-10 h-[48px] sm:h-[52px] bg-[#00D4FF] hover:bg-[#00B8E6] text-[#1a1a1a] text-[14px] sm:text-[15px] rounded-full transition-all shadow-lg"
                  style={{ fontFamily: "'Arial', sans-serif", fontWeight: 600 }}
                >
                  Get Started
                </button>
                <button
                  onClick={onSignIn}
                  className="px-8 sm:px-10 h-[48px] sm:h-[52px] bg-transparent hover:bg-white/10 text-white text-[14px] sm:text-[15px] rounded-full transition-all border-2 border-white"
                  style={{ fontFamily: "'Arial', sans-serif", fontWeight: 600 }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section - Barclays Dark Card Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#292b3d]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] text-white mb-3 sm:mb-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
              Core Features
            </h2>
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-[#94a3b8] max-w-[700px] mx-auto px-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
              Enterprise-grade capabilities designed for compliance teams at global financial institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: 'ML-Based SAR Worthiness & Typology Classification',
                description: 'Advanced machine learning algorithms classify suspicious activity and identify money laundering patterns with precision',
                image: 'https://images.unsplash.com/photo-1717501219687-ddce079f704b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG1hY2hpbmUlMjBsZWFybmluZyUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MXx8fHwxNzczODkyMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                title: 'Agentic Workflow & Orchestration',
                description: 'Intelligent multi-step processing with automated validation, enrichment, and orchestration at each stage',
                image: 'https://images.unsplash.com/photo-1759752393975-7ca7b302fcc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZmxvdyUyMGF1dG9tYXRpb24lMjBwcm9jZXNzfGVufDF8fHx8MTc3MzkxNTE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                title: 'Structured SAR Narrative Generation',
                description: 'Regulator-ready reports following FinCEN guidelines with complete audit trail and version control',
                image: 'https://images.unsplash.com/photo-1762846700374-f4aeb2f38e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHJlcG9ydCUyMHdyaXRpbmd8ZW58MXx8fHwxNzczOTE2MjcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                title: 'Explainability & Reasoning Trace',
                description: 'Complete transparency with line-by-line explanations, confidence indicators, and source traceability',
                image: 'https://images.unsplash.com/photo-1740908900846-4bbd4f22c975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdHJhbnNwYXJlbmN5JTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MzkxNjI3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                title: 'Compliance Validation Engine',
                description: 'Automated checks against BSA, FinCEN, and FATF regulatory requirements with real-time validation',
                image: 'https://images.unsplash.com/photo-1704969724221-8b7361b61f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wbGlhbmNlJTIwdmFsaWRhdGlvbiUyMGNoZWNrbGlzdHxlbnwxfHx8fDE3NzM5MTYyNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                title: 'Full Audit Logging',
                description: 'Complete traceability of all actions, decisions, and modifications for regulatory review and compliance',
                image: 'https://images.unsplash.com/photo-1675627453084-505806a00406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGRhdGFiYXNlJTIwbG9nZ2luZ3xlbnwxfHx8fDE3NzM5MTYyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#334155] rounded-xl overflow-hidden border border-[#475569] hover:border-[#64748b] transition-all group cursor-pointer">
                <div className="h-[220px] overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#334155] via-transparent to-transparent"></div>
                </div>
                <div className="p-7">
                  <h3 className="text-[18px] text-white mb-3 leading-snug" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-[#cbd5e1] leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture Section - After Core Features */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#292b3d]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] text-white mb-3 sm:mb-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
              System Architecture
            </h2>
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-[#B0B0B0] max-w-[800px] mx-auto px-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
              Clean diagram-style layout showing data flow through enterprise infrastructure
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-10 mb-8 sm:mb-12 overflow-x-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-4 min-w-max">
              {['Input', 'Processing', 'LLM', 'Validation', 'Output'].map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-gradient-to-br from-[#00AEEF] to-[#0284c7] text-white rounded-xl px-6 sm:px-10 py-4 sm:py-7 text-center min-w-[120px] sm:min-w-[160px] shadow-lg">
                    <div className="text-[14px] sm:text-[16px]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                      {step}
                    </div>
                  </div>
                  {idx < 4 && <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#00AEEF] flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Technology Labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'AWS Lambda', desc: 'Serverless processing' },
              { label: 'S3', desc: 'Secure data storage' },
              { label: 'Bedrock', desc: 'LLM integration' },
              { label: 'RDS', desc: 'PostgreSQL database' }
            ].map((tech, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
                <div className="text-[17px] text-white mb-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                  {tech.label}
                </div>
                <div className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explainability Section - Full Width Image */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#FFE5E5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] text-[#5A1C5A] mb-3 sm:mb-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
              Complete Transparency & Explainability
            </h2>
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-[#5A1C5A] max-w-[800px] mx-auto px-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
              Every AI decision is traceable, auditable, and explainable. See exactly how conclusions were reached with line-by-line reasoning and confidence scores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
              {[
                { icon: <TrendingUp className="w-6 h-6" />, title: 'Confidence Indicators', desc: 'Real-time confidence scores for every generated section' },
                { icon: <CheckCircle className="w-6 h-6" />, title: 'Line-by-Line Reasoning', desc: 'Trace every sentence back to source transactions and rules' },
                { icon: <Award className="w-6 h-6" />, title: 'Regulatory Compliance', desc: 'Built-in validation against BSA, FinCEN, and FATF standards' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-[#5A1C5A] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[16px] text-[#00193F] mb-1" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1568585105565-e372998a195d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGJhbmtpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzczOTE0ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Professional office"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Image Cards */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#292b3d]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] text-white mb-3 sm:mb-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
              Transform Your Compliance Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Time Efficiency',
                stat: '80%',
                metric: 'Faster',
                description: 'Reduce SAR generation time from hours to minutes with AI-powered automation and intelligent workflows',
                image: 'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MzkxNTk0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                title: 'Cost Optimization',
                stat: '65%',
                metric: 'Savings',
                description: 'Lower operational costs while maintaining the highest regulatory compliance standards and quality',
                image: 'https://images.unsplash.com/photo-1764690690771-b4522d66b433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwY29sbGFib3JhdGlvbiUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3MzkxNTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                title: 'Scalable Compliance',
                stat: '10x',
                metric: 'Volume',
                description: 'Handle increasing alert volumes without proportional resource increases through intelligent automation',
                image: 'https://images.unsplash.com/photo-1651131026046-24826a7cf36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwb2ZmaWNlJTIwcHJvZmVzc2lvbmFsJTIwYmFua2luZ3xlbnwxfHx8fDE3NzM5MTU5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-[#334155] border border-[#475569] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="h-[180px] overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-[48px] text-[#00AEEF]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                      {benefit.stat}
                    </span>
                    <span className="text-[20px] text-[#cbd5e1]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                      {benefit.metric}
                    </span>
                  </div>
                  <h3 className="text-[22px] text-white mb-3" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                    {benefit.title}
                  </h3>
                  <p className="text-[14px] text-[#cbd5e1] leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#292b3d]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="rounded-xl overflow-hidden shadow-2xl order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1768839720841-8219c4da7436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZWN1cml0eSUyMGVuY3J5cHRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzkxNTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Financial security technology"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] text-white mb-4 sm:mb-6" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                Enterprise Security & Compliance
              </h2>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#B0B0B0] mb-6 sm:mb-8 lg:mb-10 leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                Built with bank-grade security controls and compliance frameworks trusted by global financial institutions.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: <Lock className="w-5 h-5" />, title: 'Data Encryption (KMS)', desc: 'End-to-end encryption at rest and in transit' },
                  { icon: <Shield className="w-5 h-5" />, title: 'Role-Based Access Control', desc: 'Granular IAM policies and permission management' },
                  { icon: <CheckCircle className="w-5 h-5" />, title: 'Audit Logging', desc: 'Complete activity logs for regulatory review' },
                  { icon: <Database className="w-5 h-5" />, title: 'CloudWatch Monitoring', desc: 'Real-time system health and alerting' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-[#334155] rounded-lg p-5 border border-[#475569]">
                    <div className="w-10 h-10 bg-[#00AEEF] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[15px] text-white mb-1" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-[#cbd5e1]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#292b3d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#00AEEF] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00AEEF] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] text-white mb-4 sm:mb-6" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
            Build Regulator-Ready SARs with Confidence
          </h2>
          <p className="text-[15px] sm:text-[16px] lg:text-[18px] text-[#B0B0B0] mb-8 sm:mb-10 max-w-[700px] mx-auto px-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
            Join leading financial institutions using AI to transform their compliance operations
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onGetStarted}
              className="px-10 sm:px-12 h-[52px] sm:h-[56px] bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[15px] sm:text-[16px] rounded-full transition-all shadow-xl"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
            >
              Get Started
            </button>
            <button
              onClick={onSignIn}
              className="px-10 sm:px-12 h-[52px] sm:h-[56px] bg-white hover:bg-gray-100 text-[#292b3d] text-[15px] sm:text-[16px] rounded-full transition-all shadow-xl"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Professional */}
      <footer className="bg-[#292b3d] border-t border-white/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00AEEF"/>
                  <path d="M2 17L12 22L22 17" stroke="#00AEEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#00AEEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[16px] text-white" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                  SAR Generator
                </span>
              </div>
              <p className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                AI-powered compliance intelligence for global financial institutions
              </p>
            </div>
            <div>
              <h3 className="text-[14px] text-white mb-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                Product
              </h3>
              <div className="space-y-2">
                <div className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                  Features
                </div>
                <div className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                  Architecture
                </div>
                <div className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                  Security
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[14px] text-white mb-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                Company
              </h3>
              <div className="space-y-2">
                <div className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                  Team Baymax
                </div>
                <div className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                  Hackathon 2026
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[14px] text-white mb-4" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 600 }}>
                Contact
              </h3>
              <div className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                info@sargenerator.com
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[13px] text-[#B0B0B0]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
              © 2026 SAR Generator by Team Baymax. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[13px] text-[#B0B0B0] hover:text-white transition-colors" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                Privacy Policy
              </a>
              <a href="#" className="text-[13px] text-[#B0B0B0] hover:text-white transition-colors" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}