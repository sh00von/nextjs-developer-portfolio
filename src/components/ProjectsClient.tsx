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
      <div className="mb-6">
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

      <p className="mb-4 text-xs text-[var(--muted-3)]" aria-live="polite">
        Showing {visibleProjects.length} of {projects.length} projects
      </p>

      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => {
          const external = project.link.startsWith("http");
          return (
            <article key={project.id} className="group relative flex flex-col">
              <button
                type="button"
                onClick={() => setLightbox(project.image)}
                className="relative z-10 block aspect-[16/10] w-full overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--border)] text-left"
                aria-label={`View full screenshot of ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  unoptimized={project.image.startsWith("/api/")}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                />
              </button>

              <div className="mt-4 flex flex-1 flex-col">
                <p className="text-xs text-[var(--muted-3)]">{project.categories.join(" · ")}</p>
                <h2 className="mt-1 flex items-center gap-1.5 font-medium text-[var(--text)]">
                  <a
                    href={project.link}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="after:absolute after:inset-0 focus:outline-none"
                  >
                    {project.title}
                  </a>
                  <span className="text-[var(--muted-3)] opacity-0 transition-opacity group-hover:opacity-100 [&_svg]:h-3.5 [&_svg]:w-3.5">
                    <ArrowUpRightIcon />
                  </span>
                </h2>
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[var(--muted-2)]">{project.description}</p>
                <p className="mt-3 font-mono text-[11px] text-[var(--muted-3)]">{project.tags.slice(0, 4).join(" · ")}</p>
              </div>
            </article>
          );
        })}
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
            unoptimized={lightbox.startsWith("/api/")}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}

