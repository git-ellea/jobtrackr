import { Draggable } from "@hello-pangea/dnd";
import { Job } from "@/types/job";
import { Building2, Calendar, DollarSign, Trash2 } from "lucide-react";
import { useJobStore } from "@/store/useJobStore";

const priorityColors = {
  High: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export const JobCard = ({ job, index }: { job: Job; index: number }) => {
  const deleteJob = useJobStore((state) => state.deleteJob);

  if (!job.id) {
    console.error("Job missing ID:", job);
    return null;
  }

  return (
    <Draggable draggableId={job.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative mb-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/5 ${
            snapshot.isDragging
              ? "border-blue-500/50 bg-slate-800 ring-2 ring-blue-500/20"
              : ""
          }`}
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-slate-100">{job.title}</h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <Building2 size={14} />
                <span>{job.company}</span>
              </div>
            </div>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                priorityColors[job.priority]
              }`}
            >
              {job.priority}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <DollarSign size={12} />
              <span>{job.salary}</span> 
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(job.date).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={() => deleteJob(job.id)}
            className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100 hover:text-rose-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </Draggable>
  );
};
