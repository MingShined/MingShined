
class Box extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	time:0
	  };
	};
	componentDidMount() {
		setInterval(() => (
			this.setState({
				time: this.state.time + 100
			})
		), 1000)	
	};
	render() {
		var boxStyle = {
			height: 200,
			backgroundColor: this.props.bgcolor,
			lineHeight: 200 + 'px',
			fontSize: 40,
		};
		var count = this.state.time.toLocaleString();
		return (
			<div style={boxStyle}>
				<div>{count}</div>
			</div>
		);
	}
}

class Label extends React.Component {
	render() {
		var labelStyle = {
			height: 100,
		};
		var titStyle = {
			textAlign: 'center',
			fontSize: 20,
			color:"#333"
		};
		var styleBox = {
			smallSize:{
				...titStyle,
				fontSize: 16,
			}
		}
		return (
			<div style={labelStyle}>
				<h2 style={titStyle}>雷霆打击</h2>
				<p style={styleBox.smallSize}>我们的地球</p>
				<p style={titStyle}>(自从你加载这个组件之后)</p>
			</div>
		);
	}
}

class Card extends React.Component {
	render() {
		var cardStyle = {
			width: 400,
			height: this.props.height,
			backgroundColor: this.props.bgcolor,
			filter:"drop-shadow(0 0 5px #666)",
			textAlign: 'center',
		};
		return (
			<div style={cardStyle}>
				<Box bgcolor={this.props.bgcolor}/>
				<Label/>
			</div>
		);
	}
}

Card.defaultProps = {
   height:400,
   bgcolor:"#eee"
}

ReactDOM.render(
	<Card/>,
	document.getElementById('app')
)