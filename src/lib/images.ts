import scholarshipImg from '@/assets/scholarship.jpg';
import internshipImg from '@/assets/internship.jpg';
import summitImg from '@/assets/summit.jpg';
import competitionImg from '@/assets/competition.jpg';
import type { OpportunityType } from '@/services/opportunitiesService';

export const typeImages: Record<OpportunityType, string> = {
  scholarship: scholarshipImg,
  internship: internshipImg,
  summit: summitImg,
  competition: competitionImg,
};

export function getOpportunityImage(type: OpportunityType, customUrl?: string | null): string {
  return customUrl || typeImages[type];
}
