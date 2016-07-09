const createGameSuccess = "createGameSuccess";

const getGameSuccess = "getGameSuccess";

const enterGameSuccess = "enterGameSuccess";
const enterGameFail = "enterGameFail";

const exitGameAction = "exitGameAction";

const createMoveSuccess = "createMoveSuccess";
const createMoveFail = "createMoveFail";

const chooseNameAction = "chooseName";

const initialState = {
	currentUser: null,
	currentGame: null
};

export default function account(state = initialState, action = {}) {
	switch (action.type) {
	case chooseNameAction:
		return {...state,
			currentUser: action.name
		};
	case createGameSuccess:
		return {
			...state,
			currentGame: action.data
		};
	case getGameSuccess:
		return {
			...state,
			currentGame: action.data
		};
	case enterGameSuccess:
		return {
			...state,
			currentGame: action.data
		};
	case enterGameFail:
		alert("ERROR: "+JSON.stringify(action.error));
		return {
			...state,
			warning: action.error
		};
	case exitGameAction:
		return {
			...state,
			currentGame: null
		};
	case createMoveSuccess:
		var newBoard = state.currentGame.boardState.slice(); //Make copy
		newBoard[action.data.position] = action.data.player;
		return {
			...state,
			currentGame: {
				...state.currentGame,
				moves: state.currentGame.moves+1,
				boardState: newBoard
			}
		};
	case createMoveFail:
		alert("ERROR: "+JSON.stringify(action.error));
		return {
			...state,
			warning: action.error
		};
	default:
		return state;
	}
}

export function chooseName(name) {
	return {
		type: chooseNameAction,
		name
	};
}

export function createGame() {
	return {
		types: ["", createGameSuccess, ""],
		callAPI: {
			url: `/api/games`,
			method: "post",
			data: {
				player1: "",
				player2: ""
			}
		},
		payload: {}
	};
}

export function getGame(id) {
	return {
		types: ["", getGameSuccess, ""],
		callAPI: `/api/games/${id}`,
		payload: {}
	};
}

export function enterGame(id) {
	return {
		types: ["", enterGameSuccess, enterGameFail],
		callAPI: `/api/games/${id}`,
		payload: {}
	};
}

export function exitGame() {
	return {
		type: exitGameAction
	};
}

export function makeMove(game, player, index) {
	return {
		types: ["", createMoveSuccess, createMoveFail],
		callAPI: {
			url: `/api/moves`,
			method: "post",
			data: {
				game: game,
				position: index,
				player: player
			}
		},
		payload: {}
	};
}



