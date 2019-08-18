<template>
	   <div id="container">
        <div id="mapArea">

        </div>
        <div class="operation">
            <button class="el-button--primary submit" @click="submit">确认</button>
        </div>
    </div>
</template>

<script>
import {TMap} from '@/static/js/TMap.js';
import {getRestaurantStoreDetail,updateRestaurantStoreData} from '@/src/utils/api.js'

export default {
        data() {
            return {
				from:0,
                store_id:'',
                overlaysArray: [], //覆盖物容器,用于清除覆盖物
                coverAreaArray:[], //显示已有的区域
                radius: 1000,
                points: "",
                map: '',
                qq: '',
				path: [],
				polygon: '',
            }
        },
		onLoad(e){
			if(e.token){
				uni.setStorageSync('token',e.token);
				this.from=1;
			}
		},
        mounted() {
                 this.getData();
        },
        methods: {
            async getData(){
                let res = await getRestaurantStoreDetail();
				if (res.data.cover_area_arr.length > 0) {
					// console.log(res.data.cover_area_arr);
					this.coverAreaArray = res.data.cover_area_arr
				}else{
					this.coverAreaArray = [
						[
							(parseFloat(res.data.latitude)-0.01).toFixed(5),
							(parseFloat(res.data.longitude)+0.01).toFixed(5)
						],
						[
							(parseFloat(res.data.latitude)+0.01).toFixed(5),
							(parseFloat(res.data.longitude)+0.01).toFixed(5)
						],
						[
							(parseFloat(res.data.latitude)+0.01).toFixed(5),
							(parseFloat(res.data.longitude)-0.01).toFixed(5)
						],
						[
							(parseFloat(res.data.latitude)-0.01).toFixed(5),
							(parseFloat(res.data.longitude)-0.01).toFixed(5)
						],
						
						
					]
				}
				this.mapInit(res.data.latitude,res.data.longitude);
            },
            mapInit(latitude,longitude) {
               let that = this;
		       TMap('RXKBZ-37F6Q-LVD5P-G5IHP-YNV4J-UUB7R').then(qq => {
                   that.map = new qq.maps.Map(document.getElementById("mapArea"), {
                        // 地图的中心地理坐标。
                       //39.916527,116.397128
					   
                        center: new qq.maps.LatLng(latitude, longitude),
                        zoom: 13
                    });
					this.coverAreaArray.map(res=>{
						that.path.push(new qq.maps.LatLng(res[0], res[1]))
					})
					that.polygon = new qq.maps.Polygon({
				 
						//多边形是否可点击。
						clickable: true,
				 
						//鼠标在多边形内的光标样式。
						cursor: 'crosshair',
				 
						//多边形是否可编辑。
						editable: true,
				 
						//多边形的填充色，可通过Color对象的alpha属性设置透明度。
						fillColor: new qq.maps.Color(0, 0, 0, 0.3),
						//fillColor: new qq.maps.Color(0, 0, 0, 0.5),
				 
						//要显示多边形的地图。
						map: that.map,
				 
						//多边形的路径，以经纬度坐标数组构成。
						path: that.path,
				 
						//多边形的线条颜色，可通过Color对象的alpha属性设置透明度。
						strokeColor: '#000000',
				 
						//多边形的边框样式。实线是solid，虚线是dash。
						strokeDashStyle: 'dash',
				 
						//多边形的边框线宽。
						strokeWeight: 2,
				 
						//多边形是否可见。
						visible: true,
				 
						//多边形的zIndex值。
						zIndex: 1000
					});

                });
            },
            clearOverlays(overlaysArray) {
                if (overlaysArray) {
                    console.log(overlaysArray);
                    var i;
                    for (i in overlaysArray) {
                        overlaysArray[i].setMap(null);
                    }
                }
            },

//画圆中心点
            doMarker(center, title) {
//创建一个Marker
                var marker = new qq.maps.Marker({
//设置Marker的位置坐标
                    position: center,
//设置显示Marker的地图
                    map: this.map,
                    title: title
                });


//设置Marker的可见性，为true时可见,false时不可见，默认属性为true
                marker.setVisible(true);
//设置Marker的动画属性为从落下
                marker.setAnimation(qq.maps.MarkerAnimation.DOWN);
                this.overlaysArray.push(marker);
                marker.setMap(this.map);


            },


            //画圆
            doCircle(center) {
                var circle = new qq.maps.Circle({
                    map: this.map,
                    center: center,
                    radius: this.radius,
                    strokeWeight: 5
                });
                this.overlaysArray.push(circle);
                circle.setMap(this.map);
            },


            //查询圆数据
            getPeopleDataByCircle(radius, center) {
                //var circlePath="<%=basePath%>searchProjectInfo?op=circle&raidus="
                //+ radius + "&point=" + center;
                //jQuery.getJSON(circlePath, function(data) {
                //showPeopleData(data);
                //});
                alert("圆形中心为:" + center + "半径为:" + radius);
            },


            //查询多边形数据
            getPeopleDataByPolygon(points) {
                //var polygonPath="<%=basePath%>searchProjectInfo?op=polygon&points="
                //+ points;
                //jQuery.getJSON(polygonPath, function(data) {
                //showPeopleData(data);
                //});

                alert("多边形路径为:" + points);
            },
            submit(){
                let path = this.polygon.getPath();
                // console.log(path.elems);
				let points = '';
				path.elems.map(res=>{
					points += res.lat + "," + res.lng + ";";
				})
                updateRestaurantStoreData({cover_area:points.substring(0, points.length - 1)}).then(res=>{
					if(res.errno==0){
						this.$api.msg('保存成功');
						if(this.from==0){
							uni.navigateBack()
						}
					}else{
						this.$api.msg(res.message);
					}
				})
            }
        },
        created: function () {

        }
    }
</script>

<style lang="scss" scoped>
page {
	background: $page-color-base;
}
 #container {
	#mapArea{
		min-width: 600px;
		min-height: 767px;
	}
	.operation{
		width: 200px;
		height: 100px;
		position: absolute;
		bottom: 0px;
		right: 0px;
	}
	.submit{
		width: 120upx;
		height: 60upx;
		font-size: 28upx;
		line-height: 60upx;
		background-color: $theme-color;
		color: white;
	}
}

</style>
