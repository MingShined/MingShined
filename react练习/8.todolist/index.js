class List extends React.Component {
	render() {
		let list = this.props.list;
		return (
			<div>
				<ul>
					{
						list.map(function(item, index) {
							return (
								<li key={index}>姓名:{item.userName}  年龄：{item.age}</li>
							);
						})
					}
				</ul>
			</div>
		);
	}
}


class App extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	itemArr:[]
	  };
	};
	handleSubmit() {
		let nameVal = this.userNameInput.value,
			ageVal = this.ageInput.value;
		if (!nameVal) {
			alert('请输入姓名');
			return false;
		}
		if (!ageVal) {
			alert('请输入年龄');
			return false;
		}
		let curItemArr = this.state.itemArr;
		curItemArr.push({
			userName:nameVal,
			age:ageVal
		});
		this.setState({
			itemArr:curItemArr
		});
		this.userNameInput.value = '';
		this.ageInput.value = '';
		this.userNameInput.focus();
		// console.log(this.state.itemArr)
	}
	render() {
		return (
			<div>
				<div className="container">
					<div>
						<label htmlFor="">用户名：</label>
						<input type="text" ref={(el) => this.userNameInput = el}/>						
					</div>
					<div>
						<label htmlFor="">年龄：</label>
						<input type="text" ref={(el) => this.ageInput = el} />						
					</div>		
					<button type="button" onClick={this.handleSubmit.bind(this)}>提交</button>							
					<List list={this.state.itemArr}/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
)