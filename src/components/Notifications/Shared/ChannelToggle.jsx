import React from 'react';
import { Button, ButtonGroup } from '@exp-textura/react';
import { getAvailableChannels } from '../../../data/notifications/contentResolver';
import '../../../styles/NotificationChannelToggle.css';

const channelOptions = [
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'slack', label: 'Slack', icon: '💬' }
];

export function NotificationChannelToggle({ currentTier, currentUserType, currentChannel, onChannelChange }) {
  const availableChannels = getAvailableChannels(currentTier, currentUserType);

  if (availableChannels.length === 0) {
    return <div className="channel-toggle empty">No channels available</div>;
  }

  return (
    <div className="channel-toggle">
      <div className="toggle-label">Channel</div>
      <ButtonGroup>
        {channelOptions.map(channel => (
          availableChannels.includes(channel.id) && (
            <Button
              key={channel.id}
              variant={currentChannel === channel.id ? 'default' : 'secondary'}
              onClick={() => onChannelChange(channel.id)}
              size="sm"
              className={`channel-button ${currentChannel === channel.id ? 'active' : ''}`}
            >
              <span className="channel-icon">{channel.icon}</span>
              <span>{channel.label}</span>
            </Button>
          )
        ))}
      </ButtonGroup>
    </div>
  );
}
