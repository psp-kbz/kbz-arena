import {
  ArrowLeft,
  CircleUserRound,
  House,
  Shield,
  Trophy,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo/KBZArena-logo.png";
import { hasAcceptedSquad } from "@/mock/arena-data";

const tabs = [
  { to: "/home", label: "Home", icon: House },
  { to: "/requests", label: "Requests", icon: Trophy },
];

const teamTab = { to: "/team", label: "My Team", icon: Shield };
const profileTab = { to: "/profile", label: "Profile", icon: CircleUserRound };

export default function MobileLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/home";
  const TeamIcon = teamTab.icon;
  const ProfileIcon = profileTab.icon;

  const appBarConfig = (() => {
    if (location.pathname === "/requests") {
      return {
        title: "My Requests",
        subtitle: "Track your join requests",
        canGoBack: false,
      };
    }

    if (location.pathname === "/team") {
      return {
        title: "My Team",
        subtitle: "Your active squad",
        canGoBack: false,
      };
    }

    if (location.pathname === "/profile") {
      return {
        title: "My Profile",
        subtitle: "Account and saved game IDs",
        canGoBack: false,
      };
    }

    if (/^\/tournaments\/[^/]+\/teams$/.test(location.pathname)) {
      return {
        title: "Team Selection",
        subtitle: "Choose a squad to join",
        canGoBack: true,
      };
    }

    if (/^\/requests\/[^/]+\/status$/.test(location.pathname)) {
      return {
        title: "Status & Payment",
        subtitle: "Registration progress",
        canGoBack: true,
      };
    }

    return null;
  })();

  return (
    <main className="arena-layout">
      <header className="arena-header">
        {isHome ? (
          <div className="header-card header-hero row-between">
            <div className="header-copy">
              <p className="header-kicker">KBZ Arena</p>
              <h1 className="header-title">Tournament Hub</h1>
              <p className="muted">
                Find tournaments, choose your squad, and jump straight into the
                match flow.
              </p>
            </div>

            <div className="header-logo-wrap">
              <img className="header-logo" src={logo} alt="KBZ Arena" />
            </div>
          </div>
        ) : appBarConfig ? (
          <div className="app-bar">
            <div className="app-bar-row">
              {appBarConfig.canGoBack ? (
                <button
                  className="btn btn-ghost back-btn"
                  type="button"
                  aria-label="Go back"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft size={18} />
                </button>
              ) : (
                <span className="app-bar-spacer" />
              )}

              <div className="app-bar-copy">
                <h1 className="app-bar-title">{appBarConfig.title}</h1>
                <p className="app-bar-subtitle">{appBarConfig.subtitle}</p>
              </div>

              <span className="app-bar-spacer" />
            </div>
          </div>
        ) : null}
      </header>

      <section className="arena-content">
        <Outlet />
      </section>

      <nav className={`bottom-tabs ${hasAcceptedSquad ? "with-team" : ""}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `tab-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}

        {hasAcceptedSquad && (
          <NavLink
            to={teamTab.to}
            className={({ isActive }) => `tab-link ${isActive ? "active" : ""}`}
          >
            <TeamIcon size={16} />
            <span>{teamTab.label}</span>
          </NavLink>
        )}

        <NavLink
          to={profileTab.to}
          className={({ isActive }) => `tab-link ${isActive ? "active" : ""}`}
        >
          <ProfileIcon size={16} />
          <span>{profileTab.label}</span>
        </NavLink>
      </nav>
    </main>
  );
}
