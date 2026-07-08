import React from 'react';
import { Alert as TexturaAlert, Button } from '@exp-textura/react';

export function ReachingAdminHomeAlert() {
  return (
    <TexturaAlert
      variant="warning"
      treatment="subtle"
      type="container-edge"
      style={{ marginBottom: '0', position: 'relative', zIndex: '1001' }}
    >
      <TexturaAlert.Icon />
      <TexturaAlert.Content>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <TexturaAlert.Description style={{ margin: 0 }}>
            You're at 95% usage (950/1000 instances). Contract ends July 30, 2026. Contact your account manager to discuss options.
          </TexturaAlert.Description>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <Button
              size="sm"
              buttonType="secondary"
              onClick={() => { window.location.hash = '#/dashboard/customer'; }}
            >
              View dashboard
            </Button>
            <Button
              size="sm"
            >
              Contact AM
            </Button>
          </div>
        </div>
      </TexturaAlert.Content>
    </TexturaAlert>
  );
}
