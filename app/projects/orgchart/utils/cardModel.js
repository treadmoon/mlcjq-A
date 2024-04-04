import {
  width,
  height,
  TYPE1,
  TYPE1V,
  TYPE2,
  TYPE3,
  // TYPE1THEME,
  TYPE2THEME,
} from './config'

import { createDataPro } from './createData'

import iconSrc from '../../../../public/static/images/avatar.png'

const avatar = '/static/images/avatar.png'

const toggleBtn = [
  {
    // 遮盖连线
    tag: 'rect',
    x: width / 2 - 1,
    y: height + 1,
    w: 2,
    h: 3,
    stroke: () => '#fff',
    show: ({ node }) => {
      return !!node.data.hasChild
    },
  },
  {
    // 矩形框
    tag: 'rect',
    x: (width - 46) / 2,
    y: height + 5,
    w: 46,
    h: 20,
    rx: 10,
    stroke: () => '#ccc',
    show: ({ node }) => {
      return !!node.data.hasChild
    },
  },
  {
    // 下级个数
    tag: 'text',
    x: (width - 46) / 2 - 12,
    y: height + 5,
    w: 46,
    h: 20,
    fontSize: 14,
    color: '#aaa',
    valign: 'center',
    textAnchor: 'middle',
    text: ({ node }) => {
      return [node.data.hasChildren + '']
    },
    show: ({ node }) => {
      return !!node.data.hasChild
    },
  },
  {
    // 按钮
    tag: 'icon',
    x: (width - 46) / 2 + 22,
    y: height + 8,
    fontSize: 12,
    fill: '#aaa',
    class: 'iconcool',
    src: () => {
      return `${iconSrc}`
    },
    text: ({ node }) => {
      const childNums = (node.data?.children ?? []).length
      return childNums > 0 ? ['-'] : ['+']
    },
    show: ({ node }) => {
      return !!node.data.hasChild
    },
  },
  {
    // 透明层，实际点击按钮
    tag: 'rect',
    x: (width - 46) / 2,
    y: height + 5,
    w: 46,
    h: 20,
    rx: 8,
    class: 'outcard',
    fillOpacity: () => 0,
    show: ({ node }) => {
      return !!node.data.hasChild
    },
    click: (currNode, itChart) => {
      const childNums = (currNode?.children ?? []).length
      if (childNums > 0) {
        itChart.foldData(currNode)
      } else {
        itChart.openData(currNode)
      }
      itChart.mainViewApp.chartCardApp.updateCardById(currNode.id)
    },
  },
]

export const cardModelMap = {
  [TYPE1]: [
    {
      tag: 'rect',
      x: 0,
      y: 0,
      w: width,
      h: 28,
      rx: 0,
      fill: () => '#276FF5',
      stroke: () => '#276FF5',
    },
    // 标题
    {
      tag: 'text',
      x: 4,
      y: 0,
      w: width - 8,
      h: 28,
      fontSize: 14,
      fontWeight: 600,
      color: '#fff',
      wMode: 'lr',
      valign: 'center',
      textAnchor: 'middle',
      text: ({ node: { data } }) => {
        return [data.name]
      },
    },
    // 头像
    {
      tag: 'img',
      x: 0,
      y: 35,
      w: 56,
      h: 36,
      rx: 18,
      url: () => {
        return `${avatar}`
      },
    },
    {
      tag: 'text',
      x: 64,
      y: 35,
      w: width - 68,
      h: 18,
      fontSize: 12,
      color: '#212121',
      valign: 'center',
      textAnchor: 'start',
      text: ({ node }) => {
        return [node.data.id]
      },
    },
    {
      tag: 'text',
      x: 64,
      y: 53,
      w: width - 68,
      h: 18,
      fontSize: 12,
      color: '#666',
      valign: 'center',
      textAnchor: 'start',
      text: () => {
        return ['董事长']
      },
    },
    // 分割线
    {
      tag: 'line',
      x: 9,
      y: 75,
      line: 'H168',
      stroke: '#ccc',
    },
    // 直属员工
    {
      tag: 'icon',
      x: 4,
      y: 82,
      fontSize: 16,
      fill: '#666',
      text: '&#xE609;',
      class: 'kdfont iconcool',
      hover: true,
      tips: '直属员工',
      src: () => {
        return `${iconSrc}`
      },
      follow: {
        tag: 'text',
        x: 20,
        y: 80,
        w: 70,
        h: 20,
        fontSize: 14,
        color: '#aaa',
        valign: 'center',
        textAnchor: 'middle',
        text: () => {
          return ['1112']
        },
      },
    },
    {
      tag: 'text',
      x: 20,
      y: 80,
      w: 70,
      h: 20,
      fontSize: 14,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'middle',
      text: () => {
        return ['1112']
      },
    },
    // 下属员工
    {
      tag: 'icon',
      x: 80,
      y: 82,
      fontSize: 16,
      fill: '#666',
      text: '&#xE604;',
      class: 'kdfont iconcool',
      hover: true,
      tips: '下属员工',
      src: () => {
        return `${iconSrc}`
      },
      follow: {
        tag: 'text',
        x: 106,
        y: 80,
        w: 70,
        h: 20,
        fontSize: 14,
        color: '#aaa',
        valign: 'center',
        textAnchor: 'end',
        text: () => {
          return ['36']
        },
      },
    },
    {
      tag: 'text',
      x: 96,
      y: 80,
      w: 70,
      h: 20,
      fontSize: 14,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'end',
      text: () => {
        return ['36']
      },
    },
    // 折叠按钮
    ...toggleBtn,
  ],
  [TYPE1V]: [
    {
      tag: 'rect',
      x: 0,
      y: 0,
      h: width,
      w: 28,
      rx: 0,
      fill: () => '#276FF5',
      stroke: () => '#276FF5',
    },
    // 标题
    {
      tag: 'text',
      x: 0,
      y: 4,
      h: width - 8,
      w: 28,
      fontSize: 14,
      fontWeight: 600,
      color: '#fff',
      wMode: 'tb',
      valign: 'center',
      textAnchor: 'middle',
      text: ({ node: { data } }) => {
        return [data.name]
      },
    },
    // 头像
    {
      tag: 'img',
      x: 35,
      y: 0,
      w: 36,
      h: 56,
      rx: 18,
      url: () => {
        return `${avatar}`
      },
    },
    {
      tag: 'text',
      y: 64,
      x: 35,
      h: width - 68,
      w: 18,
      fontSize: 12,
      color: '#212121',
      wMode: 'tb',
      valign: 'center',
      textAnchor: 'start',
      text: () => {
        return ['李天下']
      },
    },
    {
      tag: 'text',
      y: 64,
      x: 53,
      h: width - 68,
      w: 18,
      fontSize: 12,
      color: '#666',
      wMode: 'tb',
      valign: 'center',
      textAnchor: 'start',
      text: () => {
        return ['董事长']
      },
    },
    // 分割线
    {
      tag: 'line',
      y: 9,
      x: 75,
      line: 'V168',
      stroke: '#ccc',
    },
    // 直属员工
    {
      tag: 'icon',
      y: 8,
      x: 82,
      fontSize: 16,
      fill: '#666',
      text: '&#xE609;',
      class: 'kdfont iconcool',
      hover: true,
      src: () => {
        return `${iconSrc}`
      },
      follow: {
        tag: 'text',
        y: 24,
        x: 80,
        h: 70,
        w: 20,
        fontSize: 14,
        color: '#aaa',
        wMode: 'tb',
        valign: 'center',
        textAnchor: 'start',
        text: () => {
          return ['10']
        },
      },
    },
    {
      tag: 'text',
      y: 24,
      x: 80,
      h: 70,
      w: 20,
      fontSize: 14,
      color: '#aaa',
      wMode: 'tb',
      valign: 'center',
      textAnchor: 'start',
      text: () => {
        return ['10']
      },
    },
    // 下属员工
    {
      tag: 'icon',
      y: 90,
      x: 80,
      fontSize: 16,
      fill: '#666',
      text: '&#xE604;',
      class: 'kdfont iconcool',
      hover: true,
      src: () => {
        return `${iconSrc}`
      },
      follow: {
        tag: 'text',
        y: 106,
        x: 80,
        h: 70,
        w: 20,
        fontSize: 14,
        color: '#aaa',
        wMode: 'tb',
        valign: 'top',
        textAnchor: 'start',
        text: () => {
          return ['10']
        },
      },
    },
    {
      tag: 'text',
      y: 106,
      x: 80,
      h: 70,
      w: 20,
      fontSize: 14,
      color: '#aaa',
      wMode: 'tb',
      valign: 'top',
      textAnchor: 'start',
      text: () => {
        return ['10']
      },
    },
    // 折叠按钮
    {
      // 遮盖连线
      tag: 'rect',
      y: width / 2 - 1,
      x: height + 1,
      w: 2,
      h: 3,
      stroke: () => '#fff',
      show: ({ node }) => {
        return !!node.data.hasChild
      },
    },
    {
      // 矩形框
      tag: 'rect',
      x: (height - 46) / 2 + 5,
      y: width + 5,
      w: 46,
      h: 20,
      rx: 10,
      stroke: () => '#ccc',
      show: ({ node }) => {
        return !!node.data.hasChild
      },
    },
    {
      // 下级个数
      tag: 'text',
      x: (height - 46) / 2 - 12,
      y: width + 5,
      w: 46,
      h: 20,
      fontSize: 14,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'middle',
      text: ({ node }) => {
        return [node.data.hasChildren + '']
      },
      show: ({ node }) => {
        return !!node.data.hasChild
      },
    },
    {
      // 按钮
      tag: 'icon',
      x: (height - 46) / 2 + 20,
      y: width + 10,
      fontSize: 12,
      fill: '#aaa',
      class: 'iconcool',
      src: () => {
        return `${iconSrc}`
      },
      text: ({ node }) => {
        const childNums = (node.data?.children ?? []).length
        return childNums > 0 ? ['-'] : ['+']
      },
      show: ({ node }) => {
        return !!node.data.hasChild
      },
    },
    {
      // 透明层，实际点击按钮
      tag: 'rect',
      x: (height - 46) / 2,
      y: width + 5,
      w: 46,
      h: 20,
      rx: 8,
      class: 'outcard',
      fillOpacity: () => 0,
      show: ({ node }) => {
        return !!node.data.hasChild
      },
      click: (currNode, itChart) => {
        const childNums = (currNode?.children ?? []).length
        if (childNums > 0) {
          itChart.foldData(currNode)
        } else {
          itChart.openData(currNode)
        }
        itChart.mainViewApp.chartCardApp.updateCardById(currNode.id)
      },
    },
  ],
  [TYPE2]: [
    {
      tag: 'img',
      x: 8,
      y: 10,
      w: 60,
      h: 60,
      rx: 30,
      url: () => {
        return `${avatar}`
      },
    },
    {
      tag: 'text',
      x: 80,
      y: 10,
      w: width - 88,
      h: 60,
      fontSize: 14,
      fontWeight: 500,
      color: '#212121',
      wMode: 'lr',
      valign: 'center',
      textAnchor: 'start',
      text: (data) => {
        return ['行政组织：' + data.name]
      },
    },
    {
      tag: 'text',
      x: 10,
      y: 80,
      w: 100,
      h: 20,
      fontSize: 12,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'middle',
      text: () => {
        return ['职位：开发']
      },
    },
    {
      tag: 'text',
      x: 140,
      y: 80,
      w: 90,
      h: 20,
      fontSize: 12,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'middle',
      text: () => {
        return ['职级：T8-2']
      },
    },
  ],
  [TYPE3]: [
    {
      tag: 'rect',
      x: 1,
      y: 1,
      w: width - 2,
      h: 30,
      rx: 6,
      fill: () => '#38f',
      stroke: () => '#38f',
    },
    {
      tag: 'rect',
      x: 1,
      y: 7,
      w: width - 2,
      h: 25,
      rx: 6,
      fill: () => '#fff',
      stroke: () => '#fff',
    },
    {
      tag: 'text',
      x: 4,
      y: 4,
      w: width - 8,
      h: 30,
      fontSize: 14,
      fontWeight: 600,
      color: '#222',
      wMode: 'lr',
      valign: 'center',
      textAnchor: 'middle',
      text: (data) => {
        return [data.name]
      },
    },
    {
      tag: 'text',
      x: 10,
      y: 40,
      w: 90,
      h: 30,
      fontSize: 14,
      fontWeight: 600,
      color: '#212121',
      valign: 'center',
      textAnchor: 'middle',
      text: () => {
        return ['人员']
      },
    },
    {
      tag: 'text',
      x: 10,
      y: 70,
      w: 90,
      h: 30,
      fontSize: 14,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'middle',
      text: () => {
        return ['49']
      },
    },
    {
      tag: 'text',
      x: 140,
      y: 40,
      w: 90,
      h: 30,
      fontSize: 14,
      fontWeight: 600,
      color: '#212121',
      valign: 'center',
      textAnchor: 'middle',
      text: () => {
        return ['项目']
      },
    },
    {
      tag: 'text',
      x: 140,
      y: 70,
      w: 90,
      h: 30,
      fontSize: 14,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'middle',
      text: () => {
        return ['4']
      },
    },
    {
      tag: 'rect',
      x: (width - 46) / 2,
      y: height + 5,
      w: 46,
      h: 20,
      rx: 8,
      fill: () => '#fff',
      stroke: () => '#f00',
      show: ({ node }) => {
        return !!node.data.hasChild
      },
    },
    {
      tag: 'text',
      x: (width - 46) / 2 - 12,
      y: height + 5,
      w: 46,
      h: 20,
      fontSize: 14,
      color: '#aaa',
      valign: 'center',
      textAnchor: 'middle',
      text: (node) => {
        return [node.hasChildren + '']
      },
      show: ({ node }) => {
        return !!node.data.hasChild
      },
    },
    {
      tag: 'icon',
      x: (width - 46) / 2 + 20,
      y: height + 10,
      fontSize: 12,
      fill: '#aaa',
      class: 'iconcool',
      text: ({ node }) => {
        const childNums = (node.data?.children ?? []).length
        return childNums > 0 ? ['&#58887;'] : ['+']
      },
      show: ({ node }) => {
        return !!node.data.hasChild
      },
    },
    {
      tag: 'rect',
      x: (width - 46) / 2,
      y: height + 5,
      w: 46,
      h: 20,
      rx: 8,
      fillOpacity: () => 0,
      show: ({ node }) => {
        return !!node.data.hasChild
      },
      click: (currNode, itChart) => {
        const childNums = (currNode?.children ?? []).length
        if (childNums > 0) {
          itChart.foldData(currNode)
        } else {
          itChart.openData(currNode)
        }
        itChart.mainViewApp.chartCardApp.updateCardById(currNode.id)
      },
    },
  ],
}

export const preViewCardModelMap = {
  [TYPE1]: [
    {
      tag: 'rect',
      x: 0,
      y: 0,
      w: width,
      h: height,
      rx: 0,
      fill: () => '#276FF5',
      fillOpacity: 0.5,
      // stroke: () => "#276FF5",
    },
  ],
  [TYPE1V]: [
    {
      tag: 'rect',
      x: 0,
      y: 0,
      w: width,
      h: height,
      rx: 0,
      fill: () => '#276FF5',
      fillOpacity: 0.5,
      // stroke: () => "#276FF5",
    },
  ],
  [TYPE2]: [
    {
      tag: 'text',
      x: 8,
      y: 8,
      w: width - 16,
      h: height - 16,
      fontSize: 36,
      fontWeight: 600,
      color: TYPE2THEME.color,
      wMode: 'lr',
      valign: 'center',
      textAnchor: 'middle',
      text: (data) => {
        return [data.name]
      },
    },
  ],
}

export const hoverMenuModels = [
  {
    tag: 'rect',
    x: 1,
    y: 1,
    w: 28,
    h: 30,
    rx: 0,
    fill: '#fff',
    stroke: 'rgba(204,204,204)',
  },
  {
    tag: 'text',
    x: 4,
    y: 16,
    w: 28,
    h: 30,
    fontSize: 12,
    color: '#38f',
    text: () => ['==='],
  },
  {
    tag: 'icon',
    id: 'descLink',
    x: 8,
    y: 8,
    w: 16,
    h: 16,
    fontSize: 12,
    fill: '#38f',
    text: () => ['&#58887;'],
    class: 'iconcool',
    show: () => true,
    click: (itChart, currNode) => {
      console.log('点击', itChart, currNode)
    },
  },
]

export const menuModels = [
  {
    tag: 'rect',
    x: 1,
    y: 1,
    w: 28,
    h: 30,
    rx: 0,
    fill: '#fff',
    stroke: 'rgba(204,204,204)',
  },
  {
    tag: 'icon',
    id: 'descLink',
    x: 8,
    y: 8,
    w: 16,
    h: 16,
    fontSize: 12,
    fill: '#38f',
    text: () => ['+'],
    class: 'iconcool',
    show: () => true,
    click: (itChart, currNode) => {
      const newNode = createDataPro(1, 1, currNode.id)

      // 如果有子元素,则父元素的childLoadType=0
      if (currNode.parent) {
        itChart.setTreeDataAttr([currNode.parent.id], 'childLoadType', 0)
      }

      itChart.cardMenuAdd(newNode, currNode.id)
    },
  },
]

export function getVCardModelValign(textAnchor = 'start') {
  switch (textAnchor) {
    case 'start':
      return 'top'
    case 'middle':
      return 'center'
    case 'end':
      return 'bottom'
  }
}
export function getVCardModelTextAnchor(valign = 'start') {
  switch (valign) {
    case 'top':
      return 'start'
    case 'center':
      return 'middle'
    case 'bottom':
      return 'end'
  }
}
