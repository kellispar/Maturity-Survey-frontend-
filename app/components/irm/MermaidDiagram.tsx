import React, { useEffect, useRef } from "react";
import { Settings } from "lucide-react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  code: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current && code) {
      mermaid.initialize({});

      // Clear the container before rendering
      mermaidRef.current.innerHTML = "";

      // Try to render the diagram
      try {
        mermaid
          .render("mermaid-diagram", code)
          .then(({ svg, bindFunctions }) => {
            if (mermaidRef.current) {
              mermaidRef.current.innerHTML = svg;
              // Bind functions if needed
              if (bindFunctions) {
                bindFunctions(mermaidRef.current);
              }
            }
          });
      } catch (error: any) {
        console.error("Error rendering Mermaid diagram:", error);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = `<div class="text-red-500">Error rendering diagram: ${error.message}</div>`;
        }
      }
    }
  }, [code]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
      <div className="text-center text-gray-600 mb-4">
        <Settings className="inline-block w-8 h-8 mb-2" />
        <p className="font-medium">Remediation Action Flow</p>
        <p className="text-sm">Framework Alignment Implementation</p>
      </div>
      <div className="bg-white p-4 rounded border overflow-auto">
        {!code ? (
          <p className="text-gray-500 text-center py-4">
            No diagram data available
          </p>
        ) : (
          <div ref={mermaidRef} className="mermaid-container"></div>
        )}
      </div>
    </div>
  );
};

export default MermaidDiagram;
