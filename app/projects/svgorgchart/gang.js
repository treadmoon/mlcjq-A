import * as d3 from 'd3'

export class TreeChart {
  constructor({ data = {}, htmlDom, selectCardInfo, cardModel = {}, cardInfo = {} } = {}) {
    this.data = data
    this.selectCardInfo = selectCardInfo
    this.cardModel = cardModel
    this.cardInfo = cardInfo
    this.htmlDom = htmlDom
    this.animateCount = 20
    this.animateStart = 1

    this.colorId = 99
    this.canvasObj = {
      0: {
        colorId: 0,
        tag: 'canvas',
        on: '',
      },
    }

    this.initData()
    this.initNode()
  }
  init() {
    this.initChart()
  }
  initData() {
    this.tree = d3
      .tree()
      .nodeSize([
        this.cardModel.width + this.cardModel.rx,
        this.cardModel.height + this.cardModel.ry,
      ])

    this.canvas = new paintCanvas({
      htmlDom: document.getElementById('chartWrapper'),
      treeChart: this,
    })

    this.proceData(this.data)
  }
  proceData(obj) {
    if (obj.children) {
      obj._children = obj.children
      obj.children.map((childobj) => this.proceData(childobj))
    }
  }
  initNode() {
    this.root = d3.hierarchy(this.data)
    this.tree(this.root)
    this.nodes = this.root.descendants()
    this.links = this.root.links()

    console.log('节点数：', this.nodes.length)

    this.nodes.forEach((node) => {
      node.id = node.data.id

      node.y -= this.htmlDom.offsetHeight / 2 - this.cardModel.height
      node._children = node.children

      node.x0 = node.x
      node.y0 = node.y
    })
  }
  initChart() {
    this.links.forEach((link) => {
      this.canvas.path(
        {
          x: link.source.x + this.cardModel.width / 2,
          y: link.source.y + this.cardModel.height,
        },
        {
          x: link.target.x + this.cardModel.width / 2,
          y: link.target.y,
        },
        '#ccc'
      )
    })
    this.nodes.forEach((node) => {
      this.paintCard(node)
    })
  }
  upChart() {
    this.colorId = 99
    this.canvasObj = {
      0: {
        colorId: 0,
        tag: 'canvas',
        on: '',
      },
    }
    this.canvas.clearRectCanvas()
    this.initChart()
  }
  toogleNode(currNode) {
    //是否折叠
    let fold = !!currNode.children
    //当前node的对象
    let currObj = this.currDataObj(currNode, this.data)
    //处理data
    if (fold) {
      currObj.children = null
    } else {
      currObj.children = currObj._children
      //如果是展开，释放当前node的children
      currNode.children = currNode._children
      this.nodes = this.root.descendants()
      this.links = this.root.links()
    }

    //计算data变换后的坐标点
    let newRoot = d3.hierarchy(this.data)
    this.tree(newRoot)
    this.upNodeLoc(currNode, this.getRootObj(newRoot))
    //触发动画
    this.animateNode(currNode, fold)
  }
  selectCard(node) {
    this.selectId = node ? node.id : null
    this.upChart()
  }
  hoverToogle(node) {
    this.hoverToogleId = node ? node.id : null
    this.upChart()
  }
  animateNode(currNode, fold, startTime) {
    this.stepNodeLoc(this.nodes)
    if (this.animateStart >= this.animateCount) {
      this.animateStart = 1
      //隐藏折叠节点
      if (fold) {
        currNode.children = currNode.children ? null : currNode._children
        this.nodes = this.root.descendants()
        this.links = this.root.links()
        this.upChart()
      }
    } else {
      this.animateStart++
      requestAnimationFrame(() => {
        this.animateNode(currNode, fold, startTime)
      })
    }
  }
  stepNodeLoc(list) {
    list.map((node) => {
      node.x -= node.rx / this.animateCount
      node.y -= node.ry / this.animateCount
    })
    this.upChart()
  }
  upNodeLoc(currNode, newRootObj) {
    this.nodes.forEach((node) => {
      let newNode
      if (newRootObj[node.id]) {
        newNode = newRootObj[node.id]
        node.depth = newNode.depth
        node.height = newNode.height
      } else {
        newNode = newRootObj[currNode.id]
      }
      node.x1 = newNode.x
      node.y1 = newNode.y
      node.rx = node.x - node.x1
      node.ry = node.y - node.y1
    })
  }
  currDataObj(node, treeData) {
    let pids = this.getPids(node)
    let nodeObj = treeData
    let pid = pids.pop()
    if (nodeObj.id === pid) {
      while ((pid = pids.pop())) {
        nodeObj.children.map((item, i) => {
          if (item.id === pid) {
            nodeObj = item
          }
        })
      }
    }
    return nodeObj
  }
  getPids(node) {
    let pids = []
    pids.push(node.id)
    while ((node = node.parent)) {
      pids.push(node.id)
    }
    return pids
  }
  getRootObj(root) {
    let rootObj = {}
    root.descendants().forEach((node) => {
      node.id = node.data.id
      node.y -= this.htmlDom.offsetHeight / 2 - this.cardModel.height
      rootObj[node.id] = node
    })
    return rootObj
  }
  paintCard(node) {
    this.paintRect(node)

    this.cardInfo[this.selectCardInfo(node)].map((info) => {
      this.paintText(node, info)
    })

    this.paintToogle(node)
  }
  paintRect(node) {
    let colorId = this.colorId++
    this.canvasObj[colorId] = {
      node,
      colorId,
      tag: 'rect',
      config: {
        x: 0,
        y: 0,
        w: this.cardModel.width,
        h: this.cardModel.height,
        fillStyle: '#fff',
      },
    }
    this.canvas.rect(this.canvasObj[colorId])
  }
  paintText(node, info) {
    let colorId = this.colorId++
    this.canvasObj[colorId] = {
      node,
      colorId,
      tag: 'text',
      config: info.config,
      info,
    }
    this.canvas.text(this.canvasObj[colorId])
  }
  paintToogle(node) {
    if (!node._children) return
    let colorId = this.colorId++
    this.canvasObj[colorId] = {
      node,
      colorId,
      tag: 'toogle',
    }
    this.canvas.toogle(this.canvasObj[colorId])
  }
}

// 1.记录要绘制的内容，如上方的this.canvasObj；
// 2.colorId是一个递增的数字，这个数字可以转换为rgb值，作为填充色
// 3.用这套配置，分别绘制展示图层、颜色图层
// 4.点击获取填充色，反推出colorId。由colorId得到需要操作的元素

class paintCanvas {
  constructor({ htmlDom, treeChart } = {}) {
    this.htmlDom = htmlDom
    this.treeChart = treeChart
    this.initCanvas()
  }
  initCanvas() {
    this.htmlDom.innerHTML = `<div style="position: relative;">
            <canvas id="gangCanvas"  style="opacity: 1;z-index: 1;position: absolute;left: 0;top: 0;background-color:#fff; "></canvas>
            <canvas id="colorCanvas" style="opacity: 0;z-index: 2;position: absolute;left: 0;top: 0;"></canvas>
        </div>`

    this.gangCanvas = document.getElementById('gangCanvas')
    this.gangCtx = this.gangCanvas.getContext('2d')
    this.setCanvas(this.gangCanvas, this.gangCtx)

    this.colorCanvas = document.getElementById('colorCanvas')
    this.colorCtx = this.colorCanvas.getContext('2d')
    this.setCanvas(this.colorCanvas, this.colorCtx)

    this.isMouseDown = false
    this.zoom = 1
    this.curColorId = null

    this.colorCanvas.onclick = (e) => {
      let canvasObj = this.treeChart.canvasObj[this.colorId(e)]
      // toogle
      this.treeChart.selectCard(canvasObj.node)

      if (canvasObj.tag === 'toogle') {
        if (canvasObj.node && canvasObj.node._children) {
          this.treeChart.toogleNode(canvasObj.node)
        }
      }

      if (canvasObj.info && canvasObj.info.on === 'click') {
        canvasObj.info.bind(canvasObj.node)
      }
    }

    this.colorCanvas.onmousedown = (e) => {
      // console.log("down");
      // this.colorCanvas.style.cursor = "move"
      this.isMouseDown = true
    }

    this.colorCanvas.onmousewheel = (e) => {
      let scale = 1 + (e.deltaY < 0 ? 0.1 : -0.1)
      this.zoom *= scale
      this.gangCtx.scale(scale, scale)
      this.colorCtx.scale(scale, scale)
      this.treeChart.upChart()
    }

    this.colorCanvas.onmousemove = (e) => {
      let canvasObj = this.treeChart.canvasObj[this.colorId(e)]
      let rx = e.movementX / this.zoom / this.ratio
      let ry = e.movementY / this.zoom / this.ratio

      if (this.isMouseDown) {
        if (this.colorId(e) === 0) {
          //拖拽整体
          this.gangCtx.translate(rx, ry)
          this.colorCtx.translate(rx, ry)
          this.treeChart.upChart()
        } else {
          //拖拽节点
          if (canvasObj) {
            canvasObj.node.x += rx
            canvasObj.node.y += ry
          }
          this.treeChart.upChart()
        }
      }

      if (canvasObj && canvasObj.tag === 'canvas') {
        this.colorCanvas.style.cursor = 'default'
      } else {
        this.colorCanvas.style.cursor = 'pointer'
      }

      if (canvasObj && canvasObj.tag === 'toogle') {
        this.treeChart.hoverToogle(canvasObj.node)
      } else {
        this.treeChart.hoverToogle(null)
      }
    }

    this.colorCanvas.onmouseup = (e) => {
      // console.log("up");
      this.isMouseDown = false
      this.colorCanvas.style.cursor = 'default'
    }

    this.colorCanvas.onmouseout = (e) => {
      // console.log("out");
      this.isMouseDown = false
      this.colorCanvas.style.cursor = 'default'
    }
  }
  setCanvas(canvas, ctx) {
    let dpr = window.devicePixelRatio || 1
    let bsr =
      ctx['webkitBackingStorePixelRatio'] ||
      ctx['mozBackingStorePixelRatio'] ||
      ctx['msBackingStorePixelRatio'] ||
      ctx['oBackingStorePixelRatio'] ||
      ctx['backingStorePixelRatio'] ||
      1
    this.ratio = dpr / bsr

    canvas.width = this.htmlDom.offsetWidth * this.ratio
    canvas.height = this.htmlDom.offsetHeight * this.ratio

    canvas.style.width = this.htmlDom.offsetWidth + 'px'
    canvas.style.height = this.htmlDom.offsetHeight + 'px'

    this.canvasLoc = {
      x: canvas.width / 2 - this.treeChart.cardModel.width,
      y: canvas.height / 2,
    }

    canvas
      .getContext('2d')
      .setTransform(this.ratio, 0, 0, this.ratio, this.canvasLoc.x, this.canvasLoc.y)
  }
  clearRectCanvas() {
    this.gangCtx.fillRect(-99999, -99999, 999999, 999999)
    this.gangCtx.clearRect(-99999, -99999, 999999, 999999)
    this.gangCtx.width = this.gangCtx.width

    this.colorCtx.fillRect(-99999, -99999, 999999, 999999)
    this.colorCtx.clearRect(-99999, -99999, 999999, 999999)
    this.colorCtx.width = this.colorCtx.width
  }
  rect(canvasObj) {
    let config = canvasObj.config
    let node = canvasObj.node
    let ctx = this.gangCtx
    let strokeStyle = node.id == this.treeChart.selectId ? '#38f' : '#fff'

    //阴影
    if (node.id !== this.treeChart.selectId) {
      ctx.shadowColor = '#bbb'
      ctx.shadowBlur = 3
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
    }

    //填充
    // ctx.fillStyle = "#fff";
    // ctx.fillRect(node.x + config.x, node.y + config.y, config.w, config.h);

    this.drawRoundRect(
      ctx,
      node.x + config.x,
      node.y + config.y,
      config.w,
      config.h,
      5,
      '#fff',
      strokeStyle
    )

    this.paintColor({
      x: node.x + config.x,
      y: node.y + config.y,
      colorId: canvasObj.colorId,
      w: config.w,
      h: config.h,
    })
  }
  text(canvasObj) {
    let config = canvasObj.info.config
    let node = canvasObj.node
    let ctx = this.gangCtx

    let linenum = config.linenum
    let text = canvasObj.info.text(node)
    let textBoxLen = Math.floor((this.treeChart.cardModel.width - 2 * config.x) / config.fontSize)
    let textMaxLen = textBoxLen * config.linenum
    let textLen = text.length

    let textArr = this.getTextArr(text, textLen, textBoxLen, linenum)
    ctx.font =
      config.fontSize +
      'px Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif'
    ctx.fillStyle =
      typeof config.fillStyle === 'function' ? config.fillStyle(node) : config.fillStyle
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    textArr.map((txt, index) => {
      ctx.fillText(
        txt,
        node.x + config.x,
        node.y +
          config.y +
          config.fontSize * index +
          ((linenum - textArr.length) * config.fontSize) / 2
      )
    })

    // 颜色区，都是绘制一个色块
    this.paintColor({
      x: node.x + config.x,
      y: node.y + config.y - config.fontSize + ((linenum - textArr.length) * config.fontSize) / 2,
      colorId: canvasObj.colorId,
      w: textLen < textBoxLen ? textLen * config.fontSize : textBoxLen * config.fontSize,
      h: config.fontSize * 1.2 * textArr.length,
    })
  }
  getTextArr(text, textLen, textBoxLen, linenum) {
    let res = []
    let start = 0
    linenum--
    while (textLen > textBoxLen) {
      res.push(text.slice(start, start + textBoxLen))
      textLen -= textBoxLen
      start += textBoxLen
    }
    res.push(text.slice(start, start + textBoxLen))
    if (res[linenum] && res[linenum].length === textBoxLen) {
      res[linenum] = res[linenum].slice(0, textBoxLen - 2) + '……'
    }
    return res.splice(0, linenum + 1)
  }
  toogle(canvasObj) {
    let node = canvasObj.node
    let ctx = this.gangCtx
    let r = 8
    let arcX = node.x + this.treeChart.cardModel.width / 2
    let arcY = node.y + this.treeChart.cardModel.height

    let strokeStyle = node.id === this.treeChart.hoverToogleId ? '#555' : '#aaa'
    //圆
    ctx.beginPath()
    ctx.arc(arcX, arcY, r, 0, Math.PI * 2, true)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.strokeStyle = strokeStyle
    ctx.stroke()

    //横线
    ctx.beginPath()
    ctx.moveTo(arcX - r / 2, arcY)
    ctx.lineTo(arcX + r / 2, arcY)
    ctx.stroke()

    //竖线
    if (!node.children) {
      ctx.beginPath()
      ctx.moveTo(arcX, arcY - r / 2)
      ctx.lineTo(arcX, arcY + r / 2)
      ctx.stroke()
    }

    let colorR = r
    this.paintColor({
      x: arcX - colorR,
      y: arcY - colorR,
      colorId: canvasObj.colorId,
      w: colorR * 2,
      h: colorR * 2,
    })
  }
  path(s, t, color) {
    let ctx = this.gangCtx

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(s.x, s.y)
    ctx.lineTo(s.x, s.y + (t.y - s.y) / 2)
    ctx.lineTo(t.x, s.y + (t.y - s.y) / 2)
    ctx.lineTo(t.x, t.y)
    ctx.stroke()
  }
  drawRoundRect(ctx, x, y, width, height, radius, fillStyle, strokeStyle) {
    ctx.beginPath()
    ctx.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2)
    ctx.lineTo(width - radius + x, y)
    ctx.arc(width - radius + x, radius + y, radius, (Math.PI * 3) / 2, Math.PI * 2)
    ctx.lineTo(width + x, height + y - radius)
    ctx.arc(width - radius + x, height - radius + y, radius, 0, (Math.PI * 1) / 2)
    ctx.lineTo(radius + x, height + y)
    ctx.arc(radius + x, height - radius + y, radius, (Math.PI * 1) / 2, Math.PI)
    ctx.closePath()

    ctx.strokeStyle = strokeStyle
    ctx.stroke()

    ctx.fillStyle = fillStyle
    ctx.fill()
  }
  paintColor(param) {
    //填充
    this.colorCtx.fillStyle = this.utilColor(param.colorId)
    this.colorCtx.fillRect(param.x, param.y, param.w, param.h)
  }
  utilColor(colorId) {
    let r = Math.floor(colorId / 255 / 255)
    colorId -= r * 255 * 255
    let g = Math.floor(colorId / 255)
    colorId -= g * 255
    let b = colorId
    return `rgba(${r},${g},${b},1)`
  }
  colorId(e) {
    let imgData = this.colorCtx.getImageData(e.offsetX * this.ratio, e.offsetY * this.ratio, 1, 1)
    return imgData.data[0] * 255 * 255 + imgData.data[1] * 255 + imgData.data[2]
  }
}
