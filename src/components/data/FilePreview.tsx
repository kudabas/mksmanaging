import { FileText, FileSpreadsheet, File, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilePreviewProps {
  fileName: string;
  fileUrl: string;
  fileType: 'pdf' | 'word' | 'excel';
  fileSize?: string;
}

export function FilePreview({ fileName, fileUrl, fileType, fileSize }: FilePreviewProps) {
  const getFileIcon = () => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-12 h-12 text-red-500" />;
      case 'word':
        return <File className="w-12 h-12 text-blue-500" />;
      case 'excel':
        return <FileSpreadsheet className="w-12 h-12 text-green-500" />;
      default:
        return <FileText className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getFileLabel = () => {
    switch (fileType) {
      case 'pdf':
        return 'PDF Document';
      case 'word':
        return 'Word Document';
      case 'excel':
        return 'Excel Spreadsheet';
      default:
        return 'Document';
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-4">
      <div className="flex items-center gap-4">
        <div className="shrink-0 p-3 bg-background rounded-lg border border-border">
          {getFileIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{fileName}</p>
          <p className="text-xs text-muted-foreground">{getFileLabel()}</p>
          {fileSize && (
            <p className="text-xs text-muted-foreground">{fileSize}</p>
          )}
        </div>
      </div>

      {/* Preview for PDF */}
      {fileType === 'pdf' && (
        <div className="rounded-lg overflow-hidden border border-border bg-background">
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0`}
            className="w-full h-[300px] sm:h-[400px]"
            title={fileName}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          onClick={handleOpenInNewTab}
          className="flex-1"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open in New Tab
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}
