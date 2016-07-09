import React, {Component, PropTypes} from "react";

import styles from "./Application.scss";
// @connect((state) => ({
// 	currentUser: state.users.currentUser
// }))
class Application extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		children: PropTypes.object,
		currentUser: PropTypes.object,
		location: PropTypes.object
	};
	state = {
		drawerOpen: false
	}
	handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});
	render() {
		return (<div>
			<div className={styles.appContainer}>
				<div className={styles.contentFlex}>{this.props.children}</div>
			</div>
		</div>);
	}
}

export default Application;
