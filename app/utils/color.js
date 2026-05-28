export function hexNumberToColor(hexNumber, format = 'hex') {
	// 提取 ARGB 通道值（0xAARRGGBB）
	const a = (hexNumber >>> 24) & 0xFF; // Alpha 通道
	const r = (hexNumber >>> 16) & 0xFF; // 红色通道
	const g = (hexNumber >>> 8) & 0xFF; // 绿色通道
	const b = hexNumber & 0xFF; // 蓝色通道

	// 转换为 HEX 格式（如 #FF0000）
	if (format === 'hex') {
		// 忽略 Alpha 通道（标准 HEX 无透明度）
		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
	}
	// 转换为 RGBA 格式（如 rgba(255,0,0,0.2)）
	else if (format === 'rgba') {
		const alpha = a / 255; // 将 0-255 映射到 0-1
		return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
	}
	throw new Error("Unsupported format. Use 'hex' or 'rgba'.");
}

export function colorToHexNumber(color) {
	// 处理 HEX 格式（如 #FF0000）
	if (color.startsWith('#')) {
		const hex = color.replace('#', '').trim();
		let r, g, b, a = 0xFF; // 默认不透明

		// 扩展缩写格式（如 #F00 → FF0000）
		if (hex.length === 3) {
			r = parseInt(hex[0] + hex[0], 16);
			g = parseInt(hex[1] + hex[1], 16);
			b = parseInt(hex[2] + hex[2], 16);
		}
		// 标准 6 位 HEX（如 FF0000）
		else if (hex.length === 6) {
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
		}
		// 带 Alpha 的 8 位 HEX（如 FF000033）
		else if (hex.length === 8) {
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
			a = parseInt(hex.slice(6, 8), 16);
		} else {
			throw new Error("Invalid HEX format");
		}

		// 组合为 0xAARRGGBB
		return (a << 24) | (r << 16) | (g << 8) | b;
	}

	// 处理 RGBA 格式（如 rgba(255,0,0,0.2)）
	else if (color.startsWith('rgba')) {
		const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
		if (!match) throw new Error("Invalid RGBA format");

		// 提取并规范化数值
		const r = Math.min(255, Math.max(0, parseInt(match[1])));
		const g = Math.min(255, Math.max(0, parseInt(match[2])));
		const b = Math.min(255, Math.max(0, parseInt(match[3])));
		const a = match[4] ?
			Math.min(255, Math.max(0, Math.round(parseFloat(match[4]) * 255))) :
			0xFF; // 缺省不透明

		// 组合为 0xAARRGGBB
		return (a << 24) | (r << 16) | (g << 8) | b;
	}

	throw new Error("Unsupported color format");
}