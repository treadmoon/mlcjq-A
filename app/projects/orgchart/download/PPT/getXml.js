function getTextXml(textObj) {
    if (textObj.text) {
        let textXml = '<a:rPr lang="en-US" '
        textXml += textObj.options.fontSize ? ' sz="' + Math.round(textObj.options.fontSize) + '00"' : ''
        textXml += textObj.options.hasOwnProperty('bold') ? ` b="${textObj.options.bold ? 1 : 0}"` : ''
        textXml += textObj.options.hasOwnProperty('italic') ? ` i="${textObj.options.italic ? 1 : 0}"` : ''
        textXml += textObj.options.charSpacing ? ` spc="${Math.round(textObj.options.charSpacing * 100)}" kern="0"` : ''
        textXml += ' dirty="0">'

        if (textObj.options.color) textXml += getColoXml(textObj.options)
        textXml += `</a:rPr>`
        return `<a:r>${textXml}<a:t>${transCharEncode(textObj.text)}</a:t></a:r>`
    } else {
        return ""
    }
}

function getTextSpanXml(textObj, tagType) {
    let tag = tagType ? 'a:lvl1pPr' : 'a:pPr'
    let algnVal = `<${tag}${textObj.options.rtlMode ? ' rtl="1" ' : ''}`

    if (textObj.options.align) {
        switch (textObj.options.align) {
            case 'left':
                algnVal += ' algn="l"'
                break
            case 'right':
                algnVal += ' algn="r"'
                break
            case 'center':
                algnVal += ' algn="ctr"'
                break
            case 'justify':
                algnVal += ' algn="just"'
                break
            default:
                algnVal += ''
                break
        }
    }

    algnVal += '></' + tag + '>'
    return algnVal
}

function getBodyXml(slideObject) {
    let bodyProperties = '<a:bodyPr'

    if (slideObject && slideObject._type === "text" && slideObject.options._bodyProp) {
        bodyProperties += slideObject.options._bodyProp.wrap ? ' wrap="square"' : ' wrap="none"  lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0"'

        if (slideObject.options._bodyProp.anchor) bodyProperties += ' anchor="' + slideObject.options._bodyProp.anchor + '"'
        if (slideObject.options._bodyProp.vert) bodyProperties += ' vert="' + slideObject.options._bodyProp.vert + '"'

        bodyProperties += '>' + (slideObject.options._bodyProp.autoFit !== false ? '<a:spAutoFit/>' : '') + '</a:bodyPr>'
    } else {
        bodyProperties += ' wrap="square" rtlCol="0"></a:bodyPr>'
    }

    return bodyProperties
}

function getTextBody(slideObj) {
    let opts = slideObj.options || {}

    if (opts && (typeof slideObj.text === 'undefined' || slideObj.text === null)) return ''

    let tmpTextObjects = []
    let arrTextObjects = []

    let strSlideXml = `<p:txBody>${getBodyXml(slideObj)}<a:lstStyle/>`

    tmpTextObjects = (slideObj.text).map(item => ({
        text: item.text,
        options: item.options
    }))

    tmpTextObjects.forEach(itext => {
        itext.text = itext.text || ''
        itext.options = itext.options || opts || {}

        if (typeof itext.text === 'string' || typeof itext.text === 'number') {
            itext.text = itext.text.toString().replace(/\r*\n/g, '\r\n')
        }

        arrTextObjects.push(itext)
    })

    let arrLines = []
    let arrTexts = []

    arrTextObjects.forEach((textObj, idx) => {
        arrTexts.push(textObj)
        if (idx + 1 === arrTextObjects.length) arrLines.push(arrTexts)
    })

    arrLines.forEach(line => {
        strSlideXml += '<a:p>'

        line.forEach((textObj, idx) => {
            textObj.options._lineIdx = idx
            textObj.options.align = textObj.options.align || opts.align
            textObj.options.lineSpacing = textObj.options.lineSpacing || opts.lineSpacing
            textObj.options.lineSpacingMultiple = textObj.options.lineSpacingMultiple || opts.lineSpacingMultiple
            textObj.options.indentLevel = textObj.options.indentLevel || opts.indentLevel
            textObj.options.paraSpaceBefore = textObj.options.paraSpaceBefore || opts.paraSpaceBefore
            textObj.options.paraSpaceAfter = textObj.options.paraSpaceAfter || opts.paraSpaceAfter

            strSlideXml += getTextSpanXml(textObj, false)

            Object.entries(opts).forEach(([key, val]) => {
                if (!textObj.options[key]) textObj.options[key] = val
            })

            strSlideXml += getTextXml(textObj)
            if ((!textObj.text && opts.fontSize) || textObj.options.fontSize) {
                opts.fontSize = opts.fontSize || textObj.options.fontSize
            }
        })

        strSlideXml += `<a:endParaRPr lang="en-US" ${opts.fontSize ? ` sz="${Math.round(opts.fontSize * 100)}"` : ''} dirty="0"/></a:p>`
    })

    strSlideXml += '</p:txBody>'

    return strSlideXml
}

// 绘制slide
function setSlideXml(slide) {
    let strSlideXml = `<p:cSld ${slide._name ? 'name="' + slide._name + '"' : ''} ><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name="name"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>`

    slide._slideObjects.forEach((slideItemObj, idx) => {
        let x = 0
        let y = 0
        let cx = transSizeNum('75%', 'X', slide._presLayout)
        let cy = 0
        let elbowHeight = 10000

        slideItemObj.options = slideItemObj.options || {}

        if (typeof slideItemObj.options.x !== 'undefined') x = transSizeNum(slideItemObj.options.x, 'X', slide._presLayout)
        if (typeof slideItemObj.options.y !== 'undefined') y = transSizeNum(slideItemObj.options.y, 'Y', slide._presLayout)
        if (typeof slideItemObj.options.w !== 'undefined') cx = transSizeNum(slideItemObj.options.w, 'X', slide._presLayout)
        if (typeof slideItemObj.options.h !== 'undefined') cy = transSizeNum(slideItemObj.options.h, 'Y', slide._presLayout)
        if (typeof slideItemObj.options.elbowHeight !== 'undefined') elbowHeight = transSizeNum(slideItemObj.options.elbowHeight, 'Y', slide._presLayout)

        switch (slideItemObj._type) {
            case "path":
                let pathstr = getPathStr(slideItemObj, x, y, cx, cy, elbowHeight)
                strSlideXml += pathstr
                break

            case "text":
                let textStr = getTextStr(slideItemObj, x, y, cx, cy, idx)
                strSlideXml += textStr
                break

            case "image":
                let imgStr = getImgStr(slideItemObj, x, y, cx, cy, idx)
                strSlideXml += imgStr
                break

            case "group":
                strSlideXml += `<p:grpSp>
                <p:nvGrpSpPr>
                    <p:cNvPr id="${9999999}" name="${slideItemObj.options.shapeName||'name'}">
                        <a:extLst>
                            <a:ext uri="{FF2B5EF4-FFF2-40B4-BE49-F238E27FC236}">
                                <a16:creationId xmlns:a16="http://schemas.microsoft.com/office/drawing/2014/main" id="{03652813-AFAE-4D46-BDC4-0B7926DEE2B9}" />
                            </a:ext>
                        </a:extLst>
                    </p:cNvPr>
                    <p:cNvGrpSpPr />
                    <p:nvPr />
                </p:nvGrpSpPr>
                <p:grpSpPr>
                    <a:xfrm>
                        <a:off x="${x}" y="${y}" />
                        <a:ext cx="${cx}" cy="${cy}" />
                        <a:chOff x="${x}" y="${y}" />
                        <a:chExt cx="${cx}" cy="${cy}" />
                    </a:xfrm>
                </p:grpSpPr>`

                slideItemObj.child.map(childSlideItemObj => {
                    childSlideItemObj.options = childSlideItemObj.options || {}

                    if (typeof childSlideItemObj.options.x !== 'undefined') x = transSizeNum(childSlideItemObj.options.x, 'X', slide._presLayout)
                    if (typeof childSlideItemObj.options.y !== 'undefined') y = transSizeNum(childSlideItemObj.options.y, 'Y', slide._presLayout)
                    if (typeof childSlideItemObj.options.w !== 'undefined') cx = transSizeNum(childSlideItemObj.options.w, 'X', slide._presLayout)
                    if (typeof childSlideItemObj.options.h !== 'undefined') cy = transSizeNum(childSlideItemObj.options.h, 'Y', slide._presLayout)
                    if (typeof childSlideItemObj.options.elbowHeight !== 'undefined') elbowHeight = transSizeNum(childSlideItemObj.options.elbowHeight, 'Y', slide._presLayout)

                    switch (childSlideItemObj._type) {
                        case "text":
                            let gTextStr = getTextStr(childSlideItemObj, x, y, cx, cy, idx)
                            strSlideXml += gTextStr
                            break;

                        case "image":
                            let gImgStr = getImgStr(childSlideItemObj, x, y, cx, cy, idx)
                            strSlideXml += gImgStr
                            break;
                    }
                })

                strSlideXml += `</p:grpSp>`

                break;

            default:
                strSlideXml += ''
                break
        }
    })
    strSlideXml += '</p:spTree></p:cSld>'

    return strSlideXml
}


function getPathStr(slideItemObj, x, y, cx, cy, elbowHeight) {
    //bentConnector2  肘线拐1次
    //bentConnector3  肘线拐2次
    //stCxn idx  0：上  1：左  2：下  3：右
    // flipV 垂直翻转
    // flipH 水平翻转

    let strSlideXml = ""

    let {
        tx,
        ty,
        h,
        w,
        sidx,
        eidx
    } = rotateLoc(x, y, cx, cy, slideItemObj.options.line.linkType)

    const bentConnector = slideItemObj.options.line.bentConnector

    //范围是0-100000
    //计算比例
    const fmlaVal = parseInt(elbowHeight / (cy - y) * 100000)

    let ilocationAttr = `flipH="1" ` + ((x - cx > 0) ? 'flipV="1"' : '')
    // let ilocationAttr = ((cx - x > 0) ? ' flipH="1" ' : '')
    // ilocationAttr += ((y - cy >= 0) ? ' flipV="1" ' : '')
    
    let rotAttr = `rot="5400000"`

    let fmlaStr = ''//`<a:gd name="adj1" fmla="val ${fmlaVal}" />`
    if (bentConnector === "bentConnector2") {
        // ilocationAttr = (x - cx > 0) ? '' : 'flipV="1"'
        fmlaStr = ``
    }

    strSlideXml += `<p:cxnSp><p:nvCxnSpPr>
                <p:cNvPr id="${slideItemObj.options.id}" name="肘形连接符 30" descr="肘形连接符${slideItemObj.options.id}" />
                <p:cNvCxnSpPr><a:cxnSpLocks />
                <a:stCxn id="${slideItemObj.options.sid}" idx="${sidx}"/>
                <a:endCxn id="${slideItemObj.options.tid}" idx="${eidx}"/>
                </p:cNvCxnSpPr><p:nvPr/></p:nvCxnSpPr>
                <p:spPr><a:xfrm ${rotAttr} ${ilocationAttr}><a:off x="${tx}" y="${ty}"/><a:ext cx="${h}" cy="${w}"/></a:xfrm>
                <a:prstGeom prst="${bentConnector}"><a:avLst>${fmlaStr}</a:avLst></a:prstGeom>`

    strSlideXml += getLineXml(slideItemObj)

    strSlideXml += `</p:spPr><p:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="0"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></p:style></p:cxnSp>`

    return strSlideXml
}

function getTextStr(slideItemObj, x, y, cx, cy, idx) {
    let strSlideXml = ""
    let shapeName = slideItemObj.options.shapeName ? transCharEncode(slideItemObj.options.shapeName) : `Object${idx + 1}`
    strSlideXml += `<p:sp><p:nvSpPr><p:cNvPr id="${slideItemObj.options.id}" name="${shapeName||'name1'}" descr="文本：${slideItemObj.options.id}"></p:cNvPr><p:cNvSpPr /><p:nvPr></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="${slideItemObj.shape}"><a:avLst>`;

    if (slideItemObj.options.rectRadius) {
        strSlideXml += `<a:gd name="adj" fmla="val ${Math.round((slideItemObj.options.rectRadius * 914400 * 100000) / Math.min(cx, cy))}"/>`
    }

    strSlideXml += '</a:avLst></a:prstGeom>' + (slideItemObj.options.fill ? getColoXml(slideItemObj.options.fill) : '<a:noFill/>')
    strSlideXml += `${getLineXml(slideItemObj)}</p:spPr>${getTextBody(slideItemObj)}</p:sp>`

    return strSlideXml
}

function getImgStr(slideItemObj, x, y, cx, cy, idx) {
    let strSlideXml = ""
    let locationAttr = ""
    let imageOpts = slideItemObj.options
    let rounding = imageOpts.rounding,
        width = cx,
        height = cy

    strSlideXml += '<p:pic>'
    strSlideXml += '  <p:nvPicPr>'
    strSlideXml += `<p:cNvPr id="${idx + 2}" name="Object ${idx + 2}" descr="${encodeXmlEntities(imageOpts.altText || slideItemObj.image)}">`
    strSlideXml += '    </p:cNvPr>'
    strSlideXml += '    <p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>'
    strSlideXml += '    <p:nvPr></p:nvPr>'
    strSlideXml += '  </p:nvPicPr>'
    strSlideXml += '<p:blipFill>'
    strSlideXml += '<a:blip r:embed="rId' + slideItemObj.imageRid + '"/>'
    strSlideXml += '  <a:stretch><a:fillRect/></a:stretch>'
    strSlideXml += '</p:blipFill>'
    strSlideXml += '<p:spPr>'
    strSlideXml += ' <a:xfrm' + locationAttr + '>'
    strSlideXml += '  <a:off x="' + x + '" y="' + y + '"/>'
    strSlideXml += '  <a:ext cx="' + width + '" cy="' + height + '"/>'
    strSlideXml += ' </a:xfrm>'
    strSlideXml += ' <a:prstGeom prst="' + (rounding ? 'ellipse' : 'rect') + '"><a:avLst/></a:prstGeom>'
    strSlideXml += '</p:spPr>'
    strSlideXml += '</p:pic>'

    return strSlideXml
}

function getLineXml(slideItemObj) {
    let xml = ""
    if (slideItemObj.options.line) {
        xml += slideItemObj.options.line.width ? `<a:ln w="${slideItemObj.options.line.width * 12700}">` : '<a:ln>'
        if (slideItemObj.options.line.color) xml += getColoXml(slideItemObj.options.line)
        if (slideItemObj.options.line.dashType) xml += `<a:prstDash val="${slideItemObj.options.line.dashType}"/>`
        xml += '</a:ln>'
    }
    return xml
}

function getRelationshipsXml(slide, defaultRels) {
    let lastRid = 0
    let strXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';

    (slide._relsMedia || []).forEach(rel => {
        lastRid = Math.max(lastRid, rel.rId)
        if (rel.type.toLowerCase().indexOf('image') > -1) {
            strXml += '<Relationship Id="rId' + rel.rId + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="' + rel.Target + '"/>'
        }
    })

    defaultRels.forEach((rel, idx) => {
        strXml += '<Relationship Id="rId' + (lastRid + idx + 1) + '" Type="' + rel.type + '" Target="' + rel.target + '"/>'
    })

    strXml += '</Relationships>'
    return strXml
}

export function getContTypesXml(slides, slideLayouts, masterSlide) {
    let strXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml"/>'

    strXml += '<Default Extension="jpeg" ContentType="image/jpeg"/>'
    strXml += '<Default Extension="jpg" ContentType="image/jpg"/>'
    strXml += '<Default Extension="png" ContentType="image/png"/>'
    strXml += '<Default Extension="gif" ContentType="image/gif"/>'

    slides.forEach((slide, idx) => {
        strXml += '<Override PartName="/ppt/slideMasters/slideMaster' + (idx + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slides/slide' + (idx + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'
    })
    strXml += '<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/><Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>'
    slides.forEach((_slide, idx) => {
        strXml += ' <Override PartName="/ppt/notesSlides/notesSlide' + (idx + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>'
    })

    strXml += '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>'

    return strXml
}

export function getRootRelsXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>`
}

export function getAppXml(slides, company) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
	<TotalTime>0</TotalTime>
	<Words>0</Words>
	<Application>Microsoft Office PowerPoint</Application>
	<PresentationFormat>On-screen Show (16:9)</PresentationFormat>
	<Paragraphs>0</Paragraphs>
	<HiddenSlides>0</HiddenSlides>
	<MMClips>0</MMClips>
	<ScaleCrop>false</ScaleCrop>
	<HeadingPairs>
		<vt:vector size="6" baseType="variant">
			<vt:variant><vt:lpstr>Fonts Used</vt:lpstr></vt:variant>
			<vt:variant><vt:i4>2</vt:i4></vt:variant>
			<vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant>
			<vt:variant><vt:i4>1</vt:i4></vt:variant>
			<vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant>
			<vt:variant><vt:i4>${slides.length}</vt:i4></vt:variant>
		</vt:vector>
	</HeadingPairs>
	<TitlesOfParts>
		<vt:vector size="${slides.length + 3}" baseType="lpstr">
			<vt:lpstr>Arial</vt:lpstr>
			<vt:lpstr>Calibri</vt:lpstr>
			<vt:lpstr>Office Theme</vt:lpstr>
			${slides.map((_slideObj, idx) => '<vt:lpstr>Slide ' + (idx + 1) + '</vt:lpstr>\n').join('')}
		</vt:vector>
	</TitlesOfParts>
	<Company>${company}</Company>
	<LinksUpToDate>false</LinksUpToDate>
	<SharedDoc>false</SharedDoc>
	<HyperlinksChanged>false</HyperlinksChanged>
	<AppVersion>16.0000</AppVersion>
	</Properties>`
}

export function getCoreXml(title, subject, author, revision) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${title}</dc:title><dc:subject>${subject}</dc:subject><dc:creator>${author}</dc:creator><cp:lastModifiedBy>${author}</cp:lastModifiedBy><cp:revision>${revision}</cp:revision><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString().replace(/\.\d\d\dZ/, 'Z')}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString().replace(/\.\d\d\dZ/, 'Z')}</dcterms:modified></cp:coreProperties>`
}

export function getPresentationRels(slides) {
    let intRelNum = 1
    let strXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>'
    for (let idx = 1; idx <= slides.length; idx++) {
        strXml += `<Relationship Id="rId${++intRelNum}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${idx}.xml"/>`
    }
    intRelNum++
    strXml += `<Relationship Id="rId${intRelNum + 0}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="notesMasters/notesMaster1.xml"/><Relationship Id="rId${intRelNum + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/><Relationship Id="rId${intRelNum + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/><Relationship Id="rId${intRelNum + 3}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId${intRelNum + 4}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/></Relationships>`

    return strXml
}

export function getThemeXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light" panose="020F0302020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游ゴシック Light"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线 Light"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Angsana New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:majorFont><a:minorFont><a:latin typeface="Calibri" panose="020F0502020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="游ゴシック"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="等线"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000"/><a:satMod val="105000"/><a:tint val="67000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="103000"/><a:tint val="73000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="109000"/><a:tint val="81000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000"/><a:lumMod val="102000"/><a:tint val="94000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000"/><a:lumMod val="100000"/><a:shade val="100000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000"/><a:satMod val="120000"/><a:shade val="78000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/><a:extLst><a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}"><thm15:themeFamily xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main" name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}"/></a:ext></a:extLst></a:theme>`
}

export function getPresentationXml(pres) {
    let strXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" saveSubsetFonts="1" autoCompressPictures="0"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>`

    strXml += '<p:sldIdLst>'
    pres.slides.forEach(slide => (strXml += `<p:sldId id="${slide._slideId}" r:id="rId${slide._rId}"/>`))
    strXml += '</p:sldIdLst>'

    strXml += `<p:notesMasterIdLst><p:notesMasterId r:id="rId${pres.slides.length + 2}"/></p:notesMasterIdLst><p:sldSz cx="${pres.presLayout.width}" cy="${pres.presLayout.height}"/><p:notesSz cx="${pres.presLayout.height}" cy="${pres.presLayout.width}"/>`

    strXml += '<p:defaultTextStyle>'
    for (let idy = 1; idy < 10; idy++) {
        strXml += `<a:lvl${idy}pPr marL="${(idy - 1) * 457200}" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl${idy}pPr>`
    }
    strXml += '</p:defaultTextStyle>'

    strXml += '</p:presentation>'
    return strXml
}

export function getPresPropsXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentationPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>`
}

export function getTableStylesXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`
}

export function getViewPropsXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:viewPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:normalViewPr horzBarState="maximized"><p:restoredLeft sz="15611"/><p:restoredTop sz="94610"/></p:normalViewPr><p:slideViewPr><p:cSldViewPr snapToGrid="0" snapToObjects="1"><p:cViewPr varScale="1"><p:scale><a:sx n="136" d="100"/><a:sy n="136" d="100"/></p:scale><p:origin x="216" y="312"/></p:cViewPr><p:guideLst/></p:cSldViewPr></p:slideViewPr><p:notesTextViewPr><p:cViewPr><p:scale><a:sx n="1" d="1"/><a:sy n="1" d="1"/></p:scale><p:origin x="0" y="0"/></p:cViewPr></p:notesTextViewPr><p:gridSpacing cx="76200" cy="76200"/></p:viewPr>`
}

export function getLayoutXml(layout) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" preserve="1">${setSlideXml(layout)}<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`
}

export function getSlideLayoutRelXml(layoutNumber, slideLayouts) {
    return getRelationshipsXml(slideLayouts[layoutNumber - 1], [{
        target: '../slideMasters/slideMaster1.xml',
        type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster',
    },])
}

export function getSlideRelXml(slides, slideLayouts, slideNumber) {
    return getRelationshipsXml(slides[slideNumber - 1], [{
        target: '../slideLayouts/slideLayout' + getLayoutIdxForSlide(slides, slideLayouts, slideNumber) + '.xml',
        type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
    },
    {
        target: '../notesSlides/notesSlide' + slideNumber + '.xml',
        type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide',
    },
    ])
}

export function getSlideXml(slide) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" ${slide && slide.hidden ? ' show="0"' : ''}> ${setSlideXml(slide)}<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`
}

export function getNotesSlideXml(slide) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr> <p:cNvPr id="1" name=""/> <p:cNvGrpSpPr/> <p:nvPr/> </p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:sp><p:nvSpPr><p:cNvPr id="2" name="Slide Image Placeholder 1"/><p:cNvSpPr><a:spLocks noGrp="1" noRot="1" noChangeAspect="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldImg"/></p:nvPr></p:nvSpPr><p:spPr/></p:sp><p:sp><p:nvSpPr><p:cNvPr id="3" name="Notes Placeholder 2"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r> <a:rPr lang="en-US" dirty="0"/> <a:t> </a:t> </a:r><a:endParaRPr lang="en-US" dirty="0"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="4" name="Slide Number Placeholder 3"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldNum" sz="quarter" idx="10"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:fld id="{F7021451-1387-4CA6-816F-3879F97B5CBC}" type="slidenum"><a:rPr lang="en-US"/><a:t>${slide._slideNum}</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp></p:spTree><p:extLst><p:ext uri="{BB962C8B-B14F-4D97-AF65-F5344CB8AC3E}"><p14:creationId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="1024086991"/></p:ext></p:extLst></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:notes>`
}

export function getNotesSlideRelXml(slideNumber) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"> <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="../notesMasters/notesMaster1.xml"/> <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="../slides/slide${slideNumber}.xml"/> </Relationships>`
}

export function getMasterXml(slide, layouts) {
    let layoutDefs = layouts.map((_layoutDef, idx) => `<p:sldLayoutId id="${2147483649 + idx}" r:id="rId${idx + 1}"/>`)

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">${setSlideXml(slide)}<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink" /><p:sldLayoutIdLst>${layoutDefs.join('')}</p:sldLayoutIdLst><p:hf sldNum="0" hdr="0" ftr="0" dt="0" /><p:txStyles><p:titleStyle><a:lvl1pPr algn="ctr" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="0" /></a:spcBef><a:buNone /><a:defRPr sz="4400" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mj-lt" /><a:ea typeface="+mj-ea" /><a:cs typeface="+mj-cs" /></a:defRPr></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr marL="342900" indent="-342900" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="•" /><a:defRPr sz="3200" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl1pPr><a:lvl2pPr marL="742950" indent="-285750" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="–" /><a:defRPr sz="2800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl2pPr><a:lvl3pPr marL="1143000" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="•" /><a:defRPr sz="2400" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl3pPr><a:lvl4pPr marL="1600200" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="–" /><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl4pPr><a:lvl5pPr marL="2057400" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="»" /><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl5pPr><a:lvl6pPr marL="2514600" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="•" /><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl6pPr><a:lvl7pPr marL="2971800" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="•" /><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl7pPr><a:lvl8pPr marL="3429000" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="•" /><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl8pPr><a:lvl9pPr marL="3886200" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000" /></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0" /><a:buChar char="•" /><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl9pPr></p:bodyStyle><p:otherStyle><a:defPPr><a:defRPr lang="en-US" /></a:defPPr><a:lvl1pPr marL="0" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl1pPr><a:lvl2pPr marL="457200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl2pPr><a:lvl3pPr marL="914400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl3pPr><a:lvl4pPr marL="1371600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl4pPr><a:lvl5pPr marL="1828800" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl5pPr><a:lvl6pPr marL="2286000" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl6pPr><a:lvl7pPr marL="2743200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl7pPr><a:lvl8pPr marL="3200400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl8pPr><a:lvl9pPr marL="3657600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1" /></a:solidFill><a:latin typeface="+mn-lt" /><a:ea typeface="+mn-ea" /><a:cs typeface="+mn-cs" /></a:defRPr></a:lvl9pPr></p:otherStyle></p:txStyles></p:sldMaster>`;
}

export function getMasterRelXml(masterSlide, slideLayouts) {
    let defaultRels = slideLayouts.map((_layoutDef, idx) => ({
        target: `../slideLayouts/slideLayout${idx + 1}.xml`,
        type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
    }))

    defaultRels.push({
        target: '../theme/theme1.xml',
        type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme'
    })

    return getRelationshipsXml(masterSlide, defaultRels)
}

export function getNotesMasterRelXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?> <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"> <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/> </Relationships>`
}

function transSizeNum(size, dysize, layout) {
    if (typeof size === 'string' && !isNaN(Number(size))) size = Number(size)

    if (typeof size === 'number') return Math.round(914400 * size)

    if (typeof size === 'string' && size.indexOf('%') > -1) {
        if (dysize && dysize === 'X') return Math.round((parseFloat(size) / 100) * layout.width)
        if (dysize && dysize === 'Y') return Math.round((parseFloat(size) / 100) * layout.height)
        return Math.round((parseFloat(size) / 100) * layout.width)
    }
    return 0
}

function getColoXml(props) {
    let colorVal = ''
    let outText = ''

    // if (props.type) fillType = props.dashType
    if (props.color) colorVal = props.color

    outText += `<a:solidFill><a:srgbClr val="${colorVal.toUpperCase()}" /></a:solidFill>`

    return outText
}

function transCharEncode(str) {
    if (typeof str === 'undefined' || str == null) return ''
    return str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function getLinkType(p, v) {
    return v.split("t")[p === "s" ? 0 : 1]
}

function rotateLoc(x, y, cx, cy, linkType) {
    let sidx = getLinkType("s", linkType)
    let eidx = getLinkType("e", linkType)

    //中间坐标
    let sx = x - (x - cx) / 2
    let sy = y - (y - cy) / 2
    //2点的距离
    let w = Math.ceil(Math.abs(x - cx))
    let h = Math.ceil(Math.abs(y - cy))
    //翻转后的坐标
    let tx = Math.ceil(sx - h / 2)
    let ty = Math.ceil(sy - w / 2)

    return {
        tx,
        ty,
        h,
        w,
        sidx,
        eidx
    }
}

function encodeXmlEntities(xml = "img") {
    // NOTE: Dont use short-circuit eval here as value c/b "0" (zero) etc.!
    if (typeof xml === 'undefined' || xml == null) return ''
    return xml.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function getLayoutIdxForSlide(slides, slideLayouts, slideNumber) {
    for (let i = 0; i < slideLayouts.length; i++) {
        if (slideLayouts[i]._name === slides[slideNumber - 1]._slideLayout._name) {
            return i + 1
        }
    }

    return 1
}