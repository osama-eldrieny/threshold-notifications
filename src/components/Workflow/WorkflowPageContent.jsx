import React, { useState } from 'react';
import {
  Header, Button, ButtonGroup, List, Chip, TabBar, Tab
} from '@exp-textura/react';
import {
  Add, Filter, OverflowHorizontal, Download
} from '@exp-textura/icons/streamline-sl';
import { AlertFactory } from '../Alerts/AlertFactory';
import '../../styles/WorkflowPage.css';

export function WorkflowPageContent({ tier = 'approaching', userType = 'admin' }) {
  const [activeTab, setActiveTab] = useState('published');

  const [workflows, setWorkflows] = useState([
    {
      id: '1',
      name: 'Employee Onboarding',
      status: 'active',
      lastRun: '2 hours ago',
      runs: 234,
      success: 98
    },
    {
      id: '2',
      name: 'Invoice Approval',
      status: 'active',
      lastRun: '5 minutes ago',
      runs: 1542,
      success: 95
    },
    {
      id: '3',
      name: 'Leave Request',
      status: 'paused',
      lastRun: '1 day ago',
      runs: 89,
      success: 100
    },
    {
      id: '4',
      name: 'Document Review',
      status: 'active',
      lastRun: '30 minutes ago',
      runs: 567,
      success: 92
    },
    {
      id: '5',
      name: 'Purchase Order',
      status: 'draft',
      lastRun: 'Never',
      runs: 0,
      success: 0
    }
  ]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Workflow Name',
      size: 350,
      cell: (info) => (
        <div className="workflow-name-cell">
          <span className="workflow-name">{info.getValue()}</span>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 150,
      cell: (info) => {
        const status = info.getValue();
        const variantMap = {
          active: 'positive',
          paused: 'warning',
          draft: 'subtle'
        };
        return (
          <Chip type="subtle" variant={variantMap[status] || 'subtle'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Chip>
        );
      }
    },
    {
      accessorKey: 'lastRun',
      header: 'Last Run',
      size: 150
    },
    {
      accessorKey: 'runs',
      header: 'Total Runs',
      size: 150,
      cell: (info) => info.getValue().toLocaleString()
    },
    {
      accessorKey: 'success',
      header: 'Success Rate',
      size: 150,
      cell: (info) => {
        const success = info.getValue();
        return (
          <span className={`success-rate ${success >= 95 ? 'high' : success >= 90 ? 'medium' : 'low'}`}>
            {success}%
          </span>
        );
      }
    },
    {
      id: 'actions',
      header: '',
      size: 50,
      cell: () => (
        <Button variant="ghost" size="sm" aria-label="More actions">
          <OverflowHorizontal />
        </Button>
      )
    }
  ];

  return (
    <div className="workflow-page">
      {!((tier === 'reaching' && userType === 'admin') || (tier === 'exceeding' && userType === 'admin') || (tier === 'approaching' && userType === 'editor')) && (
        <div style={{ width: '100%' }}>
          <AlertFactory tier={tier} userType={userType} page="workflow" />
        </div>
      )}
      {/* Header with 2 buttons on right */}
      <div className="workflow-header-section">
        <Header>
          <Header.Main>
            <Header.Content>
              <Header.Title>Workflows</Header.Title>
            </Header.Content>
            <Header.Actions>
              <ButtonGroup>
                <Button variant="secondary">
                  <Download />
                  Export
                </Button>
                <Button>
                  <Add />
                  New Workflow
                </Button>
              </ButtonGroup>
            </Header.Actions>
          </Header.Main>
        </Header>
      </div>

      {/* TabBar with 2 tabs */}
      <div className="workflow-tabs-section">
        <div className="tabs-with-actions">
          <TabBar value={activeTab} onValueChange={setActiveTab}>
            <TabBar.List>
              <Tab value="published">Published</Tab>
              <Tab value="drafts">Drafts</Tab>
            </TabBar.List>
          </TabBar>
          <div className="tabs-actions">
            <Button variant="secondary" size="sm">
              <Filter />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Table/List */}
      <div className="workflow-list-section">
        <List data={workflows} columns={columns}>
          <List.Header />
          <List.Body />
        </List>
      </div>
    </div>
  );
}
