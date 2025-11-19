export interface DAO {
  id: string;
  name: string;
  logo?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Admin' | 'Contributor' | 'Viewer';
  walletAddress?: string;
}

export type TaskType = 'Pago' | 'Logística' | 'Reserva' | 'Comunicación';
export type TaskStatus = 'To do' | 'In progress' | 'Done';
export type ProposalStatus = 'In progress' | 'Completed' | 'Blocked';

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  assignee: User;
  dueDate: string;
  budgetExpected: number;
  budgetSpent: number;
  description: string;
  documents: Document[];
  proposalId: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedBy: User;
  uploadedAt: string;
  url: string;
  taskId: string;
  isPublic: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'status_change' | 'document_upload' | 'assignment' | 'budget_update';
  description: string;
  user: User;
  timestamp: string;
}

export interface Proposal {
  id: string;
  title: string;
  daoId: string;
  daoName: string;
  status: ProposalStatus;
  progress: number;
  budgetApproved: number;
  budgetSpent: number;
  owner: User;
  description: string;
  snapshotUrl: string;
  createdAt: string;
  tasks: Task[];
  documents: Document[];
  activity: ActivityItem[];
  isPublic: boolean;
}
