import { pinyin } from 'pinyin-pro';

export function getFirstLetter(str) {
    if (!str || typeof str !== 'string') return '#';
    try {
        const result = pinyin(str[0], {
            pattern: 'first',
            toneType: 'none',
            type: 'array'
        });
        return result && result[0] ? result[0].toUpperCase() : '#';
    } catch (e) {
        console.error('获取拼音失败:', e);
        return '#';
    }
}