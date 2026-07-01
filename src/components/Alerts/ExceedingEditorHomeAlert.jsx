import React, { useState } from 'react';
import { Alert as TexturaAlert } from '@exp-textura/react';

export function ExceedingEditorHomeAlert() {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) return null;

  return (
    <TexturaAlert
      variant="critical"
      treatment="subtle"
      type="inline"
      show={showAlert}
      onClose={() => setShowAlert(false)}
      style={{ marginBottom: '24px' }}
    >
      <TexturaAlert.Icon />
      <TexturaAlert.Content>
        <TexturaAlert.Description>
          Your organization has exceeded usage limits. Please reach out to your Admin
        </TexturaAlert.Description>
      </TexturaAlert.Content>
      <TexturaAlert.CloseIconButton />
    </TexturaAlert>
  );
}
