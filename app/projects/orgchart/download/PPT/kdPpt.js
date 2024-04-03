import JSZip from "jszip";
import Slide from "./slide";
import * as getXML from "./getXml";
import { encodeSlideMediaRels } from "./media";

export default class KdPptx {
  get slides() {
    return this._slides;
  }

  get slideLayouts() {
    return this._slideLayouts;
  }

  get masterSlide() {
    return this._masterSlide;
  }

  get presLayout() {
    return this._presLayout;
  }

  constructor() {
    this.downType =
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    this.company = "kingdee";
    this.title = "itChart";
    this.subject = "itChart";
    this.author = "meiliang";
    this.revision = "1";

    this._presLayout = {
      name: "16to9",
      _sizeW: 9144000,
      _sizeH: 5143500,
      width: 9144000,
      height: 5143500,
    };

    this._slideLayouts = [
      {
        _margin: [0.5, 0.5, 0.5, 0.5],
        _name: "DEFAULT",
        _presLayout: this._presLayout,
        _relsMedia: [],
        _slide: null,
        _slideNum: 1000,
        _slideNumberProps: null,
        _slideObjects: [],
      },
    ];

    this._slides = [];

    this._masterSlide = {
      addImage: null,
      addShape: null,
      addText: null,
      _name: null,
      _presLayout: this._presLayout,
      _rId: null,
      _relsMedia: [],
      _slideId: null,
      _slideLayout: null,
      _slideNum: null,
      _slideNumberProps: null,
      _slideObjects: [],
    };
  }

  addSlide() {
    let slideLayout = {
      _name: "16to9",
      _presLayout: this.presLayout,
      _relsMedia: [],
      _slideNum: this.slides.length + 1,
    };

    let newSlide = new Slide({
      presLayout: this.presLayout,
      slideId: this.slides.length + 256,
      slideRId: this.slides.length + 2,
      slideNumber: this.slides.length + 1,
      slideLayout: slideLayout,
    });

    this._slides.push(newSlide);

    return newSlide;
  }

  downloadPpt(props) {
    let arrChartPromises = [];
    let arrMediaPromises = [];
    this.slides.forEach(slide => {
      arrMediaPromises = arrMediaPromises.concat(encodeSlideMediaRels(slide));
    });

    let zip = new JSZip();

    return Promise.all(arrMediaPromises).then(() => {
      zip.folder("_rels");
      zip.folder("docProps");
      zip.folder("ppt").folder("_rels");
      zip.folder("ppt/media");
      zip.folder("ppt/slideLayouts").folder("_rels");
      zip.folder("ppt/slideMasters").folder("_rels");
      zip.folder("ppt/slides").folder("_rels");
      zip.folder("ppt/theme");
      zip.folder("ppt/notesMasters").folder("_rels");
      zip.folder("ppt/notesSlides").folder("_rels");
      zip.file("[Content_Types].xml", getXML.getContTypesXml(this.slides));
      zip.file("_rels/.rels", getXML.getRootRelsXml());
      zip.file("docProps/app.xml", getXML.getAppXml(this.slides, this.company));
      zip.file(
        "docProps/core.xml",
        getXML.getCoreXml(this.title, this.subject, this.author, this.revision)
      );
      zip.file(
        "ppt/_rels/presentation.xml.rels",
        getXML.getPresentationRels(this.slides)
      );
      zip.file("ppt/theme/theme1.xml", getXML.getThemeXml());
      zip.file("ppt/presentation.xml", getXML.getPresentationXml(this));
      zip.file("ppt/presProps.xml", getXML.getPresPropsXml());
      zip.file("ppt/tableStyles.xml", getXML.getTableStylesXml());
      zip.file("ppt/viewProps.xml", getXML.getViewPropsXml());

      this.slideLayouts.forEach((layout, idx) => {
        zip.file(
          "ppt/slideLayouts/slideLayout" + (idx + 1) + ".xml",
          getXML.getLayoutXml(layout)
        );
        zip.file(
          "ppt/slideLayouts/_rels/slideLayout" + (idx + 1) + ".xml.rels",
          getXML.getSlideLayoutRelXml(idx + 1, this.slideLayouts)
        );
      });

      this.slides.forEach((slide, idx) => {
        zip.file(
          "ppt/slides/slide" + (idx + 1) + ".xml",
          getXML.getSlideXml(slide)
        );
        zip.file(
          "ppt/slides/_rels/slide" + (idx + 1) + ".xml.rels",
          getXML.getSlideRelXml(this.slides, this.slideLayouts, idx + 1)
        );
        zip.file(
          "ppt/notesSlides/notesSlide" + (idx + 1) + ".xml",
          getXML.getNotesSlideXml(slide)
        );
        zip.file(
          "ppt/notesSlides/_rels/notesSlide" + (idx + 1) + ".xml.rels",
          getXML.getNotesSlideRelXml(idx + 1)
        );
      });

      zip.file(
        "ppt/slideMasters/slideMaster1.xml",
        getXML.getMasterXml(this.masterSlide, this.slideLayouts)
      );
      zip.file(
        "ppt/slideMasters/_rels/slideMaster1.xml.rels",
        getXML.getMasterRelXml(this.masterSlide, this.slideLayouts)
      );
      zip.file(
        "ppt/notesMasters/_rels/notesMaster1.xml.rels",
        getXML.getNotesMasterRelXml()
      );

      this.slides.forEach(slide => {
        this.createChartMediaRels(slide, zip, arrChartPromises);
      });

      return Promise.all(arrChartPromises).then(() => {
        const pptFileName =
          typeof props === "object" && props.hasOwnProperty("fileName")
            ? props.fileName
            : typeof props === "string"
            ? props
            : "";
        const compressPpt =
          typeof props === "object" && props.hasOwnProperty("compression")
            ? props.compression
            : false;
        const fileName = pptFileName
          ? pptFileName.toString().toLowerCase().endsWith(".pptx")
            ? pptFileName
            : pptFileName + ".pptx"
          : "orgchart.pptx";

        zip
          .generateAsync({
            type: "blob",
            compression: compressPpt ? "DEFLATE" : "STORE",
          })
          .then(content => {
            return this.downByBrowser(fileName, content);
          });
      });
    });
  }

  downByBrowser(pptFileName, blobContent) {
    let eleLink = document.createElement("a");
    eleLink.setAttribute("style", "display:none;");
    eleLink.dataset.interception = "off";
    document.body.appendChild(eleLink);

    if (window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob([blobContent], {
        type: this.downType,
      });
      eleLink.onclick = function () {
        window.navigator.msSaveOrOpenBlob(blob, pptFileName);
      };
      eleLink.click();
      document.body.removeChild(eleLink);

      return pptFileName;
    } else if (window.URL.createObjectURL) {
      let url = window.URL.createObjectURL(
        new Blob([blobContent], {
          type: this.downType,
        })
      );
      eleLink.href = url;
      eleLink.download = pptFileName;
      eleLink.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(eleLink);
      }, 100);

      return pptFileName;
    }
  }

  createChartMediaRels(slide, zip, chartPromises) {
    slide._relsMedia.forEach(rel => {
      if (rel.type !== "online" && rel.type !== "hyperlink") {
        // A: Loop vars
        let data = rel.data && typeof rel.data === "string" ? rel.data : "";

        // B: Users will undoubtedly pass various string formats, so correct prefixes as needed
        if (data.indexOf(",") === -1 && data.indexOf(";") === -1)
          data = "image/png;base64," + data;
        else if (data.indexOf(",") === -1) data = "image/png;base64," + data;
        else if (data.indexOf(";") === -1) data = "image/png;" + data;

        // C: Add media
        zip.file(rel.Target.replace("..", "ppt"), data.split(",").pop(), {
          base64: true,
        });
      }
    });
  }
}
