import React, { useEffect } from 'react';
import { LucideIcon } from '../Icons/LucideIcon';
import '../../styles/WhatsNewPage.css';

const deliveryChannels = [
  {
    id: 'internal-team',
    group: 'Internal Team',
    roles: 'Account Owner, Account Manager, Customer Success, Customer Success Manager',
    thresholdStatus: 'Approaching, Reaching, Exceeding',
    email: false,
    slack: true,
    inAppBanner: '—',
    phase: 'Phase 1'
  },
  {
    id: 'internal-team-2',
    group: 'Internal Team',
    roles: 'Account Owner, Account Manager, Customer Success, Customer Success Manager',
    thresholdStatus: 'Approaching, Reaching, Exceeding',
    email: true,
    slack: false,
    inAppBanner: '—',
    phase: 'Phase 2'
  },
  {
    id: 'customer-admin-1',
    group: 'Customer',
    roles: 'Customer Admin',
    thresholdStatus: 'Approaching',
    email: true,
    slack: false,
    inAppBanner: 'Dismissable',
    phase: 'After Phase 2'
  },
  {
    id: 'customer-admin-2',
    group: 'Customer',
    roles: 'Customer Admin',
    thresholdStatus: 'Reaching and Exceeding',
    email: true,
    slack: false,
    inAppBanner: 'Non Dismissible',
    phase: 'After Phase 2'
  },
  {
    id: 'customer-editor-1',
    group: 'Customer',
    roles: 'Customer Editor',
    thresholdStatus: 'Approaching',
    email: false,
    slack: false,
    inAppBanner: '—',
    phase: 'After Phase 2'
  },
  {
    id: 'customer-editor-2',
    group: 'Customer',
    roles: 'Customer Editor',
    thresholdStatus: 'Reaching and Exceeding',
    email: false,
    slack: false,
    inAppBanner: 'Dismissible',
    phase: 'After Phase 2'
  }
];

const ctas = [
  {
    id: 'internal-team-account',
    user: 'Internal Team',
    label: 'Go to account',
    redirectTo: 'Salesforce',
    supported: 'Phase 1'
  },
  {
    id: 'internal-team-dashboard',
    user: 'Internal Team',
    label: 'View dashboard',
    redirectTo: 'PowerBI Dashboard',
    supported: 'Phase 2'
  },
  {
    id: 'customer-admin-contact',
    user: 'Customer Admin',
    label: 'Contact Account Manager',
    redirectTo: 'Sends an email',
    supported: 'After Phase 2'
  },
  {
    id: 'customer-admin-dashboard',
    user: 'Customer Admin',
    label: 'View Dashboard',
    redirectTo: 'Dashboard for Data Platform',
    supported: 'After Phase 2'
  }
];

const thresholdStatuses = [
  {
    status: 'Approaching',
    threshold: '70%',
    description: 'Customer has reached 70% of their entitlement usage. A good time to proactively discuss growth roadmap and upgrade options.'
  },
  {
    status: 'Reaching',
    threshold: '90%',
    description: 'Customer has reached 90% of their entitlement usage. This account needs attention — recommend contacting the customer soon.'
  },
  {
    status: 'Exceeding',
    threshold: '100%',
    description: 'Customer has exceeded their entitlement usage. Critical situation requiring immediate action to avoid service disruption.'
  }
];

const products = [
  { entitlementLabel: 'workflow_instances', fullLabel: 'nc_workflow_instances', phase: 'Phase 1' },
  { entitlementLabel: 'DocGen for Workflow', fullLabel: 'nc_workflow_document_generations', phase: 'Phase 1' },
  { entitlementLabel: 'DocGen for Platform', fullLabel: 'nc_docgen_document_generations', phase: 'Phase 1' },
  { entitlementLabel: 'Orchestration Instances', fullLabel: 'nc_orchestration_instances', phase: 'Phase 1' },
  { entitlementLabel: 'ai_runtime_credits', fullLabel: 'nc_ai_runtime_credits', phase: 'Phase 1' },
  { entitlementLabel: 'User Sessions', fullLabel: 'nc_app_user_sessions', phase: 'Phase 1' },
  { entitlementLabel: 'Agents', fullLabel: 'nc_agentflow_instances', phase: 'Phase 1' },
  { entitlementLabel: 'AI Runtime Credits', fullLabel: 'nc_ai_runtime_credits', phase: 'Phase 1' },
  { entitlementLabel: 'Data Rows', fullLabel: 'nc_datastore_rows', phase: 'Phase 1' },
  { entitlementLabel: 'Data Capacity / Storage', fullLabel: 'nc_files_storage_size_mb', phase: 'Phase 1' }
];

const contentTags = [
  { tag: 'CompanyName', example: 'ACME Corp', available: false },
  { tag: 'EntitlemintId', example: 'nc_workflow_instances', available: true },
  { tag: 'ContractId', example: '800GC000001OhM6', available: true },
  { tag: 'ThresholdPercentage', example: '70%', available: true },
  { tag: 'Usage / EntitlemintLimit', example: '17500.0 / 25000.0', available: true },
  { tag: 'SubscriptionEndDateFormatted', example: 'December 31, 2026', available: true }
];

const updates = [
  {
    title: 'Regional team grouping',
    description: 'Internal team roles (<strong>account manager, account owner, customer success, and customer success manager</strong>) are combined into a single regional group — e.g. <strong>Team APAC</strong> — so everyone receives the same email and Slack channel notifications.'
  },
  {
    title: 'Bullet-point message structure',
    description: 'Restructured the message content to have bullet points.'
  },
  {
    title: 'Contract ID field',
    description: 'A "<strong>Contract ID</strong>" line was added to notification bodies to make it easier to look up the underlying agreement.'
  },
  {
    title: '"Subscription End" labeling',
    description: 'Renamed <strong>"Contract End"</strong> to <strong>"Subscription End"</strong> throughout notification content for clarity.'
  },
  {
    title: 'Slack message styling refinements',
    description: 'Removed highlight styling from account owner Slack messages, bolded Slack message titles, and updated the bot badge to a neutral grey.'
  },
  {
    title: 'Dashboard button hidden for phase 1',
    description: 'The "<strong>View dashboard</strong>" button is hidden from internal team notifications for the first phase — it can be added back in phase 2.'
  },
  {
    title: 'Entitlement ID full label',
    description: 'Product name now displays the full entitlement label — e.g. "<strong>nc_workflow_instances</strong>" instead of "<strong>Nintex Workflow</strong>".'
  },
  {
    title: 'Region-based Slack notifications',
    description: 'Slack notifications are now organized per region.'
  },
  {
    title: 'Updated internal team greeting',
    description: 'Internal team notification greeting changed from "<strong>Hi Account Owner</strong>" to "<strong>Hi Team</strong>".'
  },
  {
    title: 'Simplified usage wording',
    description: 'Removed the word "<strong>Instances</strong>" from usage text throughout notifications.'
  },
  {
    title: 'Removed Current Credits line',
    description: 'Removed the <strong>Current Credits</strong> line from notification message content.'
  }
];

export function WhatsNewPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "What's new in V1";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="whats-new-layout">
      <div className="whats-new-header">
        <a href="#/" className="whats-new-back-link">
          <LucideIcon name="arrowLeft" />
          Back to Notification Guide
        </a>
        <h1>What's New in V1</h1>
        <p className="whats-new-subtitle">A summary of the latest updates to the Threshold Notifications experience.</p>
      </div>

      <div className="whats-new-content">
        <ul className="whats-new-list">
          {updates.map((update, i) => (
            <li key={i} className="whats-new-item">
              <div className="whats-new-item-icon">
                <LucideIcon name="checkCircle" />
              </div>
              <div className="whats-new-item-body">
                <h3>{update.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: update.description }} />
              </div>
            </li>
          ))}
        </ul>

        <section className="whats-new-section">
          <h2 className="whats-new-section-title">Threshold Notification Statuses</h2>
          <p className="whats-new-section-subtitle">The usage thresholds that trigger each notification status.</p>
          <div className="delivery-table-wrapper">
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Triggers From</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {thresholdStatuses.map((row) => (
                  <tr key={row.status}>
                    <td className="delivery-table-group">{row.status}</td>
                    <td className="delivery-table-roles">{row.threshold}</td>
                    <td className="delivery-table-roles">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="whats-new-section">
          <h2 className="whats-new-section-title">Products Covered in V1</h2>
          <p className="whats-new-section-subtitle">Entitlements supported by Threshold notifications in this version.</p>
          <div className="delivery-table-wrapper">
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>Entitlement Label</th>
                  <th>Full Label</th>
                  <th>Support</th>
                </tr>
              </thead>
              <tbody>
                {products.map((row) => (
                  <tr key={row.fullLabel}>
                    <td className="delivery-table-group">{row.entitlementLabel}</td>
                    <td className="delivery-table-roles"><code>{row.fullLabel}</code></td>
                    <td className="delivery-table-roles">{row.phase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="whats-new-section">
          <h2 className="whats-new-section-title">Delivery Channel per User</h2>
          <p className="whats-new-section-subtitle">Which channels each user group receives Threshold notifications through, for every alert status.</p>
          <div className="delivery-table-wrapper">
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>User Group</th>
                  <th className="delivery-table-col-roles">Roles Included</th>
                  <th className="delivery-table-col-status">Threshold Status</th>
                  <th>Email</th>
                  <th>Slack</th>
                  <th>In-App Banner</th>
                  <th className="delivery-table-col-phase">Phase</th>
                </tr>
              </thead>
              <tbody>
                {deliveryChannels.map((row) => (
                  <tr key={row.id}>
                    <td className="delivery-table-group">{row.group}</td>
                    <td className="delivery-table-roles">{row.roles}</td>
                    <td className="delivery-table-roles">{row.thresholdStatus}</td>
                    <td className="delivery-table-check">{row.email ? <LucideIcon name="checkCircle" /> : '—'}</td>
                    <td className="delivery-table-check">{row.slack ? <LucideIcon name="checkCircle" /> : '—'}</td>
                    <td className="delivery-table-roles">
                      <span className="delivery-table-banner">
                        {row.inAppBanner !== '—' && <LucideIcon name="checkCircle" />}
                        {row.inAppBanner}
                      </span>
                    </td>
                    <td className="delivery-table-roles">{row.phase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="whats-new-section">
          <h2 className="whats-new-section-title">Content Tags</h2>
          <p className="whats-new-section-subtitle">Dynamic tags available for use in notification content.</p>
          <div className="delivery-table-wrapper">
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Example Value</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                {contentTags.map((row) => (
                  <tr key={row.tag}>
                    <td className="delivery-table-group"><code>{`{{${row.tag}}}`}</code></td>
                    <td className="delivery-table-roles">{row.example}</td>
                    <td className={row.available ? 'delivery-table-check-left' : 'delivery-table-unavailable'}>
                      {row.available ? <LucideIcon name="checkCircle" /> : 'Not available — needs team support'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="whats-new-section">
          <h2 className="whats-new-section-title">Call-to-Action Buttons</h2>
          <p className="whats-new-section-subtitle">CTAs available to each user group and where they lead.</p>
          <div className="delivery-table-wrapper">
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>CTA Label</th>
                  <th>Redirect To</th>
                  <th>Supported</th>
                </tr>
              </thead>
              <tbody>
                {ctas.map((row) => (
                  <tr key={row.id}>
                    <td className="delivery-table-group">{row.user}</td>
                    <td className="delivery-table-roles">{row.label}</td>
                    <td className="delivery-table-roles">{row.redirectTo}</td>
                    <td className="delivery-table-roles">{row.supported}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
