import {
    setShapeObj,
    setTextObj,
    setImgObj
} from "./setOpts"

import Group from "./group"

export default class Slide {
    constructor(params) {
        this._name = 'Slide ' + params.slideNumber
        this._presLayout = params.presLayout
        this._rId = params.slideRId
        this._relsMedia = []
        this._rels = []
        this._relsChart = []
        this._slideId = params.slideId
        this._slideLayout = params.slideLayout || null
        this._slideNum = params.slideNumber
        this._slideObjects = []
    }

    addShape(shapeName, options) {
        this._slideObjects.push(setShapeObj(shapeName, options))
        return this
    }

    addText(text, options) {
        let textParam = [{
            text: text,
            options: options
        }]
        this._slideObjects.push(setTextObj(textParam, options))
        return this
    }

    addImage(options) {
        this._slideObjects.push(setImgObj(this, options))
        return this
    }

    addGroup(gid) {
        const newGroup = new Group(this, gid)
        this._slideObjects.push(newGroup)
        return newGroup
    }
}