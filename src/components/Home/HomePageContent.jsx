import React, { useState } from 'react';
import { Button, List } from '@exp-textura/react';
import {
  Solutions, Orchestration, Agent, Apps, Workflow, Documents, Data
} from '@exp-textura/icons/streamline-sl';
import { AlertFactory } from '../Alerts/AlertFactory';
import '../../styles/HomePage.css';

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

export function HomePageContent({ tier = 'approaching', userType = 'admin' }) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);

  return (
    <div className="home-page">
      {/* Skip alert render for reaching/admin, exceeding/admin, and approaching/editor (rendered at root level or removed) */}
      {!((tier === 'reaching' && userType === 'admin') || (tier === 'exceeding' && userType === 'admin') || (tier === 'approaching' && userType === 'editor')) && (
        <AlertFactory tier={tier} userType={userType} page="home" />
      )}
      <h1 className="greeting-header">Good morning, Carmine</h1>

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
  );
}
