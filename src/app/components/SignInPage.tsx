import { Lock, Mail, ArrowLeft, Shield, User, UserCog, CheckCircle, Building2, Award } from 'lucide-react';
import { useState } from 'react';
import barclaysBuilding from '../../assets/56da11c3ecff1de54039e988f6a32fee7aacaafc.png';

interface SignInPageProps {
  onSignIn: (role: 'admin' | 'compliance-manager' | 'analyst') => void;
  onBack: () => void;
}


export function SignInPage({ onSignIn, onBack }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'compliance-manager' | 'analyst'>('analyst');
  const [rememberMe, setRememberMe] = useState(false);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(selectedRole);
  };

  const roles = [
    {
      id: 'analyst' as const,
      name: 'Analyst',
      icon: <User className="w-4 h-4" />,
      description: 'Generate and review SARs',
      permissions: ['SAR Generation', 'Client Management', 'View History']
    },
    {
      id: 'compliance-manager' as const,
      name: 'Compliance Manager',
      icon: <Shield className="w-4 h-4" />,
      description: 'Review and audit compliance',
      permissions: ['Audit Trail Access', 'Review SARs', 'Approval Workflow']
    },
    {
      id: 'admin' as const,
      name: 'Admin',
      icon: <UserCog className="w-4 h-4" />,
      description: 'Full system access',
      permissions: ['All Features', 'User Management', 'System Configuration']
    }
  ];

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - Full Coverage */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={barclaysBuilding}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-[14px] text-white hover:text-[#00AEEF] transition-colors z-20"
        style={{ fontFamily: "Inter", fontWeight: 400 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Content Container - Centered Layout */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 flex items-center justify-center gap-24">
        {/* Left Side - Welcome Text & Trust Indicators */}
        <div className="flex-1 max-w-[520px]">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-[#00AEEF]/20 backdrop-blur-sm rounded-full mb-6 border border-[#00AEEF]/30">
              <p className="text-[12px] text-[#00AEEF] tracking-wide" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                ENTERPRISE COMPLIANCE PLATFORM
              </p>
            </div>
            <h1 className="text-[64px] text-white mb-6 leading-none" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
              Welcome Back
            </h1>
            <p className="text-[17px] text-white/90 leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
              Secure access to enterprise-grade SAR generation and compliance management platform trusted by global financial institutions.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00AEEF]/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#00AEEF]/30">
                <Shield className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <div>
                <p className="text-[14px] text-white" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Bank-Grade Security
                </p>
                <p className="text-[12px] text-white/70" style={{ fontFamily: "Inter", fontWeight: 400 }}>
                  256-bit encryption & multi-factor authentication
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00AEEF]/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#00AEEF]/30">
                <CheckCircle className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <div>
                <p className="text-[14px] text-white" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Regulatory Compliance
                </p>
                <p className="text-[12px] text-white/70" style={{ fontFamily: "Inter", fontWeight: 400 }}>
                  SOC 2 Type II, ISO 27001 certified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00AEEF]/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#00AEEF]/30">
                <Award className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <div>
                <p className="text-[14px] text-white" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Trusted by Fortune 500
                </p>
                <p className="text-[12px] text-white/70" style={{ fontFamily: "Inter", fontWeight: 400 }}>
                  Processing 50,000+ SARs annually
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-[480px] bg-white/10 backdrop-blur-xl rounded-2xl p-10 shadow-2xl border border-white/20">
          {/* Sign In Header */}
          <div className="mb-8">
            <h2 className="text-[28px] text-white mb-2" style={{ fontFamily: "Inter", fontWeight: 600 }}>
              Sign In
            </h2>
            <p className="text-[14px] text-white/70" style={{ fontFamily: "Inter", fontWeight: 400 }}>
              Access your secure compliance dashboard
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-[13px] text-white/90 mb-3" style={{ fontFamily: "Inter", fontWeight: 500 }}>
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-[#00AEEF] bg-[#00AEEF]/20 backdrop-blur-sm'
                      : 'border-white/30 bg-white/10 backdrop-blur-sm hover:border-[#00AEEF]/50'
                  }`}
                >
                  <div className={`mb-1.5 ${selectedRole === role.id ? 'text-[#00AEEF]' : 'text-white/70'}`}>
                    {role.icon}
                  </div>
                  <div className={`text-[10px] ${selectedRole === role.id ? 'text-white' : 'text-white/80'}`} style={{ fontFamily: "Inter", fontWeight: 600 }}>
                    {role.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-[13px] text-white/90 mb-2" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@barclays.com"
                  className="w-full h-[50px] pl-11 pr-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-[#00AEEF] focus:bg-white/30 transition-all"
                  style={{ fontFamily: "Inter", fontWeight: 400 }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[13px] text-white/90 mb-2" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[50px] pl-11 pr-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-[#00AEEF] focus:bg-white/30 transition-all"
                  style={{ fontFamily: "Inter", fontWeight: 400 }}
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/20 text-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20"
                />
                <label htmlFor="rememberMe" className="ml-2 text-[13px] text-white/90 cursor-pointer" style={{ fontFamily: "Inter", fontWeight: 400 }}>
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="text-[13px] text-[#00AEEF] hover:text-[#0284c7] transition-colors"
                style={{ fontFamily: "Inter", fontWeight: 500 }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full h-[52px] bg-[#00AEEF] hover:bg-[#0284c7] text-white text-[15px] rounded-lg transition-all shadow-lg mt-2"
              style={{ fontFamily: "Inter", fontWeight: 600 }}
            >
              Sign In Securely
            </button>

            {/* Security Notice */}
            <div className="flex items-start gap-2 pt-2">
              <Shield className="w-4 h-4 text-[#00AEEF] mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-white/70 leading-relaxed" style={{ fontFamily: "Inter", fontWeight: 400 }}>
                Your connection is secured with 256-bit SSL encryption. By signing in, you agree to our{' '}
                <a href="#" className="text-[#00AEEF] hover:underline">Terms of Service</a>
                {' and '}
                <a href="#" className="text-[#00AEEF] hover:underline">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}