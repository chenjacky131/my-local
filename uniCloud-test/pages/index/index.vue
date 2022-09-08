<template>
	<view class="content">
		Hello World
		<br>
		<ul>
			<li v-for="(item,index) in records" :key="index">
				{{item.name}} is {{item.age}} years old.
			</li>
		</ul>
		<template v-if="phoneNo">
			<button @click="add">添加一条记录</button>
			<button @click="remove">删除一条记录</button>
			<button @click="update">更新一条记录</button>			
		</template>
		<button @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:1,
				pageSize:10,
				records:[],
				access_token:'',
				openid:'',
				phoneNo:''
			}
		},
		onLoad() {
			this.getByPage()
		},
		methods: {
			async add(){	//	添加数据
				return await uniCloud.callFunction({
					name: 'add',
					data:{
						name:'Tom',
						age: 18
					}
				}).then(res => {
					console.log('添加成功:', res)
				}).catch(err => {
					console.error(err)
				})
			},
			async remove(){	//	删除数据
				return await uniCloud.callFunction({
					name:'remove',
					data:{
						_id: "60cb17ae1ccee70001b1c2a2"
					}
				}).then(res => {
					console.log('删除成功:', res)
				}).catch(err => {
					console.error(err)
				})
			},
			async update(){	//	更新数据
				return await uniCloud.callFunction({
					name:'update',
					data:{
						search:{
							_id: "60cbfbdeacc1cf00014bdbae"
						},
						update:{
							name:"jack",
							age:28
						}
					}
				}).then(res => {
					console.log('修改成功:', res)
				}).catch(err => {
					console.error(err)
				})
			},
			async get(){	//	获取表里所有的数据
				return await uniCloud.callFunction({
					name:'get'
				}).then(res => {
					console.log('获取成功:', res)
					this.records = res.result.data
				}).catch(err => {
					console.error(err)
				})
			},
			async getByPage(){	//	分页获取数据
				return await uniCloud.callFunction({
					name:'getByPage',
					data:{
						current: this.current,
						pageSize: this.pageSize
					}
				}).then(res => {
					console.log('获取成功:', res)
					this.records = res.result.data
				}).catch(err => {
					console.error(err)
				})
			},
			login(){
				uni.login({
				    provider: 'univerify',
				    univerifyStyle: { // 自定义登录框样式
				    //参考`univerifyStyle 数据结构`
				  },
					success: (res) => { // 登录成功
							console.log(res.authResult);  // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
							this.access_token = res.authResult.access_token
							this.openid = res.authResult.openid
							this.realLogin()
					},
					fail(res){  // 登录失败
							console.log(res.errCode)
							console.log(res.errMsg)
							uni.showToast({title: res.errMsg, icon:"none"})
							setTimeout(() => {
								uni.closeAuthView()
							}, 1500)
					}
				})
			},
			realLogin(){
				// 在得到access_token后，通过callfunction调用云函数
				uniCloud.callFunction({
				  name: 'login', // 你的云函数名称
				  data: {
				    'access_token': this.access_token, // 客户端一键登录接口返回的access_token
				    'openid': this.openid // 客户端一键登录接口返回的openid
				  }
				}).then(res => {
				  // res.result = {
				  //   code: '',
				  //   message: ''
				  // }
				  // 登录成功，可以关闭一键登录授权界面了
					console.log(res.result)
					this.phoneNo = res.result.phone
					uni.closeAuthView()
				}).catch(err=>{
				  // 处理错误
					uni.showToast({
						title: err, 
						icon:"none",
						success:() => {
							setTimeout(() => {
								uni.closeAuthView()
							}, 1500)							
						}
					})
				})
			}
		}
	}
</script>

<style>

</style>
