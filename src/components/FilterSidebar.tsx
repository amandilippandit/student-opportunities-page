import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { OpportunityType } from '@/data/opportunities';
import { locations, deadlineFilters } from '@/data/opportunities';

interface FilterSidebarProps {
  selectedTypes: OpportunityType[];
  onTypeChange: (types: OpportunityType[]) => void;
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
  selectedDeadlines: string[];
  onDeadlineChange: (deadlines: string[]) => void;
}

const opportunityTypes: { value: OpportunityType; label: string; color: string }[] = [
  { value: 'scholarship', label: 'Scholarships', color: 'bg-scholarship' },
  { value: 'internship', label: 'Internships', color: 'bg-internship' },
  { value: 'summit', label: 'Summits', color: 'bg-summit' },
  { value: 'competition', label: 'Competitions', color: 'bg-competition' },
];

const locationOptions = locations.filter(l => l !== 'All Locations');

export function FilterSidebar({
  selectedTypes,
  onTypeChange,
  selectedLocations,
  onLocationChange,
  selectedDeadlines,
  onDeadlineChange,
}: FilterSidebarProps) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [locationOpen, setLocationOpen] = useState(true);
  const [deadlineOpen, setDeadlineOpen] = useState(true);

  const toggleType = (type: OpportunityType) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      onLocationChange(selectedLocations.filter((l) => l !== location));
    } else {
      onLocationChange([...selectedLocations, location]);
    }
  };

  const toggleDeadline = (deadline: string) => {
    if (selectedDeadlines.includes(deadline)) {
      onDeadlineChange(selectedDeadlines.filter((d) => d !== deadline));
    } else {
      onDeadlineChange([...selectedDeadlines, deadline]);
    }
  };

  const clearFilters = () => {
    onTypeChange([]);
    onLocationChange([]);
    onDeadlineChange([]);
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedLocations.length > 0 ||
    selectedDeadlines.length > 0;

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-card rounded-xl border border-border/50 shadow-card p-5 sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {/* Category Filter */}
          <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <span>Category</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  categoryOpen && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-3">
              <div className="space-y-2">
                {opportunityTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center gap-3 px-1 py-1.5 rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <Checkbox
                      checked={selectedTypes.includes(type.value)}
                      onCheckedChange={() => toggleType(type.value)}
                    />
                    <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', type.color)} />
                    <span className="text-sm text-foreground">{type.label}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border" />

          {/* Location Filter */}
          <Collapsible open={locationOpen} onOpenChange={setLocationOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <span>Location</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  locationOpen && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-3">
              <div className="space-y-2">
                {locationOptions.map((location) => (
                  <label
                    key={location}
                    className="flex items-center gap-3 px-1 py-1.5 rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <Checkbox
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => toggleLocation(location)}
                    />
                    <span className="text-sm text-foreground">{location}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border" />

          {/* Deadline Filter */}
          <Collapsible open={deadlineOpen} onOpenChange={setDeadlineOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <span>Deadline</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  deadlineOpen && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-3">
              <div className="space-y-2">
                {deadlineFilters.filter(f => f.value !== 'all').map((filter) => (
                  <label
                    key={filter.value}
                    className="flex items-center gap-3 px-1 py-1.5 rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <Checkbox
                      checked={selectedDeadlines.includes(filter.value)}
                      onCheckedChange={() => toggleDeadline(filter.value)}
                    />
                    <span className="text-sm text-foreground">{filter.label}</span>
                  </label>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </aside>
  );
}
