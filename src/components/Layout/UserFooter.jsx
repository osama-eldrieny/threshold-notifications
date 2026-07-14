import React from 'react';
import { MainNav, Avatar, Badge } from '@exp-textura/react';

const userMenuItems = [
  { label: 'My Settings' },
  { label: 'Notifications', badge: '2' },
];

const userConfig = {
  admin: {
    name: 'Sarah (Admin)',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    fallback: 'SA',
  },
  editor: {
    name: 'Robert (Editor)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    fallback: 'RE',
  },
};

export function UserFooter({ userType = 'admin', onUserTypeChange }) {
  const user = userConfig[userType];
  const otherUserType = userType === 'admin' ? 'editor' : 'admin';
  const otherUser = userConfig[otherUserType];

  const handleSwitchUser = () => {
    onUserTypeChange?.(otherUserType);
  };

  return (
    <MainNav.Menu align="end">
      <MainNav.MenuTrigger>
        <MainNav.User as="button">
          <MainNav.UserAvatar>
            <Avatar name={user.name} ring="red" size="xsm">
              <Avatar.Image src={user.image} />
              <Avatar.Fallback />
            </Avatar>
          </MainNav.UserAvatar>
          <MainNav.UserNotifications>
            <Badge spacing="roomy" variant="critical">{userMenuItems[1].badge}</Badge>
          </MainNav.UserNotifications>
          {user.name}
          <MainNav.Indicator />
        </MainNav.User>
      </MainNav.MenuTrigger>
      <MainNav.MenuContent>
        <MainNav.Item as="button" onClick={handleSwitchUser} style={{ fontSize: '12px' }}>
          <span style={{ fontSize: '11px', wordWrap: 'break-word', display: 'block', whiteSpace: 'normal' }}>
            Switch to {otherUser.name}
          </span>
        </MainNav.Item>
        <MainNav.Item type="divider" />
        {userMenuItems.map((item, index) => (
          <MainNav.Item key={index}>
            {item.label}
            {item.badge && (
              <Badge spacing="roomy" style={{ marginInlineStart: 'auto' }}>{item.badge}</Badge>
            )}
          </MainNav.Item>
        ))}
      </MainNav.MenuContent>
    </MainNav.Menu>
  );
}
