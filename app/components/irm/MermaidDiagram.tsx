import React, { useEffect, useRef } from "react";
import { Settings } from "lucide-react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  code: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
      <div className="text-center text-gray-600 mb-4">
        <Settings className="inline-block w-8 h-8 mb-2" />
        <p className="font-medium">Remediation Action Flow</p>
        <p className="text-sm">Framework Alignment Implementation</p>
      </div>
      <div className="bg-white p-4 rounded border overflow-auto">
        <div className="mermaid">{code}</div>
      </div>
    </div>
  );
};

export default MermaidDiagram;
