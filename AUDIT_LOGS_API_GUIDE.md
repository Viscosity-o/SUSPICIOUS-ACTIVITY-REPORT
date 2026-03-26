# Audit Logs - Backend API Integration Guide

This guide shows how to integrate the Audit Logs component with your backend API.

---

## API Endpoint Structure

### Get Audit Logs

**Endpoint:** `GET /api/audit-logs`

**Query Parameters:**
```
?page=1&limit=10&search=&user=&action=&module=&dateRange=
```

**Example Request:**
```typescript
const response = await fetch('/api/audit-logs?page=1&limit=10&search=SAR-1023', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
});

const data = await response.json();
```

---

## Expected JSON Response

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "1",
        "timestamp": "2026-03-18T10:21:34Z",
        "user": "analyst_01",
        "role": "Investigator",
        "action": "Generated SAR",
        "module": "Generate SAR",
        "target": "SAR-1023",
        "status": "Success",
        "eventId": "EVT-2026-03-18-001",
        "ipAddress": "192.168.1.45",
        "description": "Successfully generated SAR report for suspicious transaction activity",
        "linkedSarId": "SAR-1023"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 25,
      "totalRecords": 247,
      "limit": 10
    }
  }
}
```

### TypeScript Interface

```typescript
interface AuditLog {
  id: string;
  timestamp: string; // ISO 8601 format
  user: string;
  role: string;
  action: string;
  module: string;
  target: string;
  status: 'Success' | 'Failed' | 'Approved' | 'Edited';
  // Optional expandable details
  eventId?: string;
  ipAddress?: string;
  description?: string;
  linkedSarId?: string | null;
}

interface AuditLogsResponse {
  success: boolean;
  data: {
    logs: AuditLog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalRecords: number;
      limit: number;
    };
  };
}
```

---

## Frontend Integration Example

### Step 1: Update AuditLogs.tsx to Fetch from Backend

Replace the mock data with API call:

```tsx
import { useState, useEffect } from 'react';

export function AuditLogs() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10
  });

  // Fetch audit logs from backend
  const fetchAuditLogs = async (page: number = 1) => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        search: searchQuery,
        user: selectedUser === 'All Users' ? '' : selectedUser,
        action: selectedAction === 'All Actions' ? '' : selectedAction,
        module: selectedModule === 'All Modules' ? '' : selectedModule,
        dateRange: selectedDateRange
      });

      const response = await fetch(`/api/audit-logs?${params}`, {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audit logs');
      }

      const result: AuditLogsResponse = await response.json();
      
      setAuditLogs(result.data.logs);
      setPagination(result.data.pagination);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      // Show error to user
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchAuditLogs();
  }, []);

  // Fetch when filters change
  useEffect(() => {
    fetchAuditLogs(1); // Reset to page 1 when filters change
  }, [searchQuery, selectedUser, selectedAction, selectedModule, selectedDateRange]);

  // Rest of component...
}
```

---

## Backend Implementation Examples

### Node.js/Express Example

```javascript
const express = require('express');
const router = express.Router();

router.get('/api/audit-logs', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      user = '',
      action = '',
      module = '',
      dateRange = 'Last 30 Days'
    } = req.query;

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { user: { $regex: search, $options: 'i' } },
        { target: { $regex: search, $options: 'i' } },
        { action: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (user) query.user = user;
    if (action) query.action = action;
    if (module) query.module = module;
    
    // Date range filter
    const dateFilter = getDateFilter(dateRange);
    if (dateFilter) query.timestamp = dateFilter;

    // Get total count
    const totalRecords = await AuditLog.countDocuments(query);
    
    // Get logs with pagination
    const logs = await AuditLog
      .find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalRecords / limit),
          totalRecords,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch audit logs'
    });
  }
});

function getDateFilter(dateRange) {
  const now = new Date();
  switch (dateRange) {
    case 'Last 24 Hours':
      return { $gte: new Date(now - 24 * 60 * 60 * 1000) };
    case 'Last 7 Days':
      return { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) };
    case 'Last 30 Days':
      return { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) };
    case 'Last 90 Days':
      return { $gte: new Date(now - 90 * 24 * 60 * 60 * 1000) };
    default:
      return null;
  }
}

module.exports = router;
```

---

### Python/FastAPI Example

```python
from fastapi import APIRouter, Query
from datetime import datetime, timedelta
from typing import Optional

router = APIRouter()

@router.get("/api/audit-logs")
async def get_audit_logs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    user: Optional[str] = None,
    action: Optional[str] = None,
    module: Optional[str] = None,
    dateRange: Optional[str] = "Last 30 Days"
):
    # Build query filters
    filters = {}
    
    if search:
        # Search across multiple fields
        filters["$or"] = [
            {"user": {"$regex": search, "$options": "i"}},
            {"target": {"$regex": search, "$options": "i"}},
            {"action": {"$regex": search, "$options": "i"}}
        ]
    
    if user:
        filters["user"] = user
    if action:
        filters["action"] = action
    if module:
        filters["module"] = module
    
    # Date range filter
    date_filter = get_date_filter(dateRange)
    if date_filter:
        filters["timestamp"] = date_filter
    
    # Get total count
    total_records = await db.audit_logs.count_documents(filters)
    
    # Get logs with pagination
    skip = (page - 1) * limit
    logs = await db.audit_logs.find(filters).sort("timestamp", -1).skip(skip).limit(limit).to_list()
    
    return {
        "success": True,
        "data": {
            "logs": logs,
            "pagination": {
                "currentPage": page,
                "totalPages": (total_records + limit - 1) // limit,
                "totalRecords": total_records,
                "limit": limit
            }
        }
    }

def get_date_filter(date_range: str):
    now = datetime.now()
    if date_range == "Last 24 Hours":
        return {"$gte": now - timedelta(hours=24)}
    elif date_range == "Last 7 Days":
        return {"$gte": now - timedelta(days=7)}
    elif date_range == "Last 30 Days":
        return {"$gte": now - timedelta(days=30)}
    elif date_range == "Last 90 Days":
        return {"$gte": now - timedelta(days=90)}
    return None
```

---

## Database Schema Example (MongoDB)

```javascript
const AuditLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  user: {
    type: String,
    required: true,
    index: true
  },
  role: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    index: true
  },
  module: {
    type: String,
    required: true,
    index: true
  },
  target: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Approved', 'Edited'],
    required: true
  },
  eventId: {
    type: String,
    unique: true,
    required: true
  },
  ipAddress: String,
  description: String,
  linkedSarId: String
});

// Indexes for better query performance
AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ user: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });
AuditLogSchema.index({ module: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
```

---

## Creating Audit Logs

### Automatically Log Actions

Create a middleware or helper function to automatically log user actions:

```typescript
// Audit logger helper
async function logAuditEvent({
  user,
  role,
  action,
  module,
  target,
  status,
  description,
  ipAddress,
  linkedSarId = null
}) {
  const eventId = `EVT-${new Date().toISOString().split('T')[0]}-${generateUniqueId()}`;
  
  await AuditLog.create({
    timestamp: new Date(),
    user,
    role,
    action,
    module,
    target,
    status,
    eventId,
    ipAddress,
    description,
    linkedSarId
  });
}

// Usage in your application
router.post('/api/generate-sar', authenticateUser, async (req, res) => {
  try {
    // Generate SAR logic
    const sarId = await generateSAR(req.body);
    
    // Log the action
    await logAuditEvent({
      user: req.user.username,
      role: req.user.role,
      action: 'Generated SAR',
      module: 'Generate SAR',
      target: sarId,
      status: 'Success',
      description: `Successfully generated SAR report for ${req.body.caseType}`,
      ipAddress: req.ip,
      linkedSarId: sarId
    });
    
    res.json({ success: true, sarId });
  } catch (error) {
    // Log failure
    await logAuditEvent({
      user: req.user.username,
      role: req.user.role,
      action: 'Failed Generation',
      module: 'Generate SAR',
      target: 'DRAFT',
      status: 'Failed',
      description: error.message,
      ipAddress: req.ip
    });
    
    res.status(500).json({ success: false, error: error.message });
  }
});
```

---

## Security Considerations

1. **Authentication Required**: Always require authentication for audit log endpoints
2. **Role-Based Access**: Only compliance officers should access audit logs
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Data Retention**: Define retention policies for audit logs
5. **Encryption**: Store sensitive data encrypted
6. **Immutable Logs**: Audit logs should never be modified or deleted

```javascript
// Example: Role-based access control
router.get('/api/audit-logs', authenticateUser, authorizeRole(['Compliance Officer', 'Admin']), async (req, res) => {
  // Only authorized users can access
});
```

---

## Performance Optimization

1. **Database Indexing**: Index timestamp, user, action, module fields
2. **Pagination**: Always use pagination for large datasets
3. **Caching**: Cache frequently accessed date ranges
4. **Archiving**: Archive old logs to separate storage

---

## Testing the Integration

```bash
# Test get audit logs
curl -X GET "http://localhost:3000/api/audit-logs?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test with filters
curl -X GET "http://localhost:3000/api/audit-logs?page=1&limit=10&user=analyst_01&action=Generated%20SAR" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Summary

1. **Frontend**: Update `AuditLogs.tsx` to call backend API
2. **Backend**: Implement `/api/audit-logs` endpoint with filtering and pagination
3. **Database**: Create audit log schema with proper indexes
4. **Logging**: Automatically log all user actions across the system
5. **Security**: Implement authentication, authorization, and access controls
6. **Performance**: Use indexes, pagination, and caching

The component is already designed to work seamlessly with backend APIs - just replace the mock data with real API calls!
