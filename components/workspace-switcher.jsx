"use client";

import { useWorkspaceStore } from "@/lib/store";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { db } from "@/configs/db";
import { organizations } from "@/configs/schema";
import { eq } from "drizzle-orm";

const WorkspaceSwitcher = ({ userId }) => {
  const { currentWorkspace, workspaces, setCurrentWorkspace, setWorkspaces } = useWorkspaceStore();
  const router = useRouter();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!userId) return;
      
      const userWorkspaces = await db.select().from(organizations).where(eq(organizations.createdById, userId));
      setWorkspaces(userWorkspaces);
      
      if (userWorkspaces.length > 0 && !currentWorkspace) {
        setCurrentWorkspace(userWorkspaces[0]);
      }
    };

    fetchWorkspaces();
  }, [userId, setWorkspaces, setCurrentWorkspace, currentWorkspace]);

  const handleWorkspaceChange = (workspace) => {
    setCurrentWorkspace(workspace);
    router.push(`/agency/${workspace.id}`);
  };

  if (!currentWorkspace) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Building2 className="h-4 w-4" />
          <span className="truncate">{currentWorkspace.name}</span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => handleWorkspaceChange(workspace)}
            className="flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            <span>{workspace.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher; 