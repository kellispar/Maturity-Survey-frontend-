import React from "react";
import { FileText, ChevronRight } from "lucide-react";
import type { SurveyQuestion, FormData, Program } from "./types";

interface SurveyFormProps {
  formData: FormData;
  programs: Program[];
  surveyQuestions: SurveyQuestion[];
  isLoading: boolean;
  onInputChange: (questionId: number, value: string) => void;
  onProgramChange: (programId: number, programName: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  formData,
  programs,
  surveyQuestions,
  isLoading,
  onInputChange,
  onProgramChange,
  onAnalyze,
  onReset,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <FileText className="w-6 h-6 mr-2 text-blue-600" />
        Step 1: Input Survey Results
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          IRM Program
        </label>
        <select
          value={formData.programId}
          onChange={(e) => {
            const programId = Number(e.target.value);
            const program = programs.find((p) => p.id === programId);
            if (program) {
              onProgramChange(programId, program.name);
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Category</th>
              <th className="px-6 py-4 text-left font-medium">Question</th>
              <th className="px-6 py-4 text-center font-medium w-48">
                Response
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {surveyQuestions.map((question, index) => (
              <tr
                key={question.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 w-75">
                  {question.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <p className="font-medium">{question.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {question.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <label
                        key={score}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={String(question.id)}
                          value={score}
                          checked={formData.responses[question.id] === score}
                          onChange={(e) =>
                            onInputChange(question.id, e.target.value)
                          }
                          className="sr-only"
                        />
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            formData.responses[question.id] === score
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {score}
                        </span>
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onReset}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Reset Demo
        </button>
        <button
          onClick={onAnalyze}
          disabled={
            Object.keys(formData.responses).length !== surveyQuestions.length ||
            isLoading
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? "Analyzing..." : "Analyze & Summarize"}
          {!isLoading && <ChevronRight className="w-5 h-5 ml-2" />}
        </button>
      </div>
    </div>
  );
};

export default SurveyForm;
