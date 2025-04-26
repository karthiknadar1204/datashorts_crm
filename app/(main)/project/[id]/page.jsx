"use client";

import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { projects } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProjectPage({ params }) {
  const [project, setProject] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const [projectData] = await db
          .select()
          .from(projects)
          .where(eq(projects.id, params.id));

        if (!projectData) {
          router.push("/projects");
          return;
        }

        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
        router.push("/projects");
      }
    };

    fetchProject();
  }, [params.id, router]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {project.logo && (
          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
            <Image
              src={project.logo}
              alt={`${project.name} logo`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          {project.description && (
            <p className="text-muted-foreground">{project.description}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Kanban Board</h2>
        {/* Kanban board content will go here */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">To Do</h3>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">In Progress</h3>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">In Review</h3>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Done</h3>
          </div>
        </div>
      </div>
    </div>
  );
} 