import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { Job, JobStatus } from "@/types/job";

interface JobState {
  jobs: Job[];
  addJob: (jobData: Omit<Job, "id">) => void;
  deleteJob: (id: string) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
  reorderJobs: (jobs: Job[]) => void;
}

export const useJobStore = create<JobState>()(
  persist(
    (set) => ({
      jobs: [],
      addJob: (jobData) =>
        set((state) => ({
          jobs: [{ ...jobData, id: uuidv4() }, ...state.jobs],
        })),
      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        })),
      updateJobStatus: (id, status) =>
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
        })),
      reorderJobs: (newJobs) => set({ jobs: newJobs }),
    }),
    { name: "jobtrackr-storage" }
  )
);
