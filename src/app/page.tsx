/**
 * Phase 3 complete: all sections implemented; Phase 4 will add active nav highlighting + refined motion.
 */
import Image from "next/image";
import portfolio, { sectionIds } from "@/content/content";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SkillExplorer } from "@/components/SkillExplorer";
import { cn } from "@/lib/cn";
import { Check, CheckCircle2, ExternalLink, Github, Linkedin, Mail, Timer } from "lucide-react";

function TechBadges({ items, limit = 6 }: { items: string[]; limit?: number }) {
  const visible = items.slice(0, limit);
  const remaining = Math.max(0, items.length - visible.length);
  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((t) => (
        <Badge key={t}>{t}</Badge>
      ))}
      {remaining > 0 ? <Badge className="text-[hsl(var(--muted))]">+{remaining}</Badge> : null}
    </div>
  );
}

function mediaAspectClass(aspect?: "16:9" | "4:3" | "1:1") {
  const a = aspect ?? "16:9";
  if (a === "1:1") return "aspect-square";
  if (a === "4:3") return "aspect-[4/3]";
  return "aspect-video";
}

export default function Page() {
  const projects = portfolio.projects.projects;
  const featuredProjects = projects.filter((p) => p.featured);
  const moreProjects = projects.filter((p) => !p.featured);

  if (portfolio.impactMetrics.length < 4) {
    // TODO: Add 4 metrics for best layout.
  }
  const metrics = portfolio.impactMetrics.slice(0, 4);

  return (
    <>
      <Nav />

      <main id={sectionIds.home} className="section-anchor">
        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-20" aria-label="Hero">
          {/* subtle hero accent blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-[-18rem] h-[32rem] w-[32rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, hsl(var(--accent) / 0.16), transparent 62%), radial-gradient(circle at 70% 70%, hsl(var(--accent2) / 0.10), transparent 60%)",
            }}
          />

          <Container>
            <div className="grid items-start gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
              <div>
                <Reveal>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
                    Home
                  </p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                    {portfolio.basics.name}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted))] sm:text-lg">
                    {portfolio.basics.headline}
                  </p>
                </Reveal>

                <Reveal delay={0.05}>
                  <ul className="mt-7 grid gap-3 text-[hsl(var(--muted))]">
                    {portfolio.hero.heroBullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--accent)/0.8)]"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="mt-9 flex flex-wrap gap-2">
                    {portfolio.hero.ctas.map((cta) => (
                      <Button
                        key={cta.label}
                        href={cta.href}
                        variant={cta.variant}
                        {...(cta.href === portfolio.basics.resume.href
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : null)}
                      >
                        {cta.label}
                      </Button>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1} className="md:pt-2">
                <div className="mx-auto w-full max-w-[360px]">
                  <Card variant="highlight" className="p-3">
                    <div className="relative aspect-square overflow-hidden rounded-2xl">
                      <Image
                        src={portfolio.hero.headshot.src}
                        alt={portfolio.hero.headshot.alt}
                        fill
                        sizes="(max-width: 768px) 70vw, 360px"
                        priority
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 text-center text-sm text-[hsl(var(--muted))]">
                      {portfolio.basics.location}
                    </p>
                  </Card>
                </div>
              </Reveal>
            </div>

            {/* Impact metrics strip (4 independent boxes, evenly spaced) */}
            <Reveal delay={0.2} className="mt-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className={[
                      "rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4",
                      "shadow-[0_1px_0_hsl(var(--text)/0.02),0_6px_18px_hsl(var(--text)/0.05)]",
                      "transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none",
                      "hover:border-[hsl(var(--accent)/0.22)] hover:shadow-[0_1px_0_hsl(var(--text)/0.02),0_10px_26px_hsl(var(--text)/0.07)]",
                    ].join(" ")}
                  >
                    <p className="text-2xl font-semibold text-[hsl(var(--accent))]">{m.value}</p>
                    <p className="mt-1 text-sm font-medium text-[hsl(var(--muted))]">{m.label}</p>
                    {m.hint ? (
                      <p className="mt-1 text-xs text-[hsl(var(--muted))]">{m.hint}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* ABOUT */}
        <Section
          id={sectionIds.about}
          eyebrow="About"
          title="About"
          subtitle="A concise, security-minded snapshot of how I build and what I optimize for."
          tone="tinted"
        >
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-[hsl(var(--muted))]">
                {portfolio.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-3">
              {portfolio.about.highlights.map((h, idx) => (
                <Reveal key={h.title} delay={0.05 * idx}>
                  <Card variant="subtle" className="p-5">
                    <h3 className="text-sm font-semibold tracking-tight">{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted))]">
                      {h.description}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <Container>
          <Divider />
        </Container>

        {/* SKILLS */}
        <Section
          id={sectionIds.skills}
          eyebrow="Skills"
          title="Skills"
          subtitle="Tools and technologies I reach for when building secure, reliable products."
        >
          <SkillExplorer
            skillsGroups={portfolio.skills.groups}
            projects={portfolio.projects.projects}
            experience={portfolio.experience.experience}
            education={portfolio.education.education}
            certifications={portfolio.education.certifications}
          />
        </Section>

        <Container>
          <Divider />
        </Container>

        {/* PROJECTS */}
        <Section
          id={sectionIds.projects}
          eyebrow="Projects"
          title="Projects"
          subtitle="Selected work and what I built."
          tone="tinted"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((p, idx) => (
              <Reveal key={p.title} delay={0.05 * idx}>
                <Card
                  variant={idx < 2 ? "highlight" : "default"}
                  className={[
                    "group h-full",
                    p.media ? "overflow-hidden p-0" : "p-6",
                  ].join(" ")}
                >
                  {p.media ? (
                    <div
                      className={[
                        "relative w-full overflow-hidden",
                        mediaAspectClass(p.media.aspect),
                        "bg-[hsl(var(--surface2))]",
                      ].join(" ")}
                    >
                      <Image
                        src={p.media.src}
                        alt={p.media.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                        className="object-cover transition-transform duration-300 motion-reduce:transition-none motion-safe:group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}

                  <div className={p.media ? "p-6" : ""}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold tracking-tight">{p.title}</h3>
                        <p className="mt-2 font-medium">{p.impactLine}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted))]">
                      {p.description}
                    </p>

                    <div className="mt-5">
                      <TechBadges items={p.tech} limit={6} />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.links.github ? (
                        <Button
                          href={p.links.github}
                          variant="secondary"
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
                          target="_blank"
                          rel="noreferrer noopener"
                          leftIcon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
                        >
                          {p.links.demo.includes("vercel.app") ? "Vercel" : "View"}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          {moreProjects.length ? (
            <div className="mt-10">
              <Reveal>
                <h3 className="text-sm font-semibold tracking-tight text-[hsl(var(--text))]">
                  More projects
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-[hsl(var(--muted))]">
                  A few additional builds and references.
                </p>
              </Reveal>

              <ul className="mt-4 grid gap-2">
                {moreProjects.map((p, idx) => (
                  <Reveal key={p.title} delay={0.03 * idx}>
                    <li>
                      <Card variant="subtle" className="p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <p className="font-medium">{p.title}</p>
                            <p className="mt-1 text-sm text-[hsl(var(--muted))]">{p.impactLine}</p>
                            <p className="mt-2 text-sm text-[hsl(var(--muted))]">{p.description}</p>
                            <div className="mt-3">
                              <TechBadges items={p.tech} limit={5} />
                            </div>
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
                                View
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </Card>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          ) : null}
        </Section>

        <Container>
          <Divider />
        </Container>

        {/* EDUCATION + CERTIFICATIONS */}
        <Section
          id={sectionIds.education}
          eyebrow="Education"
          title="Education + Certifications"
          subtitle="Academic foundation and formal credentials."
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <Reveal>
              <div>
                <h3 className="text-sm font-semibold tracking-tight">Education</h3>
                <div className="mt-4 grid gap-3">
                  {portfolio.education.education.map((e, idx) => (
                    <Reveal key={`${e.school}-${e.degree}`} delay={0.04 * idx}>
                      <Card variant="subtle" className="p-5">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">{e.school}</p>
                          <p className="text-sm text-[hsl(var(--muted))]">{e.degree}</p>
                          <p className="text-sm text-[hsl(var(--muted))]">{e.dates}</p>
                        </div>
                        {e.details?.length ? (
                          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[hsl(var(--muted))]">
                            {e.details.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        ) : null}
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h3 className="sr-only">Certifications</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {portfolio.education.certifications.map((c, idx) => {
                    if (!c.badge) return null;
                    const badge = c.badge;
                    const status = c.status ?? "in-progress";
                    const isClickable = Boolean(c.credentialUrl);

                    const tile = (
                      <div
                        className={cn(
                          "group relative aspect-square overflow-hidden rounded-2xl",
                          "bg-transparent shadow-sm",
                          "transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none",
                          "hover:shadow-[0_12px_34px_hsl(var(--text)/0.08)]"
                        )}
                      >
                        <Image
                          src={badge.src}
                          alt={badge.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />

                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute bottom-3 left-3 inline-flex h-7 w-7 items-center justify-center rounded-full",
                            "ring-2 ring-[hsl(var(--bg))] shadow-sm",
                            status === "completed" ? "bg-emerald-500 text-white" : "bg-amber-400 text-black"
                          )}
                        >
                          {status === "completed" ? (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                    );

                    return (
                      <Reveal key={`${c.name}-${c.issuer}`} delay={0.04 * idx}>
                        {isClickable ? (
                          <a
                            href={c.credentialUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={cn(
                              "block rounded-2xl",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent)/0.9)]",
                              "focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]"
                            )}
                          >
                            {tile}
                          </a>
                        ) : (
                          tile
                        )}
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        <Container>
          <Divider />
        </Container>

        {/* EXPERIENCE */}
        <Section
          id={sectionIds.experience}
          eyebrow="Experience"
          title="Experience"
          subtitle="Roles, impact, and the tools I used to ship."
          tone="tinted"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-3 top-1 h-full w-px bg-[hsl(var(--border))] md:left-4"
            />

            <ul className="grid gap-6">
              {portfolio.experience.experience.map((x, idx) => (
                <Reveal key={`${x.role}-${x.org}-${x.dates}`} delay={0.06 * idx}>
                  <li className="relative pl-10 md:pl-12">
                    <span
                      aria-hidden="true"
                      className="absolute left-[0.4rem] top-6 h-3 w-3 rounded-full border-2 border-[hsl(var(--accent)/0.6)] bg-[hsl(var(--surface))] md:left-[0.6rem]"
                    />

                    <Card className="p-6">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold tracking-tight">{x.role}</h3>
                          <p className="mt-1 text-sm text-[hsl(var(--muted))]">
                            {x.org}
                            {x.location ? ` · ${x.location}` : ""}
                          </p>
                        </div>
                        <p className="text-sm text-[hsl(var(--muted))]">{x.dates}</p>
                      </div>

                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[hsl(var(--muted))]">
                        {x.bullets.slice(0, 4).map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>

                      {x.tech?.length ? (
                        <div className="mt-5">
                          <div className="flex flex-wrap gap-2">
                            {x.tech.slice(0, 8).map((t) => (
                              <Badge key={t} className="text-[hsl(var(--muted))]">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </Card>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        <Container>
          <Divider />
        </Container>

        {/* CONTACT */}
        <Section
          id={sectionIds.contact}
          eyebrow="Contact"
          title="Let’s connect"
          subtitle="Quick ways to reach me and see what I’m building."
        >
          <Reveal>
            <Card variant="highlight" className="p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Let’s connect</h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted))]">
                    {portfolio.contact.contactBlurb}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button
                      href={`mailto:${portfolio.basics.email}`}
                      variant="primary"
                      leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
                    >
                      Email me
                    </Button>

                    <CopyButton value={portfolio.basics.email} label="Copy email" />
                  </div>
                </div>

                <div className="md:pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
                    Social
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {portfolio.contact.social.map((s) => {
                      const label = s.label.toLowerCase();
                      const icon =
                        label.includes("github") ? (
                          <Github className="h-4 w-4" aria-hidden="true" />
                        ) : label.includes("linkedin") ? (
                          <Linkedin className="h-4 w-4" aria-hidden="true" />
                        ) : label.includes("email") ? (
                          <Mail className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        );

                      const isExternal = s.href.startsWith("http");
                      const isResume = s.href === portfolio.basics.resume.href;
                      const openNewTab = isExternal || isResume;

                      return (
                        <Button
                          key={s.label}
                          href={s.href}
                          variant="secondary"
                          size="sm"
                          leftIcon={icon}
                          {...(openNewTab ? { target: "_blank", rel: "noreferrer noopener" } : null)}
                        >
                          {s.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </Section>
      </main>

      <Footer />
    </>
  );
}


