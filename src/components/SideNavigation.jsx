import React, { useState, useContext, createContext } from 'react';
import '../styles/SideNavigation.css';

/**
 * MainNav — Textura's main navigation sidebar compound component.
 * Mirrors the Textura MCP Preview story exactly:
 * - Header: Brand (Nintex logo) + CollapseTrigger + Select (environment context-switcher)
 * - Content: Home · Solutions · Integrations · Deployment | Agents · Apps · Documents · Orchestrations · Tables · Workflows | My Nintex · Gallery · Help · Settings (with submenu)
 * - Footer: User row (avatar + notification badge + name) with profile submenu
 *
 * Icon/hoverIcon pairs follow Textura's line-icon (default) → solid-icon (hover/current) rule.
 * @see https://textura.nintex.com/components/main-nav
 * Real import: import { MainNav } from "@exp-textura/react";
 */

// ─── SVG icon stand-ins for @exp-textura/icons ────────────────────────────────
const NavIcon = ({ d, filled = false, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? 'none' : 'currentColor'}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d={d} />
  </svg>
);

// Line (default) + Solid (hover/current) path pairs — mirrors @exp-textura/icons pairs
const ICON_PATHS = {
  Home:             ['M3 12L12 3l9 9M5 10v9h4v-4h6v4h4v-9',                              'M12 3L2 12h3v8h5v-5h4v5h5v-8h3z'],
  Solutions:        ['M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-4M9 3v18M9 3h6', 'M3 5a2 2 0 012-2h4v18H5a2 2 0 01-2-2V5zm6-2h10a2 2 0 012 2v14a2 2 0 01-2 2H9V3z'],
  Connection:       ['M8 6h8M8 12h8M8 18h4',                                             'M3 5h18v2H3zm0 6h18v2H3zm0 6h12v2H3z'],
  Deployment:       ['M12 2l9 4.5V12l-9 4.5L3 12V6.5zM12 12v9M3 6.5l9 5.5 9-5.5',      'M12 2l9 4.5V12l-9 4.5L3 12V6.5z'],
  Agent:            ['M12 11a4 4 0 100-8 4 4 0 000 8zm-8 10a8 8 0 1116 0H4z',           'M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9a9 9 0 0118 0H3z'],
  Apps:             ['M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2z', 'M3 4h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z'],
  Documents:        ['M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 8.414V19a2 2 0 01-2 2z', 'M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z'],
  Orchestration:    ['M12 4v4M8 8H4M20 8h-4M12 20v-4M4 16h4M16 16h4M12 8a4 4 0 100 8 4 4 0 000-8z', 'M12 3a1 1 0 011 1v3h3v2h-3v3h3v2h-3v3a1 1 0 01-2 0v-3H8v-2h3v-3H8V8h3V4a1 1 0 011-1z'],
  Data:             ['M3 3h4v18H3zm7-3h4v21h-4zm7 5h4v13h-4z',                          'M2 3h5v18H2zm7-3h5v21H9zm7 5h5v13h-5z'],
  Workflow:         ['M5 3h4v6H5zm10 0h4v6h-4zM5 15h4v6H5zm10 0h4v6h-4zM9 6h6M9 18h6M12 9v6', 'M4 2h6v7H4zm10 0h6v7h-6zM4 15h6v7H4zm10 0h6v7h-6zM10 5.5h4M10 18.5h4M12 9v6'],
  Gallery:          ['M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zm8-12a1 1 0 11-2 0 1 1 0 012 0z', 'M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm10 3a3 3 0 100 6 3 3 0 000-6z'],
  Help:             ['M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 13a1 1 0 110 2 1 1 0 010-2zm1-4.5a1 1 0 01-2 0V8a1 1 0 012 0v2.5z'],
  Settings:         ['M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z', 'M12 2a2 2 0 012 2 7.9 7.9 0 003.292 1.37 2 2 0 012.83 2.83A7.9 7.9 0 0022 12a2 2 0 010 3.78A7.9 7.9 0 0020.12 19.17a2 2 0 01-2.83 2.83A7.9 7.9 0 0114 22a2 2 0 01-3.78 0A7.9 7.9 0 016.83 20.12a2 2 0 01-2.83-2.83A7.9 7.9 0 012 14a2 2 0 010-3.78A7.9 7.9 0 013.88 6.83 2 2 0 016.83 4a2 2 0 00-2.83-2.83A7.9 7.9 0 0110.22 2a2 2 0 011.78 0zM12 9a3 3 0 100 6 3 3 0 000-6z'],
  NintexLogoSquare: ['M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm7 3l-4 6h8l-4-6zm0 6l4 6H8l4-6z', 'M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm9 0l-4 6h8zm0 6l-4 6h8z'],
};

const Ico = ({ name, solid = false }) => {
  const pair = ICON_PATHS[name];
  if (!pair) return null;
  return <NavIcon d={pair[solid ? 1 : 0]} filled={solid} />;
};
// ─────────────────────────────────────────────────────────────────────────────

const MainNav = ({ collapsed: controlledCollapsed, onCollapseChange, children, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState(controlledCollapsed ?? false);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : isCollapsed;

  const handleCollapse = () => {
    const newState = !collapsed;
    setIsCollapsed(newState);
    onCollapseChange?.(newState);
  };

  return (
    <nav
      className={`textura-main-nav ${collapsed ? 'collapsed' : ''}`}
      aria-label="Main navigation"
      {...props}
    >
      <MainNavContext.Provider value={{ collapsed, handleCollapse }}>
        {children}
      </MainNavContext.Provider>
    </nav>
  );
};

const MainNavContext = React.createContext({ collapsed: false });

// MainNav.Header - Top region with brand and collapse trigger
MainNav.Header = ({ children }) => (
  <div className="textura-main-nav-header">{children}</div>
);

// MainNav.Brand - Brand/product identity at the top
MainNav.Brand = ({ children }) => (
  <div className="textura-main-nav-brand">{children}</div>
);

// MainNav.CollapseTrigger - Collapse/expand toggle button
MainNav.CollapseTrigger = () => {
  const { collapsed, handleCollapse } = React.useContext(MainNavContext);
  return (
    <button
      className="textura-main-nav-collapse-trigger"
      onClick={handleCollapse}
      aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
    >
      {collapsed ? '\u203a' : '\u2039'}
    </button>
  );
};

// MainNav.Select — context-switcher row (environment selector)
MainNav.Select = ({ children }) => {
  const { collapsed } = React.useContext(MainNavContext);
  if (collapsed) return null;
  return <div className="textura-main-nav-select">{children}</div>;
};

// MainNav.Content - Primary scrollable region
MainNav.Content = ({ children }) => (
  <div className="textura-main-nav-content">
    <ul className="textura-main-nav-list">{children}</ul>
  </div>
);

// MainNav.Footer - Bottom region with utilities
MainNav.Footer = ({ children }) => (
  <div className="textura-main-nav-footer">
    <ul className="textura-main-nav-list">{children}</ul>
  </div>
);

// MainNav.Item — standard nav link with icon + hoverIcon pair (line → solid on hover/current)
MainNav.Item = ({ children, isCurrent, icon, hoverIcon, pushed, ...props }) => {
  const { collapsed } = React.useContext(MainNavContext);
  const [hovered, setHovered] = React.useState(false);
  const showSolid = hovered || isCurrent;
  return (
    <li className={pushed ? 'nav-item-pushed' : ''}>
      <button
        className={`textura-main-nav-item ${isCurrent ? 'current' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={collapsed ? String(children) : undefined}
        {...props}
      >
        {icon && (
          <span className="textura-main-nav-item-icon">
            <Ico name={showSolid ? (hoverIcon || icon) : icon} solid={showSolid} />
          </span>
        )}
        {!collapsed && <span className="textura-main-nav-item-label">{children}</span>}
      </button>
    </li>
  );
};

// MainNav.Divider — separator between nav groups
MainNav.Divider = () => <li className="textura-main-nav-divider" />;

// MainNav.Indicator — selected-state indicator (chevron) inside item or user row
MainNav.Indicator = () => (
  <span className="textura-main-nav-indicator" aria-hidden="true">›</span>
);

// MainNav.Menu — submenu wrapper: inline expand (nav expanded) or flyout (nav collapsed)
MainNav.Menu = ({ children, align }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <li className={`textura-main-nav-menu ${open ? 'open' : ''}`}>{children}</li>
    </MenuContext.Provider>
  );
};
const MenuContext = React.createContext({ open: false, setOpen: () => {} });

// MainNav.MenuTrigger — wraps the Item that opens the submenu
MainNav.MenuTrigger = ({ children }) => {
  const { open, setOpen } = React.useContext(MenuContext);
  return (
    <div onClick={() => setOpen((v) => !v)} className="textura-main-nav-menu-trigger">
      {children}
    </div>
  );
};

// MainNav.MenuContent — submenu items panel
MainNav.MenuContent = ({ children }) => {
  const { open } = React.useContext(MenuContext);
  const { collapsed } = React.useContext(MainNavContext);
  if (!open) return null;
  return (
    <ul className={`textura-main-nav-menu-content ${collapsed ? 'flyout' : 'inline'}`}>
      {children}
    </ul>
  );
};

// MainNav.User — user identity row in Footer (taller than standard item)
MainNav.User = ({ children, ...props }) => {
  const { collapsed } = React.useContext(MainNavContext);
  return (
    <button className="textura-main-nav-user" {...props}>
      {children}
      {collapsed && <span className="sr-only">User menu</span>}
    </button>
  );
};

// MainNav.UserAvatar — avatar slot inside the user row
MainNav.UserAvatar = ({ initials }) => (
  <span className="textura-main-nav-user-avatar" aria-hidden="true">{initials}</span>
);

// MainNav.UserNotifications — notification badge inside the user row
MainNav.UserNotifications = ({ count }) => (
  <span className="textura-main-nav-user-notifications" aria-label={`${count} notifications`}>
    {count}
  </span>
);

export default MainNav;
