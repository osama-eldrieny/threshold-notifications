import React, { useState } from 'react';
import { Alert, Button } from '@exp-textura/react';

export function ApproachingEditorWorkflowAlert() {
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
        <Alert.Title>Editor workflow capacity at 35%</Alert.Title>
        <Alert.Description>
          Editor user - Approaching tier - Workflow page. Your workflows are using 3,500 of 10,000 available capacity. Continue monitoring.
        </Alert.Description>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setShowAlert(false)}
          style={{ marginTop: '12px' }}
        >
          Got it
        </Button>
      </Alert.Content>
      <Alert.CloseIconButton />
    </Alert>
  );
}
