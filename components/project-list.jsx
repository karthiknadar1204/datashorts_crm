"use client";

import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { projects } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/lib/store";
import { FolderKanban, ChevronDown, ChevronRight, Plus } from "lucide-react";
import CreateProjectModal from "./create-project-modal";

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { currentWorkspace } = useWorkspaceStore();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!currentWorkspace) return;
      
      const projectsList = await db
        .select()
        .from(projects)
        .where(eq(projects.organizationId, currentWorkspace.id));
      
      setProjectList(projectsList);
    };

    fetchProjects();
  }, [currentWorkspace]);

  if (!currentWorkspace) return null;

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <span>Projects</span>
      </button>
      
      {isOpen && (
        <div className="ml-4 space-y-1">
          {projectList.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">No projects yet</p>
          ) : (
            projectList.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  pathname === `/project/${project.id}` ? "bg-accent" : "transparent"
                )}
              >
                <FolderKanban className="h-4 w-4" />
                <span className="truncate">{project.name}</span>
              </Link>
            ))
          )}
          <CreateProjectModal>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <Plus className="h-4 w-4" />
              <span>Create Project</span>
            </button>
          </CreateProjectModal>
        </div>
      )}
    </div>
  );
} 