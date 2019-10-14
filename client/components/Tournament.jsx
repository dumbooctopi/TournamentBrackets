import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator';
import MatchBrackets from './MatchBrackets';

const mapStateToProps = state => {
  return { tournaments: state.tournaments };
};

function mapDispatchToProps(dispatch) {
  return {
    addTournament: tournament => dispatch(actions.addTournament(tournament))
  };
}

class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      currentTournament: []
    };
    this.chooseTournament = this.chooseTournament.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/tournaments/getall')
      .then(res => res.json())
      .then(data =>
        data.forEach(tournament =>
          this.props.addTournament(`${tournament.id}#${tournament.name}`)
        )
      );
  }

  // add current tournament data to state for prop drilling on the presentational component
  chooseTournament(e) {
    const matchName = e.target.innerHTML;
    fetch('http://localhost:8080/tournaments/' + e.target.value)
      .then(res => res.json())
      .then(data => {
        this.setState({
          tournaments: [...this.state.tournaments, matchName],
          currentTournament: data
        });
        console.log(this.state)
      });
  }

  render() {
    return (
      <div>
        <h3>TOURNAMENTS</h3>
        <select onChange={e => this.chooseTournament(e)} className='list-group'>
          {this.props.tournaments.length > 0 &&
            this.props.tournaments.map((el, ind) => (
              <option
                className='list-group-item'
                key={el + ind}
                id={el.split('#')[0]}
                value={el.split('#')[0]}
              >
                {el.split('#')[1]}
              </option>
            ))}
        </select>
        <MatchBrackets state={this.state}/>
      </div>
    );
  }
}

const TournamentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tournament);
export default TournamentContainer;
