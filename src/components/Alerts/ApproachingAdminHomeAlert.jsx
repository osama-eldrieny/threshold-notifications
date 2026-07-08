import React, { useState } from 'react';
import { Alert, Button } from '@exp-textura/react';

export function ApproachingAdminHomeAlert() {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) return null;

  return (
    <Alert
      variant="info"
      treatment="subtle"
      type="inline"
      show={showAlert}
      onClose={() => setShowAlert(false)}
      style={{ marginBottom: '24px' }}
    >
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>You're at 80% usage (800/1000 instances)</Alert.Title>
        <Alert.Description>
          Contract ends December 15, 2026. Contact your account manager to discuss options.
        </Alert.Description>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <Button
            size="sm"
            onClick={() => setShowAlert(false)}
          >
            Contact AM
          </Button>
          <Button
            size="sm"
            buttonType="secondary"
            style={{ borderColor: 'currentColor' }}
            onClick={() => { window.location.hash = '#/dashboard/customer'; }}
          >
            View dashboard
          </Button>
        </div>
      </Alert.Content>
      <Alert.CloseIconButton />
    </Alert>
  );
}
