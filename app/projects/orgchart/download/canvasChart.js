import jsPDF from 'jspdf'

import {
  CHART_WIDTH_S12FN,
  CHART_WIDTH_S14FN,
  CHART_WIDTH_S16FN,
  CHART_WIDTH_S12F6,
  CHART_WIDTH_S14F6,
  CHART_WIDTH_S16F6,
  resolveParams,
  paintTextWrap,
  getStrWidth,
} from './utils'

export default class CanvasChart {
  constructor(config) {
    console.log('CanvasChart', config)
    this.config = config

    // 浏览器	    最大宽度(px)	最大高度(px)	    最大面积
    // Chrome	    32767	        32767	        268435456（16384* 16384）
    // Firefox	    32767	        32767	        472907776（22528 * 20992）
    // IE	        8192	        8192	        不适用

    this.MAX_SIZE = 32767 - 1

    this.MAX_AREA = 268435456 - 1

    this.DOWN_MIN_WIDTH = 800

    this.computedCanvasSize()

    return this.main()
  }

  getFontHeight(key) {
    switch (key) {
      case 12:
        return 16
      case 14:
        return 19
      case 16:
        return 21
      default:
        return key + 5
    }
  }

  computedCanvasSize() {
    const {
      maxLoc,
      minLoc,
      baseCardSize: { w, h },
    } = this.config

    this.canvasWidth = Math.max(this.DOWN_MIN_WIDTH, maxLoc.x - minLoc.x + w + h)
    this.canvasHeight = Math.max(500, maxLoc.y - minLoc.y + h + w)

    this.scale = 1

    this.ratio = Math.max(getRatio(), 1)

    if (this.canvasWidth * this.ratio >= this.MAX_SIZE) {
      this.scale = Math.ceil(((this.canvasWidth * this.ratio) / this.MAX_SIZE) * 10000) / 10000
    }

    if (this.canvasHeight * this.ratio >= this.MAX_SIZE) {
      this.scale = Math.ceil(((this.canvasHeight * this.ratio) / this.MAX_SIZE) * 10000) / 10000
    }
  }

  async main() {
    if (
      this.canvasWidth >= this.MAX_SIZE ||
      this.canvasHeight >= this.MAX_SIZE ||
      this.canvasWidth * this.canvasHeight >= this.MAX_AREA
    ) {
      console.error('导出图片超出浏览器规定最大尺寸')
      return Promise.reject()
    } else {
      this.computedCanvasOffset()

      await this.initPaint()

      return this
    }
  }

  computedCanvasOffset() {
    const {
      maxLoc,
      minLoc,
      baseCardSize: { w, h },
    } = this.config

    maxLoc

    this.offsetX = 0
    this.offsetY = 0

    switch (this.config.direction) {
      case 1:
        this.offsetX = -minLoc.x + Math.max(w, h) + Math.min(w, h) / 2
        break
      case 2:
        this.offsetX = -minLoc.x + Math.max(w, h) + Math.min(w, h) / 2
        this.offsetY = -minLoc.y + (h + w) / 2
        break
      case 3:
        this.offsetX = -minLoc.x + Math.max(w, h) + Math.min(w, h) / 2
        this.offsetY = -minLoc.y + (h + w) / 2
        break
      case 4:
        this.offsetX = -minLoc.x + Math.max(w, h) + Math.min(w, h) / 2
        this.offsetY = -minLoc.y + (h + w) / 2
        break
    }

    // 宽度不足800,补充偏移
    const supWidth = this.DOWN_MIN_WIDTH - (maxLoc.x - minLoc.x + w + h)
    if (supWidth > 0) {
      this.offsetX += supWidth / 2
    }
  }

  async initPaint() {
    this.initCanvas()

    this.config.linkList.map((path) => this.paintPath(path))
    await Promise.all(this.config.nodeList.map(async (node) => await this.paintNode(node)))
  }

  initCanvas() {
    // canvas实际的尺寸
    const canvasW = this.canvasWidth / this.scale
    const canvasH = this.canvasHeight / this.scale

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = canvasW * this.ratio
    this.canvas.height = canvasH * this.ratio
    this.canvas.style.width = canvasW + 'px'
    this.canvas.style.height = canvasH + 'px'

    this.ctx.fillStyle = '#eee'

    // 绘制大背景
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    // 设置ratio
    this.ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0)

    // document.body.append(this.canvas);
  }

  paintPath(path) {
    const pots = this.getPathPots(path)

    //开始绘制
    this.ctx.beginPath()
    // 设置颜色
    this.ctx.strokeStyle = '#ccc'

    pots.map((p, i) => {
      // 最终绘制的时候，处理缩放倍数
      if (i === 0) {
        this.ctx.moveTo(p.x / this.scale, p.y / this.scale)
      } else {
        this.ctx.lineTo(p.x / this.scale, p.y / this.scale)
      }
    })

    this.ctx.stroke()
  }

  getPathPots(path) {
    const sourceNode = path.source
    const targetNode = path.target

    let sourceLoadType = sourceNode.childLoadType
    const targetIsLeaf = targetNode.isLeaf

    const sourceRect = sourceNode.cardSize
    const targetRect = targetNode.cardSize

    const source = this.getMidLoc(sourceNode)
    const target = this.getMidLoc(targetNode)

    if (this.config.rotateLevel > -1) {
      sourceLoadType = 0
    }

    switch (this.config.direction) {
      case 1:
        return getDirction1(source, target, sourceRect, targetRect, sourceLoadType, targetIsLeaf)
      case 2:
        return getDirction2(source, target, sourceRect, targetRect)
      case 3:
        return getDirction3(source, target, sourceRect, targetRect, sourceLoadType, targetIsLeaf)
      case 4:
        return getDirction4(source, target, sourceRect, targetRect)
    }
  }

  getMidLoc(node) {
    const [ptX, ptY] = this.getNodeRealLoc(node)

    const midx = ptX + node.cardSize.w / 2
    const midy = ptY + node.cardSize.h / 2

    return {
      x: midx,
      y: midy,
    }
  }

  async paintNode(node) {
    // 卡片绘制的起点，左上角
    const [ptX, ptY] = this.getNodeRealLoc(node)

    this.paintWrapper(node, ptX, ptY)

    const cardModels = this.config.cardModelMap[node.cardModel] || []

    try {
      await Promise.all(
        cardModels.map(async (card) => {
          const show = resolveParams(card.show, true, { node })

          if (!show) return
          const ix = ptX + card.x
          const iy = ptY + card.y
          let src = ''
          let img = ''
          switch (card.tag) {
            case 'rect':
              this.paintRect(card, node, ix, iy)
              break
            case 'line':
              this.paintLine(card, ix, iy, node)
              break
            case 'img':
              src = resolveParams(card.url, this.DEFAULT_IMG, node.data)

              img = await loadimg(src)

              this.paintImg(card, img, ix, iy)
              break
            case 'text':
              this.paintText(card, node, ptX, ptY)
              break
            case 'icon':
              src = resolveParams(card.src, this.DEFAULT_IMG, node.data)

              img = await loadimg(src)

              this.paintIcon(card, node, img, ix, iy)
              break
          }
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  getNodeRealLoc(node) {
    let currOffsetX = -node.cardSize.w / 2 - this.config.baseCardSize.w / 2
    let currOffsetY = 0
    if (this.config.rotateLevel > -1 && node.level >= this.config.rotateLevel) {
      currOffsetY = -this.config.baseCardSize.h / 2
    } else {
      currOffsetY = -node.cardSize.h / 2
    }

    return [node.x + currOffsetX + this.offsetX, node.y + currOffsetY + this.offsetY]
  }

  paintWrapper(node, ptX, ptY) {
    const x = ptX / this.scale
    const y = ptY / this.scale
    const w = node.cardSize.w / this.scale
    const h = node.cardSize.h / this.scale

    this.ctx.setLineDash(node.cardStyle.borderType.split(' '))

    this.ctx.fillStyle = node.cardStyle.background
    this.ctx.fillRect(x, y, w, h)
    this.ctx.strokeStyle = node.cardStyle.border
    this.ctx.strokeRect(x, y, w, h)

    this.ctx.setLineDash([])
  }

  paintRect(card, node, x, y) {
    const fillOpacity = resolveParams(card.fillOpacity, '1', node.data)
    if (fillOpacity === 0) return
    const fill = resolveParams(card.fill, '#fff', node.data)
    const stroke = resolveParams(card.stroke, '', node.data)

    const ix = x / this.scale
    const iy = y / this.scale
    const w = card.w / this.scale
    const h = card.h / this.scale

    this.ctx.globalAlpha = fillOpacity
    this.ctx.fillStyle = fill
    this.ctx.strokeStyle = stroke
    if (card.rx && card.rx > 0) {
      this.paintRoundRect(ix, iy, w, h, card.rx)
      if (stroke && stroke != '') {
        this.paintRoundRect(ix, iy, w, h, card.rx, stroke)
      }
    } else {
      this.ctx.fillRect(ix, iy, w, h)
      if (stroke && stroke != '') {
        this.ctx.strokeRect(ix, iy, w, h)
      }
    }
  }

  paintRoundRect(x, y, w, h, r, stroke) {
    if (w < 2 * r) {
      r = w / 2
    }
    if (h < 2 * r) {
      r = h / 2
    }
    //开始绘制
    this.ctx.beginPath()

    this.ctx.moveTo(x + r, y)
    this.ctx.arcTo(x + w, y, x + w, y + h, r)
    this.ctx.arcTo(x + w, y + h, x, y + h, r)
    this.ctx.arcTo(x, y + h, x, y, r)
    this.ctx.arcTo(x, y, x + w, y, r)
    this.ctx.closePath()

    if (stroke && stroke != '') {
      this.ctx.stroke()
    } else {
      this.ctx.fill()
    }
  }

  paintLine({ line, stroke }, ix, iy, node) {
    const strokeColor = resolveParams(stroke, '', { node })
    const x = ix / this.scale
    const y = iy / this.scale
    const len = parseInt(line.replace(/H|V/, '')) / this.scale

    this.ctx.beginPath()
    this.ctx.strokeStyle = strokeColor
    this.ctx.moveTo(x, y)

    if (line.indexOf('H') > -1) {
      this.ctx.lineTo(x + len - 2, y)
    } else {
      this.ctx.lineTo(x, y + len - 2)
    }
    this.ctx.stroke()
  }

  paintImg(card, img, x, y) {
    console.log('card img', card)
    if (!img) return

    let { w = 0, h = 0 } = card

    const { textAnchor = 'middle' } = card

    const size = Math.min(w, h)

    console.log('load')

    switch (textAnchor) {
      case 'start':
        break
      case 'middle':
        x += (w - size) / 2
        break
      case 'end':
        x += w - size
        break
    }

    y += (h - size) / 2

    this.ctx.drawImage(img, x / this.scale, y / this.scale, size / this.scale, size / this.scale)
  }

  // 显示范围内文字
  paintText(card, node, x, y) {
    const textInfo = resolveParams(card.text, '', { node }).reduce((t1, t2) => t1 + t2, '')

    const fontSize = card.fontSize / this.scale
    const fontWeight = card.fontWeight
    const textList = paintTextWrap({
      ...card,
      fontHeight: this.getFontHeight(card.fontSize),
      texts: textInfo,
    }).textDoms

    this.ctx.fillStyle = this.getColor(card, node)
    this.ctx.font =
      fontWeight +
      ' ' +
      fontSize +
      'px Microsoft YaHei, PingFangSC-Regular, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif'

    card.wMode = card.wMode || 'lr'
    switch (card.wMode) {
      case 'lr':
        textList.map((textObj) => {
          const { text, len, x: rx, y: ry } = textObj

          this.ctx.fillText(text, (x + rx) / this.scale, (y + ry) / this.scale, len / this.scale)
        })
        break
      case 'tb':
        textList.map((textObj) => {
          const { text: textstr, x: rx, y: ry } = textObj

          let paintX = x + rx - fontSize / 2
          let paintY = y + ry

          for (let iy = 0; iy < textstr.length; iy++) {
            const currWidth = this.getChartWidth(textstr[iy], fontSize, fontWeight)

            if (textstr.charCodeAt(iy) > 255) {
              this.ctx.fillText(textstr[iy], paintX, paintY + currWidth)
            } else {
              this.ctx.save()

              this.ctx.translate(paintX, paintY)
              this.ctx.rotate((Math.PI / 180) * 90)
              this.ctx.translate(-paintX, -paintY)
              this.ctx.fillText(textstr[iy], paintX, paintY)
              // this.ctx.setTransform(1, 0, 0, 1, 0, 0);

              this.ctx.restore()
            }

            paintY += currWidth
          }
        })
        break
    }
  }

  // 显示全部文字
  paintText_fullText(card, node, x, y) {
    const textInfo = resolveParams(card.text, '', node.data).reduce((t1, t2) => t1 + t2, '')
    const fontSize = card.fontSize / this.scale
    const fontWeight = card.fontWeight
    const fontHeight = this.card.fontSize(card.fontSize) / this.scale

    let fontSizeWidth = 0
    let offsetX = 0

    const textConfig = paintTextWrap({
      ...card,
      fontHeight: this.card.fontSize(card.fontSize),
      texts: textInfo,
    })

    let textList = textConfig.textDoms

    this.ctx.fillStyle = this.getColor(card, node)
    this.ctx.font =
      fontWeight +
      ' ' +
      fontSize +
      'px Microsoft YaHei, PingFangSC-Regular, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif'

    card.wMode = card.wMode || 'lr'
    switch (card.wMode) {
      case 'lr':
        // textList = this.getTextList(textInfo, fontSize, fontWeight, card.w)

        textList.map((textObj, i) => {
          const { text: textstr, len } = textObj

          let offsetx = 0

          // if (card.textAnchor === "start") {}
          if (card.textAnchor === 'middle') {
            offsetx = (card.w - len) / 2
          }
          if (card.textAnchor === 'end') {
            offsetx = card.w - len
          }

          let offsetY = -fontHeight

          // if (card.valign === "top") {}
          if (card.valign === 'center') {
            offsetY = (card.h - fontHeight) / 2
          }
          if (card.valign === 'bottom') {
            offsetY = card.h - fontHeight
          }

          this.ctx.fillText(textstr, x + offsetx, y + (i + 1) * fontSize + offsetY, card.w)
        })
        break
      case 'tb':
        fontSizeWidth = fontSize + 1

        // textList = this.getTextList(textInfo, fontSize, fontWeight, card.h)

        offsetX = (card.w - textList.length * fontSizeWidth) / 2

        textList.map((textObj, ix) => {
          const { text: textstr } = textObj
          const offsetY = 0

          // if (card.textAnchor === "start") {
          // }
          // if (card.textAnchor === "middle") {
          //     offsetY = (card.h - len) / 2
          // }
          // if (card.textAnchor === "end") {
          //     offsetY = (card.h - len)
          // }

          let paintX = x + ix * fontSizeWidth + offsetX
          let paintY = y + offsetY

          for (let iy = 0; iy < textstr.length; iy++) {
            const currWidth = this.getChartWidth(textstr[iy], fontSize, fontWeight)

            if (textstr.charCodeAt(iy) > 255) {
              this.ctx.fillText(textstr[iy], paintX, paintY + currWidth)
            } else {
              this.ctx.translate(paintX, paintY)
              this.ctx.rotate((Math.PI / 180) * 90)
              this.ctx.translate(-paintX, -paintY)
              this.ctx.fillText(textstr[iy], paintX, paintY)
            }

            paintY += currWidth

            this.ctx.setTransform(1, 0, 0, 1, 0, 0)
          }
        })
        break
    }
  }

  paintIcon(card, node, img, ix, iy) {
    if (!img) return

    const size = card.fontSize
    const { w = size, h = size } = card

    ix += (w - size) / 2
    iy += (h - size) / 2

    let offsetX = 0
    let offsetY = 0

    if (card.follow) {
      ;[offsetX, offsetY] = this.computedIconFollow(card.follow, node)
    }

    this.ctx.drawImage(
      img,
      ix / this.scale + offsetX / this.scale,
      iy / this.scale + offsetY / this.scale,
      size / this.scale,
      size / this.scale
    )
  }

  computedIconFollow(cardModel, node) {
    let offsetX = 0
    let offsetY = 0
    let textLen = 0
    let textInfo = ''

    const { textAnchor = 'start', valign = 'top', wMode = 'lr' } = cardModel

    switch (cardModel.tag) {
      case 'text':
        textInfo = resolveParams(cardModel.text, '', node.data).reduce((t1, t2) => t1 + t2, '')

        textLen = getStrWidth(textInfo, cardModel.fontSize / this.scale, cardModel.fontWeight)

        if (wMode === 'lr') {
          if (textLen > cardModel.w) break
          switch (textAnchor) {
            case 'start':
              break
            case 'middle':
              offsetX = (cardModel.w - textLen) / 2
              break
            case 'end':
              offsetX = cardModel.w - textLen
              break
          }
        }

        if (wMode === 'tb') {
          if (textLen > cardModel.h) break
          switch (valign) {
            case 'top':
              break
            case 'center':
              offsetY = (cardModel.h - textLen) / 2
              break
            case 'bottom':
              offsetY = cardModel.h - textLen
              break
          }
        }

        break
    }

    return [offsetX, offsetY]
  }

  downPng(name = '组织架构图') {
    downloadFile(name, this.canvas.toDataURL())
  }

  downPdf(name = '组织架构图') {
    let width = this.canvasWidth
    let height = this.canvasHeight

    const doc = new jsPDF(width > height ? 'l' : 'p', 'px', [width, height])
    const imageData = this.canvas.toDataURL()
    doc.addImage(imageData, 'pdf', 0, 0, width, height)
    doc.save(name + '.pdf')
  }

  getColor = function (card, node) {
    let color = '#212121'
    if (typeof card.color === 'function') {
      color = card.color(node.data)
    } else {
      color = card.color
    }
    return color
  }

  getTextList(textInfo, fontSize, fontWeight, lineWidth) {
    const textList = []

    let currLineWidth = 0
    let currText = ''

    for (let i = 0; i < textInfo.length; i++) {
      currLineWidth += this.getChartWidth(textInfo[i], fontSize, fontWeight)

      currText += textInfo[i]

      if (
        currLineWidth + this.getChartWidth(textInfo[i + 1] || '', fontSize, fontWeight) >
        lineWidth
      ) {
        textList.push({
          text: currText,
          len: currLineWidth,
        })

        currText = ''
        currLineWidth = 0
      }

      if (i === textInfo.length - 1) {
        if (currText.length > 0) {
          textList.push({
            text: currText,
            len: currLineWidth,
          })

          currText = ''
          currLineWidth = 0
        }
      }
    }

    return textList
  }

  getChartWidth(chartCode = '', fontSize = 14, fontWeight = 500) {
    let width = 0

    if (chartCode.charCodeAt(0) > 255) {
      width = fontSize
    } else {
      let cwType = 'S' + fontSize + 'F' + (fontWeight >= 600 ? '6' : 'N')

      switch (cwType) {
        case 'S12FN':
          width = CHART_WIDTH_S12FN[chartCode]

          break
        case 'S14FN':
          width = CHART_WIDTH_S14FN[chartCode]
          break
        case 'S16FN':
          width = CHART_WIDTH_S16FN[chartCode]
          break
        case 'S12F6':
          width = CHART_WIDTH_S12F6[chartCode]
          break
        case 'S14F6':
          width = CHART_WIDTH_S14F6[chartCode]
          break
        case 'S16F6':
          width = CHART_WIDTH_S16F6[chartCode]
          break
      }
    }

    return width
  }
}

function getDirction1(source, target, sourceRect, targetRect, sourceLoadType, isLeaf) {
  let pots = []

  // 起点终点都在卡片中央
  // x,y位于卡片中央

  //起点
  if (sourceLoadType === 1) {
    pots.push({
      x: source.x - sourceRect.w / 2 + sourceRect.xSpace / 4,
      y: source.y + sourceRect.h / 2,
    })
  } else {
    pots.push({
      x: source.x,
      y: source.y + sourceRect.h / 2,
    })
  }

  //拐点
  if (isLeaf) {
    pots.push({
      x: source.x,
      y: target.y,
    })
  } else {
    switch (sourceLoadType) {
      case 1:
        pots.push({
          x: source.x - sourceRect.w / 2 + sourceRect.xSpace / 4,
          y: target.y,
        })
        break
      case 2:
        pots.push({
          x: source.x,
          y: target.y,
        })
        break
      default:
        pots.push({
          x: source.x,
          y: target.y - targetRect.h / 2 - targetRect.ySpace / 2,
        })

        pots.push({
          x: target.x,
          y: target.y - targetRect.h / 2 - targetRect.ySpace / 2,
        })
    }
  }

  //终点
  if (isLeaf || sourceLoadType === 2) {
    pots.push({
      x: target.x,
      y: target.y,
    })
  } else if (sourceLoadType === 1) {
    pots.push({
      x: target.x - targetRect.w / 2,
      y: target.y,
    })
  } else {
    pots.push({
      x: target.x,
      y: target.y - targetRect.h / 2,
    })
  }

  return pots
}

function getDirction2(source, target, sourceRect, targetRect) {
  let pots = []

  //起点
  pots.push({
    x: source.x + sourceRect.w / 2,
    y: source.y,
  })

  //拐点
  pots.push({
    x: target.x - targetRect.w / 2 - targetRect.xSpace / 2,
    y: source.y,
  })

  pots.push({
    x: target.x - targetRect.w / 2 - targetRect.xSpace / 2,
    y: target.y,
  })

  //终点
  pots.push({
    x: target.x - targetRect.w / 2,
    y: target.y,
  })

  return pots
}

function getDirction3(source, target, sourceRect, targetRect, sourceLoadType, isLeaf) {
  let pots = []

  // 起点终点都在卡片中央
  // x,y位于卡片中央

  //起点
  if (sourceLoadType === 1) {
    pots.push({
      x: source.x - sourceRect.w / 2 + sourceRect.xSpace / 4,
      y: source.y - sourceRect.h / 2,
    })
  } else {
    pots.push({
      x: source.x,
      y: source.y - sourceRect.h / 2,
    })
  }

  //拐点
  if (isLeaf) {
    pots.push({
      x: source.x,
      y: target.y,
    })
  } else {
    switch (sourceLoadType) {
      case 1:
        pots.push({
          x: source.x - sourceRect.w / 2 + sourceRect.xSpace / 4,
          y: target.y,
        })
        break
      case 2:
        pots.push({
          x: source.x,
          y: target.y,
        })
        break
      default:
        pots.push({
          x: source.x,
          y: target.y + targetRect.h / 2 + targetRect.ySpace / 2,
        })

        pots.push({
          x: target.x,
          y: target.y + targetRect.h / 2 + targetRect.ySpace / 2,
        })
    }
  }

  //终点
  if (isLeaf || sourceLoadType === 2) {
    pots.push({
      x: target.x,
      y: target.y,
    })
  } else if (sourceLoadType === 1) {
    pots.push({
      x: target.x - targetRect.w / 2,
      y: target.y,
    })
  } else {
    pots.push({
      x: target.x,
      y: target.y + targetRect.h / 2,
    })
  }

  return pots
}

function getDirction4(source, target, sourceRect, targetRect) {
  let pots = []

  //起点
  pots.push({
    x: source.x - sourceRect.w / 2,
    y: source.y,
  })

  //拐点
  pots.push({
    x: target.x + targetRect.w / 2 + targetRect.xSpace / 2,
    y: source.y,
  })

  pots.push({
    x: target.x + targetRect.w / 2 + targetRect.xSpace / 2,
    y: target.y,
  })

  //终点
  pots.push({
    x: target.x + targetRect.w / 2,
    y: target.y,
  })

  return pots
}

function getRatio() {
  const c = document.createElement('canvas'),
    ctx = c.getContext('2d'),
    dpr = window.devicePixelRatio || 1,
    bsr =
      ctx['webkitBackingStorePixelRatio'] ||
      ctx['mozBackingStorePixelRatio'] ||
      ctx['msBackingStorePixelRatio'] ||
      ctx['oBackingStorePixelRatio'] ||
      ctx['backingStorePixelRatio'] ||
      1

  return dpr / bsr
}

function downloadFile(fileName, content) {
  if (myBrowser() === 'IE') {
    //支持IE11
    var blob = base64ToBlob(content)
    window.navigator.msSaveBlob(blob, fileName)
  } else {
    const alink = document.createElement('a')

    alink.href = content

    alink.download = fileName + '.png'

    alink.click()
  }
}

function base64ToBlob(code) {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length

  let uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], {
    type: contentType,
  })
}

function myBrowser() {
  var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('OPR') > -1
  if (isOpera) {
    return 'Opera'
  } //判断是否Opera浏览器 OPR/43.0.2442.991

  //if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { return "IE"; }; //判断是否IE浏览器

  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } //判断是否Firefox浏览器  Firefox/51.0
  if (userAgent.indexOf('Trident') > -1) {
    return 'IE'
  } //判断是否IE浏览器  Trident/7.0; rv:11.0
  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  } //判断是否Edge浏览器  Edge/14.14393
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  } // Chrome/56.0.2924.87
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } //判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
}

async function loadimg(src) {
  return new Promise((resolve) => {
    const img = new Image()

    img.crossOrigin = 'anonymous'
    img.src = src + `?timestamp=${Date.now() + parseInt(Math.random() * 99999999)}`

    try {
      img.onload = () => {
        resolve(img)
      }

      img.onerror = () => {
        console.log('Error occurred while loading image', src)
        resolve()
      }

      img.onabort = () => {
        console.log('onabort occurred while loading image', src)
        resolve()
      }
    } catch (error) {
      console.log('catch occurred while loading image', error, src)
      resolve()
    }
  })
}
