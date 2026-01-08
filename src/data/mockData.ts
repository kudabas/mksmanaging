import { DataRecord, DocumentRecord } from '@/types/data';

export const initialRecords: DataRecord[] = [
  {
    id: '1',
    name: 'Q1 Sales Report',
    category: 'Sales',
    status: 'active',
    date: '2024-01-15',
    value: 45000,
    description: 'First quarter sales performance analysis'
  },
  {
    id: '2',
    name: 'Marketing Budget',
    category: 'Finance',
    status: 'active',
    date: '2024-01-20',
    value: 25000,
    description: 'Annual marketing budget allocation'
  },
  {
    id: '3',
    name: 'Employee Directory',
    category: 'HR',
    status: 'active',
    date: '2024-01-10',
    value: 0,
    description: 'Complete employee contact information'
  },
  {
    id: '4',
    name: 'Inventory Report',
    category: 'Operations',
    status: 'pending',
    date: '2024-01-25',
    value: 12500,
    description: 'Monthly inventory status update'
  },
  {
    id: '5',
    name: 'Client Contracts',
    category: 'Legal',
    status: 'archived',
    date: '2023-12-01',
    value: 150000,
    description: 'Archived client contract documents'
  },
  {
    id: '6',
    name: 'Project Timeline',
    category: 'Operations',
    status: 'active',
    date: '2024-01-28',
    value: 0,
    description: 'Q1 project milestones and deadlines'
  },
];

export const initialDocuments: DocumentRecord[] = [
  {
    id: '1',
    fileName: 'Q1_Sales_Report.xlsx',
    type: 'excel',
    uploadedAt: '2024-01-15',
    size: '2.4 MB',
    status: 'processed'
  },
  {
    id: '2',
    fileName: 'Marketing_Strategy.docx',
    type: 'word',
    uploadedAt: '2024-01-18',
    size: '1.2 MB',
    status: 'processed'
  },
  {
    id: '3',
    fileName: 'Budget_2024.xlsx',
    type: 'excel',
    uploadedAt: '2024-01-20',
    size: '3.8 MB',
    status: 'pending'
  },
  {
    id: '4',
    fileName: 'Employee_Handbook.docx',
    type: 'word',
    uploadedAt: '2024-01-22',
    size: '5.1 MB',
    status: 'processed'
  },
];
