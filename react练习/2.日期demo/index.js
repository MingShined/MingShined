class Tc extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	  hour: new Date().getHours(),
		  minute: new Date().getMinutes(),
		  second: new Date().getSeconds()
	  };
	};
	componentDidMount() {
		setInterval(() => (
			this.setState({
			    hour:new Date().getHours()>10?new Date().getHours():'0' + new Date().getHours(),
			    minute: new Date().getMinutes()>10?new Date().getMinutes():'0' + new Date().getMinutes(),
				second: new Date().getSeconds()>10?new Date().getSeconds():'0' + new Date().getSeconds()
			})
		), 1000);
	};
	render() {
		return (
			<div>
				<p>今天是时间是：{this.state.hour} 时 {this.state.minute} 分 {this.state.second} </p>
			</div>
		);
	};
}

class Dc extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	  year: new Date().getFullYear(),
		  month: new Date().getMonth() + 1,
		  day: new Date().getDate(),
	  };
	};
	handleClick() {
		alert(1)
	};
	render() {
		return (
			<div>
				<p>今天是{this.state.year} 年 {this.state.month} 月 {this.state.day} 日</p>
			</div>
		);
	};
}

class App extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	};
	render() {
		return (
			<div>
				<Dc/>
				<Tc/>				
			</div>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)