import { useState, useEffect, useRef } from 'react';
import './Portfolio.css';
import { FaCode, FaServer, FaDatabase, FaCloud, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaExternalLinkAlt, FaBriefcase, FaGraduationCap, FaDownload, FaBars, FaTimes } from 'react-icons/fa';
import { useScrollAnimation } from './useScrollAnimation';
import { useForm, ValidationError } from '@formspree/react';

const Portfolio = () => {
  const cursorRef = useRef(null);
  const formRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, handleSubmit] = useForm('xqeolgwy');
  const [showSuccess, setShowSuccess] = useState(false);

  // On a successful submit, clear the fields, show a thank-you, then auto-dismiss it.
  useEffect(() => {
    if (!formState.succeeded) return;
    formRef.current?.reset();
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 6000);
    return () => clearTimeout(timer);
  }, [formState.succeeded]);

  // Custom cursor driven by refs + rAF so it never triggers React re-renders.
  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let frame = 0;

    const handleMouseMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const hovering = !!e.target.closest('a, button, .skill-card, .project-card, .timeline-content');
      cursor?.classList.toggle('hovering', hovering);
    };

    const render = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  const [aboutRef, aboutVisible] = useScrollAnimation({ initialVisible: true });
  const [skillsRef, skillsVisible] = useScrollAnimation();
  const [experienceRef, experienceVisible] = useScrollAnimation();
  const [educationRef, educationVisible] = useScrollAnimation();
  const [projectsRef, projectsVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  const baseUrl = import.meta.env.BASE_URL;
  const closeMenu = () => setMenuOpen(false);

  // Gracefully degrade if a project image is missing.
  const handleImgError = (e) => {
    e.currentTarget.parentElement.classList.add('no-img');
  };

  return (
    <div className="portfolio">
      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef} aria-hidden="true">
        <div className="cursor-dot" />
        <div className="cursor-ring" />
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand"><a href="#home" onClick={closeMenu}>UT</a></div>
        <button
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
          <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
          <li><a href="#education" onClick={closeMenu}>Education</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-bg" aria-hidden="true" />
        <img src={`${baseUrl}profile.png`} alt="Unurbat Tumen-Ulzii" className="profile-img" />
        <h1>Hi, I'm <span className="highlight">Unurbat Tumen-Ulzii</span></h1>
        <p className="subtitle">
          Software Engineer with 12+ years of hands-on development across web and mobile projects
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          <a href={`${baseUrl}Unurbat-Tumen-Ulzii-CV.docx`} download className="btn btn-secondary">
            <FaDownload /> Download CV
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className={`about ${aboutVisible ? 'visible' : ''}`} id="about" ref={aboutRef}>
        <div className="about-content">
          <div className="about-text">
            <span className="eyebrow">01 — About</span>
            <h2>About Me</h2>
            <p>
              Experienced software engineer with over 12 years of hands-on development across web and mobile
              projects. I've worked with a wide range of technologies, which has made me adaptable and confident
              working on both frontend and backend systems.
            </p>
            <p>
              Proficient in Python, PHP, JavaScript, and cloud platforms like AWS, I enjoy solving complex problems,
              optimizing performance, and helping teams adopt better tools and workflows.
            </p>
            <div className="stats">
              <div className="stat">
                <h3>12+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>4</h3>
                <p>Companies</p>
              </div>
              <div className="stat">
                <h3>MIT</h3>
                <p>Swinburne University</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={`${baseUrl}workspace.png`} alt="Workspace" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`skills ${skillsVisible ? 'visible' : ''}`} id="skills" ref={skillsRef}>
        <span className="eyebrow">02 — Skills</span>
        <h2>Skills &amp; Technologies</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon"><FaCode /></div>
            <h3>Languages</h3>
            <ul>
              <li>Python</li>
              <li>PHP</li>
              <li>JavaScript</li>
            </ul>
          </div>
          <div className="skill-card">
            <div className="skill-icon"><FaServer /></div>
            <h3>Frameworks</h3>
            <ul>
              <li>Laravel / Symfony</li>
              <li>Node.js / Express.js</li>
              <li>Vue.js / Next.js</li>
              <li>Django / Flask</li>
            </ul>
          </div>
          <div className="skill-card">
            <div className="skill-icon"><FaDatabase /></div>
            <h3>Database</h3>
            <ul>
              <li>MySQL</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>DynamoDB</li>
            </ul>
          </div>
          <div className="skill-card">
            <div className="skill-icon"><FaCloud /></div>
            <h3>DevOps &amp; Tools</h3>
            <ul>
              <li>AWS (EC2, S3, EBS)</li>
              <li>Docker</li>
              <li>CircleCI / Github Workflow</li>
              <li>Unit Testing / REST / Git</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className={`experience ${experienceVisible ? 'visible' : ''}`} id="experience" ref={experienceRef}>
        <span className="eyebrow">03 — Experience</span>
        <h2>Work Experience</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon"><FaBriefcase /></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Software Engineer</h3>
                <span className="timeline-date">Aug 2024 - Present</span>
              </div>
              <h4 className="company">Haviland Software</h4>
              <p>
                Enhanced site architecture and developed comprehensive training module for legislativellama.org in NextJS.
                Automated development process using OpenHands library.
                Developed carbon forecast mobile application using Flutterflow.
              </p>
              <div className="timeline-tags">
                <span className="tag">Next.js</span>
                <span className="tag">Flutterflow</span>
                <span className="tag">OpenHands</span>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon"><FaBriefcase /></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Software Engineer</h3>
                <span className="timeline-date">Sep 2021 - Aug 2024</span>
              </div>
              <h4 className="company">Bright Power</h4>
              <p>
                Built Python bot using Slack &amp; Jira APIs to automate billing issue detection.
                Led CI/CD framework design and AWS infrastructure migration.
                Reduced monthly costs by ~$500 migrating from EBS to S3.
                Migrated from OrientDB to DynamoDB, improving application speed.
              </p>
              <div className="timeline-tags">
                <span className="tag">Python</span>
                <span className="tag">AWS</span>
                <span className="tag">DynamoDB</span>
                <span className="tag">CI/CD</span>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon"><FaBriefcase /></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Senior Web Developer</h3>
                <span className="timeline-date">Feb 2017 - Sep 2021</span>
              </div>
              <h4 className="company">Nomin Holding</h4>
              <p>
                Rebuilt internal HR system in Laravel from Symfony 1.4, boosting performance.
                Developed React Native app for employee HR data access.
                Scaled e-commerce catalog from 10K to 200K+ items, tripling online sales.
                Built real-time fridge monitoring system using Laravel + Python + 200 Raspberry Pis.
              </p>
              <div className="timeline-tags">
                <span className="tag">Laravel</span>
                <span className="tag">React Native</span>
                <span className="tag">Python</span>
                <span className="tag">Raspberry Pi</span>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon"><FaBriefcase /></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Web Developer</h3>
                <span className="timeline-date">Jul 2011 - Feb 2017</span>
              </div>
              <h4 className="company">Gegeen Dalai Group (TV5 Broadcasting)</h4>
              <p>
                Developed software and managed server infrastructure for TV5 Broadcasting.
                Built TV headline and live scoring system using Node.js and Express.js.
                Created news portal and live TV platform using Symfony 2.3 framework.
              </p>
              <div className="timeline-tags">
                <span className="tag">Symfony</span>
                <span className="tag">Node.js</span>
                <span className="tag">Express.js</span>
                <span className="tag">CodeIgniter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className={`education ${educationVisible ? 'visible' : ''}`} id="education" ref={educationRef}>
        <span className="eyebrow">04 — Education</span>
        <h2>Education</h2>
        <div className="education-grid">
          <div className="education-card">
            <div className="education-icon"><FaGraduationCap /></div>
            <div className="education-body">
              <h3>Master of Information Technology</h3>
              <h4 className="institution">Swinburne University of Technology</h4>
              <p className="education-meta">Melbourne, Australia</p>
            </div>
          </div>
          <div className="education-card">
            <div className="education-icon"><FaGraduationCap /></div>
            <div className="education-body">
              <h3>Bachelor of Computer Science</h3>
              <h4 className="institution">International Ulaanbaatar University</h4>
              <p className="education-meta">Ulaanbaatar, Mongolia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`projects ${projectsVisible ? 'visible' : ''}`} id="projects" ref={projectsRef}>
        <span className="eyebrow">05 — Projects</span>
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-img">
              <img src={`${baseUrl}project1.png`} alt="E-Commerce Platform" onError={handleImgError} />
            </div>
            <h3>E-Commerce Platform</h3>
            <p>Full-stack e-commerce solution with React, Node.js, and Stripe integration.</p>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">Node.js</span>
              <span className="tag">MongoDB</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link"><FaExternalLinkAlt /> Live Demo</a>
              <a href="#" className="project-link"><FaGithub /> Code</a>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">
              <img src={`${baseUrl}project2.png`} alt="Task Management App" onError={handleImgError} />
            </div>
            <h3>Task Management App</h3>
            <p>Cross-platform mobile app built with React Native and Firebase backend.</p>
            <div className="project-tags">
              <span className="tag">React Native</span>
              <span className="tag">Firebase</span>
              <span className="tag">Redux</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link"><FaExternalLinkAlt /> Live Demo</a>
              <a href="#" className="project-link"><FaGithub /> Code</a>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">
              <img src={`${baseUrl}project3.png`} alt="Analytics Dashboard" onError={handleImgError} />
            </div>
            <h3>Analytics Dashboard</h3>
            <p>Real-time analytics dashboard with interactive charts and data visualization.</p>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">Python</span>
              <span className="tag">D3.js</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link"><FaExternalLinkAlt /> Live Demo</a>
              <a href="#" className="project-link"><FaGithub /> Code</a>
            </div>
          </div>
          <div className="project-card">
            <div className="project-img">
              <img src={`${baseUrl}project4.png`} alt="Victoria Road Crash Analytics" onError={handleImgError} />
            </div>
            <h3>Victoria Road Crash Analytics</h3>
            <p>End-to-end analytics platform processing 230K+ crash records with DBSCAN clustering to identify 200+ hotspots and real-time Kafka streaming for live monitoring.</p>
            <div className="project-tags">
              <span className="tag">R</span>
              <span className="tag">Apache Kafka</span>
              <span className="tag">Leaflet.js</span>
              <span className="tag">Docker</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link"><FaExternalLinkAlt /> Live Demo</a>
              <a href="#" className="project-link"><FaGithub /> Code</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`contact ${contactVisible ? 'visible' : ''}`} id="contact" ref={contactRef}>
        <span className="eyebrow">06 — Contact</span>
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="icon"><FaEnvelope /></span>
                <div>
                  <strong>Email</strong>
                  <p>unurut@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="icon"><FaPhone /></span>
                <div>
                  <strong>Phone</strong>
                  <p>+61 0473 457 356</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/unurbat/" className="social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
              <a href="https://github.com/unurbat2848" className="social-icon" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
            </div>
          </div>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Name" required />
            <ValidationError prefix="Name" field="name" errors={formState.errors} className="field-error" />
            <label className="visually-hidden" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Email" required />
            <ValidationError prefix="Email" field="email" errors={formState.errors} className="field-error" />
            <label className="visually-hidden" htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Message" rows="5" required></textarea>
            <ValidationError prefix="Message" field="message" errors={formState.errors} className="field-error" />
            <button type="submit" className="btn btn-primary" disabled={formState.submitting}>
              {formState.submitting ? 'Sending…' : 'Send Message'}
            </button>
            <ValidationError errors={formState.errors} className="form-status error" />
            {showSuccess && (
              <p className="form-status success" role="status">
                Thanks! Your message has been sent — I'll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Unurbat Tumen-Ulzii. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
