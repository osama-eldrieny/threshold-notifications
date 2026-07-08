import React, { useState } from 'react';
import {
  PageLayout, Header, Button, Card, Alert as TexturaAlert, Chip, Avatar,
  TabBar, Tab, List, BarProgress, IconButton
} from '@exp-textura/react';
import { Filter, Download } from '@exp-textura/icons/streamline-sl';
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
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const selectedAccount = selectedAccountId
    ? accounts.find((a) => a.id === selectedAccountId)
    : null;

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

  // Filter products by tab
  const filteredProducts = selectedTab === 'all'
    ? allProducts
    : allProducts.filter((p) => p.tier === selectedTab);

  // Sort by urgency and usage
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const tierOrder = { exceeding: 0, reaching: 1, approaching: 2 };
    const tierDiff = (tierOrder[a.tier] || 999) - (tierOrder[b.tier] || 999);
    return tierDiff !== 0 ? tierDiff : getPercent(b) - getPercent(a);
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
        <div className="account-cell">
          <Avatar name={row.original.accountName} size="sm">
            <Avatar.Fallback>{row.original.accountName.substring(0, 2).toUpperCase()}</Avatar.Fallback>
          </Avatar>
          <span>{row.original.accountName}</span>
        </div>
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
        <Button
          size="sm"
          buttonType="secondary"
          onClick={() => setSelectedAccountId(row.original.accountId)}
        >
          Details
        </Button>
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
              <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                Threshold Notifications — Team Dashboard
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
                Monitor customer usage across all products and manage at-risk accounts
              </p>

              {/* Header with Actions */}
              <Header>
                <Header.Main>
                  <Header.Content>
                    <Header.Title>Threshold Notifications — Team Dashboard</Header.Title>
                    <Header.Description>
                      Monitor customer usage across all products and manage at-risk accounts
                    </Header.Description>
                  </Header.Content>
                  <Header.Actions>
                    <IconButton buttonType="secondary" aria-label="Filter">
                      <Filter />
                    </IconButton>
                    <IconButton buttonType="secondary" aria-label="Download">
                      <Download />
                    </IconButton>
                  </Header.Actions>
                </Header.Main>
                <TabBar value={selectedTab} onValueChange={setSelectedTab}>
                  <TabBar.List>
                    <Tab value="all">All Accounts ({accounts.length})</Tab>
                    <Tab value="exceeding">Exceeding ({exceedingCount})</Tab>
                    <Tab value="reaching">Reaching ({reachingCount})</Tab>
                    <Tab value="approaching">Approaching ({approachingCount})</Tab>
                  </TabBar.List>
                </TabBar>
              </Header>

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

              {/* Detail Panel */}
              {selectedAccount && (
                <div
                  className="detail-panel-overlay"
                  onClick={(e) => {
                    if (e.target.className === 'detail-panel-overlay') {
                      setSelectedAccountId(null);
                    }
                  }}
                >
                  <Card variant="elevated" spacing="roomy">
                    <Card.Header>
                      <div className="detail-header">
                        <div>
                          <h3 className="account-title">
                            {selectedAccount.name}
                          </h3>
                          <div className="tenant-id">
                            Tenant ID: {selectedAccount.tenantId}
                          </div>
                        </div>
                        <div className="header-actions">
                          <div className="action-buttons">
                            <Button buttonType="primary" size="sm">Contact Customer</Button>
                            <Button buttonType="secondary" size="sm">Go to Salesforce</Button>
                            <Button buttonType="tertiary" size="sm">Create Follow-up Task</Button>
                          </div>
                          <IconButton
                            buttonType="secondary"
                            aria-label="Close"
                            onClick={() => setSelectedAccountId(null)}
                            className="modal-close-btn"
                          >
                            ✕
                          </IconButton>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Content>
                      {/* Recommended Actions Alert */}
                      {(() => {
                        const tiers = selectedAccount.products.map(p => getTierByPercent(getPercent(p)));
                        const hasExceeding = tiers.includes('exceeding');
                        const hasReaching = tiers.includes('reaching');

                        return (
                          <TexturaAlert
                            variant={hasExceeding ? 'critical' : hasReaching ? 'warning' : 'info'}
                            treatment="subtle"
                            type="inline"
                            className="alert-spacing"
                            show={true}
                          >
                            <TexturaAlert.Icon />
                            <TexturaAlert.Content>
                              <TexturaAlert.Title>Recommended Actions</TexturaAlert.Title>
                              <TexturaAlert.Description>
                                {hasExceeding && 'URGENT: Reach out today to address overage situations. Customers may experience service disruptions. Discuss emergency upgrades or usage controls.'}
                                {!hasExceeding && hasReaching && 'Contact the customer immediately to discuss usage patterns and explore upgrade options. Weekly check-ins recommended until action is taken.'}
                                {!hasExceeding && !hasReaching && 'Schedule a quarterly business review to discuss growth trajectory and explore upgrade opportunities. This is an excellent time to understand their future roadmap.'}
                              </TexturaAlert.Description>
                            </TexturaAlert.Content>
                          </TexturaAlert>
                        );
                      })()}

                      <div className="detail-grid">
                        {/* Left Column */}
                        <div>
                          <h4 className="section-title-uppercase">
                            Account Details
                          </h4>
                          <div className="account-info-list">
                            <div className="info-item">
                              <div className="info-label">Account Manager</div>
                              <div className="info-value">{selectedAccount.assignedAM}</div>
                            </div>
                            <div className="info-item">
                              <div className="info-label">Region</div>
                              <div className="info-value">{selectedAccount.region}</div>
                            </div>
                            <div className="info-item">
                              <div className="info-label">Last Contacted</div>
                              <div className="info-value">{selectedAccount.lastContacted || 'Never'}</div>
                            </div>
                            <div className="info-item">
                              <div className="info-label">Contract End</div>
                              <div className="info-value">{selectedAccount.contractEnd} ({getDaysToRenewal(selectedAccount)}d)</div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div>
                          <h4 className="section-title-uppercase">
                            Product Summary
                          </h4>
                          <div className="account-info-list">
                            <div className="info-item">
                              <div className="info-label">Total Products</div>
                              <div className="info-value">{selectedAccount.products.length} monitored</div>
                            </div>
                            <div className="info-item">
                              <div className="info-label">Critical Status</div>
                              <div className="info-value">
                                {selectedAccount.products.filter(p => p.tier !== 'approaching').length} at risk
                              </div>
                            </div>
                            <div className="info-item">
                              <div className="info-label">Max Usage</div>
                              <div className="info-value">
                                {Math.round(Math.max(...selectedAccount.products.map(p => getPercent(p))))}% across products
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Products Grid */}
                      <div className="products-grid-section">
                        <h4 className="section-title-uppercase">
                          All Products
                        </h4>
                        <div className="products-grid">
                          {selectedAccount.products.map((product, idx) => {
                            const calculatedTier = getTierByPercent(getPercent(product));
                            return (
                            <div key={idx} className="product-card">
                              <div className="product-card-header">
                                <div className="product-card-name">
                                  {product.name}
                                </div>
                                {calculatedTier && (
                                  <Chip type="subtle" variant={tierColors[calculatedTier]} size="sm">
                                    {getStatusLabel(calculatedTier)}
                                  </Chip>
                                )}
                              </div>
                              <BarProgress value={Math.min(getPercent(product), 100)} max={100} />
                              <div className="product-card-stats">
                                <span className="product-card-usage">{product.usage} / {product.limit}</span>
                                <span className="product-card-percent">{getPercent(product)}%</span>
                              </div>
                            </div>
                          );
                          })}
                        </div>
                      </div>

                    </Card.Content>
                  </Card>
                </div>
              )}
            </div>
          </PageLayout.BodyContent>
        </PageLayout.Body>
      </PageLayout.Main>
    </PageLayout>
  );
}
