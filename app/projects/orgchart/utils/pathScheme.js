export function mygetPathScheme(
  { path, baseCardSize, direction = 1, coorType = 1, scale = 1 },
  rotateLevel
) {
  direction = parseInt(direction)

  switch (coorType) {
    case 1:
      return orgLine(path, baseCardSize, direction, rotateLevel, scale)
    case 2:
      return coorLine(path, baseCardSize, direction, rotateLevel, scale)
  }
}

function coorLine(path, baseCardSize, direction, rotateLevel, scale) {
  const [sourceX, sourceY] = [path.source.x * scale, path.source.y * scale]
  const [targetX, targetY] = [path.target.x * scale, path.target.y * scale]

  const sourceLoadType = path.source.data.childLoadType

  switch (direction) {
    case 1:
      return (
        'M' +
        sourceX +
        ',' +
        (sourceY + (baseCardSize.h * scale) / 2) +
        ' V' +
        (targetY - (baseCardSize.h * scale) / 2 - (baseCardSize.ySpace / 3) * scale) +
        ' H' +
        targetX +
        ' V' +
        (targetY - (baseCardSize.h * scale) / 2)
      )
    case 2:
      return (
        'M' +
        (sourceX + (baseCardSize.w * scale) / 2) +
        ',' +
        sourceY +
        ' H' +
        (targetX + sourceX) / 2 +
        ' V' +
        targetY +
        ' H' +
        (targetX - (baseCardSize.w * scale) / 2)
      )
    case 3:
      switch (sourceLoadType) {
        case 1:
          return (
            'M' +
            (sourceX - (baseCardSize.w * scale) / 2 + (baseCardSize.xSpace / 4) * scale) +
            ',' +
            (sourceY - (baseCardSize.h * scale) / 2) +
            ' V' +
            targetY +
            ' H' +
            targetX
          )
        default:
          return (
            'M' +
            sourceX +
            ',' +
            (sourceY - (baseCardSize.h * scale) / 2) +
            ' V' +
            (targetY + sourceY) / 2 +
            ' H' +
            targetX +
            ' V' +
            (targetY - (baseCardSize.h * scale) / 2)
          )
      }
    case 4:
      return (
        'M' +
        (sourceX + (baseCardSize.w * scale) / 2) +
        ',' +
        sourceY +
        ' H' +
        (targetX + sourceX) / 2 +
        ' V' +
        targetY +
        ' H' +
        (targetX - (baseCardSize.w * scale) / 2)
      )
  }
}

function orgLine(path, baseCardSize, direction, rotateLevel, scale) {
  const [sourceX, sourceY] = [path.source.x * scale, path.source.y * scale]
  const [targetX, targetY] = [path.target.x * scale, path.target.y * scale]

  const sourceLoadType = path.source.data.childLoadType
  switch (direction) {
    case 1:
      if (rotateLevel > -1) {
        return (
          'M' +
          sourceX +
          ',' +
          (sourceY - (baseCardSize.h * scale) / 2) +
          ' V' +
          (targetY - (baseCardSize.h * scale) / 2 - (baseCardSize.ySpace / 3) * scale) +
          ' H' +
          targetX +
          ' V' +
          (targetY - (baseCardSize.h * scale) / 2)
        )
      } else {
        if (path.target.data.isLeaf) {
          return (
            'M' +
            sourceX +
            ',' +
            (sourceY - (baseCardSize.h * scale) / 2) +
            ' V' +
            targetY +
            ' H' +
            targetX
          )
        } else {
          switch (sourceLoadType) {
            case 1:
              return (
                'M' +
                (sourceX - (baseCardSize.w * scale) / 2 + (baseCardSize.xSpace / 4) * scale) +
                ',' +
                (sourceY - (baseCardSize.h * scale) / 2) +
                ' V' +
                targetY +
                ' H' +
                targetX
              )
            case 2:
              return (
                'M' +
                sourceX +
                ',' +
                (sourceY - (baseCardSize.h * scale) / 2) +
                ' V' +
                targetY +
                ' H' +
                targetX
              )
            default:
              return (
                'M' +
                sourceX +
                ',' +
                (sourceY + (baseCardSize.h * scale) / 2) +
                ' V' +
                (targetY - (baseCardSize.h * scale) / 2 - (baseCardSize.ySpace / 3) * scale) +
                ' H' +
                targetX +
                ' V' +
                (targetY - (baseCardSize.h * scale) / 2)
              )
          }
        }
      }
    case 2:
      return (
        'M' +
        (sourceX + (baseCardSize.w * scale) / 2) +
        ',' +
        sourceY +
        ' H' +
        (targetX + sourceX) / 2 +
        ' V' +
        targetY +
        ' H' +
        (targetX - (baseCardSize.w * scale) / 2)
      )
    case 3:
      switch (sourceLoadType) {
        case 1:
          return (
            'M' +
            (sourceX - (baseCardSize.w * scale) / 2 + (baseCardSize.xSpace / 4) * scale) +
            ',' +
            (sourceY - (baseCardSize.h * scale) / 2) +
            ' V' +
            targetY +
            ' H' +
            targetX
          )
        default:
          return (
            'M' +
            sourceX +
            ',' +
            (sourceY - (baseCardSize.h * scale) / 2) +
            ' V' +
            (targetY + sourceY) / 2 +
            ' H' +
            targetX +
            ' V' +
            (targetY - (baseCardSize.h * scale) / 2)
          )
      }
    case 4:
      return (
        'M' +
        (sourceX + (baseCardSize.w * scale) / 2) +
        ',' +
        sourceY +
        ' H' +
        (targetX + sourceX) / 2 +
        ' V' +
        targetY +
        ' H' +
        (targetX - (baseCardSize.w * scale) / 2)
      )
  }
}
