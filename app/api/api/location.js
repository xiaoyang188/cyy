import {
	request
} from "@/api/request.js"
import {
	WebUrl
} from "@/api/webUrl.ts"

export function saveRecoveryLoc({
	id,
	deviceLocationId,
	latitude,
	longitude,
	address,
	floor
}) {
	return request({
		url: WebUrl.SAVE_LOC_RECOVERY,
		method: "POST",
		data: {
			// 只有 edit 有值时才包含 id 字段
			...(id !== undefined && id !== null && {
				id: id
			}),
			deviceLocationId: deviceLocationId,
			latitude: latitude,
			longitude: longitude,
			address: address,
			floor:floor
		}
	})
}
export function deleteRecoveryLoc(ids){
	return request({
		url:WebUrl.DELETE_LOC_RECOVERY,
		method: "POST",
		data:{
			idList:ids
		}
	})
}

export function getRecLocList(pageNo, pageSize) {
	return request({
		url: WebUrl.GET_LOC_RECOVERY,
		method: "POST",
		data: {
			pageNo: pageNo,
			pageSize: pageSize
		}
	})
}

export function getRecLocInfo(id) {
	return request({
		url: `${WebUrl.GET_LOC_RECOVERY_INFO}${id}`,
		method: "GET",
	})
}

export function getLocationList({
	did,
	serialCode,
	beginDate,
	endDate,
	queryDate
}) {
	const data = Object.fromEntries(
		Object.entries({
			did,
			serialCode,
			beginDate,
			endDate,
			queryDate
		})
		.filter(([_, value]) => value != null)
	);

	return request({
		url: WebUrl.GET_LOCATION_LIST,
		method: "POST",
		data: data // 所有参数都在 data 中
	})
}

export function getMotionList({
	did,
	serialCode,
	beginDate,
	endDate,
	queryDate
}) {
	const data = Object.fromEntries(
		Object.entries({
			did,
			serialCode,
			beginDate,
			endDate,
			queryDate
		})
		.filter(([_, value]) => value != null)
	);

	return request({
		url: WebUrl.GET_MOTION_LIST,
		method: "POST",
		data: data // 所有参数都在 data 中
	})

}

export function amapLocation(longitude,latitude,radius){
	return request({
		url:`https://restapi.amap.com/v3/geocode/regeo?key=${WebUrl.AMAP_KEY}&radius=${radius}&extensions=all&batch=false&roadlevel=0&location=${longitude},${latitude}`,
		method:"GET",
		isToken:false
	})
}