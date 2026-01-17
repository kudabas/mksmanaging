import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react';
import { DataRecord } from '@/types/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataFormDialog } from './DataFormDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { cn } from '@/lib/utils';

interface DataTableProps {
  records: DataRecord[];
  onAdd: (record: Omit<DataRecord, 'id'>) => void;
  onEdit: (record: DataRecord) => void;
  onDelete: (id: string) => void;
}

export function DataTable({ records, onAdd, onEdit, onDelete }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<DataRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<DataRecord | null>(null);

  const categories = [...new Set(records.map(r => r.category))];

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(search.toLowerCase()) ||
      record.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || record.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEdit = (record: DataRecord) => {
    setEditRecord(record);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: Omit<DataRecord, 'id'>) => {
    if (editRecord) {
      onEdit({ ...data, id: editRecord.id });
    } else {
      onAdd(data);
    }
    setFormOpen(false);
    setEditRecord(null);
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => { setEditRecord(null); setFormOpen(true); }} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold min-w-[200px]">Name</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Category</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Date</TableHead>
                <TableHead className="font-semibold text-right hidden lg:table-cell">Value</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id} className="table-row-hover">
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm sm:text-base">{record.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-[150px] sm:max-w-xs">
                          {record.description}
                        </p>
                        <div className="sm:hidden mt-1 flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">{record.category}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">{record.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs sm:text-sm',
                          record.status === 'active' && 'bg-success/10 text-success',
                          record.status === 'pending' && 'bg-warning/10 text-warning',
                          record.status === 'archived' && 'bg-muted text-muted-foreground'
                        )}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right font-medium hidden lg:table-cell">
                      {record.value > 0 ? `$${record.value.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(record)}
                          className="hover:text-primary h-8 w-8 sm:h-9 sm:w-9"
                        >
                          <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteRecord(record)}
                          className="hover:text-destructive h-8 w-8 sm:h-9 sm:w-9"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Record count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredRecords.length} of {records.length} records
      </div>

      {/* Dialogs */}
      <DataFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editRecord}
        categories={categories}
      />
      <DeleteConfirmDialog
        open={!!deleteRecord}
        onOpenChange={(open) => !open && setDeleteRecord(null)}
        onConfirm={() => {
          if (deleteRecord) {
            onDelete(deleteRecord.id);
            setDeleteRecord(null);
          }
        }}
        itemName={deleteRecord?.name || ''}
      />
    </div>
  );
}
