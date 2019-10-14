import React from 'react'

class MatchBrackets extends React.Component {
  constructor(){
    super()
  }
  render(){
    console.log("THIS PROPS", this.props.state)
    const currentTournament = this.props.state.currentTournament
    const mappedGames = currentTournament.map(match=>{
      const divStyle = {
        gridColumn: match.columnNumber,
        gridRow: match.roundNumber
      }
      return <div style={divStyle} column={match.columnNumber} round={match.roundNumber} id={match.columnNumber} className="match" onClick={()=>confirm('alert')}>{match.player1Username} vs {match.player2Username}</div>
  })
    return (
      <div id="gamesDisplay">
        {mappedGames}
      </div>
    )
  }
}

export default MatchBrackets