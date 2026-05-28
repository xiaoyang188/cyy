<template>
	<view class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="150rpx"
					color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">隐私政策</text>
			</view>
			<view  style="width: 150rpx;">
			</view>
		</div>
		<scroll-view class="scroll-content" scroll-y="true">
			<view class="container">
				<h1>欢迎您访问我们的产品</h1>
				<h2>宠悦悦手机APP隐私政策</h2>
				<p>
					宠悦悦手机APP（包括手机APP等产品提供的服务，以下简称“产品和服务”）
					是由绍兴市宠悦悦科技有限公司（以下简称“我们”）开发并运营的。
					确保用户的数据安全和隐私保护是我们的首要任务，
					本隐私政策载明了您访问和使用我们的产品和服务时所收集的数据及其处理方式。
				</p>
				<p>
					请您在继续使用我们的产品前务必认真仔细阅读并确认充分理解本隐私政策全部规则和要点，一旦您选择使用，即视为您同意本隐私政策的全部内容，同意我们按其收集和使用您的相关信息。如您在在阅读过程中，对本政策有任何疑问，可联系我们的客服咨询，请通过sail308@126.com或产品中的反馈方式与我们取得联系。如您不同意相关协议或其中的任何条款的，您应停止使用我们的产品和服务。
				</p>
				<h3>一、定义</h3>
				<p>我们：绍兴市宠悦悦科技有限公司。</p>
				<p>开发者信息：绍兴市宠悦悦科技有限公司</p>
				<p>个人信息：指以电子或者其他方式记录的与已识别或者可识别的自然人有关的各种信息，不包括匿名化处理后的信息。</p>
				<p>个人敏感信息：指一旦泄露或者非法使用，可能导致个人受到歧视或者人身、财产受到严重危害的个人信息，包括种族、民族、宗教信仰、个人生物特征、医疗健康、金融账户、个人行踪等信息（我们将在本隐私政策中对具体个人敏感信息以粗体进行显著标识）。
				</p>
				<p>未成年人：指不满18周岁的自然人。</p>
				<p>儿童：指不满14周岁的自然人。</p>
				<h3>二、我们如何收集和使用您的个人信息</h3>
				<p>个人信息是指以电子或者其他方式记录的能够单独或者与其他信息， 结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。
					我们根据《中华人民共和国网络安全法》和《信息安全技术个人信息安全规范》（GB/T 35273-2017） 以及其它相关法律法规的要求，并严格遵循正当、合法、必要的原则，
					出于您使用我们提供的服务和/或产品等过程中而收集和使用您的个人信息，包括但不限于等</p>
				<p>为接受我们全面的产品服务，您应首先注册一个用户账号，我们将通过它记录相关的数据。您准备使用的账户名、密码、您本人的联系方式， 我们可能通过发短信或者邮件的方式来验证您的身份是否有效。</p>
				<h3>三，我们如何存储和保护您的个人信息</h3>
				<p>作为一般规则，我们仅在实现信息收集目的所需的时间内保留您的个人信息。 我们会在对于管理与您之间的关系严格必要的时间内保留您的个人信息 （例如，当您开立帐户，从我们的产品获取服务时）。
					出于遵守法律义务或为证明某项权利或合同满足适用的诉讼时效要求的目的， 我们可能需要在上述期限到期后保留您存档的个人信息，并且无法按您的要求删除</p>
				<h3>四、sdk收集使用信息说明；</h3>
				<p>1、我们的产品基于DCloud uni-app(5+ App/Wap2App)开发，应用运行期间需要收集您的设备唯一识别码（IMEI/
				<!-- #ifdef APP-PLUS -->
				Android ID
				<!-- #endif -->
				/DEVICE_ID/IDFA、SIM、GAID、安装列表
					卡 IMSI 信息、OAID、MAC
					<!-- #ifdef APP-HARMONY -->
					、ODID、AAID
					<!-- #endif -->
					）以提供统计分析服务，并通过应用启动数据及异常错误日志分析改进性能和用户体验，为用户提供更好的服务。</p>
				<p>2、我们的产品使用了移动安全联盟 OAID，移动智能终端补充设备标识体系与 SDK 严格遵守我国《网络安全法》、《数据安全法》和《电信和互联网用户个人信息保护规定》等相关法律法规和《信息安全技术
					个人信息安全规范》等国家标准要求。SDK 不会主动收集任何数据，只在 APP 调用时获取以下数据，用于本地判断，不会进行任何网络传输：</p>
				<p>（1） 设备制造商、设备型号、设备品牌，用于判断终端调用接口</p>
				<p>（2）设备网络运营商名称，用于判断虚拟机环境</p>
				<p>（3）APP 包名，用于校验签名</p>
				<p>3、我们的产品有个推功能，包含的sdk以及个人信息如下 </p>
				<!-- #ifndef APP-HARMONY -->
				<p>（1）
					个推·消息推送----为了推送消息的目的我们使用了unipush的个推·消息推送功能，涉及的个人信息包括存储的用户信息(BSSID,SSID)、个人文件、设备信息（IMEI、MAC、ANDROID_ID、DEVICE_ID、IMSI、OAID、GAID）、应用已安装列表、网络信息。相关的隐私权政策链接为:
					<a href='http://docs.getui.com/privacy'>http://docs.getui.com/privacy</a>
				</p>
				<p>（2）个验一键登录----为了户身份验证和登录功能我们使用了个验一键登录，涉及个人信息包括存储的个人文件、读取手机状态和身份、网络信息。相关的隐私权政策链接为：
					<a href='http://docs.getui.com/privacy'>http://docs.getui.com/privacy</a></p>
				<p>（3） 华为 HMS push----为了实现华为厂商推送我么使用了华为 HMS push
					sdk，涉及的个人信息为设备信息（IMEI、ANDROID_ID、DEVICE_ID、IMSI）、应用已安装列表、网络信息。</p>
				<p>（4） 魅族 Flyme push----为了实现魅族厂商推送我们使用了魅族 Flyme push sdk，涉及的个人信息为网络信息、存储的个人文件。相关隐私权政策链接：<a
						href="https://static.meizu.com/resources/term/privacy8.html">https://static.meizu.com/resources/term/privacy8.html</a>
				</p>
				<p>（5）OPPO push----为了实现oppo厂商推送我们使用了OPPO push sdk，涉及的个人信息为网络信息。相关隐私权政策链接：<a
						href="https://open.oppomobile.com/new/developmentDoc/info?id=10288">https://open.oppomobile.com/new/developmentDoc/info?id=10288</a>
				</p>
				<p>（6）vivo push----为了实现vivo厂商推送我们使用了vivo push sdk，涉及的个人信息为网络信息。相关隐私权政策链接：<a
						href="https://dev.vivo.com.cn/documentCenter/doc/652#w1-12075822">https://dev.vivo.com.cn/documentCenter/doc/652#w1-12075822</a>
				</p>
				<p>（7）小米 MiPush----为了实现小米厂商推送我们使用了小米 MiPush sdk，涉及的权限为网络信息。相关隐私权政策链接：<a
						href="https://dev.mi.com/distribute/doc/details?pId=1534">https://dev.mi.com/distribute/doc/details?pId=1534</a>
				</p>
				<p>（8）高德----为了实现应用内的定位服务，展示附近服务点等基于位置的功能，我们使用了高德 sdk，涉及的个人信息有位置信息（经纬度，精确位置，粗略位置），设备信息【IP地址，GNSS信息，WiFi状态，WiFi参数，基站信息，信号强度信息
					，蓝牙信息，传感器信息（矢量，加速度，压力，方向，地磁），设备信号强度信息】，设备标识信息（IDFA，IDFV，Android ID，MEID，MAC地址
					，OAID，硬件序列号），当前应用信息（应用名，应用版本号），设备参数及系统信息（系统属性，设备型号，操作系统）</p>
				<!-- #endif -->
				
				<!-- #ifdef APP-HARMONY -->
				<p>（1）
					个推·消息推送----为了推送消息的目的我们使用了unipush的个推·消息推送功能，涉及的个人信息包括存储的个人文件、设备信息（IMEI、MAC、OAID、DEVICE_ID、IMSI）、网络信息。相关的隐私权政策链接为:
					<a href='http://docs.getui.com/privacy'>http://docs.getui.com/privacy</a>
				</p>
				<p>（2）个验一键登录----为了户身份验证和登录功能我们使用了个验一键登录，涉及个人信息包括存储的个人文件、读取手机状态和身份、网络信息：
					<a href='http://docs.getui.com/privacy'>http://docs.getui.com/privacy</a></p>
				<p>HarmonyOS NEXT 操作系统版本说明——根据 HarmonyOS NEXT SDK 接入规范，我们会在用户授权后向系统申请以下必要权限，以保证推送通知、异常排查及统计分析功能可用。</p>
				<div class="harmony-permissions">
					<p><strong>HarmonyOS NEXT 权限申请与使用说明：</strong></p>
					<p>为保障宠悦悦 EntryAbility 场景下核心功能的稳定运行，我们坚持最小必要原则，并在获得您的明示授权后向 HarmonyOS NEXT 系统申请以下权限；您可随时通过系统设置撤回授权，但部分功能可能受到限制：</p>
					<p>（1）ohos.permission.INTERNET：用于建立与服务器的安全通信通道，完成内容同步、推送通知及异常排查，仅在联网业务场景下调用。</p>
					<p>（2）ohos.permission.ACCELEROMETER：在您开启互动体感或步态识别等功能时读取加速度计数据，用于实时计算运动状态，数据仅在设备本地即时处理。</p>
					<p>（3）ohos.permission.GET_WIFI_INFO、ohos.permission.GET_NETWORK_INFO：用于识别当前网络类型与连接质量，向您提示网络切换风险并保障服务连通性，不会采集与业务无关的网络内容。</p>
					<p>（4）ohos.permission.APP_TRACKING_CONSENT：在 EntryAbility 前台运行期间征求并记录您对个性化统计及追踪行为的授权，同意前不会开启相关能力，您也可随时撤回同意。</p>
					<p>（5）ohos.permission.ACCESS_BLUETOOTH、ohos.permission.DISCOVER_BLUETOOTH：仅在 EntryAbility “使用中”场景下扫描、配对宠物智能硬件，所获取的设备信息仅用于连接与状态同步。</p>
					<p>（6）ohos.permission.APPROXIMATELY_LOCATION、ohos.permission.LOCATION、ohos.permission.LOCATION_IN_BACKGROUND：为提供宠物定位及走失提醒等服务，我们会在前台及后台场景下申请相应定位权限，并通过后台定位能力保障持续提醒；您可自行关闭权限，但相关功能将无法使用。</p>
				</div>
				
				<p>期间 SDK 可能需要在本地读取 HarmonyOS 设备标识（例如 OAID(HarmonyOS)、ODID(HarmonyOS)、AAID 及其他终端标识）、操作系统版本号、设备型号、网络状态、应用包名以及崩溃/性能日志，用于完成设备唯一性校验、防止恶意注册、保障账号安全并改进服务体验。上述数据仅在实现前述功能的范围内使用，不会与无关数据交叉融合，也不会擅自对外共享，您可在 HarmonyOS NEXT 的系统设置中随时管理对应权限。</p>
				<!-- #endif -->
				
				<h3>五、我们如何共享、转让、公开披露您的个人信息</h3>
				<p>在管理我们的日常业务活动所需要时，为追求合法利益以更好地服务客户， 我们将合规且恰当的使用您的个人信息。出于对业务和各个方面的综合考虑，</p>
				<p>我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。 在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。
					我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。</p>
				<p>在以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</p>
				<p>1、与国家安全、国防安全直接相关的；</p>
				<p>2、与犯罪侦查、起诉、审判和判决执行等直接相关的；</p>
				<p>3、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</p>
				<p>4、您自行向社会公众公开的个人信息；</p>
				<p>5、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</p>
				<p>6、根据个人信息主体要求签订和履行合同所必需的；</p>
				<p>7、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</p>
				<p>8、法律法规规定的其他情形。</p>
				<h3>六、本政策如何更新</h3>
				<p>我们的隐私政策可能变更。</p>
				<p>未经您明确同意，我们不会削减您在本政策项下应享有的权利。我们会在本页面上发布对本政策所作的任何变更。</p>
				<p>对于重大变更，我们还会提供更为显著的通知（比如官方公告、推送通知、发送短信或者电子邮件），并在本政策更新后您首次登陆时再次获取您的明示同意。若您在本政策更新且接到我们的通知后，点击同意或下一步，这表示您已充分阅读、理解并接受修订后的本政策。
				</p>
				<p>本政策所指的重大变更包括但不限于：</p>
				<p>1、我们的服务模式发生重大变化，比如处理个人信息的类型、目的和方式等；</p>
				<p>2、我们在所有权结构、组织架构等方面发生重大变化，比如业务调整、并购、破产等引起的所有者变更等；</p>
				<p>3、个人信息共享、转让或者公开披露的主要对象发生变化；</p>
				<p>4、您参与个人信息处理方面的权利及其行使方式发生重大变化；</p>
				<p>5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</p>
				<p>6、个人信息安全影响评估报告表明存在高风险时。</p>
				<p>我们还会将本政策的旧版本存档，供您查阅。</p>
				<h3>七、如何联系我们</h3>
				<p>1.如果您对本政策有任何疑问、意见或建议，可通过以下方式与我们联系：</p>
				<p>		(1)拨打客服热线电话18853874691</p>
				<p> 	(2)发送电子邮件至：sail308@126.com</p>
				<p>		(3)联系地址：杭州市萧山区鸿兴路477号，联系人：沈经理</p>
				<p>我们的客服部门将会同个人信息保护部门30天内进行回复，并协助解决您的问题。</p>
				<p>2.如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，您还可以通过以下外部途径寻求解决方式：向宠悦悦所在地人民法院提起诉讼，或向网信、工商、公安等监管部门进行投诉或举报。
				</p>
				<h3>八、政策更新日期</h3>
				<p>本隐私政策最后更新于：2026年01月22日</p>
				<p>本隐私政策生效于：2025年10月22日</p>
			</view>
		</scroll-view>

	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			returnParent() {
				getApp().backParents();
			},
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
	
	.nav_row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: auto;
		padding-bottom: 20rpx;
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: #fff;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		/* padding: 30rpx; */
		height: 100vh;
		background: #fff;
		overflow: hidden;
	}
	
	/* main-container {
	    display: flex;
	    flex-direction: column;
	    height: 100vh;
	    background-color: #fff;
		
	  } */
	  
	  /* 内容区域样式 */
	  .scroll-content {
	    flex: 1;
		height: 0;
	    background-color: #fff;
	  }
	  
	  .container {
	    max-width: 700rpx;
	    margin: 0 auto;
	    padding: 20rpx 30rpx;
	    color: #333;
	    line-height: 1.8;
	    font-size: 28rpx;
	  }
	  
	  /* 标题样式 */
	  h1 {
	    font-size: 36rpx;
	    font-weight: bold;
	    text-align: center;
	    margin: 40rpx 0 30rpx;
	    color: #333;
	  }
	  
	  h2 {
	    font-size: 34rpx;
	    font-weight: bold;
	    margin: 50rpx 0 20rpx;
	    color: #333;
	    position: relative;
	    padding-left: 20rpx;
	  }
	  
	  h2::before {
	    content: "";
	    position: absolute;
	    left: 0;
	    top: 50%;
	    transform: translateY(-50%);
	    width: 8rpx;
	    height: 34rpx;
	    background-color: #07C160;
	    border-radius: 4rpx;
	  }
	  
	  h3 {
	    font-size: 32rpx;
	    font-weight: bold;
	    margin: 40rpx 0 20rpx;
	    color: #444;
	  }
	  
	  /* 段落样式 */
  p {
    margin: 20rpx 0;
    text-align: justify;
    color: #666;
  }

  /* HarmonyOS 权限段落左对齐，避免汉字两端分散导致括号错位 */
  .harmony-permissions p {
    text-align: left;
  }
	  
	  /* 列表样式 */
	  p + p {
	    margin-top: 15rpx;
	  }
	  
	  /* 链接样式 */
	  a {
	    color: #07C160;
	    text-decoration: none;
	    word-break: break-all;
	  }
	  
	  /* 强调文本 */
	  strong {
	    font-weight: bold;
	    color: #333;
	  }
	  
	  /* 响应式调整 */
	  @media (max-width: 750px) {
	    .container {
	      padding: 20rpx;
	    }
	    
	    h1 {
	      font-size: 34rpx;
	    }
	    
	    h2 {
	      font-size: 32rpx;
	    }
	    
	    h3 {
	      font-size: 28rpx;
	    }
	  }
</style>
