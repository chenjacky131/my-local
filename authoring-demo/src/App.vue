<template>
	<el-config-provider :locale="locale">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import { AuthenticationClient } from 'authing-js-sdk';

const authing = new AuthenticationClient({
	appId: '624e3dca5ee0dbc06eb02519',
	appHost: 'https://chenjacky131.authing.cn',
	redirectUri: 'http://localhost:3000/',
	tokenEndPointAuthMethod: 'none'
});
import { computed, provide } from "vue";
import { i18n } from "./i18n";
import { version, buildTime } from "../build/info.json"
provide('$authing', authing)
console.log(`%c Release Build Info 
%cVersion			v${version}
BuildTime		${buildTime}`
, "background:#000;color:#FFF;font-weight:bold;"
, "background:#FFF;color:#000;"
)

let locale = computed(() => (i18n.global.messages as any)![i18n.global.locale]);
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav { padding: 30px; }
#nav a { font-weight: bold; color: #2c3e50; }
#nav a.router-link-exact-active { color: #42b983; }
</style>
