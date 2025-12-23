"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useJobStore } from "@/store/useJobStore";
import { Column } from "@/components/kanban/Column";
import { AddJobModal } from "@/components/kanban/AddJobModal";
import { JobStatus } from "@/types/job";
import { Briefcase } from "lucide-react";

const COLUMNS: JobStatus[] = ["Wishlist", "Applied", "Interview", "Offer"];

export default function KanbanPage() {
  const { jobs, updateJobStatus } = useJobStore();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<JobStatus>("Wishlist");

  useEffect(() => setMounted(true), []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    updateJobStatus(draggableId, destination.droppableId as JobStatus);
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen flex-col bg-[#020617]">
      <header className="shrink-0 border-b border-slate-900 bg-slate-950/50 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-400 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">
                JobTrackr
              </h1>
              <p className="text-xs text-slate-500">Pipeline Overview</p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar sm:gap-8">
            {COLUMNS.map((col) => (
              <div
                key={col}
                className="shrink-0 border-l border-slate-800 pl-4 first:border-none first:pl-0"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {col}
                </p>
                <p className="text-lg font-semibold text-slate-200">
                  {jobs.filter((j) => j.status === col).length}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 overflow-x-auto px-4 py-6 md:px-8 custom-scrollbar">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-full min-w-max gap-4 md:gap-6 lg:min-w-0 lg:grid lg:grid-cols-4">
              {COLUMNS.map((status) => (
                <div
                  key={status}
                  className="w-[85vw] sm:w-95 lg:w-full h-full"
                >
                  <Column
                    title={status}
                    jobs={jobs.filter((j) => j.status === status)}
                    onAddClick={(s) => {
                      setActiveStatus(s);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </main>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultStatus={activeStatus}
      />
    </div>
  );
}
