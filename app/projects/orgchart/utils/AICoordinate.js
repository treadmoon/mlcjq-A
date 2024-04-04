import * as d3 from 'd3'

export function aiCoordinate(treeData, baseCardSize, svgWrapperSize) {
  const heightDepthMap = getHeightDepthMap(treeData)
  const locMap = {}

  // top level
  locMap[treeData.id] = {
    x: 0,
    y: 80,
    ...heightDepthMap[treeData.id],
  }

  // second level
  console.log('svgWrapperSize', svgWrapperSize)

  console.log('locMap', locMap)
}

function getHeightDepthMap(treeData) {
  const res = {}

  const tree = d3.tree().nodeSize([10, 10])

  const root = d3.hierarchy(treeData)

  tree(root)

  root.descendants().forEach((node) => {
    res[node.data.id] = {
      height: node.height,
      depth: node.depth,
    }
  })

  return res
}
