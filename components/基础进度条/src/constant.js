const generateColor = (start, final) => {
	return {
		type: 'linear',
		angle: 90,
		colorStops: [
			{ offset: 0, color: start },
			{ offset: 1, color: final },
		],
	}
}
export const COLORSPLIT = {
	0: generateColor('#FF96BF', '#F53D5E'),
	0.3: generateColor('#E4E46B', '#F0A846'),
	0.6: generateColor('#57E8FC', '#7F47F8'),
	0.8: generateColor('#95F4D0', '#18D5E3'),
	1: generateColor('#75DCFB', '#0C78E3'),
}

export const PLACEMENTMAP = {
	left: '左侧',
	top: '上方',
	right: '右侧',
	bottom: '下方',
}

export const PLACEMENT = Object.keys(PLACEMENTMAP);

export const NUMBERPLACEMENTMAP = {
  right: '右侧',
  after: '跟随进度条',
  inner: '内部',
  'inner-left': '内部靠左',
}

export const NUMBERPLACEMENT = Object.keys(NUMBERPLACEMENTMAP)
