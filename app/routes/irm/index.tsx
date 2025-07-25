import React, { useState, useEffect } from "react";
import axiosInstance from "~/lib/axios";
import type {
  SurveyQuestion,
  FormData,
  ServiceNowTicket,
  Program,
  SurveyResult,
} from "~/components/irm/types";
import ProgressIndicator from "~/components/irm/ProgressIndicator";
import SurveyForm from "~/components/irm/SurveyForm";
import AIAnalysis from "~/components/irm/AIAnalysis";
import ServiceNowTicketView from "~/components/irm/ServiceNowTicketView";
import { downloadFile } from "~/helper";

const IRMProofOfConcept: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [formData, setFormData] = useState<FormData>({
    programId: 1,
    programName: "Issue Management",
    responses: {},
  });
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [serviceNowTicket, setServiceNowTicket] =
    useState<ServiceNowTicket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [pdfPath, setPdfPath] = useState("");

  // Fetch programs when component mounts
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axiosInstance.get("/survey/programs");
        const data = response.data.programs;
        setPrograms(data);

        // Set initial program if we have data
        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            programId: data[0].id,
            programName: data[0].name,
          }));

          // Fetch questions for the first program
          fetchQuestions(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  // Function to fetch questions for a specific program
  const fetchQuestions = async (programId: number) => {
    setIsLoadingQuestions(true);
    try {
      const response = await axiosInstance.get(
        `/survey/${programId}/questions`
      );
      setSurveyQuestions(response.data.questions);

      // Reset responses when changing program
      setFormData((prev) => ({
        ...prev,
        responses: {},
      }));
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleInputChange = (questionId: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      responses: {
        ...prev.responses,
        [questionId]: parseInt(value),
      },
    }));
  };

  const handleProgramChange = (programId: number, programName: string) => {
    setFormData((prev) => ({
      ...prev,
      programId: programId,
      programName: programName,
      responses: {}, // Reset responses when changing program
    }));
    fetchQuestions(programId);
  };

  const generateAIAnalysis = async () => {
    setIsLoading(true);

    try {
      // Prepare data for API call
      const surveyResult: SurveyResult = {
        programId: formData.programId,
        answers: Object.keys(formData.responses).map((quesId) => ({
          id: Number(quesId),
          answer: formData.responses[Number(quesId)] || 0,
        })),
      };

      // Send survey results to the API and get the AI analysis
      const response = await axiosInstance.post(
        "/survey/results",
        surveyResult
      );

      // Extract the AI summary and Mermaid diagram from the response
      const { aiSummary, mermaidDiagram, pdfPath } = response.data;

      // Update the state with the data from the API
      setAiSummary(aiSummary);
      setMermaidCode(mermaidDiagram);
      setPdfPath(pdfPath);
      setCurrentStep(2);
    } catch (error) {
      console.error("Error submitting survey results:", error);
      alert("Failed to submit survey. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createServiceNowTicket = async () => {
    setIsLoading(true);

    // Simulate ServiceNow API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const ticketId = `ISS${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0")}`;
    const ticket: ServiceNowTicket = {
      id: ticketId,
      title: `${formData.programName} Framework Alignment - Critical Gap`,
      description: `Automated assessment identified critical gap in ${formData.programName.toLowerCase()} framework alignment. Immediate remediation required to ensure compliance and operational effectiveness.`,
      priority: "High",
      category: "IRM Core",
      assignedTo: "GRC Team",
      createdDate: new Date().toISOString().split("T")[0],
      status: "Open",
    };

    setServiceNowTicket(ticket);
    setIsLoading(false);
    setCurrentStep(3);
  };

  const resetDemo = () => {
    setCurrentStep(1);

    // If programs exist, reset to the first program
    if (programs.length > 0) {
      setFormData({
        programId: programs[0].id,
        programName: programs[0].name,
        responses: {},
      });
      fetchQuestions(programs[0].id);
    } else {
      // Fallback to default values if no programs exist
      setFormData({
        programId: 1,
        programName: "Issue Management",
        responses: {},
      });
    }

    setAiSummary("");
    setPdfPath("");
    setMermaidCode("");
    setServiceNowTicket(null);
  };

  const downloadReport = async () => {
    setIsLoading(true);

    try {
      const fileName = `IRM_Report_${formData.programName}.pdf`;

      const response = await axiosInstance.post(
        "/survey/results/pdf-download",
        {
          pdfPath,
        }
      );

      await downloadFile(response.data, fileName);
    } catch (error) {
      // TODO
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          IRM Assessment Integration - Proof of Concept
        </h1>
        <p className="text-gray-600 text-lg">
          Demonstrating automated workflow from survey data to ServiceNow ticket
          creation
        </p>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} />

      {/* Step 1: Survey Form */}
      {currentStep === 1 &&
        (isLoadingQuestions ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-lg text-gray-700">
              Loading survey questions...
            </span>
          </div>
        ) : (
          <SurveyForm
            formData={formData}
            programs={programs}
            surveyQuestions={surveyQuestions}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onProgramChange={handleProgramChange}
            onAnalyze={generateAIAnalysis}
            onReset={resetDemo}
          />
        ))}

      {/* Step 2: AI Analysis Results */}
      {currentStep >= 2 && (
        <AIAnalysis
          aiSummary={aiSummary}
          mermaidCode={mermaidCode}
          isLoading={isLoading}
          currentStep={currentStep}
          onBack={() => setCurrentStep(1)}
          onDownloadReport={downloadReport}
        />
      )}

      {/* Step 3: ServiceNow Integration */}
      {currentStep >= 3 && (
        <ServiceNowTicketView
          ticket={serviceNowTicket}
          onResetDemo={resetDemo}
        />
      )}
    </div>
  );
};

export default IRMProofOfConcept;
