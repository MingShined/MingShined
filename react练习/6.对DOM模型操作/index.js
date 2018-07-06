class App extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	value:'',
	  	color:''
	  };
	  // this.handleInputChange = this.handleInputChange.bind(this);
	};
	handleInputChange(e) {
		this.setState({
			value:e.target.value
		});
	};
	handleSendValue() {
		this.setState({
			color:this.state.value
		});
		this._input.value = '';
		this._input.focus();
	};
	handleKeyDown(e) {
		if (e.keyCode == 13) {
			this.handleSendValue();
		}
	};
	render() {
		let boxStyle = {
			width: 200,
			height: 200,
			backgroundColor: this.state.color,
		}
		return (
			<div>
				<div style={boxStyle}>{this.state.value}</div>
				<input type="text" placeholder="请输入颜色值" onChange={this.handleInputChange.bind(this)} onKeyDown={(e) => this.handleKeyDown(e)} ref={function (el) {
					this._input = el;
				}.bind(this)}/>
				<button onClick={this.handleSendValue.bind(this)}>回车或点我改变</button>
			</div>
		);
	}
} 

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)