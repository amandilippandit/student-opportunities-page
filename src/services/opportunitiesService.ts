import { supabase } from '@/integrations/supabase/client';

export type OpportunityType = 'scholarship' | 'internship' | 'summit' | 'competition';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  description: string;
  full_description: string;
  deadline: string;
  location: string;
  amount?: string;
  url: string;
  tags: string[];
  image_url?: string;
}

export interface OpportunityInput {
  title: string;
  organization: string;
  type: OpportunityType;
  description: string;
  full_description: string;
  deadline: string;
  location: string;
  amount?: string;
  url: string;
  image_url?: string;
  tags: string[];
}

export const opportunitiesService = {
  async fetchOpportunities(): Promise<Opportunity[]> {
    const { data: opportunities, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('deadline', { ascending: true });

    if (error) throw error;

    const enriched = await Promise.all(
      (opportunities || []).map(async (opp) => {
        const { data: tags } = await supabase
          .from('opportunity_tags')
          .select('tags(name)')
          .eq('opportunity_id', opp.id);

        return {
          ...opp,
          id: opp.id,
          full_description: opp.full_description,
          image_url: opp.image_url,
          tags: (tags || []).map((t: any) => t.tags?.name).filter(Boolean),
        };
      })
    );

    return enriched;
  },

  async fetchOpportunityById(id: string): Promise<Opportunity | null> {
    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!opportunity) return null;

    const { data: tags } = await supabase
      .from('opportunity_tags')
      .select('tags(name)')
      .eq('opportunity_id', id);

    return {
      ...opportunity,
      id: opportunity.id,
      full_description: opportunity.full_description,
      image_url: opportunity.image_url,
      tags: (tags || []).map((t: any) => t.tags?.name).filter(Boolean),
    };
  },

  async createOpportunity(input: OpportunityInput): Promise<Opportunity> {
    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .insert({
        title: input.title,
        organization: input.organization,
        type: input.type,
        description: input.description,
        full_description: input.full_description,
        deadline: input.deadline,
        location: input.location,
        amount: input.amount || null,
        url: input.url,
        image_url: input.image_url || null,
      })
      .select()
      .single();

    if (error) throw error;

    // Handle tags
    if (input.tags && input.tags.length > 0) {
      await this.updateOpportunityTags(opportunity.id, input.tags);
    }

    return {
      ...opportunity,
      full_description: opportunity.full_description,
      image_url: opportunity.image_url,
      tags: input.tags || [],
    };
  },

  async updateOpportunity(id: string, input: Partial<OpportunityInput>): Promise<Opportunity> {
    const updateData: any = {};

    if (input.title !== undefined) updateData.title = input.title;
    if (input.organization !== undefined) updateData.organization = input.organization;
    if (input.type !== undefined) updateData.type = input.type;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.full_description !== undefined) updateData.full_description = input.full_description;
    if (input.deadline !== undefined) updateData.deadline = input.deadline;
    if (input.location !== undefined) updateData.location = input.location;
    if (input.amount !== undefined) updateData.amount = input.amount || null;
    if (input.url !== undefined) updateData.url = input.url;
    if (input.image_url !== undefined) updateData.image_url = input.image_url || null;

    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (input.tags !== undefined) {
      await this.updateOpportunityTags(id, input.tags);
    }

    const tags = input.tags || [];

    return {
      ...opportunity,
      full_description: opportunity.full_description,
      image_url: opportunity.image_url,
      tags,
    };
  },

  async deleteOpportunity(id: string): Promise<void> {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateOpportunityTags(opportunityId: string, tagNames: string[]): Promise<void> {
    // Delete existing tags
    await supabase
      .from('opportunity_tags')
      .delete()
      .eq('opportunity_id', opportunityId);

    if (tagNames.length === 0) return;

    // Ensure all tags exist
    const tagIds: string[] = [];
    for (const name of tagNames) {
      let { data: tag, error: selectError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', name)
        .maybeSingle();

      if (selectError) throw selectError;

      if (!tag) {
        const { data: newTag, error: insertError } = await supabase
          .from('tags')
          .insert({ name })
          .select()
          .single();

        if (insertError) throw insertError;
        tagIds.push(newTag.id);
      } else {
        tagIds.push(tag.id);
      }
    }

    // Link tags to opportunity
    const tagLinks = tagIds.map((tagId) => ({
      opportunity_id: opportunityId,
      tag_id: tagId,
    }));

    const { error: linkError } = await supabase
      .from('opportunity_tags')
      .insert(tagLinks);

    if (linkError) throw linkError;
  },

  async getAllTags(): Promise<string[]> {
    const { data: tags, error } = await supabase
      .from('tags')
      .select('name')
      .order('name', { ascending: true });

    if (error) throw error;
    return (tags || []).map((t) => t.name);
  },
};
