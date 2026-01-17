import { DataRecord } from '@/types/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Calendar, DollarSign, Tag, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface DataDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: DataRecord | null;
  onEdit: (record: DataRecord) => void;
  onDelete: (record: DataRecord) => void;
}

export function DataDetailDialog({
  open,
  onOpenChange,
  record,
  onEdit,
  onDelete,
}: DataDetailDialogProps) {
  if (!record) return null;

  const handleEdit = () => {
    onOpenChange(false);
    onEdit(record);
  };

  const handleDelete = () => {
    onOpenChange(false);
    onDelete(record);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl pr-6">{record.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {/* Status & Category */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className={cn(
                record.status === 'active' && 'bg-success/10 text-success',
                record.status === 'pending' && 'bg-warning/10 text-warning',
                record.status === 'archived' && 'bg-muted text-muted-foreground'
              )}
            >
              {record.status}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {record.category}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium text-sm truncate">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <DollarSign className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Value</p>
                <p className="font-medium text-sm truncate">
                  {record.value > 0 ? `$${record.value.toLocaleString()}` : 'No value'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Description</p>
            </div>
            <p className="text-sm leading-relaxed">
              {record.description || 'No description provided.'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex-1"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Record
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
