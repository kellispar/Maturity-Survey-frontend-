import React from "react";
import { ChevronRight, CheckCircle } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center ${
            currentStep >= 1 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
          </div>
          <span className="ml-2 font-medium">Survey Input</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <div
          className={`flex items-center ${
            currentStep >= 2 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
          </div>
          <span className="ml-2 font-medium">AI Analysis</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <div
          className={`flex items-center ${
            currentStep >= 3 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {currentStep >= 3 ? <CheckCircle className="w-5 h-5" /> : "3"}
          </div>
          <span className="ml-2 font-medium">ServiceNow Ticket</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
