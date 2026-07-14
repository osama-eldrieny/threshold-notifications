import React from 'react';
import { PageLayout, Card, Breadcrumbs, Header, Button, BarProgress, Chip, Alert as TexturaAlert, IconButton } from '@exp-textura/react';
import { SideNav } from '../Layout/SideNav';
import { accounts, getPercent, getDaysToRenewal, getStatusLabel, getTierByPercent } from '../../data/dashboard/accountsData';
import '../../styles/Dashboard.css';

const tierColors = {
  approaching: 'info',
  reaching: 'warning',
  exceeding: 'critical',
};

export function AccountDetailPage({ accountId, onBack }) {
  const account = accounts.find(a => a.id === accountId);

  if (!account) {
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
              <div style={{ padding: '32px' }}>Account not found</div>
            </PageLayout.BodyContent>
          </PageLayout.Body>
        </PageLayout.Main>
      </PageLayout>
    );
  }

  const tiers = account.products.map(p => getTierByPercent(getPercent(p)));
  const hasExceeding = tiers.includes('exceeding');
  const hasReaching = tiers.includes('reaching');

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
        <PageLayout.Header>
          <Header.Breadcrumbs>
            <Breadcrumbs>
              <Breadcrumbs.Item href="#/dashboard/team" onClick={(e) => { e.preventDefault(); onBack(); }}>
                Dashboard
              </Breadcrumbs.Item>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item isCurrent>
                {account.name}
              </Breadcrumbs.Item>
            </Breadcrumbs>
          </Header.Breadcrumbs>
        </PageLayout.Header>
        <PageLayout.Body>
          <PageLayout.BodyContent>
            <Card variant="elevated" spacing="roomy">
              <Card.Header>
                <div className="detail-header">
                  <div>
                    <h3 className="account-title">
                      {account.name}
                    </h3>
                    <div className="tenant-id">
                      Tenant ID: {account.tenantId}
                    </div>
                  </div>
                  <div className="header-actions">
                    <div className="action-buttons">
                      <Button buttonType="tertiary" size="sm">Create Follow-up Task</Button>
                      <Button buttonType="secondary" size="sm">Go to Salesforce</Button>
                      <Button buttonType="primary" size="sm">Contact Customer</Button>
                    </div>
                    <IconButton
                      buttonType="secondary"
                      aria-label="Close"
                      onClick={onBack}
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

                <div className="detail-grid">
                  {/* Left Column */}
                  <div>
                    <h4 className="section-title-uppercase">
                      Account Details
                    </h4>
                    <div className="account-info-list">
                      <div className="info-item">
                        <div className="info-label">Account Manager</div>
                        <div className="info-value">{account.assignedAM}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Region</div>
                        <div className="info-value">{account.region}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Last Contacted</div>
                        <div className="info-value">{account.lastContacted || 'Never'}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Contract End</div>
                        <div className="info-value">{account.contractEnd} ({getDaysToRenewal(account)}d)</div>
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
                        <div className="info-value">{account.products.length} monitored</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Critical Status</div>
                        <div className="info-value">
                          {account.products.filter(p => getTierByPercent(getPercent(p)) !== null && getTierByPercent(getPercent(p)) !== 'approaching').length} at risk
                        </div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Max Usage</div>
                        <div className="info-value">
                          {Math.round(Math.max(...account.products.map(p => getPercent(p))))}% across products
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
                    {account.products.map((product, idx) => {
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
          </PageLayout.BodyContent>
        </PageLayout.Body>
      </PageLayout.Main>
    </PageLayout>
  );
}
