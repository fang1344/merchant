<template>
	<div class="container">
		<view class="title">蓝牙打印机</view>
		<div class="list-c">
			<div class="item" @click="openBLT()">
				<div class="item-l"><span class="sub-title">添加蓝牙打印机</span></div>
				<i class="icon mt-arrow-right-o"></i>
			</div>
		</div>
		<bluetooth></bluetooth>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { bluetooth } from '@/components/bluetooth.vue';
export default {
	data() {
		return {};
	},
	computed: {},
	async mounted() {},
	methods: {
		ab2hex(buffer) {
			const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
				return ('00' + bit.toString(16)).slice(-2);
			});
			return hexArr.join('');
		},
		openBLT() {
			console.log('aaa');
			uni.openBluetoothAdapter({
				success(res) {
					console.log(JSON.stringify(res));
					uni.createBLEConnection({
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId:'551EEBCC-39DA-CFB5-C001-F416FFB889E2',
						success(res) {
							console.log('createBLEConnection',JSON.stringify(res));
						},fail(res) {
							console.log('createBLEConnection-fail',JSON.stringify(res));
						}
					});
					// uni.startBluetoothDevicesDiscovery({
					// 	success(res2) {
					// 		console.log(JSON.stringify(res2));
					uni.stopBluetoothDevicesDiscovery({
						success(res) {
							console.log('stopBluetoothDevicesDiscovery', JSON.stringify(res));
						}
					});
					uni.getBluetoothDevices({
						success(res) {
							console.log('getBluetoothDevices', JSON.stringify(res));
						}
					});
					// ArrayBuffer转16进度字符串示例
					// uni.onBluetoothDeviceFound(function(devices) {
					// 	console.log('new device list has founded');
					// 	console.dir(devices);
					// 	console.log(JSON.stringify(devices));
					uni.onBluetoothAdapterStateChange(function(res) {
						console.log('adapterState changed, now is', JSON.stringify(res));
					});
					uni.getConnectedBluetoothDevices({
						success(res) {
							console.log('getConnectedBluetoothDevices', JSON.stringify(res));
						}
					});

					// console.log(this.ab2hex(devices[0].advertisData));
					// });
					// },
					// fail(res2) {
					// 	console.log('fail', JSON.stringify(res2));
					// }
					// });
				},
				fail(res) {
					console.log(res);
				}
			});
		},
		sendDataToBLE: function(deviceId, serviceId, characteristicId, msg, callbackIfFinish) {
			function encode_utf8(s) {
				return unescape(encodeURIComponent(s));
			}

			function str2ab(str) {
				var s = encode_utf8(str);
				var buf = new ArrayBuffer(s.length);
				var bufView = new Uint8Array(buf);
				for (var i = 0, strLen = s.length; i < strLen; i++) {
					bufView[i] = s.charCodeAt(i);
				}
				return bufView;
			}

			function split_array(arr, len) {
				var a_len = arr.length;
				var result = [];
				for (var i = 0; i < a_len; i += len) {
					result.push(arr.slice(i, i + len));
				}
				return result;
			}
			//var uint8Buf = str2ab(msg);
			var uint8Array = new textencoding.TextEncoder('gb2312', {
				NONSTANDARD_allowLegacyEncoding: true
			}).encode(msg);
			var uint8Buf = Array.from(uint8Array);
			//拆分数组 每20个元素组成一个新数组
			var sendloop = split_array(uint8Buf, 20);

			function realWriteData(sendloop, i) {
				if (i >= sendloop.length) {
					if (callbackIfFinish) {
						callbackIfFinish(1, '');
					}
					return;
				}
				var tagName = 'DeviceID:' + deviceId + ' ServiceID:' + serviceId + ' CharcWriteID:' + characteristicId + ' -> 第【' + +'】次写入 => ';
				var newsenddata = sendloop[i];
				let buffer = new ArrayBuffer(newsenddata.length);
				let dataView = new DataView(buffer);
				for (var j = 0; j < newsenddata.length; j++) {
					dataView.setUint8(j, newsenddata[j]);
				}
				uni.writeBLECharacteristicValue({
					deviceId: deviceId,
					serviceId: serviceId,
					characteristicId: characteristicId,
					// 这里的value是ArrayBuffer类型
					value: buffer,
					success: function(res) {
						realWriteData(sendloop, i + 1);
					},
					fail: function(err) {
						emaosoft.show_none_toast_20sec(tagName + err.errMsg);
						if (callbackIfFinish) {
							callbackIfFinish(0, tagName + err.errMsg);
						}
					}
				});
			}
			var i = 0;
			realWriteData(sendloop, 0);
		},

		closeBLEConnectionAndAdapter: function(deviceId) {
			uni.closeBLEConnection({
				deviceId: deviceId,
				success: function(res) {
					emaosoft.console_log('closeBLEConnection 成功');
				},
				fail: function() {
					emaosoft.console_log('closeBLEConnection 失败');
				},
				complete: function() {}
			});
		},

		printByBluetoothPrinterAsBLE4: function(deviceId, printDataArray, calbackForLog, callbackIfFinish) {
			//emaosoft.console_log(JSON.stringify(printDataArray));
			var that = this;
			emaosoft.console_log('蓝牙设备deviceId:' + deviceId);
			var maxTryCount = 10;
			var curTryIndex = 0;
			//建立与设备的连接
			function connectToBLEDevice() {
				calbackForLog('正在连接蓝牙设备 ' + deviceId + ' ...');
				uni.createBLEConnection({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId,
					success: function(res) {
						emaosoft.console_log('createBLEConnection:' + JSON.stringify(res));
						//emaosoft.show_none_toast("DeviceID:" + deviceId + "成功与蓝牙设备建立连接:" + JSON.stringify(res));
					},
					fail: function(err) {
						emaosoft.console_log(JSON.stringify(err));
						calbackForLog('连接蓝牙设备失败：' + err.errMsg);
						//emaosoft.show_none_toast(err.errMsg);
						app_intf.closeBLEConnectionAndAdapter(deviceId);
					}
				});
			}
			//  监听低功耗蓝牙设备连接状态变化
			uni.onBLEConnectionStateChange(function(e) {
				emaosoft.console_log('onBLEConnectionStateChange: ' + JSON.stringify(e));
				if (e.deviceId == deviceId) {
					if (e.connected) {
						calbackForLog('连接蓝牙设备 ' + deviceId + ' 成功.');
						function getBLEDeviceServicesIfZeroDeviceServices() {
							setTimeout(function() {
								calbackForLog('正在获取蓝牙设备的BLE设备服务信息 ...');
								uni.getBLEDeviceServices({
									// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
									deviceId,
									success: function(res) {
										emaosoft.console_log('getBLEDeviceServices:' + JSON.stringify(res));
										calbackForLog('共获取到蓝牙设备的' + res.services.length + '个BLE设备服务信息');
										if (res.services.length == 0) {
											app_intf.closeBLEConnectionAndAdapter(deviceId);
											curTryIndex++;
											if (curTryIndex < maxTryCount) {
												setTimeout(function() {
													calbackForLog('#第' + curTryIndex + '次尝试重新连接蓝牙设备以获取蓝牙设备的BLE设备服务信息 ...');
													connectToBLEDevice();
												}, 2000);
											} else {
												calbackForLog('连续' + maxTryCount + '次获取蓝牙设备的BLE设备服务信息失败，请重新连接蓝牙设备');
											}
										} else {
											//emaosoft.show_none_toast("DeviceID:" + deviceId + " 获取BLE设备所有服务:" + JSON.stringify(res));
											var tipMessage = 'DeviceID:' + deviceId + ' 获取BLE设备所有服务:' + JSON.stringify(res);
											var serviceId = '';
											for (var s = 0; s < res.services.length; s++) {
												var curServiceID = '' + res.services[s].uuid;
												curServiceID = curServiceID.toUpperCase();
												if (curServiceID == '49535343-FE7D-4AE5-8FA9-9FAFD205E455') {
													serviceId = res.services[s].uuid;
												} else if (curServiceID.indexOf('FE7D') != -1) {
													serviceId = res.services[s].uuid;
												}
											}
											if (serviceId == '') {
												serviceId = res.services[0].uuid;
											}
											calbackForLog('正在获取蓝牙设备BLE设备服务 ' + serviceId + ' 的特征值 ...');
											setTimeout(function() {
												uni.getBLEDeviceCharacteristics({
													// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
													deviceId,
													// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
													serviceId,
													success: function(res) {
														emaosoft.console_log('getBLEDeviceCharacteristics:' + JSON.stringify(res));
														//emaosoft.show_none_toast("DeviceID:" + deviceId + " ServiceID:" + serviceId + " 获取蓝牙设备指定服务中所有特征值:" + JSON.stringify(res));
														tipMessage +=
															'\nDeviceID:' + deviceId + ' ServiceID:' + serviceId + ' 获取蓝牙设备指定服务中所有特征值:' + JSON.stringify(res);
														//emaosoft.show_none_toast_20sec(tipMessage);

														var characteristicNotifyId = '';
														var characteristicReadId = '';
														var characteristicWriteId = '';
														if (res.characteristics && res.characteristics.length > 0) {
															for (var i = 0; i < res.characteristics.length; i++) {
																var curCharc = res.characteristics[i];
																if (curCharc.properties.notify) {
																	characteristicNotifyId = curCharc.uuid;
																}
																if (curCharc.properties.read) {
																	characteristicReadId = curCharc.uuid;
																}
																if (curCharc.properties.write) {
																	characteristicWriteId = curCharc.uuid;
																}
															}
															if (!characteristicWriteId || characteristicWriteId == '') {
																characteristicWriteId = res.characteristics[0].uuid;
															}
														}
														calbackForLog('正在打印 ...');
														var printerText = that.buildTSPLCommandsForPrintData(printDataArray);
														that.sendDataToBLE(deviceId, serviceId, characteristicWriteId, printerText, function(success, msg) {
															//关闭与设备的连接
															app_intf.closeBLEConnectionAndAdapter(deviceId);
															if (success == 1) {
																emaosoft.show_none_toast('打印完成');
																calbackForLog('打印完成 ...');
																if (callbackIfFinish) {
																	callbackIfFinish();
																}
															} else {
																//emaosoft.show_none_toast("打印失败:" + msg);
																calbackForLog('打印失败：' + msg);
															}
														});
													},
													fail: function(err) {
														emaosoft.console_log(JSON.stringify(err));
														//emaosoft.show_none_toast(err.errMsg);
														calbackForLog('正在获取蓝牙设备BLE设备服务 ' + serviceId + ' 的特征值失败：' + err.errMsg);
														app_intf.closeBLEConnectionAndAdapter(deviceId);
													}
												});
											}, 1000);
										}
									},
									fail: function(err) {
										emaosoft.console_log(JSON.stringify(err));
										//emaosoft.show_none_toast(err.errMsg);
										calbackForLog('获取蓝牙设备的BLE设备服务信息失败：' + err.errMsg);
										app_intf.closeBLEConnectionAndAdapter(deviceId);
									}
								});
							}, 1000);
						}
						getBLEDeviceServicesIfZeroDeviceServices();
					} else {
						calbackForLog('断开与蓝牙设备 ' + deviceId + ' 的连接.');
					}
				}
			});

			connectToBLEDevice();
		},
		printComponent: {
			//字符个数
			strLen: function(val) {
				var len = 0;
				for (var i = 0; i < val.length; i++) {
					var a = val.charAt(i);
					if (a.match(/[^\x00-\xff]/gi) != null) {
						len += 1;
					} else {
						len += 0.5;
					}
				}
				return len;
			},

			//空格
			spacing: function(str) {
				var blank = '';
				var row = Math.ceil(this.strLen(str) / 16); //行数
				var len = (16 * row - this.strLen(str)) * 2;
				for (var i = 0; i < len; i++) {
					blank += ' ';
				}
				console.log((str + blank).length);
				return str + blank;
			},

			//左右对齐
			justify: function(str1, str2) {
				var blank = '';
				var len = (16 - this.strLen(str1) - this.strLen(str2)) * 2;
				for (var i = 0; i < len; i++) {
					blank += ' ';
				}
				return str1 + blank + str2;
			},

			//分割线
			newline: function() {
				var line = '--------------------------------';
				return line;
			},

			//打印(拣货单)
			print3: function(_this) {
				var str = '';
				//str+='   —YOULENONG—  ';
				str += this.spacing(' ');
				str += this.spacing('订单号:' + _this.order_no);

				for (var i = 0; i < _this.goodsArr.length; i++) {
					var v = _this.goodsArr[i];
					str += this.spacing(v.goods_name);
					str += this.justify('销价:' + v.goods_price + '/' + v.unit, '购买量:' + v.goods_num);
					str += this.spacing('货号:' + v.product_no);
					//str+=this.justify('折扣:-xxx','折后:xxx');
					str += this.newline();
				}
				str += this.spacing(new Date().Format('MM-dd hh:mm:ss'));
				str += this.spacing(' ');
				str += this.spacing(' ');
				str += this.spacing(' ');
				_this.bluetoothTool.sendData(str); //把字符串 发给蓝牙，打印
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/css/global.scss';
page {
	background-color: #ffffff;
}
.container {
	background-color: #ffffff;
	.title {
		font-size: 32upx;
		margin: 20upx 30upx;
	}
	.list-c {
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
		background-color: white;
		.item {
			display: flex;
			align-items: center;
			height: 88upx;
			border-bottom: 2upx solid $spLine-color;
			padding: 0 20upx;
			text {
				font-size: 28upx;
			}
			.active-type {
				border: 1px solid #ccc;
				border-radius: 10upx;
				font-size: 30upx;
				margin-left: 20upx;
				padding: 5upx 10upx;
			}
			input {
				font-size: 28upx;
				margin-left: 40upx;
			}
			.item-l {
				display: flex;
				flex: 1;
				i {
					font-size: 38upx;
					color: $textDarkGray-color;
				}
				.sub-title {
					font-size: 28upx;
					color: $textBlack-color;
					margin-top: 6upx;
				}
			}
			i {
				font-size: 24upx;
				color: $textGray-color;
			}
		}
		.item:last-child {
			border-bottom: 0upx solid $spLine-color;
		}
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88upx;
		background-color: white;
		margin-top: 20upx;
		color: $textBlack-color;
		font-size: 28upx;
	}
}
</style>
