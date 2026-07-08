import React from 'react';
import { MainNav } from '@exp-textura/react';
import {
  Home, Solutions, Connection, Deployment,
  Agent, Apps, Documents, Orchestration, Data, Workflow,
  Gallery, Help, Settings,
} from '@exp-textura/icons/streamline-sl';
import { HomeSolid } from '@exp-textura/icons/streamline-ss';
import { NintexLogo, NintexLogoSquare } from '@exp-textura/icons/brand';
import { UserFooter } from './UserFooter';

export function SideNav({ tier, currentPage, userType, onUserTypeChange }) {
  const navigationItems = [
    {
      type: 'item',
      label: 'Home',
      icon: <Home />,
      hoverIcon: <HomeSolid />,
      href: `#/${tier}/${userType}/home`,
      isCurrent: currentPage === 'home'
    },
    { type: 'item', label: 'Solutions', icon: <Solutions />, as: 'button' },
    { type: 'item', label: 'Integrations', icon: <Connection />, as: 'button' },
    { type: 'item', label: 'Deployment', icon: <Deployment />, as: 'button' },
    { type: 'divider' },
    { type: 'item', label: 'Agents', icon: <Agent />, as: 'button' },
    { type: 'item', label: 'Apps', icon: <Apps />, as: 'button' },
    { type: 'item', label: 'Documents', icon: <Documents />, as: 'button' },
    { type: 'item', label: 'Orchestrations', icon: <Orchestration />, as: 'button' },
    { type: 'item', label: 'Tables', icon: <Data />, as: 'button' },
    {
      type: 'item',
      label: 'Workflows',
      icon: <Workflow />,
      href: `#/${tier}/${userType}/workflow`,
      isCurrent: currentPage === 'workflow'
    },
    {
      type: 'item',
      label: 'Dashboard',
      icon: <Data />,
      href: `#/dashboard/customer`,
      isCurrent: currentPage === 'dashboardCustomer' || currentPage === 'dashboardTeam'
    },
    { type: 'divider' },
    { type: 'item', label: 'My Nintex', icon: <span style={{ width: '1em', height: '1em', display: 'inline-flex' }}><NintexLogoSquare /></span>, as: 'button' },
    { type: 'item', label: 'Gallery', icon: <Gallery />, href: '#', pushed: true },
    { type: 'item', label: 'Help', icon: <Help />, href: '#' },
    {
      type: 'menu',
      label: 'Settings',
      icon: <Settings />,
      items: [
        { label: 'Environment', as: 'button' },
        { label: 'Organization', as: 'button' },
      ],
    },
  ];

  const navStyle = ((tier === 'reaching' && userType === 'admin' && currentPage === 'home') ||
                    (tier === 'exceeding' && userType === 'admin' && currentPage === 'home'))
    ? { position: 'fixed', top: '0', left: '0', height: '100vh', paddingTop: '50px', overflow: 'auto' }
    : {};

  return (
    <MainNav style={navStyle}>
      <MainNav.Header>
        <MainNav.Brand
          aria-label="Nintex home"
          brandImg={<NintexLogo />}
          href="#"
          role="button"
          squareBrandImg={<NintexLogoSquare />}
          onClick={(e) => e.preventDefault()}
        />
        <MainNav.CollapseTrigger />
      </MainNav.Header>

      <MainNav.Content>
        {navigationItems.map((item, index) => {
          if (item.type === 'divider') {
            return <MainNav.Divider key={index} />;
          }
          if (item.type === 'menu') {
            return (
              <MainNav.Menu key={index}>
                <MainNav.MenuTrigger>
                  <MainNav.Item as="button" icon={item.icon}>
                    {item.label}
                    <MainNav.Indicator />
                  </MainNav.Item>
                </MainNav.MenuTrigger>
                <MainNav.MenuContent>
                  {item.items?.map((subItem, subIndex) => (
                    <MainNav.Item key={subIndex} as={subItem.as}>
                      {subItem.label}
                    </MainNav.Item>
                  ))}
                </MainNav.MenuContent>
              </MainNav.Menu>
            );
          }
          return (
            <MainNav.Item
              key={index}
              as={item.as}
              href={item.href}
              icon={item.icon}
              hoverIcon={item.hoverIcon}
              isCurrent={item.isCurrent}
              pushed={item.pushed}
            >
              {item.label}
            </MainNav.Item>
          );
        })}
      </MainNav.Content>

      <MainNav.Footer>
        <UserFooter userType={userType} onUserTypeChange={onUserTypeChange} />
      </MainNav.Footer>
    </MainNav>
  );
}
