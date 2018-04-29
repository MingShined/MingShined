<template>
	<div>
		<p>{{author}}</p>
	</div>
</template>
<script>
	export default {
	data(){
		return {
			msg:'老王'
		}
	},
	computed:{
		author() {
			return this.$store.state.author;
		}
	}
}
</script>