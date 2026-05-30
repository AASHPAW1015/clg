import LogoLoop from './LogoLoop';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiGo,
  SiLua,
  SiSwift,
  SiReact,
  SiFastapi,
  SiLinux,
  SiGit,
  SiCloudflare,
  SiNginx,
  SiFirebase,
  SiDocker,
  SiNeovim,
  SiApple,
  SiHtml5,
  SiSqlite,
  SiGnubash,
} from 'react-icons/si';
import './TechScroller.css';

const techLogos = [
  { node: <SiPython color="#3776AB" />, title: "Python" },
  { node: <SiCplusplus color="#00599C" />, title: "C++" },
  { node: <SiJavascript color="#F7DF1E" />, title: "JavaScript" },
  { node: <SiTypescript color="#3178C6" />, title: "TypeScript" },
  { node: <SiGo color="#00ADD8" />, title: "Go" },
  { node: <SiLua color="#2C2D72" />, title: "Lua" },
  { node: <SiSwift color="#F05138" />, title: "Swift" },
  { node: <SiHtml5 color="#E34F26" />, title: "HTML" },
  { node: <SiSqlite color="#003B57" />, title: "SQL" },
  { node: <SiReact color="#61DAFB" />, title: "React" },
  { node: <SiFastapi color="#009688" />, title: "FastAPI" },
  { node: <SiDocker color="#2496ED" />, title: "Docker" },
  { node: <SiLinux color="#FCC624" />, title: "Linux" },
  { node: <SiGit color="#F05032" />, title: "Git" },
  { node: <SiCloudflare color="#F38020" />, title: "Cloudflare" },
  { node: <SiNginx color="#009639" />, title: "Nginx" },
  { node: <SiFirebase color="#FFCA28" />, title: "Firebase" },
  { node: <SiNeovim color="#57A143" />, title: "Neovim" },
  { node: <SiApple color="#999999" />, title: "macOS" },
  { node: <SiGnubash color="#4EAA25" />, title: "Shell" },
];

export default function TechScroller() {
  return (
    <section className="tech-scroller" aria-label="Technologies I work with">
      <div className="tech-scroller__label">
        <span className="tech-scroller__dot" />
        tech I work with
      </div>
      <LogoLoop
        logos={techLogos}
        speed={60}
        direction="left"
        logoHeight={22}
        gap={44}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="var(--bg)"
        ariaLabel="Technologies and tools"
      />
    </section>
  );
}
