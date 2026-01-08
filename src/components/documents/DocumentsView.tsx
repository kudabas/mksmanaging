import { FileSpreadsheet, FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { DocumentRecord } from '@/types/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DocumentsViewProps {
  documents: DocumentRecord[];
}

export function DocumentsView({ documents }: DocumentsViewProps) {
  const getStatusIcon = (status: DocumentRecord['status']) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Section */}
      <div className="bg-card border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
        <p className="text-muted-foreground mb-4">
          Drag and drop Excel (.xlsx) or Word (.docx) files here
        </p>
        <Button>Browse Files</Button>
      </div>

      {/* Documents Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="stat-card cursor-pointer group animate-fade-in"
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center shrink-0',
                    doc.type === 'excel' ? 'bg-success/10' : 'bg-primary/10'
                  )}
                >
                  {doc.type === 'excel' ? (
                    <FileSpreadsheet className="w-6 h-6 text-success" />
                  ) : (
                    <FileText className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate group-hover:text-primary transition-colors">
                    {doc.fileName}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusIcon(doc.status)}
                    <Badge
                      variant="secondary"
                      className={cn(
                        doc.status === 'processed' && 'bg-success/10 text-success',
                        doc.status === 'pending' && 'bg-warning/10 text-warning',
                        doc.status === 'error' && 'bg-destructive/10 text-destructive'
                      )}
                    >
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
