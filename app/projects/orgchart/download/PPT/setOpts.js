export function setShapeObj(shapeName, options) {
    options = options || {}
    options.line = options.line || {}

    let shapeObj = {
        _type: shapeName === "path" ? "path" : "text",
        shape: shapeName || "",
        options: options,
        text: shapeName === "path" ? "path" : "text"
    }


    options.x = options.x || (options.x === 0 ? 0 : 1)
    options.y = options.y || (options.y === 0 ? 0 : 1)
    options.w = options.w || (options.w === 0 ? 0 : 1)
    options.h = options.h || (options.h === 0 ? 0 : 1)
    options.elbowRatio = options.elbowRatio || (options.elbowRatio === 0 ? 0 : 0.5)
    options.elbowHeight = options.elbowHeight || (options.elbowHeight === 0 ? 0 : 0.3)

    options.line.dashType = options.line.dashType || "solid"
    //'none' | 'arrow' | 'diamond' | 'oval' | 'stealth' | 'triangle'
    options.line.beginArrowType = options.line.beginArrowType || "none"
    options.line.endArrowType = options.line.endArrowType || "none"
    options.line.type = options.line.type || "solid"
    options.line.color = options.line.color || "000000"
    options.line.transparency = options.line.transparency || 0
    options.line.width = options.line.width || 1
    options.line.linkType = options.line.linkType || "2t0"
    options.line.bentConnector = options.line.bentConnector || "bentConnector3"

    // slide._slideObjects.push(shapeObj)
    return shapeObj
}

export function setTextObj(text, options) {
    options = options || {}
    options.line = options.line || {}
    options.color = options.color || "ff0000"
    options._bodyProp = options._bodyProp || {}

    options._bodyProp.autoFit = false
    options._bodyProp.anchor = "ctr"
    options._bodyProp.vert = options.vert || "mongolianVert"
    options._bodyProp.wrap = true
    options._bodyProp.align = options.align || "center"

    options.line.dashType = options.line.dashType || "solid"
    options.line.color = options.line.color || ""
    options.line.width = options.line.width || 0

    if ((options.valign || '').toLowerCase().indexOf('b') === 0) options._bodyProp.anchor = "b"
    else if ((options.valign || '').toLowerCase().indexOf('m') === 0) options._bodyProp.anchor = "ctr"
    else if ((options.valign || '').toLowerCase().indexOf('t') === 0) options._bodyProp.anchor = "t"

    let textObj = {
        _type: "text",
        shape: options.shape || "rect",
        text,
        options,
    }

    text = text || [{
        text: '',
        options: null
    }]

    return textObj
}

export function setImgObj(slide, options) {

    let newObject = {
        _type: null,
        text: null,
        options: null,
        image: null,
        imageRid: null,
        hyperlink: null,
    }

    // FIRST: Set vars for this image (object param replaces positional args in 1.1.0)
    let intPosX = options.x || 0
    let intPosY = options.y || 0
    let intWidth = options.w || 0
    let intHeight = options.h || 0
    let sizing = options.sizing || null
    let objHyperlink = options.hyperlink || ''
    let strImageData = options.data || ''
    let strImagePath = options.path || ''
    let imageRelId = getNewRelId(slide)

    // REALITY-CHECK:
    if (!strImagePath && !strImageData) {
        console.error(`ERROR: addImage() requires either 'data' or 'path' parameter!`)
        return null
    } else if (strImagePath && typeof strImagePath !== 'string') {
        console.error(`ERROR: addImage() 'path' should be a string, ex: {path:'/img/sample.png'} - you sent ${strImagePath}`)
        return null
    } else if (strImageData && typeof strImageData !== 'string') {
        console.error(`ERROR: addImage() 'data' should be a string, ex: {data:'image/png;base64,NMP[...]'} - you sent ${strImageData}`)
        return null
    } else if (strImageData && typeof strImageData === 'string' && strImageData.toLowerCase().indexOf('base64,') === -1) {
        console.error("ERROR: Image `data` value lacks a base64 header! Ex: 'image/png;base64,NMP[...]')")
        return null
    }

    // STEP 1: Set extension
    // NOTE: Split to address URLs with params (eg: `path/brent.jpg?someParam=true`)
    let strImgExtn =
        strImagePath
            .substring(strImagePath.lastIndexOf('/') + 1)
            .split('?')[0]
            .split('.')
            .pop()
            .split('#')[0] || 'png'

    // However, pre-encoded images can be whatever mime-type they want (and good for them!)
    if (strImageData && /image\/(\w+);/.exec(strImageData) && /image\/(\w+);/.exec(strImageData).length > 0) {
        strImgExtn = /image\/(\w+);/.exec(strImageData)[1]
    } else if (strImageData && strImageData.toLowerCase().indexOf('image/svg+xml') > -1) {
        strImgExtn = 'svg'
    }

    // STEP 2: Set type/path
    newObject._type = "image"
    newObject.image = strImagePath || 'preencoded.png'

    // STEP 3: Set image properties & options
    // FIXME: Measure actual image when no intWidth/intHeight params passed
    // ....: This is an async process: we need to make getSizeFromImage use callback, then set H/W...
    // if ( !intWidth || !intHeight ) { var imgObj = getSizeFromImage(strImagePath);
    newObject.options = {
        x: intPosX || 0,
        y: intPosY || 0,
        w: intWidth || 1,
        h: intHeight || 1,
        altText: options.altText || '',
        rounding: typeof options.rounding === 'boolean' ? options.rounding : false,
        sizing: sizing,
        placeholder: options.placeholder,
        rotate: options.rotate || 0,
        flipV: options.flipV || false,
        flipH: options.flipH || false,
    }

    // STEP 4: Add this image to this Slide Rels (rId/rels count spans all slides! Count all images to get next rId)
    if (strImgExtn === 'svg') {
        // SVG files consume *TWO* rId's: (a png version and the svg image)
        // <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image1.png"/>
        // <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image2.svg"/>
        slide._relsMedia.push({
            path: strImagePath || strImageData + 'png',
            type: 'image/png',
            extn: 'png',
            data: strImageData || '',
            rId: imageRelId,
            Target: '../media/image-' + slide._slideNum + '-' + (slide._relsMedia.length + 1) + '.png',
            isSvgPng: true,
            svgSize: {
                w: getSmartParseNumber(newObject.options.w, 'X', slide._presLayout),
                h: getSmartParseNumber(newObject.options.h, 'Y', slide._presLayout)
            },
        })
        newObject.imageRid = imageRelId
        slide._relsMedia.push({
            path: strImagePath || strImageData,
            type: 'image/svg+xml',
            extn: strImgExtn,
            data: strImageData || '',
            rId: imageRelId + 1,
            Target: '../media/image-' + target._slideNum + '-' + (target._relsMedia.length + 1) + '.' + strImgExtn,
        })
        newObject.imageRid = imageRelId + 1
    } else {
        slide._relsMedia.push({
            path: strImagePath || 'preencoded.' + strImgExtn,
            type: 'image/' + strImgExtn,
            extn: strImgExtn,
            data: strImageData || '',
            rId: imageRelId,
            Target: '../media/image-' + slide._slideNum + '-' + (slide._relsMedia.length + 1) + '.' + strImgExtn,
        })
        newObject.imageRid = imageRelId
    }

    // STEP 5: Hyperlink support
    if (typeof objHyperlink === 'object') {
        if (!objHyperlink.url && !objHyperlink.slide) throw new Error('ERROR: `hyperlink` option requires either: `url` or `slide`')
        else {
            imageRelId++

            slide._rels.push({
                type: "hyperlink",
                data: objHyperlink.slide ? 'slide' : 'dummy',
                rId: imageRelId,
                Target: objHyperlink.url || objHyperlink.slide.toString(),
            })

            objHyperlink._rId = imageRelId
            newObject.hyperlink = objHyperlink
        }
    }

    // STEP 6: Add object to slide
    // slide._slideObjects.push(newObject)
    return newObject
}

export function getNewRelId(target) {
    return target._rels.length + target._relsChart.length + target._relsMedia.length + 1
}