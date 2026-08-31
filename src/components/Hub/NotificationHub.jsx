import React from 'react';
import { NotificationCard } from './NotificationCard';
import { availabilityMatrix, userTypeLabels } from '../../data/notifications/contentResolver';
import { LucideIcon } from '../Icons/LucideIcon';
import '../../styles/NotificationHub.css';
import osamaAvatar from '../../../imgs/osama.jpg';
import tifanyAvatar from '../../../imgs/tifany.jpg';
import figmaIcon from '../../../imgs/figma.png';

export function NotificationHub() {
  const tiers = ['approaching', 'reaching', 'exceeding'];
  const tierLabels = {
    approaching: 'Approaching',
    reaching: 'Reaching',
    exceeding: 'Exceeding'
  };
  const tierIcons = {
    approaching: 'barChart',
    reaching: 'alertTriangle',
    exceeding: 'alertCircle'
  };

  return (
    <div className="notification-hub-layout">
      <div className="hub-header">
        <h1>Threshold Notification Guide</h1>
        <p className="hub-subtitle">Explore email, Slack, and in-app notifications across all alert tiers. View the Figma design file, research board, and prototype below.</p>
        <div className="hub-metadata">
          <div className="metadata-item">
            <span>V1.0 In Review</span>
          </div>
          <div className="metadata-item">
            <span>•</span>
          </div>
          <div className="metadata-item">
            <span>Last updated: August 31, 2026</span>
          </div>
          <div className="metadata-item">
            <span>•</span>
          </div>
          <div className="metadata-item">
            <span>Contributors:</span>
            <div className="avatars-container">
              <img src={osamaAvatar} alt="Osama" className="contributor-avatar" title="Osama" />
              <img src={tifanyAvatar} alt="Tifany" className="contributor-avatar" title="Tifany" />
            </div>
          </div>
          <div className="metadata-item">
            <span>•</span>
          </div>
          <div className="metadata-item">
            <a href="#/whatsnew" className="whats-new-link" target="_blank" rel="noopener noreferrer">
              <LucideIcon name="sparkles" />
              What's New in V1
            </a>
          </div>
        </div>
      </div>

      <div className="hub-content">
          <section className="figma-section">
            <div className="figma-header">
              <h3>Design Resources</h3>
            </div>
            <div className="figma-links">
              <div className="figma-link">
                <img src={figmaIcon} alt="Figma" className="link-icon figma-icon" />
                <a
                  href="https://www.figma.com/design/GigYF7hmoPlzgCnxsKWwvL/Threshold-Notifications?node-id=29-5653&t=I4CswsclOLLMnRFy-1"
                  className="link-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Figma Design File
                </a>
                <span className="status-badge in-progress">In Progress</span>
              </div>
              <div className="figma-link">
                <img src={figmaIcon} alt="Figma" className="link-icon figma-icon" />
                <a
                  href="https://www.figma.com/board/qUvaolPjbds2bCgjA26BJ6/threshold-Notifications-Research?node-id=0-1&t=1y15REXKLESnWWov-1"
                  className="link-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Research Board
                </a>
                <span className="status-badge done">Done</span>
              </div>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="dashboard-header">
              <h3>Threshold Dashboards</h3>
            </div>
            <div className="dashboard-links">
              <div className="dashboard-link">
                <a href="#/dashboard/team" target="_blank" rel="noopener noreferrer" className="link-text">
                  Internal Team Dashboard
                </a>
                <span className="status-badge in-progress">In Progress</span>
              </div>
              <div className="dashboard-link dashboard-link-customer">
                <a href="#/dashboard/customer" target="_blank" rel="noopener noreferrer" className="link-text">
                  Customer Dashboard
                </a>
                <span className="status-badge in-progress">In Progress</span>
              </div>
            </div>
          </section>

          {tiers.map((tier) => (
            <section key={tier} id={`hub-${tier}`} className="tier-section">
              <div className="tier-header">
                <span className="tier-icon"><LucideIcon name={tierIcons[tier]} /></span>
                <h2>{tierLabels[tier]} Notifications</h2>
              </div>

              <div className="cards-grid">
                {Object.entries(availabilityMatrix).map(([userType, tiers]) => {
                  const channels = tiers[tier] || [];
                  if (channels.length === 0 && userType !== 'editor') return null;

                  return (
                    <NotificationCard
                      key={userType}
                      tier={tier}
                      userType={userType}
                      userLabel={userTypeLabels[userType]}
                      channels={channels}
                    />
                  );
                })}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
