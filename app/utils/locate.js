import {
	$uni
} from "@/utils/main.js"

const x_PI = 3.14159265358979324 * 3000.0 / 180.0;

export function getLocation(type, altitude, isHighAccuracy, highAccuracyExpireTime) {
	return new Promise((resolve, reject) => {
		$uni.getLocation({
			type: type,
			altitude: altitude,
			isHighAccuracy: isHighAccuracy,
			highAccuracyExpireTime: highAccuracyExpireTime,
			success(res) {
				console.log("获取到的位置：", res)
				resolve(res)
			},
			fail(err) {
				console.log("获取位置出错：", err)
				reject(err)
			}
		})
	})
}

export function gcj02tobd09(lat, lng) {
	var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
	var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
	var bd_lng = z * Math.cos(theta) + 0.0065;
	var bd_lat = z * Math.sin(theta) + 0.006;
	return {
		latitude: bd_lat,
		longitude: bd_lng
	};
}

export function calculateSphericalCenter(points, width, height) {
	if (!points || !Array.isArray(points) || points.length === 0) {
		console.warn('警告：输入点集为空或无效');
		return null;
	}

	// 提取所有纬度和经度
	const lats = points.map(point => {
		if (typeof point.latitude !== 'number' || isNaN(point.latitude)) {
			throw new Error('无效的纬度值：' + point.latitude);
		}
		return point.latitude;
	});

	const lngs = points.map(point => {
		if (typeof point.longitude !== 'number' || isNaN(point.longitude)) {
			throw new Error('无效的经度值：' + point.longitude);
		}
		return point.longitude;
	});

	// 计算边界框
	const minLat = Math.min(...lats);
	const maxLat = Math.max(...lats);
	const minLng = Math.min(...lngs);
	const maxLng = Math.max(...lngs);

	// 计算经纬度跨度
	const latSpan = maxLat - minLat;
	const lngSpan = maxLng - minLng;
	
	// 添加边距系数，确保所有点不会太靠近边缘（增加20%的缓冲区）
	const paddingFactor = 1.4;
	
	// 计算最适合的缩放值 (2-20)
	// 跨度越大，缩放值越小（看得越远）
	// 根据窗口宽高比和地理跨度来计算，确保所有点都在视野内
	let scale;
	
	// 如果提供了窗口尺寸，使用更精确的计算方式
	if (width && height && width > 0 && height > 0) {
		// 计算窗口宽高比和地理跨度宽高比
		const windowRatio = width / height;
		const spanRatio = lngSpan / latSpan;
		
		// 根据宽高比选择主要参考的跨度
		// 如果地理跨度相对窗口更宽，经度跨度是限制因素；反之则是纬度跨度
		let effectiveSpan;
		if (spanRatio > windowRatio) {
			// 经度跨度更大（相对于窗口），使用经度作为主要参考
			effectiveSpan = lngSpan * paddingFactor;
		} else {
			// 纬度跨度更大（相对于窗口），使用纬度作为主要参考
			effectiveSpan = latSpan * paddingFactor;
		}
		
		// 根据有效跨度计算缩放级别
		if (effectiveSpan >= 10) {
			scale = 2;
		} else if (effectiveSpan >= 5) {
			scale = 3;
		} else if (effectiveSpan >= 2) {
			scale = 4;
		} else if (effectiveSpan >= 1) {
			scale = 5;
		} else if (effectiveSpan >= 0.5) {
			scale = 6;
		} else if (effectiveSpan >= 0.2) {
			scale = 8;
		} else if (effectiveSpan >= 0.1) {
			scale = 10;
		} else if (effectiveSpan >= 0.05) {
			scale = 12;
		} else if (effectiveSpan >= 0.02) {
			scale = 14;
		} else if (effectiveSpan >= 0.01) {
			scale = 15;
		} else if (effectiveSpan >= 0.005) {
			scale = 16;
		} else if (effectiveSpan >= 0.002) {
			scale = 17;
		} else if (effectiveSpan >= 0.001) {
			scale = 18;
		} else if (effectiveSpan >= 0.0005) {
			scale = 19;
		} else {
			scale = 20;
		}
	} else {
		// 如果没有提供窗口尺寸，使用原来的简单计算方式
		const maxSpan = Math.max(latSpan, lngSpan) * paddingFactor;
		
		if (maxSpan >= 10) {
			scale = 2;
		} else if (maxSpan >= 5) {
			scale = 3;
		} else if (maxSpan >= 2) {
			scale = 4;
		} else if (maxSpan >= 1) {
			scale = 5;
		} else if (maxSpan >= 0.5) {
			scale = 6;
		} else if (maxSpan >= 0.2) {
			scale = 8;
		} else if (maxSpan >= 0.1) {
			scale = 10;
		} else if (maxSpan >= 0.05) {
			scale = 12;
		} else if (maxSpan >= 0.02) {
			scale = 14;
		} else if (maxSpan >= 0.01) {
			scale = 15;
		} else if (maxSpan >= 0.005) {
			scale = 16;
		} else if (maxSpan >= 0.002) {
			scale = 17;
		} else if (maxSpan >= 0.001) {
			scale = 18;
		} else if (maxSpan >= 0.0005) {
			scale = 19;
		} else {
			scale = 20;
		}
	}

	// 返回中心点和缩放值
	return {
		latitude: (minLat + maxLat) / 2,
		longitude: (minLng + maxLng) / 2,
		scale: scale
	};
}