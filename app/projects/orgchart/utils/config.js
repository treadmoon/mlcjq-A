export const width = 180;
export const height = 104;

export const baseCardSize = {
  w: width,
  h: height,
  xSpace: 24,
  ySpace: 100,
  xSpace2r: 38,
  ySpace2v: 38,
};

export const TYPE1 = Symbol("这种类型");
export const TYPE1V = Symbol("这种类型变形");
export const TYPE2 = Symbol("那种类型");
export const TYPE3 = Symbol("变种类型");

export const TYPE1THEME = {
  color: "#d9d9d9",
  borderType: "",
};
export const TYPE2THEME = {
  color: "#FFCB78",
  borderType: "5 5 5",
};

function getCardModel(node, rotateLevel) {
  if (node.data.level >= rotateLevel && rotateLevel > 0) {
    return TYPE1V;
  } else {
    return TYPE1;
  }
}

function getCardSize(node, rotateLevel) {
  if (node.data.level >= rotateLevel && rotateLevel > 0) {
    return {
      ...baseCardSize,
      w: baseCardSize.h,
      h: baseCardSize.w,
    };
  } else {
    return baseCardSize;
  }
}

function getCardStyle(node) {
  node;
  return {
    background: "#f1f1f1",
    border: TYPE1THEME.color,
    borderType: TYPE1THEME.borderType,
    radius: 2,
  };
}

export function customChartItemAttr(chartItem, rotateLevel) {
  // 卡片的背景、边框、圆角
  chartItem["cardStyle"] = getCardStyle(chartItem);
  // 卡片用哪种模板，通常只有一种
  chartItem["cardModel"] = getCardModel(chartItem, rotateLevel);
  // 卡片尺寸，默认使用baseCardSize
  chartItem["cardSize"] = getCardSize(chartItem, rotateLevel);
}

export const iconConfig = {
  fontSize: 16,
  toogleMinus: {
    unicode: "&#58891;",
    fill: "#1890FF",
    url: "./kd.png",
  },
  tooglePlus: {
    unicode: "&#58890;",
    fill: "#999",
    url: "./kd.png",
  },
  className: "iconcool",
};
