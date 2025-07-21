import React from "react";
import { AlertTriangle, ExternalLink } from "lucide-react";
import MermaidDiagram from "./MermaidDiagram";

interface AIAnalysisProps {
  aiSummary: string;
  mermaidCode: string;
  isLoading: boolean;
  currentStep: number;
  onBack: () => void;
  onCreateTicket: () => void;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({
  aiSummary,
  mermaidCode,
  isLoading,
  currentStep,
  onBack,
  onCreateTicket,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
        Step 2: AI-Powered Insights
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Executive Summary</h3>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
              {aiSummary}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Recommended Action Flow</h3>
          <MermaidDiagram code={mermaidCode} />
        </div>
      </div>

      {currentStep === 2 && (
        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            ← Back to Survey
          </button>
          <button
            onClick={onCreateTicket}
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center"
          >
            {isLoading ? "Creating Ticket..." : "Create ServiceNow Ticket"}
            {!isLoading && <ExternalLink className="w-5 h-5 ml-2" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
