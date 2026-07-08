import React, { useState, useMemo } from 'react';
import {
  Card, Button, Alert as TexturaAlert, Chip, Avatar, BarProgress,
  Header, TabBar, Tab, List
} from '@exp-textura/react';
import { accounts, getPercent, getDaysToRenewal, getStatusLabel, getAccountHighestTier, getTierByPercent } from '../../data/dashboard/accountsData';

const tierColors = {
  approaching: 'info',
  reaching: 'warning',
  exceeding: 'critical',
};

const ProductsList = List.ofType();

export function CustomerDashboard({ userType = 'admin' }) {
  const [activeTab, setActiveTab] = useState('overview');

  // For demo: show Acme Corp (would be actual customer in production)
  const account = accounts.find((a) => a.id === 'acme');

  if (!account) {
    return <div>No account data available</div>;
  }

  // Calculate summary stats
  const criticalProducts = account.products.filter(p => p.tier === 'exceeding');
  const urgentProducts = account.products.filter(p => p.tier === 'reaching');
  const monitorProducts = account.products.filter(p => p.tier === 'approaching');
  const highestTier = getAccountHighestTier(account);

  // Calculate overall usage
  const totalUsage = account.products.reduce((sum, p) => sum + p.usage, 0);
  const totalLimit = account.products.reduce((sum, p) => sum + p.limit, 0);
  const overallPercent = Math.round((totalUsage / totalLimit) * 100);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: ({ row }) => (
        <div className="table-cell-product">
          {row.original.name}
        </div>
      ),
    },
    {
      id: 'usage',
      header: 'Usage',
      cell: ({ row }) => (
        <div className="table-cell-usage">
          <div className="progress-flex">
            <BarProgress value={Math.min(getPercent(row.original), 100)} max={100} />
          </div>
          <span className="usage-percentage">
            {getPercent(row.original)}%
          </span>
        </div>
      ),
    },
    {
      id: 'absolute',
      header: 'Absolute',
      cell: ({ row }) => {
        const usage = row.original.usage;
        const limit = row.original.limit;
        // Format based on magnitude
        const formatNumber = (num) => {
          if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
          if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
          return num.toString();
        };
        return (
          <div className="table-cell-absolute">
            <strong>{formatNumber(usage)}</strong> / {formatNumber(limit)}
          </div>
        );
      },
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Chip type="subtle" variant={tierColors[row.original.tier]} size="sm">
          {getStatusLabel(row.original.tier)}
        </Chip>
      ),
    },
    {
      id: 'velocity',
      header: 'Growth',
      cell: ({ row }) => {
        const tier = getTierByPercent(getPercent(row.original));
        return (
          <Chip type="subtle" variant={tierColors[tier] || 'neutral'} size="sm">
            {row.original.velocity === 'spike' ? '↑ Spike' : row.original.velocity === 'steady' ? '→ Steady' : '→ Flat'}
          </Chip>
        );
      },
    },
  ];

  // Admin view
  if (userType === 'admin') {
    return (
      <div className="customer-dashboard">
        {/* Page Heading */}
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Product Usage Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--ntx-color-neutral-500)', marginBottom: '24px' }}>
          Monitor all 7 products and manage resource allocation across your organization
        </p>

        {/* Header with Tabs */}
        <Header>
          <Header.Main>
            <Header.Content>
              <Header.Title>Product Usage Dashboard</Header.Title>
              <Header.Description>
                Monitor all 7 products and manage resource allocation across your organization
              </Header.Description>
            </Header.Content>
          </Header.Main>
          <TabBar value={activeTab} onChange={setActiveTab}>
            <Tab value="overview" label="Overview & Summary" />
            <Tab value="products" label="Product Details" />
            <Tab value="account" label="Account Info" />
          </TabBar>
        </Header>

        {/* Critical Alert */}
        {criticalProducts.length > 0 && (
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
                {criticalProducts.length} product{criticalProducts.length !== 1 ? 's' : ''} exceeding limit
              </TexturaAlert.Title>
              <TexturaAlert.Description>
                {criticalProducts.map(p => p.name).join(', ')} usage exceeded. Immediate action required to avoid service disruptions.
              </TexturaAlert.Description>
            </TexturaAlert.Content>
          </TexturaAlert>
        )}

        {urgentProducts.length > 0 && (
          <TexturaAlert
            variant="warning"
            treatment="subtle"
            type="inline"
            className="alert-spacing"
            show={true}
          >
            <TexturaAlert.Icon />
            <TexturaAlert.Content>
              <TexturaAlert.Title>
                {urgentProducts.length} product{urgentProducts.length !== 1 ? 's' : ''} approaching limit
              </TexturaAlert.Title>
              <TexturaAlert.Description>
                {urgentProducts.map(p => p.name).join(', ')} at 90%+ usage. Contact your account team to discuss upgrade options.
              </TexturaAlert.Description>
            </TexturaAlert.Content>
          </TexturaAlert>
        )}

        {/* Tabs */}
        <TabBar value={activeTab} onValueChange={setActiveTab} className="tabs-spacing">
          <TabBar.List>
            <Tab value="overview">Overview & Summary</Tab>
            <Tab value="products">Product Details</Tab>
            <Tab value="account">Account Info</Tab>
          </TabBar.List>
        </TabBar>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Overall Summary Cards */}
            <div className="kpi-row">
              <Card variant="elevated" spacing="roomy">
                <Card.Content>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ntx-color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                    Total Consumption
                  </p>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 12px 0', lineHeight: '1' }}>
                    {overallPercent}%
                  </h3>
                  <BarProgress value={Math.min(overallPercent, 100)} max={100} />
                  <p style={{ fontSize: '12px', color: 'var(--ntx-color-neutral-500)', margin: '8px 0 0 0' }}>
                    {totalUsage.toLocaleString()} of {totalLimit.toLocaleString()} aggregate units
                  </p>
                </Card.Content>
              </Card>

              <Card variant="elevated" spacing="roomy">
                <Card.Content>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ntx-color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                    Contract & Renewal
                  </p>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', lineHeight: '1' }}>
                    {getDaysToRenewal(account)}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--ntx-color-neutral-500)', margin: '0 0 4px 0' }}>
                    Days until renewal
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--ntx-color-neutral-500)', margin: '0' }}>
                    Contract ends {account.contractEnd}
                  </p>
                </Card.Content>
              </Card>
            </div>

            {/* Product Status Summary */}
            <div className="status-grid">
              <Card variant="elevated" spacing="roomy">
                <Card.Content>
                  <div className="kpi-label">Critical Status</div>
                  <div className="status-value status-critical">{criticalProducts.length}</div>
                  <div className="kpi-description">products exceeding</div>
                </Card.Content>
              </Card>

              <Card variant="elevated" spacing="roomy">
                <Card.Content>
                  <div className="kpi-label">Action Required</div>
                  <div className="status-value status-warning">{urgentProducts.length}</div>
                  <div className="kpi-description">products at 90%+</div>
                </Card.Content>
              </Card>

              <Card variant="elevated" spacing="roomy">
                <Card.Content>
                  <div className="kpi-label">Monitor</div>
                  <div className="status-value status-info">{monitorProducts.length}</div>
                  <div className="kpi-description">products in range</div>
                </Card.Content>
              </Card>
            </div>

            {/* Overall Health */}
            <Card variant="elevated" spacing="roomy">
              <Card.Header>
                <h3 className="card-title">Overall Health Status</h3>
              </Card.Header>
              <Card.Content>
                <div className="health-container">
                  <Chip type="subtle" variant={tierColors[highestTier]} size="sm">
                    {getStatusLabel(highestTier)}
                  </Chip>
                  <div className="health-description">
                    {highestTier === 'exceeding' && 'Your organization has one or more products exceeding their allocated limits. Immediate action is required.'}
                    {highestTier === 'reaching' && 'Your organization is at critical usage levels on one or more products. Contact your account team to discuss options.'}
                    {highestTier === 'approaching' && 'Your organization is making great use of Nintex products. This is a good time to discuss future needs with your account team.'}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <Card variant="elevated" spacing="roomy">
            <Card.Header>
              <h3 className="card-title">Product Usage Breakdown</h3>
            </Card.Header>
            <Card.Content>
              <ProductsList
                columns={columns}
                data={account.products}
                enableRowSelection={false}
              >
                <ProductsList.Header />
                <ProductsList.Body />
              </ProductsList>

              {/* Individual Product Details */}
              <div className="product-details-section">
                <h4 className="section-title">Detailed Breakdown</h4>
                <div className="product-grid">
                  {account.products.map((product) => (
                    <Card key={product.name} variant="elevated" spacing="default">
                      <Card.Content>
                        <div className="product-header">
                          <div>
                            <div className="product-name">{product.name}</div>
                          </div>
                          {(() => {
                            const tier = getTierByPercent(getPercent(product));
                            if (!tier) return null;
                            return (
                              <Chip type="subtle" variant={tierColors[tier]} size="sm">
                                {tier === 'exceeding' ? 'Critical' : tier === 'reaching' ? 'Urgent' : 'Monitor'}
                              </Chip>
                            );
                          })()}
                        </div>
                        <div className="progress-container">
                          <BarProgress value={Math.min(getPercent(product), 100)} max={100} />
                        </div>
                        <div className="product-stats">
                          <span>{getPercent(product)}% used</span>
                          <span>{product.usage.toLocaleString()} / {product.limit.toLocaleString()}</span>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </div>
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Account Info Tab */}
        {activeTab === 'account' && (
          <div className="account-grid">
            <Card variant="elevated" spacing="roomy">
              <Card.Header>
                <h3 className="card-title">Account Information</h3>
              </Card.Header>
              <Card.Content>
                <div className="account-info-list">
                  <div className="info-item">
                    <div className="info-label">Organization</div>
                    <div className="info-value">{account.name}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Tenant ID</div>
                    <div className="info-value">{account.tenantId}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Region</div>
                    <div className="info-value">{account.region}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Products Subscribed</div>
                    <div className="info-value">{account.products.length} products</div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card variant="elevated" spacing="roomy">
              <Card.Header>
                <h3 className="card-title">Account Manager</h3>
              </Card.Header>
              <Card.Content>
                <div className="am-container">
                  <Avatar name={account.assignedAM} size="sm">
                    <Avatar.Fallback>{account.assignedAM.substring(0, 1)}</Avatar.Fallback>
                  </Avatar>
                  <div className="am-info">
                    <div className="am-name">{account.assignedAM}</div>
                    <div className="am-role">Your dedicated contact</div>
                  </div>
                </div>
                <Button buttonType="secondary" className="full-width">
                  📞 Contact {account.assignedAM.split(' ')[0]}
                </Button>
              </Card.Content>
            </Card>
          </div>
        )}

        {/* Footer CTA */}
        <div className="footer-cta">
          <Button buttonType="primary" className="full-width">
            📞 Schedule Review with Account Team
          </Button>
        </div>
      </div>
    );
  }

  // Editor view: minimal
  return (
    <div className="customer-dashboard">
      {/* Page Heading */}
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
        Your Product Usage
      </h1>

      <Header>
        <Header.Main>
          <Header.Content>
            <Header.Title>Your Product Usage</Header.Title>
          </Header.Content>
        </Header.Main>
      </Header>

      <TexturaAlert
        variant={tierColors[highestTier]}
        treatment="subtle"
        type="inline"
        className="alert-spacing"
        show={true}
      >
        <TexturaAlert.Icon />
        <TexturaAlert.Content>
          <TexturaAlert.Description>
            Your organization's overall product usage is at <strong>{overallPercent}%</strong>. Contact your Admin for details or to reach your account team.
          </TexturaAlert.Description>
        </TexturaAlert.Content>
      </TexturaAlert>

      <Card variant="elevated" spacing="roomy">
        <Card.Content>
          <div className="editor-usage-grid">
            <div>
              <div className="kpi-label">Overall Usage</div>
              <div className="kpi-value">{overallPercent}%</div>
              <BarProgress value={Math.min(overallPercent, 100)} max={100} />
            </div>
            <div className="editor-stats-column">
              <Card variant="elevated" spacing="default">
                <Card.Content className="stat-card-content">
                  <div className="stat-label">Products Subscribed</div>
                  <div className="stat-value">{account.products.length}</div>
                </Card.Content>
              </Card>
              <Card variant="elevated" spacing="default">
                <Card.Content className="stat-card-content">
                  <div className="stat-label">Contract Renewal</div>
                  <div className="stat-value">{getDaysToRenewal(account)}d left</div>
                </Card.Content>
              </Card>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
