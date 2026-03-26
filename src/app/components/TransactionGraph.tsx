import { useRef, useEffect, useState } from "react";
// @ts-ignore
import ForceGraph2D from "react-force-graph-2d";

interface NodeType {
  id: string;
}

interface LinkType {
  source: string;
  target: string;
  value: number;
}

interface GraphData {
  nodes: NodeType[];
  links: LinkType[];
}

export default function TransactionGraph() {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });

  // 🔹 Responsive Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Auto center + prevent cutting
  useEffect(() => {
    if (fgRef.current) {
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 80);
      }, 500);
    }
  }, [size, graphData]);

  // 🔹 Fetch graph data from backend
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const [nodesRes, linksRes] = await Promise.all([
          fetch("/api/nodes"),
          fetch("/api/links")
        ]);

        const nodesData: NodeType[] = await nodesRes.json();
        const linksData: LinkType[] = await linksRes.json();

        setGraphData({ nodes: nodesData, links: linksData });
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, []);

  // 🔹 Manual Zoom Handlers
  const handleZoomIn = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom * 1.2); // zoom in 20%
    }
  };

  const handleZoomOut = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom / 1.2); // zoom out 20%
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      
      {/* 🔹 Zoom Buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm shadow-sm hover:bg-gray-50"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm shadow-sm hover:bg-gray-50"
        >
          -
        </button>
      </div>

      {/* 🔹 Graph */}
      {size.width > 0 && size.height > 0 && (
        <ForceGraph2D
          ref={fgRef}
          width={size.width}
          height={size.height}
          graphData={graphData}
          backgroundColor="#F9FAFB"

          // Nodes
          nodeLabel={(node: any) => `Account: ${node.id}`}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 8 / globalScale;

            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "#1F3A5F";

            ctx.beginPath();
            ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillText(label, node.x + 6, node.y + 3);
          }}

          // Links
          linkDirectionalArrowLength={8}
          linkDirectionalArrowRelPos={1}
          linkWidth={(link: any) => (link.value > 5000 ? 3 : 1.5)}
          linkColor={(link: any) =>
            link.value > 5000 ? "#EF4444" : "#3B82F6"
          }
          linkCanvasObjectMode={() => "after"}
          linkCanvasObject={(link: any, ctx, globalScale) => {
            const start = link.source;
            const end = link.target;
            if (!start || !end) return;

            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = link.value > 5000 ? "#EF4444" : "#3B82F6";
            ctx.lineWidth = link.value > 5000 ? 2 : 1;
            ctx.stroke();

            const label = `₹${link.value}`;
            const fontSize = 6 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "#6B7280";

            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            ctx.fillText(label, midX, midY);
          }}

          // Physics
          d3VelocityDecay={0.3}
          d3AlphaDecay={0.02}
          onEngineStop={() => fgRef.current.zoomToFit(400, 80)}

          // Interaction
          enablePanInteraction={true}
          enableZoomInteraction={true}
          minZoom={0.2}
          maxZoom={5}
          onNodeDragEnd={(node: any) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          onNodeClick={(node: any) => alert(`Account ${node.id}`)}
          onLinkClick={(link: any) => alert(`Transaction: ₹${link.value}`)}
          cooldownTicks={100}
        />
      )}
    </div>
  );
}