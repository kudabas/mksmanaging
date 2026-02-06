import { useEffect, useState } from 'react';
import { DataRecord } from '@/types/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload, getFileType } from './FileUpload';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DataFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<DataRecord, 'id'>) => void;
  initialData?: DataRecord | null;
  categories: string[];
}

export function DataFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  categories,
}: DataFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: 'active' as DataRecord['status'],
    date: new Date().toISOString().split('T')[0],
    value: 0,
    description: '',
    fileName: '',
    fileUrl: '',
    fileType: undefined as DataRecord['fileType'],
    fileSize: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        status: initialData.status,
        date: initialData.date,
        value: initialData.value,
        description: initialData.description,
        fileName: initialData.fileName || '',
        fileUrl: initialData.fileUrl || '',
        fileType: initialData.fileType,
        fileSize: initialData.fileSize || '',
      });
      setSelectedFile(null);
    } else {
      setFormData({
        name: '',
        category: categories[0] || '',
        status: 'active',
        date: new Date().toISOString().split('T')[0],
        value: 0,
        description: '',
        fileName: '',
        fileUrl: '',
        fileType: undefined,
        fileSize: '',
      });
      setSelectedFile(null);
    }
  }, [initialData, categories, open]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let fileData = {
      fileName: formData.fileName,
      fileUrl: formData.fileUrl,
      fileType: formData.fileType,
      fileSize: formData.fileSize,
    };

    if (selectedFile) {
      setIsUploading(true);
      try {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('record-files')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('record-files')
          .getPublicUrl(fileName);

        fileData = {
          fileName: selectedFile.name,
          fileUrl: urlData.publicUrl,
          fileType: getFileType(selectedFile.type),
          fileSize: formatFileSize(selectedFile.size),
        };

        toast.success('File uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload file');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    onSubmit({
      name: formData.name,
      category: formData.category,
      status: formData.status,
      date: formData.date,
      value: formData.value,
      description: formData.description,
      ...fileData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Record' : 'Add New Record'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter record name"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: DataRecord['status']) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value ($)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                min={0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Attach File (Optional)</Label>
            <FileUpload
              onFileSelect={setSelectedFile}
              currentFile={formData.fileName ? { name: formData.fileName, type: formData.fileType || '' } : null}
            />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto" disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={isUploading}>
              {isUploading ? 'Uploading...' : initialData ? 'Save Changes' : 'Add Record'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
