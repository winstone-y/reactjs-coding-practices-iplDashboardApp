// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatchesApiStatus: false, teamData: ''}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const teamMatchesApiUrl = `https://apis.ccbp.in/ipl/${params.id}`
    const teamMatchesResponse = await fetch(teamMatchesApiUrl)
    const teamMatchesData = await teamMatchesResponse.json()
    // console.log(teamMatchesData)
    if (teamMatchesResponse.ok) {
      this.setState({teamMatchesApiStatus: true, teamData: teamMatchesData})
    } else {
      this.setState({teamMatchesApiStatus: false})
    }
  }

  displayTeamMatches = () => {
    const {teamData} = this.state

    const formattedTeamData = {
      latestMatchDetails: teamData.latest_match_details,
      recentMatches: teamData.recent_matches,
      teamBannerUrl: teamData.team_banner_url,
    }
    const {teamBannerUrl, latestMatchDetails, recentMatches} = formattedTeamData
    const formattedLatestMatchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      result: latestMatchDetails.result,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      umpires: latestMatchDetails.umpires,
    }
    const {
      competingTeam,
      date,
      venue,
      result,
      competingTeamLogo,
      firstInnings,
      secondInnings,
      manOfTheMatch,
      umpires,
    } = formattedLatestMatchDetails

    // console.log(teamData)
    return (
      <>
        <div className="team-banner">
          <img src={teamBannerUrl} alt="team banner" className="banner-image" />
        </div>
        <div className="latest-match">
          <h1 className="latest-match-title">Latest Matches</h1>
          <div className="latest-match-body">
            <div className="latest-match-left-section">
              <p className="left-section-title">{competingTeam}</p>
              <p className="">{date}</p>
              <p className="">{venue}</p>
              <p className="">{result}</p>
            </div>
            <div className="latest-match-center-section">
              <img
                src={competingTeamLogo}
                alt={`latest match ${competingTeam}`}
                className="competing-team-logo"
              />
            </div>
            <div className="latest-match-right-section">
              <h1 className="right-section-title">First Innings</h1>
              <p className="right-section-desc">{firstInnings}</p>
              <h1 className="right-section-title">Second Innings</h1>
              <p className="right-section-desc">{secondInnings}</p>
              <h1 className="right-section-title">Man of The Match</h1>
              <p className="right-section-desc">{manOfTheMatch}</p>
              <h1 className="right-section-title">Umpires</h1>
              <p className="right-section-desc">{umpires}</p>
            </div>
          </div>
        </div>
        <div className="recent-matches">
          <ul className="recent-list">
            {recentMatches.map(eachRecentMatch => {
              const formattedRecentMatch = {
                competingTeam: eachRecentMatch.competing_team,
                date: eachRecentMatch.date,
                venue: eachRecentMatch.venue,
                result: eachRecentMatch.result,
                competingTeamLogo: eachRecentMatch.competing_team_logo,
                firstInnings: eachRecentMatch.first_innings,
                secondInnings: eachRecentMatch.second_innings,
                manOfTheMatch: eachRecentMatch.man_of_the_match,
                matchStatus: eachRecentMatch.match_status,
                umpires: eachRecentMatch.umpires,
                id: eachRecentMatch.id,
              }
              const statusClass =
                formattedRecentMatch.matchStatus === 'Won' ? 'green' : 'red'

              return (
                <li key={formattedRecentMatch.id} className="recent-match-item">
                  <img
                    src={formattedRecentMatch.competingTeamLogo}
                    alt={`competing team ${formattedRecentMatch.competingTeam}`}
                    className="competing-team-logo"
                  />
                  <p className="left-section-title">
                    {formattedRecentMatch.competingTeam}
                  </p>
                  <p>{formattedRecentMatch.result}</p>
                  <p className={`left-section-title ${statusClass}`}>
                    {formattedRecentMatch.matchStatus}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {teamMatchesApiStatus} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const customBackgroundStyle = `custom-${id}`
    return (
      <div className={`team-matches-bg ${customBackgroundStyle}`}>
        {teamMatchesApiStatus ? (
          this.displayTeamMatches()
        ) : (
          // eslint-disable-next-line react/no-unknown-property
          <div className="team-list" testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
