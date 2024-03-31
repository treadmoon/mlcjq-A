import { jsx, Fragment, jsxs } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var createNestedList = (items) => {
  const nestedList = [];
  const stack = [];
  items.forEach((item) => {
    const newItem = __spreadValues({}, item);
    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop();
    }
    const parent = stack.length > 0 ? stack[stack.length - 1] : null;
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(newItem);
    } else {
      nestedList.push(newItem);
    }
    stack.push(newItem);
  });
  return nestedList;
};
var TOCInline = ({
  toc,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = "",
  collapse = false,
  ulClassName = ""
}) => {
  const re = Array.isArray(exclude) ? new RegExp("^(" + exclude.join("|") + ")$", "i") : new RegExp("^(" + exclude + ")$", "i");
  const filteredToc = toc.filter(
    (heading) => heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  );

  const createList = (items) => {
    if (!items || items.length === 0) {
      return null;
    }
    return /* @__PURE__ */ jsx("ul", {
      className: ulClassName, children: items.map((item, index) => /* @__PURE__ */ jsxs("li", {
        children: [
          /* @__PURE__ */ jsx("a", { href: `#${item.value}`, children: item.value }),
          createList(item.children)
        ]
      }, index))
    });
  };
  const nestedList = createNestedList(filteredToc);
  return /* @__PURE__ */ jsx(Fragment, {
    children: asDisclosure ? /* @__PURE__ */ jsxs("details", {
      open: !collapse, children: [
    /* @__PURE__ */ jsx("summary", { className: "ml-6 pb-2 pt-2 text-xl font-bold", children: "Table of Contents" }),
    /* @__PURE__ */ jsx("div", { className: "ml-6", children: createList(nestedList) })
      ]
    }) : createList(nestedList)
  });
};
var TOCInline_default = TOCInline;

export { TOCInline_default as default };
