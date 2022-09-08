<template>
    <div>登录页</div>
    <div>
        <button @click="login">登录</button>
    </div>
</template>

<style lng="scss" scoped>

</style>

<script setup lang="ts">
import { inject } from 'vue'
const authing = inject('$authing')
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
