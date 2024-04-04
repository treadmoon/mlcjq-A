import * as d3 from 'd3'
const y = 1e3,
  j = 0.25,
  Z = 2,
  q = 0.5,
  R = {
    w: 150,
    h: 60,
    xSpace: 36,
    ySpace: 36,
    xSpace2r: 18,
    ySpace2v: 18,
  },
  J = {
    background: '#fff',
    border: '#CAD1DB',
    borderType: '',
    radius: 4,
  },
  K = 'normal',
  Q = {
    w: 180,
    h: 100,
  },
  tt = {
    12: 16,
    14: 19,
    16: 21,
  },
  et = {
    background: '#fff',
  },
  x = {
    bottom: 1,
    right: 2,
    top: 3,
    left: 4,
  },
  rt = {
    stroke: '#bbb',
  },
  N = 500,
  at = 500,
  it =
    "Roboto,'San Francisco','Helvetica Neue',Helvetica,Arial,'PingFang SC','Hiragina Sans GB','WenQuanYi Micro Hei','microsoft yahei ui','microsoft yahei',sans-serif"
function m(s, t) {
  e([s])
  function e(r) {
    for (let a = 0; a < r.length; a++) {
      const i = r[a]
      t(i), i.children && i.children.length > 0 && e(i.children)
    }
  }
}
function w(s, t, e) {
  let r = t
  return typeof s == 'function' ? (r = s(e)) : typeof s > 'u' ? (r = t) : (r = s), r
}
function $(s, t) {
  let e = -1
  for (let r = 0; r < s.length; r++)
    if (s[r].id === t.id) {
      e = r
      break
    }
  s.splice(e, 1)
}
function st(s, t) {
  return (s = [.../* @__PURE__ */ new Set([...s, t])])
}
function D(s, t, e) {
  r([s])
  function r(a) {
    for (let i = 0; i < a.length; i++) {
      if (a[i].id === t) {
        e(a[i])
        break
      }
      a[i].children && r(a[i].children)
    }
  }
}
function I(s, t, e, r) {
  const a = s[t]
  switch (r) {
    case 1:
    case 3:
      s.splice(e, 0, a)
      break
    case 2:
    case 4:
      s.splice(e + 1, 0, a)
      break
  }
  t > e && (t += 1), s.splice(t, 1)
}
function b() {
  return navigator.userAgent.toLowerCase().indexOf('trident') > -1
}
function pt() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1
}
function E(s, t) {
  let e = s + (t > 0 ? -1 : 1) * j
  return (e = Math.min(Z, e)), (e = Math.max(q, e)), e
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
  ht = {
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
  nt = {
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
  ct = {
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
function dt(s) {
  const t = gt(s),
    e = []
  let r = s.texts
  for (let i = 1; i <= t.lineNums; i++) {
    const p = ut(r, s, t)
    if (
      (s.wMode === 'tb'
        ? e.push({
            text: p.txt,
            x: s.bx + (i - 1 / 2) * s.fontSize,
            y: s.by,
            len: p.txtWidth,
          })
        : e.push({
            text: p.txt,
            x: s.bx,
            y: s.by + i * s.fontSize,
            len: p.txtWidth,
          }),
      (r = p.restText),
      r.length == 0)
    )
      break
  }
  e.map((i) => {
    const [p, h] = lt(s, i.len, e.length)
    ;(i.x += p), (i.y += h)
  })
  const a = r.length > 0
  if (a && e.length > 0) {
    const i = e[e.length - 1].text
    e[e.length - 1].text = i.substr(0, i.length - 1) + '…'
  }
  return { textDoms: e, isEllipsis: a }
}
function lt(
  {
    wMode: s = '',
    boxHeight: t = 0,
    boxWidth: e = 0,
    fontSize: r = 12,
    fontHeight: a = 14,
    valign: i = '',
    textAnchor: p = '',
  },
  h,
  n
) {
  let o = 0,
    d = 0
  if (s === 'tb')
    switch (((d = (e - n * r) / 2), i)) {
      case 'center':
        o = (t - h) / 2
        break
      case 'bottom':
        o = t - h
        break
    }
  else {
    switch (i) {
      case 'center':
        o = (t - n * a) / 2
        break
      case 'bottom':
        o = t - n * a
        break
    }
    switch (p) {
      case 'middle':
        d = (e - h) / 2
        break
      case 'end':
        d = e - h
        break
    }
  }
  return [d, o]
}
function ut(s, t, e) {
  let r = '',
    a = 0,
    i = 1
  for (; a < s.length; a++) {
    const p = H(s[a], t.fontSize, t.fontWeight)
    if (i + p <= e.textLineWidth) (r += s[a]), (i += p)
    else break
  }
  return {
    // 这一行的字符串
    txt: r,
    // 这一行的字符串宽度(最后一行不一定占满)
    txtWidth: i,
    // 剩余文字
    restText: s.slice(a),
  }
}
function H(s = '', t = 14, e = 500) {
  let r = 0,
    a
  if (s.charCodeAt(0) > 255) r = t
  else
    switch (((a = t > 16 ? 'max' : t < 12 ? 'min' : t), 'S' + a + 'F' + (e >= 600 ? '6' : 'N'))) {
      case 'SminFN':
        r = (L[s] * t) / 12
        break
      case 'S12FN':
        r = L[s]
        break
      case 'S14FN':
        r = ht[s]
        break
      case 'S16FN':
        r = nt[s]
        break
      case 'SmaxFN':
        r = (L[s] * t) / 12
        break
      case 'SminF6':
        r = (V[s] * t) / 12
        break
      case 'S12F6':
        r = V[s]
        break
      case 'S14F6':
        r = ot[s]
        break
      case 'S16F6':
        r = ct[s]
        break
      case 'SmaxF6':
        r = (V[s] * t) / 12
        break
    }
  return r
}
function ft(s, t = 12, e = 100) {
  let r = 1
  for (let a = 0; a < s.length; a++) r += H(s[a], t, e)
  return r
}
function gt({ wMode: s = '', boxHeight: t = 0, boxWidth: e = 0, fontHeight: r = 14 }) {
  let a = 0,
    i = 0
  return (
    s === 'tb' ? ((a = t), (i = Math.floor(e / r))) : ((a = e), (i = Math.floor(t / r))),
    {
      // 一行文字的长度
      textLineWidth: a,
      // 几行文字
      lineNums: i,
    }
  )
}
function At(s) {
  return tt[s] ?? s + 2
}
function wt(s, t) {
  if (!s) return null
  const e = {},
    r = u.tree().nodeSize([t.w + t.xSpace, t.h + t.ySpace]),
    a = u.hierarchy(s)
  return (
    r(a),
    a.descendants().forEach((i) => {
      e[i.data.id] = {
        x: i.x,
        y: i.y + t.h / 2 + 20,
        depth: i.depth,
      }
    }),
    e
  )
}
function Ct(s) {
  const t = u
    .create('div')
    .attr('class', 'svg_wrapper')
    .style('width', s.w + 'px')
    .style('height', s.h + 'px')
    .style('position', 'absolute')
    .style('overflow', 'hidden')
    .style('left', '50%')
    .style('top', '0')
    .style('transform', 'translateX(-50%)')
  return t.html("<div class='null_data'><div class='tips_img' ></div><p>暂无数据</p></div>"), t
}
function kt(s = 180) {
  return (
    (s = Math.min(s, 180)),
    (s = Math.max(s, 120)),
    u
      .create('div')
      .attr('class', 'text_tips_wrapper')
      .style('position', 'absolute')
      .style('display', 'none')
      .style('max-width', `${s}px`)
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
function yt(s) {
  return u.create('svg').style('background', s).style('user-select', 'none')
}
function G(s) {
  const t = u
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
function F(s, t, e = 1) {
  const r = O(s, t, e),
    { textDoms: a, isEllipsis: i } = dt(r),
    p = u
      .create('svg:text')
      .attr('writing-mode', r.wMode)
      .attr('fill', r.color)
      .attr('xml:space', 'preserve')
      .attr('text-anchor', 'start')
      .attr('font-size', r.fontSize)
      .attr('font-weight', r.fontWeight)
      .attr('class', 'cardto' + t.id)
  return (
    a.map((h) => {
      p.append('svg:tspan')
        .text(h.text)
        .attr('x', h.x)
        .attr('y', h.y)
        .attr('font-family', it)
        .attr('word-spacing', 0)
        .attr('letter-spacing', 0)
        .attr('textLength', h.len)
    }),
    [p, i]
  )
}
function O(s, t, e = 1) {
  const {
    fontSize: r = 12,
    fontWeight: a = at,
    wMode: i = 'lr',
    valign: p = 'center',
    textAnchor: h = 'start',
    w: n = 0,
    h: o = 0,
    x: d = 0,
    y: c = 0,
  } = s
  return {
    texts: s.text({ node: t })[0] || '',
    fontSize: r * e,
    fontHeight: At(r) * e,
    fontWeight: a,
    color: w(s.color, '#fff', { node: t }),
    wMode: i,
    valign: p,
    //top center
    textAnchor: h,
    //start middle end
    boxWidth: parseInt(n * e + ''),
    boxHeight: parseInt(o * e + ''),
    bx: d * e,
    by: c * e,
  }
}
function xt(s, t) {
  const e = u.create('svg:defs'),
    r = 'imgRect' + s,
    a = t.imgSize / 2
  return (
    e
      .append('rect')
      .attr('id', r)
      .attr('x', t.cx)
      .attr('y', t.cy)
      .attr('rx', t.rx)
      .attr('width', a * 2)
      .attr('height', a * 2)
      .attr('stroke', '#f00')
      .attr('stroke-width', 2),
    e
      .append('clipPath')
      .attr('id', s)
      .append('use')
      .attr('xlink:href', '#' + r),
    e
  )
}
function mt(s, t, e, r, a) {
  return u
    .create('svg:image')
    .attr('id', r)
    .attr('style', s.style ?? '')
    .attr('crossOrigin', 'Anonymous')
    .attr('xlink:href', s.url({ node: e }))
    .attr('width', a.rw)
    .attr('height', a.rh)
    .attr('x', a.x)
    .attr('y', a.y)
    .attr('clip-path', 'url(#' + t + ')')
}
function B(s, t, e = 1) {
  const r = s.class ?? '',
    a = r === 'clickDom' ? 'pointer' : 'move',
    { fillOpacity: i, strokeOpacity: p, strokeWidth: h, fill: n, stroke: o } = s
  return u
    .create('svg:rect')
    .attr('class', r)
    .attr('x', s.x)
    .attr('y', s.y)
    .attr('rx', s.rx)
    .attr('width', s.w * e)
    .attr('height', s.h * e)
    .attr('fill', w(n, '#fff', { node: t }))
    .attr('fill-opacity', i == 0 ? 0 : i || 1)
    .attr('stroke', w(o, '#fff', { node: t }))
    .attr('stroke-width', h == 0 ? 0 : 1)
    .attr('stroke-opacity', p == 0 ? 0 : p || 1)
    .attr('shape-rendering', 'auto')
    .attr('style', `cursor:${a}`)
}
function vt(s, t) {
  const { x: e = 0, y: r = 0, w: a = 0, h: i = 0, vw: p = 0, vh: h = 0 } = s
  return u
    .create('svg:svg')
    .attr('x', w(e, 0, { node: t }))
    .attr('y', w(r, 0, { node: t }))
    .attr('width', a)
    .attr('height', i)
    .attr('style', 'vertical-align:middle;fill:currentColor;overflow:hidden;')
    .attr('viewBox', `0 0 ${p} ${h}`)
}
function St(s, t) {
  return u
    .create('svg:circle')
    .attr('r', s.r)
    .attr('cx', s.x)
    .attr('cy', s.y)
    .attr('class', s.class || '')
    .attr('fill', w(s.fill, '#fff', { node: t }))
    .attr('stroke', w(s.stroke, '#fff', { node: t }))
    .attr('stroke-opacity', s.strokeOpacity || 1)
    .attr('shape-rendering', 'crispEdges')
}
function Dt({ x: s = 0, y: t = 0, w: e = 0, stroke: r = '#ccc', strokeDasharray: a }) {
  return u
    .create('svg:path')
    .attr('class', 'infoLine')
    .attr('d', `M${s},${t} H${s + parseInt(e + '')}`)
    .attr('fill-opacity', 0)
    .attr('stroke-width', 0.5)
    .attr('stroke', r)
    .attr('stroke-dasharray', a ?? e)
    .attr('shape-rendering', 'crispEdges')
}
function bt({
  x: s = 0,
  y: t = 0,
  w: e = 0,
  line: r = '',
  stroke: a = '#ccc',
  strokeDasharray: i,
}) {
  return u
    .create('svg:path')
    .attr('class', 'infoLine')
    .attr('d', `M${s},${t} ${r}`)
    .attr('fill-opacity', 0)
    .attr('stroke-width', 0.5)
    .attr('stroke', a)
    .attr('stroke-dasharray', i ?? e)
    .attr('shape-rendering', 'crispEdges')
}
function Lt(s, t) {
  const { fontSize: e = 12, fill: r = '', x: a = 0, y: i = 0, text: p, follow: h } = s,
    n = w(p, '', { node: t })
  let o = 0,
    d = 0
  if (h && h.tag) {
    const c = Vt(h, t)
    h.wMode === 'tb' ? (d = c) : (o = c)
  }
  return u
    .create('svg:text')
    .html(n)
    .attr('class', 'icon ' + s.class)
    .attr('font-size', e)
    .attr('fill', r)
    .attr('x', a + o)
    .attr('y', i + e + d)
}
function Vt(s, t) {
  let e = 0,
    r,
    a
  switch (s.tag) {
    case 'text':
      if (((r = O(s, t, 1)), (a = ft(r.texts, r.fontSize, r.fontWeight)), r.wMode === 'lr')) {
        if (a > r.boxWidth) break
        switch (r.textAnchor) {
          case 'start':
            break
          case 'middle':
            e = (r.boxWidth - a) / 2
            break
          case 'end':
            e = r.boxWidth - a
            break
        }
      }
      if (r.wMode === 'tb') {
        if (a > r.boxHeight) break
        switch (r.valign) {
          case 'top':
            break
          case 'center':
            e = (r.boxHeight - a) / 2
            break
          case 'bottom':
            e = r.boxHeight - a
            break
        }
      }
      break
  }
  return e
}
function Gt(s, t, { h: e = 0 }) {
  const r = {
      x: t.x - t.cardSize.w / 2,
      y: t.y - e / 2,
    },
    a = u
      .create('svg:g')
      .attr('transform', 'translate(' + r.x + ',' + r.y + ')')
      .attr('class', 'shadowGroup')
  a
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
    s.appendChild(a.node())
}
function Mt() {
  u.selectAll('.shadowGroup').remove()
}
function Tt(
  { x: s = 0, y: t = 0, w: e = 0, h: r = 0, path: a, class: i = '', fill: p = '#fff' },
  h
) {
  const n = u
    .create('svg:svg')
    .attr('class', 'cardmenu-svgwrapper')
    .attr('x', s)
    .attr('y', t)
    .attr('width', e)
    .attr('height', r)
    .attr('style', 'vertical-align:middle;fill:currentColor;overflow:hidden;')
    .attr('viewBox', '0 0 1024 1024')
  return (
    w(a, [], { node: h }).forEach((d) => {
      typeof d == 'string'
        ? n.append('path').attr('class', i).attr('d', d).attr('fill', p).attr('fill-opacity', 1)
        : n
            .append('path')
            .attr('class', i)
            .attr('d', d.d)
            .attr('fill', d.fill || p)
            .attr('fill-opacity', d.opacity == 0 ? 0 : d.opacity || 1)
    }),
    n
  )
}
function Pt({ class: s = '', d: t, fill: e, fillOpacity: r }, a) {
  return u
    .create('svg:path')
    .attr('class', s)
    .attr('d', w(t, [], { node: a }))
    .attr('fill', w(e, '#fff', { node: a }))
    .attr('fill-opacity', r == 0 ? 0 : 1)
}
function W(s, { className: t = '', fontSize: e = 12, x: r = 0, y: a = 0, fill: i = '' }) {
  return u
    .create('svg:text')
    .html(s)
    .attr('class', 'icon ' + t)
    .attr('style', `font-size:${e}px`)
    .attr('fill', i)
    .attr('x', r)
    .attr('y', a)
    .attr('cursor', 'pointer')
}
function zt(s, t, e, r) {
  return u
    .create('svg:circle')
    .attr('class', r)
    .attr('r', s)
    .attr('cx', t)
    .attr('cy', e)
    .attr('fill', '#fff')
    .attr('stroke-opacity', 0)
    .attr('shape-rendering', 'crispEdges')
}
function Et(s, t, e) {
  let r = t.w / 2 - e / 2,
    a = 0
  switch (s) {
    case 1:
      a = t.h + e
      break
    case 2:
      ;(a = t.h / 2 + e / 2), (r = t.w)
      break
    case 3:
      a = 0
      break
    case 4:
      ;(a = t.h / 2 + e / 2), (r = -e)
      break
  }
  return [r, a]
}
class Wt {
  constructor(t) {
    ;(this.kdChartApp = t), this.initChartData()
  }
  initChartData() {
    ;(this.chartDataMap = {}), (this.chartData = this.initFormatData())
  }
  initFormatData() {
    const t = this.getCardLocMap() ?? {},
      e = this.nodeList,
      r = this.linkList,
      a = (i, p = null) => {
        var n, o, d
        const h = []
        for (let c = 0; c < i.length; c++) {
          if (!i[c]) continue
          const l = {
            id: i[c].id,
            data: i[c],
            parent: p,
            ...t[i[c].id],
            getNodes: e,
            getLinks: r,
          }
          ;(l.x0 = l.x),
            (l.y0 = l.y),
            (((o = (n = i[c]) == null ? void 0 : n.children) == null ? void 0 : o.length) ?? 0) >
              0 &&
              ((l.children = a(((d = i[c]) == null ? void 0 : d.children) ?? [], l)),
              (l._children = l.children)),
            l.cardStyle || (l.cardStyle = J),
            l.cardModel || (l.cardModel = K),
            l.cardSize || (l.cardSize = this.kdChartApp.baseCardSize ?? R),
            this.kdChartApp.customChartItemAttr && this.kdChartApp.customChartItemAttr(l),
            (this.chartDataMap[l.id] = l),
            h.push(l)
        }
        return h
      }
    return a([this.kdChartApp.treeDataApp.treeData], null)[0]
  }
  nodeList() {
    const t = []
    return (
      m(this, (e) => {
        t.push(e)
      }),
      t
    )
  }
  linkList() {
    const t = []
    return (
      m(this, (e) => {
        e.children &&
          e.children.length > 0 &&
          e.children.map((r) => {
            t.push({
              source: e,
              target: r,
            })
          })
      }),
      t
    )
  }
  exchangeNode(t, e, r, a) {
    I(t.children, e, r, a)
  }
  //重新计算坐标,并替换
  resetCardLoc() {
    const t = this.getCardLocMap()
    this.chartData.getNodes().forEach((e) => {
      const r = t[e.id]
      ;(e.x = r.x),
        (e.x0 = e.x),
        (e.y = r.y),
        (e.y0 = e.y),
        (e.depth = r.depth),
        (e.height = r.height)
    })
  }
  // 获取坐标
  getCardLocMap() {
    const {
      treeDataApp: { treeData: t },
      baseCardSize: e,
      chartWrapperSize: r,
      direction: a,
    } = this.kdChartApp
    return this.kdChartApp.computedLocMap && typeof this.kdChartApp.computedLocMap == 'function'
      ? this.kdChartApp.computedLocMap({
          treeData: t,
          baseCardSize: e,
          chartWrapperSize: r,
          direction: a,
        })
      : wt(t, e)
  }
  cardMenuEdit(t, e) {
    Object.keys(e).map((r) => {
      this.chartDataMap[t.id].data[r] = e[r]
    }),
      this.kdChartApp.customChartItemAttr(this.chartDataMap[t.id])
  }
}
class _t {
  constructor(t) {
    const e = t.kdChartApp.chartWrapper
    ;(this.tipsWrapper = kt(t.kdChartApp.baseCardSize.w)),
      e.querySelectorAll('.text_tips_wrapper').forEach((r) => e.removeChild(r)),
      e.appendChild(this.tipsWrapper.node())
  }
  showTextTips({ x: t = 0, y: e = 0 }, r = '') {
    this.tipsWrapper
      .text(`${r}`)
      .style('top', `${e}px`)
      .style('left', `${t}px`)
      .style('display', 'block')
  }
  hideTextTips() {
    this.tipsWrapper.text('').style('display', 'none')
  }
}
class Rt {
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
    { x: t = 0, y: e = 0, cardSize: { w: r = 0, h: a = 0, xSpace: i = 0, ySpace: p = 0 } },
    h
  ) {
    const { h: n = 0 } = this.parentViewApp.kdChartApp.baseCardSize
    switch (h) {
      case 1:
        this.transSortCard({
          x: t + 4 - i - r / 2,
          y: e - n / 2,
          w: i - 8,
          h: a,
        })
        break
      case 2:
        this.transSortCard({
          x: t + 4 + r / 2,
          y: e - n / 2,
          w: i - 8,
          h: a,
        })
        break
      case 3:
        this.transSortCard({
          x: t - r / 2,
          y: e - n / 2 - (p - 8) - 4,
          w: r,
          h: p - 8,
        })
        break
      case 4:
        this.transSortCard({
          x: t - r / 2,
          y: e + n / 2 + 4,
          w: r,
          h: p - 8,
        })
        break
    }
  }
  transSortCard({ x: t = 0, y: e = 0, w: r = 0, h: a = 0 }) {
    this.sortPreRect &&
      (this.sortPreRect.attr('transform', `translate(${t},${e})`).attr('style', ''),
      this.sortPreRectInner.attr('height', a).attr('width', r))
  }
  delSortCard() {
    this.sortPreRect &&
      (this.sortPreRect.attr('style', 'display:none'), (this.sortTargetNode = null))
  }
}
function C(s, t, e = 1) {
  return `translate( ${(s.x - s.cardSize.w / 2) * e}, ${(s.y - t.h / 2) * e})`
}
function Nt(
  {
    w: s,
    h: t,
    x: e = 0,
    y: r = 0,
    rx: a = 0,
    textAnchor: i = 'middle',
    //start middle end
    valign: p = 'center',
    //top center bottom
  },
  h
) {
  const n = parseInt(s + ''),
    o = Math.min(n, t)
  switch (i) {
    case 'start':
      break
    case 'middle':
      e += (n - o) / 2
      break
    case 'end':
      e = n - o
      break
  }
  switch (p) {
    case 'top':
      break
    case 'center':
      r += (t - o) / 2
      break
    case 'bottom':
      r = t - o
      break
  }
  const d = e,
    c = r
  return new Promise((l) => {
    const f = new Image()
    ;(f.src = h),
      (f.onload = () => {
        let g = f.width,
          A = f.height
        g > A
          ? ((g = (o / A) * g), (A = o), (e -= (g - A) / 2))
          : ((A = (o / g) * A), (g = o), (r -= (A - g) / 2)),
          l({ imgSize: o, rw: g, rh: A, x: e, y: r, cx: d, cy: c, rx: a })
      })
  })
}
function S(s, t) {
  const e = s.target.className ? s.target.className.baseVal : ''
  let r = !0
  return (
    e !== '' &&
      t.map((a) => {
        r = r && e.indexOf(a) < 0
      }),
    r
  )
}
function $t(s, t, e, r, a, i, p) {
  var c
  let h = 0,
    n = null
  const o = ((c = t.parent) == null ? void 0 : c.children) ?? [],
    d = o.indexOf(t)
  for (let l = 0; l < o.length; l++) {
    const f = o[l]
    if (f.id === t.id) continue
    const g = s.x - f.x,
      A = s.y - f.y,
      { w: k, h: v, xSpace: Y, ySpace: X } = f.cardSize,
      M = k / 2 + Y,
      T = v / 2 + X,
      P = a(t),
      z = i(f, t)
    if (P && Math.abs(g) < k / 2) {
      if ((!z || d > l) && A < -v / 2 && A > -T) {
        ;(h = 3), (n = f)
        break
      }
      if ((!z || d < l) && A > v / 2 && A < T) {
        ;(h = 4), (n = f)
        break
      }
    }
    if (!P && Math.abs(s.y - f.y) < v / 2) {
      if (l < d && g < -k / 2 && g > -M) {
        ;(h = 1), (n = f)
        break
      }
      if (l > d && g > k / 2 && g < M) {
        ;(h = 2), (n = f)
        break
      }
    }
  }
  return h === 0 && ([h, n] = It(e, t, r, s, p)), [h, n]
}
function It(s, t, e, r, a) {
  let i = 0,
    p = null
  h([s])
  function h(n) {
    var o
    for (let d = 0; d < n.length; d++) {
      const c = n[d],
        { w: l, h: f } = c.cardSize
      if (c.id !== t.id) {
        const g = r.x - (c.x - l / 2),
          A = r.y - (c.y - e.h / 2)
        if (c.id !== (((o = t.parent) == null ? void 0 : o.id) ?? '') && a(c)) {
          if (g > 0 && g < l && A > 0 && A < f) {
            ;(i = 5), (p = c)
            break
          }
        } else if (g > 0 && g < l && A > 0 && A < f) {
          i = 6
          break
        }
        c.children && c.children.length > 0 && h(c.children)
      }
    }
  }
  return [i, p]
}
function _(s, t, e) {
  const r = s - 3
  return [r / 2, t + r / 2, e - r / 2 - 1]
}
class Ht {
  constructor(t) {
    ;(this.parentViewApp = t),
      (this.duration = N),
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
    const { baseCardSize: r, editStatus: a } = this.parentViewApp.kdChartApp,
      i = this.parentViewApp.kdChartApp.chartDataApp.chartData.getNodes().reverse()
    ;(this.nodeGroup = this.cardGroup.selectAll('g').data(i, (p) => {
      var h
      return (
        p.id + '_' + (((h = p == null ? void 0 : p.data) == null ? void 0 : h.hasChildren) ?? 0)
      )
    })),
      (this.nodeEnter = this.nodeGroup
        .enter()
        .append('g')
        .attr('class', (p) => 'card-group cardto' + p.id + (a ? ' edit' : ''))
        .attr('transform', () => C(t, r))),
      this.bindCardEvent(this.nodeEnter),
      this.setNodeUpdate(),
      this.nodeGroup
        .exit()
        .transition()
        .duration(this.duration)
        .remove()
        .attr('transform', (p) => C(t, r))
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
        .attr('class', (r) => 'card-group cardto' + r.id + (e ? ' edit' : ''))
        .attr('transform', (r) => C(r, t))
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1),
      this.nodeUpdate.nodes().map((r) => {
        this.paintCardToggle(r.__data__, r)
      })
  }
  resetPaintByLoc() {
    this.setNodeUpdate()
  }
  clearAllChartCard() {
    this.nodeUpdate.nodes().map((t) => {
      t.childNodes.length > 0 &&
        (u.select(t).selectAll('*').remove(), delete this.toogleGroupMap[t.__data__.id])
    })
  }
  // 绑定卡片事件
  bindCardEvent(t) {
    t.call(
      u
        .drag()
        .on('start', (e, r) => {
          this.parentViewApp.kdChartApp.editStatus
        })
        .on('drag', (e, r) => {
          this.parentViewApp.kdChartApp.editStatus &&
            ((e.dx == 0 && e.dy == 0) ||
              (this.draging || ((this.draging = !0), this.initNodeDraging(r)),
              this.nodeDraging(e, r)))
        })
        .on('end', (e, r) => {
          if (!this.parentViewApp.kdChartApp.editStatus) {
            this.clickCard(r, e)
            return
          }
          this.draging ? this.nodeDragend(e, r) : this.clickCard(r, e)
        })
        .filter((e) => S(e, ['op-icon', 'outcard']))
    )
      .on('mousemove', (e, r) => {
        if (!S(e, ['op-icon', 'outcard'])) return
        const a = this.computedCurrNodeDomLocate(r)
        this.parentViewApp.kdChartApp.emit('hoverCardIn', {
          event: e,
          domLoc: a,
          node: r,
        })
      })
      .on('mouseout', (e) => {
        S(e, ['op-icon', 'outcard']) &&
          this.parentViewApp.kdChartApp.emit('hoverCardOut', { event: e })
      })
      .on('contextmenu', (e, r) => {
        e.preventDefault(), console.log('右键单击事件已触发')
      })
  }
  // 卡片
  computedCurrNodeDomLocate(t) {
    const {
        intialGroupLoc: { x: e, y: r },
        rootGroupLoc: { x: a, y: i, k: p = 1 },
      } = this.parentViewApp,
      { w: h, h: n } = this.parentViewApp.kdChartApp.baseCardSize
    return {
      // 在卡片旁边+拖拽距离+初始偏移距离（从左边缘偏移到中间）
      x: (t.x + h / 2) * p + (a - e) + this.parentViewApp.kdChartApp.chartWrapperSize.w / 2,
      y: (t.y - n / 2) * p + (i - r),
    }
  }
  initNodeDraging(t) {
    u.selectAll('g.ghover').classed('ghover', !1)
    const e = document.getElementsByClassName('cardto' + t.id)[0],
      r = e.parentNode
    r == null || r.removeChild(e),
      Gt(r, t, this.parentViewApp.kdChartApp.baseCardSize),
      r == null || r.appendChild(e),
      this.sortCard || (this.sortCard = new Rt(this.parentViewApp))
  }
  nodeDraging(t, e) {
    this.dragNode(t, e)
  }
  nodeDragend(t, e) {
    Mt(), (this.draging = !1), (this.selectedCards = []), this.dragNode(t, e, 2)
  }
  //dragStatus  1:draging  2:end
  dragNode(t, e, r = 1) {
    ;(e.x += t.dx), (e.y += t.dy)
    const [a, i, p] = this.getDragNodeInfo(t, e)
    this.sortCard.delSortCard(), this.clearSelectCard()
    const { x: h, y: n } = this.computedCurrDomLocate({ node: e, e: t })
    if (r === 1)
      switch ((this.moveNode(e), i)) {
        case 0:
          this.parentViewApp.cardShowTips.hideTextTips()
          break
        case 1:
        case 2:
        case 3:
        case 4:
          console.log('操作提示'),
            this.sortCard.showSortCard(p, i),
            this.parentViewApp.cardShowTips.showTextTips(
              {
                x: h,
                y: n,
              },
              '变换顺序2'
            )
          break
        case 5:
          u.select('.cardto' + p.id).classed('ghover', !0),
            this.parentViewApp.cardShowTips.showTextTips(
              {
                x: h,
                y: n,
              },
              '移至下级2'
            )
          break
        case 6:
          this.parentViewApp.cardShowTips.showTextTips(
            {
              x: h,
              y: n,
            },
            '不能移至下级2'
          )
          break
      }
    if (r === 2)
      switch ((this.parentViewApp.cardShowTips.hideTextTips(), i)) {
        case 0:
        case 6:
          console.log('不做变更'), (e.x = e.x0), (e.y = e.y0), this.moveNode(e)
          break
        case 1:
        case 2:
        case 3:
        case 4:
          this.exchangeNode(e, p, i),
            this.operateCardPublic(e, p, i),
            this.parentViewApp.kdChartApp.chartDataApp.resetCardLoc(),
            this.parentViewApp.kdChartApp.resetChartView(i)
          break
        case 5:
          console.log('变更上级'),
            this.operateCardPublic(e, p, i),
            this.updateParentNode(e, p),
            this.parentViewApp.kdChartApp.resetChartView(i)
          break
      }
  }
  getDragNodeInfo(t, e) {
    let r = t.sourceEvent.layerX,
      a = t.sourceEvent.layerY
    const { k: i = 1, x: p = 0, y: h = 0 } = this.parentViewApp.rootGroupLoc
    pt() || b()
      ? ((r -= p), (a -= h))
      : ((r += -p + this.parentViewApp.intialGroupLoc.x),
        (a += -h + this.parentViewApp.intialGroupLoc.y))
    const n = {
        x: r / i,
        y: a / i,
      },
      [o, d] = $t(
        n,
        e,
        this.parentViewApp.kdChartApp.chartDataApp.chartData,
        this.parentViewApp.kdChartApp.baseCardSize,
        this.parentViewApp.kdChartApp.isVertical,
        this.parentViewApp.kdChartApp.isSameList,
        this.parentViewApp.kdChartApp.allowChild
      )
    return [n, o, d]
  }
  operateCardPublic(t, e, r) {
    this.parentViewApp.kdChartApp.emit('operateCard', {
      node: t,
      targetNode: e,
      changeType: r,
    })
  }
  moveNode(t) {
    u.select('.cardto' + t.id).attr('transform', C(t, this.parentViewApp.kdChartApp.baseCardSize))
  }
  exchangeNode(t, e, r) {
    let a = -1,
      i = -1
    t.parent &&
      ((t.parent.children ?? []).map((p, h) => {
        p.id === t.id && (a = h), p.id === e.id && (i = h)
      }),
      this.parentViewApp.kdChartApp.treeDataApp.exchangeNode2TreeItem(t.parent.id, a, i, r),
      this.parentViewApp.kdChartApp.chartDataApp.exchangeNode(t.parent, a, i, r))
  }
  updateParentNode(t, e) {
    this.parentViewApp.kdChartApp.treeDataApp.changeParent(t.id, e.id),
      this.parentViewApp.kdChartApp.chartDataApp.initChartData()
  }
  // 卡片点击事件
  clickCard(t, e) {
    const r = e.sourceEvent.target.className.baseVal
    ;(r.indexOf('card-wrapper') < 0 && r.indexOf('clickDom') >= 0) ||
      (u.select('.cardto' + t.id).classed('ghover')
        ? (u.select('.cardto' + t.id).classed('ghover', !1), $(this.selectedCards, t))
        : (u.select('.cardto' + t.id).classed('ghover', !0),
          (this.selectedCards = st(this.selectedCards, t))),
      this.parentViewApp.kdChartApp.emit('clickCard', {
        node: t,
        selectedCards: this.selectedCards,
      }))
  }
  clearSelectCard() {
    ;(this.selectedCards = []), u.selectAll('g.ghover').classed('ghover', !1)
  }
  paintCard() {
    const { nextUpdateNode: t } = this.parentViewApp.kdChartApp.treeDataApp
    ;(this.parentViewApp.kdChartApp.treeDataApp.nextUpdateNode = []),
      this.nodeUpdate.nodes().map((e) => {
        const r = e.__data__
        this.parentViewApp.isInPaintView(r)
          ? ((e.childNodes.length <= 0 || e.cardModel !== r.cardModel || t.indexOf(r.id) > -1) &&
              ((e.cardModel = r.cardModel),
              u.select(e).selectAll('*').remove(),
              delete this.toogleGroupMap[r.id],
              e.appendChild(G(r).node()),
              this.paintCardInfo(r, e)),
            this.paintCardToggle(r, e))
          : e.childNodes.length > 0 &&
            (u.select(e).selectAll('*').remove(), delete this.toogleGroupMap[r.id])
      })
  }
  updateCardById(t) {
    this.nodeUpdate.nodes().map((e) => {
      const r = e.__data__
      t.indexOf(r.id) > -1 &&
        (u.select(e).selectAll('*').remove(),
        delete this.toogleGroupMap[r.id],
        e.appendChild(G(r).node()),
        this.paintCardInfo(r, e))
    })
  }
  updateCardByFlag(t) {
    this.nodeUpdate.nodes().map((e) => {
      const r = e.__data__
      t(r) &&
        (u.select(e).selectAll('*').remove(),
        delete this.toogleGroupMap[r.id],
        e.appendChild(G(r).node()),
        this.paintCardInfo(r, e))
    })
  }
  clearCardGroup() {
    this.nodeUpdate.nodes().map((t) => {
      t.remove()
    }),
      (this.toogleGroupMap = {})
  }
  // 绘制卡片内容
  // 包括不限：文字、图案、线条、矩形、圆形、字体图标等
  paintCardInfo(t, e) {
    const { cardModelMap: r } = this.parentViewApp
    let a
    typeof r == 'function' ? (a = r(t)) : (a = r[t.cardModel] || []),
      this.paintCardInfoDoing(t, e, a)
  }
  paintCardInfoDoing(t, e, r) {
    const { kdChartApp: a } = this.parentViewApp,
      i = []
    r.map((p, h) => {
      let n,
        o,
        d,
        c,
        l,
        f,
        g = w(p.hover, !1, { node: t })
      if (w(p.show, !0, { node: t, itChart: a })) {
        switch (p.tag) {
          case 'text':
            ;([c, l] = F(p, t)),
              c && (this.cardBindEvent(p, c, t), this.paintLoad(e, c)),
              c && l && this.setTextTips(c, p, t)
            break
          case 'img':
            ;(n = 'clip' + t.id + 'to' + h + /* @__PURE__ */ new Date().getTime()),
              (o = 'img' + t.id + 'to' + h + /* @__PURE__ */ new Date().getTime()),
              (d = p.url({ node: t })),
              Nt(p, d).then((A) => {
                i.push({ ...p, ...A, imgurl: d }),
                  this.paintLoad(e, xt(n, A)),
                  this.paintLoad(e, mt(p, n, t, o, A))
              })
            break
          case 'rect':
            ;(c = B(p, t)), this.cardBindEvent(p, c, t), this.paintLoad(e, c)
            break
          case 'circle':
            ;(c = St(p, t)), this.cardBindEvent(p, c, t), this.paintLoad(e, c)
            break
          case 'path':
            this.paintLoad(e, Dt(p))
            break
          case 'line':
            this.paintLoad(e, bt(p))
            break
          case 'icon':
            ;(c = Lt(p, t)), this.cardBindEvent(p, c, t), this.paintLoad(e, c)
            break
          case 'svgIcon':
            ;(c = Tt(p, t)), this.cardBindEvent(p, c, t), this.paintLoad(e, c)
            break
          case 'pathIcon':
            ;(c = Pt(p, t)), this.cardBindEvent(p, c, t), this.paintLoad(e, c)
            break
          case 'group':
            ;(f = vt(p, t)),
              this.cardBindEvent(p, f, t),
              this.paintCardInfoDoing(t, f.node(), p.children),
              this.paintLoad(e, f)
            break
        }
        g && this.cardElementHover(c, t, p)
      }
    })
  }
  cardBindEvent(t, e, r) {
    e.on('click', () => {
      typeof t.click == 'function' &&
        t.click(
          this.parentViewApp.kdChartApp.chartDataApp.chartDataMap[r.id],
          //这样获取最新的node
          this.parentViewApp.kdChartApp
        )
    })
  }
  paintLoad(t, e) {
    t.appendChild(e.node())
  }
  // 文字超长的省略title
  setTextTips(t, e, r) {
    if (!this.parentViewApp.textTipsFlag) return
    const a = e.text({ node: r }).reduce((i, p) => i + '' + p)
    t.on('mousemove', (i) => {
      if (this.parentViewApp.kdChartApp.editStatus) return
      const { x: p, y: h } = this.computedCurrDomLocate({ node: r, e: i, cardModel: e })
      this.parentViewApp.cardShowTips.showTextTips(
        {
          x: p,
          y: h + e.h,
        },
        a
      )
    }).on('mouseout', () => {
      this.parentViewApp.kdChartApp.editStatus || this.parentViewApp.cardShowTips.hideTextTips()
    })
  }
  cardElementHover(t, e, r) {
    t.on('mousemove', (a) => {
      this.parentViewApp.kdChartApp.emit('hoverCardElementIn', {
        event: a,
        domLoc: this.computedCurrDomLocate({ node: e, e: a, cardModel: r }),
        node: e,
        cardModel: r,
      })
    }).on('mouseout', (a) => {
      this.parentViewApp.kdChartApp.emit('hoverCardElementOut', {
        event: a,
        node: e,
      })
    })
  }
  // 卡片内容坐标（相对卡片坐标计算）
  computedCurrDomLocate({ node: t, e, cardModel: r = {} }) {
    const {
        intialGroupLoc: { x: a, y: i },
        rootGroupLoc: { x: p, y: h, k: n = 1 },
      } = this.parentViewApp,
      { fontSize: o = 12, w: d = 60, x: c = 0, y: l = 0 } = r,
      { w: f, h: g } = this.parentViewApp.kdChartApp.baseCardSize,
      A = w(o, 12, { node: t }),
      k = w(d, A, { node: t })
    return {
      x:
        (t.x - f / 2 + c + k / 3) * n +
        (p - a) +
        this.parentViewApp.kdChartApp.chartWrapperSize.w / 2,
      y: (t.y - g / 2 + l + A - 2) * n + (h - i),
    }
  }
  // 绘制折叠按钮
  paintCardToggle(t, e) {
    if (!t.data.hasChild) {
      this.removeCardToogle(t.id)
      return
    }
    if (!this.parentViewApp.iconConfig) return
    const {
        className: r,
        fontSize: a = 12,
        toogleMinus: i,
        tooglePlus: p,
      } = this.parentViewApp.iconConfig,
      [h, n] = Et(this.parentViewApp.kdChartApp.direction, t.cardSize, a)
    if (this.toogleGroupMap[t.id]) {
      this.setCardToogleLoc(t.id, h, n, a)
      return
    }
    const o = W((p == null ? void 0 : p.unicode) ?? '', {
        className: r + ' op-icon',
        fontSize: a,
        fill: (p == null ? void 0 : p.fill) ?? '',
        x: h,
        y: n + 1,
        url: (p == null ? void 0 : p.url) ?? '',
      }),
      d = W((i == null ? void 0 : i.unicode) ?? '', {
        className: r + ' op-icon',
        fontSize: a,
        fill: i == null ? void 0 : i.fill,
        x: h,
        y: n + 1,
        url: i == null ? void 0 : i.url,
      }),
      [c, l, f] = _(a ?? 14, h, n),
      g = zt(c, l, f, 'op-icon')
    t.children && t.children.length > 0
      ? o.attr('style', 'display:none;')
      : d.attr('style', 'display:none;'),
      o.on('click', () => {
        this.parentViewApp.kdChartApp.openData(t),
          d.attr('style', ''),
          o.attr('style', 'display:none;')
      }),
      d.on('click', () => {
        this.parentViewApp.kdChartApp.foldData(t),
          d.attr('style', 'display:none;'),
          o.attr('style', '')
      }),
      e.appendChild(g.node()),
      e.appendChild(o.node()),
      e.appendChild(d.node()),
      (this.toogleGroupMap[t.id] = {
        iconMaskCircle: g,
        tooglePlusIcon: o,
        toogleMinusIcon: d,
      })
  }
  setCardToogleLoc(t, e, r, a) {
    const [, i, p] = _(a, e, r)
    this.toogleGroupMap[t].iconMaskCircle.attr('cx', i).attr('cy', p),
      this.toogleGroupMap[t].tooglePlusIcon.attr('x', e).attr('y', r + (b() ? -a : 0)),
      this.toogleGroupMap[t].toogleMinusIcon.attr('x', e).attr('y', r + (b() ? -a : 0))
  }
  removeCardToogle(t) {
    this.toogleGroupMap[t] &&
      (this.toogleGroupMap[t].iconMaskCircle.remove(),
      this.toogleGroupMap[t].tooglePlusIcon.remove(),
      this.toogleGroupMap[t].toogleMinusIcon.remove(),
      delete this.toogleGroupMap[t])
  }
}
function Ft({ cardSize: { h: s = 0 }, x0: t = 0, y0: e = 0 }, r = 1) {
  const [a, i] = [t * r, e * r],
    p = i + (s * r) / 2 + 4
  return `M${a},${p} V${i} H${a} V${i}`
}
function U({ source: s, target: t }, { h: e = 0 }, r = 1) {
  const [a, i] = [s.x * r, s.y * r],
    [p, h] = [t.x * r, t.y * r],
    n = (e * r) / 2
  return `M${a},${i + n} V${(h + i) / 2} H${p} V${h - n}`
}
function Ot({ cardSize: { h: s = 0 }, x: t = 0, y: e = 0 }, r = 1) {
  const [a, i] = [t * r, e * r],
    p = i + (s * r) / 2 + 4
  return `M${a},${p} V${i} H${a} V${i}`
}
class Bt {
  constructor(t) {
    ;(this.parentViewApp = t), (this.pathStyle = rt), (this.duration = N), this.initPathGroup()
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
        .data(this.pathList, (r) => r.target.id + '_' + r.source.id)),
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
    return Ft(t, e)
  }
  elbow(t) {
    const { baseCardSize: e, direction: r, getPathScheme: a } = this.parentViewApp.kdChartApp
    return a && typeof a == 'function'
      ? a({
          path: t,
          baseCardSize: e,
          direction: r,
        })
      : U(t, e)
  }
  endElbow(t, e = 1) {
    return Ot(t, e)
  }
}
class Ut {
  // -----------------svg dom------------------
  constructor(
    t,
    {
      cardModelMap: e,
      menuModels: r,
      hoverMenuModels: a,
      textTipsFlag: i,
      iconConfig: p,
      svgBackGround: h,
    }
  ) {
    ;(this.kdChartApp = t),
      (this.cardModelMap = e),
      (this.menuModels = r),
      (this.hoverMenuModels = a),
      (this.textTipsFlag = i || !0),
      (this.iconConfig = p),
      (this.svgBackGround = h ?? et.background),
      this.initStatus(),
      this.paintSvgWrapper(),
      this.loadSvg()
  }
  // 重绘的时候,会变动的数据
  initStatus() {
    ;(this.relativeMaxLoc = {
      x: -1 / 0,
      y: -1 / 0,
    }),
      (this.svgSize = {
        w: 0,
        h: 0,
        rx: 0,
        ry: 0,
      }),
      (this.svgSizeChange = !0),
      (this.currMoveDistance = {
        rx: 0,
        ry: 0,
      })
  }
  paintSvgWrapper() {
    this.kdChartApp.chartWrapper
      .querySelectorAll('.svg_wrapper')
      .forEach((t) => this.kdChartApp.chartWrapper.removeChild(t)),
      (this.svgWrapper = Ct(this.kdChartApp.chartWrapperSize)),
      this.kdChartApp.chartWrapper.appendChild(this.svgWrapper.node())
  }
  loadSvg() {
    this.svgWrapper.html(null), this.svgWrapper.append(() => this.createSvg())
  }
  createSvg() {
    return (
      (this.svg = yt(this.svgBackGround)),
      this.bindEvent2svg(),
      (this.rootGroup = this.svg.append('g')),
      this.initPaintChart(),
      this.paintTipsGroup(),
      this.svg.node()
    )
  }
  // 计算画布大小，计算画布坐标原点
  brforePaintChart() {
    this.computedMixLoc(),
      this.svgSizeChange && (this.setSvgParams(), this.initRootGroupLoc(), this.moveRootGroup())
  }
  initPaintChart() {
    this.brforePaintChart(),
      (this.chartPathApp = new Bt(this)),
      this.chartPathApp.initPaint(this.kdChartApp.chartDataApp.chartData, !0),
      (this.chartCardApp = new Ht(this)),
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
        break
    }
  }
  bindEvent2svg() {
    this.svg
      .call(
        u
          .zoom()
          .on('start', (t) => {
            this.svgClient = {
              x: t.sourceEvent.clientX,
              y: t.sourceEvent.clientY,
            }
          })
          .on('zoom', (t) => {
            this.svgZoomHandle(t)
          })
          .on('end', (t) => {
            ;(t.sourceEvent.deltaY || 0) != 0 &&
              ((this.currMoveDistance = {
                rx: 0,
                ry: 0,
              }),
              this.chartCardApp.paintCard())
          })
          .filter((t) => S(t, ['op-icon']))
      )
      .on('click.zoom', (t) => {
        this.svgClickHadnle(t)
      })
  }
  svgZoomHandle({ sourceEvent: { type: t = '', deltaY: e = 0, clientX: r = 0, clientY: a = 0 } }) {
    var n
    let i, p, h
    switch (t) {
      case 'wheel':
        ;(i = E(((n = this.rootGroupLoc) == null ? void 0 : n.k) ?? 1, e)),
          this.operatorRootGroup({ k: i })
        break
      case 'mousemove':
        ;(p = (r - this.svgClient.x) / window.devicePixelRatio),
          (h = (a - this.svgClient.y) / window.devicePixelRatio),
          this.operatorRootGroup({ rx: p, ry: h }),
          (this.currMoveDistance.rx += p),
          (this.currMoveDistance.ry += h),
          (this.svgClient = {
            x: r,
            y: a,
          })
        break
    }
  }
  svgClickHadnle({ target: { nodeName: t } }) {
    t === 'svg' &&
      (this.chartCardApp.clearSelectCard(),
      this.kdChartApp.emit('clickSVG', { itChart: this.kdChartApp }))
  }
  paintTipsGroup() {
    this.cardShowTips = new _t(this)
  }
  //控制缩放
  scaleRootGroup(t = !0) {
    var r
    const e = E(((r = this.rootGroupLoc) == null ? void 0 : r.k) ?? 1, !t)
    this.operatorRootGroup({ k: e })
  }
  operatorRootGroup(
    { rx: t = 0, ry: e = 0, k: r = this.rootGroupLoc.k } = {
      rx: 0,
      ry: 0,
      k: this.rootGroupLoc.k,
    }
  ) {
    this.moveRootGroup({ rx: t, ry: e, k: r }),
      this.kdChartApp.preViewApp &&
        this.kdChartApp.preViewApp.resetGroupLoc({ rx: t, ry: e, k: r }),
      (Math.abs(this.currMoveDistance.rx) >= y - this.kdChartApp.baseCardSize.w ||
        Math.abs(this.currMoveDistance.ry) >= y - this.kdChartApp.baseCardSize.h) &&
        ((this.currMoveDistance = {
          rx: 0,
          ry: 0,
        }),
        this.chartCardApp.paintCard())
  }
  // 左右方向，调整图的位置
  moveSvgByDir() {
    const t = {
      rx: 0,
      ry: -this.kdChartApp.chartDataApp.chartData.y + this.kdChartApp.chartWrapperSize.h / 2,
      k: 1,
    }
    this.moveRootGroup(t),
      this.kdChartApp.preViewApp && this.kdChartApp.preViewApp.resetGroupLoc(t),
      this.chartCardApp.paintCard()
  }
  // 计算svgSize,判断svgSize变化
  // 计算最大,最小值
  computedMixLoc() {
    ;(this.maxLoc = {
      x: -1 / 0,
      y: -1 / 0,
    }),
      (this.minLoc = {
        x: 1 / 0,
        y: 1 / 0,
      }),
      this.kdChartApp.chartDataApp.chartData.getNodes().forEach(({ x: r, y: a }) => {
        ;(this.minLoc.x = Math.min(r, this.minLoc.x)),
          (this.minLoc.y = Math.min(a, this.minLoc.y)),
          (this.maxLoc.x = Math.max(r, this.maxLoc.x)),
          (this.maxLoc.y = Math.max(a, this.maxLoc.y))
      }),
      (this.relativeMaxLoc.x = Math.max(this.maxLoc.x, Math.abs(this.minLoc.x))),
      (this.relativeMaxLoc.y = Math.max(this.maxLoc.y, Math.abs(this.minLoc.y)))
    const t = Math.max(
        this.relativeMaxLoc.x * 2 + this.kdChartApp.baseCardSize.w * 2,
        this.kdChartApp.chartWrapperSize.w
      ),
      e = Math.max(
        this.relativeMaxLoc.y + this.kdChartApp.baseCardSize.h * 2,
        this.kdChartApp.chartWrapperSize.h
      )
    ;(this.svgSizeChange = t !== this.svgSize.w),
      (this.svgSize = {
        w: t,
        h: e,
        rx: (this.kdChartApp.chartWrapperSize.w - t) / 2,
        //偏离后，居中
        ry: 0,
      })
  }
  resetSvgSize() {
    this.svgSize.rx = (this.kdChartApp.chartWrapperSize.w - this.svgSize.w) / 2
  }
  moveRootGroup(
    { rx: t = 0, ry: e = 0, k: r = this.rootGroupLoc.k } = {
      rx: 0,
      ry: 0,
      k: this.rootGroupLoc.k,
    }
  ) {
    ;(this.rootGroupLoc.x += t),
      (this.rootGroupLoc.y += e),
      (this.rootGroupLoc.k = r),
      this.rootGroup.attr(
        'transform',
        `translate(${this.rootGroupLoc.x},${this.rootGroupLoc.y}) scale(${this.rootGroupLoc.k})`
      )
  }
  // 初始化rootGroupLoc
  initRootGroupLoc(t = this.kdChartApp.chartDataApp.chartData) {
    var h
    let e = { rx: 0, ry: 0 }
    this.rootGroupLoc &&
      this.intialGroupLoc &&
      (e = {
        rx: this.rootGroupLoc.x - this.intialGroupLoc.x,
        ry: this.rootGroupLoc.y - this.intialGroupLoc.y,
      })
    const { rx: r = 0, ry: a = 0 } = e,
      { w: i = 0 } = this.svgSize,
      p = ((h = this.rootGroupLoc) == null ? void 0 : h.k) ?? 1
    switch (this.kdChartApp.direction) {
      case x.bottom:
        ;(this.rootGroupLoc = {
          x: i / 2 - t.x + r,
          y: a,
          k: p,
        }),
          (this.intialGroupLoc = {
            x: i / 2 - t.x,
            y: 0,
            k: p,
          })
        break
      case x.right:
        ;(this.rootGroupLoc = {
          x: i / 2 + r,
          y: a,
          k: p,
        }),
          (this.intialGroupLoc = {
            x: i / 2,
            y: 0,
            k: p,
          })
        break
      case x.top:
        ;(this.rootGroupLoc = {
          x: i / 2 - t.x + r,
          y: a,
          k: p,
        }),
          (this.intialGroupLoc = {
            x: i / 2 - t.x,
            y: 0,
            k: p,
          })
        break
      case x.left:
        ;(this.rootGroupLoc = {
          x: i / 2 + r,
          y: a,
          k: p,
        }),
          (this.intialGroupLoc = {
            x: i / 2,
            y: 0,
            k: p,
          })
        break
    }
  }
  setSvgParams() {
    const { w: t, h: e, rx: r, ry: a } = this.svgSize
    this.svg
      .style('width', t + 'px')
      .style('height', e + 'px')
      .style('transform', `translate(${r}px,${a}px)`)
  }
  isInPaintView(t) {
    if (!t) return !1
    const { w: e = 0 } = this.kdChartApp.chartWrapperSize,
      r = {
        x: this.svgSize.w / 2,
        y: 0,
      }
    let a = !0
    const i = -e * 0.5 - y,
      p = e * 0.5 + y,
      h = -e * 0 - y,
      n = e * 1 + y,
      { k: o = 1 } = this.rootGroupLoc,
      d = t.x * o + (this.rootGroupLoc.x - r.x),
      c = t.y * o + this.rootGroupLoc.y - r.y
    return (a = d > i && d < p && c > h && c < n), a
  }
}
class Yt {
  constructor(t, e) {
    ;(this.kdChartApp = t),
      (this.previewSvgSize = e.previewSvgSize ?? Q),
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
      (this.slideGroupLoc = {
        x: this.previewSvgSize.w / 2,
        y: 0,
        k: 1,
      }),
      (this.slideRectLoc = {
        x: -this.slideRectSize.w / 2,
        y: 0,
      })
  }
  initDom() {
    this.kdChartApp.chartWrapper
      .querySelectorAll('.preview_wrapper')
      .forEach((t) => this.kdChartApp.chartWrapper.removeChild(t)),
      (this.previewWrapper = u
        .create('div')
        .attr('class', 'preview_wrapper')
        .style('width', `${this.previewSvgSize.w}px`)
        .style('height', `${this.previewSvgSize.h}px`)
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
      (this.svg = u
        .create('svg')
        .style('width', `${this.previewSvgSize.w}px`)
        .style('height', `${this.previewSvgSize.h}px`)
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
    const t = this.linkGroup.selectAll('path').data(this.links, (r) => r.target.id),
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
      .attr('d', (r) => this.elbow(r, this.previewScale)),
      t.exit().transition().duration(0).remove().attr('stroke-opacity', 0.1)
  }
  paintCard(t) {
    const e = this.kdChartApp.baseCardSize
    this.nodes = this.kdChartApp.chartDataApp.chartData.getNodes().reverse()
    const r = this.nodeGroup.selectAll('g').data(this.nodes, (i) => i.id),
      a = r
        .enter()
        .append('g')
        .attr('transform', C(t, e, this.previewScale))
    ;(this.nodeUpdate = r.merge(a)),
      this.nodeUpdate
        .transition()
        .duration(0)
        .attr('transform', (i) => C(i, e, this.previewScale))
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
      r
        .exit()
        .transition()
        .duration(0)
        .remove()
        .attr('transform', C(t, e, this.previewScale))
        .attr('stroke-opacity', 0)
        .attr('fill-opacity', 0)
  }
  paintInfo() {
    this.nodeUpdate.nodes().map((t) => {
      const e = t.__data__
      let r
      this.preViewCardModelMap[e.cardModel].map((a) => {
        switch (a.tag) {
          case 'text':
            ;([r] = F(a, e, this.previewScale)), r && t.appendChild(r.node())
            break
          case 'rect':
            ;(r = B(a, e, this.previewScale)), r && t.appendChild(r.node())
            break
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
        u.drag().on('drag', (t) => {
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
  setSlideLoc(t) {
    const e = t.layerX - this.previewSvgSize.w / 2 - this.slideRectSize.w / 2,
      r = t.layerY - this.slideRectSize.h / 2,
      a = e - this.slideRectLoc.x,
      i = r - this.slideRectLoc.y
    this.dragSlide(a, i)
  }
  // 滑动框重置为初始位置
  resetSlideLoc() {
    this.dragSlide(-this.slideRectSize.w / 2 - this.slideRectLoc.x, -this.slideRectLoc.y)
  }
  dragSlide(t, e) {
    this.moveSlideGroup({
      rx: t,
      ry: e,
    }),
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
  resetGroupLoc({ rx: t = 0, ry: e = 0, k: r = 1 }) {
    this.moveSlideGroup({
      rx: -t * this.previewScale,
      ry: -e * this.previewScale,
    }),
      this.scaleSlideGroup(r)
  }
  elbow(t, e) {
    if (!this.kdChartApp.preViewPathFilt(t)) return ''
    const { baseCardSize: r, direction: a, getPathScheme: i } = this.kdChartApp
    return i && typeof i == 'function'
      ? i({
          path: t,
          baseCardSize: r,
          direction: a,
          scale: e,
        })
      : U(t, r)
  }
}
class Xt {
  constructor(t, e) {
    ;(this.kdChartApp = t),
      (this.treeData = e),
      (this.treeDataMap = {}),
      (this.nextUpdateNode = []),
      this.computedTreeHeight(),
      this.initFormData(this.treeData)
  }
  // 预处理数据
  initFormData(t, e) {
    const r = (a, i) => {
      ;(a.hasParent = !!i),
        (a.parent = i),
        (a.hasChild = (a.children ?? []).length > 0),
        (a._children = a.children),
        (this.treeDataMap[a.id] = a),
        a.hasChild &&
          (a.children ?? []).map((p) => {
            r(p, a)
          })
    }
    r(t, e)
  }
  computedTreeHeight() {
    const t = (e, r = 0) => {
      if (((e.level = r++), e.children && e.children.length > 0)) {
        let a = 0
        e.children.map((i) => {
          a = Math.max(a, t(i, r))
        }),
          (e.height = a + 1)
      } else e.height = 0
      return e.height
    }
    t(this.treeData, 0)
  }
  exchangeNode2TreeItem(t, e, r, a) {
    D(this.treeData, t, (i) => {
      I(i.children, e, r, a)
    })
  }
  changeParent(t, e) {
    var p, h, n
    let r, a
    const i = (o) => {
      for (let d = 0; d < o.length; d++)
        o[d].id === t && (a = o[d]),
          o[d].id === e && (r = o[d]),
          (!r || !a) && (o[d].children ?? []).length > 0 && i(o[d].children)
    }
    if ((i([this.treeData]), a && r)) {
      this.nextUpdateNode.push(r.id ?? ''),
        this.nextUpdateNode.push(((p = a.parent) == null ? void 0 : p.id) ?? '')
      const o = (((h = a == null ? void 0 : a.parent) == null ? void 0 : h.children) ?? []).indexOf(
        a
      )
      a.parent.children.splice(o, 1),
        a.parent.children.length === 0 && ((a.parent.children = void 0), (a.parent.hasChild = !1)),
        (a.parent.hasChildren = (
          ((n = a == null ? void 0 : a.parent) == null ? void 0 : n.children) ?? []
        ).length),
        (a.parent._children = a.parent.children),
        (a.parent = r),
        (r.children = (r.children || r._children) ?? []),
        r.children.push(a),
        (r._children = r.children),
        (r.hasChild = !0),
        (r.hasChildren = ((r == null ? void 0 : r.children) ?? []).length),
        this.computedTreeHeight()
    }
  }
  foldData(t) {
    D(this.treeData, t.id, (e) => {
      ;(e._children = e.children), (e.children = [])
    })
  }
  openData(t) {
    const [e, r] = this.kdChartApp.breforeOpenData(this.treeData, t)
    e &&
      ((this.treeData = e),
      this.computedTreeHeight(),
      typeof r == 'function' && m(this.treeData, r)),
      D(this.treeData, t.id, (a) => {
        this.kdChartApp.expandRuler(a) || (a.children = a._children)
      })
  }
  custUpdateMateData(t) {
    const [e, r] = this.kdChartApp.updateMateData(this.treeData, t)
    e &&
      ((this.treeData = e),
      this.computedTreeHeight(),
      typeof r == 'function' && m(this.treeData, r))
  }
  setNewMateData(t) {
    const [e, r] = t(this.treeData)
    e &&
      ((this.treeData = e),
      this.computedTreeHeight(),
      typeof r == 'function' && m(this.treeData, r))
  }
  // 新增卡片
  cardMenuAdd(t, e) {
    var r, a
    ;(this.treeDataMap[e].children = this.treeDataMap[e].children ?? []),
      (a = (r = this.treeDataMap[e]) == null ? void 0 : r.children) == null || a.push(t),
      this.computedTreeHeight(),
      this.initFormData(this.treeDataMap[e], this.treeDataMap[e].parent)
  }
  cardMenuEdit(t, e) {
    Object.keys(e).map((r) => {
      this.treeDataMap[t.id][r] = e[r]
    })
  }
  cardMenuDel(t) {
    t.parent && $(this.treeDataMap[t.parent.id].children, t)
  }
  setItemsAttr(t, e, r) {
    t.map((a) => {
      e && (this.treeDataMap[a][e] = r)
    })
  }
}
class jt {
  constructor() {
    this.eventMaps = {}
  }
  /**
   * 监听事件
   */
  on(t, e) {
    this.eventMaps[t] = e
  }
  /**
   * 触发事件
   */
  emit(t, e) {
    const r = this.eventMaps[t]
    r && r(e)
  }
}
class Zt {
  constructor(t) {
    t.chartWrapper
      ? ((this.direction = t.direction ?? x.bottom),
        (this.baseCardSize = t.baseCardSize ?? R),
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
        (this.listenEvent = new jt()))
      : console.error('容器不可缺少')
  }
  initData(t) {
    if (!t) console.error('缺少树图数据')
    else {
      const e = JSON.parse(JSON.stringify(t))
      ;(this.treeDataApp = new Xt(this, e)), (this.chartDataApp = new Wt(this))
    }
  }
  initMainView(t) {
    var e
    t.treeData && this.initData(t.treeData),
      t.cardModelMap || console.error('缺少卡片模板数据'),
      ((e = this.chartDataApp) == null ? void 0 : e.chartData) ?? null
        ? ((this.mainViewApp = new Ut(this, t)),
          this.on('scaleChart', (r = !0) => {
            this.mainViewApp.scaleRootGroup(r)
          }),
          this.on('setChartScale', (r = 1) => {
            this.mainViewApp.operatorRootGroup({ k: r })
          }))
        : (console.error('缺少卡片树图数据'), (this.chartWrapper.innerHTML = ''))
  }
  initPreView(t) {
    this.mainViewApp
      ? ((this.preViewApp = new Yt(this, t)),
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
  // ========================卡片新增==============================
  // 新增卡片，用户钩子
  cardMenuAddCustom(t) {
    this.cardMenuAdd(
      {
        id: (t.id + '').substring(0, 16) + '_' + /* @__PURE__ */ new Date().getTime(),
      },
      t.id
    )
  }
  // 新增卡片
  cardMenuAdd(t, e) {
    this.treeDataApp.cardMenuAdd(t, e),
      this.chartDataApp.initChartData(),
      this.mainViewApp.updatePaintChart(this.chartDataApp.chartDataMap[e], !0),
      this.mainViewApp.chartCardApp.cardMenuApp.hiddenMenu()
  }
  // ========================卡片删除==============================
  // 删除卡片，用户钩子
  cardMenuDelCustom(t) {
    this.cardMenuDel(t)
  }
  // 删除卡片（动画待优化）
  cardMenuDel(t) {
    var r
    const e = {
      ...this.chartDataApp.chartDataMap[t.id],
    }
    this.treeDataApp.cardMenuDel(t),
      this.chartDataApp.initChartData(),
      this.treeDataApp.treeData
        ? (this.mainViewApp.updatePaintChart(e),
          this.mainViewApp.chartCardApp.updateCardById([
            ((r = t == null ? void 0 : t.parent) == null ? void 0 : r.id) ?? '',
          ]))
        : (this.mainViewApp.chartCardApp.delCardGroup(),
          this.mainViewApp.chartPathApp.delPathGroup()),
      this.mainViewApp.chartCardApp.cardMenuApp.hiddenMenu()
  }
  // ========================卡片编辑==============================
  // 编辑卡片，用户钩子
  cardMenuEditCustom(t) {
    console.warn('请调用cardMenuEdit方法，传入新的属性', t)
  }
  // 编辑卡片
  cardMenuEdit(t, e) {
    this.treeDataApp.cardMenuEdit(t, e),
      this.chartDataApp.cardMenuEdit(t, e),
      this.mainViewApp.chartCardApp.updateCardById([t.id])
    const { cardMenuApp: r } = this.mainViewApp.chartCardApp
    r && r.hiddenMenu()
  }
  // =======================给treedata添加属性======================
  setTreeDataAttr(t, e, r) {
    this.treeDataApp.setItemsAttr(t, e, r)
  }
  eachTreeData(t) {
    m(this.treeDataApp.treeData, t)
  }
  // =======================获取一些数据============================
  getSelectCard() {
    var t, e
    return (
      ((e = (t = this.mainViewApp) == null ? void 0 : t.chartCardApp) == null
        ? void 0
        : e.selectedCards) ?? []
    )
  }
  // 缩略图连线过滤规则（优化性能）
  preViewPathFilt(t) {
    return !0
  }
  // 用户自定义连线
  getPathScheme({ path: t, baseCardSize: e, direction: r, scale: a = 1 }) {
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
  // 展开下级规则
  expandRuler(t) {
    return !1
  }
  /**
   * 下钻前
   * @param rootNode
   * @param node
   * @returns
   */
  breforeOpenData(t, e) {
    return []
  }
  /**
   * 更新元数据
   * @param treeData
   * @param currNode
   * @returns
   */
  updateMateData(t, e) {
    return [null, null]
  }
  setNewMateData(t) {
    this.treeDataApp.setNewMateData(t)
  }
  /**
   * 重绘更新的元数据
   * @param node
   */
  rePaintUpdateMateData(t) {
    this.chartDataApp.initChartData()
    const e = this.chartDataApp.chartDataMap[t ?? this.chartDataApp.chartData.id]
    this.mainViewApp.updatePaintChart(e, !0), this.preViewApp && this.preViewApp.paintPreView()
  }
  /**
   * 监听事件
   */
  on(t, e) {
    this.listenEvent.on(t, e)
  }
  /**
   * 触发事件
   */
  emit(t, e) {
    this.listenEvent.emit(t, e)
  }
  /**
   * 获取一些数据
   */
  getData(t = '') {
    var e
    if (((e = this.chartDataApp) == null ? void 0 : e.chartData) ?? null) {
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
  /**
   * 设置一些属性
   */
  setData(t = '', e) {
    var r
    if (((r = this.chartDataApp) == null ? void 0 : r.chartData) ?? null) {
      if (t === '') return ''
      switch (t) {
        case 'preViewPostion':
          const { top: a, right: i, bottom: p, left: h } = e
          a && this.preViewApp.previewWrapper.style('top', a),
            i && this.preViewApp.previewWrapper.style('right', i),
            p && this.preViewApp.previewWrapper.style('bottom', p),
            h && this.preViewApp.previewWrapper.style('top', h)
          break
        case 'editStatus':
          this.editStatus = e
          break
        case 'direction':
          this.direction = e ?? x.bottom
          break
      }
    }
  }
}
export { Zt as default }
