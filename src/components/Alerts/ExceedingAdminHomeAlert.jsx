import React from 'react';
import { Alert as TexturaAlert, Button } from '@exp-textura/react';

export function ExceedingAdminHomeAlert() {
  return (
    <TexturaAlert
      variant="critical"
      treatment="subtle"
      type="container-edge"
      style={{ marginBottom: '0', position: 'relative', zIndex: '1001' }}
    >
      <TexturaAlert.Icon />
      <TexturaAlert.Content>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <TexturaAlert.Description style={{ margin: 0 }}>
            You have exceeded your usage limit (1050/1000 instances). Over limit by 50 instances. Contract ends July 15, 2026. Contact your account manager to discuss options.
          </TexturaAlert.Description>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <Button
              size="sm"
              buttonType="secondary"
              style={{ borderColor: 'currentColor' }}
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
