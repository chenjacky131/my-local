<template>
	<div>首页</div>
	<div>欢迎，{{state.userInfo.email}}</div>
	<div v-if="state.userInfo"><button @click="logout">登出</button></div>
</template>

<style lng="scss" scoped>
</style>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, inject, reactive } from 'vue'
const authing = inject('$authing')
const route = useRoute()
const router = useRouter()
const state = reactive({
	userInfo: ''
})
const getToken = async (code, codeChallenge) => {
		try{
			let tokenSet = await authing.getAccessTokenByCode(code, { codeVerifier: codeChallenge });
			const { access_token, id_token } = tokenSet;
			let userInfo = await authing.getUserInfoByAccessToken(tokenSet.access_token);
			localStorage.setItem('accessToken', access_token);
			localStorage.setItem('idToken', id_token);
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
			state.userInfo = userInfo
		}catch(err){
			console.warn(err)
			router.push({path: '/login'})
		}
}
const logout = () => {
		let idToken = localStorage.getItem('idToken');
		authing.buildLogoutUrl({ expert: true, redirectUri: 'http://localhost:3000/login', idToken });
		localStorage.clear();
		window.location.href = 'http://localhost:3000/login';
}
onMounted(() => {
		const currentQuery = route.query;
		const code = currentQuery.code || '';
		const codeChallenge = localStorage.getItem('codeChallenge');
		const userInfo = localStorage.getItem('userInfo')
		if(userInfo){
			state.userInfo = JSON.parse(userInfo);
		}else{
			getToken(code, codeChallenge);
		}	  
})
</script>