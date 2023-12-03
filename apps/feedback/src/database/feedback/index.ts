import { type Feedback, type InsertFeedback, feedbacks } from "./schema";
import { database } from "..";

export function insert(data: InsertFeedback) {
  return database.insert(feedbacks).values(data).returning();
}
