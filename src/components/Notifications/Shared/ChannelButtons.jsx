import React from 'react';
import { getAvailableChannels } from '../../../data/notifications/contentResolver';
import '../../../styles/NotificationChannelButtons.css';

export function NotificationChannelButtons({
  currentTier,
  currentUserType,
  currentChannel,
  onChannelChange,
}) {
  const availableChannels = getAvailableChannels(currentTier, currentUserType);

  return (
    <div className="channel-buttons-group">
      {availableChannels.map((channel) => (
        <button
          key={channel}
          className={`channel-btn ${currentChannel === channel ? 'active' : ''}`}
          onClick={() => onChannelChange(channel)}
          title={`View ${channel} notification`}
        >
          <span className="channel-icon">
            {channel === 'email' && '📧'}
            {channel === 'slack' && '💬'}
            {channel === 'both' && '🔄'}
          </span>
          <span className="channel-name">
            {channel.charAt(0).toUpperCase() + channel.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
}
