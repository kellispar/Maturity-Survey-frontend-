import React from "react";
import { CheckCircle } from "lucide-react";
import type { ServiceNowTicket } from "./types";

interface ServiceNowTicketViewProps {
  ticket: ServiceNowTicket | null;
  onResetDemo: () => void;
}

const ServiceNowTicketView: React.FC<ServiceNowTicketViewProps> = ({
  ticket,
  onResetDemo,
}) => {
  if (!ticket) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
        Step 3: ServiceNow Integration Complete
      </h2>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <span className="font-medium text-green-800">
            Success! Issue #{ticket.id} has been created in ServiceNow
          </span>
        </div>
        <p className="text-sm text-green-700">
          The ticket has been automatically assigned to the GRC team with all
          contextual information from the AI analysis.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">ServiceNow Ticket Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Ticket ID</p>
            <p className="font-medium">{ticket.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Priority</p>
            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {ticket.priority}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-medium">{ticket.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Assigned To</p>
            <p className="font-medium">{ticket.assignedTo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Created Date</p>
            <p className="font-medium">{ticket.createdDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {ticket.status}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Title</p>
          <p className="font-medium">{ticket.title}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Description</p>
          <p className="text-sm text-gray-700">{ticket.description}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onResetDemo}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
        >
          Run Demo Again
        </button>
        <div className="text-sm text-gray-600">
          <p>✓ Survey data processed automatically</p>
          <p>✓ AI analysis generated insights and action plan</p>
          <p>✓ ServiceNow ticket created with full context</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceNowTicketView;
