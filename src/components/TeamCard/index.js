// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const formattedTeam = {
    id: eachTeam.id,
    name: eachTeam.name,
    teamImageUrl: eachTeam.team_image_url,
  }
  const {id, name, teamImageUrl} = formattedTeam

  return (
    <li className="team-card-item">
      <Link to={`/team-matches/${id}`} className="team-link">
        <img alt={`${name}`} src={teamImageUrl} className="team-logo" />
        <p className="team-title">{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard
