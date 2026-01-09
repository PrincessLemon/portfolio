import { useMemo, useState } from "react";
import "./App.css";
import star from "./assets/star.png";

const projectsData = [
  {
    title: "Portfolio (this site)",
    tech: ["React", "Vite", "CSS"],
    category: "React",
    desc: "Responsive portfolio built with components, filtering, and accessible navigation.",
    github: "", // add repo later
    demo: "", // add deployed link later
    emoji: "🌸",
    status: "In progress",
    highlights: [
      "Component-based layout (Hero, Projects, Contact)",
      "Project filtering with React state (no page reload)",
      "Accessible anchors + keyboard-friendly focus styles",
      "Mailto + Gmail fallback for easy contact",
    ],
  },
  {
    title: "Asset Tracking (Console App)",
    tech: ["C#", ".NET", "OOP", "LINQ", "API"],
    category: "C#/.NET",
    desc: "Asset lifecycle tracking with sorting, color-coded status, and currency conversion per office.",
    github: "https://github.com/PrincessLemon/Week-3-Asset-Tracking",
    demo: "",
    emoji: "💻",
    highlights: [
      "Inheritance: Asset base class + Computer/Phone child classes",
      "Sorting with LINQ (office → purchase date) + formatted console table",
      "End-of-life logic + color status (e.g. red when close to 3 years)",
      "Currency conversion by office using live rates + fallback handling",
    ],
  },
  {
    title: "ToDoList (Console App)",
    tech: ["C#", ".NET", "LINQ", "Validation", "File I/O"],
    category: "C#/.NET",
    desc: "Task manager console app focusing on clean structure, validation, persistence, and a fun UI.",
    github: "https://github.com/PrincessLemon/ToDoList",
    demo: "",
    emoji: "📝",
    highlights: [
      "Encapsulation via TaskManager (methods instead of direct list access)",
      "LINQ filtering/sorting (by project, date, etc.)",
      "Validation (dates, empty titles) + shortcuts like “today/tomorrow”",
      "Text-file persistence (load/save between runs) + progress bar UI",
    ],
  },
  {
    title: "Bakery Site",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "HTML/CSS",
    desc: "Multi-page website with responsive layout and clean structure (HTML/CSS + JS).",
    github: "https://github.com/PrincessLemon/Bakery",
    demo: "",
    emoji: "🧁",
    highlights: [
      "Multi-page structure (home, products, about, contact)",
      "Responsive layout using modern CSS (flex/grid)",
      "Reusable styling + consistent spacing/typography",
      "JavaScript for page behavior/interactions",
    ],
  },
];

function Chip({ children }) {
  return <span className="chip">{children}</span>;
}

/**
 * We do NOT preventDefault on #anchors.
 * Smooth scrolling is handled in CSS: html { scroll-behavior: smooth; }
 */
function Button({ variant = "primary", href, children }) {
  const className = variant === "ghost" ? "btn ghost" : "btn";
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"));

  if (!href) return <span className={`${className} disabled`}>{children}</span>;

  return (
    <a
      className={className}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      className={active ? "filter active" : "filter"}
      onClick={onClick}
      type="button"
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project }) {
  const hasGithub = Boolean(project.github);
  const hasDemo = Boolean(project.demo);

  return (
    <article className="project">
      <div className="projectTop">
        <h3 className="projectTitle">
          <span className="emoji" aria-hidden="true">
            {project.emoji}
          </span>
          {project.title}
        </h3>

        <div className="projectMeta">
          {project.status && <span className="status">{project.status}</span>}
          <span className="tag">{project.tech.join(" • ")}</span>
        </div>
      </div>

      <p className="muted">{project.desc}</p>

      {Array.isArray(project.highlights) && project.highlights.length > 0 && (
        <ul className="bullets">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      <div className="projectLinks">
        {hasGithub ? (
          <a href={project.github} target="_blank" rel="noreferrer">
            GitHub repo
          </a>
        ) : (
          <span className="muted tiny">Repo coming soon</span>
        )}

        {hasDemo && (
          <a href={project.demo} target="_blank" rel="noreferrer">
            Live demo
          </a>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [filter, setFilter] = useState("All");

  const name = "Emelie Svensson";
  const role = "Frontend student • React + JavaScript • also building in C#/.NET";
  const email = "emeliesvensson1337@gmail.com";
  const githubProfile = "https://github.com/PrincessLemon";

  //  Reliable mailto (subject/body encoded properly)
  const mailtoHref = useMemo(() => {
    const subject = "Hi Emelie 👋";
    const body =
      "Hi Emelie,\n\nI found your portfolio and would love to connect.\n\nBest,\n";
    return `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [email]);

  //  Webmail fallback (Gmail compose)
  const gmailComposeHref = useMemo(() => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent("Hi Emelie 👋")}`;
  }, [email]);

  const categories = useMemo(() => {
    // keep a stable, recruiter-friendly order
    return ["All", "React", "HTML/CSS", "C#/.NET"];
  }, []);

  const visibleProjects = useMemo(() => {
    if (filter === "All") return projectsData;
    return projectsData.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="page">
      <a className="skipLink" href="#main">
        Skip to content
      </a>

      <header className="topbar">
        <div className="brand">
          <span className="badge" aria-hidden="true">
            ✨
          </span>
          <a href="#home" className="brandLink">
            {name}
          </a>
        </div>

        <nav className="nav" aria-label="Primary navigation">
          <Button variant="ghost" href="#about">
            About
          </Button>
          <Button variant="ghost" href="#projects">
            Projects
          </Button>
          <Button variant="ghost" href="#contact">
            Contact
          </Button>
        </nav>
      </header>

      <main id="main" className="wrap">
        {/* HERO */}
        <section id="home" className="card hero">
          <div>
            <p className="kicker">Junior Developer • Student</p>
            <h1 className="title">{name}</h1>
            <p className="subtitle">{role} ✨</p>

            <p className="muted">
              I build cute, clean websites and I’m learning step by step.
              I like projects where design meets real logic (validation, sorting, structure).
            </p>

            <div className="heroActions">
              <Button href="#projects">See my projects</Button>
              <Button variant="ghost" href="#contact">
                Say hi
              </Button>
            </div>

            <div className="chips" aria-label="Technology tags">
              <Chip>React</Chip>
              <Chip>JavaScript</Chip>
              <Chip>HTML</Chip>
              <Chip>CSS</Chip>
              <Chip>C#</Chip>
              <Chip>.NET</Chip>
            </div>
          </div>

          <div className="heroCard">
            <div className="avatar" aria-hidden="true">
              <img className="avatarImg" src={star} alt="" />
            </div>

            <div className="mini">
              <p className="miniTitle">Currently learning</p>
              <p className="miniText">Components, state, responsive design ✨</p>
            </div>
          </div>
        </section>

        {/* ABOUT + SKILLS */}
        <section id="about" className="grid">
          <article className="card">
            <h2>About me</h2>
            <p className="muted">
              I’m studying to become a developer and currently focus on frontend (React).
              I also enjoy backend-style logic in C#/.NET — validation, data structures, and clean code.
            </p>
            <ul className="list">
              <li>I like clean + playful design</li>
              <li>I enjoy building small projects with real logic</li>
              <li>Goal: internship / junior role</li>
            </ul>
          </article>

          <article className="card">
            <h2>Skills</h2>

            <div className="skill">
              <span>HTML</span>
              <span className="bar">
                <i style={{ width: "85%" }} />
              </span>
            </div>

            <div className="skill">
              <span>CSS</span>
              <span className="bar">
                <i style={{ width: "80%" }} />
              </span>
            </div>

            <div className="skill">
              <span>JavaScript</span>
              <span className="bar">
                <i style={{ width: "65%" }} />
              </span>
            </div>

            <div className="skill">
              <span>React</span>
              <span className="bar">
                <i style={{ width: "55%" }} />
              </span>
            </div>

            <div className="skill">
              <span>C#/.NET</span>
              <span className="bar">
                <i style={{ width: "55%" }} />
              </span>
            </div>

            <p className="tiny muted">
              I keep levels realistic and update them as I learn more.
            </p>
          </article>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="card">
          <div className="sectionHead">
            <div>
              <h2>Projects</h2>

            </div>

            <div className="filters" aria-label="Project filters">
              {categories.map((c) => (
                <FilterPill key={c} active={filter === c} onClick={() => setFilter(c)}>
                  {c}
                </FilterPill>
              ))}
            </div>
          </div>

          <div className="projects">
            {visibleProjects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="card">
          <h2>Contact</h2>
          <p className="muted">Want to connect? Send a message ✉️</p>

          <div className="contactRow">
            <Button href={mailtoHref}>Email me</Button>
            <Button variant="ghost" href={gmailComposeHref}>
              Gmail
            </Button>
            {githubProfile && (
              <Button variant="ghost" href={githubProfile}>
                GitHub
              </Button>
            )}
          </div>

          <p className="tiny muted">
            Or email:{" "}
            <a className="inlineLink" href={`mailto:${email}`}>
              {email}
            </a>
          </p>

          <p className="tiny muted">Made with ✨ and snacks.</p>
        </section>

        <footer className="footer">
          <p className="muted">
            © {year} {name} • Portfolio
          </p>
        </footer>
      </main>
    </div>
  );
}
