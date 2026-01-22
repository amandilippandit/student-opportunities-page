import { useState, useMemo, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FilterSidebar } from '@/components/FilterSidebar';
import { OpportunityCard } from '@/components/OpportunityCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { opportunities, type OpportunityType } from '@/data/opportunities';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<OpportunityType[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDeadlines, setSelectedDeadlines] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        opp.title.toLowerCase().includes(searchLower) ||
        opp.organization.toLowerCase().includes(searchLower) ||
        opp.description.toLowerCase().includes(searchLower) ||
        opp.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(opp.type);

      // Location filter (now multi-select)
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.some((loc) => {
          if (loc === 'International') {
            return opp.location !== 'United States';
          }
          if (loc === 'Global') {
            return opp.location === 'Global';
          }
          return opp.location.toLowerCase().includes(loc.toLowerCase());
        });

      // Deadline filter (now multi-select)
      let matchesDeadline = selectedDeadlines.length === 0;
      if (!matchesDeadline) {
        const deadlineDate = new Date(opp.deadline);
        const today = new Date();
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        matchesDeadline = selectedDeadlines.some((deadline) => {
          const days = parseInt(deadline);
          return diffDays >= 0 && diffDays <= days;
        });
      }

      return matchesSearch && matchesType && matchesLocation && matchesDeadline;
    });
  }, [searchQuery, selectedTypes, selectedLocations, selectedDeadlines]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile/Tablet Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <Menu className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <div className="mt-8">
                  <FilterSidebar
                    selectedTypes={selectedTypes}
                    onTypeChange={setSelectedTypes}
                    selectedLocations={selectedLocations}
                    onLocationChange={setSelectedLocations}
                    selectedDeadlines={selectedDeadlines}
                    onDeadlineChange={setSelectedDeadlines}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:w-64 shrink-0">
            <FilterSidebar
              selectedTypes={selectedTypes}
              onTypeChange={setSelectedTypes}
              selectedLocations={selectedLocations}
              onLocationChange={setSelectedLocations}
              selectedDeadlines={selectedDeadlines}
              onDeadlineChange={setSelectedDeadlines}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'Result' : 'Results'}
              </h2>
            </div>

            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredOpportunities.map((opportunity, index) => (
                  <div
                    key={opportunity.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <OpportunityCard opportunity={opportunity} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-2">No opportunities found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
