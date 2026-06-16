import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  useGetAdminSession, 
  useAdminLogout, 
  useListContactSubmissions, 
  useListServices, 
  useListContentSections,
  useCreateService,
  useDeleteService,
  useUpdateContentSection
} from "@workspace/api-client-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, HardHat, Plus, Trash2, Mail, LayoutTemplate, Box, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Label } from "recharts";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Auth Check
  const { data: session, isLoading: sessionLoading } = useGetAdminSession();
  
  useEffect(() => {
    if (!sessionLoading && (!session || !session.authenticated)) {
      setLocation("/admin");
    }
  }, [session, sessionLoading, setLocation]);

  const logoutMutation = useAdminLogout({
    mutation: {
      onSuccess: () => {
        setLocation("/admin");
      }
    }
  });

  const { data: submissions, isLoading: submissionsLoading } = useListContactSubmissions({
    query: { enabled: session?.authenticated }
  });
  
  const { data: services, refetch: refetchServices } = useListServices({
    query: { enabled: session?.authenticated }
  });
  
  const { data: contentSections, refetch: refetchSections } = useListContentSections({
    query: { enabled: session?.authenticated }
  });

  const deleteService = useDeleteService({
    mutation: {
      onSuccess: () => {
        refetchServices();
        toast({ title: "Service deleted" });
      }
    }
  });

  const updateContent = useUpdateContentSection({
    mutation: {
      onSuccess: () => {
        refetchSections();
        toast({ title: "Content updated successfully" });
      }
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (sessionLoading || !session?.authenticated) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 font-medium">Verifying access...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Admin Header */}
      <header className="bg-secondary text-white border-b border-secondary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardHat className="w-6 h-6 text-primary" />
            <span className="font-bold tracking-widest uppercase">Admin System</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="mb-8 bg-white border border-gray-200">
            <TabsTrigger value="messages" className="data-[state=active]:bg-gray-100 data-[state=active]:text-secondary">
              <Mail className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-gray-100 data-[state=active]:text-secondary">
              <Box className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gray-100 data-[state=active]:text-secondary">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Content Sections
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-secondary">Contact Submissions</h2>
              </div>
              <div className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact Info</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissionsLoading ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-500">Loading messages...</TableCell></TableRow>
                    ) : submissions?.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-500">No messages found.</TableCell></TableRow>
                    ) : (
                      submissions?.map((sub) => (
                        <TableRow key={sub.id}>
                          <TableCell className="whitespace-nowrap font-mono text-sm text-gray-500">
                            {format(new Date(sub.createdAt), 'dd MMM yyyy HH:mm')}
                          </TableCell>
                          <TableCell className="font-medium text-secondary">{sub.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="text-blue-600">{sub.email}</div>
                              {sub.phone && <div className="text-gray-500">{sub.phone}</div>}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{sub.service || '-'}</TableCell>
                          <TableCell className="max-w-md">
                            <p className="truncate text-sm text-gray-600" title={sub.message}>{sub.message}</p>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-secondary">Manage Services</h2>
                <Button size="sm" className="bg-secondary text-white hover:bg-secondary/90">
                  <Plus className="w-4 h-4 mr-2" /> Add Service
                </Button>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services?.map((svc) => (
                      <TableRow key={svc.id}>
                        <TableCell className="font-mono text-sm text-gray-400">#{svc.id}</TableCell>
                        <TableCell className="font-bold text-secondary">{svc.name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{svc.description}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                              if (confirm('Delete this service?')) {
                                deleteService.mutate({ id: svc.id });
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="space-y-6">
              {contentSections?.map((section) => (
                <div key={section.key} className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
                  <h3 className="text-lg font-bold text-secondary mb-4 capitalize">{section.key.replace('_', ' ')}</h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      updateContent.mutate({
                        key: section.key,
                        data: {
                          title: formData.get('title') as string,
                          content: formData.get('content') as string
                        }
                      });
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Title</Label>
                      <Input name="title" defaultValue={section.title} className="bg-gray-50" />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Content</Label>
                      <Textarea 
                        name="content" 
                        defaultValue={section.content} 
                        className="min-h-[100px] bg-gray-50" 
                      />
                    </div>
                    <Button type="submit" size="sm" className="bg-secondary text-white">
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                  </form>
                </div>
              ))}
              {(!contentSections || contentSections.length === 0) && (
                <div className="text-center py-12 text-gray-500 bg-white border border-gray-200">
                  No editable content sections found.
                </div>
              )}
            </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
