import { AlertCircle, TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle, Activity, FileText, Shield, Users, Filter, ChevronDown, BarChart2, Target, Layers } from 'lucide-react';
import { useState } from 'react';

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30days');
  const [selectedAnalyst, setSelectedAnalyst] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock data - would come from backend in real app
  const kpiData = {
    pendingReviews: 24,
    overdueSARs: 7,
    highRiskPending: 12,
    approvalRate: 87.5,
    revisionsRequired: 12.3,
    validationFailures: 3,
    totalProcessed: 342,
    typologyDetections: 156,
    falsePositiveReduction: 34.2,
    totalAuditLogs: 2847,
    userActionsLogged: 1923,
    completeAuditTrail: 94.8,
  };

  const alerts = [
    { id: 1, severity: 'critical', message: '7 SARs overdue beyond SLA', count: 7 },
    { id: 2, severity: 'high', message: '12 high-risk cases pending review', count: 12 },
    { id: 3, severity: 'medium', message: '3 validation failures require attention', count: 3 },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-[22px] sm:text-[28px] text-[#003366] mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Analytics & ROI
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Compliance metrics, system performance, and audit tracking
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Time Range */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full sm:w-auto h-[38px] pl-4 pr-10 bg-white border border-[#E8E8E8] rounded-lg text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#00AEEF] transition-all appearance-none cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#6B6B6B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Analyst Filter */}
            <div className="relative flex-1 sm:flex-none hidden md:block">
              <select
                value={selectedAnalyst}
                onChange={(e) => setSelectedAnalyst(e.target.value)}
                className="w-full sm:w-auto h-[38px] pl-4 pr-10 bg-white border border-[#E8E8E8] rounded-lg text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#00AEEF] transition-all appearance-none cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                <option value="all">All Analysts</option>
                <option value="analyst1">Sarah Johnson</option>
                <option value="analyst2">Michael Chen</option>
                <option value="analyst3">David Park</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#6B6B6B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Region Filter */}
            <div className="relative flex-1 sm:flex-none hidden lg:block">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full sm:w-auto h-[38px] pl-4 pr-10 bg-white border border-[#E8E8E8] rounded-lg text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#00AEEF] transition-all appearance-none cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                <option value="all">All Regions</option>
                <option value="north">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia Pacific</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#6B6B6B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        {alerts.length > 0 && (
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-[#DC2626]" strokeWidth={2} />
              <h3 className="text-[15px] text-[#003366]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Critical Alerts
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                    alert.severity === 'critical'
                      ? 'bg-[#FEF2F2] border-[#FEE2E2]'
                      : alert.severity === 'high'
                      ? 'bg-[#FFFBEB] border-[#FEF3C7]'
                      : 'bg-[#F0F9FF] border-[#DBEAFE]'
                  }`}
                >
                  <span
                    className={`text-[12px] sm:text-[13px] ${
                      alert.severity === 'critical'
                        ? 'text-[#991B1B]'
                        : alert.severity === 'high'
                        ? 'text-[#92400E]'
                        : 'text-[#1E40AF]'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    {alert.message}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-[12px] ${
                      alert.severity === 'critical'
                        ? 'bg-[#DC2626] text-white'
                        : alert.severity === 'high'
                        ? 'bg-[#F59E0B] text-white'
                        : 'bg-[#3B82F6] text-white'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                  >
                    {alert.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 1: TOP PRIORITY KPIs */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-[13px] text-[#6B6B6B] mb-4 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Priority Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Pending SAR Reviews */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#6B6B6B]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Pending Reviews
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FEF3C7] rounded text-[11px] text-[#92400E]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +5
                </div>
              </div>
              <div className="text-[36px] text-[#1A1A1A] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.pendingReviews}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                SAR reports awaiting review
              </div>
            </div>

            {/* Overdue SARs */}
            <div className="bg-white border border-[#DC2626]/20 rounded-xl p-6 hover:border-[#DC2626]/40 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-[#DC2626]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Overdue SARs
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FEE2E2] rounded text-[11px] text-[#991B1B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +2
                </div>
              </div>
              <div className="text-[36px] text-[#DC2626] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.overdueSARs}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Beyond SLA deadline
              </div>
            </div>

            {/* High-Risk Cases Pending */}
            <div className="bg-white border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    High-Risk Pending
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FEF3C7] rounded text-[11px] text-[#92400E]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +3
                </div>
              </div>
              <div className="text-[36px] text-[#F59E0B] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.highRiskPending}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Cases requiring immediate attention
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: QUALITY & COMPLIANCE */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-[13px] text-[#6B6B6B] mb-4 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Quality & Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* SAR Approval Rate */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Approval Rate
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#D1FAE5] rounded text-[11px] text-[#065F46]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +2.3%
                </div>
              </div>
              <div className="text-[36px] text-[#10B981] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.approvalRate}%
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                First-time approval success
              </div>
            </div>

            {/* Revisions Required */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#6B6B6B]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Revisions Required
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#D1FAE5] rounded text-[11px] text-[#065F46]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingDown className="w-3 h-3" strokeWidth={2.5} />
                  -1.5%
                </div>
              </div>
              <div className="text-[36px] text-[#1A1A1A] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.revisionsRequired}%
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Reports needing modification
              </div>
            </div>

            {/* Validation Failures */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-[#DC2626]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Validation Failures
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#D1FAE5] rounded text-[11px] text-[#065F46]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingDown className="w-3 h-3" strokeWidth={2.5} />
                  -2
                </div>
              </div>
              <div className="text-[36px] text-[#DC2626] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.validationFailures}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Failed compliance checks
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: SYSTEM PERFORMANCE */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-[13px] text-[#6B6B6B] mb-4 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            System Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Total SARs Processed */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#00AEEF]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Total Processed
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#E0F2FE] rounded text-[11px] text-[#0369a1]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +18
                </div>
              </div>
              <div className="text-[36px] text-[#00AEEF] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.totalProcessed}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                SARs completed this period
              </div>
            </div>

            {/* Typology Detection Count */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#0284c7]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Typology Detections
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#E0F2FE] rounded text-[11px] text-[#0369a1]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +12
                </div>
              </div>
              <div className="text-[36px] text-[#0284c7] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.typologyDetections}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Patterns identified by AI
              </div>
            </div>

            {/* False Positive Reduction */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BarChart2 className="w-5 h-5 text-[#10B981]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    False Positive Reduction
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#D1FAE5] rounded text-[11px] text-[#065F46]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +5.4%
                </div>
              </div>
              <div className="text-[36px] text-[#10B981] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.falsePositiveReduction}%
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Accuracy improvement
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: AUDIT & TRACEABILITY */}
        <div>
          <h3 className="text-[13px] text-[#6B6B6B] mb-4 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Audit & Traceability
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Total Audit Logs Generated */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-[#0369a1]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Total Audit Logs
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#E0F2FE] rounded text-[11px] text-[#0369a1]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +142
                </div>
              </div>
              <div className="text-[36px] text-[#0369a1] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.totalAuditLogs.toLocaleString()}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Compliance records generated
              </div>
            </div>

            {/* User Actions Logged */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#0284c7]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    User Actions Logged
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#E0F2FE] rounded text-[11px] text-[#0369a1]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +89
                </div>
              </div>
              <div className="text-[36px] text-[#0284c7] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.userActionsLogged.toLocaleString()}
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Tracked user interactions
              </div>
            </div>

            {/* Complete Audit Trail */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#00AEEF]/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" strokeWidth={1.5} />
                  <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Complete Audit Trail
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#D1FAE5] rounded text-[11px] text-[#065F46]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                  +1.2%
                </div>
              </div>
              <div className="text-[36px] text-[#10B981] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {kpiData.completeAuditTrail}%
              </div>
              <div className="text-[12px] text-[#999999]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                Cases with full documentation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}