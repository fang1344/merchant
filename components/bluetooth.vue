<template>

  <div class="bluetooth-pop ui-pop-layout" :data-show="bluetoothPop">
       <div class="ui-pop-center">
           <div class="ui-pop-content">
                <x-button mini @click.native="turnOnBluetooth">打开蓝牙</x-button>
                <x-button mini type="primary" @click.native="getPairedDevices">已配对的设备</x-button>
                
                <div class="mt-20">
                  蓝牙打印机状态：
                  <pre>{{bluetoothState.readThreadState ? "已连接": "未连接"}}</pre>
                </div>

                <div class="mt-20">
                  已配对的设备：
                  <br>
                  <ul>
                    <li :key="index" v-for="(device,index) in pairedDevices">
                      名称：{{device.name}}<br> 地址：{{device.address}}
                      <br>
                      <x-button mini type="primary" @click.native="connDevice(device.address)">连接蓝牙</x-button>
                    </li>
                  </ul>
                </div>

           </div>
       </div>
       <div class="ui-pop-mask" @click="bluetoothPop=false"></div>
   </div>


      
      <!--
      <div>
        消息：{{msg}}
      </div>
      
      <div>
        <input type="button" value="断开连接" @click="disConnDevice" />
      </div>
      -->
      <!--
      <div class="mt-20">
        发现的设备：<br>
        <ul>
          <li v-for="device in newDevices">
            名称：{{device.name}}<br> 地址：{{device.address}}<br>
            <x-button mini type="primary" @click.native="connDevice(device.address)">连接蓝牙</x-button>
          </li>
        </ul>
      </div>
      -->
      <!--
      <div>
        发送数据：
        <input type="button" value="发送" @click="onSendData('测试的文本')" />
      </div>
      -->

</template>


<script>


import BTool from '@/static/js/BluetoothTool.js'

export default {
  
  name:"bluetooth", 

  components: {

  },

  data () {
    return {
      bluetoothState: {},
      pairedDevices: [],
      newDevices: [],
      receiveDataArr: [],
      sendData: "",
      msg: "",
      bluetoothPop:true

    }
  },

  created () {
      
      var that = this;
      var onPlusReady=function(){
          that.bluetoothTool = BTool.BluetoothTool();
          that.bluetoothState = that.bluetoothTool.state;
          that.bluetoothTool.init({
            listenBTStatusCallback: function(state) {
              that.msg = "蓝牙状态: " + state;
            },
            discoveryDeviceCallback: function(newDevice) {
              that.newDevices.push(newDevice);
            },
            discoveryFinishedCallback: function() {
              that.msg = "搜索完成";
            },
            readDataCallback: function(dataByteArr) {
              if(that.receiveDataArr.length >= 200) {
                that.receiveDataArr = [];
              }
              that.receiveDataArr.push.apply(that.receiveDataArr, dataByteArr);
            },
            connExceptionCallback: function(e) {
              console.log(e);
              that.msg = "设备连接失败";
            }
          });
      }
      document.addEventListener("plusready", onPlusReady, false);
      if(typeof plus!="undefined") onPlusReady();

  },

  computed: {
    receiveDataStr: function() {
      //console.log(this.receiveDataArr);
      return String.fromCharCode.apply(String, this.receiveDataArr);
    },
    bluetoothStatusDesc: function() {
      return this.bluetoothStatus ? "已开启" : "已关闭";
    }
  },

  methods: {

     turnOnBluetooth: function() {
        this.bluetoothTool.turnOnBluetooth();
      },
      turnOffBluetooth: function() {
        this.bluetoothTool.turnOffBluetooth();
      },
      getPairedDevices: function() {
        this.pairedDevices = this.bluetoothTool.getPairedDevices();
      },
      discoveryNewDevice: function() {
        this.newDevices = [];
        this.bluetoothTool.discoveryNewDevice();
      },
      cancelDiscovery: function() {
        this.bluetoothTool.cancelDiscovery();
      },
      connDevice: function(address) {
        this.bluetoothTool.connDevice(address);
      },
      disConnDevice: function() {
        this.bluetoothTool.disConnDevice();
      },
      onSendData: function(str) {
        BTool.BluetoothTool().sendData(str);
      }
  }
}
</script>

<style>

</style>
