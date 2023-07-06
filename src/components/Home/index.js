// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

// const teamsApiStatus = {
//   success: 'SUCCESS',
//   inProgress: 'IN_PROGRESS',
//   failed: 'FAILED',
// }

class Home extends Component {
  state = {teamList: [], teamsFetch: false}

  componentDidMount() {
    this.getTeamList()
  }

  getTeamList = async () => {
    const teamListApi = 'https://apis.ccbp.in/ipl'

    const response = await fetch(teamListApi)
    const data = await response.json()
    const {teams} = data
    this.setState({teamList: teams, teamsFetch: true})
  }

  renderTeamList = () => {
    const {teamList, teamsFetch} = this.state

    switch (teamsFetch) {
      case true:
        return teamList.map(eachTeam => (
          <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
        ))
      case false:
        return (
          <div className="team-list" testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg">
        <div className="home-heading-section">
          <img
            alt="ipl logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
            className="ipl-logo"
          />
          <h1 className="home-title">IPL Dashboard</h1>
        </div>
        <ul className="team-list">{this.renderTeamList()}</ul>
      </div>
    )
  }
}

export default Home
