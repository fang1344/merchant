/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

// let baseUrl = 'http://47.104.130.229:8360/';
let appName = 'jxy';
let supplierId = 103;
let debug = 1;
let baseUrl = 'http://serv.moyaomiao.cn/';
let baseUrl2 = 'https://serv.moyaomiao.cn/';
let baseUrl3 = 'https://serv.moyaomiao.cn/';
// let uploadUrl = 'http://serv.test/upload';
let uploadUrl = 'http://serv.moyaomiao.cn/common/upload';
let routerMode = 'hash';
let imgBaseUrl = '';

// 
// if (process.env.NODE_ENV == 'development') {
//     imgBaseUrl = '/img/';
// 
// }else if(process.env.NODE_ENV == 'production'){
// 	baseUrl = '//api.moyaomiao.cn';
//     imgBaseUrl = '//api.moyaomiao.cn/img/';
// }

export {
	appName,
	supplierId,
	debug,
	baseUrl,
	baseUrl2,
	baseUrl3,
	uploadUrl,
	routerMode,
	imgBaseUrl,
}
