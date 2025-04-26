"use client";

import { useSidebarStore } from "@/lib/store";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, ListTodo, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import WorkspaceSwitcher from "./workspace-switcher";
import { useUser } from "@clerk/nextjs";
import CreateProjectModal from "./create-project-modal";
import ProjectList from "./project-list";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    {
      title: "My Tasks",
      href: "/tasks",
      icon: ListTodo,
    },
    {
      title: "Members",
      href: "/members",
      icon: Users,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: LayoutDashboard,
    },
  ];

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-screen border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-50 rounded-full border bg-background"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      <div className="flex h-full flex-col space-y-4 p-4">
        <div className="mb-4">
          <WorkspaceSwitcher userId={user?.id} />
        </div>
        <nav className="flex-1 space-y-1">
          <div className="space-y-1">
            <Link
              href="/tasks"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                pathname === "/tasks" ? "bg-accent" : "transparent"
              )}
            >
              <ListTodo className="h-4 w-4" />
              <span>My Tasks</span>
            </Link>
            <Link
              href="/members"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                pathname === "/members" ? "bg-accent" : "transparent"
              )}
            >
              <Users className="h-4 w-4" />
              <span>Members</span>
            </Link>
            <ProjectList />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 