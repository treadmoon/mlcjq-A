import KdPptx from "./kdppt.es";
import { paintTextWrap, getStrWidth } from "./utils";

export default function SavePPT(config) {
  console.log("SavePPT", config);
  this.index = 2;
  this.transcale = config.rate * 100 || 100;

  this.FONT_HEIGHT_MAP = {
    12: 16,
    14: 19,
    16: 21,
  };

  this.config = config;
  this.overBoundary = false;

  this.computedConfig();

  this.pres = new KdPptx();
  this.slide = this.pres.addSlide();

  this.config.nodes.map((node) => {
    node.sortId = this.index++;
  });

  this.config.links.map((path) => this.addPath(path));
  this.config.nodes.map((node) => this.addCard(node));
}

SavePPT.prototype.computedConfig = function () {
  let offsetX = 0;
  let offsetY = 0;

  switch (this.config.direction) {
    case 1:
      offsetX = (this.transcale * 10) / 2;
      break;
    case 2:
      offsetX = this.transcale * 10 - this.config.baseCardSize.w;
      break;
    case 3:
      break;
    case 4:
      break;
  }

  for (let i = 0; i < this.config.nodes.length; i++) {
    this.transcaleFunc(this.config.nodes[i], offsetX, offsetY);
  }
};

SavePPT.prototype.transcaleFunc = function (node, offsetX, offsetY) {
  node.ptx = (node.x + offsetX) / this.transcale;
  node.pty = (node.y + offsetY) / this.transcale;
  node.ptCardSize = {
    w: node.cardSize.w / this.transcale,
    h: node.cardSize.h / this.transcale,
    spaceX: node.cardSize.xSpace / this.transcale,
    spaceY: node.cardSize.ySpace / this.transcale,
  };

  this.ptBaseCardSize = {
    w: this.config.baseCardSize.w / this.transcale,
    h: this.config.baseCardSize.h / this.transcale,
    spaceX: this.config.baseCardSize.xSpace / this.transcale,
    spaceY: this.config.baseCardSize.ySpace / this.transcale,
  };
};

SavePPT.prototype.addText = function () {
  let textboxText = "组织架构图";
  let textboxOpts = {
    x: 1,
    y: 1,
    color: "363636",
    fill: {
      color: "F1F1F1",
    },
    align: "center",
  };
  this.slide.addText(textboxText, textboxOpts);
};

SavePPT.prototype.getTxtLoc = function (card, rect) {
  let x = 0;
  let y = 0;

  if (typeof card.x === "string") {
    x = rect.w * (parseInt(card.x) / this.transcale);
  } else {
    x = card.x;
  }

  if (typeof card.y === "string") {
    y = rect.h * (parseInt(card.y) / this.transcale);
  } else {
    y = card.y;
  }
  return {
    x: x / this.transcale,
    y: y / this.transcale,
  };
};

SavePPT.prototype.addCard = function (node) {
  // node.sortId = this.index++

  const group = this.slide.addGroup(this.index++);

  this.addCardWrapper(group, node);

  this.addCardinfo(group, node);
};

SavePPT.prototype.addCardWrapper = function (group, node) {
  let cardStyle = node.cardStyle;
  let rect = node.ptCardSize;

  group.addBox({
    // x: node.ptx - this.ptBaseCardSize.w / 2,
    y: node.pty - this.ptBaseCardSize.h / 2,
    x: node.ptx - rect.w / 2,
    // y: node.pty - rect.h / 2,
    w: rect.w,
    h: rect.h,
    line: {
      color: translateColor(cardStyle.border),
      dashType: cardStyle.borderType === "" ? "solid" : "dash",
      width: 0.5,
    },
    fill: {
      color: translateColor(cardStyle.background),
    },
    rectRadius: 0.02,
    id: node.sortId,
    shape: "roundRect",
  });
};

SavePPT.prototype.addCardinfo = function (group, node) {
  let rect = node.ptCardSize;
  let cardModels = this.config.cardModel[node.cardModel] || [];

  cardModels.map((cardModel) => {
    const show = resolveParams(cardModel.show, true, { node });
    if (!show) return;

    // let x = node.ptx - this.ptBaseCardSize.w / 2 + cardModel.x / this.transcale;
    let y = node.pty - this.ptBaseCardSize.h / 2 + cardModel.y / this.transcale;
    let x = node.ptx - rect.w / 2 + cardModel.x / this.transcale;
    // let y = node.pty - rect.h / 2 + cardModel.y / this.transcale;
    let w = cardModel.w / this.transcale;
    let h = cardModel.h / this.transcale;

    const id = this.index++;

    let fill;
    let fillOpacity = 1;
    let stroke;
    let color;
    let textInfo;
    let textList;
    let name2;
    let fontSize;
    let vert;
    let charSpacing;
    let align;
    let url;
    let offsetW;
    let size;
    let offsetX = 0;
    let offsetY = 0;

    switch (cardModel.tag) {
      case "rect":
        fillOpacity = resolveParams(cardModel.fillOpacity, 1, { node });

        if (fillOpacity == 0) return;

        fill = resolveParams(cardModel.fill, "#fff", { node });
        stroke = resolveParams(cardModel.stroke, "#fff", { node });

        group.addText("", {
          x,
          y,
          w,
          h,
          fill: {
            color: translateColor(fill ?? "#fff"),
          },
          line: {
            color: translateColor(stroke ?? "#fff"),
            dashType: "",
            width: stroke ? 1 : 0,
          },
          id,
          rectRadius: 0.02,
          shape: "roundRect",
        });
        break;
      case "line":
        stroke = resolveParams(cardModel.stroke, "#fff", { node });

        if (cardModel.line.indexOf("H") > -1) {
          w = parseInt(cardModel.line.replace(/H|V/, "")) / this.transcale;
          h = 1 / this.transcale;
        } else {
          h = parseInt(cardModel.line.replace(/H|V/, "")) / this.transcale;
          w = 1 / this.transcale;
        }

        group.addText("", {
          x,
          y,
          w,
          h,
          fill: {
            color: translateColor(stroke ?? "#fff"),
          },
          line: {
            width: 0,
          },
          id,
          shape: "roundRect",
        });
        break;
      case "text":
        color = resolveParams(cardModel.color, "ffffff", { node });

        textInfo = resolveParams(cardModel.text, "", { node }).reduce(
          (t1, t2) => t1 + t2,
          ""
        );

        textList = paintTextWrap({
          ...cardModel,
          fontHeight: this.FONT_HEIGHT_MAP[cardModel.fontSize],
          texts: textInfo,
        }).textDoms;

        name2 = textList.reduce((t1, t2) => t1 + t2.text, "");

        fontSize =
          (node.isMinFontSize ? cardModel.minFontSize : cardModel.fontSize) /
          1.45;

        vert = "horz";

        charSpacing = 0.2;
        if (cardModel.wMode === "tb") {
          vert = "mongolianVert"; //"eaVert"
          charSpacing = 1.3;
        }

        align = "center";
        switch (cardModel.textAnchor) {
          case "start":
            align = "left";
            break;
          case "middle":
            align = "center";
            break;
          case "end":
            align = "right";
            break;
        }

        offsetW = 0.2;

        group.addText(name2, {
          x: x - offsetW / 2,
          y,
          w: w + offsetW,
          h,
          rectRadius: 0.02,
          color: translateColor(color),
          fontSize: fontSize,
          margin: 0,
          valign: "middle",
          align,
          vert,
          charSpacing,
          shrinkText: false,
          bold: (cardModel.fontWeight || 100) > 500,
          inset: 1,
          id,
          shape: "roundRect",
        });
        break;
      case "img":
        url = this.config.altImg;

        size = Math.min(w, h);

        switch (cardModel.textAnchor) {
          case "start":
            break;
          case "middle":
            x += (w - size) / 2;
            break;
          case "end":
            x += w - size;
            break;
        }
        y += (h - size) / 2;

        group.addImg({
          path: url,
          x,
          y,
          w: size,
          h: size,
        });
        break;
      case "icon":
        url = resolveParams(cardModel.src, this.config.altImg, { node });

        fontSize =
          resolveParams(cardModel.fontSize, 12, { node }) / this.transcale;

        if (cardModel.follow) {
          [offsetX, offsetY] = this.computedIconFollow(cardModel.follow, node);
        }

        group.addImg({
          path: url,
          x: x + offsetX / this.transcale / 1.45,
          y: y + offsetY / this.transcale / 1.45,
          w: fontSize,
          h: fontSize,
        });
        break;
    }
  });
};

SavePPT.prototype.computedIconFollow = function (cardModel, node) {
  let offsetX = 0;
  let offsetY = 0;
  let textLen = 0;
  let textInfo = "";

  const { textAnchor = "start", valign = "top", wMode = "lr" } = cardModel;

  switch (cardModel.tag) {
    case "text":
      textInfo = resolveParams(cardModel.text, "", node.data).reduce(
        (t1, t2) => t1 + t2,
        ""
      );

      textLen = getStrWidth(textInfo, cardModel.fontSize, cardModel.fontWeight);

      if (wMode === "lr") {
        if (textLen > cardModel.w) break;
        switch (textAnchor) {
          case "start":
            break;
          case "middle":
            offsetX = (cardModel.w - textLen) / 2;
            break;
          case "end":
            offsetX = cardModel.w - textLen;
            break;
        }
      }

      if (wMode === "tb") {
        if (textLen > cardModel.h) break;
        switch (valign) {
          case "top":
            break;
          case "center":
            offsetY = (cardModel.h - textLen) / 2;
            break;
          case "bottom":
            offsetY = cardModel.h - textLen;
            break;
        }
      }

      break;
  }

  return [offsetX, offsetY];
};

SavePPT.prototype.addPath = function (path) {
  let sourceRect = this.ptBaseCardSize; //path.source.ptCardSize;
  let targetRect = this.ptBaseCardSize; //path.target.ptCardSize;

  let linkType = "2t0";
  let bentConnector = "bentConnector3";

  let source = {
    x: path.source.ptx,
    y: path.source.pty + sourceRect.h / 2,
  };
  let target = {
    x: path.target.ptx,
    y: path.target.pty - targetRect.h / 2,
  };

  switch (this.config.direction) {
    case 1:
      linkType = "2t0";
      break;
    case 2:
      linkType = "3t1";
      source = {
        x: path.source.ptx + sourceRect.w / 2,
        y: path.source.pty,
      };
      target = {
        x: path.target.ptx - targetRect.w / 2,
        y: path.target.pty,
      };
      break;
    case 3:
      break;
    case 4:
      break;
  }

  switch (path.source.data.childLoadType) {
    case 1:
      bentConnector = "bentConnector2";
      linkType = "2t1";
      source = {
        x: path.source.ptx - targetRect.w / 2 + targetRect.spaceX / 4,
        y: path.source.pty + sourceRect.h / 2,
      };
      target = {
        x: path.target.ptx - targetRect.w / 2,
        y: path.target.pty,
      };
      break;
  }

  if (path.target.data.isLeaf) {
    bentConnector = "bentConnector2";
    target.y = path.target.pty;
    if (path.target.x > path.target.parent.x) {
      target.x = path.target.ptx - targetRect.w / 2;
      linkType = "2t1";
    } else {
      target.x = path.target.ptx + targetRect.w / 2;
      linkType = "2t3";
    }
  }

  this.slide.addShape("path", {
    id2id: path.source.id + "-" + path.target.id,
    sid: path.source.sortId,
    tid: path.target.sortId,
    id: this.index++,
    x: source.x,
    y: source.y,
    w: target.x,
    h: target.y,
    line: {
      color: translateColor(this.config.linkColor),
      width: 1,
      linkType,
      bentConnector,
    },
    elbowRatio: this.config.elbowRatio,
    elbowHeight: sourceRect.spaceY * (1 - this.config.elbowRatio),
  });
};

SavePPT.prototype.down = function down(fileName = "导出文件") {
  if (this.overBoundary) {
    console.error("溢出");
  }
  return this.pres.downloadPpt({
    fileName,
  });
};

function translateColor(color) {
  color = color.replace("#", "");
  if (color.length === 3) {
    let colors = "";
    color.split("").map((c) => {
      colors += c + "" + c;
    });
    return colors;
  }
  return color;
}

function resolveParams(param, defaultVal, props) {
  let res = defaultVal;
  if (param === null || param === undefined) return res;
  if (typeof param === "function") {
    res = param(props);
  } else {
    res = param;
  }
  return res;
}
