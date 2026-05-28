import {
	request
} from "@/api/request.js"
import {
	WebUrl
} from "@/api/webUrl.ts"

export function getValidCode(phone) {
	return request({
		url: WebUrl.VALID_CODE,
		method: "POST",
		isToken: false,
		data: {
			mobile: phone
		}
	})
}
export function login({ phone, validCode, pushClientId, deviceId, appVersion }) {
	return request({
		url: WebUrl.LOGIN,
		method: 'POST',
		isToken: false,
		data: {
			mobile: phone,
			validCode: validCode,
			unipushInfo: {
				push_clientid: pushClientId,
				deviceId: deviceId,
				app_version: appVersion
			}
		}
	})
}
export function univerifyLogin({ accessToken, pushClientId, deviceId, appVersion, openid }) {
	return request({
		url: WebUrl.UNIVERIFY,
		method: 'POST',
		isToken: false,
		data: {
			accessToken: accessToken,
			openid: openid,
			unipushInfo: {
				push_clientid: pushClientId,
				deviceId: deviceId,
				app_version: appVersion,
			}
		}
	})
}

export function loginOut() {
	return request({
		url: WebUrl.LOGIN_OUT,
		method: 'POST'
	})
}