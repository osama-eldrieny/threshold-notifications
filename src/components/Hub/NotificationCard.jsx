import React from 'react';
import emailIcon from '../../../imgs/Email.png';
import slackIcon from '../../../imgs/slack.png';
import nintexIcon from '../../../imgs/nintex.png';

export function NotificationCard({ tier, userType, userLabel, channels }) {
  return (
    <div className="notification-card">
      <div className="card-header">
        <h3>{userLabel}</h3>
        <span className="status-badge done">Done</span>
      </div>

      <div className="card-links">
        <>
          {channels.includes('email') && (
            <div className="card-link email-link">
              <span className="link-icon"><img src={emailIcon} alt="Email" /></span>
              <a
                href={`#/notifications/${tier}/${userType}/email`}
                className="link-text"
                title="View email notification"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            </div>
          )}

          {channels.includes('slack') && (
            <div className="card-link slack-link">
              <span className="link-icon"><img src={slackIcon} alt="Slack" /></span>
              <a
                href={`#/notifications/${tier}/${userType}/slack`}
                className="link-text"
                title="View Slack notification"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slack
              </a>
            </div>
          )}
        </>

        <div className="card-link inapp-home-link">
          <span className="link-icon"><img src={nintexIcon} alt="Nintex" /></span>
          <a
            href={`#/${tier}/${userType}/home`}
            className="link-text"
            title="View in-app home notification"
            target="_blank"
            rel="noopener noreferrer"
          >
            In-App Home
          </a>
        </div>

        <div className="card-link inapp-product-link">
          <span className="link-icon"><img src={nintexIcon} alt="Nintex" /></span>
          <a
            href={`#/${tier}/${userType}/workflow`}
            className="link-text"
            title="View in-app product notification"
            target="_blank"
            rel="noopener noreferrer"
          >
            In-App Product
          </a>
        </div>
      </div>
    </div>
  );
}
