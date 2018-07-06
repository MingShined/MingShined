
class Box extends React.Component {
	render() {
		var divStyle = {
			backgroundColor: this.props.bgcolor,
			width: 100,
			height: 100,
			borderRadius: "50%",
			display:"inline-block",
			marginLeft: 20,
		}
		return (
			<div style={divStyle}>
				<div></div>
			</div>
		);
	}
}


class App extends React.Component {
	initData() {
		let divArr = [],
			colorArr = ['red','yellow','blue','green','purple','orange'];
		for (var i = 0; i < colorArr.length; i++) {
			var ran = Math.floor(Math.random() * colorArr.length);
			divArr.push(<Box bgcolor={colorArr[ran]} key={i}/>)
		}
		return divArr;
	};
	render() {
		return (
			<div>
				{this.initData()}
			</div>
		);
	};
} 

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)