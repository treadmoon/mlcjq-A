import {
    setShapeObj,
    setTextObj,
    setImgObj
} from "./setOpts"

export default class Group {
    constructor(slide, gid) {
        this._type = "group"
        this.child = []
        this.slide = slide
        this.options = {
            id: gid,
        }
    }

    addShape(shapeName, options) {
        this.child.push(setShapeObj(shapeName, options))
        return this
    }

    addBox(options) {
        this.options.x = options.x
        this.options.y = options.y
        this.options.w = options.w
        this.options.h = options.h

        let textParam = [{
            text: "",
            options: options
        }]
        this.child.push(setTextObj(textParam, options))
        return this
    }

    addText(text, options) {
        let textParam = [{
            text: text,
            options: options
        }]
        this.child.push(setTextObj(textParam, options))
        return this
    }

    addImg(options) {
        this.child.push(setImgObj(this.slide, options))
        return this
    }
}