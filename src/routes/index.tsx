import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowRight, ArrowDown, Leaf, GraduationCap, Monitor, PenLine, Search, BookOpen, Sparkles, ChartNoAxesCombined, MessageCircle, FileText, Puzzle, ListChecks, Keyboard, Folder, Palette, Code, Phone, Mail, Menu, X, MapPin, Sprout, Lightbulb, Globe, Wrench, Github, Star } from "lucide-react";
import { getGithubRepos } from "@/lib/github.functions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { portfolioContacts } from "@/lib/portfolio-contact";
import workspaceImage from "@/assets/research-workspace.jpg";
import sophieImage from "@/assets/sophie.jpg";
import "../portfolio.css";

/*
 * SOPHIA'S PORTFOLIO
 * ------------------
 * All styling lives in src/portfolio.css (plain CSS + Flexbox).
 * All images live in public/images/ — see public/images/README.md
 * to learn how to replace them with your own.
 */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sophia – Researcher, Writer & Aspiring Digital Professional" },
      {
        name: "description",
        content:
          "Portfolio of Sophia, an Agricultural Economics graduate from the University of Calabar building a career in research, writing, data and technology.",
      },
      { property: "og:title", content: "Sophia – Personal Portfolio" },
      {
        property: "og:description",
        content: "Researcher | Writer | Aspiring Digital Professional based in Nigeria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------- CONTENT (edit text here) ---------- */

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const aboutCards = [
  { icon: "🎓", title: "Agricultural Economics Graduate", text: "University of Calabar, Nigeria" },
  { icon: "💻", title: "Aspiring Digital Professional", text: "Web, data & AI tools" },
  { icon: "✍️", title: "Researcher & Writer", text: "Clear thinking. Meaningful communication." },
  { icon: "🌱", title: "Lifelong Learner", text: "Exploring technology, digital skills & AI" },
];

const journey = [
  {
    icon: "🎓",
    title: "University Education",
    text: "Bachelor of Agriculture (Agricultural Economics), University of Calabar.",
  },
  {
    icon: "🔍",
    title: "Research",
    text: "Undergraduate research on resource productivity in urban leafy vegetable production among women farmers in Calabar South, Cross River State, Nigeria.",
  },
  { icon: "📚", title: "Teaching", text: "Teaching experience at Embodiment of Love Academy." },
  {
    icon: "💻",
    title: "Digital Skills",
    text: "Developing skills in data entry, data analysis, HTML, CSS, Flexbox, AI tools and technical writing.",
  },
  {
    icon: "🚀",
    title: "Future",
    text: "Building a professional career combining research, communication, technology and digital skills.",
  },
];

const skillGroups = [
  {
    title: "Technical Skills",
    icon: "💻",
    skills: [
      { icon: "</>", name: "HTML", text: "Structuring clear, accessible web pages." },
      { icon: "🎨", name: "CSS", text: "Styling pages with colour, spacing, and type." },
      { icon: "▥", name: "CSS Flexbox", text: "Creating flexible, responsive layouts." },
      { icon: "📊", name: "Data Analysis", text: "Exploring data and understanding patterns." },
      { icon: "⌨️", name: "Data Entry", text: "Recording and organizing information accurately." },
      { icon: "🗂️", name: "Microsoft Office", text: "Documents, spreadsheets, and slides." },
      { icon: "✨", name: "AI Tools", text: "Exploring AI to support learning and tasks." },
    ],
  },
  {
    title: "Research & Writing",
    icon: "✍️",
    skills: [
      { icon: "🔍", name: "Research", text: "Finding, checking, and organizing information." },
      { icon: "📝", name: "Technical Writing", text: "Explaining processes and ideas clearly." },
      { icon: "🖋️", name: "Content Writing", text: "Creating clear and engaging content." },
      { icon: "📄", name: "Report Writing", text: "Presenting findings in a structured way." },
    ],
  },
  {
    title: "Professional Skills",
    icon: "🤝",
    skills: [
      { icon: "💬", name: "Communication", text: "Sharing ideas clearly and listening thoughtfully." },
      { icon: "🧩", name: "Problem Solving", text: "Thinking through challenges to find solutions." },
      { icon: "📋", name: "Organization", text: "Keeping work structured and on track." },
      { icon: "🌱", name: "Continuous Learning", text: "Always growing new skills." },
    ],
  },
];

const projects = [
  {
    image: "/images/projects/research.jpg",
    tag: "Academic research",
    title: "Undergraduate Research Project",
    text: "Research project on resource productivity in urban leafy vegetable production among women farmers in Calabar South, Cross River State, Nigeria.",
    skills: ["Research", "Data collection", "Data analysis", "Agricultural economics", "Report writing"],
  },
  {
    image: "/images/projects/portfolio.jpg",
    tag: "Web development",
    title: "Personal Portfolio Website",
    text: "A responsive personal portfolio website created to demonstrate my understanding of HTML, CSS, and Flexbox.",
    skills: ["HTML", "CSS", "Flexbox", "Responsive web design"],
  },
  {
    image: "/images/projects/data.jpg",
    tag: "Data & insights",
    title: "Data Analysis Practice",
    text: "Beginner data analysis exercises involving data organization, interpretation, basic statistical analysis, and presentation of findings.",
    skills: ["Data entry", "Data analysis", "Data interpretation", "Presentation"],
  },
  {
    image: "/images/projects/writing.jpg",
    tag: "Writing & communication",
    title: "Digital Writing & Research",
    text: "Writing and research activities focused on presenting information clearly, conducting research, and communicating ideas effectively.",
    skills: ["Research", "Writing", "Communication", "Information organization"],
  },
];

/* To add a certificate image: put it in public/images/certificates/
   and set image: "/images/certificates/your-file.jpg" below. */
const certificates = [
  { icon: "⌨️", title: "Data Entry Training", image: "" },
  { icon: "📊", title: "Data Analysis for Beginners", image: "" },
  { icon: "✨", title: "Artificial Intelligence / AI", image: "" },
  { icon: "</>", title: "Web Development / HTML & CSS", image: "" },
];

const responsibilities = [
  { icon: "👧🏾", text: "Worked with young learners." },
  { icon: "💬", text: "Developed communication and classroom management skills." },
  { icon: "📖", text: "Prepared and presented lessons in a clear and understandable way." },
];

const whyCards = [
  { icon: "🔍", title: "Research & Analysis", text: "I can research information, organize data, and communicate findings clearly." },
  { icon: "✍️", title: "Writing & Communication", text: "I enjoy turning information and ideas into clear, organized written content." },
  { icon: "💡", title: "Digital Learning", text: "I am continuously developing practical digital and technology skills." },
  { icon: "🌿", title: "Reliability & Growth", text: "I am committed to learning, improving, and delivering quality work." },
];

const learning = [
  { icon: "</>", name: "HTML & CSS", status: "Practicing", level: 3 },
  { icon: "🌐", name: "Web Development", status: "Learning", level: 2 },
  { icon: "📊", name: "Data Analysis", status: "Developing", level: 3 },
  { icon: "✨", name: "Artificial Intelligence", status: "Exploring", level: 1 },
  { icon: "📝", name: "Technical Writing", status: "Developing", level: 3 },
  { icon: "🧰", name: "Digital Tools", status: "Exploring", level: 1 },
];

const contacts = portfolioContacts;

const iconMap = {
  "🎓": GraduationCap, "💻": Monitor, "✍️": PenLine, "🌱": Sprout,
  "🔍": Search, "📚": BookOpen, "🚀": ArrowUpRight, "</>": Code,
  "🎨": Palette, "▥": Monitor, "📊": ChartNoAxesCombined, "⌨️": Keyboard,
  "🗂️": Folder, "✨": Sparkles, "📝": FileText, "🖋️": PenLine,
  "📄": FileText, "🤝": MessageCircle, "💬": MessageCircle, "🧩": Puzzle,
  "📋": ListChecks, "👧🏾": GraduationCap, "📖": BookOpen, "💡": Lightbulb,
  "🌿": Leaf, "🌐": Globe, "🧰": Wrench, "🍎": BookOpen, "✉️": Mail, phone: Phone,
};

function IconMark({ symbol }: { symbol: string }) {
  const Icon = iconMap[symbol as keyof typeof iconMap] ?? Leaf;
  return <Icon size={23} strokeWidth={1.6} aria-hidden="true" />;
}

/* ---------- PAGE ---------- */

/* GitHub section: loads Sophia's public repositories from GitHub.
   Until a repository is made public, it shows a friendly link to her profile. */
function GithubSection() {
  const { data, isPending } = useQuery({
    queryKey: ["github-repos"],
    queryFn: () => getGithubRepos(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section id="github" className="section section-dark github-section">
      <div className="container">
        <SectionTitle
          eyebrow="Code & experiments"
          title="My GitHub"
          text="Where I practice web development and share what I'm building."
        />
        {isPending ? (
          <p className="github-note">Loading projects…</p>
        ) : data && data.repos.length > 0 ? (
          <div className="github-list">
            {data.repos.map((repo) => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className="github-card">
                <div className="github-card-top">
                  <span className="icon-bubble"><Github size={20} strokeWidth={1.6} /></span>
                  <ArrowUpRight size={18} className="github-arrow" />
                </div>
                <h3>{repo.name}</h3>
                {repo.description && <p>{repo.description}</p>}
                <div className="github-meta">
                  {repo.language && <span className="chip">{repo.language}</span>}
                  {repo.stars > 0 && <span className="github-stars"><Star size={13} /> {repo.stars}</span>}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="github-empty">
            <span className="icon-bubble big"><Github size={28} strokeWidth={1.5} /></span>
            <h3>Freshly started on GitHub</h3>
            <p>
              I've just set up my GitHub account and will be publishing my coding practice and
              web development projects here as I build them.
            </p>
            <Button asChild variant="outline" className="btn btn-outline">
              <a href={data?.profileUrl ?? "https://github.com/SophieChris1"} target="_blank" rel="noreferrer">
                Follow my journey on GitHub <ArrowUpRight />
              </a>
            </Button>
          </div>
        )}
        {data && data.repos.length > 0 && (
          <div className="github-more">
            <Button asChild variant="outline" className="btn btn-outline">
              <a href={data.profileUrl} target="_blank" rel="noreferrer">
                See all on GitHub <ArrowUpRight />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  return (
    <div className="site">
      {/* NAVIGATION */}
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#home" className="logo">
            <Leaf size={25} strokeWidth={1.6} /> Sophia<span>.</span>
          </a>
          <Button variant="ghost" size="icon"
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {navLinks.map((link) => (
              <Button asChild variant="ghost" key={link.href}><a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a></Button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <img className="hero-background" src={workspaceImage} alt="A notebook and leafy vegetables on a research workspace" width={1600} height={1024} fetchPriority="high" />
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="pill"><span className="status-dot" /> Curious mind. Growing skill set.</span>
            <h1>
              Hello, I'm<br /><em>Sophia.</em>
            </h1>
            <p className="hero-role">Researcher | Writer | Aspiring Digital Professional</p>
            <p className="hero-intro">
              I am a curious and hardworking graduate developing practical digital skills in data,
              writing, research, web development, and artificial intelligence.
            </p>
            <div className="btn-row">
              <Button asChild className="btn btn-primary"><a href="#projects">View My Work <ArrowUpRight /></a></Button>
              <Button asChild variant="outline" className="btn btn-outline"><a href="#contact">Let's Connect <ArrowRight /></a></Button>
            </div>
            <p className="hero-note"><MapPin size={15} /> Based in Nigeria · Open to learning & opportunities</p>
          </div>
          <div className="hero-portrait">
            <img src={sophieImage} alt="Portrait of Sophia" width={1086} height={1195} />
          </div>
        </div>
        <div className="container hero-bottom"><span>ROOTED IN RESEARCH. GROWING IN TECH.</span><a href="#about" aria-label="Discover more about Sophia"><ArrowDown size={22} /></a></div>
      </section>

      <div className="discipline-strip"><div className="container"><span>Research <Sparkles /></span><span>Writing <Sparkles /></span><span>Data <Sparkles /></span><span>Technology <Sparkles /></span><span>Continuous growth <Leaf /></span></div></div>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <SectionTitle eyebrow="A little about me" title="Grounded in research. Growing in tech." />
          <div className="about-grid">
            <div className="about-bio">
              <p>
                I'm Sophia, a recently graduated <strong>Bachelor of Agriculture (Agricultural
                Economics)</strong> student from the <strong>University of Calabar, Nigeria.</strong> My
                academic journey developed my skills in research, data interpretation, problem solving,
                analysis, and report writing.
              </p>
              <p>
                Today, I'm expanding these skills into the digital space. As a beginner in web
                development and an aspiring digital professional, I'm exploring data entry, data
                analysis, technical writing, web development, and artificial intelligence.
              </p>
              <p>
                I enjoy learning new digital tools and using technology to solve practical problems. My
                goal is to build a career that brings together{" "}
                <strong>communication, technology, research, and digital skills</strong> — with
                curiosity and continuous learning at its heart.
              </p>
            </div>
            <div className="about-cards">
              {aboutCards.map((c) => (
                <div key={c.title} className="mini-card">
                  <span className="icon-bubble"><IconMark symbol={c.icon} /></span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="section section-tint">
        <div className="container">
          <SectionTitle eyebrow="Step by step" title="My Journey" />
          <ol className="timeline">
            {journey.map((step, i) => (
              <li key={step.title} className="timeline-item">
                <div className="timeline-dot"><IconMark symbol={step.icon} /></div>
                <div className="timeline-card">
                  <span className="step-num">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="container">
          <SectionTitle
            eyebrow="What I'm developing"
            title="My Skills"
            text="A growing toolkit, built through learning and hands-on practice."
          />
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-group">
              <h3 className="group-title">
                <IconMark symbol={group.icon} /> {group.title}
              </h3>
              <div className="skill-list">
                {group.skills.map((s) => (
                  <div key={s.name} className="skill-card">
                    <span className="skill-icon"><IconMark symbol={s.icon} /></span>
                    <h4>{s.name}</h4>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section section-dark">
        <div className="container">
          <SectionTitle
            eyebrow="Learning through doing"
            title="My Projects"
            text="A selection of academic work and my growing digital practice."
          />
          <div className="project-list">
            {projects.map((p) => (
              <article key={p.title} className="project-card">
                <div className="project-img">
                  {/* Replace the image file in public/images/projects/ to change this */}
                  <img src={p.image} alt={p.title} loading="lazy" width={1200} height={800} />
                  <span className="img-note">Illustrative image</span>
                </div>
                <div className="project-body">
                  <span className="project-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="chips">
                    {p.skills.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                  <Button variant="ghost" className="btn btn-small" onClick={() => setSelectedProject(p)}>Explore Project <ArrowUpRight /></Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION + CERTIFICATES */}
      <section id="education" className="section">
        <div className="container">
          <SectionTitle eyebrow="My foundation" title="Education" />
          <div className="edu-row">
            <div className="edu-card">
              <div className="edu-icon"><GraduationCap size={32} strokeWidth={1.5} /></div>
              <div>
                <span className="status">Recently graduated</span>
                <h3>University of Calabar</h3>
                <p className="edu-degree">Bachelor of Agriculture (B.Agric)</p>
                <p>Agricultural Economics · Nigeria 🇳🇬</p>
              </div>
            </div>
            <div className="edu-card edu-soft">
              <div className="edu-icon"><BookOpen size={32} strokeWidth={1.5} /></div>
              <div>
                <h3>Continuous Learning</h3>
                <p>
                  Building on my academic foundation through digital courses, certificates, and
                  practical training.
                </p>
              </div>
            </div>
          </div>

          <div className="sub-section">
            <SectionTitle
              eyebrow="Building my knowledge"
              title="Certifications & Training"
              text="Learning interests — certificates will be added as earned."
            />
            <div className="cert-list">
              {certificates.map((c) => (
                <div key={c.title} className="cert-card">
                  <div className="cert-img">
                    {c.image ? (
                      <img src={c.image} alt={c.title} loading="lazy" />
                    ) : (
                      <div className="cert-placeholder">
                        <IconMark symbol={c.icon} />
                        <small>Learning in progress</small>
                      </div>
                    )}
                  </div>
                  <h3>{c.title}</h3>
                  <p>Learning area · Certificate to be added</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section section-tint">
        <div className="container">
          <SectionTitle eyebrow="Learning beyond the classroom" title="Experience" />
          <div className="exp-row">
            <div className="exp-card">
              <div className="exp-head">
                <span className="icon-bubble big"><BookOpen size={28} strokeWidth={1.5} /></span>
                <div>
                  <span className="project-tag">Teaching experience</span>
                  <h3>Teacher</h3>
                  <p className="exp-place">Embodiment of Love Academy</p>
                </div>
              </div>
              <ul className="exp-list">
                {responsibilities.map((r) => (
                  <li key={r.text}>
                    <span><IconMark symbol={r.icon} /></span>
                    {r.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="exp-card exp-soft">
              <span className="project-tag">Looking ahead</span>
              <h3>Professional Development</h3>
              <p>
                I'm continuously developing my digital skills through independent learning and practical
                exercises in data, writing, web development, and AI.
              </p>
              <p>
                I bring a research mindset, a willingness to learn, and the communication skills
                developed through teaching. I'm interested in opportunities where I can contribute, gain
                experience, and grow.
              </p>
              <div className="chips">
                <span className="chip">Practical learning</span>
                <span className="chip">Digital skills</span>
                <span className="chip">Career growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH ME */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="What I bring" title="Why Work With Me?" />
          <div className="why-list">
            {whyCards.map((w) => (
              <div key={w.title} className="why-card">
                <span className="why-icon"><IconMark symbol={w.icon} /></span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENTLY LEARNING */}
      <section className="section section-tint">
        <div className="container">
          <SectionTitle eyebrow="Always growing" title="What I'm Currently Learning" />
          <div className="learn-list">
            {learning.map((l) => (
              <div key={l.name} className="learn-card">
                <div className="learn-top">
                  <span className="skill-icon"><IconMark symbol={l.icon} /></span>
                  <span className="learn-status">{l.status}</span>
                </div>
                <h3>{l.name}</h3>
                {/* Leaf steps show the stage, not a percentage */}
                <div className="leaf-steps">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={n <= l.level ? "leaf on" : "leaf"}></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GITHUB */}
      <GithubSection />

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="container contact-inner">
          <span className="eyebrow light">Let's connect</span>
          <h2>Let's Work Together</h2>
          <p>
            Whether it's research, writing, data, technology, or a new learning opportunity, I'm always
            open to meaningful opportunities and collaboration.
          </p>
          <div className="contact-list">
            {contacts.map((c) => (
              <a key={c.label} href={c.href} className="contact-card">
                <span className="contact-icon"><IconMark symbol={c.icon} /></span>
                <strong>{c.label}</strong>
                <small>{c.value}</small>
              </a>
            ))}
          </div>
          <p className="contact-note">Based in Nigeria. Ready for the next chapter.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner"><a href="#home" className="footer-brand">Sophia.</a><p>© 2026 Sophia. All Rights Reserved.</p><a href="#home">Back to top <ArrowUpRight size={16} /></a></div>
      </footer>
      <Dialog open={selectedProject !== null} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
        <DialogContent className="project-dialog">
          {selectedProject && <>
            <img src={selectedProject.image} alt={selectedProject.title} width={1200} height={800} className="dialog-project-image" />
            <DialogHeader><span className="project-tag">{selectedProject.tag}</span><DialogTitle>{selectedProject.title}</DialogTitle><DialogDescription>{selectedProject.text}</DialogDescription></DialogHeader>
            <div className="chips">{selectedProject.skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div>
            <Button asChild><a href="mailto:sophiechrisng@gmail.com">Ask me about this project <ArrowUpRight /></a></Button>
          </>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
