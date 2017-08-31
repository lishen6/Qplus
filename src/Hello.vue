<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<h2>Essential Links</h2>
		<textarea name="aa" rows="10" cols="1" v-text="txt"></textarea>
		<div v-on:click="opendt" style="background-color: #2C3E50;width: 100px;height: 60px;line-height: 60px;margin: auto;color: #fff;">
			打开微信地图
		</div>
		<p v-text="latitude"></p>
		<p v-text="longitude"></p>
		<p v-text="city"></p>
		<div v-on:click="pay" style="background-color: #2C3E50;width: 100px;height: 60px;line-height: 60px;margin: auto;color: #fff;">
			付款
		</div>
		<div v-bind:id="torehtml | escape2"></div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'

	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				txt: '',
				latitude: '',
				longitude: '',
				speed: '',
				accuracy: '',
				city: '',
				torehtml: '&lt;p&gt;请在输入框内贴入你需要转换的HTML代码&lt;/p&gt; &lt;p&gt;HTML转换工具，可以将HTML代码转换为HTML转义字符串&lt;/p&gt; &lt;p&gt;直接将你所要用程序输出的大串HTML代码贴到输入框中，即可一键生成&lt;/p&gt; &lt;p&gt;如果您觉得好用，请记得收藏我们的地址！&lt;/p&gt;'
			}
		},
		filters: {
			escape2: function(str) {
				var arrEntities = {
					'lt': '<',
					'gt': '>',
					'nbsp': ' ',
					'amp': '&',
					'quot': '"'
				};
				return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
					return arrEntities[t];
				});

			}
		},
		mounted: function() {
			var self = this;
			self.baidu();
			this.$http.get('http://yingzaiqidian.cn/weixin/signPackage.php', {
				params: {
					pageurl: document.URL
				}
			}).then(function(response) {
				// 这里是处理正确的回调
				//this.articles = response.data.subjects
				// this.articles = response.data["subjects"] 也可以
				this.txt = JSON.stringify(response.body);
				console.log(response)
				console.log(document.URL)
				var sign = response.body;

				wx.config({
					debug: true,
					appId: sign.appId,
					timestamp: sign.timestamp,
					nonceStr: sign.nonceStr,
					signature: sign.signature,
					jsApiList: [
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'onMenuShareQZone',
						'hideMenuItems',
						'showMenuItems',
						'hideAllNonBaseMenuItem',
						'showAllNonBaseMenuItem',
						'translateVoice',
						'startRecord',
						'stopRecord',
						'onVoiceRecordEnd',
						'playVoice',
						'onVoicePlayEnd',
						'pauseVoice',
						'stopVoice',
						'uploadVoice',
						'downloadVoice',
						'chooseImage',
						'previewImage',
						'uploadImage',
						'downloadImage',
						'getNetworkType',
						'openLocation',
						'getLocation',
						'hideOptionMenu',
						'showOptionMenu',
						'closeWindow',
						'scanQRCode',
						'chooseWXPay',
						'openProductSpecificView',
						'addCard',
						'chooseCard',
						'openCard'
					]
				});
				wx.ready(function() {
					console.log('wx ok');
				});
				wx.error(function(res) {
					console.log(res);
				});
			}, function(response) {
				// 这里是处理错误的回调
				console.log(response)
			});

		},
		methods: {

			opendt: function() {
				var self = this;

				wx.openLocation({
					latitude: self.latitude || 23.099994, // 纬度，浮点数，范围为90 ~ -90
					longitude: self.longitude || 113.324520, // 经度，浮点数，范围为180 ~ -180。
					name: '测试', // 位置名
					address: '这是一个测试地址', // 地址详情说明
					scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
					infoUrl: 'http://yingzaiqidian.cn/' // 在查看位置界面底部显示的超链接,可点击跳转
				});
			},
			pay: function() {
				var self = this;
				wx.chooseWXPay({
					timestamp: 1414723227,
					nonceStr: 'noncestr',
					package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
					signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
					paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
				});
			},
			baidu: function() {
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(showPosition);
				} else {
					alert("地址位置获取失败0");
				}

				function showPosition(position) {
					var str = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
					console.log(str)
					var latlon = position.coords.latitude + ',' + position.coords.longitude;

					//baidu
					var url = 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + latlon + '&output=json&pois=1&ak=dECHZkE2hdgGvkjLEMlsssCi';
					$.ajax({
						type: "GET",
						dataType: "jsonp",
						url: url,
						beforeSend: function() {
							console.log('正在定位...');
						},
						success: function(json) {
							console.log(json)
							if(json.status == 0) {
								console.log(json.result.formatted_address);
								alert(json.result.formatted_address)
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							alert(latlon + "地址位置获取失败");
						}
					});
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}

	textarea {
		width: 100%;
	}
</style>
