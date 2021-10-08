import React from 'react'
import { Route, Link } from 'react-router-dom'
import {
  MDBBadge,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBSideNavNav,
  MDBSideNav,
  MDBSideNavLink,
  MDBContainer,
} from 'mdbreact'

import { getCampaign, getMessageCount } from 'store/campaigns/actions'
import Spinner from 'components/Spinner'
import CampaignLeadsPage from '../CampaignLeadsPage'
import CampaignLeadDetailPage from '../CampaignLeadDetailPage'
import TransfersPage from '../TransfersPage'
import ChatsPage from 'pages/ChatsPage'
import CampaignFollowupGroupPage from '../CampaignFollowupGroupPage'
import CampaignFollowUpPage from '../CampaignFollowUpPage'
import CampaignIVRPage from '../CampaignIVRPage'
import CampaignIVRPromptPage from '../CampaignIVRPromptPage'
import CampaignSettingsPage from '../CampaignSettingsPage'
import CampaignNumbersPage from '../CampaignNumbersPage'
import CampaignTransferOptionsPage from '../CampaignTransferOptionsPage'
import CampaignTransferNumbersPage from '../CampaignTransferNumbersPage'
import CampaignCallLogPage from '../CampaignCallLogPage'
import './CampaignsDetailPage.scss'

interface Props {
  user: User
}

interface States {
  campaign: Campaign
}

class CampaignsDetailPage extends React.Component<
  Props & Dispatch & RouteProps,
  States
> {
  state = {
    campaign: null,
  }

  channel = null
  channelName = null

  componentDidMount() {
    const { user } = this.props

    this.channelName = `private-admin`
    this.channel = user.pusher.subscribe(this.channelName)
    this.channel.bind('message', this.handleNewMessage)
  }

  componentWillUnmount() {
    const { user } = this.props

    this.channel.unbind('message', this.handleNewMessage)
    this.channel = null
    user.pusher.unsubscribe(this.channelName)
  }

  handleNewMessage = () => {
    const { campaign } = this.state

    if (campaign!) {
      return
    }

    getMessageCount(campaign.id).then(res => {
      this.setState({
        campaign: {
          ...campaign,
          messageCount: res,
        },
      })
    })
  }

  constructor(props) {
    super(props)
    const {
      params: { campaignId },
    } = this.props.match

    this.props.dispatch(getCampaign(campaignId)).then(res => {
      this.setState({ campaign: res })
    })
  }
  render() {
    const { match } = this.props
    const { campaign } = this.state

    if (!campaign) {
      return <Spinner />
    }

    return (
      <MDBContainer className='campaign-detail-page' fluid={true}>
        <MDBSideNav
          slim={true}
          fixed={true}
          mask='rgba-blue-strong'
          breakWidth={1300}
        >
          <MDBSideNavNav
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <MDBSideNavLink to={`${match.url}`} exact={true} topLevel={true}>
              <i className='fe-users mr-2' />
              Leads
            </MDBSideNavLink>

            <MDBSideNavLink to={`${match.url}/transfers`} topLevel={true}>
              <i className='fe-phone-forwarded mr-2' />
              Transfers
            </MDBSideNavLink>

            <MDBSideNavLink to={`${match.url}/chats`} topLevel={true}>
              <i className='fe-message-square mr-2' />
              Chats
              <MDBBadge color='danger' className='ml-2'>
                {campaign.messageCount}
              </MDBBadge>
            </MDBSideNavLink>

            <MDBSideNavLink to={`${match.url}/ivr`} topLevel={true}>
              <i className='fe-grid mr-2' />
              IVR
            </MDBSideNavLink>

            <MDBSideNavLink to={`${match.url}/follow-up`} topLevel={true}>
              <i className='fe-git-branch mr-2' />
              Followup
            </MDBSideNavLink>

            <MDBSideNavLink
              to={`${match.url}/transfer-options`}
              topLevel={true}
            >
              <i className='fe-zap mr-2' />
              Transfer Options
            </MDBSideNavLink>

            <MDBSideNavLink to={`${match.url}/settings`} topLevel={true}>
              <i className='fe-settings mr-2' />
              Settings
            </MDBSideNavLink>

            <MDBSideNavLink to={`${match.url}/call-logs`} topLevel={true}>
              <i className='fe-headphones mr-2' />
              Call Log
            </MDBSideNavLink>

            <MDBSideNavLink to={`${match.url}/numbers`} topLevel={true}>
              <i className='fe-phone mr-2' />
              Numbers
            </MDBSideNavLink>
          </MDBSideNavNav>
        </MDBSideNav>

        <div className='d-flex'>
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <Link to='/campaigns'>Campaigns</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active={true}>{campaign.name}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </div>

        <Route
          path={`${match.path}`}
          render={() => <CampaignLeadsPage campaign={campaign} />}
          exact={true}
        />
        <Route
          path={`${match.path}/leads/:leadId`}
          render={() => <CampaignLeadDetailPage campaign={campaign} />}
          exact={true}
        />

        <Route
          path={`${match.path}/transfers`}
          render={() => <TransfersPage campaign={campaign} />}
          exact={true}
        />

        <Route
          path={`${match.path}/chats`}
          render={() => <ChatsPage campaign={campaign} />}
          exact={true}
        />

        <Route
          path={`${match.path}/follow-up`}
          render={() => <CampaignFollowupGroupPage campaign={campaign} />}
          exact={true}
        />
        <Route
          path={`${match.path}/follow-up/:groupId`}
          render={() => <CampaignFollowUpPage campaign={campaign} />}
        />
        <Route
          path={`${match.path}/ivr`}
          render={() => <CampaignIVRPage campaign={campaign} />}
          exact={true}
        />
        <Route
          path={`${match.path}/ivr/:ivrId`}
          render={() => <CampaignIVRPromptPage campaign={campaign} />}
        />
        <Route
          path={`${match.path}/transfer-options`}
          render={() => <CampaignTransferOptionsPage campaign={campaign} />}
          exact={true}
        />
        <Route
          path={`${match.path}/transfer-options/:optionId`}
          render={() => <CampaignTransferNumbersPage campaign={campaign} />}
        />
        <Route
          path={`${match.path}/settings`}
          render={() => <CampaignSettingsPage campaign={campaign} />}
        />
        <Route
          path={`${match.path}/numbers`}
          render={() => <CampaignNumbersPage campaign={campaign} />}
        />
        <Route
          path={`${match.path}/call-logs`}
          render={() => <CampaignCallLogPage campaign={campaign} />}
        />
      </MDBContainer>
    )
  }
}

export default CampaignsDetailPage
