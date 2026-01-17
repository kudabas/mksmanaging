import { LucideIcon } from 'lucide-react';

interface PlaceholderViewProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PlaceholderView({ icon: Icon, title, description }: PlaceholderViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] lg:h-[calc(100vh-8rem)] p-4 sm:p-6">
      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
        <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">{title}</h2>
      <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md">{description}</p>
    </div>
  );
}
