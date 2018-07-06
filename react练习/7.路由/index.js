var {
	Router,
	Route,
	IndexRoute,
	Link,
	IndexLink,
	hashHistory
} = ReactRouter;


class Home extends React.Component {
	render() {
		return (
			<div>
				<p>我是新闻页内容</p>
			</div>
		);
	}
}

class Weather extends React.Component {
	render() {
		return (
			<div>
				<p>我是天气页内容</p>
			</div>
		);
	}
}

class Jokes extends React.Component {
	render() {
		return (
			<div>
				<p>我是笑话页内容</p>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<h2>React Router</h2>
				<ul>
					<li><IndexLink to="/" activeClassName="active">新闻</IndexLink></li>
					<li><Link to="/weather" activeClassName="active">天气</Link></li>
					<li><Link to="/jokes" activeClassName="active">笑话</Link></li>
				</ul>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Router history={ hashHistory }>
		<Route path="/" component={App}>
			<IndexRoute component={ Home }></IndexRoute>
			<Route path="weather" component={Weather}></Route>
			<Route path="jokes" component={Jokes}></Route>
		</Route>
	</Router>,
	document.getElementById('app')
)