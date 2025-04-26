"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useWorkspaceStore } from "@/lib/store";
import { db } from "@/configs/db";
import { organizations } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { FolderKanban, ListTodo, CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function AgencyPage({ params }) {
  const { user } = useUser();
  const { setCurrentWorkspace } = useWorkspaceStore();
  const router = useRouter();

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!user) return;

      const [workspace] = await db.select().from(organizations).where(eq(organizations.id, params.workspaceId));
      
      if (!workspace) {
        router.push("/");
        return;
      }

      setCurrentWorkspace(workspace);
    };

    fetchWorkspace();
  }, [user, params.workspaceId, setCurrentWorkspace, router]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Workspace Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderKanban className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ListTodo className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <h3 className="text-2xl font-bold">156</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Tasks</p>
                  <h3 className="text-2xl font-bold">89</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Tasks</p>
                  <h3 className="text-2xl font-bold">45</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overdue Tasks</p>
                  <h3 className="text-2xl font-bold">22</h3>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 