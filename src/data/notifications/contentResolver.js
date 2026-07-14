import { approachingContent } from './approaching';
import { reachingContent } from './reaching';
import { exceedingContent } from './exceeding';

const contentMap = {
  approaching: approachingContent,
  reaching: reachingContent,
  exceeding: exceedingContent
};

export function getNotificationContent(tier, userType, channel) {
  const tierContent = contentMap[tier];

  if (!tierContent) {
    console.warn(`Content not found for tier: ${tier}`);
    return null;
  }

  const userContent = tierContent[userType];

  if (!userContent) {
    console.warn(`Content not found for user type: ${userType} in tier: ${tier}`);
    return null;
  }

  const channelContent = userContent[channel];

  if (!channelContent) {
    console.warn(`Content not found for channel: ${channel}`);
    return null;
  }

  return channelContent;
}

export const availabilityMatrix = {
  accountOwner: {
    approaching: ['email', 'slack'],
    reaching: ['email', 'slack'],
    exceeding: ['email', 'slack']
  },
  customerSuccess: {
    approaching: ['email', 'slack'],
    reaching: ['email', 'slack'],
    exceeding: ['email', 'slack']
  },
  accountManager: {
    approaching: [],
    reaching: ['email'],
    exceeding: ['email']
  },
  csm: {
    approaching: [],
    reaching: ['email'],
    exceeding: ['email']
  },
  admin: {
    approaching: ['email'],
    reaching: ['email'],
    exceeding: ['email']
  },
  editor: {
    approaching: [],
    reaching: [],
    exceeding: []
  }
};

export function getAvailableChannels(tier, userType) {
  return availabilityMatrix[userType]?.[tier] || [];
}

export function getAvailableUserTypes(tier) {
  const users = [];
  Object.keys(availabilityMatrix).forEach(userType => {
    if (availabilityMatrix[userType][tier]?.length > 0) {
      users.push(userType);
    }
  });
  return users;
}

export const userTypeLabels = {
  admin: 'Customer Admin',
  accountOwner: 'Account Owner',
  customerSuccess: 'Customer Success',
  accountManager: 'Account Manager',
  csm: 'CSM',
  editor: 'Customer Editor'
};
