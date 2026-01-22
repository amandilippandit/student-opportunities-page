import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { opportunitiesService, type Opportunity, type OpportunityType } from '@/services/opportunitiesService';
import { seedDatabase } from '@/lib/seedDatabase';

export default function OpportunitiesCMS() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    type: 'scholarship' as OpportunityType,
    description: '',
    full_description: '',
    deadline: '',
    location: '',
    amount: '',
    url: '',
    image_url: '',
    tags: [] as string[],
  });

  useEffect(() => {
    loadOpportunities();
    loadTags();
  }, []);

  async function loadOpportunities() {
    try {
      setLoading(true);
      const data = await opportunitiesService.fetchOpportunities();
      setOpportunities(data);
    } catch (error) {
      toast.error('Failed to load opportunities');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadTags() {
    try {
      const tags = await opportunitiesService.getAllTags();
      setAllTags(tags);
    } catch (error) {
      console.error('Failed to load tags:', error);
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      organization: '',
      type: 'scholarship',
      description: '',
      full_description: '',
      deadline: '',
      location: '',
      amount: '',
      url: '',
      image_url: '',
      tags: [],
    });
    setEditingId(null);
  }

  function openEditDialog(opp: Opportunity) {
    setFormData({
      title: opp.title,
      organization: opp.organization,
      type: opp.type,
      description: opp.description,
      full_description: opp.full_description,
      deadline: opp.deadline,
      location: opp.location,
      amount: opp.amount || '',
      url: opp.url,
      image_url: opp.image_url || '',
      tags: opp.tags,
    });
    setEditingId(opp.id);
    setDialogOpen(true);
  }

  async function handleSubmit() {
    if (!formData.title || !formData.organization || !formData.deadline || !formData.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await opportunitiesService.updateOpportunity(editingId, formData);
        toast.success('Opportunity updated');
      } else {
        await opportunitiesService.createOpportunity(formData);
        toast.success('Opportunity created');
      }

      await loadOpportunities();
      await loadTags();
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingId ? 'Failed to update opportunity' : 'Failed to create opportunity');
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;

    try {
      await opportunitiesService.deleteOpportunity(id);
      toast.success('Opportunity deleted');
      await loadOpportunities();
    } catch (error) {
      toast.error('Failed to delete opportunity');
      console.error(error);
    }
  }

  function toggleTag(tag: string) {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  }

  async function handleSeed() {
    if (!confirm('This will populate the database with 12 sample opportunities. Continue?')) return;

    try {
      await seedDatabase();
      toast.success('Database seeded successfully!');
      await loadOpportunities();
      await loadTags();
    } catch (error) {
      toast.error('Failed to seed database');
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Opportunities CMS</h1>
          <div className="flex gap-2">
            {opportunities.length === 0 && (
              <Button
                onClick={handleSeed}
                variant="secondary"
                className="gap-2"
              >
                <Zap className="h-4 w-4" />
                Seed Sample Data
              </Button>
            )}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Opportunity' : 'Create Opportunity'}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Opportunity title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Organization *</label>
                  <Input
                    value={formData.organization}
                    onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                    placeholder="Organization name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type *</label>
                    <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as OpportunityType }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scholarship">Scholarship</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="summit">Summit</SelectItem>
                        <SelectItem value="competition">Competition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline *</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Short Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description (displayed on cards)"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Description *</label>
                  <Textarea
                    value={formData.full_description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, full_description: e.target.value }))}
                    placeholder="Detailed description (displayed on detail page)"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., United States, Global"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <Input
                      value={formData.amount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder="e.g., $8,000/month"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL *</label>
                  <Input
                    value={formData.url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com"
                    type="url"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-secondary/50">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                          formData.tags.includes(tag)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <input
                      type="text"
                      placeholder="Add new tag"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const newTag = (e.target as HTMLInputElement).value.trim();
                          if (newTag && !formData.tags.includes(newTag)) {
                            toggleTag(newTag);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                      className="flex-1 min-w-[100px] px-2 py-1 text-xs bg-background border rounded-md outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>{editingId ? 'Update' : 'Create'}</Button>
                </div>
              </div>
            </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading opportunities...</div>
        ) : (
          <div className="grid gap-4">
            {opportunities.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">No opportunities yet. Create one to get started!</Card>
            ) : (
              opportunities.map((opp) => (
                <Card key={opp.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{opp.title}</h3>
                        <p className="text-sm text-muted-foreground">{opp.organization}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(opp)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(opp.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {opp.type}
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span> {opp.deadline}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {opp.location}
                      </div>
                      {opp.amount && (
                        <div>
                          <span className="font-medium">Amount:</span> {opp.amount}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{opp.description}</p>
                    {opp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {opp.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
