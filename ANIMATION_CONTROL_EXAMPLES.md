# SAR Animation Control - Quick Examples

## 🎯 Current State (Demo Mode)
The animation currently runs automatically with preset timings. **No changes needed** for demo/testing.

---

## ✅ Enabling Backend Control

### Quick 3-Step Setup:

**1. Uncomment the refs in App.tsx:**
```tsx
const progressCallbackRef = useRef<((phase: number) => void) | null>(null);
const completeCallbackRef = useRef<(() => void) | null>(null);
```

**2. Uncomment the handler function:**
```tsx
const handleGenerateStart = (
  progressCallback: (phase: number) => void,
  completeCallback: () => void
) => {
  progressCallbackRef.current = progressCallback;
  completeCallbackRef.current = completeCallback;
  startBackendGeneration();
};
```

**3. Uncomment the props in SARConfiguration:**
```tsx
<SARConfiguration 
  onGenerateSAR={handleGenerateSAR}
  useBackendControl={true}
  onGenerateStart={handleGenerateStart}
/>
```

---

## 📡 Backend Integration Examples

### Example 1: Simple REST API

```tsx
const startBackendGeneration = async () => {
  try {
    progressCallbackRef.current?.(0); // Start: Data Parsing
    
    const response = await fetch('https://your-api.com/generate-sar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transactionData: '...',
        customPrompt: '...'
      })
    });
    
    const result = await response.json();
    
    // Manually progress through phases as your backend processes
    progressCallbackRef.current?.(1); // Transaction Pattern Analysis
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    progressCallbackRef.current?.(2); // Risk Indicator Detection
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    progressCallbackRef.current?.(3); // Narrative Construction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Complete
    completeCallbackRef.current?.();
  } catch (error) {
    console.error('Error:', error);
    completeCallbackRef.current?.(); // Always complete
  }
};
```

---

### Example 2: Server-Sent Events (Streaming)

Best for real-time LLM streaming from backend.

```tsx
const startBackendGeneration = async () => {
  const eventSource = new EventSource('https://your-api.com/generate-sar-stream');
  
  eventSource.addEventListener('phase', (event) => {
    const data = JSON.parse(event.data);
    // Backend sends: { "phase": 0 } or { "phase": 1 } etc.
    progressCallbackRef.current?.(data.phase);
  });
  
  eventSource.addEventListener('complete', () => {
    eventSource.close();
    completeCallbackRef.current?.();
  });
  
  eventSource.addEventListener('error', (error) => {
    console.error('Stream error:', error);
    eventSource.close();
    completeCallbackRef.current?.();
  });
};
```

**Your Backend (Python FastAPI example):**
```python
@app.get("/generate-sar-stream")
async def generate_sar_stream():
    async def event_stream():
        # Phase 0
        yield f"event: phase\ndata: {json.dumps({'phase': 0})}\n\n"
        await parse_data()
        
        # Phase 1
        yield f"event: phase\ndata: {json.dumps({'phase': 1})}\n\n"
        await analyze_patterns()
        
        # Phase 2
        yield f"event: phase\ndata: {json.dumps({'phase': 2})}\n\n"
        await detect_risks()
        
        # Phase 3
        yield f"event: phase\ndata: {json.dumps({'phase': 3})}\n\n"
        await generate_narrative()
        
        # Complete
        yield f"event: complete\ndata: {{}}\n\n"
    
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

---

### Example 3: WebSocket

```tsx
const startBackendGeneration = async () => {
  const ws = new WebSocket('wss://your-api.com/generate-sar');
  
  ws.onopen = () => {
    // Send request data
    ws.send(JSON.stringify({
      transactionData: '...',
      customPrompt: '...'
    }));
  };
  
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
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    ws.close();
    completeCallbackRef.current?.();
  };
};
```

---

## 🎬 Phase Reference

| Phase | Name | When to Call |
|-------|------|-------------|
| **0** | Data Parsing | Immediately when backend starts processing |
| **1** | Transaction Pattern Analysis | When analyzing transaction patterns |
| **2** | Risk Indicator Detection | When detecting suspicious indicators |
| **3** | Narrative Construction | When generating the final narrative |
| **Complete** | `completeCallback()` | When backend finishes (or errors) |

---

## ⚡ Quick Test (No Backend Required)

Test the animation control with fake delays:

```tsx
const startBackendGeneration = async () => {
  // Simulate backend processing
  progressCallbackRef.current?.(0);
  await new Promise(r => setTimeout(r, 1500));
  
  progressCallbackRef.current?.(1);
  await new Promise(r => setTimeout(r, 2000));
  
  progressCallbackRef.current?.(2);
  await new Promise(r => setTimeout(r, 1800));
  
  progressCallbackRef.current?.(3);
  await new Promise(r => setTimeout(r, 2200));
  
  completeCallbackRef.current?.();
};
```

---

## 🔧 Error Handling Best Practice

Always call `completeCallback()` even if backend fails:

```tsx
const startBackendGeneration = async () => {
  try {
    progressCallbackRef.current?.(0);
    
    const response = await fetch('https://your-api.com/generate-sar', {
      method: 'POST',
      body: JSON.stringify({ /* data */ })
    });
    
    if (!response.ok) {
      throw new Error('Backend failed');
    }
    
    // Process phases...
    progressCallbackRef.current?.(1);
    // ...
    
    completeCallbackRef.current?.();
  } catch (error) {
    console.error('Generation failed:', error);
    
    // ⚠️ IMPORTANT: Always complete, even on error
    completeCallbackRef.current?.();
    
    // Show error to user
    alert('SAR generation failed. Please try again.');
  }
};
```

---

## 📋 Summary

### Auto Mode (Current - No changes needed)
```tsx
<SARConfiguration onGenerateSAR={handleGenerateSAR} />
```
✅ Uses preset timings  
✅ Perfect for demos/testing

### Backend Control Mode
```tsx
<SARConfiguration 
  onGenerateSAR={handleGenerateSAR}
  useBackendControl={true}
  onGenerateStart={handleGenerateStart}
/>
```
✅ Controlled by your backend  
✅ Syncs with real processing  
✅ Phases update as backend progresses

---

## 🚀 Next Steps

1. **Test in Auto Mode** first (current state)
2. **Uncomment the code** in App.tsx when ready
3. **Implement backend calls** in `startBackendGeneration()`
4. **Call `progressCallback(phase)`** as your backend progresses
5. **Call `completeCallback()`** when done (or on error)

See `BACKEND_INTEGRATION_GUIDE.md` for detailed integration patterns!
