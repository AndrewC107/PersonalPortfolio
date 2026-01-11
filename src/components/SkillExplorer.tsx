"use client";

import * as React from "react";
import { ExternalLink, Github } from "lucide-react";

import type { Certification, EducationEntry, ExperienceEntry, Project, SkillGroup } from "@/content/content";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type TabId = "projects" | "experience" | "education" | "certifications";

function normalize(input: string) {
  return input.toLowerCase().trim().replace(/\s+/g, " ");
}

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function skillMatchesQuery(skill: string, query: string) {
  if (!query) return true;
  return normalize(skill).includes(normalize(query));
}

function tagsForProject(p: Project): string[] {
  return p.tech ?? [];
}

function tagsForExperience(x: ExperienceEntry): string[] {
  return unique([...(x.tech ?? []), ...(x.tags ?? [])]);
}

function tagsForEducation(e: EducationEntry): string[] {
  return e.tags ?? [];
}

function tagsForCert(c: Certification): string[] {
  return c.tags ?? [];
}

function hasSkill(tags: string[], selected: string) {
  const sel = normalize(selected);
  return tags.some((t) => normalize(t) === sel);
}

function SegmentedTabs({
  active,
  onChange,
  counts,
  visibleTabs,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
  counts: Record<TabId, number>;
  visibleTabs?: TabId[];
}) {
  const items: { id: TabId; label: string }[] = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
  ];

  const visible = visibleTabs?.length ? items.filter((t) => visibleTabs.includes(t.id)) : items;

  return (
    <div role="tablist" aria-label="Related items categories" className="flex flex-wrap gap-2">
      {visible.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full border px-3 py-1 text-sm",
              "transition-colors motion-reduce:transition-none",
              isActive
                ? "border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.10)] text-[hsl(var(--text))]"
                : "border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--muted))] hover:bg-[hsl(var(--surface2))]"
            )}
            onClick={() => onChange(t.id)}
          >
            {t.label}{" "}
            <span className="text-[hsl(var(--muted))]">
              ({counts[t.id]})
            </span>
          </button>
        );
      })}
    </div>
  );
}

export interface SkillExplorerProps {
  skillsGroups: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: Certification[];
}

export function SkillExplorer({
  skillsGroups,
  projects,
  experience,
  education,
  certifications,
}: SkillExplorerProps) {
  const [query, setQuery] = React.useState("");
  const [selectedSkill, setSelectedSkill] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<TabId>("projects");
  const [expanded, setExpanded] = React.useState<Set<string>>(() => new Set());

  const trimmedQuery = query.trim();

  const filteredGroups = React.useMemo(() => {
    if (!trimmedQuery) return skillsGroups;
    return skillsGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((skill) => skillMatchesQuery(skill, trimmedQuery)),
      }))
      .filter((g) => g.items.length > 0);
  }, [skillsGroups, trimmedQuery]);

  const preferredTabForSkill = React.useCallback(
    (skill: string): TabId => {
      if (projects.some((p) => hasSkill(tagsForProject(p), skill))) return "projects";
      if (experience.some((x) => hasSkill(tagsForExperience(x), skill))) return "experience";
      if (education.some((e) => hasSkill(tagsForEducation(e), skill))) return "education";
      if (certifications.some((c) => hasSkill(tagsForCert(c), skill))) return "certifications";
      return "projects";
    },
    [certifications, education, experience, projects]
  );

  const selectSkill = React.useCallback((skill: string) => {
    setSelectedSkill((prev) => {
      const next = prev && normalize(prev) === normalize(skill) ? null : skill;
      if (next) setActiveTab(preferredTabForSkill(next));
      return next;
    });
  }, [preferredTabForSkill]);

  const clear = React.useCallback(() => {
    setQuery("");
    setSelectedSkill(null);
    setExpanded(new Set());
    setActiveTab("projects");
  }, []);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Escape") {
      // First Esc clears selection; second clears the query.
      if (selectedSkill || expanded.size) {
        setSelectedSkill(null);
        setExpanded(new Set());
        setActiveTab("projects");
        return;
      }
      if (query.trim()) {
        setQuery("");
        return;
      }
    }
  };

  const selectedNorm = selectedSkill ? normalize(selectedSkill) : null;

  const relatedProjects = React.useMemo(() => {
    if (!selectedSkill) return [];
    return projects.filter((p) => hasSkill(tagsForProject(p), selectedSkill));
  }, [projects, selectedSkill]);

  const relatedExperience = React.useMemo(() => {
    if (!selectedSkill) return [];
    return experience.filter((x) => hasSkill(tagsForExperience(x), selectedSkill));
  }, [experience, selectedSkill]);

  const relatedEducation = React.useMemo(() => {
    if (!selectedSkill) return [];
    return education.filter((e) => hasSkill(tagsForEducation(e), selectedSkill));
  }, [education, selectedSkill]);

  const relatedCerts = React.useMemo(() => {
    if (!selectedSkill) return [];
    return certifications.filter((c) => hasSkill(tagsForCert(c), selectedSkill));
  }, [certifications, selectedSkill]);

  const counts: Record<TabId, number> = React.useMemo(
    () => ({
      projects: relatedProjects.length,
      experience: relatedExperience.length,
      education: relatedEducation.length,
      certifications: relatedCerts.length,
    }),
    [relatedCerts.length, relatedEducation.length, relatedExperience.length, relatedProjects.length]
  );

  const visibleTabs = React.useMemo(() => {
    const order: TabId[] = ["projects", "experience", "education", "certifications"];
    return order.filter((t) => counts[t] > 0);
  }, [counts]);

  React.useEffect(() => {
    if (!selectedSkill) return;
    if (visibleTabs.length === 0) return;
    if (!visibleTabs.includes(activeTab)) setActiveTab(visibleTabs[0]);
  }, [activeTab, selectedSkill, visibleTabs]);

  const toggleExpanded = React.useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const SkillChip = ({ skill }: { skill: string }) => {
    const isSelected = selectedNorm === normalize(skill);
    return (
      <button
        type="button"
        onClick={() => selectSkill(skill)}
        className="rounded-full focus-visible:outline-none"
      >
        <Badge
          variant={isSelected ? "accent" : "neutral"}
          className={cn(
            "cursor-pointer",
            "transition-colors motion-reduce:transition-none",
            "hover:bg-[hsl(var(--surface2))]"
          )}
        >
          {skill}
        </Badge>
      </button>
    );
  };

  return (
    <div onKeyDown={onKeyDown}>
      {/* Tools */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-2 sm:max-w-md">
          <label htmlFor="skill-search" className="text-sm font-medium">
            Search
          </label>
          <input
            id="skill-search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Cleaner UX: changing search resets the current selection.
              if (selectedSkill) setSelectedSkill(null);
              if (expanded.size) setExpanded(new Set());
              setActiveTab("projects");
            }}
            placeholder="Search skills…"
            className={cn(
              "h-10 w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 text-sm",
              "text-[hsl(var(--text))] placeholder:text-[hsl(var(--muted))]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent)/0.9)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]"
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          {selectedSkill ? (
            <Badge variant="accent" className="max-w-[16rem] truncate">
              Selected: {selectedSkill}
            </Badge>
          ) : null}

          {query.trim() || selectedSkill ? (
            <Button variant="ghost" onClick={clear}>
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      {trimmedQuery && filteredGroups.length === 0 ? (
        <div className="mt-4">
          <p className="text-sm text-[hsl(var(--muted))]">
            No skills match “{trimmedQuery}”.
          </p>
          <div className="mt-2">
            <Button variant="ghost" onClick={clear}>
              Clear search
            </Button>
          </div>
        </div>
      ) : null}

      {/* Groups grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((g, idx) => (
          <Reveal key={g.name} delay={0.03 * idx}>
            <Card className="h-full p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-tight">{g.name}</h3>
                <span className="text-xs text-[hsl(var(--muted))]">{g.items.length}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <SkillChip key={s} skill={s} />
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Results */}
      {selectedSkill ? (
        <Reveal className="mt-10" delay={0.05}>
          <Card variant="highlight" className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
                  Results
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  Related to: <span className="text-[hsl(var(--accent))]">{selectedSkill}</span>
                </h3>
              </div>
              {visibleTabs.length ? (
                <SegmentedTabs
                  active={activeTab}
                  onChange={setActiveTab}
                  counts={counts}
                  visibleTabs={visibleTabs}
                />
              ) : null}
            </div>

            <div className="mt-6">
              {visibleTabs.length === 0 ? (
                <p className="text-sm text-[hsl(var(--muted))]">
                  No matches yet — tag more items with this skill.
                </p>
              ) : null}
              {visibleTabs.length ? (
                <>
                  {activeTab === "projects" ? (
                    <div className="grid gap-3">
                      {relatedProjects.length ? (
                        relatedProjects.map((p) => (
                          <Card key={p.title} variant="subtle" className="p-5">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <p className="font-medium">{p.title}</p>
                                <p className="mt-1 text-sm text-[hsl(var(--muted))]">{p.impactLine}</p>
                              </div>
                              <div className="flex shrink-0 flex-wrap gap-2">
                                {p.links.github ? (
                                  <Button
                                    href={p.links.github}
                                    variant="ghost"
                                    size="sm"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    leftIcon={<Github className="h-4 w-4" aria-hidden="true" />}
                                  >
                                    GitHub
                                  </Button>
                                ) : null}
                                {p.links.demo ? (
                                  <Button
                                    href={p.links.demo}
                                    variant="ghost"
                                    size="sm"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    leftIcon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
                                  >
                                    {p.links.demo.includes("vercel.app") ? "Vercel" : "Demo"}
                                  </Button>
                                ) : null}
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {unique(tagsForProject(p))
                                .slice(0, 6)
                                .map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => selectSkill(t)}
                                    className="rounded-full focus-visible:outline-none"
                                  >
                                    <Badge variant={normalize(t) === selectedNorm ? "accent" : "neutral"}>
                                      {t}
                                    </Badge>
                                  </button>
                                ))}
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-sm text-[hsl(var(--muted))]">
                          No matches yet — tag more items with this skill.
                        </p>
                      )}
                    </div>
                  ) : null}

                  {activeTab === "experience" ? (
                    <div className="grid gap-3">
                      {relatedExperience.length ? (
                        relatedExperience.map((x) => {
                          const id = `${x.role}-${x.org}-${x.dates}`;
                          const isOpen = expanded.has(id);
                          const preview = x.bullets.slice(0, 2);
                          const rest = x.bullets.slice(2);
                          const tags = tagsForExperience(x);

                          return (
                            <Card key={id} variant="subtle" className="p-5">
                              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                <div>
                                  <p className="font-medium">{x.role}</p>
                                  <p className="mt-1 text-sm text-[hsl(var(--muted))]">
                                    {x.org}
                                    {x.location ? ` · ${x.location}` : ""}
                                  </p>
                                </div>
                                <p className="text-sm text-[hsl(var(--muted))]">{x.dates}</p>
                              </div>

                              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[hsl(var(--muted))]">
                                {preview.map((b) => (
                                  <li key={b}>{b}</li>
                                ))}
                                {isOpen
                                  ? rest.map((b) => (
                                      <li key={b}>{b}</li>
                                    ))
                                  : null}
                              </ul>

                              {rest.length ? (
                                <button
                                  type="button"
                                  className="mt-3 link-sweep text-sm text-[hsl(var(--muted))] hover:text-[hsl(var(--text))]"
                                  onClick={() => toggleExpanded(id)}
                                >
                                  {isOpen ? "View less" : "View more"}
                                </button>
                              ) : null}

                              <div className="mt-4 flex flex-wrap gap-2">
                                {tags.slice(0, 8).map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => selectSkill(t)}
                                    className="rounded-full focus-visible:outline-none"
                                  >
                                    <Badge variant={normalize(t) === selectedNorm ? "accent" : "neutral"}>
                                      {t}
                                    </Badge>
                                  </button>
                                ))}
                              </div>
                            </Card>
                          );
                        })
                      ) : (
                        <p className="text-sm text-[hsl(var(--muted))]">
                          No matches yet — tag more items with this skill.
                        </p>
                      )}
                    </div>
                  ) : null}

                  {activeTab === "education" ? (
                    <div className="grid gap-3">
                      {relatedEducation.length ? (
                        relatedEducation.map((e) => (
                          <Card key={`${e.school}-${e.degree}`} variant="subtle" className="p-5">
                            <p className="font-medium">{e.school}</p>
                            <p className="mt-1 text-sm text-[hsl(var(--muted))]">{e.degree}</p>
                            <p className="mt-1 text-sm text-[hsl(var(--muted))]">{e.dates}</p>
                            {e.details?.length ? (
                              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[hsl(var(--muted))]">
                                {e.details.slice(0, 2).map((d) => (
                                  <li key={d}>{d}</li>
                                ))}
                              </ul>
                            ) : null}
                            <div className="mt-4 flex flex-wrap gap-2">
                              {tagsForEducation(e).slice(0, 8).map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => selectSkill(t)}
                                  className="rounded-full focus-visible:outline-none"
                                >
                                  <Badge variant={normalize(t) === selectedNorm ? "accent" : "neutral"}>
                                    {t}
                                  </Badge>
                                </button>
                              ))}
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-sm text-[hsl(var(--muted))]">
                          No matches yet — tag more items with this skill.
                        </p>
                      )}
                    </div>
                  ) : null}

                  {activeTab === "certifications" ? (
                    <div className="grid gap-3">
                      {relatedCerts.length ? (
                        relatedCerts.map((c) => (
                          <Card key={`${c.name}-${c.issuer}`} variant="subtle" className="p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="font-medium">{c.name}</p>
                                <p className="mt-1 text-sm text-[hsl(var(--muted))]">{c.issuer}</p>
                                {c.date ? (
                                  <p className="mt-1 text-sm text-[hsl(var(--muted))]">{c.date}</p>
                                ) : null}
                              </div>
                              {c.credentialUrl ? (
                                <a
                                  href={c.credentialUrl}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="link-sweep inline-flex items-center gap-1 text-sm text-[hsl(var(--muted))] hover:text-[hsl(var(--text))]"
                                >
                                  View <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                </a>
                              ) : null}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {tagsForCert(c).slice(0, 8).map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => selectSkill(t)}
                                  className="rounded-full focus-visible:outline-none"
                                >
                                  <Badge variant={normalize(t) === selectedNorm ? "accent" : "neutral"}>
                                    {t}
                                  </Badge>
                                </button>
                              ))}
                            </div>
                          </Card>
                        ))
                      ) : (
                        <p className="text-sm text-[hsl(var(--muted))]">
                          No matches yet — tag more items with this skill.
                        </p>
                      )}
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </Card>
        </Reveal>
      ) : null}
    </div>
  );
}


