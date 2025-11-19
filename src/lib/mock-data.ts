import { DAO, User, Proposal, Task, Document, ActivityItem } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@dao.com',
    role: 'Admin',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@dao.com',
    role: 'Contributor',
    walletAddress: '0x9876543210abcdef1234567890abcdef12345678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@dao.com',
    role: 'Contributor',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@dao.com',
    role: 'Viewer',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
];

export const mockDAOs: DAO[] = [
  { id: '1', name: 'MetaDAO', logo: '🌐' },
  { id: '2', name: 'BuilderDAO', logo: '🔨' },
  { id: '3', name: 'GovDAO', logo: '⚖️' },
];

export const mockDocuments: Document[] = [
  {
    id: 'd1',
    name: 'Budget_Report_Q1.pdf',
    type: 'PDF',
    uploadedBy: mockUsers[0],
    uploadedAt: '2025-11-15T10:30:00Z',
    url: '#',
    taskId: 't1',
    isPublic: true,
  },
  {
    id: 'd2',
    name: 'Venue_Contract.docx',
    type: 'DOCX',
    uploadedBy: mockUsers[1],
    uploadedAt: '2025-11-14T14:20:00Z',
    url: '#',
    taskId: 't2',
    isPublic: true,
  },
  {
    id: 'd3',
    name: 'Marketing_Plan.pdf',
    type: 'PDF',
    uploadedBy: mockUsers[2],
    uploadedAt: '2025-11-13T09:15:00Z',
    url: '#',
    taskId: 't3',
    isPublic: false,
  },
];

export const mockActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'status_change',
    description: 'Task "Prepare Budget Report" status changed from To do to In progress',
    user: mockUsers[0],
    timestamp: '2025-11-17T15:30:00Z',
  },
  {
    id: 'a2',
    type: 'document_upload',
    description: 'Uploaded document "Budget_Report_Q1.pdf"',
    user: mockUsers[0],
    timestamp: '2025-11-15T10:30:00Z',
  },
  {
    id: 'a3',
    type: 'assignment',
    description: 'Assigned "Book Event Venue" to Bob Smith',
    user: mockUsers[0],
    timestamp: '2025-11-14T11:00:00Z',
  },
  {
    id: 'a4',
    type: 'budget_update',
    description: 'Updated budget spent: $12,000 → $15,000',
    user: mockUsers[1],
    timestamp: '2025-11-13T16:45:00Z',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    name: 'Prepare Budget Report',
    type: 'Pago',
    status: 'In progress',
    assignee: mockUsers[0],
    dueDate: '2025-11-25',
    budgetExpected: 5000,
    budgetSpent: 3500,
    description: 'Create comprehensive budget report for Q1 expenses and projections for Q2.',
    documents: [mockDocuments[0]],
    proposalId: 'p1',
  },
  {
    id: 't2',
    name: 'Book Event Venue',
    type: 'Logística',
    status: 'Done',
    assignee: mockUsers[1],
    dueDate: '2025-11-20',
    budgetExpected: 10000,
    budgetSpent: 9500,
    description: 'Secure venue for DAO annual meetup. Capacity for 200 people.',
    documents: [mockDocuments[1]],
    proposalId: 'p1',
  },
  {
    id: 't3',
    name: 'Launch Marketing Campaign',
    type: 'Comunicación',
    status: 'In progress',
    assignee: mockUsers[2],
    dueDate: '2025-11-30',
    budgetExpected: 8000,
    budgetSpent: 2000,
    description: 'Execute social media and content marketing campaign for new proposal.',
    documents: [mockDocuments[2]],
    proposalId: 'p1',
  },
  {
    id: 't4',
    name: 'Coordinate Travel Logistics',
    type: 'Logística',
    status: 'To do',
    assignee: mockUsers[1],
    dueDate: '2025-12-05',
    budgetExpected: 12000,
    budgetSpent: 0,
    description: 'Arrange travel and accommodation for all attendees.',
    documents: [],
    proposalId: 'p1',
  },
  {
    id: 't5',
    name: 'Process Speaker Payments',
    type: 'Pago',
    status: 'To do',
    assignee: mockUsers[0],
    dueDate: '2025-12-10',
    budgetExpected: 15000,
    budgetSpent: 0,
    description: 'Process payments for all confirmed speakers.',
    documents: [],
    proposalId: 'p2',
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 'p1',
    title: 'Q4 Community Meetup & Workshop Series',
    daoId: '1',
    daoName: 'MetaDAO',
    status: 'In progress',
    progress: 65,
    budgetApproved: 50000,
    budgetSpent: 15000,
    owner: mockUsers[0],
    description: `This proposal aims to organize a series of community meetups and workshops throughout Q4 to strengthen community bonds and provide educational value to our members.
    
The events will include:
- Monthly community meetup with guest speakers
- Technical workshops on Web3 development
- Governance workshops
- Year-end celebration event

Expected outcomes:
- Increased community engagement
- Better understanding of DAO governance
- Stronger technical skills among members
- Improved community cohesion`,
    snapshotUrl: 'https://snapshot.org/#/metadao.eth/proposal/0x123abc',
    createdAt: '2025-10-01T00:00:00Z',
    tasks: mockTasks.filter(t => t.proposalId === 'p1'),
    documents: mockDocuments,
    activity: mockActivity,
    isPublic: true,
  },
  {
    id: 'p2',
    title: 'Treasury Diversification Strategy 2025',
    daoId: '1',
    daoName: 'MetaDAO',
    status: 'In progress',
    progress: 30,
    budgetApproved: 100000,
    budgetSpent: 5000,
    owner: mockUsers[0],
    description: `Implement a comprehensive treasury diversification strategy to reduce risk and optimize returns for the DAO treasury.

Strategy includes:
- Diversify into multiple stable assets
- Allocate portion to yield-generating protocols
- Establish risk management framework
- Regular reporting and rebalancing`,
    snapshotUrl: 'https://snapshot.org/#/metadao.eth/proposal/0x456def',
    createdAt: '2025-10-15T00:00:00Z',
    tasks: mockTasks.filter(t => t.proposalId === 'p2'),
    documents: [],
    activity: [],
    isPublic: true,
  },
  {
    id: 'p3',
    title: 'Marketing & Growth Initiative',
    daoId: '2',
    daoName: 'BuilderDAO',
    status: 'Completed',
    progress: 100,
    budgetApproved: 30000,
    budgetSpent: 28500,
    owner: mockUsers[2],
    description: 'Launch comprehensive marketing campaign to increase DAO visibility and attract new members.',
    snapshotUrl: 'https://snapshot.org/#/builderdao.eth/proposal/0x789ghi',
    createdAt: '2025-09-01T00:00:00Z',
    tasks: [],
    documents: [],
    activity: [],
    isPublic: true,
  },
];

export const currentUser = mockUsers[0];
