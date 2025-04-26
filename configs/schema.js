import { pgTable, text, timestamp, uniqueIndex, integer } from 'drizzle-orm/pg-core';

// Enums
export const SprintStatus = {
  PLANNED: 'PLANNED',
  ACTIVE: 'ACTIVE', 
  COMPLETED: 'COMPLETED'
};

export const IssueStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE'
};

export const IssuePriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

// Tables
export const users = pgTable('users', {
  id: text('id').primaryKey().notNull(),
  clerkUserId: text('clerk_user_id').unique().notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  phoneNumber: text('phone_number'),
  buildingName: text('building_name'),
  locality: text('locality'),
  streetName: text('street_name'),
  pincode: text('pincode'),
  createdById: text('created_by_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const projects = pgTable('projects', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  email: text('email'),
  phoneNumber: text('phone_number'),
  logo: text('logo'),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const sprints = pgTable('sprints', {
  id: text('id').primaryKey().notNull(),
  name: text('name').unique().notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: text('status', { enum: Object.values(SprintStatus) }).default(SprintStatus.PLANNED).notNull(),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const issues = pgTable('issues', {
  id: text('id').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: Object.values(IssueStatus) }).notNull(),
  order: integer('order').notNull(),
  priority: text('priority', { enum: Object.values(IssuePriority) }).notNull(),
  assigneeId: text('assignee_id').references(() => users.id),
  reporterId: text('reporter_id')
    .notNull()
    .references(() => users.id),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  sprintId: text('sprint_id')
    .references(() => sprints.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull()
}, (table) => {
  return {
    statusOrderIdx: uniqueIndex('status_order_idx').on(table.status, table.order)
  };
});
