let names = ['MingShined','陈明圣','React'];
let words = [<p key="1">我是直接定义的html标签1</p>,<p key="2">我是直接定义的html标签2</p>]

var Message = React.createClass({
	getInitialState() {
		return {
			count:1,
			value:123,
			seconds:0,
			year:new Date().getFullYear()
		}
	},
	handleClick(e) {
		let curCount = 0;
		if (e.shiftKey == true) {
			curCount = 10;
		}else {
			curCount = 1;
		}
		this.setState({count:this.state.count+curCount})
	},
	handleChange(event) {
		this.setState({value:event.target.value})
	},
	handleTime(e) {
		let timer = null;
		clearInterval(timer);
		timer = setInterval(() => this.setState({seconds:this.state.seconds+1}), 1000);
		ReactDOM.unmountComponentAtNode(app);
	},
	render() {
        return ( 
        	<div className="container">
				<div><p>我是{this.props.name}</p><p>今年{this.props.age}</p><p>class是{this.props.className}</p></div>
        		<div>
				{
					names.map(function(item, value) {
						return (
							<p key={value}>{item}</p>
						);
					})					
				}
        		</div>
        		<div>{words}</div>
				<span>我是getInitialState里的   {this.state.count}</span>
				<button onClick={this.handleClick}>点击我加1</button>
				<h2>React生命周期的三个过程动作术语</h2>
				<ol>
					<li>mounting:表示正在挂接虚拟DOM到真实DOM。</li>
					<li>updating:表示正在被重新渲染。</li>
					<li>unmounting:表示正在将虚拟DOM移除真实DOM。</li>
				</ol>
				<h2>每个术语提供两个函数</h2>
				<ol>
					<li>componentWillMount()  componentDidMount()</li>
					<li>shouldComponentUpdate</li>
					<li>componentWillUpdate(object nextProps, object nextState)  componentDidUpdate(object prevProps, object prevState)</li>
					<li>componentWillReceiveProps</li>
					<li>componentWillUnmount() componentWillUnmount()</li>
				</ol>
				<input type="text" onChange={this.handleChange} defaultValue={this.state.value}/>
				<p>{this.state.value}</p>
				<p>现在是{this.state.seconds}秒</p>
				<button onClick={this.handleTime}>点击计时</button>
				<p>{this.state.year}</p>
        	</div>
        );
    },
    componentWillMount(){
    	console.log('组件即将渲染');
    },
    componentDidMount() {
    	console.log('组件已经创建');
    },
    componentWillUpdate(nextProps, nextState) {
    	console.log('组件即将更新');
    	console.log(nextState.count);
    },
    componentDidUpdate(prevProps, prevState) {
      console.log('组件已经更新');
    	console.log(prevState.count);
    },
    componentWillUnmount() {
      console.log('组件即将移除');
    }
})

let obj = {};
obj.name = 'MingShined';
obj.age = 21;


ReactDOM.render( 
	<Message {...obj} className="react"/> ,
    document.getElementById('app')
)