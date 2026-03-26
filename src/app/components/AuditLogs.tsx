import { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import React from 'react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  target: string;
  status: 'Success' | 'Failed' | 'Approved' | 'Edited';
  // Expandable details
  eventId?: string;
  ipAddress?: string;
  description?: string;
  linkedSarId?: string;
  // SAR Details
  sarVersion?: string;
  editHistory?: {
    version: string;
    editedBy: string;
    editedAt: string;
    changes: string;
  }[];
  isEdited?: boolean;
}

interface AuditLogsProps {
  onViewSar: (sarId: string) => void;
}

export function AuditLogs({ onViewSar }: AuditLogsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedAction, setSelectedAction] = useState('All Actions');
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Mock data - Replace with backend API call
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2026-03-18 10:21:34',
      user: 'analyst_01',
      role: 'Investigator',
      action: 'Generated SAR',
      module: 'Generate SAR',
      target: 'SAR-1023',
      status: 'Success',
      eventId: 'EVT-2026-03-18-001',
      ipAddress: '192.168.1.45',
      description: 'Successfully generated SAR report for suspicious transaction activity',
      linkedSarId: 'SAR-1023',
      sarVersion: 'v1.0',
      isEdited: false,
      editHistory: []
    },
    {
      id: '2',
      timestamp: '2026-03-18 09:45:12',
      user: 'reviewer_02',
      role: 'Compliance Officer',
      action: 'Approved SAR',
      module: 'Approval Workflow',
      target: 'SAR-1022',
      status: 'Approved',
      eventId: 'EVT-2026-03-18-002',
      ipAddress: '192.168.1.78',
      description: 'Approved SAR report after compliance review',
      linkedSarId: 'SAR-1022',
      sarVersion: 'v2.1',
      isEdited: true,
      editHistory: [
        {
          version: 'v1.0',
          editedBy: 'analyst_01',
          editedAt: '2026-03-18 08:15:22',
          changes: 'Initial generation'
        },
        {
          version: 'v2.0',
          editedBy: 'analyst_01',
          editedAt: '2026-03-18 08:52:18',
          changes: 'Updated subject information and transaction amounts'
        },
        {
          version: 'v2.1',
          editedBy: 'reviewer_02',
          editedAt: '2026-03-18 09:30:45',
          changes: 'Refined narrative description for clarity'
        }
      ]
    },
    {
      id: '3',
      timestamp: '2026-03-18 08:32:56',
      user: 'analyst_03',
      role: 'Investigator',
      action: 'Edited Narrative',
      module: 'Narrative Editor',
      target: 'SAR-1021',
      status: 'Edited',
      eventId: 'EVT-2026-03-18-003',
      ipAddress: '192.168.1.92',
      description: 'Modified narrative section III - Description of Suspicious Activity',
      linkedSarId: 'SAR-1021',
      sarVersion: 'v1.3',
      isEdited: true,
      editHistory: [
        {
          version: 'v1.0',
          editedBy: 'analyst_03',
          editedAt: '2026-03-18 07:20:15',
          changes: 'Initial generation'
        },
        {
          version: 'v1.1',
          editedBy: 'analyst_03',
          editedAt: '2026-03-18 07:45:32',
          changes: 'Added additional transaction patterns'
        },
        {
          version: 'v1.2',
          editedBy: 'analyst_03',
          editedAt: '2026-03-18 08:10:28',
          changes: 'Corrected subject entity details'
        },
        {
          version: 'v1.3',
          editedBy: 'analyst_03',
          editedAt: '2026-03-18 08:32:56',
          changes: 'Modified narrative section III - Description of Suspicious Activity'
        }
      ]
    },
    {
      id: '4',
      timestamp: '2026-03-18 07:15:23',
      user: 'analyst_01',
      role: 'Investigator',
      action: 'Upload Transaction Data',
      module: 'Data Input',
      target: 'FILE-2026-0318-001.csv',
      status: 'Success',
      eventId: 'EVT-2026-03-18-004',
      ipAddress: '192.168.1.45',
      description: 'Uploaded transaction data file containing 247 records',
      linkedSarId: null
    },
    {
      id: '5',
      timestamp: '2026-03-18 06:42:17',
      user: 'system',
      role: 'System',
      action: 'Failed Generation',
      module: 'Generate SAR',
      target: 'SAR-DRAFT-1020',
      status: 'Failed',
      eventId: 'EVT-2026-03-18-005',
      ipAddress: '10.0.0.1',
      description: 'SAR generation failed due to insufficient transaction data',
      linkedSarId: null
    },
    {
      id: '6',
      timestamp: '2026-03-17 16:28:41',
      user: 'reviewer_04',
      role: 'Senior Compliance Officer',
      action: 'Approved SAR',
      module: 'Approval Workflow',
      target: 'SAR-1019',
      status: 'Approved',
      eventId: 'EVT-2026-03-17-006',
      ipAddress: '192.168.1.105',
      description: 'Final approval granted after senior review',
      linkedSarId: 'SAR-1019',
      sarVersion: 'v1.0',
      isEdited: false,
      editHistory: []
    },
    {
      id: '7',
      timestamp: '2026-03-17 14:52:09',
      user: 'analyst_02',
      role: 'Investigator',
      action: 'Generated SAR',
      module: 'Generate SAR',
      target: 'SAR-1018',
      status: 'Success',
      eventId: 'EVT-2026-03-17-007',
      ipAddress: '192.168.1.63',
      description: 'Generated SAR for structuring pattern detection',
      linkedSarId: 'SAR-1018',
      sarVersion: 'v1.0',
      isEdited: false,
      editHistory: []
    },
    {
      id: '8',
      timestamp: '2026-03-17 12:33:25',
      user: 'analyst_01',
      role: 'Investigator',
      action: 'Edited Narrative',
      module: 'Narrative Editor',
      target: 'SAR-1017',
      status: 'Edited',
      eventId: 'EVT-2026-03-17-008',
      ipAddress: '192.168.1.45',
      description: 'Updated customer background information',
      linkedSarId: 'SAR-1017',
      sarVersion: 'v3.0',
      isEdited: true,
      editHistory: [
        {
          version: 'v1.0',
          editedBy: 'analyst_01',
          editedAt: '2026-03-17 10:15:30',
          changes: 'Initial generation'
        },
        {
          version: 'v2.0',
          editedBy: 'analyst_01',
          editedAt: '2026-03-17 11:22:45',
          changes: 'Added suspicious activity indicators'
        },
        {
          version: 'v3.0',
          editedBy: 'analyst_01',
          editedAt: '2026-03-17 12:33:25',
          changes: 'Updated customer background information'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-[#ECFDF5] text-[#10B981] border-[#D1FAE5]';
      case 'Failed':
        return 'bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2]';
      case 'Approved':
        return 'bg-[#EFF6FF] text-[#0284c7] border-[#DBEAFE]';
      case 'Edited':
        return 'bg-[#FEF3C7] text-[#F59E0B] border-[#FDE68A]';
      default:
        return 'bg-[#F5F5F5] text-[#6B6B6B] border-[#E8E8E8]';
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="h-full bg-[#FAFAFA] overflow-y-auto">
      <div className="max-w-[1600px] mx-auto py-6 sm:py-10 px-4 sm:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[22px] sm:text-[28px] text-[#1A1A1A] mb-2" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
            Audit Logs
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
            Monitor system activity and user actions for compliance tracking.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Search Field */}
            <div className="sm:col-span-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs by user, SAR ID, action, or module…"
                  className="w-full h-10 pl-10 pr-4 bg-[#F8F8F8] border border-transparent rounded-lg text-[13px] placeholder:text-[#999999] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all"
                  style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
                />
              </div>
            </div>

            {/* User Filter */}
            <div>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full h-10 px-3 bg-[#F8F8F8] border border-transparent rounded-lg text-[13px] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all cursor-pointer appearance-none"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400, backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6B6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                <option>All Users</option>
                <option>analyst_01</option>
                <option>analyst_02</option>
                <option>analyst_03</option>
                <option>reviewer_02</option>
                <option>reviewer_04</option>
                <option>system</option>
              </select>
            </div>

            {/* Action Type Filter */}
            <div>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full h-10 px-3 bg-[#F8F8F8] border border-transparent rounded-lg text-[13px] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all cursor-pointer appearance-none"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400, backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6B6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                <option>All Actions</option>
                <option>Generated SAR</option>
                <option>Approved SAR</option>
                <option>Edited Narrative</option>
                <option>Upload Transaction Data</option>
                <option>Failed Generation</option>
              </select>
            </div>

            {/* Module Filter */}
            <div>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full h-10 px-3 bg-[#F8F8F8] border border-transparent rounded-lg text-[13px] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all cursor-pointer appearance-none"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400, backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6B6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                <option>All Modules</option>
                <option>Generate SAR</option>
                <option>Approval Workflow</option>
                <option>Narrative Editor</option>
                <option>Data Input</option>
              </select>
            </div>
          </div>

          {/* Date Range - Second Row */}
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
              Date Range:
            </span>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full sm:w-[200px] h-10 px-3 bg-[#F8F8F8] border border-transparent rounded-lg text-[13px] text-[#1A1A1A] focus:outline-none focus:bg-white focus:border-[#00AEEF] transition-all cursor-pointer appearance-none"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400, backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6B6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#E8E8E8] bg-[#FAFAFA]">
                  <th className="w-8 px-3 sm:px-4 py-3"></th>
                  <th className="px-3 sm:px-4 py-3 text-left text-[11px] sm:text-[12px] text-[#6B6B6B] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    Timestamp
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-[11px] sm:text-[12px] text-[#6B6B6B] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    User
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-[11px] sm:text-[12px] text-[#6B6B6B] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    Role
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-[11px] sm:text-[12px] text-[#6B6B6B] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    Action
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-[11px] sm:text-[12px] text-[#6B6B6B] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    Module
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-[11px] sm:text-[12px] text-[#6B6B6B] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    Target Object
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-[11px] sm:text-[12px] text-[#6B6B6B] font-medium" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr
                      className="border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                      onClick={() => toggleRow(log.id)}
                    >
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        {expandedRow === log.id ? (
                          <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
                        )}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#1A1A1A] whitespace-nowrap" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                        {log.timestamp}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                        {log.user}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                        {log.role}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                        {log.action}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                        {log.module}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                        {log.target}
                      </td>
                      <td className="px-3 sm:px-4 py-3 sm:py-4">
                        <span className={`inline-flex px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] border whitespace-nowrap ${getStatusColor(log.status)}`} style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                    
                    {/* Expandable Row Details */}
                    {expandedRow === log.id && (
                      <tr className="bg-[#F8F8F8] border-b border-[#E8E8E8]">
                        <td colSpan={8} className="px-3 sm:px-4 py-4 sm:py-6">
                          <div className="ml-0 sm:ml-8 lg:ml-12 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {/* Event Details */}
                            <div className="min-w-0">
                              <h4 className="text-[11px] sm:text-[12px] text-[#6B6B6B] mb-2 sm:mb-3" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                                Event Details
                              </h4>
                              <div className="space-y-1.5 sm:space-y-2">
                                <div className="flex items-start gap-2">
                                  <span className="text-[11px] sm:text-[12px] text-[#999999] w-20 sm:w-24 flex-shrink-0" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                                    Event ID:
                                  </span>
                                  <span className="text-[11px] sm:text-[12px] text-[#1A1A1A] break-all" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                                    {log.eventId}
                                  </span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-[11px] sm:text-[12px] text-[#999999] w-20 sm:w-24 flex-shrink-0" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                                    IP Address:
                                  </span>
                                  <span className="text-[11px] sm:text-[12px] text-[#1A1A1A]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                                    {log.ipAddress}
                                  </span>
                                </div>
                                {log.linkedSarId && (
                                  <div className="flex items-start gap-2">
                                    <span className="text-[11px] sm:text-[12px] text-[#999999] w-20 sm:w-24 flex-shrink-0" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                                      Linked SAR:
                                    </span>
                                    <span 
                                      className="text-[11px] sm:text-[12px] text-[#00AEEF] cursor-pointer hover:underline" 
                                      style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }} 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onViewSar(log.linkedSarId!);
                                      }}
                                    >
                                      {log.linkedSarId}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Description */}
                            <div className="min-w-0">
                              <h4 className="text-[11px] sm:text-[12px] text-[#6B6B6B] mb-2 sm:mb-3" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                                Description
                              </h4>
                              <p className="text-[11px] sm:text-[12px] text-[#1A1A1A] leading-relaxed" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
                                {log.description}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-[#E8E8E8] px-6 py-4 flex items-center justify-between bg-white">
            <span className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}>
              Showing 1-8 of 247 logs
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded transition-all" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                Previous
              </button>
              <button className="px-3 py-1.5 text-[13px] bg-[#00AEEF] text-white rounded" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}>
                1
              </button>
              <button className="px-3 py-1.5 text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded transition-all" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                2
              </button>
              <button className="px-3 py-1.5 text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded transition-all" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                3
              </button>
              <button className="px-3 py-1.5 text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] rounded transition-all" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}