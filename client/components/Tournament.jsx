import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator';

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
      tournaments: []
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

  chooseTournament(e) {
    console.log(this.state.tournaments);
    if (!this.state.tournaments.includes(e.target.innerHTML))
      this.setState({
        tournaments: [...this.state.tournaments, e.target.innerHTML]
      });
  }

  render() {
    return (
      <div>
        <h3>TOURNAMENTS</h3>
        <ul className='list-group'>
          {this.props.tournaments.length > 0 &&
            this.props.tournaments.map((el, ind) => (
              <a href={'/tournaments/' + el.split('#')[0]}>
                <li
                  onClick={e => this.chooseTournament(e)}
                  className='list-group-item'
                  key={el + ind}
                  id={el.split('#')[0]}
                >
                  {el.split('#')[1]}
                </li>
              </a>
            ))}
        </ul>
      </div>
    );
  }
}

const TournamentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tournament);
export default TournamentContainer;
