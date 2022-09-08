<template>
  <div>authoring</div>
  <div>
    <button @click="login">登录</button>
  </div>
</template>
<script setup>
import { provide } from 'vue'
import { AuthenticationClient } from 'authing-js-sdk';

const authing = new AuthenticationClient({
	appId: '624e3dca5ee0dbc06eb02519',
	appHost: 'https://chenjacky131.authing.cn',
	redirectUri: 'http://localhost:4000/callback',
	tokenEndPointAuthMethod: 'none'
});
const login = async () => {
			// PKCE 场景使用示例
			// 生成一个 code_verifier
			let codeChallenge = authing.generateCodeChallenge();
			localStorage.setItem('codeChallenge', codeChallenge);
			// 计算 code_verifier 的 SHA256 摘要
			let codeChallengeDigest = authing.getCodeChallengeDigest({ codeChallenge, method: 'S256' });
			// 构造 OIDC 授权码 + PKCE 模式登录 URL
			let url = authing.buildAuthorizeUrl({ codeChallenge: codeChallengeDigest, codeChallengeMethod: 'S256' });
			window.location.href = url;
}
</script>
<style lang="scss" scoped>

</style>