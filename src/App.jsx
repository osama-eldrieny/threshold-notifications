import React, { useState, useEffect } from 'react';
import { PageLayout } from '@exp-textura/react';
import { SideNav } from './components/Layout/SideNav';
import { TierSelector } from './components/Layout/TierSelector';
import { AlertFactory } from './components/Alerts/AlertFactory';
import { HomePageContent } from './components/Home/HomePageContent';
import { WorkflowPageContent } from './components/Workflow/WorkflowPageContent';
import { NotificationsPage } from './components/Notifications/NotificationsPage';
import { NotificationHub } from './components/Hub/NotificationHub';
import { InternalTeamDashboard } from './components/Dashboard/InternalTeamDashboard';
import { CustomerDashboard } from './components/Dashboard/CustomerDashboard';
import './styles/App.css';

function App() {
  const [state, setState] = useState(() => parseRoute());

  useEffect(() => {
    const handleHashChange = () => {
      setState(parseRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTierChange = (newTier) => {
    window.location.hash = `#/${newTier}/${state.userType}/${state.page}`;
  };

  const handleUserTypeChange = (newUserType) => {
    window.location.hash = `#/${state.tier}/${newUserType}/${state.page}`;
  };

  const hasRootAlert = (state.tier === 'reaching' && state.userType === 'admin' && state.page === 'home') ||
                       (state.tier === 'exceeding' && state.userType === 'admin' && state.page === 'home') ||
                       (state.tier === 'reaching' && state.userType === 'admin' && state.page === 'workflow') ||
                       (state.tier === 'exceeding' && state.userType === 'admin' && state.page === 'workflow');

  const isReachingOrExceedingEditorWorkflow = (state.tier === 'reaching' && state.userType === 'editor' && state.page === 'workflow') ||
                                              (state.tier === 'exceeding' && state.userType === 'editor' && state.page === 'workflow');

  const isReachingOrExceedingAdminWorkflow = (state.tier === 'reaching' && state.userType === 'admin' && state.page === 'workflow') ||
                                             (state.tier === 'exceeding' && state.userType === 'admin' && state.page === 'workflow');

  // Check if this is a notifications page
  if (state.page === 'notifications') {
    return <NotificationsPage />;
  }

  // Check if this is the hub page
  if (state.page === 'hub') {
    return <NotificationHub />;
  }

  // Check if this is the internal team dashboard (for all internal users)
  if (state.page === 'dashboardTeam') {
    return <InternalTeamDashboard />;
  }

  // Check if this is the customer dashboard (for admin/editor)
  if (state.page === 'dashboardCustomer') {
    return (
      <PageLayout>
        <PageLayout.SkipToContent />
        <PageLayout.MainNav>
          <SideNav
            tier={state.tier}
            currentPage={state.page}
            userType={state.userType}
            onUserTypeChange={handleUserTypeChange}
          />
        </PageLayout.MainNav>
        <PageLayout.Main pageWidth="fullWidth">
          <PageLayout.Body>
            <PageLayout.BodyContent>
              <CustomerDashboard userType={state.userType} />
            </PageLayout.BodyContent>
          </PageLayout.Body>
        </PageLayout.Main>
      </PageLayout>
    );
  }

  return (
    <>
      {/* Special case: Root level alerts for reaching/admin/home and exceeding/admin/home */}
      {hasRootAlert && (
        <AlertFactory tier={state.tier} userType={state.userType} page={state.page} />
      )}

      <PageLayout className={`${isReachingOrExceedingEditorWorkflow ? 'page-layout-reaching-exceeding-editor' : ''} ${isReachingOrExceedingAdminWorkflow ? 'page-layout-reaching-exceeding-admin' : ''}`.trim()}>
      <PageLayout.SkipToContent />

      <PageLayout.MainNav>
        <SideNav
          tier={state.tier}
          currentPage={state.page}
          userType={state.userType}
          onUserTypeChange={handleUserTypeChange}
        />
      </PageLayout.MainNav>

      <PageLayout.Main pageWidth="fullWidth" style={{ position: 'relative' }}>
        <PageLayout.Body>
          <PageLayout.BodyContent>
            {state.page === 'workflow' ? (
              <WorkflowPageContent tier={state.tier} userType={state.userType} />
            ) : (
              <HomePageContent tier={state.tier} userType={state.userType} />
            )}
          </PageLayout.BodyContent>
        </PageLayout.Body>

        {/* Tier Selector - Inside main tag */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '999',
          pointerEvents: 'auto'
        }}>
          <TierSelector currentTier={state.tier} onTierChange={handleTierChange} />
        </div>
      </PageLayout.Main>
    </PageLayout>
    </>
  );
}

function parseRoute() {
  let hash = window.location.hash.slice(1) || '/';

  // Parse URL: /#/dashboard/team OR /#/notifications/tier/user/channel OR /#/tier/user/page or /#/page
  const parts = hash.split('/').filter(Boolean);

  let tier = 'approaching';
  let userType = 'admin';
  let page = 'home';

  // Check if this is a dashboard route
  if (parts[0] === 'dashboard') {
    if (parts[1] === 'team') {
      page = 'dashboardTeam';
      return { tier, userType, page };
    }
    if (parts[1] === 'customer') {
      page = 'dashboardCustomer';
      return { tier, userType, page };
    }
  }

  // Check if this is a notifications route
  if (parts[0] === 'notifications') {
    page = 'notifications';
    // Notifications routing is handled by NotificationsPage component
    return { tier, userType, page };
  }

  // Check if this is the hub route or root
  if (parts.length === 0 || parts[0] === 'hub') {
    page = 'hub';
    return { tier, userType, page };
  }

  if (parts.length === 3) {
    // Format: /#/tier/user/page
    tier = parts[0] || 'approaching';
    userType = parts[1] || 'admin';
    page = parts[2] || 'home';
  } else if (parts.length === 1) {
    // Format: /#/page (home or workflow)
    page = parts[0] === 'workflow' ? 'workflow' : 'home';
  }

  // Validate and default
  const validTiers = ['approaching', 'reaching', 'exceeding'];
  const validUsers = ['admin', 'editor'];
  const validPages = ['home', 'workflow'];

  tier = validTiers.includes(tier) ? tier : 'approaching';
  userType = validUsers.includes(userType) ? userType : 'admin';
  page = validPages.includes(page) ? page : 'home';

  // Update URL to ensure consistency (but never redirect from root path)
  const canonicalHash = `#/${tier}/${userType}/${page}`;
  if (window.location.hash && window.location.hash !== canonicalHash) {
    window.location.hash = canonicalHash;
  }

  return { tier, userType, page };
}

export default App;
