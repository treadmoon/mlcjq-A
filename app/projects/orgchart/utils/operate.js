export function childloadType(itChart, type) {
  const selectCards = itChart.getSelectCard();

  if (selectCards.length > 0) {
    const ids = [];

    selectCards.map(card => {
      if (type === 1) {
        if (card.data.height === 1 && card.data.childLoadType !== type) {
          ids.push(card.id);
        }
      } else {
        if (card.data.childLoadType !== type) {
          ids.push(card.id);
        }
      }
    });

    itChart.setTreeDataAttr(ids, "childLoadType", type);
  } else {
    itChart.eachTreeData(item => {
      if (item.height === 1 && item.childLoadType !== type) {
        item["childLoadType"] = type;
      }
    });
  }

  itChart.resetCoordinate();
}

export function childloadType2(itChart) {
  const selectCards = itChart.getSelectCard();
  const ids = [];

  selectCards.map(card => {
    if (card.data.height === 1) {
      ids.push(card.id);
    }
  });

  itChart.eachTreeData(item => {
    if (
      item.height === 1 &&
      (selectCards.length === 0 || ids.indexOf(item.id) > -1)
    ) {
      if ((item.childLoadType || 0) !== 2) {
        item["childLoadType"] = 2;
        setLoadType(item);
      }
    }
  });

  itChart.resetCoordinate();
}

export function setLoadType(item) {
  const len = item.children.length;
  for (let i = 0; i < len; i++) {
    item.children[i].load2type = i < len / 2 ? 2 : 1;
  }
}

export function setLeaf(itChart, type) {
  // isLeaf
  const selectCards = itChart.getSelectCard();

  if (selectCards.length === 1) {
    const currNode = selectCards[0];
    if (!currNode.children && (currNode.data.isLeaf || 0) !== type) {
      itChart.setTreeDataAttr([currNode.id], "isLeaf", type);

      itChart.resetCoordinate();
    }
  }
}

export function rotate90(itChart) {
  const selectCards = itChart.getSelectCard();

  if (selectCards.length > 0) {
    let level = Infinity;
    selectCards.map(card => {
      level = Math.min(card.data.level, level);
    });

    // itChart.upCustomParams("rotateLevel", level);
  } else {
    // itChart.upCustomParams("rotateLevel", 1);
  }

  itChart.eachTreeData(item => {
    item["childLoadType"] = 3;
  });

  itChart.resetCoordinate();
}
