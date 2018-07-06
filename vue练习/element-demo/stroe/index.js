import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		author:'我是初始的作者陈先生',
		data:1
	},
	mutations:{
		setAuthor(state,msg){
			state.author = msg;
		}
	},
	actions:{
		save(context) {
			axios.get('../src/assets/a.txt').then(function (res) {
				console.log(res.data);
				this.state.author = res.data;
			}.bind(this)).catch(function (err) {
				console.log(err)
			})
		}
	}
})

export default store;