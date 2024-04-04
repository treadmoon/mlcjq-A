export function getDownConfig(itChart, rotateLevel, altImg) {
  const chartData = itChart.chartDataApp.chartData
  const nodeList = []
  const linkList = []

  each(chartData)

  function each(root) {
    nodeList.push(getDownNode(root))

    if (root.children && root.children.length > 0) {
      root.children.map((child) => {
        linkList.push({
          source: getDownNode(root),
          target: getDownNode(child),
        })
        each(child)
      })
    }
  }

  const { cardModelMap, maxLoc, minLoc } = itChart.mainViewApp
  const { baseCardSize, direction } = itChart
  const rootNode = getDownNode(chartData)

  return {
    nodeList,
    linkList,
    rootNode,
    cardModelMap,
    maxLoc,
    minLoc,
    baseCardSize,
    direction,
    altImg,
    rotateLevel,
  }
}

function getDownNode(node) {
  return {
    id: node.id,
    cardSize: { ...node.cardSize },
    cardStyle: { ...node.cardStyle },
    data: {
      id: node.id,
      name: node.data.name,
      hasChildren: node.data.hasChildren,
      hasChild: node.data.hasChild,
    },
    isLeaf: node.data.isLeaf || 0,
    childLoadType: node.data.childLoadType || 0,
    load2type: node.data.load2type || 0,
    level: node.data.level,
    cardModel: node.cardModel,
    x: node.x,
    y: node.y,
  }
}
