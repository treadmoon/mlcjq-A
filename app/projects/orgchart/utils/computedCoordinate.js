import * as d3 from 'd3'
// import { aiCoordinate } from "./AICoordinate";

export function computedCoordinate(
  { treeData, baseCardSize, chartWrapperSize: svgWrapperSize, direction = 1 },
  rotateLevel
) {
  // aiCoordinate(treeData, baseCardSize, svgWrapperSize);

  console.log('自定义坐标')

  direction = parseInt(direction)
  switch (direction) {
    case 1:
      return beforeDirType1(treeData, baseCardSize, rotateLevel)
    case 2:
      return dirType2(treeData, baseCardSize, svgWrapperSize)
    case 3:
      return dirType3(treeData, baseCardSize, svgWrapperSize)
    case 4:
      return dirType4(treeData, baseCardSize, svgWrapperSize)
  }
}

function beforeDirType1(treeData, baseCardSize, rotateLevel = -1) {
  if (rotateLevel < 0) {
    // console.log("常规坐标", rotateLevel);
    // console.log(dirType1(treeData, baseCardSize));
    return dirType1(treeData, baseCardSize)
  } else {
    // console.log("纵横混合", rotateLevel);
    return floorHV(treeData, baseCardSize, rotateLevel)
  }
}

function dirType1(treeData, baseCardSize) {
  const heightMap = getHeightMap(treeData)

  const baseLocMap = getBaseLoc(treeData, baseCardSize, heightMap)

  specifDataLoc(treeData, baseCardSize, baseLocMap, heightMap)

  setLeafDataLoc(treeData, baseCardSize, baseLocMap, heightMap)

  return baseLocMap
}

function getHeightMap(treeData) {
  const res = {}

  const tree = d3.tree().nodeSize([10, 10])

  const root = d3.hierarchy(treeData)

  tree(root)

  root.descendants().forEach((node) => {
    res[node.data.id] = node.height
  })

  return res
}

// 侧节点引起的纵左边下移
function setLeafDataLoc(treeData, baseCardSize, baseLocMap, heightMap) {
  each([treeData], 0)

  //offsetY 纵向叠加偏移
  function each(list, offsetY) {
    let maxOffsetY = 0

    list.map((item) => {
      if (!item.isLeaf || item.isLeaf === 0) {
        baseLocMap[item.id].y += offsetY
      }

      if (item.children && item.children.length > 0) {
        maxOffsetY = Math.max(
          conputedChildLeafLoc(item, baseCardSize, baseLocMap, heightMap),
          maxOffsetY
        )
      }
    })

    offsetY += maxOffsetY

    list.map((item) => {
      if (item.children && item.children.length > 0) {
        each(item.children, offsetY)
      }
    })
  }
}

function specifDataLoc(treeData, baseCardSize, baseLocMap, heightMap) {
  each([treeData])

  function each(list) {
    list.map((item) => {
      if (heightMap[item.id] === 1) {
        if (item.childLoadType === 1) {
          computedSigle(item, baseCardSize, baseLocMap, heightMap)
        }
        if (item.childLoadType === 2) {
          computedDouble(item, baseCardSize, baseLocMap, heightMap)
        }
      } else if (item.children && item.children.length > 0) {
        each(item.children)
      }
    })
  }
}

//单排子坐标
function computedSigle(parent, baseCardSize, baseLocMap, heightMap) {
  const pnode = baseLocMap[parent.id]

  let step = 1

  for (let i = 0; i < parent.children.length; i++) {
    const cnode = parent.children[i]
    if (!cnode.isLeaf || cnode.isLeaf === 0) {
      baseLocMap[cnode.id] = {
        x: pnode.x + baseCardSize.xSpace / 2,
        y: pnode.y + (baseCardSize.h + baseCardSize.ySpace2v) * step++,
        // y: pnode.y + (baseCardSize.h + baseCardSize.ySpace) * step++,
        depth: pnode.depth + 1,
        height: heightMap[cnode.id],
      }
    }
  }
}

//双排子坐标
function computedDouble(parent, baseCardSize, baseLocMap, heightMap) {
  const pnode = baseLocMap[parent.id]
  const len = parent.children.length
  let leftStep = 1
  let rightStep = 1

  for (let i = 0; i < len; i++) {
    const cnode = parent.children[i]

    if (!cnode.isLeaf || cnode.isLeaf === 0) {
      // 左
      if (cnode.load2type === 1) {
        baseLocMap[cnode.id] = {
          x: pnode.x + (-1 * (baseCardSize.w + baseCardSize.xSpace)) / 2,
          y: pnode.y + (baseCardSize.h + baseCardSize.ySpace2v) * leftStep++,
          // y: pnode.y + (baseCardSize.h + baseCardSize.ySpace) * (leftStep++),
          depth: pnode.depth + 1,
          height: heightMap[cnode.id],
        }
      }

      // 右
      if (cnode.load2type === 2) {
        baseLocMap[cnode.id] = {
          x: pnode.x + (baseCardSize.w + baseCardSize.xSpace) / 2,
          y: pnode.y + (baseCardSize.h + baseCardSize.ySpace2v) * rightStep++,
          // y: pnode.y + (baseCardSize.h + baseCardSize.ySpace) * (rightStep++),
          depth: pnode.depth + 1,
          height: heightMap[cnode.id],
        }
      }
    }
  }
}

// 侧节点坐标、侧节点总高度
function conputedChildLeafLoc(root, baseCardSize, baseLocMap, heightMap) {
  const baseLoc = baseLocMap[root.id]
  let locY = 0
  let locX = 0
  let leftLen = 0
  let rightLen = 0

  root.children.map((item) => {
    // 左侧
    if (item.isLeaf === 1) {
      leftLen++
      locX = baseLoc.x - baseCardSize.w / 2 - baseCardSize.xSpace - baseCardSize.w / 2
      locY = baseLoc.y + (baseCardSize.h + baseCardSize.ySpace2v) * leftLen
      // locY = baseLoc.y + (baseCardSize.h + baseCardSize.ySpace) * leftLen
    }

    // 右侧
    if (item.isLeaf === 2) {
      rightLen++
      locX = baseLoc.x + baseCardSize.w / 2 + baseCardSize.xSpace + baseCardSize.w / 2
      locY = baseLoc.y + (baseCardSize.h + baseCardSize.ySpace2v) * rightLen
      // locY = baseLoc.y + (baseCardSize.h + baseCardSize.ySpace) * rightLen
    }

    if (item.isLeaf === 1 || item.isLeaf === 2) {
      baseLocMap[item.id] = {
        x: locX,
        y: locY,
        depth: baseLoc.depth + 1,
        height: heightMap[item.id],
      }
    }
  })

  return (
    Math.max(rightLen, leftLen) * (baseCardSize.h + baseCardSize.ySpace) - baseCardSize.ySpace2v / 2
  )
}

function getBaseLoc(treeData, baseCardSize, heightMap) {
  const baseTree = getBaseTree(treeData, heightMap, (item) => {
    return !item.isLeaf
  })

  const res = {}

  const tree = d3
    .tree()
    .nodeSize([baseCardSize.w + baseCardSize.xSpace, baseCardSize.h + baseCardSize.ySpace])

  const root = d3.hierarchy(baseTree)

  tree(root)

  root.descendants().forEach((node) => {
    res[node.data.id] = {
      x: node['x'],
      y: node['y'] + baseCardSize.h / 2 + 20,
      depth: node.depth,
      height: heightMap[node.data.id],
    }
  })

  return res
}

function getBaseTree(treeData, heightMap, isNotLeafItem) {
  function each(list) {
    const newList = []
    let leafLen = 0

    for (let i = 0; i < list.length; i++) {
      const item = list[i]

      if (item.children && item.children.length > 0) {
        const eachRes = each(item.children)
        //剔除了侧节点
        item.children = eachRes.newList
        //如果有侧节点 需要补充占位节点
        if (eachRes.leafLen > 0) {
          if (item.children.length === 0) {
            const seatNum = 3
            for (let j = 0; j < seatNum; j++) {
              item.children.push({
                id: item.id + '_test' + j,
              })
            }
          }

          if (item.children.length === 1 || item.children.length === 2) {
            item.children.unshift({
              id: item.id + '_test001',
            })
            item.children.push({
              id: item.id + '_test002',
            })
          }
        }

        //高度等1的节点，后代挂载方式才能为：单排、双排
        if (heightMap[item.id] === 1) {
          //单排
          if (item.childLoadType === 1) {
            //有侧节点，保留足够的侧节点宽度（3个节点宽）
            if (eachRes.leafLen > 0) {
              item.children.splice(3)
            } else {
              //只保留单排宽度
              seatSingle(item)
            }
          }
          //双排
          if (item.childLoadType === 2) {
            //有侧节点，保留足够的侧节点宽度（3个节点宽）
            if (eachRes.leafLen > 0) {
              item.children.splice(3)
            } else {
              //只保留双排宽度
              seatDouble(item)
            }
          }
        }

        item._children = item.children
      }

      if (isNotLeafItem(item)) {
        newList.push(item)
      } else {
        leafLen++
      }
    }

    return { newList, leafLen }
  }

  return each([deepClone(treeData)]).newList[0]
}

//补充单排子节点高度
function seatSingle(item) {
  let rest = item.children.splice(1)

  let proxy = item.children[0]

  while (rest.length > 0) {
    rest.shift()
    proxy.children = [
      {
        id: item.id + '_test' + rest.length,
      },
    ]
    proxy = proxy.children[0]
  }
}

//补充双排子节点高度
function seatDouble(item) {
  if (item.children.length === 1) {
    item.children.push({
      id: item.id + '_other_c',
    })
  }

  let rest = item.children.splice(2)

  let proxy1 = item.children[0]
  let proxy2 = item.children[1]

  while (rest.length > 0) {
    rest.shift()
    proxy1.children = [
      {
        id: item.id + '_test' + rest.length,
      },
    ]
    proxy1 = proxy1.children[0]

    rest.shift()
    proxy2.children = [
      {
        id: item.id + '_test' + rest.length,
      },
    ]
    proxy2 = proxy2.children[0]
  }
}

function dirType2(treeData, baseCardSize, svgWrapperSize) {
  const res = {}

  const tree = d3
    .tree()
    .nodeSize([baseCardSize.h + baseCardSize.ySpace, baseCardSize.w + baseCardSize.xSpace])

  const root = d3.hierarchy(treeData)

  tree(root)

  let minY = Infinity

  root.descendants().forEach((node) => {
    minY = Math.min(minY, node.x)
  })

  root.descendants().forEach((node) => {
    res[node.data.id] = {
      x: node['y'] - svgWrapperSize.w / 2 + baseCardSize.w / 2 + 20,
      y: node['x'] + svgWrapperSize.h / 2 + baseCardSize.h / 2 + 1,
      // y: node['x'] - minY + baseCardSize.h / 2 + 1,
      depth: node.depth,
    }
  })

  return res
}

function dirType3(treeData, baseCardSize, svgWrapperSize) {
  const res = {}

  const locMap = beforeDirType1(treeData, baseCardSize)

  for (let key in locMap) {
    const item = locMap[key]
    res[key] = {
      ...item,
      y: -item.y + svgWrapperSize.h,
    }
  }

  return res
}

function dirType4(treeData, baseCardSize, svgWrapperSize) {
  const res = {}

  const tree = d3
    .tree()
    .nodeSize([baseCardSize.h + baseCardSize.ySpace, baseCardSize.w + baseCardSize.xSpace])

  const root = d3.hierarchy(treeData)

  tree(root)

  let minY = Infinity

  root.descendants().forEach((node) => {
    minY = Math.min(minY, node.x)
  })

  root.descendants().forEach((node) => {
    res[node.data.id] = {
      x: -(node['y'] - svgWrapperSize.w / 2 + baseCardSize.w / 2 + 20),
      // y: node['x'] - minY + baseCardSize.h / 2 + 1,
      y: node['x'] + svgWrapperSize.h / 2 + baseCardSize.h / 2 + 1,
      depth: node.depth,
    }
  })

  return res
}

//分层纵、横向 horizontal vertical
function floorHV(treeData, baseCardSize, changeLevel) {
  return getAllVLocMap(treeData, baseCardSize, changeLevel)
}

function getAllVLocMap(treeData, baseCardSize, changeLevel) {
  const res = []

  const tree = d3
    .tree()
    .nodeSize([baseCardSize.h + baseCardSize.xSpace2r, baseCardSize.w + baseCardSize.ySpace])

  const myTree = seatTree2v(treeData, baseCardSize, changeLevel)

  const root = d3.hierarchy(myTree)

  tree(root)

  root.descendants().forEach((node) => {
    res[node.data.id] = {
      x: node['x'],
      y: node['y'] + baseCardSize.h / 2 + 20,
      depth: node.depth,
    }
  })

  optLocMap(myTree, res, changeLevel, baseCardSize)

  return res
}

function optLocMap(myTree, res, changeLevel, baseCardSize) {
  each([myTree], 0, 0)

  function each(list, level, offsetY) {
    if (level <= changeLevel && level > 0) {
      offsetY += baseCardSize.h - baseCardSize.w
    }
    list.map((item) => {
      res[item.id].y += offsetY

      if (item.children && item.children.length > 0) {
        each(item.children, level + 1, offsetY)
      }
    })
  }
}

function seatTree2v(tree, baseCardSize, changeLevel) {
  const myTree = deepClone(tree)

  each([myTree], 0)

  function each(list, level) {
    const newList = []

    let addCurrNum = Math.ceil(baseCardSize.w / (baseCardSize.h + baseCardSize.xSpace2r))

    list.map((item) => {
      if (item.children && item.children.length > 0) {
        item.children = each(item.children, level + 1)
      }

      if (level < changeLevel) {
        for (let j = 0; j < addCurrNum / 2; j++) {
          newList.push({ id: item.id + 'seatforpreL' + j })
        }
        newList.push(item)
        for (let j = 0; j < addCurrNum / 2; j++) {
          newList.push({ id: item.id + 'seatforpreR' + j })
        }
      } else {
        newList.push(item)
      }

      item._children = item.children
    })
    return newList
  }

  return myTree
}

function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  if (cache.get(obj)) return cache.get(obj) // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
  let cloneObj = new obj.constructor() // 使用对象所属的构造函数创建一个新对象
  cache.set(obj, cloneObj) // 缓存对象，用于循环引用的情况

  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache) // 递归拷贝
    }
  }
  return cloneObj
}
