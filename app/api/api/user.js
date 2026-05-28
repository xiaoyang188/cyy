import {
	request
} from "@/api/request.js"
import {
	WebUrl
} from "@/api/webUrl.ts"

export function getUserInfo() {
	return request({
		url: WebUrl.GET_USER_INFO,
		method: "POST"
	})
}
export function cnacellation(){
	return request({
		url: WebUrl.USER_CANCELLATION,
		method: "POST"
	})
}
export function updateUserInfo({nickname,gender,birthDate,profileUrl}){
	return request({
		url:WebUrl.UPDATE_USER_INFO,
		method: "POST",
		data:{
			nickname:nickname,
			gender:gender,
			birthDate:birthDate,
			profileUrl:profileUrl
		}
	})
}