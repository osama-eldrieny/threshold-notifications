export const exceedingContent = {
  admin: {
    email: {
      subject: 'CRITICAL: Acme Corp Usage - Action Required',
      title: 'ACME Corp Exceeding Workflow Instances Limit',
      greeting: 'Hello Sarah,',
      body: 'Your Nintex usage has exceeded your allocated limit:\n\nCustomer Account:    Acme Corp\nProduct:             Workflow Instances\nStatus:              EXCEEDED LIMIT (105% utilized)\nCurrent Usage:       1050 / 1000 instances\nContract End:        31 December 2026\nCurrent Credits:     1050 / 1000 (Over limit by 50 instances)\n\nYour usage has exceeded your annual allocation by 50 instances. Your account team is ready to help you explore solutions to address this situation.\n\nPlease reach out to your account manager to discuss your options.\nBest regards,\nNintex',
      yourMove: '',
      cta1: 'Contact AM',
      cta2: 'View dashboard'
    }
  },
  accountOwner: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding Workflow Instances Limit',
      greeting: 'Hi Account Owner,',
      body: 'Customer Account:  Acme Corp\nProduct:           Workflow Instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    },
    slack: {
      title: 'Acme Corp Exceeding Workflow Instances Limit',
      greeting: 'Hi Account Owner,',
      body: 'Customer Account:  Acme Corp\nProduct:           Workflow Instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  },
  customerSuccess: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding Workflow Instances Limit',
      greeting: 'Hi Customer Success Team,',
      body: 'Customer Account:  Acme Corp\nProduct:           Workflow Instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    },
    slack: {
      title: 'Acme Corp Exceeding Workflow Instances Limit',
      greeting: 'Hi Customer Success Team,',
      body: 'Customer Account:  Acme Corp\nProduct:           Workflow Instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  },
  accountManager: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding Workflow Instances Limit',
      greeting: 'Hi Account Manager,',
      body: 'Customer Account:  Acme Corp\nProduct:           Workflow Instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  },
  csm: {
    email: {
      subject: 'CRITICAL: Acme Corp - EXCEEDED Usage Limit',
      title: 'ACME Corp Exceeding Workflow Instances Limit',
      greeting: 'Hi Customer Success Manager,',
      body: 'Customer Account:  Acme Corp\nProduct:           Workflow Instances\nStatus:            EXCEEDING (105% of limit)\nCurrent Usage:     1050 / 1000 instances\nContract End:      31 December 2026\nCurrent Credits:   1050 / 1000 (Over limit by 50 instances)\n\nAcme Corp has exceeded their annual allocation. This is a critical account situation requiring immediate action. The customer may experience service disruptions or throttling. Contact the customer immediately to discuss emergency upgrade options or implement usage controls.',
      yourMove: '',
      cta1: 'Go to account',
      cta2: 'View dashboard'
    }
  },
  editor: {
    email: {
      subject: 'CRITICAL: Workflow Instances Quota EXCEEDED',
      title: 'CRITICAL: Quota Exceeded - Service at Risk',
      greeting: 'Hello,',
      body: 'CRITICAL ALERT: Your organization has EXCEEDED its Workflow Instances quota by 5%.\n\nCurrent Usage: 1050 / 1000 instances\n\nYour account is now at CRITICAL status. Service disruptions and performance throttling may occur.\n\nIMPORTANT ACTIONS REQUIRED:\n1. Immediately deactivate or delete non-essential workflows\n2. Optimize remaining workflows for efficiency\n3. Contact your administrator for emergency quota expansion\n4. Review usage patterns to prevent future overages\n\nFailure to reduce usage may result in service limitations.',
      yourMove: 'Take immediate action to reduce usage.',
      cta1: 'Delete workflows',
      cta2: 'Emergency help'
    }
  }
};
