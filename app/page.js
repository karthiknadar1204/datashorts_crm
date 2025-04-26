import React from 'react'
import { Button } from '@/components/ui/button'
import { SignedOut, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

const page = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 gradient-title">
          Streamline Your Project Management
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A powerful project management tool that helps you organize tasks, track progress, and collaborate with your team.
        </p>
        <div className="flex justify-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button size="lg">Get Started</Button>
            </SignInButton>
          </SignedOut>
          <Link href="/onboarding">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Project Management</h3>
            <p className="text-muted-foreground">
              Create and manage projects with ease. Track progress and keep everything organized.
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Issue Tracking</h3>
            <p className="text-muted-foreground">
              Track issues, assign tasks, and monitor progress with our intuitive interface.
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Sprint Planning</h3>
            <p className="text-muted-foreground">
              Plan and manage sprints effectively. Keep your team aligned and productive.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page