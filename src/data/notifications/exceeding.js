export const exceedingContent = {
  admin: {
    email: {
      subject: 'CRITICAL: Acme Corp Usage - Action Required',
      title: 'ACME Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hello Sarah,',
      body: 'Your Nintex usage has exceeded your allocated limit:\n\nCustomer Account:    Acme Corp\nProduct:             nc_workflow_instances\nStatus:              EXCEEDED LIMIT (105% utilized)\nCurrent Usage:       1050 / 1000 instances\nContract End:        31 December 2026\n\nYour usage has exceeded your annual allocation by 50 instances. Your account team is ready to help you explore solutions to address this situation.\n\nPlease reach out to your account manager to discuss your options.\nBest regards,\nNintex',
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
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: ''
    },
    slack: {
      title: 'Acme Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Team,',
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
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
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    },
    slack: {
      title: 'Acme Corp Exceeding nc_workflow_instances Limit',
      greeting: 'Hi Customer Success Team,',
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
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
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
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
      body: 'Customer Account:  Acme Corp\nProduct:           nc_workflow_instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  }
};
