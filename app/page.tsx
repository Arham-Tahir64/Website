"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DotGridBackground from '@/components/DotGridBackground'
import Dock from '@/components/Dock'
import { Home, FolderGit2, BriefcaseBusiness, FileText, Mail } from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import SectionHeader from '@/components/SectionHeader'
import ProjectCard from '@/components/ProjectCard'
import ExperienceCard from '@/components/ExperienceCard'
import ResumeModal from '@/components/ResumeModal'

export default function Page() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)

  const fadeIn = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  }

  React.useEffect(() => {
    const sections = ['home', 'projects', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setCurrentSection(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? scrolled / maxScroll : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const dockItems = [
    { icon: <Home size={18} />, label: 'Home', onClick: () => scrollTo('home'), className: currentSection === 'home' ? 'active' : '' },
    { icon: <FolderGit2 size={18} />, label: 'Projects', onClick: () => scrollTo('projects'), className: currentSection === 'projects' ? 'active' : '' },
    { icon: <BriefcaseBusiness size={18} />, label: 'Experience', onClick: () => scrollTo('experience'), className: currentSection === 'experience' ? 'active' : '' },
    { icon: <FileText size={18} />, label: 'Resume', onClick: () => setResumeOpen(true) },
    { icon: <Mail size={18} />, label: 'Contact', onClick: () => scrollTo('contact'), className: currentSection === 'contact' ? 'active' : '' },
  ]

  return (
    <main className="relative">
      <DotGridBackground />

      <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-32 sm:pt-24">
        {/* HERO */}
        <section id="home" className="mb-24">
          <div className="group grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Arham Tahir</h1>
              <p className="mt-3 text-lg text-foreground/85">AI Engineer / Full-Stack Developer / Builder</p>
              <p className="mt-4 max-w-[60ch] text-foreground/80">
                I build high-performance tools across AI, real-time systems, and developer infrastructure. I love shipping
                pragmatic systems that are low-latency, reliable, and delightful to use.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  'FlowBuildr — AI construction takeoff',
                  'Chitty — 1,000+ concurrent chat',
                  'Bounty.Fun — on-chain bounties',
                ].map((b) => (
                  <span key={b} className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-foreground/75 font-medium">
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a href="#projects" className="ghost-btn bg-white/[0.04] hover:bg-white/8">View Projects</a>
                <button className="ghost-btn" onClick={() => setResumeOpen(true)}>Download Resume</button>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
              <GlassCard className="p-6">
                <div className="mb-3 text-xs text-muted uppercase tracking-wider">Profile</div>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <div className="text-muted text-xs mb-1">Location</div>
                    <div className="text-foreground/90">Calgary, AB</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs mb-1">Focus</div>
                    <div className="text-foreground/85 leading-relaxed">AI tooling, low-latency infra, human-in-the-loop systems</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs mb-1">Stack</div>
                    <div className="text-foreground/85">TypeScript / React / Rust / Postgres / AWS</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-24">
          <SectionHeader title="Projects" caption="Things I actually ship." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProjectCard
              title="AI Game Control Assistant"
              description="Real-time computer vision assistant detecting in-game events with 92% accuracy using a custom-trained YOLOv8 model; pipelines for validation and dynamic system output at 30+ FPS."
              stack={["Python", "YOLOv8", "OpenCV", "Docker"]}
              meta={["92% accuracy", "30+ FPS", "LLM decision hooks"]}
            />
            <ProjectCard
              title="Chitty"
              description="Realtime chat with multi-user rooms and persistent history; REST + WebSocket endpoints supporting 1,000+ concurrent users with 25–30ms latency."
              stack={["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL", "Redis"]}
              meta={["1,000+ concurrent", "25–30ms p99", "Artillery load tests"]}
            />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mb-24">
          <SectionHeader title="Experience" caption="Where I've built real things." />
          <div className="grid grid-cols-1 gap-5">
            <ExperienceCard
              company="WayBionic Club"
              role="Software Team Member"
              bullets={[
                "Building control software for a bionic arm enabling precise remote surgery.",
                "Focused on reliability, teleoperation latency, and safety for space and terrestrial use.",
                "Collaborating across hardware and software teams to integrate, test, and iterate quickly.",
              ]}
              badge="Robotics / MedTech"
            />
            <ExperienceCard
              company="Tech Start — FlowBuildr"
              role="AI Engineer"
              bullets={[
                "Developed AI-powered takeoff tool using CV to extract materials/quantities from PDF floorplans.",
                "Implemented image preprocessing and scale inference pipelines; integrated Supabase for uploads/auth/reporting.",
              ]}
              badge="AI / CV"
            />
            <ExperienceCard
              company="Data Science & Machine Learning Club"
              role="Backend Engineer"
              bullets={[
                "Designed PostgreSQL schemas and built REST APIs with C#/.NET for marketplace data.",
                "Optimized queries and indexing; deployed on AWS EC2/S3 for scalable API hosting.",
              ]}
              badge="Infra"
            />
            <ExperienceCard
              company="FIRST Tech Challenge (FTC)"
              role="Robotics Team Member"
              bullets={[
                "Engineered TensorFlow-powered CV ring detection; improved autonomous picking efficiency by ~20%.",
                "Contributed to Java control systems; reduced component mass 15% via SolidWorks design iterations.",
              ]}
              badge="AI / CV"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mb-28">
          <SectionHeader title="Let's talk" caption="I'm open to software internships, AI/ML roles, and high-impact builder roles." />
          <div className="flex flex-wrap gap-3">
            <a className="ghost-btn" href="mailto:arhamt13@gmail.com">
              Email
            </a>
            <a className="ghost-btn" href="https://www.linkedin.com/in/arham-tahir-5735b7270/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="ghost-btn" href="https://github.com/Arham-Tahir64" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-muted">
          <div>© 2025 Arham Tahir</div>
          <div className="mt-1">Built with React + Tailwind</div>
        </footer>
      </div>

      <Dock items={dockItems} />
      <div className="scroll-rail">
        <div className="scroll-rail__fill" style={{ height: `${Math.round(scrollProgress * 100)}%` }} />
      </div>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  )
}


