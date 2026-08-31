export const exceedingContent = {
  admin: {
    email: {
      subject: 'CRITICAL: Acme Corp Usage - Action Required',
      title: 'ACME Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hello Sarah,',
      body: 'We wanted to keep you informed about your Nintex usage:\n\n• Customer Account: ACME Corp\n• Contract ID: 800GC000001OhM6\n• Product: nc_workflow_instances\n• Status: Exceeding (100% of limit)\n• Current Usage: 25000.0 / 25000.0\n• Subscription End: December 31 2026\n\nYou\'ve exceeded your annual allocation. Your account team is here to help you discuss options for your future needs.\n\nReach out to your account manager anytime.\n\nBest regards,\nNintex',
      yourMove: '',
      cta1: 'Contact AM',
      cta2: 'View dashboard'
    }
  },
  accountOwner: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Team,',
      body: '• Customer Account: ACME Corp\n• Contract ID: 800GC000001OhM6\n• Product: nc_workflow_instances\n• Status: Exceeding (100% of limit)\n• Current Usage: 25000.0 / 25000.0\n• Subscription End: December 31 2026\n\nYour Customer has exceeded their annual allocation. This is a critical account situation requiring immediate action.\nContact this Customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: ''
    },
    slack: {
      title: 'ACME Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Team,',
      body: '• Customer Account: ACME Corp\n• Contract ID: 800GC000001OhM6\n• Product: nc_workflow_instances\n• Status: Exceeding (100% of limit)\n• Current Usage: 25000.0 / 25000.0\n• Subscription End: December 31 2026\n\nYour Customer has exceeded their annual allocation. This is a critical account situation requiring immediate action.\nContact this Customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: ''
    }
  },
  customerSuccess: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Customer Success Team,',
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000\nSubscription end date: 31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    },
    slack: {
      title: 'Acme Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Customer Success Team,',
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000\nSubscription end date: 31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  },
  accountManager: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Account Manager,',
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000\nSubscription end date: 31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  },
  csm: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Customer Success Manager,',
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000\nSubscription end date: 31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  }
};
