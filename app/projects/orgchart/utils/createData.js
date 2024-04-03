class CreateData {
  constructor(width, deep, idprefix = "") {
    this.width = width;
    this.deep = deep;
    this.id = 1000;
    this.idprefix = idprefix;

    this.create();

    return this.root;
  }

  getNodeData() {
    return {
      id: `${this.idprefix}${this.id++}`,
      name: getCompanyName(),
      type: Math.random() > 0.5 ? "ld" : "pg",
    };
  }

  create() {
    this.root = this.getNodeData();
    this.root.children = this.createList(1);
    this.root.hasChildren = this.root?.children?.length ?? 0;
  }

  createList(level) {
    if (level > this.deep) return;

    const list = [];

    const len = level + (this.width - level) * Math.random();

    for (let i = 0; i < len; i++) {
      const node = this.getNodeData();

      if (Math.random() > 0.4) {
        node.children = this.createList(level + 1);
        node.hasChildren = node?.children?.length ?? 0;
      } else {
        if (level === this.deep) {
          node.hasChildren = parseInt(Math.random() * 4);
        } else {
          node.hasChildren = 0;
        }
      }

      list.push(node);
    }

    return list;
  }
}

const harr = [
  "北京市",
  "Beijing",
  "天津市",
  "Tianjin",
  "上海市",
  "test",
  "wxx",
  "LAZAdada",
  "pairs",
  "ti",
];
const darr = [
  "实在是非常厉害",
  "It's very impressive.",
  "非常靠谱",
  "Very reliable",
  "实时刷新",
  "阿帕奇开源",
  "里内克司",
  "强强联合",
  "存于村互通",
  "新天下之言",
  "朴实不华丽",
  "小地方大米",
  "偶前往泊位我",
  "蚂蚁",
  "报平安",
  "海哥",
  "维新",
  "水果",
  "亚马逊僧林",
  "拉特斯拉",
  "喜欢茶",
  "下了雪",
];
const marr = [
  "科技",
  "金融",
  "医药",
  "地产",
  "电商",
  "旅游",
  "通讯通信",
  "石油",
  "农业",
  "牧业",
  "渔业",
  "养殖",
  "航空航天制造",
  "智能家居",
  "制造",
  "新能源智能汽车",
  "新能源研究",
  "互联网金融",
  "基金",
  "证券",
  "银行",
  "医院",
  "高科技芯片",
  "信息服务",
  "计算机",
  "软件",
  "诊所",
  "餐饮",
  "地摊",
];
const larr = [
  "",
  "控股集团",
  "Holding Group",
  "集团",
  "Group",
  "",
  "有限公司",
  "Company Limited",
  "公司",
  "The Company",
  "",
];

function getCompanyName() {
  return (
    harr[parseInt(Math.random() * harr.length)] +
    harr[parseInt(Math.random() * harr.length)] +
    harr[parseInt(Math.random() * harr.length)] +
    harr[parseInt(Math.random() * harr.length)] +
    harr[parseInt(Math.random() * harr.length)] +
    harr[parseInt(Math.random() * harr.length)] +
    harr[parseInt(Math.random() * harr.length)] +
    harr[parseInt(Math.random() * harr.length)] +
    darr[parseInt(Math.random() * darr.length)] +
    marr[parseInt(Math.random() * marr.length)] +
    larr[parseInt(Math.random() * larr.length)]
  );
}

export function createDataPro(width, deep, idprefix) {
  return new CreateData(width, deep - 1, idprefix);
}
