import { pgTable as table, text, timestamp, serial } from "drizzle-orm/pg-core";

export const feedbacks = table("feedbacks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),

  social: text("social"),
  url: text("url"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertFeedback = typeof feedbacks.$inferInsert;
export type Feedback = typeof feedbacks.$inferSelect;
