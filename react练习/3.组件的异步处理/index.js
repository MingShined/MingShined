class App extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	value:1
	  };
	};
	componentDidMount() {
		setTimeout(() => (
			this.setState({
				value:this.state.value+6
			})
		), 5000);	
	};
	render() {
		return (
			<div>
				<p>{this.state.value + this.state.value}</p>
			</div>
		);
	};
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)