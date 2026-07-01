import React from 'react';
import { MainNav } from '@exp-textura/react';
import { NintexLogo, NintexLogoSquare } from '@exp-textura/icons/brand';
import { getAvailableUserTypes, userTypeLabels } from '../../../data/notifications/contentResolver';
import '../../../styles/NotificationSidebar.css';

export function NotificationSidebar({
  currentTier,
  currentUserType,
  onTierChange,
  onUserTypeChange,
}) {
  const tiers = ['approaching', 'reaching', 'exceeding'];
  const availableUserTypes = getAvailableUserTypes(currentTier);

  const tierIcons = {
    approaching: '📊',
    reaching: '⚠️',
    exceeding: '🔴',
  };

  return (
    <MainNav>
      <MainNav.Header>
        <MainNav.Brand
          aria-label="Notifications"
          brandImg={<NintexLogo />}
          squareBrandImg={<NintexLogoSquare />}
          onClick={(e) => e.preventDefault()}
        />
        <MainNav.CollapseTrigger />
      </MainNav.Header>

      <MainNav.Content>
        {/* Tier Section */}
        <div className="notification-section">
          <div className="section-label">Alert Tier</div>
          {tiers.map((tier) => (
            <MainNav.Item
              key={tier}
              as="button"
              isCurrent={currentTier === tier}
              onClick={() => onTierChange(tier)}
              icon={<span className="tier-icon">{tierIcons[tier]}</span>}
            >
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </MainNav.Item>
          ))}
        </div>

        <MainNav.Divider />

        {/* User Type Section */}
        <div className="notification-section">
          <div className="section-label">Recipient</div>
          {availableUserTypes.map((userType) => (
            <MainNav.Item
              key={userType}
              as="button"
              isCurrent={currentUserType === userType}
              onClick={() => onUserTypeChange(userType)}
            >
              {userTypeLabels[userType]}
            </MainNav.Item>
          ))}
        </div>
      </MainNav.Content>
    </MainNav>
  );
}
