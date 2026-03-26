import { GeneratedSARList } from './components/GeneratedSARList';
import { ClientData } from './components/ClientData';
import { AuditLogs } from './components/AuditLogs';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { TransactionDataInput } from './components/TransactionDataInput';
import { SARConfiguration } from './components/SARConfiguration';
import { NarrativeEditor } from './components/NarrativeEditor';
import { TransactionVisualization } from './components/TransactionVisualization';
import { ApprovalWorkflow } from './components/ApprovalWorkflow';
import { LandingPage } from './components/LandingPage';
import { SignInPage } from './components/SignInPage';
import { useState, useRef, useEffect } from 'react';
import { Home, Lightbulb, FolderOpen, Globe, BarChart3, Plus, Bell, Search as SearchIcon, ScrollText, LogOut, User, Settings, Menu, X } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<'landing' | 'signin' | 'dashboard'>('landing');
  const [userRole, setUserRole] = useState<'admin' | 'compliance-manager' | 'analyst'>('analyst');
  const [currentView, setCurrentView] = useState<'generate-sar' | 'clients' | 'audit-logs' | 'analytics'>('generate-sar');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sarGenerated, setSarGenerated] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'narrative' | 'visual' | 'workflow'>('narrative');
  const [showDataInput, setShowDataInput] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isNarrativeFullScreen, setIsNarrativeFullScreen] = useState(false);
  const [viewingSarFromAudit, setViewingSarFromAudit] = useState(false);
  const [selectedSarId, setSelectedSarId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Create User Form State (Admin only)
  const [selectedRole, setSelectedRole] = useState<'analyst' | 'compliance-manager'>('analyst');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  // For backend-controlled animation (optional)
  // Uncomment these if you want to control animation via backend
  // const progressCallbackRef = useRef<((phase: number) => void) | null>(null);
  // const completeCallbackRef = useRef<(() => void) | null>(null);

  const handleDataLoaded = () => {
    setDataLoaded(true);
  };

  const handleGenerateSAR = () => {
    setSarGenerated(true);
    setActiveResultTab('narrative');
  };

  // Backend control handler (optional)
  // Uncomment to enable backend-controlled animation
  // const handleGenerateStart = (
  //   progressCallback: (phase: number) => void,
  //   completeCallback: () => void
  // ) => {
  //   progressCallbackRef.current = progressCallback;
  //   completeCallbackRef.current = completeCallback;
  //   
  //   // Example: Call your backend API
  //   startBackendGeneration();
  // };
  // 
  // const startBackendGeneration = async () => {
  //   try {\n//     progressCallbackRef.current?.(0); // Phase 0: Data Parsing
  //     
  //     const response = await fetch('/api/generate-sar', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ /* your data */ })
  //     });
  //     
  //     // Update phases based on backend response
  //     // progressCallbackRef.current?.(1); // Phase 1
  //     // progressCallbackRef.current?.(2); // Phase 2
  //     // progressCallbackRef.current?.(3); // Phase 3
  //     
  //     completeCallbackRef.current?.(); // Complete
  //   } catch (error) {
  //     console.error('Generation failed:', error);
  //     completeCallbackRef.current?.(); // Still complete on error
  //   }
  // };

  const handleNavigate = (view: 'generate-sar' | 'clients' | 'audit-logs' | 'analytics') => {
    setCurrentView(view);
    if (view === 'generate-sar') {
      setShowDataInput(false);
      setSarGenerated(false);
      setIsNarrativeFullScreen(false);
    }
  };

  const handleGenerateSARClick = () => {
    setShowDataInput(true);
    setCurrentView('generate-sar');
    setSarGenerated(false);
    setIsNarrativeFullScreen(false);
  };

  const handleLogout = () => {
    setShowUserDropdown(false);
    setAppState('landing');
    setCurrentView('generate-sar');
    setShowDataInput(false);
    setSarGenerated(false);
    setDataLoaded(false);
  };

  const handleViewSarFromAudit = (sarId: string) => {
    setSelectedSarId(sarId);
    setViewingSarFromAudit(true);
    setCurrentView('generate-sar');
    setSarGenerated(true);
    setActiveResultTab('narrative');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  const AppSidebar = () => {
    // Role-based permissions
    const canGenerateSAR = userRole === 'admin' || userRole === 'analyst';
    const canViewClients = userRole === 'admin' || userRole === 'analyst' || userRole === 'compliance-manager';
    const canViewAuditLogs = userRole === 'admin' || userRole === 'compliance-manager';
    const canViewAnalytics = userRole === 'admin' || userRole === 'compliance-manager';
    const showHome = userRole === 'admin';

    return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative
        inset-y-0 left-0
        w-[220px] bg-white border-r border-[#E8E8E8] flex flex-col h-full flex-shrink-0
        z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#003366"/>
              <path d="M2 17L12 22L22 17" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[15px] text-[#1A1A1A]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              <span style={{ fontWeight: 600 }}>barclays</span>sar
            </span>
          </div>
          
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="px-3 pt-3 pb-2">
          <div className={`px-3 py-2 rounded-lg text-[12px] ${
            userRole === 'admin' ? 'bg-[#FEF3C7] text-[#92400E]' :
            userRole === 'compliance-manager' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
            'bg-[#D1FAE5] text-[#065F46]'
          }`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            {userRole === 'admin' ? '👑 Admin' : userRole === 'compliance-manager' ? '🛡️ Compliance Manager' : '👤 Analyst'}
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 py-4 px-3">
          {showHome && (
            <button 
              onClick={() => {
                handleNavigate('generate-sar');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2.5 mb-0.5 rounded-md text-[14px] transition-all ${
                currentView === 'generate-sar' && !showDataInput && !sarGenerated
                  ? 'text-[#1A1A1A] bg-[#F5F5F5]' 
                  : 'text-[#6B6B6B] hover:bg-[#FAFAFA]'
              }`}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              <Home className="w-[18px] h-[18px] mr-3" />
              Home
            </button>
          )}
          
          {canGenerateSAR && (
            <button 
              onClick={() => {
                handleGenerateSARClick();
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2.5 mb-0.5 rounded-md text-[14px] transition-all ${
                showDataInput || (sarGenerated && currentView === 'generate-sar')
                  ? 'text-[#1A1A1A] bg-[#F5F5F5]' 
                  : 'text-[#6B6B6B] hover:bg-[#FAFAFA]'
              }`}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              <Lightbulb className="w-[18px] h-[18px] mr-3" />
              Generate SAR
            </button>
          )}

          {canViewClients && (
            <button 
              onClick={() => {
                handleNavigate('clients');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2.5 mb-0.5 rounded-md text-[14px] transition-all ${
                currentView === 'clients' 
                  ? 'text-[#1A1A1A] bg-[#F5F5F5]' 
                  : 'text-[#6B6B6B] hover:bg-[#FAFAFA]'
              }`}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              <Globe className="w-[18px] h-[18px] mr-3" />
              <span className="hidden sm:inline">Client Data Audit</span>
              <span className="sm:hidden">Clients</span>
            </button>
          )}

          {canViewAuditLogs && (
            <button 
              onClick={() => {
                handleNavigate('audit-logs');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2.5 mb-0.5 rounded-md text-[14px] transition-all ${
                currentView === 'audit-logs' 
                  ? 'text-[#1A1A1A] bg-[#F5F5F5]' 
                  : 'text-[#6B6B6B] hover:bg-[#FAFAFA]'
              }`}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              <ScrollText className="w-[18px] h-[18px] mr-3" />
              Audit Logs
            </button>
          )}

          {canViewAnalytics && (
            <button 
              onClick={() => {
                handleNavigate('analytics');
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2.5 mb-0.5 rounded-md text-[14px] transition-all ${
                currentView === 'analytics' 
                  ? 'text-[#1A1A1A] bg-[#F5F5F5]' 
                  : 'text-[#6B6B6B] hover:bg-[#FAFAFA]'
              }`}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
            >
              <BarChart3 className="w-[18px] h-[18px] mr-3" />
              Analytics & ROI
            </button>
          )}
        </div>

        {/* Create Button - Only for Analyst and Admin */}
        {canGenerateSAR && (
          <div className="p-4">
            <button 
              onClick={() => {
                handleGenerateSARClick();
                setIsMobileSidebarOpen(false);
              }}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white h-[42px] rounded-lg flex items-center justify-center gap-2 transition-all text-[14px] shadow-sm"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              <Plus className="w-[18px] h-[18px]" />
              Create
            </button>
          </div>
        )}
      </div>
    </>
    );
  };

  const TopHeader = () => (
    <div className="h-[72px] border-b border-[#E8E8E8] bg-white flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="w-[22px] h-[22px] rounded bg-[#F5F5F5] flex items-center justify-center hidden sm:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <span className="text-[14px] sm:text-[16px] text-[#1A1A1A] truncate" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          {currentView === 'generate-sar' && !showDataInput && !sarGenerated && 'Home'}
          {showDataInput && !sarGenerated && 'Generate SAR'}
          {sarGenerated && 'SAR Narrative Editor'}
          {currentView === 'clients' && 'Client Data Audit'}
          {currentView === 'audit-logs' && 'Audit Logs'}
          {currentView === 'analytics' && 'Analytics & ROI'}
        </span>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors relative hidden sm:block">
          <Bell className="w-[20px] h-[20px]" />
        </button>
        
        {/* User Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="w-[36px] h-[36px] rounded-full bg-[#00AEEF] text-white flex items-center justify-center text-[14px] cursor-pointer hover:bg-[#0284c7] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            B
          </button>

          {/* Dropdown Menu */}
          {showUserDropdown && (
            <div className="absolute right-0 top-[48px] w-[240px] bg-white border border-[#E8E8E8] rounded-lg shadow-lg overflow-hidden z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-[#E8E8E8] bg-[#FAFAFA]">
                <div className="text-[14px] text-[#1A1A1A] mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  Barclays User
                </div>
                <div className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                  user@barclays.com
                </div>
                <div className={`mt-2 inline-block px-2 py-1 rounded text-[11px] ${
                  userRole === 'admin' ? 'bg-[#FEF3C7] text-[#92400E]' :
                  userRole === 'compliance-manager' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                  'bg-[#D1FAE5] text-[#065F46]'
                }`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  {userRole === 'admin' ? '👑 Admin' : userRole === 'compliance-manager' ? '🛡️ Compliance Manager' : '👤 Analyst'}
                </div>
              </div>

              {/* Logout */}
              <div className="py-1">
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-[13px] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                >
                  <LogOut className="w-[16px] h-[16px]" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboardHome = () => {
    // Handler for form field changes
    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Handler for creating user
    const handleCreateUser = () => {
      // Validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      // Success message (in production, this would call an API)
      alert(`User created successfully!\nRole: ${selectedRole}\nName: ${formData.fullName}\nEmail: ${formData.email}`);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        employeeId: '',
        department: '',
        password: '',
        confirmPassword: ''
      });
    };

    // If admin, show Create User form
    if (userRole === 'admin') {
      // Computed class names to avoid template literal issues
      const analystRadioClass = selectedRole === 'analyst' 
        ? 'w-4 h-4 border-2 border-[#00AEEF] bg-[#00AEEF] relative after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-white after:rounded-full'
        : 'w-4 h-4 border-2 border-[#E8E8E8] bg-white';
      
      const complianceRadioClass = selectedRole === 'compliance-manager'
        ? 'w-4 h-4 border-2 border-[#00AEEF] bg-[#00AEEF] relative after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-white after:rounded-full'
        : 'w-4 h-4 border-2 border-[#E8E8E8] bg-white';
      
      const analystLabelClass = selectedRole === 'analyst' ? 'text-[#1A1A1A]' : 'text-[#6B6B6B]';
      const complianceLabelClass = selectedRole === 'compliance-manager' ? 'text-[#1A1A1A]' : 'text-[#6B6B6B]';

      return (
        <div className="max-w-[1000px] mx-auto py-4 sm:py-8 px-4 sm:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-[22px] sm:text-[28px] text-[#003366] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Create New User
            </h1>
            <p className="text-[13px] sm:text-[15px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Add a new Analyst or Compliance Manager to the system
            </p>
          </div>

          {/* Create User Form Card */}
          <div className="bg-white rounded-xl border border-[#E8E8E8] p-4 sm:p-8">
            {/* Section 1: Role Selection */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-[14px] text-[#003366] mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Select Role <span className="text-[#DC2626]">*</span>
              </label>
              
              <div className="space-y-3">
                {/* Analyst Option */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('analyst')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E8E8E8] hover:border-[#00AEEF]/40 hover:bg-[#FAFAFA] transition-all"
                >
                  <div className={`${analystRadioClass} rounded-full flex-shrink-0 transition-all`}></div>
                  <div className="flex-1 text-left">
                    <div className={`text-[14px] ${analystLabelClass} transition-colors`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                      Analyst
                    </div>
                    <div className="text-[12px] text-[#999999] mt-0.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                      Can create and edit SAR reports, manage client data
                    </div>
                  </div>
                </button>

                {/* Compliance Manager Option */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('compliance-manager')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E8E8E8] hover:border-[#00AEEF]/40 hover:bg-[#FAFAFA] transition-all"
                >
                  <div className={`${complianceRadioClass} rounded-full flex-shrink-0 transition-all`}></div>
                  <div className="flex-1 text-left">
                    <div className={`text-[14px] ${complianceLabelClass} transition-colors`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                      Compliance Manager
                    </div>
                    <div className="text-[12px] text-[#999999] mt-0.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                      Review and compliance focus with audit log access
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E8E8E8] my-6 sm:my-8"></div>

            {/* Section 2: Basic Information */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-[16px] text-[#003366] mb-5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Full Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-lg text-[14px] focus:outline-none focus:border-[#00AEEF] transition-all"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Email Address <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@barclays.com"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-lg text-[14px] focus:outline-none focus:border-[#00AEEF] transition-all"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-lg text-[14px] focus:outline-none focus:border-[#00AEEF] transition-all"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                  />
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    placeholder="EMP-12345"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-lg text-[14px] focus:outline-none focus:border-[#00AEEF] transition-all"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                  />
                </div>

                {/* Department */}
                <div className="sm:col-span-2">
                  <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Department / Team
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="e.g., Compliance, Risk Management, AML"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-lg text-[14px] focus:outline-none focus:border-[#00AEEF] transition-all"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E8E8E8] my-6 sm:my-8"></div>

            {/* Section 3: Account Credentials */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-[16px] text-[#003366] mb-5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Account Credentials
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Password */}
                <div>
                  <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Password <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-lg text-[14px] focus:outline-none focus:border-[#00AEEF] transition-all"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[13px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Confirm Password <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-lg text-[14px] focus:outline-none focus:border-[#00AEEF] transition-all"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-[#E8E8E8]">
              <button
                onClick={() => {
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    employeeId: '',
                    department: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="px-6 h-[42px] border border-[#E8E8E8] rounded-lg text-[14px] text-[#6B6B6B] hover:bg-[#F5F5F5] transition-all order-2 sm:order-1"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Clear Form
              </button>
              <button
                onClick={handleCreateUser}
                className="px-8 h-[42px] bg-[#00AEEF] hover:bg-[#0284c7] text-white rounded-lg text-[14px] transition-all shadow-sm order-1 sm:order-2"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default home view for non-admin users
    return (
      <div className="max-w-[1100px] mx-auto py-12 px-8">
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <div className="text-center">
            <h1 className="text-[32px] text-[#1A1A1A] mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Welcome to Barclays SAR
            </h1>
            <p className="text-[16px] text-[#6B6B6B] mb-8" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              Your intelligent suspicious activity reporting assistant
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex ${appState === 'landing' || appState === 'signin' ? 'min-h-screen' : 'h-screen'} bg-[#FAFAFA] ${appState === 'dashboard' ? 'overflow-hidden' : ''} overflow-x-hidden`}>
      {appState === 'landing' ? (
        <LandingPage 
          onSignIn={() => setAppState('signin')} 
          onGetStarted={() => setAppState('signin')} 
        />
      ) : appState === 'signin' ? (
        <SignInPage 
          onSignIn={(role) => {
            setUserRole(role);
            setAppState('dashboard');
            // Set initial view based on role
            if (role === 'analyst') {
              setCurrentView('generate-sar');
              setShowDataInput(true);
              setSarGenerated(false);
            } else if (role === 'compliance-manager') {
              setCurrentView('analytics');
              setShowDataInput(false);
              setSarGenerated(false);
            } else {
              // Admin stays on home
              setCurrentView('generate-sar');
              setShowDataInput(false);
              setSarGenerated(false);
            }
          }} 
          onBack={() => setAppState('landing')} 
        />
      ) : (
        <>
          <AppSidebar />

          <div className="flex-1 flex flex-col overflow-hidden">
            <TopHeader />
            
            <div className="flex-1 overflow-auto bg-[#FAFAFA]">
              {currentView === 'clients' ? (
                <ClientData />
              ) : currentView === 'audit-logs' ? (
                <AuditLogs onViewSar={handleViewSarFromAudit} />
              ) : currentView === 'analytics' ? (
                <AnalyticsDashboard />
              ) : (
                <>
                  {sarGenerated ? (
                    <div className="h-full overflow-y-auto bg-white">
                      {activeResultTab === 'narrative' && <NarrativeEditor isFullScreen={isNarrativeFullScreen} onToggleFullScreen={() => setIsNarrativeFullScreen(!isNarrativeFullScreen)} />}
                      {activeResultTab === 'visual' && <TransactionVisualization />}
                      {activeResultTab === 'workflow' && <ApprovalWorkflow />}
                    </div>
                  ) : showDataInput ? (
                    <div className="h-full bg-white">
                      <TransactionDataInput onDataLoaded={handleDataLoaded} />
                      {dataLoaded && (
                        <div className="border-t border-[#E8E8E8] bg-white">
                          <SARConfiguration 
                            onGenerateSAR={handleGenerateSAR}
                            // To enable backend control, uncomment these:
                            // useBackendControl={true}
                            // onGenerateStart={handleGenerateStart}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    renderDashboardHome()
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}