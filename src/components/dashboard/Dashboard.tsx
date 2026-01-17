import { FileSpreadsheet, FileText, Database, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';
import { RecentActivity } from './RecentActivity';
import { DocumentRecord, DataRecord } from '@/types/data';

interface DashboardProps {
  records: DataRecord[];
  documents: DocumentRecord[];
}

export function Dashboard({ records, documents }: DashboardProps) {
  const totalRecords = records.length;
  const activeRecords = records.filter(r => r.status === 'active').length;
  const excelDocs = documents.filter(d => d.type === 'excel').length;
  const wordDocs = documents.filter(d => d.type === 'word').length;

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          title="Total Records"
          value={totalRecords}
          change="+12% from last month"
          changeType="positive"
          icon={Database}
        />
        <StatCard
          title="Active Items"
          value={activeRecords}
          change={`${Math.round((activeRecords / totalRecords) * 100)}% of total`}
          changeType="neutral"
          icon={TrendingUp}
        />
        <StatCard
          title="Excel Files"
          value={excelDocs}
          change="2 pending processing"
          changeType="neutral"
          icon={FileSpreadsheet}
        />
        <StatCard
          title="Word Documents"
          value={wordDocs}
          change="All processed"
          changeType="positive"
          icon={FileText}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RecentActivity records={records} title="Recent Data Updates" />
        <div className="stat-card">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button className="p-3 sm:p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-left">
              <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1 sm:mb-2" />
              <p className="font-medium text-xs sm:text-sm">Import Excel</p>
            </button>
            <button className="p-3 sm:p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors text-left">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent mb-1 sm:mb-2" />
              <p className="font-medium text-xs sm:text-sm">Import Word</p>
            </button>
            <button className="p-3 sm:p-4 rounded-lg bg-success/10 hover:bg-success/20 transition-colors text-left">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-success mb-1 sm:mb-2" />
              <p className="font-medium text-xs sm:text-sm">Add Record</p>
            </button>
            <button className="p-3 sm:p-4 rounded-lg bg-warning/10 hover:bg-warning/20 transition-colors text-left">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-warning mb-1 sm:mb-2" />
              <p className="font-medium text-xs sm:text-sm">Export Data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
