const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

export async function fetchDashboardData() {
  await wait(400)

  return {
    stats: [
      { title: 'Revenue', value: '$128.4K', change: '+12.4%', trend: 'up', icon: 'AttachMoney' },
      { title: 'Customers', value: '4,286', change: '+8.1%', trend: 'up', icon: 'People' },
      { title: 'Conversion', value: '6.7%', change: '+1.2%', trend: 'up', icon: 'TrendingUp' },
      { title: 'Open tasks', value: '18', change: '-3.5%', trend: 'down', icon: 'Checklist' },
    ],
    activity: [
      { label: 'New signups', value: '126', progress: 72 },
      { label: 'Product adoption', value: '84%', progress: 84 },
      { label: 'Support satisfaction', value: '94%', progress: 94 },
    ],
    pipeline: [
      { name: 'Enterprise', amount: '$42K', progress: 75 },
      { name: 'Growth', amount: '$31K', progress: 58 },
      { name: 'SMB', amount: '$19K', progress: 42 },
    ],
  }
}

export async function fetchUsers() {
  await wait(550)

  return [
    { id: 1, name: 'Alicia Johnson', role: 'Product Manager', status: 'Active', team: 'Product' },
    { id: 2, name: 'Marcus Lee', role: 'Frontend Developer', status: 'Away', team: 'Engineering' },
    { id: 3, name: 'Priya Shah', role: 'UX Researcher', status: 'Active', team: 'Design' },
    { id: 4, name: 'David Chen', role: 'Operations Lead', status: 'Inactive', team: 'Ops' },
  ]
}

export async function fetchSettings() {
  await wait(300)

  return {
    notifications: true,
    weeklyDigest: true,
    marketingEmails: false,
    twoFactor: true,
    autoSave: true,
    compactLayout: false,
  }
}
