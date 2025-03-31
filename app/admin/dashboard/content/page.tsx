import { ContentManager } from "@/components/admin/content-manager";

export default function ContentManagementPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      <ContentManager />
    </div>
  );
}
