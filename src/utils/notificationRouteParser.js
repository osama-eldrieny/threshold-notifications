const VALID_TIERS = ['approaching', 'reaching', 'exceeding'];
const VALID_USER_TYPES = ['admin', 'accountOwner', 'customerSuccess', 'accountManager', 'csm'];
const VALID_CHANNELS = ['email', 'slack', 'both'];

export function parseNotificationRoute() {
  let hash = window.location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);

  let tier = 'approaching';
  let userType = 'admin';
  let channel = 'email';

  if (parts.length >= 3 && parts[0] === 'notifications') {
    if (VALID_TIERS.includes(parts[1])) {
      tier = parts[1];
    }
    if (VALID_USER_TYPES.includes(parts[2])) {
      userType = parts[2];
    }
    if (parts.length >= 4 && VALID_CHANNELS.includes(parts[3])) {
      channel = parts[3];
    }
  }

  return { tier, userType, channel };
}

export function buildNotificationRoute(tier, userType, channel) {
  return `#/notifications/${tier}/${userType}/${channel}`;
}
