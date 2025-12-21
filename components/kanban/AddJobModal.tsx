"use client";

import React, { useState } from "react";
import { JobStatus, Priority } from "@/types/job";
import { useJobStore } from "@/store/useJobStore";
import { X } from "lucide-react";

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus: JobStatus;
}

export const AddJobModal = ({
  isOpen,
  onClose,
  defaultStatus,
}: AddJobModalProps) => {
  const addJob = useJobStore((state) => state.addJob);

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    salary: "",
    date: new Date().toISOString().split("T")[0],
    priority: "Medium" as Priority,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      ...formData,
      status: defaultStatus,
    });
    onClose();
    setFormData({
      company: "",
      title: "",
      salary: "",
      date: new Date().toISOString().split("T")[0],
      priority: "Medium",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Add New Opportunity</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">
              Company
            </label>
            <input
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">
              Job Title
            </label>
            <input
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">
                Salary
              </label>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. $140k - $180k"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">
                Priority
              </label>
              <select
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as Priority,
                  })
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
          >
            Add to {defaultStatus}
          </button>
        </form>
      </div>
    </div>
  );
};
