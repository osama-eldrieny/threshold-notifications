import React from 'react';
import { Button, ButtonGroup } from '@exp-textura/react';
import '../../../styles/NotificationTierSelector.css';

const tiers = [
  { id: 'approaching', label: 'Approaching', icon: '📊' },
  { id: 'reaching', label: 'Reaching', icon: '⚠️' },
  { id: 'exceeding', label: 'Exceeding', icon: '🔴' }
];

export function NotificationTierSelector({ currentTier, onTierChange }) {
  return (
    <div className="notification-tier-selector">
      <div className="tier-selector-label">Tier</div>
      <ButtonGroup>
        {tiers.map(tier => (
          <Button
            key={tier.id}
            variant={currentTier === tier.id ? 'default' : 'secondary'}
            onClick={() => onTierChange(tier.id)}
            size="sm"
            className={`tier-button ${currentTier === tier.id ? 'active' : ''}`}
          >
            <span className="tier-icon">{tier.icon}</span>
            <span>{tier.label}</span>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
