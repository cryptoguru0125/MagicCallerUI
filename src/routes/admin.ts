import CampaignsPage from 'pages/CampaignsPage'
import CampaignsDetailPage from 'pages/CampaignsDetailPage'
import ProfilePage from 'pages/ProfilePage'
import IntegrationsPage from 'pages/IntegrationsPage'
import AgentsPage from 'pages/AgentsPage'
import BlockListsPage from 'pages/BlockListsPage'

const routes = [
  {
    path: '/',
    component: CampaignsPage,
    title: 'Campaigns',
    exact: true,
  },
  {
    path: '/campaigns/:campaignId',
    component: CampaignsDetailPage,
    hide: true,
  },
  {
    path: '/agents',
    component: AgentsPage,
    title: 'Agents',
  },
  {
    path: '/integrations',
    component: IntegrationsPage,
    title: 'Integrations',
  },
  {
    path: '/block-lists',
    component: BlockListsPage,
    title: 'Do-Not-Call',
  },
  {
    path: '/profile',
    component: ProfilePage,
    exact: true,
    hide: true,
  },
]

export default routes
