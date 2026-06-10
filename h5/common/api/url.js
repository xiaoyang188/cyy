import {
  API_VERSION,
  PAAS_URL
} from '@/common/config.js';
const publicApi = {
  postRecommentGoods: `/${API_VERSION}/5fd9a32379116`, //智能推荐
  numberOfShoppingCart: `/${API_VERSION}/62c6909e6ce4f`, //获取购物车数量
  publicUpdateAPP: `/${API_VERSION}/6423fb49bc82c`, // 静默更新
  queryAutograph: `/v1/6454d9663e508`, // 获取oss配置接口
  getAreaData: `/v1/6789c02f24420`, // 获取地址信息列表
  UPLOAD_IMAGE_URL: `/${API_VERSION}/5d5fa8984f0c2`, // 本地图片上传接口
  // UPLOAD_FILE_URL: `/${API_VERSION}/5d5fa8984f0c2`, // 文件上传接口
  GetVerifyCode: `/${API_VERSION}/5b5bdc44796e8`, // 发送验证码
  getVerifyCodeNew: `/${API_VERSION}/666a45d4d6bb4`, //新版验证码
  beforeGetVerifyCodeNew: `/${API_VERSION}/6668f5d1d434e`, // 新版验证码前置接口
  post641590baa0d47: `/${API_VERSION}/641590baa0d47`, //商品管理-获取一级商品分类
  post641e5f0526964: `/${API_VERSION}/641e5f0526964`, //运营管理-获取首页金刚区列表
  post64184ac1cafc3: `/${API_VERSION}/64184ac1cafc3`, //商品管理-商品列表
  post641e624160dd0: `/${API_VERSION}/641e624160dd0`, //运营管理-获取轮播图
  post641aecd93aa49: `/${API_VERSION}/641aecd93aa49`, //营销活动-秒杀商品列表(2023-0322)
  post641eb8b1ee7fe: `/${API_VERSION}/641eb8b1ee7fe`, //营销活动-拼团商品列表(2023-0325)
  post641591a873763: `/${API_VERSION}/641591a873763`, //商品管理-获取二级分类和广告
  post641960f31d0f4: `/${API_VERSION}/641960f31d0f4`, //优惠券-领券列表(2023-0321)
  post64196d6a86d0d: `/${API_VERSION}/64196d6a86d0d`, //优惠券-用户领券(2023-0321)
  post64241ca6cf066: `/${API_VERSION}/64241ca6cf066`, //系统消息-获取未读消息角标
  post64219a95b6200: `/${API_VERSION}/64219a95b6200`, //文章列表-获取帮助中心列表
  post641e88b843d57: `/${API_VERSION}/641e88b843d57`, //商品搜索-获取店铺列表
  post641af9cb8b32f: `/${API_VERSION}/641af9cb8b32f`, //商品搜索-搜索发现
  post6758eb9165329: `/${API_VERSION}/6758eb9165329`, //商城模式--获取指定页面的配置情况
  post6881861da4834: `/${API_VERSION}/6881861da4834`, //商城配置-获取商城模块配置
  post62bebd70c4bad: `/${API_VERSION}/62bebd70c4bad`, //购物车-购物车列表
  post62c0087912574: `/${API_VERSION}/62c0087912574`, //购物车-移入收藏夹
  post62beb3fca0209: `/${API_VERSION}/62beb3fca0209`, //购物车-删除购物车商品
  post64144ab8dc6c6: `/${API_VERSION}/64144ab8dc6c6`, //购物车-修改商品数量
  post641312cc712d2: `/${API_VERSION}/641312cc712d2`, //购物车-修改规格
  post641987361d887: `/${API_VERSION}/641987361d887`, //商品管理-获取商品详情
  post62c6909e6ce4f: `/${API_VERSION}/62c6909e6ce4f`, //购物车-获取购物车商品数量
  post63e369d925758: `/${API_VERSION}/63e369d925758`, //商品管理-商品分类
  post5c78c4772da97: `/${API_VERSION}/5c78c4772da97`, //个人中心-获取会员详细信息
  post636de668c7eb0: `/${API_VERSION}/636de668c7eb0`, //用户管理-会员当前等级详情
  post64254d2ad5999: `/${API_VERSION}/64254d2ad5999`, //钱包-获取分享赚/自购返累计金额（我的）
  post644ceb577e29e: `/${API_VERSION}/644ceb577e29e`, //订单-获取订单角标
  post64897f6fd5486: `/${API_VERSION}/64897f6fd5486`, //客服-获取聊天连接
  post63732dbecbc14: `/${API_VERSION}/63732dbecbc14`, //商家入驻-查看入驻状态(2023-0316)
  post657c0f93428d9: `/${API_VERSION}/657c0f93428d9`, //用户管理-获取收藏，足迹，关注数据
  post64cdb895b79ba: `/${API_VERSION}/64cdb895b79ba`, //系统配置-联系我们
  post5d7660a421e69: `/${API_VERSION}/5d7660a421e69`, //登录注册-第三方授权
  post5c78dbfd977cf: `/${API_VERSION}/5c78dbfd977cf`, //登录注册-账号密码登录
  post6683a8da8334d: `/${API_VERSION}/6683a8da8334d`, //系统配置-是否上架
  post661a5adf8203b: `/${API_VERSION}/661a5adf8203b`, //注销账号-取消用户注销
  post5d7757d28d076: `/${API_VERSION}/5d7757d28d076`, //登录注册-三方授权绑定手机号
  post5caeeba9866aa: `/${API_VERSION}/5caeeba9866aa`, //登录注册-重置密码（忘记密码）
  post5cad9f63e4f94: `/${API_VERSION}/5cad9f63e4f94`, //登录注册-会员注册
  post661a5adf8203b: `/${API_VERSION}/661a5adf8203b`, //取消用户注销
  post5c78dca45ebc1: `/${API_VERSION}/5c78dca45ebc1`, //登录注册-验证码登录
  post641568f1b6f87: `/${API_VERSION}/641568f1b6f87`, //系统文章--获取系统单页内容
  post63e36c4963fb8: `/${API_VERSION}/63e36c4963fb8`, //商品管理-获取品牌列表
  post6412f82acb5ba: `/${API_VERSION}/6412f82acb5ba`, //购物车-添加至购物车（2023-0316）
  post62c6a51abaf56: `/${API_VERSION}/62c6a51abaf56`, //预下单-直接购买确认订单信息
  post636caf10164ce: `/${API_VERSION}/636caf10164ce`, //用户管理-收藏取消收藏
  post636f7683cf195: `/${API_VERSION}/636f7683cf195`, //地址管理-地址列表
  post642402f366fd4: `/${API_VERSION}/642402f366fd4`, //商品管理-APP商品分享链接
  post655c8794204e2: `/${API_VERSION}/655c8794204e2`, //预下单-套餐商品确认订单信息
  post670ccec3bbc6a: `/${API_VERSION}/670ccec3bbc6a`, //商品管理-商品详情看了又看
  post6462057de42ce: `/${API_VERSION}/6462057de42ce`, //分享二维码-获取分享二维码微信小程序
  post641ad7c486389: `/${API_VERSION}/641ad7c486389`, //商品评论-获取商品评论列表
  post641ae5b3d5bba: `/${API_VERSION}/641ae5b3d5bba`, //商品评论-获取评论列表头部tab
  post641ae9cf8abed: `/${API_VERSION}/641ae9cf8abed`, //商品评论-点赞评论
  post641ae646bde4a: `/${API_VERSION}/641ae646bde4a`, //商品评论-获取单条评论详情
  post641ae6a3510c7: `/${API_VERSION}/641ae6a3510c7`, //商品评论-回复评论
  post663ede1389efe: `/${API_VERSION}/663ede1389efe`, //营销活动-获取套餐列表
  post667faa8bae7a0: `/${API_VERSION}/667faa8bae7a0`, //营销活动-根据套餐ID获取套餐详情
  post667fa6f5bf519: `/${API_VERSION}/667fa6f5bf519`, //营销活动-前端获取套餐列表
  post62c8f31da5eaa: `/${API_VERSION}/62c8f31da5eaa`, //订单-订单列表
  post62cb8b8438141: `/${API_VERSION}/62cb8b8438141`, //订单-取消订单
  post641ae6544d2d5: `/${API_VERSION}/641ae6544d2d5`, //订单-查询取消原因
  post62bec4f86725d: `/${API_VERSION}/62bec4f86725d`, //订单-发货提醒
  post64218bff49e61: `/${API_VERSION}/64218bff49e61`, //订单-确认收货
  post6427d125edfc5: `/${API_VERSION}/6427d125edfc5`, //售后-获取售后列表
  post6427dbbacba58: `/${API_VERSION}/6427dbbacba58`, //售后-售后删除
  post6447c3b69f234: `/${API_VERSION}/6447c3b69f234`, //订单-删除订单
  post641848d371e2f: `/${API_VERSION}/641848d371e2f`, //预下单-发票抬头列表
  post641ebe3244065: `/${API_VERSION}/641ebe3244065`, //订单-申请开票
  post6459ee56c1d84: `/${API_VERSION}/6459ee56c1d84`, //商家端-获取快递公司列表(2023-0509)
  post643132c735500: `/${API_VERSION}/643132c735500`, //商家端-订单发货(2023-0408)
  post642fb0d327172: `/${API_VERSION}/642fb0d327172`, //商家端-获取订单详情(2023-0407)
  post62c92b9d5ada3: `/${API_VERSION}/62c92b9d5ada3`, //订单-订单详情
  post6421827328ff0: `/${API_VERSION}/6421827328ff0`, //订单-查看包裹详情
  post6427dab6182fa: `/${API_VERSION}/6427dab6182fa`, //售后-寄回商品
  post6427e3a822643: `/${API_VERSION}/6427e3a822643`, //售后-获取物流公司列表
  post64218d79d9401: `/${API_VERSION}/64218d79d9401`, //订单-订单评价
  post64258181598c7: `/${API_VERSION}/64258181598c7`, //售后-获取可售后的数量
  post64257c480b1a1: `/${API_VERSION}/64257c480b1a1`, //售后-获取可售后的金额
  post64219b8235a5e: `/${API_VERSION}/64219b8235a5e`, //售后-提交售后申请
  post6427d6b5d3599: `/${API_VERSION}/6427d6b5d3599`, //售后-售后详情
  post6427d9581deed: `/${API_VERSION}/6427d9581deed`, //售后-取消申请
  post64534cbb2c352: `/${API_VERSION}/64534cbb2c352`, //系统配置-获取系统配置参数
  post6418475995586: `/${API_VERSION}/6418475995586`, //预下单-查询发票抬头
  post5d916c0c775ff: `/${API_VERSION}/5d916c0c775ff`, //预下单-获取可用优惠券
  post62c7980999c75: `/${API_VERSION}/62c7980999c75`, //预下单-购物车结算订单信息
  post62c8038d96dab: `/${API_VERSION}/62c8038d96dab`, //预下单-提交订单
  post642181a3e9b7b: `/${API_VERSION}/642181a3e9b7b`, //订单-查看包裹列表
  post6447c1b701129: `/${API_VERSION}/6447c1b701129`, //售后-查看物流
  post641ed3dd595d0: `/${API_VERSION}/641ed3dd595d0`, //订单-发票详情
  post6442399c6fca9: `/${API_VERSION}/6442399c6fca9`, //发票抬头-查询发票抬头详情
  post641ec9d300c00: `/${API_VERSION}/641ec9d300c00`, //发票抬头-删除发票抬头
  post641ec735afc0f: `/${API_VERSION}/641ec735afc0f`, //发票抬头-添加发票抬头
  post641ec88074922: `/${API_VERSION}/641ec88074922`, //发票抬头-编辑发票抬头
  post647efc94037dd: `/${API_VERSION}/647efc94037dd`, //发票抬头-设置默认发票
  post66f22e1c95f85: `/${API_VERSION}/66f22e1c95f85`, //发票抬头-获取开票记录
  post5cb54af125f1c: `/${API_VERSION}/5cb54af125f1c`, //设置中心-修改用户资料
  post64ae7ad16af9d: `/${API_VERSION}/64ae7ad16af9d`, //会员排行榜
  post636cabd662b22: `/${API_VERSION}/636cabd662b22`, //用户管理-收藏列表
  post64145c1253b3e: `/${API_VERSION}/64145c1253b3e`, //用户管理-足迹列表
  post64145e74b3a92: `/${API_VERSION}/64145e74b3a92`, //用户管理-删除足迹
  post641ee42b715ef: `/${API_VERSION}/641ee42b715ef`, //分销中心-邀请好友推广海报
  post62fb638cdfb64: `/${API_VERSION}/62fb638cdfb64`, //分销中心-获取数据统计
  post62fb72471a2e8: `/${API_VERSION}/62fb72471a2e8`, //分销中心-获取下级列表
  post62fb89d7689da: `/${API_VERSION}/62fb89d7689da`, //分销中心-返利列表
  post62fb8d520a146: `/${API_VERSION}/62fb8d520a146`, //分销中心-获取推广订单
  post64198610a95ca: `/${API_VERSION}/64198610a95ca`, //优惠券-我的优惠券列表(2023-0321)
  post64192099543cf: `/${API_VERSION}/64192099543cf`, //签到-获取签到汇总信息(2023-0321)
  post6419244390830: `/${API_VERSION}/6419244390830`, //签到-会员签到(2023-0321)
  post62fc574bc7074: `/${API_VERSION}/62fc574bc7074`, //分销中心-获取可提现积分
  post62fc862c84c64: `/${API_VERSION}/62fc862c84c64`, //分销中心-佣金申请提现
  post62fc4f70a9d44: `/${API_VERSION}/62fc4f70a9d44`, //提现管理-查询提现方式管理
  post5f64a4d364b44: `/${API_VERSION}/5f64a4d364b44`, //订单支付-检测支付密码
  post6424280846288: `/${API_VERSION}/6424280846288`, //系统消息-获取指定类型的消息列表
  post6415752f56d0f: `/${API_VERSION}/6415752f56d0f`, //系统文章-获取平台公告列表
  post649a96d7625ae: `/${API_VERSION}/649a96d7625ae`, //系统消息-DIY获取最新消息
  post649aa4a3eba00: `/${API_VERSION}/649aa4a3eba00`, //系统消息-DIY获取聊天记录
  post636fd7826b3ee: `/${API_VERSION}/636fd7826b3ee`, //地址管理-获取地址信息
  post637defdbd53ef: `/${API_VERSION}/637defdbd53ef`, //地址管理-添加地址
  post637df1ea39d16: `/${API_VERSION}/637df1ea39d16`, //地址管理-编辑地址
  post636f773e8d763: `/${API_VERSION}/636f773e8d763`, //地址管理-删除地址
  post649e954010762: `/${API_VERSION}/649e954010762`, //地址管理-DIY逆地理编码
  post67a1b2c3d4e5f: `/${API_VERSION}/67a1b2c3d4e5f`, //地址管理-智能识别地址(待后端提供)
  post5ff6859e3c4fd: `/${API_VERSION}/5ff6859e3c4fd`, //地址管理-获取地址标签
  post6389ad65f28d9: `/${API_VERSION}/6389ad65f28d9`, //地址管理-设置默认地址
  post636cbb376d5d8: `/${API_VERSION}/636cbb376d5d8`, //钱包-查询提现账户
  post636cc0cc8d6cc: `/${API_VERSION}/636cc0cc8d6cc`, //钱包-设置提现账户
  post5f6db4db8abcf: `/${API_VERSION}/5f6db4db8abcf`, //基础功能-校验验证码
  post636e3e94b5605: `/${API_VERSION}/636e3e94b5605`, //钱包-冻结金额
  post636f481b67084: `/${API_VERSION}/636f481b67084`, //钱包-提现明细
  post641457e74fa3e: `/${API_VERSION}/641457e74fa3e`, //积分商城-积分商品列表
  post64156140edd5a: `/${API_VERSION}/64156140edd5a`, //积分商城-滚动兑换人员信息
  post64156a0fd7451: `/${API_VERSION}/64156a0fd7451`, //积分商城-兑换规则
  post6414631bc7cdf: `/${API_VERSION}/6414631bc7cdf`, //积分商城-确认订单
  post641465fa0b5df: `/${API_VERSION}/641465fa0b5df`, //积分商城-下单
  post6414599749e7f: `/${API_VERSION}/6414599749e7f`, //积分商城-积分商品详情
  post64145f67a43bf: `/${API_VERSION}/64145f67a43bf`, //积分商城-查询积分明细
  post6415318b455ed: `/${API_VERSION}/6415318b455ed`, //积分商城-兑换记录
  post64155c02284ef: `/${API_VERSION}/64155c02284ef`, //积分商城-取消订单
  post64155d9464c1d: `/${API_VERSION}/64155d9464c1d`, //积分商城-提醒发货
  post64156687686b5: `/${API_VERSION}/64156687686b5`, //积分商城-确认收货
  post641568f194350: `/${API_VERSION}/641568f194350`, //积分商城-删除订单
  post6415509c196eb: `/${API_VERSION}/6415509c196eb`, //积分商城-积分订单详情
  post641afd26102ab: `/${API_VERSION}/641afd26102ab`, //商品搜索-全网热搜榜
  post670508eef0d78: `/${API_VERSION}/670508eef0d78`, //商品管理-获取商品推荐关键词
  post641ea9f00a6ae: `/${API_VERSION}/641ea9f00a6ae`, //订单-余额支付
  post64424fe115688: `/${API_VERSION}/64424fe115688`, //查询支付方式
  post645cc07566415: `/${API_VERSION}/645cc07566415`, //订单-获取微信支付参数
  post645cc048d1f34: `/${API_VERSION}/645cc048d1f34`, //订单-获取支付宝支付参数
  post64215178a23ec: `/${API_VERSION}/64215178a23ec`, //获取订单支付信息(2023-0327)
  post641846f0a19d3: `/${API_VERSION}/641846f0a19d3`, //支付结果-获取抽奖次数(2023-0320)
  post6421a00e4fa4e: `/${API_VERSION}/6421a00e4fa4e`, //文章管理-获取文章列表（以分类分组）
  post641576c24de11: `/${API_VERSION}/641576c24de11`, //系统文章-获取公告详情
  post637c4d70d3aa8: `/${API_VERSION}/637c4d70d3aa8`, //注销账号-发起注销
  post637c458b131e3: `/${API_VERSION}/637c458b131e3`, //注销账号-注销账号原因
  post5f69e0271835d: `/${API_VERSION}/5f69e0271835d`, //设置中心-首次设置支付密码
  post5f6c915d69d1f: `/${API_VERSION}/5f6c915d69d1f`, //设置中心-修改手机号
  post5f69dfd20a8c5: `/${API_VERSION}/5f69dfd20a8c5`, //设置中心-修改支付密码
  post5da9ab4c4c7af: `/${API_VERSION}/5da9ab4c4c7af`, //设置中心-用旧密码重置密码
  post651fc90e80fd4: `/${API_VERSION}/651fc90e80fd4`, //登录注册-检验是否设置支付密码
  post641472eb35317: `/${API_VERSION}/641472eb35317`, //用户管理-意见反馈记录
  post6414719bdc956: `/${API_VERSION}/6414719bdc956`, //用户管理-意见反馈类型
  post6414724b96f3f: `/${API_VERSION}/6414724b96f3f`, //用户管理-意见反馈提交
  post64219c5dc8d0d: `/${API_VERSION}/64219c5dc8d0d`, //文章列表-获取文章详情
  post637c4deb97aa9: `/${API_VERSION}/637c4deb97aa9`, //注销账号-注销详情
  post65e546aa76647: `/${API_VERSION}/65e546aa76647`, //登录注册-退出登录
  post69fdb48286573: `/${API_VERSION}/69fdb48286573`, //获取礼包详情
  post6a03c9d95f601: `/${API_VERSION}/6a03c9d95f601`, // 礼包权益--生成礼包购买订单
  post6a154ced919fe: `/${API_VERSION}/6a154ced919fe`, //获取礼包列表
  post67e67234a704a: `/${API_VERSION}/67e67234a704a`, // 礼包权益--生成礼包购买订单
  post672daa999d5c3: `/${API_VERSION}/672daa999d5c3`, // 礼包权益--生成礼包购买订单
}
const pageFiles = require.context('../../pages/', true, /\api.js$/);
const pageApis = pageFiles.keys().reduce((modules, modulePath) => {
  const value = pageFiles(modulePath);
  if ((typeof value == 'object') && value.default) Object.assign(modules, value.default);
  return modules;
}, publicApi);
const modulesFiles = require.context('../../components/', true, /\api.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  if ((typeof value == 'object') && value.default) Object.assign(modules, value.default);
  return modules;
}, pageApis);
export default new Proxy(modules, {
  get: (target, prop) => target[prop] ?? `/${API_VERSION}/${prop.replace(/^(get|post)/, '')}`
});
