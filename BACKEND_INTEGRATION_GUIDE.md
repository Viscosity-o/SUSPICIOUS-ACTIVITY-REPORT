# SAR Animation Backend Integration Guide

This guide shows how to control the SAR generation animation timing based on your backend responses.

## Overview

The `SARConfiguration` component now supports two modes:
1. **Auto Mode (Demo)**: Uses preset timings - good for testing
2. **Backend Control Mode**: Animation controlled by your backend events

---

## Backend Control Mode - Usage

### Step 1: Enable Backend Control

In your `App.tsx`, pass the backend control props:

```tsx
import { useState, useRef } from 'react';

function App() {
  const progressCallbackRef = useRef<((phase: number) => void) | null>(null);
  const completeCallbackRef = useRef<(() => void) | null>(null);

  const handleGenerateStart = (
    progressCallback: (phase: number) => void,
    completeCallback: () => void
  ) => {
    // Store callbacks
    progressCallbackRef.current = progressCallback;
    completeCallbackRef.current = completeCallback;
    
    // Start your backend process
    startBackendGeneration();
  };

  const startBackendGeneration = async () => {
    try {
      // Your backend API call
      const response = await fetch('/api/generate-sar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* your data */ })
      });

      // Handle backend events (see examples below)
    } catch (error) {
      console.error('Generation failed:', error);
      completeCallbackRef.current?.(); // Still complete on error
    }
  };

  return (
    <SARConfiguration 
      useBackendControl={true}
      onGenerateStart={handleGenerateStart}
      onGenerateSAR={handleGenerateSAR}
    />
  );
}
```

---

## Backend Integration Patterns

### Pattern 1: Server-Sent Events (SSE) - Recommended

Best for real-time streaming updates from your LLM/backend.

```tsx
const startBackendGeneration = async () => {
  const eventSource = new EventSource('/api/generate-sar-stream');
  
  eventSource.addEventListener('phase', (event) => {
    const data = JSON.parse(event.data);
    // data = { phase: 0, name: "Data Parsing" }
    
    progressCallbackRef.current?.(data.phase);
  });
  
  eventSource.addEventListener('complete', () => {
    eventSource.close();
    completeCallbackRef.current?.();
  });
  
  eventSource.addEventListener('error', () => {
    eventSource.close();
    completeCallbackRef.current?.();
  });
};
```

**Backend Example (Node.js/Express):**
```javascript
app.get('/api/generate-sar-stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Phase 0: Data Parsing
  res.write(`event: phase\ndata: ${JSON.stringify({ phase: 0, name: "Data Parsing" })}\n\n`);
  await processDataParsing();
  
  // Phase 1: Transaction Pattern Analysis
  res.write(`event: phase\ndata: ${JSON.stringify({ phase: 1, name: "Transaction Pattern Analysis" })}\n\n`);
  await analyzePatterns();
  
  // Phase 2: Risk Indicator Detection
  res.write(`event: phase\ndata: ${JSON.stringify({ phase: 2, name: "Risk Indicator Detection" })}\n\n`);
  await detectRisks();
  
  // Phase 3: Narrative Construction
  res.write(`event: phase\ndata: ${JSON.stringify({ phase: 3, name: "Narrative Construction" })}\n\n`);
  await generateNarrative();
  
  // Complete
  res.write(`event: complete\ndata: {}\n\n`);
  res.end();
});
```

---

### Pattern 2: Polling

If SSE is not available, use polling.

```tsx
const startBackendGeneration = async () => {
  // Start generation
  const { jobId } = await fetch('/api/generate-sar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ /* data */ })
  }).then(res => res.json());
  
  // Poll for status
  const pollInterval = setInterval(async () => {
    const status = await fetch(`/api/generate-sar/${jobId}/status`)
      .then(res => res.json());
    
    // status = { phase: 2, isComplete: false }
    
    if (status.phase !== undefined) {
      progressCallbackRef.current?.(status.phase);
    }
    
    if (status.isComplete) {
      clearInterval(pollInterval);
      completeCallbackRef.current?.();
    }
  }, 500); // Poll every 500ms
};
```

**Backend Example:**
```javascript
// Start job
app.post('/api/generate-sar', async (req, res) => {
  const jobId = generateUniqueId();
  
  // Store job status
  jobStatus[jobId] = { phase: 0, isComplete: false };
  
  // Process asynchronously
  processGeneration(jobId);
  
  res.json({ jobId });
});

// Check status
app.get('/api/generate-sar/:jobId/status', (req, res) => {
  const status = jobStatus[req.params.jobId];
  res.json(status);
});

async function processGeneration(jobId) {
  jobStatus[jobId].phase = 0;
  await processDataParsing();
  
  jobStatus[jobId].phase = 1;
  await analyzePatterns();
  
  jobStatus[jobId].phase = 2;
  await detectRisks();
  
  jobStatus[jobId].phase = 3;
  await generateNarrative();
  
  jobStatus[jobId].isComplete = true;
}
```

---

### Pattern 3: WebSockets

For bidirectional real-time communication.

```tsx
const startBackendGeneration = async () => {
  const ws = new WebSocket('ws://your-backend/generate-sar');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'phase') {
      progressCallbackRef.current?.(data.phase);
    }
    
    if (data.type === 'complete') {
      ws.close();
      completeCallbackRef.current?.();
    }
  };
  
  ws.onerror = () => {
    ws.close();
    completeCallbackRef.current?.();
  };
  
  // Send initial data
  ws.onopen = () => {
    ws.send(JSON.stringify({ /* your data */ }));
  };
};
```

---

## Phase Mapping

The animation has 4 phases (0-3):

| Phase | Name | What to trigger |
|-------|------|----------------|
| 0 | Data Parsing | When you start processing the uploaded file |
| 1 | Transaction Pattern Analysis | When your LLM starts analyzing patterns |
| 2 | Risk Indicator Detection | When identifying risk factors |
| 3 | Narrative Construction | When generating the final narrative text |

**Important:** Call phases in order (0 → 1 → 2 → 3), then call `completeCallback()`.

---

## Complete Example with Fetch API

```tsx
const handleGenerateStart = (
  progressCallback: (phase: number) => void,
  completeCallback: () => void
) => {
  // Phase 0: Start immediately
  progressCallback(0);
  
  fetch('/api/generate-sar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionData: '...' })
  })
  .then(response => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    const readStream = async () => {
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        lines.forEach(line => {
          if (line.startsWith('PHASE:')) {
            const phase = parseInt(line.split(':')[1]);
            progressCallback(phase);
          }
        });
      }
      
      // Complete when stream ends
      completeCallback();
    };
    
    readStream();
  })
  .catch(error => {
    console.error('Error:', error);
    completeCallback(); // Always complete even on error
  });
};
```

---

## Testing Your Integration

### Quick Test Without Backend

```tsx
// Simulate backend with delays
const handleGenerateStart = (progressCallback, completeCallback) => {
  setTimeout(() => progressCallback(0), 500);   // Data Parsing
  setTimeout(() => progressCallback(1), 2000);  // Pattern Analysis
  setTimeout(() => progressCallback(2), 4000);  // Risk Detection
  setTimeout(() => progressCallback(3), 6000);  // Narrative Construction
  setTimeout(() => completeCallback(), 8000);   // Complete
};
```

---

## Error Handling

Always call `completeCallback()` even if backend fails:

```tsx
const handleGenerateStart = async (progressCallback, completeCallback) => {
  try {
    progressCallback(0);
    const result = await yourBackendCall();
    progressCallback(1);
    // ... more processing
    completeCallback();
  } catch (error) {
    console.error('Backend error:', error);
    // Still complete to exit animation state
    completeCallback();
    // Show error to user
    alert('SAR generation failed. Please try again.');
  }
};
```

---

## Auto Mode (Demo/Testing)

If you don't pass `useBackendControl={true}`, the animation runs automatically with preset timings:

```tsx
<SARConfiguration 
  onGenerateSAR={handleGenerateSAR}
  // useBackendControl not set = auto mode
/>
```

This is useful for:
- UI development
- Demos
- Testing without backend

---

## Summary

1. **Enable backend control**: `useBackendControl={true}`
2. **Implement `onGenerateStart`**: Receives `progressCallback` and `completeCallback`
3. **Call `progressCallback(phase)`** when backend reaches each phase (0-3)
4. **Call `completeCallback()`** when backend finishes
5. **Always handle errors** and still call `completeCallback()`

Choose the integration pattern that fits your backend architecture:
- **SSE**: Best for real-time streaming
- **Polling**: Simple, works everywhere
- **WebSockets**: Bidirectional communication
