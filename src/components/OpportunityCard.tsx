import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CategoryBadge } from './CategoryBadge';
import type { Opportunity } from '@/data/opportunities';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/opportunity/${opportunity.id}`);
  };

  return (
    <Card 
      onClick={handleClick}
      className="group h-full flex flex-col bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-border/50 cursor-pointer overflow-hidden"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={opportunity.image} 
          alt={opportunity.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge type={opportunity.type} size="sm" />
        </div>
        {opportunity.amount && (
          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-sm font-semibold text-primary">
              {opportunity.amount}
            </span>
          </div>
        )}
      </div>

      <CardHeader className="pb-2 pt-4">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">
          {opportunity.organization}
        </p>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {opportunity.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <p className="text-xs text-muted-foreground">
          Click to view details →
        </p>
      </CardFooter>
    </Card>
  );
}
