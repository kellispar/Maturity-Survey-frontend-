export interface Program {
    id: number;
    name: string;
}

export interface SurveyQuestion {
    id: number;
    categoryId: number;
    category: string;
    name: string;
    description: string;
}

export interface FormData {
    programId: number;
    programName: string;
    responses: Record<number, number>;
}

export interface SurveyAnswer {
    id: number;
    answer: number;
}

export interface SurveyResult {
    programId: number;
    answers: SurveyAnswer[];
}

export interface ServiceNowTicket {
    id: string;
    title: string;
    description: string;
    priority: string;
    category: string;
    assignedTo: string;
    createdDate: string;
    status: string;
}
