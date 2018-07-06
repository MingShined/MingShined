<template>
	<div>
	<input type="text" name="" v-model="msg">
	<button type="button" @click="getMsg">点我传递数据</button>
	</div>
</template>
<script>
	export default {
	data(){
		return {
			msg:''
		}
	},
	methods:{
		getMsg() {
			this.$store.commit('setAuthor',this.msg);
			// this.$store.dispatch('save');
		}
	}
}
</script>