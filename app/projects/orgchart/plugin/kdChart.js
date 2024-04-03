import * as l from 'd3'
const y = 1e3,
  Y = 0.25,
  X = 2,
  Z = 0.5,
  N = { w: 150, h: 60, xSpace: 36, ySpace: 36, xSpace2r: 18, ySpace2v: 18 },
  j = { background: '#fff', border: '#CAD1DB', borderType: '', radius: 4 },
  q = 'normal',
  J = { w: 180, h: 100 },
  K = { 12: 16, 14: 19, 16: 21 },
  Q = { background: '#fff' },
  f = { bottom: 1, right: 2, top: 3, left: 4 },
  tt = { stroke: '#bbb' },
  I = 500,
  et = 500,
  at =
    "Roboto,'San Francisco','Helvetica Neue',Helvetica,Arial,'PingFang SC','Hiragina Sans GB','WenQuanYi Micro Hei','microsoft yahei ui','microsoft yahei',sans-serif"
function k(s, t) {
  ;(function e(a) {
    for (let r = 0; r < a.length; r++) {
      const i = a[r]
      t(i), i.children && 0 < i.children.length && e(i.children)
    }
  })([s])
}
function C(s, t, e) {
  let a = t
  return (a = typeof s == 'function' ? s(e) : s === void 0 ? t : s)
}
function R(s, t) {
  let e = -1
  for (let a = 0; a < s.length; a++)
    if (s[a].id === t.id) {
      e = a
      break
    }
  s.splice(e, 1)
}
function rt(s, t) {
  return [.../* @__PURE__ */ new Set([...s, t])]
}
function b(s, t, e) {
  ;(function a(r) {
    for (let i = 0; i < r.length; i++) {
      if (r[i].id === t) {
        e(r[i])
        break
      }
      r[i].children && a(r[i].children)
    }
  })([s])
}
function H(s, t, e, a) {
  var r = s[t]
  switch (a) {
    case 1:
    case 3:
      s.splice(e, 0, r)
      break
    case 2:
    case 4:
      s.splice(e + 1, 0, r)
  }
  e < t && (t += 1), s.splice(t, 1)
}
function M() {
  return -1 < navigator.userAgent.toLowerCase().indexOf('trident')
}
function it() {
  return -1 < navigator.userAgent.toLowerCase().indexOf('firefox')
}
function W(s, t) {
  return (s += (0 < t ? -1 : 1) * Y), (s = Math.min(X, s)), Math.max(Z, s)
}
const L = {
    0: 6.6875,
    1: 5.625,
    2: 6.6875,
    3: 6.6875,
    4: 6.890625,
    5: 6.6875,
    6: 6.6875,
    7: 6.46875,
    8: 6.6875,
    9: 6.6875,
    q: 7.265625,
    w: 8.78125,
    e: 6.546875,
    r: 4.28125,
    t: 3.859375,
    y: 5.875,
    u: 6.9375,
    i: 2.671875,
    o: 7.28125,
    p: 7.265625,
    a: 6.40625,
    s: 5.046875,
    d: 7.265625,
    f: 3.578125,
    g: 7.265625,
    h: 6.9375,
    j: 2.671875,
    k: 5.765625,
    l: 2.671875,
    z: 6.015625,
    x: 5.46875,
    c: 5.765625,
    v: 5.875,
    b: 7.265625,
    n: 6.9375,
    m: 10.65625,
    Q: 9.78125,
    W: 11.609375,
    E: 6.484375,
    R: 7.203125,
    T: 6.640625,
    Y: 7,
    U: 8.40625,
    I: 2.953125,
    O: 9.875,
    P: 7.0625,
    A: 8.15625,
    S: 6.453125,
    D: 8.734375,
    F: 6.03125,
    G: 8.65625,
    H: 8.78125,
    J: 4.203125,
    K: 6.828125,
    L: 5.9375,
    Z: 7.390625,
    X: 7.296875,
    C: 8.0625,
    V: 7.828125,
    B: 7.0625,
    N: 9.1875,
    M: 10.796875,
    '-': 5.15625,
    '=': 8.421875,
    '[': 3.65625,
    ' ': 3.5625,
    ']': 3.65625,
    ';': 2.890625,
    "'": 2.78125,
    ',': 2.890625,
    '.': 2.890625,
    '·': 2.890625,
    '/': 4.75,
    '!': 3.6875,
    '@': 12.234375,
    '#': 7.828125,
    $: 6.6875,
    '%': 10.171875,
    '^': 8.421875,
    '&': 9.03125,
    '*': 5.265625,
    '(': 3.65625,
    ')': 3.65625,
    _: 5.390625,
    '+': 8.421875,
    '{': 3.65625,
    '}': 3.65625,
    ':': 2.890625,
    '"': 4.34375,
    '&lt;': 8.421875,
    '&gt;': 8.421875,
    '?': 5.578125,
    '~': 8.421875,
    '`': 3.21875,
  },
  st = {
    0: 7.796875,
    1: 6.390625,
    2: 7.796875,
    3: 7.796875,
    4: 8.03125,
    5: 7.796875,
    6: 7.796875,
    7: 7.546875,
    8: 7.796875,
    9: 7.796875,
    q: 8.484375,
    w: 10.234375,
    e: 7.640625,
    r: 5,
    t: 4.5,
    y: 6.859375,
    u: 8.09375,
    i: 3.109375,
    o: 8.484375,
    p: 8.484375,
    a: 7.484375,
    s: 5.875,
    d: 8.484375,
    f: 4.171875,
    g: 8.484375,
    h: 8.09375,
    j: 3.109375,
    k: 6.71875,
    l: 3.109375,
    z: 7.015625,
    x: 6.375,
    c: 6.71875,
    v: 6.859375,
    b: 8.484375,
    n: 8.09375,
    m: 12.4375,
    Q: 11.40625,
    W: 13.546875,
    E: 7.5625,
    R: 8.40625,
    T: 7.734375,
    Y: 8.171875,
    U: 9.796875,
    I: 3.453125,
    O: 11.515625,
    P: 8.234375,
    A: 9.515625,
    S: 7.515625,
    D: 10.1875,
    F: 7.03125,
    G: 10.109375,
    H: 10.234375,
    J: 4.90625,
    K: 7.96875,
    L: 6.9375,
    Z: 8.625,
    X: 8.515625,
    C: 9.40625,
    V: 9.140625,
    B: 8.234375,
    N: 10.71875,
    M: 12.59375,
    '-': 6.015625,
    '=': 9.828125,
    '[': 4.265625,
    ' ': 4.15625,
    ']': 4.265625,
    ';': 3.359375,
    "'": 3.234375,
    ',': 3.359375,
    '.': 3.359375,
    '·': 3.359375,
    '/': 5.546875,
    '!': 4.3125,
    '@': 14.28125,
    '#': 9.140625,
    $: 7.796875,
    '%': 11.859375,
    '^': 9.828125,
    '&': 10.546875,
    '*': 6.140625,
    '(': 4.265625,
    ')': 4.265625,
    _: 6.28125,
    '+': 9.828125,
    '{': 4.265625,
    '}': 4.265625,
    ':': 3.359375,
    '"': 5.078125,
    '&lt;': 9.828125,
    '&gt;': 9.828125,
    '?': 6.515625,
    '~': 9.828125,
    '`': 3.765625,
  },
  pt = {
    0: 8.90625,
    1: 7.15625,
    2: 8.90625,
    3: 8.90625,
    4: 9.171875,
    5: 8.90625,
    6: 8.90625,
    7: 8.625,
    8: 8.90625,
    9: 8.90625,
    q: 9.6875,
    w: 11.703125,
    e: 8.734375,
    r: 5.703125,
    t: 5.140625,
    y: 7.828125,
    u: 9.25,
    i: 3.546875,
    o: 9.703125,
    p: 9.6875,
    a: 8.546875,
    s: 6.71875,
    d: 9.6875,
    f: 4.765625,
    g: 9.6875,
    h: 9.25,
    j: 3.546875,
    k: 7.671875,
    l: 3.546875,
    z: 8.015625,
    x: 7.28125,
    c: 7.671875,
    v: 7.828125,
    b: 9.6875,
    n: 9.25,
    m: 14.203125,
    Q: 13.03125,
    W: 15.46875,
    E: 8.640625,
    R: 9.59375,
    T: 8.84375,
    Y: 9.328125,
    U: 11.203125,
    I: 3.9375,
    O: 13.15625,
    P: 9.40625,
    A: 10.875,
    S: 8.59375,
    D: 11.640625,
    F: 8.03125,
    G: 11.546875,
    H: 11.703125,
    J: 5.609375,
    K: 9.109375,
    L: 7.921875,
    Z: 9.84375,
    X: 9.734375,
    C: 10.734375,
    V: 10.4375,
    B: 9.40625,
    N: 12.25,
    M: 14.390625,
    '-': 6.875,
    '=': 11.234375,
    '[': 4.875,
    ' ': 4.734375,
    ']': 4.875,
    ';': 3.84375,
    "'": 3.703125,
    ',': 3.84375,
    '.': 3.84375,
    '·': 3.84375,
    '/': 6.328125,
    '!': 4.921875,
    '@': 16.3125,
    '#': 10.4375,
    $: 8.90625,
    '%': 13.546875,
    '^': 11.234375,
    '&': 12.046875,
    '*': 7.015625,
    '(': 4.875,
    ')': 4.875,
    _: 7.171875,
    '+': 11.234375,
    '{': 4.875,
    '}': 4.875,
    ':': 3.84375,
    '"': 5.796875,
    '&lt;': 11.234375,
    '&gt;': 11.234375,
    '?': 7.4375,
    '~': 11.234375,
    '`': 4.296875,
  },
  V = {
    0: 7.40625,
    1: 7.40625,
    2: 7.40625,
    3: 7.40625,
    4: 7.40625,
    5: 7.40625,
    6: 7.40625,
    7: 7.40625,
    8: 7.40625,
    9: 7.40625,
    q: 7.984375,
    w: 10.21875,
    e: 6.984375,
    r: 5.09375,
    t: 4.96875,
    y: 6.890625,
    u: 7.78125,
    i: 3.5625,
    o: 7.890625,
    p: 8,
    a: 6.9375,
    s: 5.9375,
    d: 7.984375,
    f: 4.875,
    g: 7.984375,
    h: 7.75,
    j: 3.625,
    k: 7.15625,
    l: 3.5625,
    z: 6.171875,
    x: 7.03125,
    c: 6.203125,
    v: 6.9375,
    b: 8,
    n: 7.78125,
    m: 11.796875,
    Q: 9.828125,
    W: 12.921875,
    E: 6.875,
    R: 8.390625,
    T: 7.515625,
    Y: 7.78125,
    U: 9.328125,
    I: 4.03125,
    O: 9.828125,
    P: 7.890625,
    A: 9.03125,
    S: 7.21875,
    D: 9.5,
    F: 6.703125,
    G: 9.1875,
    H: 9.859375,
    J: 5.65625,
    K: 8.328125,
    L: 6.5625,
    Z: 7.8125,
    X: 8.40625,
    C: 8.09375,
    V: 8.578125,
    B: 8.203125,
    N: 10.1875,
    M: 12.34375,
    '-': 5.25,
    '=': 9.140625,
    '[': 4.6875,
    ' ': 3.578125,
    ']': 4.6875,
    ';': 3.4375,
    "'": 3.703125,
    ',': 3.4375,
    '.': 3.4375,
    '·': 5.28125,
    '/': 5.671875,
    '!': 4.1875,
    '@': 12.359375,
    '#': 7.6875,
    $: 7.40625,
    '%': 11.1875,
    '^': 9.140625,
    '&': 10.9375,
    '*': 5.859375,
    '(': 4.6875,
    ')': 4.6875,
    _: 5.390625,
    '+': 9.140625,
    '{': 4.6875,
    '}': 4.6875,
    ':': 3.4375,
    '"': 6.265625,
    '&lt;': 9.140625,
    '&gt;': 9.140625,
    '?': 5.703125,
    '~': 9.140625,
    '`': 4.015625,
  },
  ot = {
    0: 8.640625,
    1: 8.640625,
    2: 8.640625,
    3: 8.640625,
    4: 8.640625,
    5: 8.640625,
    6: 8.640625,
    7: 8.640625,
    8: 8.640625,
    9: 8.640625,
    q: 9.3125,
    w: 11.921875,
    e: 8.15625,
    r: 5.9375,
    t: 5.796875,
    y: 8.046875,
    u: 9.078125,
    i: 4.15625,
    o: 9.203125,
    p: 9.328125,
    a: 8.09375,
    s: 6.921875,
    d: 9.3125,
    f: 5.6875,
    g: 9.3125,
    h: 9.046875,
    j: 4.234375,
    k: 8.359375,
    l: 4.15625,
    z: 7.203125,
    x: 8.203125,
    c: 7.234375,
    v: 8.09375,
    b: 9.328125,
    n: 9.078125,
    m: 13.75,
    Q: 11.46875,
    W: 15.078125,
    E: 8.015625,
    R: 9.78125,
    T: 8.765625,
    Y: 9.078125,
    U: 10.875,
    I: 4.703125,
    O: 11.46875,
    P: 9.203125,
    A: 10.53125,
    S: 8.421875,
    D: 11.09375,
    F: 7.828125,
    G: 10.71875,
    H: 11.5,
    J: 6.59375,
    K: 9.703125,
    L: 7.65625,
    Z: 9.109375,
    X: 9.8125,
    C: 9.4375,
    V: 10.015625,
    B: 9.578125,
    N: 11.875,
    M: 14.40625,
    '-': 6.125,
    '=': 10.671875,
    '[': 5.46875,
    ' ': 4.171875,
    ']': 5.46875,
    ';': 4,
    "'": 4.328125,
    ',': 4,
    '.': 4,
    '·': 6.15625,
    '/': 6.625,
    '!': 4.890625,
    '@': 14.421875,
    '#': 8.96875,
    $: 8.640625,
    '%': 13.046875,
    '^': 10.671875,
    '&': 12.765625,
    '*': 6.828125,
    '(': 5.46875,
    ')': 5.46875,
    _: 6.28125,
    '+': 10.671875,
    '{': 5.46875,
    '}': 5.46875,
    ':': 4,
    '"': 7.296875,
    '&lt;': 10.671875,
    '&gt;': 10.671875,
    '?': 6.640625,
    '~': 10.671875,
    '`': 4.671875,
  },
  ht = {
    0: 9.875,
    1: 9.875,
    2: 9.875,
    3: 9.875,
    4: 9.875,
    5: 9.875,
    6: 9.875,
    7: 9.875,
    8: 9.875,
    9: 9.875,
    q: 10.640625,
    w: 13.625,
    e: 9.3125,
    r: 6.78125,
    t: 6.625,
    y: 9.1875,
    u: 10.375,
    i: 4.734375,
    o: 10.515625,
    p: 10.65625,
    a: 9.25,
    s: 7.90625,
    d: 10.640625,
    f: 6.484375,
    g: 10.640625,
    h: 10.328125,
    j: 4.828125,
    k: 9.546875,
    l: 4.734375,
    z: 8.21875,
    x: 9.359375,
    c: 8.265625,
    v: 9.234375,
    b: 10.65625,
    n: 10.375,
    m: 15.71875,
    Q: 13.09375,
    W: 17.21875,
    E: 9.15625,
    R: 11.171875,
    T: 10.015625,
    Y: 10.375,
    U: 12.421875,
    I: 5.375,
    O: 13.09375,
    P: 10.515625,
    A: 12.03125,
    S: 9.625,
    D: 12.671875,
    F: 8.9375,
    G: 12.25,
    H: 13.140625,
    J: 7.53125,
    K: 11.09375,
    L: 8.75,
    Z: 10.40625,
    X: 11.203125,
    C: 10.78125,
    V: 11.4375,
    B: 10.9375,
    N: 13.578125,
    M: 16.453125,
    '-': 6.984375,
    '=': 12.1875,
    '[': 6.234375,
    ' ': 4.765625,
    ']': 6.234375,
    ';': 4.578125,
    "'": 4.9375,
    ',': 4.578125,
    '.': 4.578125,
    '·': 7.03125,
    '/': 7.5625,
    '!': 5.578125,
    '@': 16.484375,
    '#': 10.25,
    $: 9.875,
    '%': 14.90625,
    '^': 12.1875,
    '&': 14.578125,
    '*': 7.796875,
    '(': 6.234375,
    ')': 6.234375,
    _: 7.171875,
    '+': 12.1875,
    '{': 6.234375,
    '}': 6.234375,
    ':': 4.578125,
    '"': 8.34375,
    '&lt;': 12.1875,
    '&gt;': 12.1875,
    '?': 7.59375,
    '~': 12.1875,
    '`': 5.34375,
  }
function nt(s) {
  var t = ut(s)
  const e = []
  let a = s.texts
  for (let o = 1; o <= t.lineNums; o++) {
    var r = ct(a, s, t)
    if (
      (s.wMode === 'tb'
        ? e.push({ text: r.txt, x: s.bx + (o - 0.5) * s.fontSize, y: s.by, len: r.txtWidth })
        : e.push({ text: r.txt, x: s.bx, y: s.by + o * s.fontSize, len: r.txtWidth }),
      (a = r.restText).length == 0)
    )
      break
  }
  e.map((o) => {
    var [h, d] = dt(s, o.len, e.length)
    ;(o.x += h), (o.y += d)
  })
  var i,
    p = 0 < a.length
  return (
    p &&
      0 < e.length &&
      ((i = e[e.length - 1].text), (e[e.length - 1].text = i.substr(0, i.length - 1) + '…')),
    { textDoms: e, isEllipsis: p }
  )
}
function dt(
  {
    wMode: s = '',
    boxHeight: t = 0,
    boxWidth: e = 0,
    fontSize: a = 12,
    fontHeight: r = 14,
    valign: i = '',
    textAnchor: p = '',
  },
  o,
  h
) {
  let d = 0,
    c = 0
  if (s === 'tb')
    switch (((c = (e - h * a) / 2), i)) {
      case 'center':
        d = (t - o) / 2
        break
      case 'bottom':
        d = t - o
    }
  else {
    switch (i) {
      case 'center':
        d = (t - h * r) / 2
        break
      case 'bottom':
        d = t - h * r
    }
    switch (p) {
      case 'middle':
        c = (e - o) / 2
        break
      case 'end':
        c = e - o
    }
  }
  return [c, d]
}
function ct(s, t, e) {
  let a = '',
    r = 0,
    i = 1
  for (; r < s.length; r++) {
    var p = F(s[r], t.fontSize, t.fontWeight)
    if (!(i + p <= e.textLineWidth)) break
    ;(a += s[r]), (i += p)
  }
  return { txt: a, txtWidth: i, restText: s.slice(r) }
}
function F(s = '', t = 14, e = 500) {
  let a = 0
  if (255 < s.charCodeAt(0)) a = t
  else
    switch ('S' + (16 < t ? 'max' : t < 12 ? 'min' : t) + 'F' + (600 <= e ? '6' : 'N')) {
      case 'SminFN':
        a = (L[s] * t) / 12
        break
      case 'S12FN':
        a = L[s]
        break
      case 'S14FN':
        a = st[s]
        break
      case 'S16FN':
        a = pt[s]
        break
      case 'SmaxFN':
        a = (L[s] * t) / 12
        break
      case 'SminF6':
        a = (V[s] * t) / 12
        break
      case 'S12F6':
        a = V[s]
        break
      case 'S14F6':
        a = ot[s]
        break
      case 'S16F6':
        a = ht[s]
        break
      case 'SmaxF6':
        a = (V[s] * t) / 12
    }
  return a
}
function lt(s, t = 12, e = 100) {
  let a = 1
  for (let r = 0; r < s.length; r++) a += F(s[r], t, e)
  return a
}
function ut({ wMode: s = '', boxHeight: t = 0, boxWidth: e = 0, fontHeight: a = 14 }) {
  let r = 0,
    i = 0
  return (
    (i = s === 'tb' ? ((r = t), Math.floor(e / a)) : ((r = e), Math.floor(t / a))),
    { textLineWidth: r, lineNums: i }
  )
}
function gt(s) {
  return K[s] ?? s + 2
}
function wt(r, t) {
  if (!r) return null
  const e = {}
  var a = l.tree().nodeSize([t.w + t.xSpace, t.h + t.ySpace]),
    r = l.hierarchy(r)
  return (
    a(r),
    r.descendants().forEach((i) => {
      e[i.data.id] = { x: i.x, y: i.y + t.h / 2 + 20, depth: i.depth }
    }),
    e
  )
}
function At(s) {
  return (
    (s = l
      .create('div')
      .attr('class', 'svg_wrapper')
      .style('width', s.w + 'px')
      .style('height', s.h + 'px')
      .style('position', 'absolute')
      .style('overflow', 'hidden')
      .style('left', '50%')
      .style('top', '0')
      .style('transform', 'translateX(-50%)')),
    s.html("<div class='null_data'><div class='tips_img' ></div><p>暂无数据</p></div>"),
    s
  )
}
function Ct(s = 180) {
  return (
    (s = Math.min(s, 180)),
    (s = Math.max(s, 120)),
    l
      .create('div')
      .attr('class', 'text_tips_wrapper')
      .style('position', 'absolute')
      .style('display', 'none')
      .style('max-width', s + 'px')
      .style('overflow', 'hidden')
      .style('background', '#fff')
      .style('border', '1px solid rgba(217, 217, 217, 1)')
      .style('box-shadow', '0px 2px 4px 0px rgba(0, 0, 0, 0.12)')
      .style('padding', '2px 8px')
      .style('font-size', '12px')
      .style('line-height', '16px')
      .style('color', '#212121')
      .style('word-break', 'break-all')
      .style('z-index', 1)
  )
}
function vt(s) {
  return l.create('svg').style('background', s).style('user-select', 'none')
}
function G(s) {
  var t = l
    .create('svg:rect')
    .attr('class', 'card-wrapper')
    .attr('width', s.cardSize.w)
    .attr('height', s.cardSize.h)
    .attr('rx', s.cardStyle.radius || 2)
    .attr('fill-opacity', s.cardStyle.opacity || 1)
    .attr('fill', s.cardStyle.background)
    .attr('stroke', s.cardStyle.border)
    .attr('stroke-dasharray', s.cardStyle.borderType)
    .attr('stroke-linecap', 'round')
    .attr('stroke-opacity', s.cardStyle.opacity == 0 ? 0 : 1)
    .attr('stroke-width', 1)
    .attr('shape-rendering', 'auto')
  return (t.node().__data__ = s), t
}
function $(a, t, r = 1) {
  var a = O(a, t, r),
    { textDoms: r, isEllipsis: i } = nt(a)
  const p = l
    .create('svg:text')
    .attr('writing-mode', a.wMode)
    .attr('fill', a.color)
    .attr('xml:space', 'preserve')
    .attr('text-anchor', 'start')
    .attr('font-size', a.fontSize)
    .attr('font-weight', a.fontWeight)
    .attr('class', 'cardto' + t.id)
  return (
    r.map((o) => {
      p.append('svg:tspan')
        .text(o.text)
        .attr('x', o.x)
        .attr('y', o.y)
        .attr('font-family', at)
        .attr('word-spacing', 0)
        .attr('letter-spacing', 0)
        .attr('textLength', o.len)
    }),
    [p, i]
  )
}
function O(s, t, e = 1) {
  var {
    fontSize: a = 12,
    fontWeight: r = et,
    wMode: i = 'lr',
    valign: p = 'center',
    textAnchor: o = 'start',
    w: h = 0,
    h: d = 0,
    x: c = 0,
    y: n = 0,
  } = s
  return {
    texts: s.text({ node: t })[0] || '',
    fontSize: a * e,
    fontHeight: gt(a) * e,
    fontWeight: r,
    color: C(s.color, '#fff', { node: t }),
    wMode: i,
    valign: p,
    textAnchor: o,
    boxWidth: parseInt(h * e + ''),
    boxHeight: parseInt(d * e + ''),
    bx: c * e,
    by: n * e,
  }
}
function xt(s, t) {
  var e = l.create('svg:defs'),
    a = 'imgRect' + s,
    r = t.imgSize / 2
  return (
    e
      .append('rect')
      .attr('id', a)
      .attr('x', t.cx)
      .attr('y', t.cy)
      .attr('rx', t.rx)
      .attr('width', 2 * r)
      .attr('height', 2 * r)
      .attr('stroke', '#f00')
      .attr('stroke-width', 2),
    e
      .append('clipPath')
      .attr('id', s)
      .append('use')
      .attr('xlink:href', '#' + a),
    e
  )
}
function yt(s, t, e, a, r) {
  return l
    .create('svg:image')
    .attr('id', a)
    .attr('style', s.style ?? '')
    .attr('crossOrigin', 'Anonymous')
    .attr('xlink:href', s.url({ node: e }))
    .attr('width', r.rw)
    .attr('height', r.rh)
    .attr('x', r.x)
    .attr('y', r.y)
    .attr('clip-path', 'url(#' + t + ')')
}
function B(s, t, e = 1) {
  var a = s.class ?? '',
    r = a === 'clickDom' ? 'pointer' : 'move',
    { fillOpacity: i, strokeOpacity: p, strokeWidth: o, fill: h, stroke: d } = s
  return l
    .create('svg:rect')
    .attr('class', a)
    .attr('x', s.x)
    .attr('y', s.y)
    .attr('rx', s.rx)
    .attr('width', s.w * e)
    .attr('height', s.h * e)
    .attr('fill', C(h, '#fff', { node: t }))
    .attr('fill-opacity', i == 0 ? 0 : i || 1)
    .attr('stroke', C(d, '#fff', { node: t }))
    .attr('stroke-width', o == 0 ? 0 : 1)
    .attr('stroke-opacity', p == 0 ? 0 : p || 1)
    .attr('shape-rendering', 'auto')
    .attr('style', 'cursor:' + r)
}
function ft(e, t) {
  var { x: e = 0, y: a = 0, w: r = 0, h: i = 0, vw: p = 0, vh: o = 0 } = e
  return l
    .create('svg:svg')
    .attr('x', C(e, 0, { node: t }))
    .attr('y', C(a, 0, { node: t }))
    .attr('width', r)
    .attr('height', i)
    .attr('style', 'vertical-align:middle;fill:currentColor;overflow:hidden;')
    .attr('viewBox', `0 0 ${p} ` + o)
}
function kt(s, t) {
  return l
    .create('svg:circle')
    .attr('r', s.r)
    .attr('cx', s.x)
    .attr('cy', s.y)
    .attr('class', s.class || '')
    .attr('fill', C(s.fill, '#fff', { node: t }))
    .attr('stroke', C(s.stroke, '#fff', { node: t }))
    .attr('stroke-opacity', s.strokeOpacity || 1)
    .attr('shape-rendering', 'crispEdges')
}
function mt({ x: s = 0, y: t = 0, w: e = 0, stroke: a = '#ccc', strokeDasharray: r }) {
  return l
    .create('svg:path')
    .attr('class', 'infoLine')
    .attr('d', `M${s},${t} H` + (s + parseInt(e + '')))
    .attr('fill-opacity', 0)
    .attr('stroke-width', 0.5)
    .attr('stroke', a)
    .attr('stroke-dasharray', r ?? e)
    .attr('shape-rendering', 'crispEdges')
}
function St({
  x: s = 0,
  y: t = 0,
  w: e = 0,
  line: a = '',
  stroke: r = '#ccc',
  strokeDasharray: i,
}) {
  return l
    .create('svg:path')
    .attr('class', 'infoLine')
    .attr('d', `M${s},${t} ` + a)
    .attr('fill-opacity', 0)
    .attr('stroke-width', 0.5)
    .attr('stroke', r)
    .attr('stroke-dasharray', i ?? e)
    .attr('shape-rendering', 'crispEdges')
}
function Dt(s, t) {
  var { fontSize: e = 12, fill: a = '', x: r = 0, y: i = 0, text: o, follow: p } = s,
    o = C(o, '', { node: t })
  let h = 0,
    d = 0
  return (
    p && p.tag && ((t = bt(p, t)), p.wMode === 'tb' ? (d = t) : (h = t)),
    l
      .create('svg:text')
      .html(o)
      .attr('class', 'icon ' + s.class)
      .attr('font-size', e)
      .attr('fill', a)
      .attr('x', r + h)
      .attr('y', i + e + d)
  )
}
function bt(s, t) {
  let e = 0
  switch (s.tag) {
    case 'text':
      var a = O(s, t, 1),
        r = lt(a.texts, a.fontSize, a.fontWeight)
      if (a.wMode === 'lr') {
        if (r > a.boxWidth) break
        switch (a.textAnchor) {
          case 'start':
            break
          case 'middle':
            e = (a.boxWidth - r) / 2
            break
          case 'end':
            e = a.boxWidth - r
        }
      }
      if (a.wMode === 'tb') {
        if (r > a.boxHeight) break
        switch (a.valign) {
          case 'top':
            break
          case 'center':
            e = (a.boxHeight - r) / 2
            break
          case 'bottom':
            e = a.boxHeight - r
        }
      }
  }
  return e
}
function Mt(s, t, { h: e = 0 }) {
  const a = t.x - t.cardSize.w / 2,
    r = t.y - e / 2
  ;(e = l
    .create('svg:g')
    .attr('transform', 'translate(' + a + ',' + r + ')')
    .attr('class', 'shadowGroup')),
    e
      .append('svg:rect')
      .attr('width', t.cardSize.w)
      .attr('height', t.cardSize.h)
      .attr('rx', 2)
      .attr('stroke', '#1890ff')
      .attr('stroke-dasharray', '3 3 3')
      .attr('stroke-linecap', 'round')
      .attr('stroke-opacity', 1)
      .attr('fill', '#eeeeee')
      .attr('fill-opacity', 1)
      .attr('stroke-width', 1)
      .attr('shape-rendering', 'auto'),
    s.appendChild(e.node())
}
function Lt() {
  l.selectAll('.shadowGroup').remove()
}
function Vt(
  { x: s = 0, y: t = 0, w: e = 0, h: a = 0, path: r, class: i = '', fill: p = '#fff' },
  o
) {
  const h = l
    .create('svg:svg')
    .attr('class', 'cardmenu-svgwrapper')
    .attr('x', s)
    .attr('y', t)
    .attr('width', e)
    .attr('height', a)
    .attr('style', 'vertical-align:middle;fill:currentColor;overflow:hidden;')
    .attr('viewBox', '0 0 1024 1024')
  return (
    C(r, [], { node: o }).forEach((d) => {
      typeof d == 'string'
        ? h.append('path').attr('class', i).attr('d', d).attr('fill', p).attr('fill-opacity', 1)
        : h
            .append('path')
            .attr('class', i)
            .attr('d', d.d)
            .attr('fill', d.fill || p)
            .attr('fill-opacity', d.opacity == 0 ? 0 : d.opacity || 1)
    }),
    h
  )
}
function Gt({ class: s = '', d: t, fill: e, fillOpacity: a }, r) {
  return l
    .create('svg:path')
    .attr('class', s)
    .attr('d', C(t, [], { node: r }))
    .attr('fill', C(e, '#fff', { node: r }))
    .attr('fill-opacity', a == 0 ? 0 : 1)
}
function E(s, { className: t = '', fontSize: e = 12, x: a = 0, y: r = 0, fill: i = '' }) {
  return l
    .create('svg:text')
    .html(s)
    .attr('class', 'icon ' + t)
    .attr('style', `font-size:${e}px`)
    .attr('fill', i)
    .attr('x', a)
    .attr('y', r)
    .attr('cursor', 'pointer')
}
function zt(s, t, e, a) {
  return l
    .create('svg:circle')
    .attr('class', a)
    .attr('r', s)
    .attr('cx', t)
    .attr('cy', e)
    .attr('fill', '#fff')
    .attr('stroke-opacity', 0)
    .attr('shape-rendering', 'crispEdges')
}
function Pt(s, t, e) {
  let a = t.w / 2 - e / 2,
    r = 0
  switch (s) {
    case 1:
      r = t.h + e
      break
    case 2:
      ;(r = t.h / 2 + e / 2), (a = t.w)
      break
    case 3:
      r = 0
      break
    case 4:
      ;(r = t.h / 2 + e / 2), (a = -e)
  }
  return [a, r]
}
class Tt {
  constructor(t) {
    ;(this.kdChartApp = t), this.initChartData()
  }
  initChartData() {
    ;(this.chartDataMap = {}), (this.chartData = this.initFormatData())
  }
  initFormatData() {
    const t = this.getCardLocMap() ?? {},
      e = this.nodeList,
      a = this.linkList,
      r = (i, p = null) => {
        var d, c, n
        var o,
          h = []
        for (let u = 0; u < i.length; u++)
          i[u] &&
            (((o = {
              id: i[u].id,
              data: i[u],
              parent: p,
              ...t[i[u].id],
              getNodes: e,
              getLinks: a,
            }).x0 = o.x),
            (o.y0 = o.y),
            0 <
              (((c = (d = i[u]) == null ? void 0 : d.children) == null ? void 0 : c.length) ?? 0) &&
              ((o.children = r(((n = i[u]) == null ? void 0 : n.children) ?? [], o)),
              (o._children = o.children)),
            o.cardStyle || (o.cardStyle = j),
            o.cardModel || (o.cardModel = q),
            o.cardSize || (o.cardSize = this.kdChartApp.baseCardSize ?? N),
            this.kdChartApp.customChartItemAttr && this.kdChartApp.customChartItemAttr(o),
            (this.chartDataMap[o.id] = o),
            h.push(o))
        return h
      }
    return r([this.kdChartApp.treeDataApp.treeData], null)[0]
  }
  nodeList() {
    const t = []
    return (
      k(this, (e) => {
        t.push(e)
      }),
      t
    )
  }
  linkList() {
    const t = []
    return (
      k(this, (e) => {
        e.children &&
          0 < e.children.length &&
          e.children.map((a) => {
            t.push({ source: e, target: a })
          })
      }),
      t
    )
  }
  exchangeNode(t, e, a, r) {
    H(t.children, e, a, r)
  }
  resetCardLoc() {
    const t = this.getCardLocMap()
    this.chartData.getNodes().forEach((e) => {
      var a = t[e.id]
      ;(e.x = a.x),
        (e.x0 = e.x),
        (e.y = a.y),
        (e.y0 = e.y),
        (e.depth = a.depth),
        (e.height = a.height)
    })
  }
  getCardLocMap() {
    var {
      treeDataApp: { treeData: t },
      baseCardSize: e,
      chartWrapperSize: a,
      direction: r,
    } = this.kdChartApp
    return this.kdChartApp.computedLocMap && typeof this.kdChartApp.computedLocMap == 'function'
      ? this.kdChartApp.computedLocMap({
          treeData: t,
          baseCardSize: e,
          chartWrapperSize: a,
          direction: r,
        })
      : wt(t, e)
  }
  cardMenuEdit(t, e) {
    Object.keys(e).map((a) => {
      this.chartDataMap[t.id].data[a] = e[a]
    }),
      this.kdChartApp.customChartItemAttr(this.chartDataMap[t.id])
  }
}
class Wt {
  constructor(t) {
    const e = t.kdChartApp.chartWrapper
    ;(this.tipsWrapper = Ct(t.kdChartApp.baseCardSize.w)),
      e.querySelectorAll('.text_tips_wrapper').forEach((a) => e.removeChild(a)),
      e.appendChild(this.tipsWrapper.node())
  }
  showTextTips({ x: t = 0, y: e = 0 }, a = '') {
    this.tipsWrapper
      .text('' + a)
      .style('top', e + 'px')
      .style('left', t + 'px')
      .style('display', 'block')
  }
  hideTextTips() {
    this.tipsWrapper.text('').style('display', 'none')
  }
}
class Et {
  constructor(t) {
    ;(this.parentViewApp = t), this.initSortCard()
  }
  initSortCard() {
    ;(this.sortPreRect = this.parentViewApp.rootGroup
      .append('svg:g')
      .attr('style', 'display:none')
      .attr('transform', 'translate(0,0)')),
      (this.sortPreRectInner = this.sortPreRect
        .append('svg:rect')
        .attr('width', this.parentViewApp.kdChartApp.baseCardSize.xSpace - 8)
        .attr('height', this.parentViewApp.kdChartApp.baseCardSize.h)
        .attr('rx', 2)
        .attr('stroke', '#1890ff')
        .attr('stroke-dasharray', '2 2 2')
        .attr('stroke-linecap', 'round')
        .attr('stroke-opacity', 1)
        .attr('fill', '#e6f7ff')
        .attr('fill-opacity', 1)
        .attr('stroke-width', 1)
        .attr('shape-rendering', 'auto'))
  }
  showSortCard(
    { x: t = 0, y: e = 0, cardSize: { w: a = 0, h: r = 0, xSpace: i = 0, ySpace: p = 0 } },
    o
  ) {
    var { h = 0 } = this.parentViewApp.kdChartApp.baseCardSize
    switch (o) {
      case 1:
        this.transSortCard({ x: t + 4 - i - a / 2, y: e - h / 2, w: i - 8, h: r })
        break
      case 2:
        this.transSortCard({ x: t + 4 + a / 2, y: e - h / 2, w: i - 8, h: r })
        break
      case 3:
        this.transSortCard({ x: t - a / 2, y: e - h / 2 - (p - 8) - 4, w: a, h: p - 8 })
        break
      case 4:
        this.transSortCard({ x: t - a / 2, y: e + h / 2 + 4, w: a, h: p - 8 })
    }
  }
  transSortCard({ x: t = 0, y: e = 0, w: a = 0, h: r = 0 }) {
    this.sortPreRect &&
      (this.sortPreRect.attr('transform', `translate(${t},${e})`).attr('style', ''),
      this.sortPreRectInner.attr('height', r).attr('width', a))
  }
  delSortCard() {
    this.sortPreRect &&
      (this.sortPreRect.attr('style', 'display:none'), (this.sortTargetNode = null))
  }
}
function x(s, t, e = 1) {
  return `translate( ${(s.x - s.cardSize.w / 2) * e}, ${(s.y - t.h / 2) * e})`
}
function _t(
  { w: s, h: t, x: e = 0, y: a = 0, rx: r = 0, textAnchor: i = 'middle', valign: p = 'center' },
  o
) {
  var h = parseInt(s + '')
  const d = Math.min(h, t)
  switch (i) {
    case 'start':
      break
    case 'middle':
      e += (h - d) / 2
      break
    case 'end':
      e = h - d
  }
  switch (p) {
    case 'top':
      break
    case 'center':
      a += (t - d) / 2
      break
    case 'bottom':
      a = t - d
  }
  const c = e,
    n = a
  return new Promise((u) => {
    const w = new Image()
    ;(w.src = o),
      (w.onload = () => {
        let g = w.width,
          A = w.height
        g > A
          ? ((g = (d / A) * g), (A = d), (e -= (g - A) / 2))
          : ((A = (d / g) * A), (g = d), (a -= (A - g) / 2)),
          u({ imgSize: d, rw: g, rh: A, x: e, y: a, cx: c, cy: n, rx: r })
      })
  })
}
function D(s, t) {
  const e = s.target.className ? s.target.className.baseVal : ''
  let a = !0
  return (
    e !== '' &&
      t.map((r) => {
        a = a && e.indexOf(r) < 0
      }),
    a
  )
}
function Nt(s, t, e, a, r, i, p) {
  var T
  let o = 0,
    h = null
  var d = ((T = t.parent) == null ? void 0 : T.children) ?? [],
    c = d.indexOf(t)
  for (let v = 0; v < d.length; v++) {
    var n = d[v]
    if (n.id !== t.id) {
      var u = s.x - n.x,
        w = s.y - n.y,
        { w: g, h: A, xSpace: m, ySpace: S } = n.cardSize,
        m = g / 2 + m,
        S = A / 2 + S,
        z = r(t),
        P = i(n, t)
      if (z && Math.abs(u) < g / 2) {
        if ((!P || c > v) && w < -A / 2 && -S < w) {
          ;(o = 3), (h = n)
          break
        }
        if ((!P || c < v) && A / 2 < w && w < S) {
          ;(o = 4), (h = n)
          break
        }
      }
      if (!z && Math.abs(s.y - n.y) < A / 2) {
        if (v < c && u < -g / 2 && -m < u) {
          ;(o = 1), (h = n)
          break
        }
        if (v > c && g / 2 < u && u < m) {
          ;(o = 2), (h = n)
          break
        }
      }
    }
  }
  return o === 0 && ([o, h] = It(e, t, a, s, p)), [o, h]
}
function It(s, t, e, a, r) {
  let i = 0,
    p = null
  return (
    (function o(h) {
      var d
      for (let c = 0; c < h.length; c++) {
        const n = h[c],
          { w: u, h: w } = n.cardSize
        if (n.id !== t.id) {
          const g = a.x - (n.x - u / 2),
            A = a.y - (n.y - e.h / 2)
          if (n.id !== (((d = t.parent) == null ? void 0 : d.id) ?? '') && r(n)) {
            if (0 < g && g < u && 0 < A && A < w) {
              ;(i = 5), (p = n)
              break
            }
          } else if (0 < g && g < u && 0 < A && A < w) {
            i = 6
            break
          }
          n.children && 0 < n.children.length && o(n.children)
        }
      }
    })([s]),
    [i, p]
  )
}
function _(s, t, e) {
  return (s -= 3), [s / 2, t + s / 2, e - s / 2 - 1]
}
class Rt {
  constructor(t) {
    ;(this.parentViewApp = t),
      (this.duration = I),
      (this.selectedCards = []),
      (this.draging = !1),
      (this.toogleGroupMap = {}),
      this.createCardGroup(),
      (this.paintCanvasConfig = [])
  }
  createCardGroup() {
    this.cardGroup = this.parentViewApp.rootGroup
      .append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'visible')
  }
  delCardGroup() {
    this.cardGroup.remove(), (this.selectedCards = []), (this.toogleGroupMap = {})
  }
  initPaint(t = this.parentViewApp.kdChartApp.chartDataApp.chartData, e = !0) {
    const { baseCardSize: a, editStatus: r } = this.parentViewApp.kdChartApp
    var i = this.parentViewApp.kdChartApp.chartDataApp.chartData.getNodes().reverse()
    ;(this.nodeGroup = this.cardGroup.selectAll('g').data(i, (p) => {
      var o
      return (
        p.id + '_' + (((o = p == null ? void 0 : p.data) == null ? void 0 : o.hasChildren) ?? 0)
      )
    })),
      (this.nodeEnter = this.nodeGroup
        .enter()
        .append('g')
        .attr('class', (p) => 'card-group cardto' + p.id + (r ? ' edit' : ''))
        .attr('transform', () => x(t, a))),
      this.bindCardEvent(this.nodeEnter),
      this.setNodeUpdate(),
      this.nodeGroup
        .exit()
        .transition()
        .duration(this.duration)
        .remove()
        .attr('transform', (p) => x(t, a))
        .attr('stroke-opacity', 0)
        .attr('fill-opacity', 0),
      e && this.paintCard()
  }
  setNodeUpdate() {
    const { baseCardSize: t, editStatus: e } = this.parentViewApp.kdChartApp
    ;(this.nodeUpdate = this.nodeGroup.merge(this.nodeEnter)),
      this.nodeUpdate
        .transition()
        .duration(this.duration)
        .attr('class', (a) => 'card-group cardto' + a.id + (e ? ' edit' : ''))
        .attr('transform', (a) => x(a, t))
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1),
      this.nodeUpdate.nodes().map((a) => {
        this.paintCardToggle(a.__data__, a)
      })
  }
  resetPaintByLoc() {
    this.setNodeUpdate()
  }
  clearAllChartCard() {
    this.nodeUpdate.nodes().map((t) => {
      0 < t.childNodes.length &&
        (l.select(t).selectAll('*').remove(), delete this.toogleGroupMap[t.__data__.id])
    })
  }
  bindCardEvent(t) {
    t.call(
      l
        .drag()
        .on('start', (e, a) => {
          this.parentViewApp.kdChartApp.editStatus
        })
        .on('drag', (e, a) => {
          !this.parentViewApp.kdChartApp.editStatus ||
            (e.dx == 0 && e.dy == 0) ||
            (this.draging || ((this.draging = !0), this.initNodeDraging(a)), this.nodeDraging(e, a))
        })
        .on('end', (e, a) => {
          this.parentViewApp.kdChartApp.editStatus && this.draging
            ? this.nodeDragend(e, a)
            : this.clickCard(a, e)
        })
        .filter((e) => D(e, ['op-icon', 'outcard']))
    )
      .on('mousemove', (e, a) => {
        var r
        D(e, ['op-icon', 'outcard']) &&
          ((r = this.computedCurrNodeDomLocate(a)),
          this.parentViewApp.kdChartApp.emit('hoverCardIn', { event: e, domLoc: r, node: a }))
      })
      .on('mouseout', (e) => {
        D(e, ['op-icon', 'outcard']) &&
          this.parentViewApp.kdChartApp.emit('hoverCardOut', { event: e })
      })
      .on('contextmenu', (e, a) => {
        e.preventDefault(), console.log('右键单击事件已触发')
      })
  }
  computedCurrNodeDomLocate(t) {
    var {
        intialGroupLoc: { x: e, y: a },
        rootGroupLoc: { x: r, y: i, k: p = 1 },
      } = this.parentViewApp,
      { w: o, h } = this.parentViewApp.kdChartApp.baseCardSize
    return {
      x: (t.x + o / 2) * p + (r - e) + this.parentViewApp.kdChartApp.chartWrapperSize.w / 2,
      y: (t.y - h / 2) * p + (i - a),
    }
  }
  initNodeDraging(t) {
    l.selectAll('g.ghover').classed('ghover', !1)
    var e = document.getElementsByClassName('cardto' + t.id)[0],
      a = e.parentNode
    a == null || a.removeChild(e),
      Mt(a, t, this.parentViewApp.kdChartApp.baseCardSize),
      a == null || a.appendChild(e),
      this.sortCard || (this.sortCard = new Et(this.parentViewApp))
  }
  nodeDraging(t, e) {
    this.dragNode(t, e)
  }
  nodeDragend(t, e) {
    Lt(), (this.draging = !1), (this.selectedCards = []), this.dragNode(t, e, 2)
  }
  dragNode(t, e, a = 1) {
    ;(e.x += t.dx), (e.y += t.dy)
    var [, r, i] = this.getDragNodeInfo(t, e),
      { x: p, y: o } =
        (this.sortCard.delSortCard(),
        this.clearSelectCard(),
        this.computedCurrDomLocate({ node: e, e: t }))
    if (a === 1)
      switch ((this.moveNode(e), r)) {
        case 0:
          this.parentViewApp.cardShowTips.hideTextTips()
          break
        case 1:
        case 2:
        case 3:
        case 4:
          console.log('操作提示'),
            this.sortCard.showSortCard(i, r),
            this.parentViewApp.cardShowTips.showTextTips({ x: p, y: o }, '变换顺序2')
          break
        case 5:
          l.select('.cardto' + i.id).classed('ghover', !0),
            this.parentViewApp.cardShowTips.showTextTips({ x: p, y: o }, '移至下级2')
          break
        case 6:
          this.parentViewApp.cardShowTips.showTextTips({ x: p, y: o }, '不能移至下级2')
      }
    if (a === 2)
      switch ((this.parentViewApp.cardShowTips.hideTextTips(), r)) {
        case 0:
        case 6:
          console.log('不做变更'), (e.x = e.x0), (e.y = e.y0), this.moveNode(e)
          break
        case 1:
        case 2:
        case 3:
        case 4:
          this.exchangeNode(e, i, r),
            this.operateCardPublic(e, i, r),
            this.parentViewApp.kdChartApp.chartDataApp.resetCardLoc(),
            this.parentViewApp.kdChartApp.resetChartView(r)
          break
        case 5:
          console.log('变更上级'),
            this.operateCardPublic(e, i, r),
            this.updateParentNode(e, i),
            this.parentViewApp.kdChartApp.resetChartView(r)
      }
  }
  getDragNodeInfo(o, e) {
    let a = o.sourceEvent.layerX,
      r = o.sourceEvent.layerY
    var { k: o = 1, x: i = 0, y: p = 0 } = this.parentViewApp.rootGroupLoc,
      i =
        (it() || M()
          ? ((a -= i), (r -= p))
          : ((a += -i + this.parentViewApp.intialGroupLoc.x),
            (r += -p + this.parentViewApp.intialGroupLoc.y)),
        { x: a / o, y: r / o }),
      [p, o] = Nt(
        i,
        e,
        this.parentViewApp.kdChartApp.chartDataApp.chartData,
        this.parentViewApp.kdChartApp.baseCardSize,
        this.parentViewApp.kdChartApp.isVertical,
        this.parentViewApp.kdChartApp.isSameList,
        this.parentViewApp.kdChartApp.allowChild
      )
    return [i, p, o]
  }
  operateCardPublic(t, e, a) {
    this.parentViewApp.kdChartApp.emit('operateCard', { node: t, targetNode: e, changeType: a })
  }
  moveNode(t) {
    l.select('.cardto' + t.id).attr('transform', x(t, this.parentViewApp.kdChartApp.baseCardSize))
  }
  exchangeNode(t, e, a) {
    let r = -1,
      i = -1
    t.parent &&
      ((t.parent.children ?? []).map((p, o) => {
        p.id === t.id && (r = o), p.id === e.id && (i = o)
      }),
      this.parentViewApp.kdChartApp.treeDataApp.exchangeNode2TreeItem(t.parent.id, r, i, a),
      this.parentViewApp.kdChartApp.chartDataApp.exchangeNode(t.parent, r, i, a))
  }
  updateParentNode(t, e) {
    this.parentViewApp.kdChartApp.treeDataApp.changeParent(t.id, e.id),
      this.parentViewApp.kdChartApp.chartDataApp.initChartData()
  }
  clickCard(t, e) {
    ;(e = e.sourceEvent.target.className.baseVal),
      (e.indexOf('card-wrapper') < 0 && 0 <= e.indexOf('clickDom')) ||
        (l.select('.cardto' + t.id).classed('ghover')
          ? (l.select('.cardto' + t.id).classed('ghover', !1), R(this.selectedCards, t))
          : (l.select('.cardto' + t.id).classed('ghover', !0),
            (this.selectedCards = rt(this.selectedCards, t))),
        this.parentViewApp.kdChartApp.emit('clickCard', {
          node: t,
          selectedCards: this.selectedCards,
        }))
  }
  clearSelectCard() {
    ;(this.selectedCards = []), l.selectAll('g.ghover').classed('ghover', !1)
  }
  paintCard() {
    const t = this.parentViewApp.kdChartApp.treeDataApp.nextUpdateNode
    ;(this.parentViewApp.kdChartApp.treeDataApp.nextUpdateNode = []),
      this.nodeUpdate.nodes().map((e) => {
        var a = e.__data__
        this.parentViewApp.isInPaintView(a)
          ? ((e.childNodes.length <= 0 || e.cardModel !== a.cardModel || -1 < t.indexOf(a.id)) &&
              ((e.cardModel = a.cardModel),
              l.select(e).selectAll('*').remove(),
              delete this.toogleGroupMap[a.id],
              e.appendChild(G(a).node()),
              this.paintCardInfo(a, e)),
            this.paintCardToggle(a, e))
          : 0 < e.childNodes.length &&
            (l.select(e).selectAll('*').remove(), delete this.toogleGroupMap[a.id])
      })
  }
  updateCardById(t) {
    this.nodeUpdate.nodes().map((e) => {
      var a = e.__data__
      ;-1 < t.indexOf(a.id) &&
        (l.select(e).selectAll('*').remove(),
        delete this.toogleGroupMap[a.id],
        e.appendChild(G(a).node()),
        this.paintCardInfo(a, e))
    })
  }
  updateCardByFlag(t) {
    this.nodeUpdate.nodes().map((e) => {
      var a = e.__data__
      t(a) &&
        (l.select(e).selectAll('*').remove(),
        delete this.toogleGroupMap[a.id],
        e.appendChild(G(a).node()),
        this.paintCardInfo(a, e))
    })
  }
  clearCardGroup() {
    this.nodeUpdate.nodes().map((t) => {
      t.remove()
    }),
      (this.toogleGroupMap = {})
  }
  paintCardInfo(t, e) {
    var a = this.parentViewApp.cardModelMap
    let r
    ;(r = typeof a == 'function' ? a(t) : a[t.cardModel] || []), this.paintCardInfoDoing(t, e, r)
  }
  paintCardInfoDoing(t, e, a) {
    const r = this.parentViewApp.kdChartApp,
      i = []
    a.map((p, o) => {
      let h, d, c, n
      var u,
        w = C(p.hover, !1, { node: t })
      if (C(p.show, !0, { node: t, itChart: r })) {
        switch (p.tag) {
          case 'text':
            ;([n, u] = $(p, t)),
              n && (this.cardBindEvent(p, n, t), this.paintLoad(e, n)),
              n && u && this.setTextTips(n, p, t)
            break
          case 'img':
            ;(h = 'clip' + t.id + 'to' + o + /* @__PURE__ */ new Date().getTime()),
              (d = 'img' + t.id + 'to' + o + /* @__PURE__ */ new Date().getTime()),
              (c = p.url({ node: t })),
              _t(p, c).then((g) => {
                i.push({ ...p, ...g, imgurl: c }),
                  this.paintLoad(e, xt(h, g)),
                  this.paintLoad(e, yt(p, h, t, d, g))
              })
            break
          case 'rect':
            ;(n = B(p, t)), this.cardBindEvent(p, n, t), this.paintLoad(e, n)
            break
          case 'circle':
            ;(n = kt(p, t)), this.cardBindEvent(p, n, t), this.paintLoad(e, n)
            break
          case 'path':
            this.paintLoad(e, mt(p))
            break
          case 'line':
            this.paintLoad(e, St(p))
            break
          case 'icon':
            ;(n = Dt(p, t)), this.cardBindEvent(p, n, t), this.paintLoad(e, n)
            break
          case 'svgIcon':
            ;(n = Vt(p, t)), this.cardBindEvent(p, n, t), this.paintLoad(e, n)
            break
          case 'pathIcon':
            ;(n = Gt(p, t)), this.cardBindEvent(p, n, t), this.paintLoad(e, n)
            break
          case 'group':
            ;(u = ft(p, t)),
              this.cardBindEvent(p, u, t),
              this.paintCardInfoDoing(t, u.node(), p.children),
              this.paintLoad(e, u)
        }
        w && this.cardElementHover(n, t, p)
      }
    })
  }
  cardBindEvent(t, e, a) {
    e.on('click', () => {
      typeof t.click == 'function' &&
        t.click(
          this.parentViewApp.kdChartApp.chartDataApp.chartDataMap[a.id],
          this.parentViewApp.kdChartApp
        )
    })
  }
  paintLoad(t, e) {
    t.appendChild(e.node())
  }
  setTextTips(t, e, a) {
    if (this.parentViewApp.textTipsFlag) {
      const r = e.text({ node: a }).reduce((i, p) => i + '' + p)
      t.on('mousemove', (i) => {
        var p
        this.parentViewApp.kdChartApp.editStatus ||
          (({ x: i, y: p } = this.computedCurrDomLocate({ node: a, e: i, cardModel: e })),
          this.parentViewApp.cardShowTips.showTextTips({ x: i, y: p + e.h }, r))
      }).on('mouseout', () => {
        this.parentViewApp.kdChartApp.editStatus || this.parentViewApp.cardShowTips.hideTextTips()
      })
    }
  }
  cardElementHover(t, e, a) {
    t.on('mousemove', (r) => {
      this.parentViewApp.kdChartApp.emit('hoverCardElementIn', {
        event: r,
        domLoc: this.computedCurrDomLocate({ node: e, e: r, cardModel: a }),
        node: e,
        cardModel: a,
      })
    }).on('mouseout', (r) => {
      this.parentViewApp.kdChartApp.emit('hoverCardElementOut', { event: r, node: e })
    })
  }
  computedCurrDomLocate({ node: t, cardModel: u = {} }) {
    var {
        intialGroupLoc: { x: a, y: r },
        rootGroupLoc: { x: i, y: p, k: o = 1 },
      } = this.parentViewApp,
      { fontSize: u = 12, w = 60, x: h = 0, y: d = 0 } = u,
      { w: c, h: n } = this.parentViewApp.kdChartApp.baseCardSize,
      u = C(u, 12, { node: t }),
      w = C(w, u, { node: t })
    return {
      x:
        (t.x - c / 2 + h + w / 3) * o +
        (i - a) +
        this.parentViewApp.kdChartApp.chartWrapperSize.w / 2,
      y: (t.y - n / 2 + d + u - 2) * o + (p - r),
    }
  }
  paintCardToggle(t, e) {
    if (t.data.hasChild) {
      if (this.parentViewApp.iconConfig) {
        var {
            className: a,
            fontSize: r = 12,
            toogleMinus: i,
            tooglePlus: p,
          } = this.parentViewApp.iconConfig,
          [o, h] = Pt(this.parentViewApp.kdChartApp.direction, t.cardSize, r)
        if (this.toogleGroupMap[t.id]) this.setCardToogleLoc(t.id, o, h, r)
        else {
          const d = E((p == null ? void 0 : p.unicode) ?? '', {
              className: a + ' op-icon',
              fontSize: r,
              fill: (p == null ? void 0 : p.fill) ?? '',
              x: o,
              y: h + 1,
              url: (p == null ? void 0 : p.url) ?? '',
            }),
            c = E((i == null ? void 0 : i.unicode) ?? '', {
              className: a + ' op-icon',
              fontSize: r,
              fill: i == null ? void 0 : i.fill,
              x: o,
              y: h + 1,
              url: i == null ? void 0 : i.url,
            })
          var [p, a, i] = _(r ?? 14, o, h),
            r = zt(p, a, i, 'op-icon')
          ;(t.children && 0 < t.children.length ? d : c).attr('style', 'display:none;'),
            d.on('click', () => {
              this.parentViewApp.kdChartApp.openData(t),
                c.attr('style', ''),
                d.attr('style', 'display:none;')
            }),
            c.on('click', () => {
              this.parentViewApp.kdChartApp.foldData(t),
                c.attr('style', 'display:none;'),
                d.attr('style', '')
            }),
            e.appendChild(r.node()),
            e.appendChild(d.node()),
            e.appendChild(c.node()),
            (this.toogleGroupMap[t.id] = {
              iconMaskCircle: r,
              tooglePlusIcon: d,
              toogleMinusIcon: c,
            })
        }
      }
    } else this.removeCardToogle(t.id)
  }
  setCardToogleLoc(t, e, a, r) {
    var [, i, p] = _(r, e, a)
    this.toogleGroupMap[t].iconMaskCircle.attr('cx', i).attr('cy', p),
      this.toogleGroupMap[t].tooglePlusIcon.attr('x', e).attr('y', a + (M() ? -r : 0)),
      this.toogleGroupMap[t].toogleMinusIcon.attr('x', e).attr('y', a + (M() ? -r : 0))
  }
  removeCardToogle(t) {
    this.toogleGroupMap[t] &&
      (this.toogleGroupMap[t].iconMaskCircle.remove(),
      this.toogleGroupMap[t].tooglePlusIcon.remove(),
      this.toogleGroupMap[t].toogleMinusIcon.remove(),
      delete this.toogleGroupMap[t])
  }
}
function Ht({ cardSize: { h: s = 0 }, x0: r = 0, y0: i = 0 }, a = 1) {
  var [r, i] = [r * a, i * a]
  return `M${r},${i + (s * a) / 2 + 4} V${i} H${r} V` + i
}
function U({ source: r, target: p }, { h = 0 }, a = 1) {
  var [r, i] = [r.x * a, r.y * a],
    [p, o] = [p.x * a, p.y * a],
    h = (h * a) / 2
  return `M${r},${i + h} V${(o + i) / 2} H${p} V` + (o - h)
}
function Ft({ cardSize: { h: s = 0 }, x: r = 0, y: i = 0 }, a = 1) {
  var [r, i] = [r * a, i * a]
  return `M${r},${i + (s * a) / 2 + 4} V${i} H${r} V` + i
}
class $t {
  constructor(t) {
    ;(this.parentViewApp = t), (this.pathStyle = tt), (this.duration = I), this.initPathGroup()
  }
  initPathGroup() {
    this.pathGroup = this.parentViewApp.rootGroup
      .append('g')
      .attr('class', 'pathGroup')
      .attr('fill', 'none')
  }
  delPathGroup() {
    this.pathGroup.remove()
  }
  initPaint(t = this.parentViewApp.kdChartApp.chartDataApp.chartData, e = !1) {
    ;(this.pathList = this.parentViewApp.kdChartApp.chartDataApp.chartData.getLinks()),
      (this.linkGroup = this.pathGroup
        .selectAll('path')
        .data(this.pathList, (a) => a.target.id + '_' + a.source.id)),
      (this.linkEnter = this.linkGroup.enter().append('path')),
      this.setLinkupdate(),
      this.linkGroup
        .exit()
        .transition()
        .duration(this.duration)
        .remove()
        .attr('d', this.endElbow(t))
        .attr('stroke-opacity', 0),
      e && this.paintPath(this.linkEnter, t)
  }
  setLinkupdate() {
    this.linkGroup
      .merge(this.linkEnter)
      .transition()
      .duration(this.duration)
      .attr('stroke-opacity', 1)
      .attr('d', (t) => this.elbow(t))
      .attr('stroke', this.pathStyle.stroke)
  }
  resetPaintByLoc() {
    this.setLinkupdate()
  }
  paintPath(t, e) {
    t.attr('cursor', 'move')
      .attr('stroke', this.pathStyle.stroke)
      .attr('stroke-opacity', 0.1)
      .attr('stroke-width', 1)
      .attr('shape-rendering', 'auto')
      .attr('d', this.initElbow(e))
  }
  initElbow(t, e = 1) {
    return Ht(t, e)
  }
  elbow(t) {
    var { baseCardSize: e, direction: a, getPathScheme: r } = this.parentViewApp.kdChartApp
    return r && typeof r == 'function' ? r({ path: t, baseCardSize: e, direction: a }) : U(t, e)
  }
  endElbow(t, e = 1) {
    return Ft(t, e)
  }
}
class Ot {
  constructor(
    t,
    {
      cardModelMap: e,
      menuModels: a,
      hoverMenuModels: r,
      textTipsFlag: i,
      iconConfig: p,
      svgBackGround: o,
    }
  ) {
    ;(this.kdChartApp = t),
      (this.cardModelMap = e),
      (this.menuModels = a),
      (this.hoverMenuModels = r),
      (this.textTipsFlag = i || !0),
      (this.iconConfig = p),
      (this.svgBackGround = o ?? Q.background),
      this.initStatus(),
      this.paintSvgWrapper(),
      this.loadSvg()
  }
  initStatus() {
    ;(this.relativeMaxLoc = { x: -1 / 0, y: -1 / 0 }),
      (this.svgSize = { w: 0, h: 0, rx: 0, ry: 0 }),
      (this.svgSizeChange = !0),
      (this.currMoveDistance = { rx: 0, ry: 0 })
  }
  paintSvgWrapper() {
    this.kdChartApp.chartWrapper
      .querySelectorAll('.svg_wrapper')
      .forEach((t) => this.kdChartApp.chartWrapper.removeChild(t)),
      (this.svgWrapper = At(this.kdChartApp.chartWrapperSize)),
      this.kdChartApp.chartWrapper.appendChild(this.svgWrapper.node())
  }
  loadSvg() {
    this.svgWrapper.html(null), this.svgWrapper.append(() => this.createSvg())
  }
  createSvg() {
    return (
      (this.svg = vt(this.svgBackGround)),
      this.bindEvent2svg(),
      (this.rootGroup = this.svg.append('g')),
      this.initPaintChart(),
      this.paintTipsGroup(),
      this.svg.node()
    )
  }
  brforePaintChart() {
    this.computedMixLoc(),
      this.svgSizeChange && (this.setSvgParams(), this.initRootGroupLoc(), this.moveRootGroup())
  }
  initPaintChart() {
    this.brforePaintChart(),
      (this.chartPathApp = new $t(this)),
      this.chartPathApp.initPaint(this.kdChartApp.chartDataApp.chartData, !0),
      (this.chartCardApp = new Rt(this)),
      this.chartCardApp.initPaint(this.kdChartApp.chartDataApp.chartData)
  }
  updatePaintChart(t = this.kdChartApp.chartDataApp.chartData, e = !1) {
    this.brforePaintChart(), this.chartPathApp.initPaint(t, e), this.chartCardApp.initPaint(t, e)
  }
  cardOpRepaint(t, e = this.kdChartApp.chartDataApp.chartData) {
    switch (t) {
      case 1:
      case 2:
      case 3:
      case 4:
        this.brforePaintChart(),
          this.chartPathApp.resetPaintByLoc(),
          this.chartCardApp.resetPaintByLoc()
        break
      case 5:
        this.updatePaintChart(e, !0)
    }
  }
  bindEvent2svg() {
    this.svg
      .call(
        l
          .zoom()
          .on('start', (t) => {
            this.svgClient = { x: t.sourceEvent.clientX, y: t.sourceEvent.clientY }
          })
          .on('zoom', (t) => {
            this.svgZoomHandle(t)
          })
          .on('end', (t) => {
            ;(t.sourceEvent.deltaY || 0) != 0 &&
              ((this.currMoveDistance = { rx: 0, ry: 0 }), this.chartCardApp.paintCard())
          })
          .filter((t) => D(t, ['op-icon']))
      )
      .on('click.zoom', (t) => {
        this.svgClickHadnle(t)
      })
  }
  svgZoomHandle({ sourceEvent: { type: t = '', deltaY: e = 0, clientX: a = 0, clientY: r = 0 } }) {
    var o
    var i, p
    switch (t) {
      case 'wheel':
        ;(i = W(((o = this.rootGroupLoc) == null ? void 0 : o.k) ?? 1, e)),
          this.operatorRootGroup({ k: i })
        break
      case 'mousemove':
        ;(i = (a - this.svgClient.x) / window.devicePixelRatio),
          (p = (r - this.svgClient.y) / window.devicePixelRatio),
          this.operatorRootGroup({ rx: i, ry: p }),
          (this.currMoveDistance.rx += i),
          (this.currMoveDistance.ry += p),
          (this.svgClient = { x: a, y: r })
    }
  }
  svgClickHadnle({ target: { nodeName: t } }) {
    t === 'svg' &&
      (this.chartCardApp.clearSelectCard(),
      this.kdChartApp.emit('clickSVG', { itChart: this.kdChartApp }))
  }
  paintTipsGroup() {
    this.cardShowTips = new Wt(this)
  }
  scaleRootGroup(t = !0) {
    var e
    ;(t = W(((e = this.rootGroupLoc) == null ? void 0 : e.k) ?? 1, !t)),
      this.operatorRootGroup({ k: t })
  }
  operatorRootGroup(
    { rx: t = 0, ry: e = 0, k: a = this.rootGroupLoc.k } = { rx: 0, ry: 0, k: this.rootGroupLoc.k }
  ) {
    this.moveRootGroup({ rx: t, ry: e, k: a }),
      this.kdChartApp.preViewApp &&
        this.kdChartApp.preViewApp.resetGroupLoc({ rx: t, ry: e, k: a }),
      (Math.abs(this.currMoveDistance.rx) >= y - this.kdChartApp.baseCardSize.w ||
        Math.abs(this.currMoveDistance.ry) >= y - this.kdChartApp.baseCardSize.h) &&
        ((this.currMoveDistance = { rx: 0, ry: 0 }), this.chartCardApp.paintCard())
  }
  moveSvgByDir() {
    var t = {
      rx: 0,
      ry: -this.kdChartApp.chartDataApp.chartData.y + this.kdChartApp.chartWrapperSize.h / 2,
      k: 1,
    }
    this.moveRootGroup(t),
      this.kdChartApp.preViewApp && this.kdChartApp.preViewApp.resetGroupLoc(t),
      this.chartCardApp.paintCard()
  }
  computedMixLoc() {
    ;(this.maxLoc = { x: -1 / 0, y: -1 / 0 }),
      (this.minLoc = { x: 1 / 0, y: 1 / 0 }),
      this.kdChartApp.chartDataApp.chartData.getNodes().forEach(({ x: a, y: r }) => {
        ;(this.minLoc.x = Math.min(a, this.minLoc.x)),
          (this.minLoc.y = Math.min(r, this.minLoc.y)),
          (this.maxLoc.x = Math.max(a, this.maxLoc.x)),
          (this.maxLoc.y = Math.max(r, this.maxLoc.y))
      }),
      (this.relativeMaxLoc.x = Math.max(this.maxLoc.x, Math.abs(this.minLoc.x))),
      (this.relativeMaxLoc.y = Math.max(this.maxLoc.y, Math.abs(this.minLoc.y)))
    var t = Math.max(
        2 * this.relativeMaxLoc.x + 2 * this.kdChartApp.baseCardSize.w,
        this.kdChartApp.chartWrapperSize.w
      ),
      e = Math.max(
        this.relativeMaxLoc.y + 2 * this.kdChartApp.baseCardSize.h,
        this.kdChartApp.chartWrapperSize.h
      )
    ;(this.svgSizeChange = t !== this.svgSize.w),
      (this.svgSize = { w: t, h: e, rx: (this.kdChartApp.chartWrapperSize.w - t) / 2, ry: 0 })
  }
  resetSvgSize() {
    this.svgSize.rx = (this.kdChartApp.chartWrapperSize.w - this.svgSize.w) / 2
  }
  moveRootGroup(
    { rx: t = 0, ry: e = 0, k: a = this.rootGroupLoc.k } = { rx: 0, ry: 0, k: this.rootGroupLoc.k }
  ) {
    ;(this.rootGroupLoc.x += t),
      (this.rootGroupLoc.y += e),
      (this.rootGroupLoc.k = a),
      this.rootGroup.attr(
        'transform',
        `translate(${this.rootGroupLoc.x},${this.rootGroupLoc.y}) scale(${this.rootGroupLoc.k})`
      )
  }
  initRootGroupLoc(t = this.kdChartApp.chartDataApp.chartData) {
    var o
    let e = { rx: 0, ry: 0 }
    var { rx: a = 0, ry: r = 0 } = (e =
        this.rootGroupLoc && this.intialGroupLoc
          ? {
              rx: this.rootGroupLoc.x - this.intialGroupLoc.x,
              ry: this.rootGroupLoc.y - this.intialGroupLoc.y,
            }
          : e),
      { w: i = 0 } = this.svgSize,
      p = ((o = this.rootGroupLoc) == null ? void 0 : o.k) ?? 1
    switch (this.kdChartApp.direction) {
      case f.bottom:
        ;(this.rootGroupLoc = { x: i / 2 - t.x + a, y: r, k: p }),
          (this.intialGroupLoc = { x: i / 2 - t.x, y: 0, k: p })
        break
      case f.right:
        ;(this.rootGroupLoc = { x: i / 2 + a, y: r, k: p }),
          (this.intialGroupLoc = { x: i / 2, y: 0, k: p })
        break
      case f.top:
        ;(this.rootGroupLoc = { x: i / 2 - t.x + a, y: r, k: p }),
          (this.intialGroupLoc = { x: i / 2 - t.x, y: 0, k: p })
        break
      case f.left:
        ;(this.rootGroupLoc = { x: i / 2 + a, y: r, k: p }),
          (this.intialGroupLoc = { x: i / 2, y: 0, k: p })
    }
  }
  setSvgParams() {
    var { w: t, h: e, rx: a, ry: r } = this.svgSize
    this.svg
      .style('width', t + 'px')
      .style('height', e + 'px')
      .style('transform', `translate(${a}px,${r}px)`)
  }
  isInPaintView(c) {
    if (!c) return !1
    var { w: o = 0 } = this.kdChartApp.chartWrapperSize
    const e = this.svgSize.w / 2,
      a = 0
    var r = 0.5 * -o - y,
      i = 0.5 * o + y,
      p = 0 * -o - y,
      o = +o + y,
      { k: h = 1 } = this.rootGroupLoc,
      d = c.x * h + (this.rootGroupLoc.x - e),
      c = c.y * h + this.rootGroupLoc.y - a
    return r < d && d < i && p < c && c < o
  }
}
class Bt {
  constructor(t, e) {
    ;(this.kdChartApp = t),
      (this.previewSvgSize = e.previewSvgSize ?? J),
      (this.preViewCardModelMap = e.preViewCardModelMap),
      this.paintPreView()
  }
  paintPreView() {
    this.initParams(), this.initDom(), this.initChart()
  }
  initParams() {
    ;(this.previewScale = Math.min(
      this.previewSvgSize.w / this.kdChartApp.mainViewApp.svgSize.w,
      this.previewSvgSize.h / this.kdChartApp.mainViewApp.svgSize.h
    )),
      (this.slideRectSize = {
        w: this.kdChartApp.chartWrapperSize.w * this.previewScale,
        h: this.kdChartApp.chartWrapperSize.h * this.previewScale,
      }),
      (this.slideGroupLoc = { x: this.previewSvgSize.w / 2, y: 0, k: 1 }),
      (this.slideRectLoc = { x: -this.slideRectSize.w / 2, y: 0 })
  }
  initDom() {
    this.kdChartApp.chartWrapper
      .querySelectorAll('.preview_wrapper')
      .forEach((t) => this.kdChartApp.chartWrapper.removeChild(t)),
      (this.previewWrapper = l
        .create('div')
        .attr('class', 'preview_wrapper')
        .style('width', this.previewSvgSize.w + 'px')
        .style('height', this.previewSvgSize.h + 'px')
        .style('box-sizing', 'border-box')
        .style('border', '1px solid rgba(238,238,238,1)')
        .style('position', 'absolute')
        .style('top', '32px')
        .style('right', '16px')
        .style('overflow', 'hidden')
        .style('z-index', '1')),
      this.kdChartApp.chartWrapper.appendChild(this.previewWrapper.node())
  }
  initChart() {
    this.previewWrapper.html(null), this.previewWrapper.append(() => this.initSvg())
  }
  initSvg() {
    return (
      (this.svg = l
        .create('svg')
        .style('width', this.previewSvgSize.w + 'px')
        .style('height', this.previewSvgSize.h + 'px')
        .style('background', '#f5f5f5')
        .style('user-select', 'none')
        .on('click', (t) => {
          this.setSlideLoc(t)
        })),
      (this.group = this.svg
        .append('g')
        .attr('transform', `translate(${this.previewSvgSize.w / 2},0) scale(1)`)),
      (this.linkGroup = this.group.append('g').attr('fill', 'none')),
      (this.nodeGroup = this.group
        .append('g')
        .attr('cursor', 'pointer')
        .attr('pointer-events', 'visible')),
      this.paintChart(),
      this.paintSlide(),
      this.svg.node()
    )
  }
  paintChart() {
    this.paintPath(), this.paintCard(this.kdChartApp.chartDataApp.chartData)
  }
  paintPath() {
    this.links = this.kdChartApp.chartDataApp.chartData.getLinks()
    var t = this.linkGroup.selectAll('path').data(this.links, (a) => a.target.id),
      e = t
        .enter()
        .append('path')
        .attr('stroke', '#d9d9d9')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 1)
        .attr('shape-rendering', 'auto')
    t
      .merge(e)
      .transition()
      .duration(0)
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 1)
      .attr('d', (a) => this.elbow(a, this.previewScale)),
      t.exit().transition().duration(0).remove().attr('stroke-opacity', 0.1)
  }
  paintCard(t) {
    const e = this.kdChartApp.baseCardSize
    this.nodes = this.kdChartApp.chartDataApp.chartData.getNodes().reverse()
    var a = this.nodeGroup.selectAll('g').data(this.nodes, (i) => i.id),
      r = a
        .enter()
        .append('g')
        .attr('transform', x(t, e, this.previewScale))
    ;(this.nodeUpdate = a.merge(r)),
      this.nodeUpdate
        .transition()
        .duration(0)
        .attr('transform', (i) => x(i, e, this.previewScale))
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1),
      this.nodeUpdate
        .append('rect')
        .attr('width', (i) => i.cardSize.w * this.previewScale)
        .attr('height', (i) => i.cardSize.h * this.previewScale)
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 0.5)
        .attr('rx', (i) => i.cardStyle.radius)
        .attr('fill', (i) => i.cardStyle.background)
        .attr('fill-opacity', (i) => (i.cardStyle.opacity == 0 ? 0 : 1))
        .attr('stroke', (i) => i.cardStyle.border)
        .attr('stroke-opacity', (i) => (i.cardStyle.opacity == 0 ? 0 : 1))
        .attr('stroke-dasharray', (i) => i.cardStyle.borderType),
      this.paintInfo(),
      a
        .exit()
        .transition()
        .duration(0)
        .remove()
        .attr('transform', x(t, e, this.previewScale))
        .attr('stroke-opacity', 0)
        .attr('fill-opacity', 0)
  }
  paintInfo() {
    this.nodeUpdate.nodes().map((t) => {
      const e = t.__data__
      let a
      this.preViewCardModelMap[e.cardModel].map((r) => {
        switch (r.tag) {
          case 'text':
            ;([a] = $(r, e, this.previewScale)), a && t.appendChild(a.node())
            break
          case 'rect':
            ;(a = B(r, e, this.previewScale)) && t.appendChild(a.node())
        }
      })
    })
  }
  paintSlide() {
    ;(this.slideGroup = this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${this.slideGroupLoc.x},${this.slideGroupLoc.y}) scale(${this.slideGroupLoc.k})`
      )
      .call(
        l.drag().on('drag', (t) => {
          this.dragSlide(t.dx, t.dy)
        })
      )),
      this.slideGroup
        .append('rect')
        .attr('class', 'preview-slide-rect')
        .attr('width', Math.max(this.slideRectSize.w - 2, 1))
        .attr('height', this.slideRectSize.h)
        .attr('fill-opacity', 0)
        .attr('stroke', '#5582F3')
        .attr('cursor', 'pointer')
        .attr('stroke-width', 1)
        .attr('transform', `translate(${this.slideRectLoc.x},${this.slideRectLoc.y})`)
  }
  setSlideLoc(a) {
    var e = a.layerX - this.previewSvgSize.w / 2 - this.slideRectSize.w / 2,
      a = a.layerY - this.slideRectSize.h / 2,
      e = e - this.slideRectLoc.x,
      a = a - this.slideRectLoc.y
    this.dragSlide(e, a)
  }
  resetSlideLoc() {
    this.dragSlide(-this.slideRectSize.w / 2 - this.slideRectLoc.x, -this.slideRectLoc.y)
  }
  dragSlide(t, e) {
    this.moveSlideGroup({ rx: t, ry: e }),
      this.kdChartApp.mainViewApp.moveRootGroup({
        rx: -t / this.previewScale,
        ry: -e / this.previewScale,
        k: this.kdChartApp.mainViewApp.rootGroupLoc.k,
      }),
      this.kdChartApp.mainViewApp.chartCardApp.paintCard()
  }
  moveSlideGroup({ rx: t = 0, ry: e = 0 }) {
    ;(this.slideRectLoc.x += t),
      (this.slideRectLoc.y += e),
      this.slideGroup
        .select('rect')
        .attr('transform', `translate(${this.slideRectLoc.x},${this.slideRectLoc.y})`)
  }
  scaleSlideGroup(t) {
    ;(this.slideGroupLoc.k = 1 / t),
      this.slideGroup.attr(
        'transform',
        `translate(${this.slideGroupLoc.x},${this.slideGroupLoc.y}) scale(${this.slideGroupLoc.k})`
      ),
      this.slideGroup.select('rect').attr('stroke-width', t)
  }
  resetGroupLoc({ rx: t = 0, ry: e = 0, k: a = 1 }) {
    this.moveSlideGroup({ rx: -t * this.previewScale, ry: -e * this.previewScale }),
      this.scaleSlideGroup(a)
  }
  elbow(t, e) {
    var a, r, i
    return this.kdChartApp.preViewPathFilt(t)
      ? (({ baseCardSize: a, direction: r, getPathScheme: i } = this.kdChartApp),
        i && typeof i == 'function'
          ? i({ path: t, baseCardSize: a, direction: r, scale: e })
          : U(t, a))
      : ''
  }
}
class Ut {
  constructor(t, e) {
    ;(this.kdChartApp = t),
      (this.treeData = e),
      (this.treeDataMap = {}),
      (this.nextUpdateNode = []),
      this.computedTreeHeight(),
      this.initFormData(this.treeData)
  }
  initFormData(t, e) {
    const a = (r, i) => {
      ;(r.hasParent = !!i),
        (r.parent = i),
        (r.hasChild = 0 < (r.children ?? []).length),
        (r._children = r.children),
        (this.treeDataMap[r.id] = r).hasChild &&
          (r.children ?? []).map((p) => {
            a(p, r)
          })
    }
    a(t, e)
  }
  computedTreeHeight() {
    const t = (e, a = 0) => {
      if (((e.level = a++), e.children && 0 < e.children.length)) {
        let r = 0
        e.children.map((i) => {
          r = Math.max(r, t(i, a))
        }),
          (e.height = r + 1)
      } else e.height = 0
      return e.height
    }
    t(this.treeData, 0)
  }
  exchangeNode2TreeItem(t, e, a, r) {
    b(this.treeData, t, (i) => {
      H(i.children, e, a, r)
    })
  }
  changeParent(t, e) {
    var o, h, d
    let a, r
    const i = (c) => {
      for (let n = 0; n < c.length; n++)
        c[n].id === t && (r = c[n]),
          ((a = c[n].id === e ? c[n] : a) && r) ||
            (0 < (c[n].children ?? []).length && i(c[n].children))
    }
    var p
    i([this.treeData]),
      r &&
        a &&
        (this.nextUpdateNode.push(a.id ?? ''),
        this.nextUpdateNode.push(((o = r.parent) == null ? void 0 : o.id) ?? ''),
        (p = (((h = r == null ? void 0 : r.parent) == null ? void 0 : h.children) ?? []).indexOf(
          r
        )),
        r.parent.children.splice(p, 1),
        r.parent.children.length === 0 && ((r.parent.children = void 0), (r.parent.hasChild = !1)),
        (r.parent.hasChildren = (
          ((d = r == null ? void 0 : r.parent) == null ? void 0 : d.children) ?? []
        ).length),
        (r.parent._children = r.parent.children),
        ((r.parent = a).children = (a.children || a._children) ?? []),
        a.children.push(r),
        (a._children = a.children),
        (a.hasChild = !0),
        (a.hasChildren = ((a == null ? void 0 : a.children) ?? []).length),
        this.computedTreeHeight())
  }
  foldData(t) {
    b(this.treeData, t.id, (e) => {
      ;(e._children = e.children), (e.children = [])
    })
  }
  openData(t) {
    var [e, a] = this.kdChartApp.breforeOpenData(this.treeData, t)
    e &&
      ((this.treeData = e), this.computedTreeHeight(), typeof a == 'function') &&
      k(this.treeData, a),
      b(this.treeData, t.id, (r) => {
        this.kdChartApp.expandRuler(r) || (r.children = r._children)
      })
  }
  custUpdateMateData(e) {
    var [e, a] = this.kdChartApp.updateMateData(this.treeData, e)
    e &&
      ((this.treeData = e), this.computedTreeHeight(), typeof a == 'function') &&
      k(this.treeData, a)
  }
  setNewMateData(e) {
    var [e, a] = e(this.treeData)
    e &&
      ((this.treeData = e), this.computedTreeHeight(), typeof a == 'function') &&
      k(this.treeData, a)
  }
  cardMenuAdd(t, e) {
    var a, r
    ;(this.treeDataMap[e].children = this.treeDataMap[e].children ?? []),
      (r = (a = this.treeDataMap[e]) == null ? void 0 : a.children) == null || r.push(t),
      this.computedTreeHeight(),
      this.initFormData(this.treeDataMap[e], this.treeDataMap[e].parent)
  }
  cardMenuEdit(t, e) {
    Object.keys(e).map((a) => {
      this.treeDataMap[t.id][a] = e[a]
    })
  }
  cardMenuDel(t) {
    t.parent && R(this.treeDataMap[t.parent.id].children, t)
  }
  setItemsAttr(t, e, a) {
    t.map((r) => {
      e && (this.treeDataMap[r][e] = a)
    })
  }
}
class Yt {
  constructor() {
    this.eventMaps = {}
  }
  on(t, e) {
    this.eventMaps[t] = e
  }
  emit(t, e) {
    ;(t = this.eventMaps[t]), t && t(e)
  }
}
class Xt {
  constructor(t) {
    t.chartWrapper
      ? ((this.direction = t.direction ?? f.bottom),
        (this.baseCardSize = t.baseCardSize ?? N),
        (this.chartWrapper = t.chartWrapper),
        (this.editStatus = !!t.editStatus),
        (this.customChartItemAttr = t.setTreeDataAttribute),
        (this.computedLocMap = t.computedLocMap),
        (this.getPathScheme = t.getPathScheme),
        (this.chartWrapperSize = {
          w: this.chartWrapper.offsetWidth,
          h: this.chartWrapper.offsetHeight,
        }),
        (this.chartWrapper.style.position = 'relative'),
        (this.listenEvent = new Yt()))
      : console.error('容器不可缺少')
  }
  initData(t) {
    t
      ? ((t = JSON.parse(JSON.stringify(t))),
        (this.treeDataApp = new Ut(this, t)),
        (this.chartDataApp = new Tt(this)))
      : console.error('缺少树图数据')
  }
  initMainView(t) {
    var e
    t.treeData && this.initData(t.treeData),
      t.cardModelMap || console.error('缺少卡片模板数据'),
      (e = this.chartDataApp) != null && e.chartData
        ? ((this.mainViewApp = new Ot(this, t)),
          this.on('scaleChart', (a = !0) => {
            this.mainViewApp.scaleRootGroup(a)
          }),
          this.on('setChartScale', (a = 1) => {
            this.mainViewApp.operatorRootGroup({ k: a })
          }))
        : (console.error('缺少卡片树图数据'), (this.chartWrapper.innerHTML = ''))
  }
  initPreView(t) {
    this.mainViewApp
      ? ((this.preViewApp = new Bt(this, t)),
        this.on('showPreView', (e = !0) => {
          this.preViewApp.previewWrapper.style('display', e ? 'block' : 'none')
        }))
      : console.error('缺少主视图')
  }
  resizeChartWrapper() {
    ;(this.chartWrapperSize = {
      w: this.chartWrapper.offsetWidth,
      h: this.chartWrapper.offsetHeight,
    }),
      (this.mainViewApp.svgWrapper.node().style.width = this.chartWrapperSize.w + 'px'),
      (this.mainViewApp.svgWrapper.node().style.height = this.chartWrapperSize.h + 'px'),
      this.chartDataApp.resetCardLoc(),
      this.mainViewApp.chartCardApp.setNodeUpdate(),
      this.mainViewApp.chartPathApp.setLinkupdate(),
      this.mainViewApp.resetSvgSize(),
      this.mainViewApp.setSvgParams(),
      this.preViewApp && this.preViewApp.paintPreView()
  }
  resetChartView(t = 1, e = this.chartDataApp.chartData) {
    this.mainViewApp.cardOpRepaint(t, e), this.preViewApp && this.preViewApp.paintPreView()
  }
  resetCoordinate() {
    this.chartDataApp.initChartData(),
      this.mainViewApp.updatePaintChart(this.chartDataApp.chartData, !0),
      this.mainViewApp.chartCardApp.clearSelectCard(),
      this.preViewApp && this.preViewApp.paintPreView()
  }
  foldData(t) {
    this.treeDataApp.foldData(t),
      this.chartDataApp.initChartData(),
      this.mainViewApp.updatePaintChart(this.chartDataApp.chartDataMap[t.id]),
      this.preViewApp && this.preViewApp.paintPreView()
  }
  openData(t) {
    this.treeDataApp.openData(t),
      this.chartDataApp.initChartData(),
      this.mainViewApp.updatePaintChart(this.chartDataApp.chartDataMap[t.id], !0),
      this.preViewApp && this.preViewApp.paintPreView()
  }
  cardMenuAddCustom(t) {
    this.cardMenuAdd(
      { id: (t.id + '').substring(0, 16) + '_' + /* @__PURE__ */ new Date().getTime() },
      t.id
    )
  }
  cardMenuAdd(t, e) {
    this.treeDataApp.cardMenuAdd(t, e),
      this.chartDataApp.initChartData(),
      this.mainViewApp.updatePaintChart(this.chartDataApp.chartDataMap[e], !0),
      this.mainViewApp.chartCardApp.cardMenuApp.hiddenMenu()
  }
  cardMenuDelCustom(t) {
    this.cardMenuDel(t)
  }
  cardMenuDel(t) {
    var a
    var e = { ...this.chartDataApp.chartDataMap[t.id] }
    this.treeDataApp.cardMenuDel(t),
      this.chartDataApp.initChartData(),
      this.treeDataApp.treeData
        ? (this.mainViewApp.updatePaintChart(e),
          this.mainViewApp.chartCardApp.updateCardById([
            ((a = t == null ? void 0 : t.parent) == null ? void 0 : a.id) ?? '',
          ]))
        : (this.mainViewApp.chartCardApp.delCardGroup(),
          this.mainViewApp.chartPathApp.delPathGroup()),
      this.mainViewApp.chartCardApp.cardMenuApp.hiddenMenu()
  }
  cardMenuEditCustom(t) {
    console.warn('请调用cardMenuEdit方法，传入新的属性', t)
  }
  cardMenuEdit(t, e) {
    this.treeDataApp.cardMenuEdit(t, e),
      this.chartDataApp.cardMenuEdit(t, e),
      this.mainViewApp.chartCardApp.updateCardById([t.id]),
      (e = this.mainViewApp.chartCardApp.cardMenuApp),
      e && e.hiddenMenu()
  }
  setTreeDataAttr(t, e, a) {
    this.treeDataApp.setItemsAttr(t, e, a)
  }
  eachTreeData(t) {
    k(this.treeDataApp.treeData, t)
  }
  getSelectCard() {
    var t, e
    return (
      ((e = (t = this.mainViewApp) == null ? void 0 : t.chartCardApp) == null
        ? void 0
        : e.selectedCards) ?? []
    )
  }
  preViewPathFilt(t) {
    return !0
  }
  getPathScheme({}) {
    return ''
  }
  isVertical(t) {
    return !1
  }
  allowChild(t) {
    return !0
  }
  isSameList(t, e) {
    return !0
  }
  expandRuler(t) {
    return !1
  }
  breforeOpenData(t, e) {
    return []
  }
  updateMateData(t, e) {
    return [null, null]
  }
  setNewMateData(t) {
    this.treeDataApp.setNewMateData(t)
  }
  rePaintUpdateMateData(t) {
    this.chartDataApp.initChartData(),
      (t = this.chartDataApp.chartDataMap[t ?? this.chartDataApp.chartData.id]),
      this.mainViewApp.updatePaintChart(t, !0),
      this.preViewApp && this.preViewApp.paintPreView()
  }
  on(t, e) {
    this.listenEvent.on(t, e)
  }
  emit(t, e) {
    this.listenEvent.emit(t, e)
  }
  getData(t = '') {
    var e
    if ((e = this.chartDataApp) != null && e.chartData) {
      if (t === '') return ''
      switch (t) {
        case 'scaleValue':
          return this.mainViewApp.rootGroupLoc.k
        case 'nodeNums':
          return this.chartDataApp.chartData.getNodes().length ?? 0
        case 'editStatus':
          return this.editStatus
      }
    }
  }
  setData(t = '', e) {
    var o
    if ((o = this.chartDataApp) != null && o.chartData) {
      if (t === '') return ''
      switch (t) {
        case 'preViewPostion':
          var { top: a, right: r, bottom: i, left: p } = e
          a && this.preViewApp.previewWrapper.style('top', a),
            r && this.preViewApp.previewWrapper.style('right', r),
            i && this.preViewApp.previewWrapper.style('bottom', i),
            p && this.preViewApp.previewWrapper.style('top', p)
          break
        case 'editStatus':
          this.editStatus = e
          break
        case 'direction':
          this.direction = e ?? f.bottom
      }
    }
  }
}
export { Xt as default }
