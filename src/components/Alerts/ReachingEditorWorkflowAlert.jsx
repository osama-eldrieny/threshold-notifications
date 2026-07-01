import React, { useState } from 'react';
import { Alert } from '@exp-textura/react';

export function ReachingEditorWorkflowAlert() {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) return null;

  return (
    <Alert
      variant="warning"
      treatment="subtle"
      type="inline"
      show={showAlert}
      onClose={() => setShowAlert(false)}
      style={{ marginBottom: '24px' }}
    >
      <Alert.Icon />
      <Alert.Content>
        <Alert.Description>
          Your organization is at 95% usage. Please reach out to your Admin
        </Alert.Description>
      </Alert.Content>
      <Alert.CloseIconButton />
    </Alert>
  );
}
