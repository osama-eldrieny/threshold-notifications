import React from 'react';
import { Alert, Button } from '@exp-textura/react';

export function ReachingAdminWorkflowAlert() {
  return (
    <Alert
      variant="warning"
      treatment="subtle"
      type="container-edge"
      style={{ marginBottom: '0', position: 'relative', zIndex: '1001' }}
    >
      <Alert.Icon />
      <Alert.Content>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <Alert.Description style={{ margin: 0 }}>
            You're at 95% usage (950/1000 instances). Contract ends July 30, 2026. Contact your account manager to discuss options.
          </Alert.Description>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <Button
              size="sm"
              buttonType="secondary"
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
      </Alert.Content>
    </Alert>
  );
}
