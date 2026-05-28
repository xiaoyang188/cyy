const fs = require('fs');
const path = require('path');

// 要在BIN文件开头添加的0填充大小（4096字节 = 4K）
const PADDING_SIZE = 4096;

// 使用你提供的原版 charToByte 方法
function charToByte(c) {
	return '0123456789ABCDEF'.indexOf(c);
}

// 使用你提供的原版 hexString2ByteArray 方法
function hexString2ByteArray(hexString) {
	try {
		if (hexString == null || hexString === '') {
			return null;
		}
		hexString = hexString.toUpperCase();
		var length = hexString.length / 2;
		var hexChars = hexString.split('');
		var d = new Uint8Array(length);
		for (var i = 0; i < length; i++) {
			var pos = i * 2;
			d[i] = (charToByte(hexChars[pos]) << 4) | charToByte(hexChars[pos + 1]);
		}
		return d;
	} catch (e) {
		return null;
	}
}

/**
 * 将HEX文件转换为BIN文件（适配Node.js环境）
 * 在BIN文件开头添加4K的0填充
 * @param {string} inputPath - 输入的HEX文件路径
 * @param {string} outputPath - 输出的BIN文件路径
 * @returns {Promise<void>}
 */
async function parseHexFile(inputPath, outputPath) {
    try {
        // 1. 读取HEX文件（替换原uni/鸿蒙的文件读取逻辑）
        const hexStr = fs.readFileSync(inputPath, 'utf8');
        console.log(`成功读取HEX文件: ${inputPath}`);

        // 2. 核心转换逻辑（和你移动端代码完全一致）
        const lines = hexStr.split('\n');
        const list = [];
        let totalLen = 0;
        let minAddr = -1;
        let maxAddr = -1;
        let maxAddrDataLen = 0;
        const fileStruct = {};
        fileStruct.format = 0x00;

        for (const line of lines) {
            const hexLine = line.trim();
            if (!hexLine || hexLine[0] !== ':') continue; // 跳过空行或无效行

            try {
                fileStruct.length = parseInt(hexLine.substring(1, 3), 16);
                fileStruct.offset = parseInt(hexLine.substring(3, 7), 16);
                fileStruct.type = parseInt(hexLine.substring(7, 9), 16);
                // 使用你提供的 hexString2ByteArray 方法
                fileStruct.data = hexString2ByteArray(
                    hexLine.substring(9, 9 + fileStruct.length * 2)
                );
                // 处理返回null的情况
                if (!fileStruct.data) {
                    console.warn(`行数据解析失败，跳过: ${line}`);
                    continue;
                }
                // 校验和解析（原代码有但未使用）
                const checksumStr = hexLine.substring(9 + fileStruct.length * 2, 9 + fileStruct.length * 2 + 2);
                fileStruct.check = checksumStr ? parseInt(checksumStr, 16) : 0;
            } catch (e) {
                console.warn(`跳过无效行: ${line}，错误: ${e.message}`);
                continue;
            }

            let l_addr = 0;
            const type = fileStruct.type;

            if (type === 0x00) {
                // 数据记录
                if (fileStruct.format === 0x00) {
                    l_addr = fileStruct.offset;
                } else if (fileStruct.format === 0x02) {
                    l_addr = (fileStruct.address << 4) + fileStruct.offset;
                } else if (fileStruct.format === 0x04) {
                    l_addr = (fileStruct.address << 16) + fileStruct.offset;
                } else {
                    throw new Error('Invalid format!');
                }

                // 更新地址范围
                if (minAddr < 0) minAddr = l_addr;
                else minAddr = Math.min(l_addr, minAddr);

                if (maxAddr < 0) {
                    maxAddr = l_addr;
                    maxAddrDataLen = fileStruct.data.length;
                } else {
                    maxAddr = Math.max(l_addr, maxAddr);
                    if (l_addr === maxAddr) maxAddrDataLen = fileStruct.data.length;
                }

                // 保存数据记录
                list.push({
                    addr: l_addr,
                    len: fileStruct.length,
                    data: fileStruct.data,
                });
                totalLen += fileStruct.data.length;

            } else if (type === 0x01) {
                // 文件结束记录，终止循环
                console.log('检测到HEX文件结束标记，停止解析');
                break;

            } else if (type === 0x02) {
                // 扩展段地址记录
                if (fileStruct.length !== 0x02) throw new Error('Incorrect length for extended segment address record!');
                if (fileStruct.offset !== 0x0000) throw new Error('Incorrect address for extended segment address record!');
                fileStruct.format = 0x02;
                fileStruct.address = (fileStruct.data[0] << 8) | fileStruct.data[1];

            } else if (type === 0x04) {
                // 扩展线性地址记录
                if (fileStruct.length !== 0x02) throw new Error('Incorrect length for extended linear address record!');
                if (fileStruct.offset !== 0x0000) throw new Error('Incorrect address for extended linear address record!');
                fileStruct.format = 0x04;
                fileStruct.address = (fileStruct.data[0] << 8) | fileStruct.data[1];

            } else if (type === 0x03 || type === 0x05) {
                // 起始地址记录，忽略
                continue;

            } else {
                throw new Error(`Undefined record type: 0x${type.toString(16)}`);
            }
        }

        // 3. 处理地址为空的异常情况
        if (minAddr < 0 || maxAddr < 0) {
            throw new Error('HEX文件中未解析到有效数据记录');
        }

        // 4. 计算实际大小并构建BIN数据
        console.log(`解析结果：`);
        console.log(`- 总数据长度: ${totalLen} 字节`);
        console.log(`- 最小地址: 0x${minAddr.toString(16).padStart(8, '0')}`);
        console.log(`- 最大地址: 0x${maxAddr.toString(16).padStart(8, '0')}`);

        const realSize = maxAddr - minAddr + maxAddrDataLen;
        if (realSize !== totalLen) {
            console.warn(`警告：HEX文件地址不连续！计算大小: ${realSize} 字节，实际数据长度: ${totalLen} 字节`);
        }
        const dataSize = Math.max(realSize, totalLen);

        // ===== 关键修改：构建带4K 0填充的BIN缓冲区 =====
        // 总大小 = 4K填充 + 实际数据大小
        const finalSize = PADDING_SIZE + dataSize;
        // 创建新的缓冲区，默认值就是0（Uint8Array初始化后所有元素都是0）
        const buffer2 = new Uint8Array(finalSize);
        
        // 先构建原始数据缓冲区（和原逻辑一致）
        const dataBuffer = new Uint8Array(dataSize);
        for (const element of list) {
            const offset = element.addr - minAddr;
            dataBuffer.set(element.data, offset);
        }
        
        // 将原始数据拼接到4K填充之后
        buffer2.set(dataBuffer, PADDING_SIZE);

        // 5. 写入BIN文件
        fs.writeFileSync(outputPath, buffer2);
        console.log(`BIN文件生成成功(开头已添加4K 0填充): ${outputPath}`);
        console.log(`- 4K填充大小: ${PADDING_SIZE} 字节`);
        console.log(`- 数据部分大小: ${dataSize} 字节`);
        console.log(`- BIN文件总大小: ${buffer2.length} 字节`);

    } catch (error) {
        console.error(`转换失败: ${error.message}`);
        throw error;
    }
}

// 命令行执行逻辑
function main() {
    // 获取命令行参数
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('使用方法：');
        console.log('node hex2bin.js <输入HEX文件路径> <输出BIN文件路径>');
        console.log('示例：');
        console.log('node hex2bin.js ./test.hex ./output.bin');
        process.exit(1);
    }

    const inputPath = path.resolve(args[0]);
    const outputPath = path.resolve(args[1]);

    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
        console.error(`错误：输入文件不存在 - ${inputPath}`);
        process.exit(1);
    }

    // 执行转换
    parseHexFile(inputPath, outputPath)
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

// 启动程序
main();