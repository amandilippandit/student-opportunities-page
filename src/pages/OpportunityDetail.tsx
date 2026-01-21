import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryBadge } from '@/components/CategoryBadge';
import { opportunities } from '@/data/opportunities';

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const opportunity = opportunities.find((opp) => opp.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Opportunity not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleApply = () => {
    window.open(opportunity.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="container py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to opportunities
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container -mt-20 relative z-10 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border/50 shadow-card p-6 md:p-8">
            {/* Category and Amount */}
            <div className="flex items-center justify-between mb-4">
              <CategoryBadge type={opportunity.type} />
              {opportunity.amount && (
                <span className="text-lg font-bold text-primary">
                  {opportunity.amount}
                </span>
              )}
            </div>

            {/* Title and Organization */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {opportunity.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {opportunity.organization}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>Deadline: {formatDate(opportunity.deadline)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{opportunity.location}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {opportunity.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">About this opportunity</h2>
              <p className="text-muted-foreground leading-relaxed">
                {opportunity.fullDescription}
              </p>
            </div>

            {/* Apply Button */}
            <Button
              onClick={handleApply}
              size="lg"
              className="w-full md:w-auto gap-2 font-semibold"
            >
              Apply Now
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
