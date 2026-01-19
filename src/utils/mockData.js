// Mock data and utilities
export const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockEmployees = [
  {
    id: 'emp_1',
    name: 'Alex Johnson',
    role: 'Product Manager',
    status: 'active',
    lastActive: new Date(Date.now() - 30 * 60000), // 30 min ago
    email: 'alex@bfa.local',
    joinDate: new Date('2024-01-15'),
  },
  {
    id: 'emp_2',
    name: 'Sarah Chen',
    role: 'Business Analyst',
    status: 'active',
    lastActive: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    email: 'sarah@bfa.local',
    joinDate: new Date('2024-03-20'),
  },
  {
    id: 'emp_3',
    name: 'Marcus Davis',
    role: 'Strategy Lead',
    status: 'idle',
    lastActive: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
    email: 'marcus@bfa.local',
    joinDate: new Date('2024-02-10'),
  },
  {
    id: 'emp_4',
    name: 'Jessica Wilson',
    role: 'Operations',
    status: 'active',
    lastActive: new Date(Date.now() - 5 * 60000), // 5 min ago
    email: 'jessica@bfa.local',
    joinDate: new Date('2024-04-05'),
  },
];

export const mockWorkspaces = [
  {
    id: 'ws_1',
    name: 'Cloud Computing',
    members: ['emp_1', 'emp_2', 'emp_4'],
    analyses: ['ana_1', 'ana_2'],
    createdAt: new Date('2024-05-01'),
  },
  {
    id: 'ws_2',
    name: 'AI & Automation',
    members: ['emp_1', 'emp_3'],
    analyses: ['ana_2'],
    createdAt: new Date('2024-06-15'),
  },
];

// Sample analysis verdicts and scores
export const analysisTemplates = [
  {
    businessName: 'Cloud Startup XYZ',
    verdict: 'Feasible',
    score: 72,
    marketOpportunity: 'Strong',
    financialHealth: 'Moderate',
    teamReadiness: 'Good',
    risks: [
      { title: 'Market competition', severity: 'high', description: 'Significant players already in the space' },
      { title: 'Unit economics unclear', severity: 'medium', description: 'Needs more detail on pricing model' },
    ],
  },
  {
    businessName: 'AI SaaS Tool',
    verdict: 'Conditional',
    score: 64,
    marketOpportunity: 'Very Strong',
    financialHealth: 'Weak',
    teamReadiness: 'Moderate',
    risks: [
      { title: 'High burn rate', severity: 'high', description: 'Aggressive spending on R&D' },
      { title: 'Regulatory uncertainty', severity: 'medium', description: 'AI compliance evolving' },
      { title: 'Product-market fit unproven', severity: 'medium', description: 'Limited customer feedback' },
    ],
  },
  {
    businessName: 'Green Energy Platform',
    verdict: 'Feasible with Adjustments',
    score: 68,
    marketOpportunity: 'Strong',
    financialHealth: 'Good',
    teamReadiness: 'Good',
    risks: [
      { title: 'Regulatory complexity', severity: 'medium', description: 'Energy sector regulation varies by region' },
      { title: 'Capital requirements', severity: 'high', description: 'Infrastructure investment needed' },
    ],
  },
  {
    businessName: 'Logistics Optimization',
    verdict: 'Not Recommended',
    score: 45,
    marketOpportunity: 'Moderate',
    financialHealth: 'Weak',
    teamReadiness: 'Weak',
    risks: [
      { title: 'Weak market timing', severity: 'high', description: 'Late to already saturated market' },
      { title: 'Team experience gap', severity: 'high', description: 'Limited logistics background' },
      { title: 'Customer acquisition cost too high', severity: 'medium', description: 'Difficult to break even' },
    ],
  },
];

export const getRandomAnalysisTemplate = () => {
  return analysisTemplates[Math.floor(Math.random() * analysisTemplates.length)];
};

export const createAnalysis = (formData) => {
  const template = getRandomAnalysisTemplate();
  return {
    id: `ana_${generateId()}`,
    businessName: formData.businessName || template.businessName,
    founderName: formData.founderName,
    founderExperience: formData.experience,
    status: 'pending',
    verdict: template.verdict,
    score: template.score,
    marketOpportunity: template.marketOpportunity,
    financialHealth: template.financialHealth,
    teamReadiness: template.teamReadiness,
    risks: template.risks,
    createdAt: new Date(),
    createdBy: formData.createdBy, // 'emp_1', 'admin', etc.
    createdByName: formData.createdByName,
    workspaceId: formData.workspaceId || null,
    recommendations: [
      'Refine go-to-market strategy: Define clear customer acquisition channels and costs',
      'Detail financial projections: Provide quarterly runway and break-even analysis',
      'Competitive differentiation: Clarify why you\'ll win against existing players',
      'Team expansion plan: Create realistic timeline for hiring key roles',
    ],
  };
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' year' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' month' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' day' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  return Math.floor(seconds) + ' second' + (Math.floor(seconds) !== 1 ? 's' : '') + ' ago';
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const createAuditEvent = (action, details) => {
  return {
    id: `audit_${generateId()}`,
    action,
    details,
    timestamp: new Date(),
    user: 'system',
  };
};
