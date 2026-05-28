import {
	WebUrl
} from "@/api/webUrl";
import {
	request
} from "@/api/request.js"

export function getProductList({
	pageNo,
	pageSize,
	category
}) {
	return request({
		url: WebUrl.PRODUCT_LIST,
		method: "POST",
		data: {
			pageNo: pageNo,
			pageSize: pageSize,
			...(category != undefined && category != null && {
				category: category
			})
		}
	})
}