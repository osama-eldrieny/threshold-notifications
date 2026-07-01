import React from 'react';
import { getAvailableUserTypes, userTypeLabels } from '../../../data/notifications/contentResolver';
import '../../../styles/NotificationUserTypeSelector.css';

export function NotificationUserTypeSelector({ currentTier, currentUserType, onUserTypeChange }) {
  const availableUsers = getAvailableUserTypes(currentTier);

  if (availableUsers.length === 0) {
    return <div className="user-type-selector empty">No users available for this tier</div>;
  }

  return (
    <div className="user-type-selector">
      <div className="selector-label">View As</div>
      <div className="user-list">
        {availableUsers.map(userType => (
          <button
            key={userType}
            className={`user-item ${currentUserType === userType ? 'active' : ''}`}
            onClick={() => onUserTypeChange(userType)}
          >
            {userTypeLabels[userType]}
          </button>
        ))}
      </div>
    </div>
  );
}
