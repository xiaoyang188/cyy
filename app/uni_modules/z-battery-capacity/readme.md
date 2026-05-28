# z-battery-capacity


```vue
		<z-battery-capacity :battery="20"></z-battery-capacity>
		<z-battery-capacity :battery="40"></z-battery-capacity>
		<z-battery-capacity :battery="100"></z-battery-capacity>
		<z-battery-capacity percentColor="#4cd964" :battery="100"></z-battery-capacity>
		<z-battery-capacity percentColor="pink" :colors="colors" :battery="20"></z-battery-capacity>
		<z-battery-capacity percentColor="skyblue" :colors="colors" :battery="60"></z-battery-capacity>
		<z-battery-capacity percentColor="blue" :colors="colors" :battery="100"></z-battery-capacity>
```
```js
const colors = [
	{
		value: 20,
		color: 'pink'
	},
	{
		value: 60,
		color: 'skyblue'
	},
	{
		value: 100,
		color: 'blue'
	}
]
```
props

|  属性   | 说明  | 类型 | 默认值 |
|  ----  | ----  | ---- | ---- |
| battery  | 电量（0-100） | Number | 0 |
| percentColor  | 百分比字体颜色 | String |  #1c1c1c |
| batteryWidth  | 电池宽度(默认单位px) | String | 22 |
| showPercent  | 是否显示百分比 | Boolean | true |
| colors | 电量色阶(必须为升序) | Object | { "20": "red", "40": "yellow", "100": "#4cd964" } |

注意: 
电量 < 0  显示: 0
电量 > 100 显示: 100
颜色变化
电量 <= 20 (red)
电量 <= 40(yellow) 
电量 > 40 (#4cd964)
