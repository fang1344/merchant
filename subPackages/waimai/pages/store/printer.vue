<template>
	<view class="content">
		<view>
			<button @click="open" >蓝牙连接小票打印机</button>
			
			<button @click="Port" >打印小票</button>
			
			<button @click="State" >打印机状态</button>
			
			<button @click="Dis" >断开打印机</button>
			<!-- <text>{{title}}</text> -->
		</view>
	</view>
</template>


<script>
	// require插件名称  
	const gp= uni.requireNativePlugin('Html5App-Gprinter'); 
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {
			open(){
				//蓝牙连接打印机
				const _this=this;
				gp.BluetoothPort({setBackgroundColor:"#2088d2"},result=>{
					_this.title=JSON.stringify(result);
					_this.$api.msg(result.msg)
				});
				
			},
			Port()
			{  
				//打印小票
				const _this=this;
				
				//制作小票格式， 
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				line={};
				line.text="七点校园";
				line.center="center";
				line.font="max";
				line.bottom="3";
				data.push(line); //每添加一个，代表一行字
				
				line={};  //每添加一个一行字之前,清空一下
				line.text="七点校园外卖单";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="店铺名称:00056";
				line.center="left";
				line.font="bold";
				line.bottom="1";
				data.push(line);
				
				line={};  
				line.text="单号:00256933";
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				
				line={};  
				line.text="订单日期：2019-05-30 18:15:25";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				//商品列表，示例
				for(let i=0;i<2;i++)
				{
			   
				line={};
				line.text="商品名称：青椒肉丝盖浇饭";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["数量：1","单价：305","金额：305"];
				line.left=[0,30,60];
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
									
				}
				
				line={}; //清空一下

				line.text="------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				
				line={};
				line.text="数量：4 ,金额：￥1220.00";
				line.center="left";
				line.font="bold";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="实收金额：￥1220.00";
				line.center="left";
				line.font="bold";
				line.bottom="2";
				data.push(line);
				
				line={};
				line.text="活动期间满500送100";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				line={};
				line.text="折让金额500";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				line={};
				line.text="折后金额2029";
				line.center="left";
				line.font="normal";
				line.bottom="3";
				data.push(line);
				
				line={};
				line.text="30天内可凭小票换开发票";
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				line={};
				line.text="活动商品，不退不换";
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);

				//加入条型码
				line={};
				line.barcode="2019563352660";
				line.type="CODE128";
				line.height="100";
				line.position="BELOW";
				line.width="2";
				line.center="center";
				line.bottom="2";
				data.push(line);
				
				
				//打印小票
				gp.Print({"printdata":data},result=>{
					_this.title=JSON.stringify(result);
					_this.$api.msg(result.msg)
				});
				
				
			},
			State(){
				//查询找印机状态
				const _this=this;
				gp.PrinterState(result=>{
					_this.title=JSON.stringify(result);
					_this.$api.msg(result.msg)	
					
				});
				
			},
			Dis()
			{
				//断开打印机
				gp.Disconnect(result=>{	
					_this.title=JSON.stringify(result);
					_this.$api.msg(result.msg)
				});
				
			}

		}
	}
</script>

<style>
	.content {
		margin: 10px;
		margin-top:30px;
	}
	button{ margin-bottom: 15px;}
</style>
