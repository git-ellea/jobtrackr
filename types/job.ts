export type JobStatus = "Wishlist" | "Applied" | "Interview" | "Offer";
export type Priority = "High" | "Medium" | "Low";

export interface Job {
  id: string;
  company: string;
  title: string;
  salary: string;
  date: string;
  status: JobStatus;
  priority: Priority;
}
