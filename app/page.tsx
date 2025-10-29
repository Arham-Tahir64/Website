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
  const [activeId, setActiveId] = useState<string>('home')
  const [progress, setProgress] = useState(0)

  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  // observe sections for active state and track scroll progress
  React.useEffect(() => {
    const ids = ['home', 'projects', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const onScroll = () => {
      const scrolled = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      setProgress(height > 0 ? scrolled / height : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const dockItems = [
    { icon: <Home size={18} />, label: 'Home', onClick: () => scrollTo('home'), className: activeId === 'home' ? 'active' : '' },
    { icon: <FolderGit2 size={18} />, label: 'Projects', onClick: () => scrollTo('projects'), className: activeId === 'projects' ? 'active' : '' },
    { icon: <BriefcaseBusiness size={18} />, label: 'Experience', onClick: () => scrollTo('experience'), className: activeId === 'experience' ? 'active' : '' },
    { icon: <FileText size={18} />, label: 'Resume', onClick: () => setResumeOpen(true) },
    { icon: <Mail size={18} />, label: 'Contact', onClick: () => scrollTo('contact'), className: activeId === 'contact' ? 'active' : '' },
  ]

  return (
    <main className="relative">
      <DotGridBackground />

      <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-32 sm:pt-24">
        {/* HERO */}
        <section id="home" className="mb-24">
          <div className="group grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
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
                  <span key={b} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className="ghost-btn bg-white/5">View Projects</a>
                <button className="ghost-btn" onClick={() => setResumeOpen(true)}>Download Resume</button>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
              <GlassCard className="p-5">
                <div className="mb-2 text-sm text-muted">Profile snapshot</div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <div className="text-muted">Location</div>
                    <div>Calgary, AB</div>
                  </div>
                  <div>
                    <div className="text-muted">Focus</div>
                    <div>AI tooling, low-latency infra, human-in-the-loop systems</div>
                  </div>
                  <div>
                    <div className="text-muted">Stack</div>
                    <div>TypeScript / React / Rust / Postgres / AWS</div>
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
              title="FlowBuildr"
              description="AI-assisted construction takeoff that extracts materials from floorplans and generates cost estimates."
              stack={["Python", "YOLOv8", "Supabase", "AWS"]}
              meta={["computer vision", "batch + streaming"]}
            />
            <ProjectCard
              title="Chitty"
              description="Low-latency real-time chat platform battle-tested with 1,000+ concurrent users and <30ms p99."
              stack={["Node.js", "WebSockets", "Redis", "Postgres"]}
              meta={["realtime <30ms p99", "horizontal scaling"]}
            />
            <ProjectCard
              title="Bounty.Fun"
              description="Decentralized bounty board on Solana for AI and open-source work. Wallet auth, IPFS storage, escrowed payouts."
              stack={["React", "Rust (Solana)", "Tailwind"]}
              meta={["Solana", "IPFS"]}
            />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mb-24">
          <SectionHeader title="Experience" caption="Where I've built real things." />
          <div className="grid grid-cols-1 gap-5">
            <ExperienceCard
              company="Tech Start UCalgary — FlowBuildr"
              role="AI Engineer"
              bullets={[
                "Built computer vision tooling to automatically extract construction materials and quantities from PDF floorplans.",
              ]}
              badge="AI / CV"
            />
            <ExperienceCard
              company="WayBionic"
              role="Software Team Member"
              bullets={[
                "Helped develop assistive control software for a remote surgery robotic arm designed for extreme/remote environments (including space medicine use cases).",
              ]}
              badge="Infra"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mb-28">
          <SectionHeader title="Let's talk" caption="I'm open to software internships, AI/ML roles, and high-impact builder roles." />
          <div className="flex flex-wrap gap-3">
            <a className="ghost-btn" href="mailto:hello@example.com">Email</a>
            <a className="ghost-btn" href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="ghost-btn" href="#" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-muted">
          <div>© 2025 Arham Tahir</div>
          <div className="mt-1">Built with React + Tailwind</div>
        </footer>
      </div>

      <Dock items={dockItems} />
      <div className="scroll-rail">
        <div className="scroll-rail__fill" style={{ height: `${Math.round(progress * 100)}%` }} />
      </div>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  )
}


