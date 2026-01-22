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
      className="group bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-border/50 cursor-pointer overflow-hidden"
    >
      <div className="relative h-20 md:h-40 overflow-hidden">
        <img 
          src={opportunity.image} 
          alt={opportunity.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-1.5 left-1.5 md:top-3 md:left-3">
          <CategoryBadge type={opportunity.type} size="sm" />
        </div>
        {opportunity.amount && (
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3 bg-card/90 backdrop-blur-sm px-1 py-0.5 md:px-2 md:py-1 rounded-md">
            <span className="text-[10px] md:text-sm font-semibold text-primary">
              {opportunity.amount}
            </span>
          </div>
        )}
      </div>

      <CardHeader className="p-2 md:pb-2 md:pt-4 md:px-6">
        <h3 className="text-xs md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
          {opportunity.title}
        </h3>
        <p className="text-[10px] md:text-sm text-muted-foreground font-medium leading-tight">
          {opportunity.organization}
        </p>
      </CardHeader>

      <CardContent className="hidden md:block pt-0 px-3 md:px-6">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {opportunity.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {opportunity.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-2 md:pt-2 md:pb-4 md:px-6">
        <p className="text-[10px] md:text-xs text-muted-foreground">
          View details →
        </p>
      </CardFooter>
    </Card>
  );
}
