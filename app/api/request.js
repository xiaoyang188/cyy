import {
	WebUrl
} from "@/api/webUrl.ts"
async function getToken() {
	const app = getApp();
	let token = app.globalData?.loginAuthorization;
	// 如果 globalData 中没有，从存储中读取
	if (!token) {
		token = uni.getStorageSync('loginAuthorization');
		if (token && app.globalData) {
			app.globalData.loginAuthorization = token;
		}
	}
	if (!token)
		token = '123'
	return token;
}

export async function request(options) {
	try {
		const isToken = options.isToken ?? true
		const hasVersion=options.hasVersion ?? true
		const uniId=options.uniId ?? true
		const hasFile = options.hasFile ?? false
		const multiFile = options.multiFile ?? false

		const header = options.header ?? {}
		header['Content-Type'] = header['Content-Type'] ?? 'application/json;charset=utf-8'
		
		if(hasVersion==true){
			let info=uni.getAppBaseInfo()
			header['App-Version']=info.appVersion
			
		}
		if(uniId==true)
		{	let info=uni.getSystemInfoSync()
			header['Unique-Id']=info.deviceId
			// console.log('info uni id',info)
		}
		const token = await getToken()
		if (isToken == true) {
			header['Authorization'] = token
		}
		const systemInfo = uni.getSystemInfoSync()
		header['Client-Width'] = systemInfo.windowWidth
		header['Client-Height'] = systemInfo.windowHeight
		const fullUrl = options.url && options.url.startsWith('http') ? options.url :
			`${WebUrl.ADDRESS}${options.url}`
		console.log('请求URL:', fullUrl)
		console.log('请求参数',options)
		let result;
		if (!hasFile) {
			result = await new Promise((resolve, reject) => {
				uni.request({
					url: fullUrl,
					data: options.data,
					header: header,
					method: options.method ?? "GET",
					timeout: options.timeout ?? 30000,
					success: (res) => responseSuccess(res, resolve, options),
					fail: (err) => responseFail(err, reject)
				})
			})
		} else {
			result = await new Promise((resolve, reject) => {
				uni.uploadFile({
					url: fullUrl,
					files: multiFile ? options.files : null,
					filePath: multiFile ? null : options.filePath,
					name: options.name ?? null,
					header: header,
					timeout: options.timeout ?? 3000,
					formData: options.formData ?? {},
					success: (res) => responseSuccess(res, resolve),
					fail: (err) => responseFail(err, reject)
				})
			})
		}
		// 统一处理 HTTP 错误和业务逻辑错误
		console.log('完整响应:', result)
		// uni.hideLoading()
		// 1. 先检查 HTTP 状态码
		if (result.statusCode !== 200) {
			uni.showToast({
				title: result.data.error,
				icon: "none"
			})
			throw new Error(`HTTP错误: ${result.data.error}`)
		}
		if (result.data && result.data.hasOwnProperty('code')) {
			// 2. 检查登录过期（特殊业务码）
			if (result.data.code === '999') {
				uni.showModal({
					title: '提示',
					content: '登录状态已过期，请重新登录！',
					showCancel: false,
					success: (res) => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
				throw new Error('登录状态已过期')

			}

			// 3. 检查其他业务逻辑错误
			if (result.data && result.data.code !== '200') {
				const errorMsg = result.data.msg || result.data.message || '请求失败'
				uni.showToast({
					title: errorMsg,
					icon: "none"
				})
				throw new Error(errorMsg)
			}

			// 4. 检查数据格式
			if (!result.data) {
				throw new Error('返回数据格式错误')
			}
		}

		// 只有所有检查都通过才返回数据
		return result.data
	} catch (err) {
		console.log("requestCatch", err)
		throw err // 重新抛出错误
	}
}

function responseSuccess(response, resolve, options) {
	// 只判断 HTTP 状态码，不处理业务逻辑
	if (response.statusCode !== 200) {
		// 对于 HTTP 错误，我们仍然返回完整响应，让 request 函数统一处理
		resolve(response)
	} else {
		// HTTP 成功，返回完整响应
		resolve(response)
	}

}

function responseFail(err, reject) {
	console.log('request fail', JSON.stringify(err))
	reject(err)
}