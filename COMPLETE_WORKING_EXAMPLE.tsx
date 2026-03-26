/**
 * COMPLETE WORKING EXAMPLE - Backend-Controlled SAR Animation
 * 
 * This file shows a fully implemented example with backend control.
 * Copy relevant sections into your App.tsx to enable backend control.
 */

import { TransactionDataInput } from './components/TransactionDataInput';
import { SARConfiguration } from './components/SARConfiguration';
import { NarrativeEditor } from './components/NarrativeEditor';
import { useState, useRef } from 'react';

export default function AppWithBackendControl() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sarGenerated, setSarGenerated] = useState(false);

  // ============================================
  // STEP 1: Create refs to store callbacks
  // ============================================
  const progressCallbackRef = useRef<((phase: number) => void) | null>(null);
  const completeCallbackRef = useRef<(() => void) | null>(null);

  const handleDataLoaded = () => {
    setDataLoaded(true);
  };

  const handleGenerateSAR = () => {
    setSarGenerated(true);
  };

  // ============================================
  // STEP 2: Implement the generation handler
  // ============================================
  const handleGenerateStart = (
    progressCallback: (phase: number) => void,
    completeCallback: () => void
  ) => {
    // Store the callbacks
    progressCallbackRef.current = progressCallback;
    completeCallbackRef.current = completeCallback;
    
    // Start your backend process
    startBackendGeneration();
  };

  // ============================================
  // STEP 3: Your backend integration logic
  // ============================================
  
  // OPTION A: Server-Sent Events (Recommended for LLM streaming)
  const startBackendGenerationSSE = () => {
    const eventSource = new EventSource('https://your-api.com/api/generate-sar');
    
    eventSource.addEventListener('phase', (event) => {
      const data = JSON.parse(event.data);
      console.log('Backend phase update:', data.phase);
      progressCallbackRef.current?.(data.phase);
    });
    
    eventSource.addEventListener('complete', () => {
      console.log('Backend generation complete');
      eventSource.close();
      completeCallbackRef.current?.();
    });
    
    eventSource.addEventListener('error', (error) => {
      console.error('SSE error:', error);
      eventSource.close();
      completeCallbackRef.current?.();
      alert('SAR generation failed. Please try again.');
    });
  };

  // OPTION B: Polling (Simple, works everywhere)
  const startBackendGenerationPolling = async () => {
    try {
      // Start the job
      const startResponse = await fetch('https://your-api.com/api/generate-sar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionData: 'your-data-here',
          customPrompt: 'any-custom-instructions'
        })
      });
      
      const { jobId } = await startResponse.json();
      
      // Poll for status
      const pollInterval = setInterval(async () => {
        const statusResponse = await fetch(`https://your-api.com/api/generate-sar/${jobId}/status`);
        const status = await statusResponse.json();
        
        // Update phase
        if (status.phase !== undefined && status.phase !== null) {
          progressCallbackRef.current?.(status.phase);
        }
        
        // Check if complete
        if (status.isComplete) {
          clearInterval(pollInterval);
          completeCallbackRef.current?.();
        }
        
        // Check for errors
        if (status.error) {
          clearInterval(pollInterval);
          completeCallbackRef.current?.();
          alert(`Generation failed: ${status.error}`);
        }
      }, 500); // Poll every 500ms
      
    } catch (error) {
      console.error('Polling error:', error);
      completeCallbackRef.current?.();
      alert('SAR generation failed. Please try again.');
    }
  };

  // OPTION C: WebSocket (Real-time bidirectional)
  const startBackendGenerationWebSocket = () => {
    const ws = new WebSocket('wss://your-api.com/ws/generate-sar');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      // Send initial request
      ws.send(JSON.stringify({
        transactionData: 'your-data-here',
        customPrompt: 'any-custom-instructions'
      }));
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'phase') {
        console.log('Phase update:', data.phase);
        progressCallbackRef.current?.(data.phase);
      }
      
      if (data.type === 'complete') {
        console.log('Generation complete');
        ws.close();
        completeCallbackRef.current?.();
      }
      
      if (data.type === 'error') {
        console.error('Backend error:', data.message);
        ws.close();
        completeCallbackRef.current?.();
        alert(`Generation failed: ${data.message}`);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
      completeCallbackRef.current?.();
      alert('Connection error. Please try again.');
    };
  };

  // OPTION D: Simple Fetch with Streaming Response (Modern approach)
  const startBackendGenerationFetchStream = async () => {
    try {
      const response = await fetch('https://your-api.com/api/generate-sar-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionData: 'your-data-here',
          customPrompt: 'any-custom-instructions'
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) {
        throw new Error('No response body');
      }
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          completeCallbackRef.current?.();
          break;
        }
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('PHASE:')) {
            const phase = parseInt(line.split(':')[1]);
            progressCallbackRef.current?.(phase);
          }
          if (line === 'COMPLETE') {
            completeCallbackRef.current?.();
            break;
          }
        }
      }
    } catch (error) {
      console.error('Fetch stream error:', error);
      completeCallbackRef.current?.();
      alert('SAR generation failed. Please try again.');
    }
  };

  // OPTION E: Test Mode (No backend - simulates with delays)
  const startBackendGenerationTest = async () => {
    console.log('Starting test generation (simulated backend)');
    
    // Phase 0: Data Parsing
    progressCallbackRef.current?.(0);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Phase 1: Transaction Pattern Analysis
    progressCallbackRef.current?.(1);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Phase 2: Risk Indicator Detection
    progressCallbackRef.current?.(2);
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Phase 3: Narrative Construction
    progressCallbackRef.current?.(3);
    await new Promise(resolve => setTimeout(resolve, 2200));
    
    // Complete
    console.log('Test generation complete');
    completeCallbackRef.current?.();
  };

  // ============================================
  // CHOOSE YOUR BACKEND METHOD HERE
  // ============================================
  const startBackendGeneration = () => {
    // Uncomment ONE of these based on your backend:
    
    // startBackendGenerationSSE();           // Server-Sent Events
    // startBackendGenerationPolling();        // Polling
    // startBackendGenerationWebSocket();      // WebSocket
    // startBackendGenerationFetchStream();    // Fetch Streaming
    startBackendGenerationTest();          // Test Mode (no backend)
  };

  // ============================================
  // STEP 4: Render with backend control enabled
  // ============================================
  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <div className="flex-1">
        {sarGenerated ? (
          <div className="h-full overflow-y-auto bg-white">
            <NarrativeEditor />
          </div>
        ) : (
          <div className="h-full bg-white">
            <TransactionDataInput onDataLoaded={handleDataLoaded} />
            {dataLoaded && (
              <div className="border-t border-[#E8E8E8] bg-white">
                <SARConfiguration 
                  onGenerateSAR={handleGenerateSAR}
                  useBackendControl={true}              // ✅ Enable backend control
                  onGenerateStart={handleGenerateStart} // ✅ Pass the handler
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ============================================
 * BACKEND EXAMPLES (Node.js/Express)
 * ============================================
 */

/**
 * Example 1: Server-Sent Events Endpoint
 * 
 * app.get('/api/generate-sar', async (req, res) => {
 *   res.setHeader('Content-Type', 'text/event-stream');
 *   res.setHeader('Cache-Control', 'no-cache');
 *   res.setHeader('Connection', 'keep-alive');
 * 
 *   // Phase 0: Data Parsing
 *   res.write(`event: phase\ndata: ${JSON.stringify({ phase: 0 })}\n\n`);
 *   await processDataParsing();
 * 
 *   // Phase 1: Pattern Analysis
 *   res.write(`event: phase\ndata: ${JSON.stringify({ phase: 1 })}\n\n`);
 *   await analyzePatterns();
 * 
 *   // Phase 2: Risk Detection
 *   res.write(`event: phase\ndata: ${JSON.stringify({ phase: 2 })}\n\n`);
 *   await detectRisks();
 * 
 *   // Phase 3: Narrative Construction
 *   res.write(`event: phase\ndata: ${JSON.stringify({ phase: 3 })}\n\n`);
 *   await generateNarrative();
 * 
 *   // Complete
 *   res.write(`event: complete\ndata: {}\n\n`);
 *   res.end();
 * });
 */

/**
 * Example 2: Polling Endpoints
 * 
 * const jobs = {};
 * 
 * app.post('/api/generate-sar', async (req, res) => {
 *   const jobId = generateUniqueId();
 *   jobs[jobId] = { phase: 0, isComplete: false };
 *   
 *   // Process asynchronously
 *   processGenerationAsync(jobId);
 *   
 *   res.json({ jobId });
 * });
 * 
 * app.get('/api/generate-sar/:jobId/status', (req, res) => {
 *   const status = jobs[req.params.jobId];
 *   res.json(status || { error: 'Job not found' });
 * });
 * 
 * async function processGenerationAsync(jobId) {
 *   jobs[jobId].phase = 0;
 *   await processDataParsing();
 *   
 *   jobs[jobId].phase = 1;
 *   await analyzePatterns();
 *   
 *   jobs[jobId].phase = 2;
 *   await detectRisks();
 *   
 *   jobs[jobId].phase = 3;
 *   await generateNarrative();
 *   
 *   jobs[jobId].isComplete = true;
 * }
 */

/**
 * Example 3: Streaming Response
 * 
 * app.post('/api/generate-sar-stream', async (req, res) => {
 *   res.setHeader('Content-Type', 'text/plain');
 *   res.setHeader('Transfer-Encoding', 'chunked');
 * 
 *   res.write('PHASE:0\n');
 *   await processDataParsing();
 * 
 *   res.write('PHASE:1\n');
 *   await analyzePatterns();
 * 
 *   res.write('PHASE:2\n');
 *   await detectRisks();
 * 
 *   res.write('PHASE:3\n');
 *   await generateNarrative();
 * 
 *   res.write('COMPLETE\n');
 *   res.end();
 * });
 */
