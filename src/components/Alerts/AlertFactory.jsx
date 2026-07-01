import React from 'react';
import { ApproachingAdminHomeAlert } from './ApproachingAdminHomeAlert';
import { ApproachingEditorHomeAlert } from './ApproachingEditorHomeAlert';
import { ApproachingAdminWorkflowAlert } from './ApproachingAdminWorkflowAlert';
import { ApproachingEditorWorkflowAlert } from './ApproachingEditorWorkflowAlert';
import { ReachingAdminHomeAlert } from './ReachingAdminHomeAlert';
import { ReachingEditorHomeAlert } from './ReachingEditorHomeAlert';
import { ReachingAdminWorkflowAlert } from './ReachingAdminWorkflowAlert';
import { ReachingEditorWorkflowAlert } from './ReachingEditorWorkflowAlert';
import { ExceedingAdminHomeAlert } from './ExceedingAdminHomeAlert';
import { ExceedingEditorHomeAlert } from './ExceedingEditorHomeAlert';
import { ExceedingAdminWorkflowAlert } from './ExceedingAdminWorkflowAlert';
import { ExceedingEditorWorkflowAlert } from './ExceedingEditorWorkflowAlert';

const alertComponents = {
  approaching: {
    admin: {
      home: ApproachingAdminHomeAlert,
      workflow: ApproachingAdminWorkflowAlert,
    },
    editor: {
      home: ApproachingEditorHomeAlert,
      workflow: ApproachingEditorWorkflowAlert,
    },
  },
  reaching: {
    admin: {
      home: ReachingAdminHomeAlert,
      workflow: ReachingAdminWorkflowAlert,
    },
    editor: {
      home: ReachingEditorHomeAlert,
      workflow: ReachingEditorWorkflowAlert,
    },
  },
  exceeding: {
    admin: {
      home: ExceedingAdminHomeAlert,
      workflow: ExceedingAdminWorkflowAlert,
    },
    editor: {
      home: ExceedingEditorHomeAlert,
      workflow: ExceedingEditorWorkflowAlert,
    },
  },
};

export function AlertFactory({ tier, userType, page }) {
  const AlertComponent = alertComponents[tier]?.[userType]?.[page];

  if (!AlertComponent) {
    return null;
  }

  return <AlertComponent />;
}
