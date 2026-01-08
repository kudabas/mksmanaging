import { DataRecord } from '@/types/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RecentActivityProps {
  records: DataRecord[];
  title: string;
}

export function RecentActivity({ records, title }: RecentActivityProps) {
  const recentRecords = [...records]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="stat-card">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {recentRecords.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{record.name}</p>
              <p className="text-xs text-muted-foreground">{record.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className={cn(
                  record.status === 'active' && 'bg-success/10 text-success hover:bg-success/20',
                  record.status === 'pending' && 'bg-warning/10 text-warning hover:bg-warning/20',
                  record.status === 'archived' && 'bg-muted text-muted-foreground'
                )}
              >
                {record.status}
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(record.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
