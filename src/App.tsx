import { useEffect, useMemo, useState } from "react";
import CommandPalette, {
  type PaletteAction,
} from "./components/CommandPalette";
import HashLab from "./components/HashLab";
import IdentityProof from "./components/IdentityProof";
import { projects } from "./data/projects";

type FeeData = {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
};

function GitHubIcon() {
  return (
    <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.79.62-3.38-1.21-3.38-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.23-.26-4.58-1.14-4.58-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.85c.85 0 1.7.12 2.5.36 1.9-1.35 2.74-1.06 2.74-1.06.55 1.41.21 2.46.1 2.72.64.72 1.03 1.64 1.03 2.77 0 3.97-2.35 4.83-4.59 5.09.36.32.69.95.69 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31ZM5.32 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11ZM7.1 20.45H3.53V9H7.1v11.45Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.2-.5L12 11.28 18.8 6H5.2ZM19 7.3l-6.39 4.96a1 1 0 0 1-1.22 0L5 7.3v10.2c0 .28.22.5.5.5h13a.5.5 0 0 0 .5-.5V7.3Z"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.3 9.3-1.4-1.42 9.3-9.29H14V3ZM5 5h7v2H5v12h12v-7h2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.74 15.3A9 9 0 0 1 8.7 3.26a.75.75 0 0 0-.96-.96A10.5 10.5 0 1 0 21.7 16.26a.75.75 0 0 0-.96-.96Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm10-6a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm13.66-6.66a1 1 0 0 1 0 1.41l-1.41 1.42a1 1 0 0 1-1.42-1.42l1.42-1.41a1 1 0 0 1 1.41 0Zm-11.9 11.9a1 1 0 0 1 0 1.42l-1.42 1.41a1 1 0 1 1-1.41-1.41l1.41-1.42a1 1 0 0 1 1.42 0Zm0-11.9a1 1 0 0 1 0 1.41L5.34 8.17a1 1 0 1 1-1.41-1.42l1.41-1.41a1 1 0 0 1 1.42 0Zm11.9 11.9a1 1 0 0 1 0 1.42 1 1 0 0 1-1.41 0l-1.42-1.42a1 1 0 1 1 1.42-1.41l1.41 1.41Z"
      />
    </svg>
  );
}

function scrollToId(id: string): void {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [fees, setFees] = useState<FeeData | null>(null);
  const [imageOpen, setImageOpen] = useState(false);
  const [imageClosing, setImageClosing] = useState(false);

  const openImageModal = () => {
    setImageClosing(false);
    setImageOpen(true);
  };

  const closeImageModal = () => {
    if (!imageOpen || imageClosing) {
      return;
    }
    setImageClosing(true);
  };

  useEffect(() => {
    document.body.dataset.theme = lightMode ? "light" : "dark";
  }, [lightMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") {
        closeImageModal();
        setPaletteOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = imageOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [imageOpen]);

  useEffect(() => {
    if (!imageClosing) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setImageOpen(false);
      setImageClosing(false);
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [imageClosing]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch(
          "https://mempool.space/api/v1/fees/recommended",
        );
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as FeeData;
        setFees(data);
      } catch {
        // Ignore network failures to keep the page resilient.
      }
    };

    fetchFees();
    const interval = window.setInterval(fetchFees, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const actions = useMemo<PaletteAction[]>(
    () => [
      {
        id: "go-hero",
        label: "Jump to Hero",
        hint: "Navigation",
        run: () => scrollToId("hero"),
      },
      {
        id: "go-focus",
        label: "Jump to Focus",
        hint: "Navigation",
        run: () => scrollToId("focus"),
      },
      {
        id: "go-projects",
        label: "Jump to Projects",
        hint: "Navigation",
        run: () => scrollToId("projects"),
      },
      {
        id: "go-lab",
        label: "Jump to Lab",
        hint: "Navigation",
        run: () => scrollToId("lab"),
      },
      {
        id: "go-identity",
        label: "Jump to Identity",
        hint: "Navigation",
        run: () => scrollToId("identity"),
      },
      {
        id: "toggle-theme",
        label: lightMode ? "Switch to Dark Mode" : "Switch to Light Mode",
        hint: "Appearance",
        run: () => setLightMode((value) => !value),
      },
      {
        id: "copy-email",
        label: "Copy Email Address",
        hint: "Quick action",
        run: () => {
          void navigator.clipboard.writeText("contact@hedigardi.com");
        },
      },
    ],
    [lightMode],
  );

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <button
        className="theme-toggle"
        type="button"
        aria-label={
          lightMode ? "Switch to dark theme" : "Switch to light theme"
        }
        onClick={() => setLightMode((value) => !value)}
      >
        {lightMode ? <MoonIcon /> : <SunIcon />}
        <span>{lightMode ? "Dark" : "Light"}</span>
      </button>
      <main className="shell">
        <section id="hero" className="hero">
          <button
            className="hero__avatarButton"
            type="button"
            aria-label="Open larger profile image"
            onClick={openImageModal}
          >
            <img
              className="hero__avatar"
              src="/assets/images/portrait.png"
              alt="Portrait of Hedi Gardi"
            />
          </button>
          <p className="hero__eyebrow">Hedi Gardi</p>
          <h1>Fullstack + Blockchain Developer</h1>
          <p className="hero__lead">
            I build practical digital products at the intersection of Bitcoin,
            Web3, and clean user experience.
          </p>
          <p className="hero__hint">Press Ctrl/Cmd + K for commands.</p>
          <div className="hero__links">
            <a
              className="link-with-icon"
              href="https://github.com/hedigardi"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <a
              className="link-with-icon"
              href="https://www.linkedin.com/in/hedigardi/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a className="link-with-icon" href="mailto:contact@hedigardi.com">
              <MailIcon />
              <span>Email</span>
            </a>
          </div>
        </section>

        <section id="focus" className="panel">
          <header className="panel__header">
            <p className="panel__eyebrow">Focus</p>
            <h2>Building trustworthy products for modern finance</h2>
          </header>
          <ul className="focus-list">
            <li>
              Security-first architecture for blockchain-enabled applications.
            </li>
            <li>Clear UX for technically complex workflows and data.</li>
            <li>
              Fast fullstack delivery with maintainable TypeScript systems.
            </li>
          </ul>
        </section>

        <section id="projects" className="panel">
          <header className="panel__header">
            <p className="panel__eyebrow">Portfolio</p>
            <h2>Selected projects</h2>
          </header>

          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <div className="project-card__head">
                  <h3>{project.name}</h3>
                  <span
                    className={`status status--${project.status.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.stack.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="project-card__links">
                  <a
                    className="link-with-icon"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                  </a>
                  {project.demoUrl ? (
                    <a
                      className="link-with-icon"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLinkIcon />
                      <span>Live Demo</span>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <HashLab />

        <IdentityProof />

        <footer className="footer">
          <p>
            <span className="dot" />
            {fees
              ? ` Bitcoin fees: fast ${fees.fastestFee} sat/vB, 30m ${fees.halfHourFee} sat/vB, 1h ${fees.hourFee} sat/vB`
              : " Bitcoin fee feed unavailable right now."}
          </p>
          <p>
            <a
              href="https://github.com/hedigardi/hedi-gardi"
              target="_blank"
              rel="noreferrer"
            >
              Source code
            </a>
            <span> · </span>
            <span>{new Date().getFullYear()} Hedi Gardi</span>
          </p>
        </footer>
      </main>

      {imageOpen ? (
        <div
          className={`image-modal ${imageClosing ? "image-modal--closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged profile image"
        >
          <button
            className="image-modal__backdrop"
            type="button"
            aria-label="Close image preview"
            onClick={closeImageModal}
          />
          <figure className="image-modal__content">
            <button
              className="image-modal__close"
              type="button"
              aria-label="Close image preview"
              onClick={closeImageModal}
            >
              Close
            </button>
            <img
              className="image-modal__image"
              src="/assets/images/portrait.png"
              alt="Portrait of Hedi Gardi enlarged"
            />
          </figure>
        </div>
      ) : null}

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={actions}
      />
    </>
  );
}
