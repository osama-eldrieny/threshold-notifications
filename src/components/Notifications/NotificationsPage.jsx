import React, { useState, useEffect } from 'react';
import { PageLayout } from '@exp-textura/react';
import { parseNotificationRoute, buildNotificationRoute } from '../../utils/notificationRouteParser';
import { getNotificationContent, getAvailableChannels, userTypeLabels } from '../../data/notifications/contentResolver';
import { NotificationSidebar } from './Shared/NotificationSidebar';
import { EmailTemplate } from './Email/EmailTemplate';
import { SlackTemplate } from './Slack/SlackTemplate';
import '../../styles/NotificationsPage.css';

export function NotificationsPage() {
  const [state, setState] = useState(() => parseNotificationRoute());

  useEffect(() => {
    const handleHashChange = () => {
      setState(parseNotificationRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTierChange = (newTier) => {
    window.location.hash = buildNotificationRoute(newTier, state.userType, state.channel);
  };

  const handleUserTypeChange = (newUserType) => {
    const availableChannels = getAvailableChannels(state.tier, newUserType);
    const channel = availableChannels.includes(state.channel) ? state.channel : availableChannels[0];
    window.location.hash = buildNotificationRoute(state.tier, newUserType, channel);
  };

  const emailContent = getNotificationContent(state.tier, state.userType, 'email');
  const slackContent = getNotificationContent(state.tier, state.userType, 'slack');

  return (
    <PageLayout className="notifications-page-layout">
      <PageLayout.SkipToContent />

      <PageLayout.MainNav>
        <NotificationSidebar
          currentTier={state.tier}
          currentUserType={state.userType}
          onTierChange={handleTierChange}
          onUserTypeChange={handleUserTypeChange}
        />
      </PageLayout.MainNav>

      <PageLayout.Main pageWidth="fullWidth">
        <PageLayout.Body>
          <PageLayout.BodyContent>
            <div className="notifications-main">
              <div className="notifications-header">
                <h1>Notification Preview</h1>
                <p className="breadcrumb">
                  {state.tier.charAt(0).toUpperCase() + state.tier.slice(1)} ·
                  {userTypeLabels[state.userType]}
                </p>
              </div>

              {!emailContent && !slackContent ? (
                <div className="no-content">No content available for this combination</div>
              ) : (
                <div className="preview-section">
                  <div className={emailContent && slackContent ? "preview-dual" : "preview-section"}>
                    {emailContent && (
                      <div className="preview-item">
                        <div className="preview-title">Email Notification</div>
                        <EmailTemplate content={emailContent} />
                      </div>
                    )}
                    {slackContent && (
                      <div className="preview-item">
                        <div className="preview-title">Slack Notification</div>
                        <SlackTemplate content={slackContent} disableHighlight={state.userType === 'accountOwner'} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </PageLayout.BodyContent>
        </PageLayout.Body>
      </PageLayout.Main>
    </PageLayout>
  );
}
