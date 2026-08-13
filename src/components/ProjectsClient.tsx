"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { filters, ProjectCategory, projects } from "@/data/projects";
import { ArrowUpRightIcon, CloseIcon } from "./icons";

export function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const lightboxCloseBtnRef = useRef<HTMLButtonElement>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) =>
      project.categories.some((category) => category === (activeFilter as ProjectCategory)),
    );
  }, [activeFilter]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    lightboxCloseBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <>
      <div className="mb-8 pt-3">
        <div
          className="filter-pills mb-0"
          id="filter-pills"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`pill ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
        {visibleProjects.map((project) => (
          <article key={project.id} className="py-7">
            <div className="flex gap-4 sm:gap-6 items-start">
              <span className="project-num pt-1 flex-shrink-0" aria-hidden="true">
                {project.num}
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <a
                    href={project.link || "#"}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (!project.link && project.image) {
                        e.preventDefault();
                        setLightbox(project.image);
                      }
                    }}
                    className="group/title inline-flex items-center gap-2 text-left"
                  >
                    <h2 className="project-title text-lg font-bold text-[var(--text)] group-hover/title:text-[var(--muted-2)] transition-colors">
                      {project.title}
                    </h2>
                  </a>

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-arrow-link p-1 text-[var(--muted-3)] hover:text-[var(--text)] transition-colors flex-shrink-0"
                      aria-label={`Open ${project.title} in new tab`}
                    >
                      <ArrowUpRightIcon />
                    </a>
                  ) : project.image ? (
                    <button
                      type="button"
                      onClick={() => setLightbox(project.image)}
                      className="project-arrow-link p-1 text-[var(--muted-3)] hover:text-[var(--text)] transition-colors flex-shrink-0"
                      aria-label={`View screenshot of ${project.title}`}
                    >
                      <ArrowUpRightIcon />
                    </button>
                  ) : null}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                  {project.image ? (
                    <button
                      type="button"
                      onClick={() => setLightbox(project.image)}
                      className="group/img relative block w-full sm:w-[220px] md:w-[260px] aspect-[16/10] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] text-left transition-all hover:border-[var(--border-hover)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#a3e635] flex-shrink-0"
                      aria-label={`View full screenshot of ${project.title}`}
                    >
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                        sizes="(max-width: 640px) 100vw, 260px"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover/img:bg-black/15 flex items-end justify-end p-2">
                        <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/75 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-xs">
                          Expand
                        </span>
                      </div>
                    </button>
                  ) : null}

                  <div className="flex-1 min-w-0">
                    <p className="project-desc text-sm text-[var(--muted-2)] leading-relaxed">
                      {project.description}
                    </p>
                    <div className="project-tags flex flex-wrap gap-1.5 mt-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/[0.92] backdrop-blur-md"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
          }}
        >
          <button
            ref={lightboxCloseBtnRef}
            type="button"
            className="absolute top-5 right-5 border-0 bg-transparent text-[#EDEDED] transition-colors hover:text-[#a1a1a1]"
            aria-label="Close lightbox"
            onClick={() => setLightbox(null)}
          >
            <CloseIcon />
          </button>
          <Image
            src={lightbox}
            alt="Project screenshot"
            width={1400}
            height={1000}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}

