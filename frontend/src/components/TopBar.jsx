import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/practice', label: 'Practice' }
];

export default function TopBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CodeArena</div>
      <div>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active-link' : '')}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
