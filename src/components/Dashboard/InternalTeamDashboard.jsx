import React, { useState } from 'react';
import {
  PageLayout, Button, Card, Alert as TexturaAlert, Chip, Avatar,
  List, BarProgress, IconButton, Menu
} from '@exp-textura/react';
import { Check, Visible, Users, Database, Checklist } from '@exp-textura/icons/streamline-sl';
import { SideNav } from '../Layout/SideNav';
import {
  accounts,
  getPercent,
  getDaysToRenewal,
  getStatusLabel,
  getVelocityLabel,
  countByTier,
  getAverageDaysToRenewal,
  getTierByPercent,
} from '../../data/dashboard/accountsData';
import '../../styles/Dashboard.css';

const tierColors = {
  approaching: 'info',
  reaching: 'warning',
  exceeding: 'critical',
};

export function InternalTeamDashboard() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const navigateToAccount = (accountId) => {
    window.location.hash = `#/dashboard/team/account/${accountId}`;
  };

  // Flatten products from all accounts with account info
  const allProducts = accounts.flatMap((account) =>
    account.products.map((product) => ({
      ...product,
      accountName: account.name,
      tenantId: account.tenantId,
      accountId: account.id,
      assignedAM: account.assignedAM,
      region: account.region,
      contractEnd: account.contractEnd,
    }))
  );

  // Filter products by tab (use dynamic tier calculation)
  const tabFilteredProducts = selectedTab === 'all'
    ? allProducts
    : allProducts.filter((p) => {
      const dynamicTier = getTierByPercent(getPercent(p));
      return dynamicTier === selectedTab;
    });

  // Filter products by search term
  const filteredProducts = tabFilteredProducts.filter((p) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      p.accountName.toLowerCase().includes(searchLower) ||
      p.name.toLowerCase().includes(searchLower) ||
      p.assignedAM.toLowerCase().includes(searchLower) ||
      p.region.toLowerCase().includes(searchLower)
    );
  });

  // Default sort: by tier first (exceeding → reaching → approaching), then by usage %
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const tierPriority = { exceeding: 0, reaching: 1, approaching: 2, none: 999 };
    const aTier = getTierByPercent(getPercent(a)) || 'none';
    const bTier = getTierByPercent(getPercent(b)) || 'none';
    const aPriority = tierPriority[aTier];
    const bPriority = tierPriority[bTier];
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    } else {
      return getPercent(b) - getPercent(a);
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const startRow = pageIndex * pageSize;
  const endRow = startRow + pageSize;
  const paginatedProducts = sortedProducts.slice(startRow, endRow);

  const exceedingCount = countByTier('exceeding');
  const reachingCount = countByTier('reaching');
  const approachingCount = countByTier('approaching');
  const avgDaysToRenewal = getAverageDaysToRenewal();

  const columns = [
    {
      accessorKey: 'accountName',
      header: 'Customer Account',
      cell: ({ row }) => (
        <button
          onClick={() => navigateToAccount(row.original.accountId)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Avatar name={row.original.accountName} size="sm">
            <Avatar.Fallback>{row.original.accountName.substring(0, 2).toUpperCase()}</Avatar.Fallback>
          </Avatar>
          <span style={{ color: '#0f1c3f', textDecoration: 'underline', fontWeight: '500', fontSize: '14px' }}>{row.original.accountName}</span>
        </button>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Product',
    },
    {
      id: 'usage',
      header: 'Usage Progress',
      cell: ({ row }) => (
        <div className="usage-cell">
          <div className="progress-bar">
            <BarProgress value={Math.min(getPercent(row.original), 100)} max={100} />
          </div>
          <span className="usage-percent">
            {getPercent(row.original)}%
          </span>
        </div>
      ),
    },
    {
      id: 'absolute',
      header: 'Usage / Limit',
      cell: ({ row }) => {
        const formatNumber = (num) => {
          if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
          if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
          return num.toString();
        };
        return `${formatNumber(row.original.usage)} / ${formatNumber(row.original.limit)}`;
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const calculatedTier = getTierByPercent(getPercent(row.original));
        if (!calculatedTier) return null; // Hide chip if no tier
        return (
          <Chip type="subtle" variant={tierColors[calculatedTier]} size="sm">
            {getStatusLabel(calculatedTier)}
          </Chip>
        );
      },
    },
    {
      id: 'velocity',
      header: 'Growth',
      cell: ({ row }) => (
        <Chip type="subtle" variant={
          row.original.velocity === 'spike' ? 'critical'
            : row.original.velocity === 'steady' ? 'warning'
            : 'neutral'
        } size="sm">
          {row.original.velocity === 'spike' ? '↑ Spike' : row.original.velocity === 'steady' ? '→ Steady' : '→ Flat'}
        </Chip>
      ),
    },
    {
      id: 'am',
      header: 'Account Manager',
      cell: ({ row }) => (
        <div className="am-cell">
          <div className="am-name">{row.original.assignedAM}</div>
          <div className="am-region">{row.original.region}</div>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Menu styleSlots={{ content: { width: 'auto', minWidth: 'auto' } }}>
          <Menu.Trigger asChild>
            <IconButton buttonType="secondary">
              ⋮
            </IconButton>
          </Menu.Trigger>
          <Menu.Content align="end" side="bottom" sideOffset={8}>
            <Menu.Item onClick={() => navigateToAccount(row.original.accountId)}>
              <Menu.ItemLeadingIcon>
                <Visible style={{ width: '18px', height: '18px' }} />
              </Menu.ItemLeadingIcon>
              <Menu.ItemLabel>View</Menu.ItemLabel>
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemLeadingIcon>
                <Users style={{ width: '18px', height: '18px' }} />
              </Menu.ItemLeadingIcon>
              <Menu.ItemLabel>Contact Customer</Menu.ItemLabel>
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemLeadingIcon>
                <Database style={{ width: '18px', height: '18px' }} />
              </Menu.ItemLeadingIcon>
              <Menu.ItemLabel>Go to Salesforce</Menu.ItemLabel>
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemLeadingIcon>
                <Checklist style={{ width: '18px', height: '18px' }} />
              </Menu.ItemLeadingIcon>
              <Menu.ItemLabel>Create Follow-up Task</Menu.ItemLabel>
            </Menu.Item>
          </Menu.Content>
        </Menu>
      ),
    },
  ];

  return (
    <PageLayout>
      <PageLayout.SkipToContent />
      <PageLayout.MainNav>
        <SideNav
          tier="approaching"
          currentPage="dashboardTeam"
          userType="admin"
          onUserTypeChange={() => {}}
        />
      </PageLayout.MainNav>
      <PageLayout.Main pageWidth="fullWidth">
        <PageLayout.Body>
          <PageLayout.BodyContent>
            <div className="dashboard-container">
              {/* Page Heading */}
              <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px' }}>
                Threshold Notifications — Team Dashboard
              </h1>

              {/* Critical Alert */}
              {exceedingCount > 0 && (
                <TexturaAlert
                  variant="critical"
                  treatment="subtle"
                  type="inline"
                  className="alert-spacing"
                  show={true}
                >
                  <TexturaAlert.Icon />
                  <TexturaAlert.Content>
                    <TexturaAlert.Title>
                      {exceedingCount} account{exceedingCount !== 1 ? 's' : ''} exceeding usage limits
                    </TexturaAlert.Title>
                    <TexturaAlert.Description>
                      These customers may experience service disruptions. Immediate action required.
                    </TexturaAlert.Description>
                  </TexturaAlert.Content>
                </TexturaAlert>
              )}

              {/* KPI Grid */}
              <div className="kpi-row-team kpi-team-spacing">
                <Card variant="elevated" spacing="roomy">
                  <Card.Content>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ntx-color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                      Critical Status
                    </p>
                    <h3 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--ntx-color-semantic-error)', margin: '0 0 8px 0', lineHeight: '1' }}>
                      {exceedingCount}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--ntx-color-neutral-500)', margin: '0' }}>
                      Accounts exceeding limit
                    </p>
                  </Card.Content>
                </Card>
                <Card variant="elevated" spacing="roomy">
                  <Card.Content>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ntx-color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                      Action Required
                    </p>
                    <h3 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--ntx-color-semantic-warning)', margin: '0 0 8px 0', lineHeight: '1' }}>
                      {reachingCount}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--ntx-color-neutral-500)', margin: '0' }}>
                      Accounts at 90%+ usage
                    </p>
                  </Card.Content>
                </Card>
                <Card variant="elevated" spacing="roomy">
                  <Card.Content>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ntx-color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                      Monitor
                    </p>
                    <h3 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--ntx-color-semantic-info)', margin: '0 0 8px 0', lineHeight: '1' }}>
                      {approachingCount}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--ntx-color-neutral-500)', margin: '0' }}>
                      Accounts at 70-80% usage
                    </p>
                  </Card.Content>
                </Card>
                <Card variant="elevated" spacing="roomy">
                  <Card.Content>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ntx-color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                      Avg Contract Term
                    </p>
                    <h3 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--ntx-color-semantic-success)', margin: '0 0 8px 0', lineHeight: '1' }}>
                      {avgDaysToRenewal}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--ntx-color-neutral-500)', margin: '0' }}>
                      Days until renewal
                    </p>
                  </Card.Content>
                </Card>
              </div>



              {/* Search and Filter Toolbar */}
              <div className="dashboard-toolbar">
                {/* Search Field */}
                <input
                  type="text"
                  className="dashboard-search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPageIndex(0);
                  }}
                />

                {/* Status Filter Chips - Textura Components */}
                <div className="dashboard-filter-chips">
                  {[
                    { value: 'all', label: `All (${accounts.length})` },
                    { value: 'exceeding', label: `Exceeding (${exceedingCount})` },
                    { value: 'reaching', label: `Reaching (${reachingCount})` },
                    { value: 'approaching', label: `Approaching (${approachingCount})` }
                  ].map(tab => (
                    <button
                      key={tab.value}
                      onClick={() => setSelectedTab(tab.value)}
                      className="dashboard-chip-button"
                    >
                      <Chip
                        type={selectedTab === tab.value ? 'solid' : 'subtle'}
                        variant={selectedTab === tab.value ? 'info' : 'neutral'}
                        size="md"
                      >
                        {selectedTab === tab.value && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '2px' }}>
                            <Check style={{ width: '16px', height: '16px' }} />
                          </span>
                        )}
                        {tab.label}
                      </Chip>
                    </button>
                  ))}
                </div>
              </div>

              {/* Products List with Textura List Component */}
              <div className="list-container">
                <List
                  columns={columns}
                  data={paginatedProducts}
                >
                  <List.Header />
                  <List.Body />
                  {sortedProducts.length > 0 && (
                    <List.Footer>
                      <List.PageSizeSelect
                        options={[10, 15, 20, 25]}
                        renderLabel={(option) => `Show ${option}`}
                        onChange={(value) => {
                          setPageSize(value);
                          setPageIndex(0);
                        }}
                      />
                      <List.Pagination
                        selected={pageIndex + 1}
                        onSelectedChange={(page) => setPageIndex(page - 1)}
                        finish={totalPages}
                        spread={2}
                      />
                    </List.Footer>
                  )}
                </List>
              </div>
            </div>
          </PageLayout.BodyContent>
        </PageLayout.Body>
      </PageLayout.Main>
    </PageLayout>
  );
}
