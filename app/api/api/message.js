import {
	request
} from "@/api/request.js"
import {
	WebUrl
} from "@/api/webUrl.ts"

export function getPage({pageNo,pageSize,type}){
	return request({
		url: WebUrl.GET_MESSAGE_PAGE,
		method: "POST",
		data:{
			pageNo:pageNo,
			pageSize:pageSize,
			type:type
		}
	})
}
export function updateStatus({id,status}){
	return request({
		url: WebUrl.MESSAGE_UPDATE_STATUS,
		method: "POST",
		data:{
			id:id,
			status:status,
		}
	})
}
export function getUnReadCount(){
	return request({
		url: WebUrl.MESSAGE_UNREAD_COUNT,
		method: "POST",
	})
}
export function updateStatusMul({idList,status}){
	return request({
		url: WebUrl.MESSAGE_UPDATE_STATUS_MULTIPLE,
		method: "POST",
		data:{
			idList:idList,
			status:status,
		}
	})
}