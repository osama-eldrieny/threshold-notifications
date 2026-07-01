import React from 'react';
import { Button, Badge, InlineBadge, List, IconButton, Chip, Alert } from '@exp-textura/react';
import { Solutions, Orchestration, Agent, Apps, Workflow, Documents, Data, Filter } from '@exp-textura/icons/streamline-sl';
import '../styles/HomePage.css';

// ── Quick Action Cards Data ────────────────────────────────────────────────
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

// ── Workflows Table Data ──────────────────────────────────────────────────
const recentsData = [
  { id: 1, name: 'Employee portal', solution: 'Portal', owner: 'Carmine Smith', lastUpdated: '2 hours ago', icon: <Apps />, iconColor: '#9B7EDE' },
  { id: 2, name: 'Offboarding process', solution: 'Workflow', owner: 'Sarah Johnson', lastUpdated: 'Yesterday', icon: <Workflow />, iconColor: '#E6A3C7' },
  { id: 3, name: 'Employee manual', solution: 'Document', owner: 'Mike Chen', lastUpdated: '3 days ago', icon: <Documents />, iconColor: '#FFB088' },
  { id: 4, name: 'New account checklist', solution: 'Checklist', owner: 'Emma Davis', lastUpdated: '1 week ago', icon: <Workflow />, iconColor: '#FFB088' },
  { id: 5, name: 'Employee data', solution: 'Table', owner: 'Alex Turner', lastUpdated: '2 weeks ago', icon: <Data />, iconColor: '#4A9EFF' },
];

// ── Starter Solutions Data ─────────────────────────────────────────────────
const starterSolutions = [
  { id: 1, name: 'Employee Portal', badge: 'EP', badgeBg: '#4F1578', description: 'A self-service entry point for employees to manage their personal details, leave entitlements and banking details.' },
  { id: 2, name: 'HR Portal', badge: 'Hp', badgeBg: '#2E8540', description: 'A central  hub for HR staff to manage onboarding, salary information and leave requests.' },
  { id: 3, name: 'Customer Insurance Claims', badge: 'Ci', badgeBg: '#4F1578', description: 'A self-service entry point for customers to manage their personal details, leave entitlements and banking details.' },
];

// ── Recents List Component (Textura List) ─────────────────────────────────
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

// ── Full Featured List Example Data ────────────────────────────────────────
const ExampleList = List.ofType();

const exampleListData = [
  { id: 1, fileName: 'Project Proposal.docx', fileType: 'Document', size: '2.4 MB', modified: 'Today at 10:30 AM', status: 'Active' },
  { id: 2, fileName: 'Budget 2024.xlsx', fileType: 'Spreadsheet', size: '1.8 MB', modified: 'Yesterday at 3:15 PM', status: 'Active' },
  { id: 3, fileName: 'Team Photo.jpg', fileType: 'Image', size: '5.2 MB', modified: '2 days ago', status: 'Active' },
  { id: 4, fileName: 'Meeting Notes.pdf', fileType: 'Document', size: '856 KB', modified: '3 days ago', status: 'Draft' },
  { id: 5, fileName: 'Q1 Report.pptx', fileType: 'Presentation', size: '12.5 MB', modified: '1 week ago', status: 'Active' },
  { id: 6, fileName: 'Client Contract.pdf', fileType: 'Document', size: '3.1 MB', modified: '1 week ago', status: 'Active' },
  { id: 7, fileName: 'Design Assets.zip', fileType: 'Archive', size: '45.2 MB', modified: '2 weeks ago', status: 'Archived' },
  { id: 8, fileName: 'Analytics Dashboard.xlsx', fileType: 'Spreadsheet', size: '2.7 MB', modified: '2 weeks ago', status: 'Active' },
];

const exampleListColumns = [
  { 
    accessorKey: 'fileName', 
    header: 'File Name',
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Documents style={{ color: '#666' }} />
        <span style={{ fontWeight: '500' }}>{row.original.fileName}</span>
      </div>
    )
  },
  { accessorKey: 'fileType', header: 'Type' },
  { accessorKey: 'size', header: 'Size' },
  { accessorKey: 'modified', header: 'Modified' },
  { 
    accessorKey: 'status', 
    header: 'Status',
    cell: ({ row }) => (
      <Chip 
        type="subtle"
        variant={row.original.status === 'Active' ? 'success' : row.original.status === 'Draft' ? 'warning' : 'neutral'}
      >
        {row.original.status}
      </Chip>
    )
  },
];

export function HomePage() {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  
  // State for example list
  const [exampleGlobalFilter, setExampleGlobalFilter] = React.useState('');
  const [exampleColumnFilters, setExampleColumnFilters] = React.useState([]);
  const [examplePagination, setExamplePagination] = React.useState({ pageIndex: 0, pageSize: 5 });
  const [exampleSorting, setExampleSorting] = React.useState([]);
  
  // State for alert visibility
  const [showAlert, setShowAlert] = React.useState(true);

  return (
    <div className="home-page">
      {/* ── Greeting Header ── */}
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

      {/* ── Quick Action Cards (Textura styled) ── */}
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

      {/* ── Workflows Section (100% Textura List Component) ── */}
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

      {/* ── Starter Solutions Section (Textura styled) ── */}
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

      {/* ── Full Featured Textura List Component Example ── */}
      <section className="example-list-section">
        <h2 className="section-header">Full Textura List Component</h2>
        <ExampleList
          columns={exampleListColumns}
          data={exampleListData}
          state={{ 
            globalFilter: exampleGlobalFilter, 
            columnFilters: exampleColumnFilters, 
            pagination: examplePagination, 
            sorting: exampleSorting 
          }}
          onGlobalFilterChange={setExampleGlobalFilter}
          onColumnFiltersChange={setExampleColumnFilters}
          onPaginationChange={setExamplePagination}
          onSortingChange={setExampleSorting}
        >
          <ExampleList.Toolbar>
            <ExampleList.Search placeholder="Search files..." />
            <IconButton buttonType="secondary" aria-label="Filter">
              <Filter />
            </IconButton>
            <ExampleList.ToolbarTrailing>
              <Button buttonType="primary">Upload File</Button>
            </ExampleList.ToolbarTrailing>
          </ExampleList.Toolbar>
          <ExampleList.Header />
          <ExampleList.Body />
          <ExampleList.Footer>
            <ExampleList.PageSizeSelect options={[5, 10, 20]} />
            <ExampleList.Pagination />
          </ExampleList.Footer>
        </ExampleList>
      </section>
    </div>
  );
}
