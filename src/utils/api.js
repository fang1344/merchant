import request from '@/src/utils/request'

/**
 * 微信登录
 */
export const authLoginByWeixin = (code, userInfo) => request('auth/loginByWeixin', {
	code: code,
	userInfo: userInfo
});
export const getPrepay = (params) => request('common/pay', params, 'get', 'lumen')

export const getActivityDetail = (params) => request('restaurant/storeGoodsActivity/detail', params, 'get', 'lumen')
/**
 * 获取优惠券列表
 */
export const getUserCouponList = (params) => request('user/coupon/list', params, 'get', 'lumen')

/**
 * 获取用户金额详细
 */
export const getUserMoneyDetail = (params) => request('user/moneyDetail', params, 'get', 'lumen')

/**
 * 获取用户金额使用记录
 */
export const getUserFundRecordList = (params) => request('user/fundRecord/list', params, 'get', 'lumen')

export const getUserCoinRecordList = (params) => request('user/coinRecord/list', params, 'get', 'lumen')

export const getUserCoinFixedRecordList = (params) => request('user/coinFixedRecord/list', params, 'get', 'lumen')

export const getUserStampRecordList = (params) => request('user/stampRecord/list',params, 'get', 'lumen')

/**
 * 获取红包列表
 */
export const getUserRedPatcketList = (params) => request('user/redPacket/list', params, 'get', 'lumen')

/**
 * 获取店铺列表
 */
export const getRestaurantStoreList = (params) => request('restaurant/store/list', params, "get", 'lumen')

/**
 * 获取店铺列表
 */
export const getBuyerOrderList = (params) => request('buyer/order/list', params, "get", 'lumen')

/**
 * 获取店铺列表
 */
export const getRestaurantStoreDetail = (params) => request('restaurant/store/detail', params, "get", 'lumen')

/**
 * 修改店铺信息
 */
export const updateRestaurantStoreData = (params) => request('restaurant/store/update', params, "post", 'lumen')

/**
 * 饭店提交订单
 */
export const submitOrder = (params) => request('restaurant/order/create', params, "post", "lumen")



export const buyerSubmitOrder = (params) => request('buyer/order/create', params, "post", "lumen")

/**
 * 小程序登录
 */
export const WechatMiniLogin = (params) => request('user/auth/WechatMiniLogin', params, 'post', 'lumen')
/**
 * 获取支付信息
 */
export const payPrepayIdFunc = (params) => request('common/pay', params, "get", "lumen")


/**
 * 获取用户默认地址
 */
export const getUserDefaultAddress = () => request('user/address/defaultAddress', {}, 'get', 'lumen')

/**
 * 申请店铺
 */
export const applyStore = (params) => request('restaurant/store/apply',params,'post','lumen')
/**
 * 获取shop页面商铺详情
 */
export const getStoreDetail = (shopid, return_goods) => request('buyer/store/detail', {
	'id': shopid,
	'return_goods': return_goods
}, 'get', 'lumen');

/**
 * 获取幸运大转盘内容
 */
export const getLuckyWheelList = (params) => request('buyer/luckyWheel/list', params, 'get', 'lumen');
/**
 * 获取饭店列表
 */
export const getRestaurantKind = () => request('restaurant/kind/list', {}, 'get', 'lumen');

export const getRestaurantCategoryList = (params) => request('restaurant/category/list', params, 'get', 'lumen');

export const saveRestaurantCategory = (params) => request('restaurant/category/save', params, 'post', 'lumen');

export const deleteRestaurantCategory = (params) => request('restaurant/category/delete', params, 'get', 'lumen')

export const getRestaurantCategoryDetail = (params) => request('restaurant/category/detail', params, 'get', 'lumen');

export const sortRestaurantCategory = (params) => request('restaurant/category/sort', params, 'post', 'lumen');

export const sortRestaurantGoods = (params) => request('restaurant/goods/sort', params, 'post', 'lumen');

export const saveRestaurantGoods = (params) => request('restaurant/goods/save', params, 'post', 'lumen');
export const updateRestaurantGoodsAttrs = (params)  => request('restaurant/goods/updateAttrs', params, 'post', 'lumen');

export const shelveRestaurantGoods = (params) => request('restaurant/goods/shelve', params, 'get', 'lumen');
export const deleteRestaurantGoods = (params) => request('restaurant/goods/delete', params, 'get', 'lumen');

export const systemGoodsImages = (params) => request('restaurant/images/list', params, 'get', 'lumen');

/**
 * 获取饭店订单列表
 */

export const getRestaurantOrderList = (params) => request('restaurant/order/list', params, 'get', 'lumen');


export const restaurantOrderPicking = (params) => request('restaurant/order/picking', params, 'get', 'lumen');

export const getRestaurantWallet = (params) => request('restaurant/store/wallet', params, 'get', 'lumen')

export const getRestaurantArrivalInfo = () => request('restaurant/arrival/info', {}, 'get', 'lumen')

export const getRestaurantOrderRemarkTag = () => request('restaurant/order/remarkTag', {}, 'get', 'lumen')

export const getSupplierCategoryAndGoods = () => request('zhongshang/getCategoryAndGoods', {}, 'get', 'php');

export const saveStoreMoneyOff = (params) =>request('store/moneyOff/save',params,'post','lumen')

export const storeMoneyOffList = (params) => request('store/moneyOff/list',params,'get','lumen')

export const getStoreCoupon = (params) => request('store/coupon',params,'get','lumen')

export const saveStoreCoupon = (params) => request('store/coupon/save',params,'post','lumen')

export const getRestaurantCooperationPattern = (params) => request('restaurant/cooperation/pattern', params, 'get', 'lumen');

export const saveStoreGoodsActivity = (params) => request('restaurant/storeGoodsActivity/save', params, 'post', 'lumen')

/**
 * 获取购物车
 */
export const getCartList = () => request('cart/index')

/**
 * 检查购物车
 */
export const cartChecked = (params) => request('cart/checked', params, "POST")

/**
 * 购物车更新
 */
export const cartUpdate = (params) => request('cart/update', params, "POST")

/**
 * 购物车删除
 */
export const cartDelete = (params) => request('cart/delete', params, "POST")

/**
 * 分类目录全部分类数据接口
 */
export const getCatalogList = () => request('catalog/index')

/**
 * 统计商品总数
 */
export const getGoodsCount = () => request('goods/count')

/**
 * 分类目录当前分类数据接口
 */
export const getCatalogCurrent = (params) => request('catalog/current', params)


/**
 * 获取主题列表
 */
export const getTopicList = (params) => {
	return request('buyer/topic/list', params, 'get', 'lumen')
}

/**
 * 获取主题详情
 */
export const getTopicDetail = (params) => {
	return request('buyer/topic/detail', params, 'get', 'lumen')
}

/**
 * 相关专题
 */
export const topicRelated = (params) => {
	return request('buyer/topic/related', params, 'get', 'lumen')
}

/**
 * 专题评价列表
 */
export const getTopicCommentList = (params) => {
	return request('buyer/topic/comment/list', params, 'get', 'lumen')
}

/**
 * 收藏列表
 */
export const getCollectList = (params) => request('collect/list', params,  'get', 'lumen')

/**
 *  添加或取消收藏
 */
export const collectAddOrDelete = (params) => request('buyer/collectGoods/addOrDelete1', params, 'get', 'lumen')

/**
 * 获取品牌列表
 */
export const getBrandList = (params) => request('buyer/brand/list', params, 'get', 'lumen')

/**
 * 获取品牌详情
 */
export const getBrandDetail = (params) => request('buyer/brand/detail', params, 'get', 'lumen')

/**
 * 获取品牌详情
 */
export const getSelfBrandDetail = (params) => request('restaurant/brand/detail', params, 'get', 'lumen')

/**
 * 保存品牌信息
 */
export const saveBrand = (params) => request('restaurant/brand/save',params,'post','lumen')

/**
 * 保存店铺购买产品订单
 */
export const saveStoreProductOrder = (params) => request('restaurant/storeProductOrder/save',params,'post','lumen')

export const storeCooperationSave = (params) => request('restaurant/cooperation/save',params,'post','lumen')

export const getStoreProduct = (params) => request('restaurant/store/product',params,'get','lumen')
/**
 * 获取商品列表
 */
export const getGoodsList = (params) => request('buyer/goods/list', params, 'get', 'lumen')

/**
 * 获取可预订商品列表
 */
export const getReservationData = (params) => request('buyer/goods/reservation', params, 'get', 'lumen');
/**
 * 获取分类
 */
export const getGoodsCategory = (params) => request('goods/category', params)

/**
 * 购物车商品总数
 */
export const getCartGoodsCount = () => request('cart/goodscount')

/**
 * 商品详情
 */
export const getGoodsDetail = (params) => request('buyer/goods/detail', params, 'get', 'lumen')
/**
 * 商品详情
 */
export const getRestaurantGoodsDetail = (params) => request('restaurant/goods/detail', params, 'get', 'lumen')




/**
 * 商品详情页的关联商品（大家都在看）
 */
export const getGoodsRelated = (params) => request('goods/related', params)

/**
 * 获取首页初始化数据
 */
export const getIndexData = () => request('index/index')

export const getHomeData = (params) => request('buyer/home/index', params, 'get', 'lumen')

/**
 * 获取城市列表集合
 *
 * @returns {Promise<*>}
 */
export const cityList = () => request('/v1/city/index', {});

/**
 * 获取一个学校的寝室
 * @param school_id
 * @returns {Promise<*>}
 */
export const dormitoryList = (school_id) => request('/v1/city/bedRoom', {
	school_id: school_id
})

/**
 * 更新收货地址
 * @param bedroom_id
 * @returns {Promise<*>}
 */
export const receiveUpdate = (bedroom_id) => request('v1/user/receiveUpdate', {
	bedroom_id: bedroom_id
})

/**
 * 获取城市下的学校
 * @param cityid
 * @returns {Promise<*>}
 */
export const citySchoolGroupByArea = (cityid) => request('/v1/city/schoolGroupByArea', {
	city_id: cityid
});

/**
 *  获取首页默认地址
 * @returns {Promise<*>}
 */
export const cityGuess = () => request('/city/list', {
	type: 'location'
});


/**
 * 获取首页热门城市
 */

export const hotcity = () => request('/v1/cities', {
	type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => request('/v1/cities', {
	type: 'group'
});


/**
 * 获取当前所在城市
 */

export const currentcity = number => request('/v1/cities/' + number);


/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => request('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});


/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => request('/v2/pois/' + geohash);


/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => request('/v2/index_entry', {
	geohash,
	group_type: '1',
	'flags[]': 'F'
});


/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => request('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});


/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => request('/shopping/v2/restaurant/category', {
	latitude,
	longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => request('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => request('/shopping/v1/restaurants/activity_attributes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid) => request('/v1/buyers/store/info', {
	'store_id': shopid
});

/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => request('/v1/buyers/goods/alllists', {
	'store_id': restaurant_id
});


/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => request('/v1/buyers/storeRatings/index', {
	'store_id': shopid,
	has_content: true,
	offset,
	limit: 10,
	tag_name
});


/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => request('/v1/buyers/storeRatings/score', {
	'store_id': shopid
});


/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => request('/v1/buyers/storeRatings/tags', {
	'store_id': shopid
});


/**
 * 获取短信验证码
 */

export const mobileCode = phone => request('/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => request('/v1/common/captchas?' + Date.parse(new Date()), {}, 'POST');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => request('/v1/users/exists', {
	[type]: checkNumber,
	type
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => request('/v1/mobile/verify_code/send', {
	action: "send",
	captcha_code,
	[type]: sendData,
	type: "sms",
	way: type,
	password,
}, 'POST');


/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopid) => request('/v1/buyers/cart/checkout2', {
	come_from: "web",
	geohash,
	entities,
	restaurant_id: shopid,
}, 'POST');


/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => request('/v1/buyers/cart/remarks', {
	sig
});


/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => request('/v1/carts/' + id + '/addresses', {
	sig
});

/**
 * 获取服务中心信息
 */

export const getService = () => request('/v3/profile/explain');


/**
 *兑换会员卡
 */

export const vipCart = (id, number, password) => request('/member/v1/users/' + id + '/delivery_card/physical_card/bind', {
	number,
	password
}, 'POST')


/**
 * 获取红包
 */

export const getHongbaoNum = id => request('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');


/**
 * 获取过期红包
 */


export const getExpired = id => request('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');


/**
 * 兑换红包
 */

export const exChangeHongbao = (id, exchange_code, captcha_code) => request('/v1/users/' + id + '/hongbao/exchange', {
	exchange_code,
	captcha_code,
}, 'POST');


/**
 * 获取用户信息
 */

export const getUserInfo = () => request('user/getUserInfo', {}, 'get', 'lumen');

/**
 * 修改用户信息
 */
export const updateUserInfo = (params) => request('user/update',params,'post','lumen')

/**
 * 获取用户银行卡
 */
export const getUserBankcard = () => request('user/bankcard', {}, 'get', 'lumen');

export const getWithdrawInfo = () => request('common/withdraw', {}, 'get', 'lumen');

export const saveUserWithdraw = (params) => request('user/withdraw/save', params, 'post', 'lumen')

export const saveUserBankcard = (params) => request('user/bankcard/save', params, 'post', 'lumen');
/**
 * 获取银行列表
 */
export const getBankList = () => request('common/bank/list', {}, 'get', 'lumen')



/**
 * 获取订单列表
 */

export const getOrderList = (offset) => request('order/list', {
	limit: 10,
	offset,
});


/**
 * 获取订单详情
 */

export const getUserOrderDetail = (params) => request('buyer/order/detail', params, 'get', 'lumen');

/**
 * 足迹列表
 */
export const getFootprintList = () => request('footprint/list')

/**
 * 删除足迹
 */
export const FootprintDelete = () => request('footprint/delete', params, "POST")

/**
 *个人中心里编辑地址
 */

export const getAddressList = () => request('user/address/list', {}, 'get', 'lumen')

/**
 *个人中心里编辑地址
 */
export const getAddressDetail = (params) => request('user/address/detail', params, 'get', 'lumen')

/**
 * 保存收货地址
 */
export const saveAddress = (params) => request('user/address/save', params, 'POST', 'lumen')

/**
 * 获取区域列表
 */
export const getRegionList = (params) => request('region/all', params, 'get', 'lumen')

/**
 * 获取学校区域列表
 */
export const getSchoolRegionList = (params) => request('city/getRegionList', params, 'get', 'php')

/**
 *个人中心里搜索地址
 */

export const getSearchAddress = (keyword) => request('v1/pois', {
	keyword: keyword,
	type: 'nearby'
})

/**
 * 删除地址
 */

export const deleteAddress = (userid, addressid) => request('/v1/users/' + userid + '/addresses/' + addressid, {},
	'DELETE')


/**
 * 账号密码登录
 */
export const accountLogin = (params) => {
	return request('user/accountlogin', params, 'POST', 'php');
}


/**
 * 退出登录
 */
export const signout = () => request('/v1/user/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => request(
	'/v1/user/changepassword', {
		username,
		oldpassWord,
		newpassword,
		confirmpassword,
		captcha_code
	}, 'POST');

/**
 *获取验证码
 */
export const getVerifyCode =(params)=> request('user/auth/getVerifyCode', params, 'get','lumen') 

 
/**
 *登陆
 */

export const userLogin =(params)=> request('user/login',params, 'POST','lumen') 

 
/**
 *注册
 */

export const userRegister =(params)=> request('user/register',params, 'POST') 

/**
 *忘记密码
 */

export const forgetPassword =(params)=> request('user/verifyPhoneAuthCode',params, 'POST') 

/**
 *重置密码
 */

export const resetPassword =(params)=> request('user/resetPassword',params, 'POST') 



// 评价
export const getRatingDetail =(params)=> request('restaurant/orderComment/list',params, 'get')
