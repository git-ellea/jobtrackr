"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Job, JobStatus } from "@/types/job";
import { JobCard } from "./JobCard";
import { Plus } from "lucide-react";

interface ColumnProps {
  title: JobStatus;
  jobs: Job[];
  onAddClick: (status: JobStatus) => void;
}

export const Column = ({ title, jobs, onAddClick }: ColumnProps) => {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-900/50 bg-slate-900/10 p-3 md:p-4">
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-slate-200 tracking-tight">{title}</h2>
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-800 px-1.5 text-[10px] font-bold text-slate-400">
            {jobs.length}
          </span>
        </div>
        <button
          onClick={() => onAddClick(title)}
          className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Plus size={18} />
        </button>
      </div>

      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 overflow-y-auto overflow-x-hidden px-1 custom-scrollbar transition-colors duration-200 ${
              snapshot.isDraggingOver ? "rounded-xl bg-blue-500/5" : ""
            }`}
          >
            <div className="flex flex-col gap-3">
              {jobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
