import { useState } from 'react';
import { Users, Settings } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { DataTable } from '@/components/data/DataTable';
import { DocumentsView } from '@/components/documents/DocumentsView';
import { PlaceholderView } from '@/components/placeholders/PlaceholderView';
import { DataRecord } from '@/types/data';
import { initialRecords, initialDocuments } from '@/data/mockData';

const viewTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your data' },
  data: { title: 'Data Manager', subtitle: 'Manage your records' },
  documents: { title: 'Documents', subtitle: 'Excel & Word files' },
  users: { title: 'Users', subtitle: 'Manage team access' },
  settings: { title: 'Settings', subtitle: 'Configure your workspace' },
};

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [records, setRecords] = useState<DataRecord[]>(initialRecords);
  const [documents] = useState(initialDocuments);

  const handleAddRecord = (newRecord: Omit<DataRecord, 'id'>) => {
    const record: DataRecord = {
      ...newRecord,
      id: String(Date.now()),
    };
    setRecords([...records, record]);
  };

  const handleEditRecord = (updatedRecord: DataRecord) => {
    setRecords(records.map(r => r.id === updatedRecord.id ? updatedRecord : r));
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard records={records} documents={documents} />;
      case 'data':
        return (
          <DataTable
            records={records}
            onAdd={handleAddRecord}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />
        );
      case 'documents':
        return <DocumentsView documents={documents} />;
      case 'users':
        return (
          <PlaceholderView
            icon={Users}
            title="User Management"
            description="Manage team members and their access permissions. This feature is coming soon."
          />
        );
      case 'settings':
        return (
          <PlaceholderView
            icon={Settings}
            title="Settings"
            description="Configure your workspace preferences and integrations. This feature is coming soon."
          />
        );
      default:
        return <Dashboard records={records} documents={documents} />;
    }
  };

  const { title, subtitle } = viewTitles[activeView] || viewTitles.dashboard;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="ml-64">
        <Header title={title} subtitle={subtitle} />
        {renderView()}
      </main>
    </div>
  );
};

export default Index;
