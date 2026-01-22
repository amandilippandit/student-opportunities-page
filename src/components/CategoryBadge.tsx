import { cn } from '@/lib/utils';
import type { OpportunityType } from '@/services/opportunitiesService';
import { GraduationCap, Briefcase, Users, Trophy } from 'lucide-react';

interface CategoryBadgeProps {
  type: OpportunityType;
  size?: 'sm' | 'md';
}

const categoryConfig: Record<OpportunityType, { label: string; icon: React.ElementType; className: string }> = {
  scholarship: {
    label: 'Scholarship',
    icon: GraduationCap,
    className: 'bg-scholarship-light text-scholarship',
  },
  internship: {
    label: 'Internship',
    icon: Briefcase,
    className: 'bg-internship-light text-internship',
  },
  summit: {
    label: 'Summit',
    icon: Users,
    className: 'bg-summit-light text-summit',
  },
  competition: {
    label: 'Competition',
    icon: Trophy,
    className: 'bg-competition-light text-competition',
  },
};

export function CategoryBadge({ type, size = 'md' }: CategoryBadgeProps) {
  const config = categoryConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {config.label}
    </span>
  );
}
