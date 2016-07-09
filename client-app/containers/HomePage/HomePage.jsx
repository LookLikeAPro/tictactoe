import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {createGame, getGame, enterGame, exitGame, makeMove, chooseName} from "reducers/games";

import styles from "./HomePage.scss";

const icons = {
	0: "",
	1: "O",
	2: "X"
};

class HomePage extends Component {
	static propTypes = {
		createGame: PropTypes.func,
		getGame: PropTypes.func,
		enterGame: PropTypes.func,
		exitGame: PropTypes.func,
		makeMove: PropTypes.func,
		chooseName: PropTypes.func,
		currentUser: PropTypes.string,
		currentGame: PropTypes.object
	};
	makeMove(index) {
		this.props.makeMove(this.props.currentGame.id, this.props.currentGame.moves%2+1, index);
	}
	chooseName() {
		this.props.chooseName(this.refs.name.value);
	}
	enterGame() {
		this.props.enterGame(this.refs.gameid.value);
	}
	update() {
		if (this.props.currentGame) {
			this.props.getGame(this.props.currentGame.id);
		}
	}
	componentDidMount() {
		this.interval = setInterval(this.update.bind(this), 1000);
	}
	render() {
		const {currentUser, currentGame} = this.props;
		return (<div>
			<div className={"ui segment padded "}>
				<div className="ui container">
					{currentUser?
						<div>
						{currentGame? <div>
							<p>{"Game: "+currentGame.id}</p>
							<p>{currentGame.moves%2 === 0? "Player 1 Move": "Player 2 Move"}</p>
							<div className={styles.board}>
								{(()=>{
									return currentGame.boardState.map((item, i)=>{
										return (<div key={i} className={styles.boardTile} onClick={this.makeMove.bind(this, i)}>
											{icons[item]}
										</div>);
									});
								})()}
							</div>
							<button onClick={::this.props.exitGame}>Exit Game</button>
							</div>:
							<div>
								<button onClick={::this.props.createGame}>Create Game</button>
								<div>
									Enter Game: <input ref="gameid" />
									<button onClick={::this.enterGame}>Submit</button>
								</div>
							</div>
						}</div>
						:
						<div>
							Choose a name:
							<input ref="name" />
							<button onClick={::this.chooseName}>Submit</button>
						</div>
					}
				</div>
			</div>
		</div>);
	}
}

export default connect(state => ({
	currentUser: state.games.currentUser,
	currentGame: state.games.currentGame
}), {createGame, getGame, enterGame, exitGame, makeMove, chooseName})(HomePage);
