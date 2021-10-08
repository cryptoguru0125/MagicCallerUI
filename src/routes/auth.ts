import ChatsPage from 'pages/AgentDashboard/ChatsPage'
import ProfilePage from 'pages/ProfilePage'

const routes = [
  {
    path: '/',
    component: ChatsPage,
    exact: true,
    title: 'Chats',
  },
  {
    path: '/profile',
    component: ProfilePage,
    exact: true,
    hide: true,
  },
]

export default routes
