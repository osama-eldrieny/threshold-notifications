// Mock accounts data for threshold notifications dashboards
// Shaped to match notification content patterns but as a separate, clean dataset

// Product definitions
export const PRODUCTS = [
  'Workflow Instances',
  'DocGen for Platform',
  'Orchestration Instances',
  'User Sessions',
  'Data Rows',
  'Data Storage',
  'AI Runtime Credits'
];

export const accounts = [
  {
    id: 'acme',
    name: 'Acme Corp',
    products: [
      { name: 'Workflow Instances', usage: 1050, limit: 1000, tier: 'exceeding', velocity: 'spike' },
      { name: 'DocGen for Platform', usage: 450, limit: 500, tier: 'approaching', velocity: 'steady' },
      { name: 'Orchestration Instances', usage: 320, limit: 400, tier: 'approaching', velocity: 'flat' },
      { name: 'User Sessions', usage: 1200, limit: 1500, tier: 'approaching', velocity: 'steady' },
      { name: 'Data Rows', usage: 2800000, limit: 3000000, tier: 'approaching', velocity: 'steady' },
      { name: 'Data Storage', usage: 450, limit: 500, tier: 'approaching', velocity: 'flat' },
      { name: 'AI Runtime Credits', usage: 680, limit: 1000, tier: 'approaching', velocity: 'spike' },
    ],
    contractEnd: '2026-12-31',
    region: 'EMEA',
    tenantId: 'TEN-10234',
    assignedAM: 'Jordan Blake',
    lastContacted: null,
  },
  {
    id: 'globex',
    name: 'Globex Industries',
    products: [
      { name: 'Workflow Instances', usage: 950, limit: 1000, tier: 'reaching', velocity: 'steady' },
      { name: 'DocGen for Platform', usage: 380, limit: 500, tier: 'approaching', velocity: 'flat' },
      { name: 'Orchestration Instances', usage: 280, limit: 400, tier: 'approaching', velocity: 'steady' },
      { name: 'User Sessions', usage: 950, limit: 1500, tier: 'approaching', velocity: 'steady' },
      { name: 'Data Rows', usage: 2100000, limit: 3000000, tier: 'approaching', velocity: 'steady' },
      { name: 'Data Storage', usage: 320, limit: 500, tier: 'approaching', velocity: 'steady' },
      { name: 'AI Runtime Credits', usage: 450, limit: 1000, tier: 'approaching', velocity: 'steady' },
    ],
    contractEnd: '2027-03-15',
    region: 'APAC',
    tenantId: 'TEN-10567',
    assignedAM: 'Alex Turner',
    lastContacted: '2026-06-28',
  },
  {
    id: 'initech',
    name: 'Initech LLC',
    products: [
      { name: 'Workflow Instances', usage: 800, limit: 1000, tier: 'approaching', velocity: 'flat' },
      { name: 'DocGen for Platform', usage: 220, limit: 500, tier: 'approaching', velocity: 'flat' },
      { name: 'Orchestration Instances', usage: 150, limit: 400, tier: 'approaching', velocity: 'flat' },
      { name: 'User Sessions', usage: 620, limit: 1500, tier: 'approaching', velocity: 'flat' },
      { name: 'Data Rows', usage: 1500000, limit: 3000000, tier: 'approaching', velocity: 'flat' },
      { name: 'Data Storage', usage: 280, limit: 500, tier: 'approaching', velocity: 'flat' },
      { name: 'AI Runtime Credits', usage: 300, limit: 1000, tier: 'approaching', velocity: 'flat' },
    ],
    contractEnd: '2026-06-30',
    region: 'EMEA',
    tenantId: 'TEN-10891',
    assignedAM: 'Sarah Johnson',
    lastContacted: '2026-06-15',
  },
  {
    id: 'umbrella',
    name: 'Umbrella Group',
    products: [
      { name: 'Workflow Instances', usage: 650, limit: 1000, tier: null, velocity: 'steady' },
      { name: 'DocGen for Platform', usage: 250, limit: 500, tier: null, velocity: 'steady' },
      { name: 'Orchestration Instances', usage: 150, limit: 400, tier: null, velocity: 'steady' },
      { name: 'User Sessions', usage: 800, limit: 1500, tier: null, velocity: 'steady' },
      { name: 'Data Rows', usage: 1800000, limit: 3000000, tier: null, velocity: 'steady' },
      { name: 'Data Storage', usage: 320, limit: 500, tier: null, velocity: 'steady' },
      { name: 'AI Runtime Credits', usage: 450, limit: 1000, tier: null, velocity: 'steady' },
    ],
    contractEnd: '2026-09-30',
    region: 'APAC',
    tenantId: 'TEN-11023',
    assignedAM: 'Mike Chen',
    lastContacted: null,
  },
  {
    id: 'nexus',
    name: 'Nexus Tech',
    products: [
      { name: 'Workflow Instances', usage: 690, limit: 1000, tier: null, velocity: 'flat' },
      { name: 'DocGen for Platform', usage: 300, limit: 500, tier: null, velocity: 'flat' },
      { name: 'Orchestration Instances', usage: 220, limit: 400, tier: null, velocity: 'flat' },
      { name: 'User Sessions', usage: 750, limit: 1500, tier: null, velocity: 'flat' },
      { name: 'Data Rows', usage: 1650000, limit: 3000000, tier: null, velocity: 'flat' },
      { name: 'Data Storage', usage: 250, limit: 500, tier: null, velocity: 'flat' },
      { name: 'AI Runtime Credits', usage: 450, limit: 1000, tier: null, velocity: 'flat' },
    ],
    contractEnd: '2027-06-15',
    region: 'EMEA',
    tenantId: 'TEN-11456',
    assignedAM: 'Emma Davis',
    lastContacted: '2026-07-01',
  },
];

// Helper: calculate usage percentage for a single product
export const getPercent = (product) => {
  return Math.round((product.usage / product.limit) * 100);
};

// Helper: calculate tier based on usage percentage
export const getTierByPercent = (percent) => {
  if (percent < 70) return null; // Below 70% - no tier
  if (percent < 90) return 'approaching'; // 70-90%
  if (percent < 100) return 'reaching'; // 90-100%
  return 'exceeding'; // 100%+
};

// Helper: calculate days until contract renewal
export const getDaysToRenewal = (account) => {
  const contractDate = new Date(account.contractEnd);
  const today = new Date();
  const diffMs = contractDate - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Helper: return human-readable status label
export const getStatusLabel = (tier) => {
  const labels = {
    approaching: 'Approaching Limit',
    reaching: 'Reaching Limit',
    exceeding: 'Exceeded Limit',
  };
  return labels[tier] || tier;
};

// Helper: return velocity badge label
export const getVelocityLabel = (velocity) => {
  const labels = {
    spike: 'Spike',
    steady: 'Steady',
    flat: 'Flat',
  };
  return labels[velocity] || velocity;
};

// Helper: count products by tier across all accounts
export const countByTier = (tierName) => {
  let count = 0;
  accounts.forEach((account) => {
    account.products.forEach((product) => {
      const calculatedTier = getTierByPercent(getPercent(product));
      if (calculatedTier === tierName) count++;
    });
  });
  return count;
};

// Helper: get the highest (most critical) tier for an account across all products
export const getAccountHighestTier = (account) => {
  const tierOrder = { exceeding: 0, reaching: 1, approaching: 2 };
  const highestTier = account.products.reduce((max, product) => {
    const calculatedTier = getTierByPercent(getPercent(product));
    if (!calculatedTier) return max; // Skip null tiers
    return tierOrder[calculatedTier] < tierOrder[max] ? calculatedTier : max;
  }, null);
  return highestTier || 'approaching';
};

// Helper: calculate average days to renewal across all accounts
export const getAverageDaysToRenewal = () => {
  if (accounts.length === 0) return 0;
  const totalDays = accounts.reduce((sum, account) => sum + getDaysToRenewal(account), 0);
  return Math.round(totalDays / accounts.length);
};

// Helper: get all products in critical state across all accounts
export const getCriticalProducts = () => {
  const critical = [];
  accounts.forEach((account) => {
    account.products.forEach((product) => {
      if (product.tier === 'exceeding' || product.tier === 'reaching') {
        critical.push({
          accountName: account.name,
          ...product,
        });
      }
    });
  });
  return critical;
};
