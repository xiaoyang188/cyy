import {
	request
} from "@/api/request.js"
import {
	WebUrl
} from "@/api/webUrl.ts"

export function savePetInfo({
	pid,
	category,
	nickname,
	breedId,
	gender,
	weight,
	height,
	birthDate,
	avatarUrl,
	backgroudImg
}) {
	return request({
		url: WebUrl.SAVE_PET_INFO,
		method: "POST",
		data: {
			...(pid !== undefined && pid !== null && {
				pid: pid
			}),
			category: category,
			nickname: nickname,
			breedId: breedId,
			gender: gender,
			weight: weight,
			height: height,
			birthDate: birthDate,
			...(avatarUrl != undefined && avatarUrl != null && avatarUrl != '' && {
				avatarUrl: avatarUrl
			}),
			...(backgroudImg != undefined && backgroudImg != null && backgroudImg != '' && {
				backgroudImg: backgroudImg
			})
		}
	})
}

export function getPetList() {
	return request({
		url: WebUrl.GET_PET_LIST,
		method: "POST",
	})
}

export function getPetInfo(pid) {
	return request({
		url: `${WebUrl.GET_PET_INFO}${pid}`,
		method: "GET"
	})
}
export function sharePet({pid, phone}) {
	return request({
		url: WebUrl.SHARE_PET,
		method: "POST",
		data: {
			pid: pid,
			mobile: phone
		}
	})
}
export function removePet(pid){
	return request({
		url:`${WebUrl.REMOVE_PET}${pid}`,
		method: "GET"
	})
}
export function cancelShare(sharePetsId){
	return request({
		url:`${WebUrl.CANCEL_SHARE}${sharePetsId}`,
		method: "GET"
	})
}
export function shareList(){
	return request({
		url:WebUrl.SHARE_LIST,
		method: "POST"
	})
}
export function ackShare({sharePetsId,type}){
	return request({
		url:WebUrl.SHARE_ACK,
		method: "POST",
		data:{
			sharePetsId:sharePetsId,
			type:type
		}
	})
}