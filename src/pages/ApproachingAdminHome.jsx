import React from 'react';
import {
  MainNav, Avatar, Badge, Alert, Button, IconButton, Chip,
  PageLayout, List
} from '@exp-textura/react';
import {
  Home, Solutions, Connection, Deployment,
  Agent, Apps, Documents, Orchestration, Data, Workflow,
  Gallery, Help, Settings, Filter
} from '@exp-textura/icons/streamline-sl';
import { HomeSolid } from '@exp-textura/icons/streamline-ss';
import { NintexLogo, NintexLogoSquare } from '@exp-textura/icons/brand';
import '../styles/App.css';
import '../styles/HomePage.css';

// Navigation
const navigationItems = [
  { type: 'item', label: 'Home', icon: <Home />, hoverIcon: <HomeSolid />, href: '#/approaching/admin/home', isCurrent: true },
  { type: 'item', label: 'Solutions', icon: <Solutions />, as: 'button' },
  { type: 'item', label: 'Integrations', icon: <Connection />, as: 'button' },
  { type: 'item', label: 'Deployment', icon: <Deployment />, as: 'button' },
  { type: 'divider' },
  { type: 'item', label: 'Agents', icon: <Agent />, as: 'button' },
  { type: 'item', label: 'Apps', icon: <Apps />, as: 'button' },
  { type: 'item', label: 'Documents', icon: <Documents />, as: 'button' },
  { type: 'item', label: 'Orchestrations', icon: <Orchestration />, as: 'button' },
  { type: 'item', label: 'Tables', icon: <Data />, as: 'button' },
  { type: 'item', label: 'Workflows', icon: <Workflow />, href: '#/workflow', isCurrent: false },
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

const userMenuItems = [
  { label: 'My Settings' },
  { label: 'Notifications', badge: '2' },
];

// Home Page Content
const quickActionCards = [
  {
    id: 1,
    headerColor: 'peach',
    icon: <Solutions />,
    iconBg: 'linear-gradient(135deg, #9265EA, #FB49A8, #9366EA)',
    title: 'Create a solution',
    description: 'Build end-to-end business solutions that connect people, processes, and content.',
    ctaText: 'Start building',
  },
  {
    id: 2,
    headerColor: 'purple',
    icon: <Orchestration />,
    iconBg: 'var(--ntx-color-asset-user-interface)',
    title: 'Map an orchestration',
    description: 'Design complex workflows that automate and orchestrate business processes.',
    ctaText: 'Create an orchestration',
  },
  {
    id: 3,
    headerColor: 'pink',
    icon: <Agent />,
    iconBg: 'var(--ntx-color-asset-automation)',
    title: 'Work with agents',
    description: 'Deploy intelligent agents that can perform tasks autonomously on your behalf.',
    ctaText: 'Create an agent',
  }
];

const recentsData = [
  { id: 1, name: 'Employee portal', solution: 'Portal', owner: 'Carmine Smith', lastUpdated: '2 hours ago', icon: <Apps />, iconColor: '#9B7EDE' },
  { id: 2, name: 'Offboarding process', solution: 'Workflow', owner: 'Sarah Johnson', lastUpdated: 'Yesterday', icon: <Workflow />, iconColor: '#E6A3C7' },
  { id: 3, name: 'Employee manual', solution: 'Document', owner: 'Mike Chen', lastUpdated: '3 days ago', icon: <Documents />, iconColor: '#FFB088' },
  { id: 4, name: 'New account checklist', solution: 'Checklist', owner: 'Emma Davis', lastUpdated: '1 week ago', icon: <Workflow />, iconColor: '#FFB088' },
  { id: 5, name: 'Employee data', solution: 'Table', owner: 'Alex Turner', lastUpdated: '2 weeks ago', icon: <Data />, iconColor: '#4A9EFF' },
];

const starterSolutions = [
  { id: 1, name: 'Employee Portal', badge: 'EP', badgeBg: '#4F1578', description: 'A self-service entry point for employees to manage their personal details, leave entitlements and banking details.' },
  { id: 2, name: 'HR Portal', badge: 'Hp', badgeBg: '#2E8540', description: 'A central hub for HR staff to manage onboarding, salary information and leave requests.' },
  { id: 3, name: 'Customer Insurance Claims', badge: 'Ci', badgeBg: '#4F1578', description: 'A self-service entry point for customers to manage their personal details, leave entitlements and banking details.' },
];

const RecentsList = List.ofType();

const recentsColumns = [
  { 
    accessorKey: 'name', 
    header: 'Name',
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ display: 'flex', color: row.original.iconColor }}>
          {row.original.icon}
        </span>
        <span>{row.original.name}</span>
      </div>
    )
  },
  { accessorKey: 'solution', header: 'Solution' },
  { accessorKey: 'owner', header: 'Owner' },
  { accessorKey: 'lastUpdated', header: 'Last Updated' },
];

export default function AdminHome() {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(true);

  const mainNavNode = (
    <MainNav>
      <MainNav.Header></MainNav.Header>

      <MainNav.Content>
        <MainNav.List>
          {navigationItems.map((item, index) => {
            if (item.type === 'divider') {
              return <MainNav.Divider key={index} />;
            }
            if (item.type === 'menu') {
              return (
                <MainNav.Item key={index} as="button">
                  <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {item.icon}
                    {item.label}
                  </span>
                </MainNav.Item>
              );
            }
            return (
              <MainNav.Item key={index} as={item.as || 'a'} href={item.href}>
                <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {item.isCurrent ? item.hoverIcon : item.icon}
                  {item.label}
                </span>
              </MainNav.Item>
            );
          })}
        </MainNav.List>
      </MainNav.Content>

      <MainNav.Footer>
        <MainNav.Menu>
          <MainNav.MenuTrigger>
            <Avatar name="Sarah (Admin)" size="sm" ring>
              <Avatar.Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" />
              <Avatar.Fallback>SA</Avatar.Fallback>
            </Avatar>
            <Badge spacing="roomy" variant="critical">{userMenuItems[1].badge}</Badge>
            <MainNav.Indicator />
          </MainNav.MenuTrigger>
          <MainNav.MenuContent>
            {userMenuItems.map((item, index) => (
              <MainNav.Item key={index}>
                {item.label}
                {item.badge && (
                  <Badge spacing="roomy" style={{ marginInlineStart: 'auto' }}>{item.badge}</Badge>
                )}
              </MainNav.Item>
            ))}
          </MainNav.MenuContent>
        </MainNav.Menu>
      </MainNav.Footer>
    </MainNav>
  );

  return (
    <PageLayout>
      <PageLayout.SkipToContent />

      <PageLayout.MainNav>
        {mainNavNode}
      </PageLayout.MainNav>

      <PageLayout.Main pageWidth="fullWidth">
        <PageLayout.Body>
          <PageLayout.BodyContent>
            <div className="home-page">
              <h1 className="greeting-header">Good morning, Carmine</h1>

              {/* ── Usage Alert ── */}
              <Alert 
                variant="info" 
                treatment="subtle" 
                type="inline" 
                show={showAlert} 
                onClose={() => setShowAlert(false)}
                style={{ marginBottom: '24px' }}
              >
                <Alert.Icon />
                <Alert.Content>
                  <Alert.Title>Workflow Instances usage trending upward</Alert.Title>
                  <Alert.Description>
                    You're using 78% of your quota (7,800 / 10,000). At this rate you'll hit the limit in ~14 days. Ask your admin to consider upgrading.
                  </Alert.Description>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowAlert(false)}
                    style={{ marginTop: '12px' }}
                  >
                    Got it
                  </Button>
                </Alert.Content>
                <Alert.CloseIconButton />
              </Alert>

              {/* ── Quick Action Cards ── */}
              <div className="quick-actions-grid">
                {quickActionCards.map(card => (
                  <div key={card.id} className={`quick-action-card card-${card.headerColor}`}>
                    <div className="card-header-strip" />
                    <div className="card-content">
                      <div 
                        className="card-icon-badge"
                        style={{ background: card.iconBg }}
                      >
                        {card.icon}
                      </div>
                      <h3 className="card-title">{card.title}</h3>
                      <p className="card-description">{card.description}</p>
                      <Button 
                        buttonType="secondary" 
                        style={{ marginTop: '16px' }}
                      >
                        {card.ctaText}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Workflows Section ── */}
              <section className="recents-section">
                <h2 className="section-header">Workflows</h2>
                <RecentsList
                  columns={recentsColumns}
                  data={recentsData}
                  state={{ globalFilter, columnFilters, sorting }}
                  onGlobalFilterChange={setGlobalFilter}
                  onColumnFiltersChange={setColumnFilters}
                  onSortingChange={setSorting}
                >
                  <RecentsList.Header />
                  <RecentsList.Body />
                </RecentsList>
              </section>

              {/* ── Starter Solutions Section ── */}
              <section className="starter-solutions-section">
                <div className="section-header-row">
                  <h2 className="section-header">Starter solutions</h2>
                  <Button buttonType="tertiary">
                    Go to gallery
                  </Button>
                </div>
                
                <div className="solutions-grid">
                  {starterSolutions.map(solution => (
                    <div key={solution.id} className="solution-card">
                      <div className="solution-header">
                        <div 
                          className="solution-badge"
                          style={{ backgroundColor: solution.badgeBg }}
                        >
                          {solution.badge}
                        </div>
                        <h3 className="solution-title">{solution.name}</h3>
                      </div>
                      <p className="solution-description">{solution.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </PageLayout.BodyContent>
        </PageLayout.Body>
      </PageLayout.Main>
    </PageLayout>
  );
}
