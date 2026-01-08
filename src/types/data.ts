export interface DataRecord {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'archived';
  date: string;
  value: number;
  description: string;
}

export interface DocumentRecord {
  id: string;
  fileName: string;
  type: 'excel' | 'word';
  uploadedAt: string;
  size: string;
  status: 'processed' | 'pending' | 'error';
}
