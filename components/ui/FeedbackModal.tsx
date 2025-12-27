"use client";

import { useState } from "react";
import {
  MessageSquare,
  X,
  Send,
  User,
  Mail,
  Github,
  CheckCircle2,
} from "lucide-react";

export const FeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
          setIsOpen(false);
        }, 3000);
      }
    } catch (error) {
      setFormData({ name: "", email: "", message: "" });
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-87.5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between bg-slate-800/50 px-5 py-4">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Send Feedback
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <CheckCircle2 size={40} className="text-emerald-500 mb-3" />
              <p className="text-sm font-medium text-slate-200">
                Thanks for the feedback!
              </p>
              <p className="text-xs text-slate-500 mt-1">
                I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3 top-3 text-slate-500"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-3 text-slate-500"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition-all"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <textarea
                  required
                  placeholder="Tell me what you think..."
                  className="h-28 w-full resize-none rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition-all"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="https://github.com/git-ellea/jobtrackr"
                  target="_blank"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                >
                  <Github size={14} /> GitHub Repo
                </a>

                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send <Send size={12} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 shadow-2xl transition-all hover:scale-110 hover:border-slate-700 hover:text-white active:scale-95 ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};
