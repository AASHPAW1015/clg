import { NavLink, Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <b>[</b>aashpaw<b>]</b>
      </Link>
      <div className="nav-links">
        <NavLink to="/" end>home</NavLink>
        <NavLink to="/work">work</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/contact">contact</NavLink>
      </div>
    </nav>
  );
}
