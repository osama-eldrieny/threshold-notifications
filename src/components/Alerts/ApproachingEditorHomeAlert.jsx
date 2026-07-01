import React, { useState } from 'react';
import { Alert, Button } from '@exp-textura/react';

export function ApproachingEditorHomeAlert() {
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
        <Alert.Title>Document storage approaching limit</Alert.Title>
        <Alert.Description>
          Your team is using 40% of allocated storage. Consider archiving old documents to free up space.
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
