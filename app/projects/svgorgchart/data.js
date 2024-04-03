let indexId = 0

function createdData(depth, leaflen) {
  let root = {
    name: 'root',
    id: indexId++,
  }

  function createChild(depth) {
    let len = parseInt(Math.random() * leaflen) + 1
    let mustId = parseInt(Math.random() * len)
    let child = null

    if (depth > 0) {
      child = []
      depth--
      for (let i = 0; i < len; i++) {
        let leaf = {
          name: depth + '' + i + indexId,
          id: indexId++,
        }
        if (i === mustId || parseInt(Math.random() * 10 + 1) % 5 == 0) {
          let leafchild = createChild(depth)
          if (leafchild) {
            leaf.children = leafchild
          }
        }

        child.push(leaf)
      }
    }
    return child
  }

  let child = createChild(depth)
  if (child) {
    root.children = child
  }
  return root
}

let rdata = createdData(8, 6)

export const realData = {
  name: '深圳环宇科技集团有限公司',
  id: 0,
  children: [
    {
      name: '深圳环宇科技（厦门）集团有限公司',
      id: 1,
      children: [
        {
          name: '行政中心',
          id: 4,
        },
        {
          name: '市场部门',
          id: 5,
          preChildren: true,
        },
        {
          name: '研发中心',
          id: 6,
          children: [
            {
              name: '项目开发组',
              id: 12,
              children: [
                {
                  name: '后端开发组',
                  id: 17,
                },
                {
                  name: '前端开发组',
                  id: 18,
                },
                {
                  name: '测试组',
                  id: 19,
                },
              ],
            },
            {
              name: '运维中心',
              id: 13,
              children: [
                {
                  name: '桌面运维',
                  id: 15,
                },
                {
                  name: '安全运维',
                  id: 16,
                },
              ],
            },
            {
              name: '服务与部署',
              id: 14,
            },
          ],
        },
      ],
    },
    {
      name: '深圳环宇科技（广州）集团有限公司',
      id: 2,
      children: [
        {
          name: '广州白云销售中心',
          id: 7,
          children: [
            {
              id: 27,
              name: '马智波',
              type: 'staff',
            },
            {
              id: 28,
              name: '李知更',
              type: 'staff',
            },
          ],
        },
        {
          id: 8,
          name: '张一桂',
          type: 'staff',
          children: [
            {
              id: 29,
              name: '雷行者',
              type: 'staff',
            },
            {
              id: 30,
              name: '东哥',
              type: 'staff',
            },
          ],
        },
      ],
    },
    {
      name: '深圳环宇科技（上海）集团有限公司',
      id: 3,
      children: [
        {
          name: '上海财务中心',
          id: 9,
        },
        {
          name: '上海招聘与薪酬中心',
          id: 10,
        },
        {
          name: '上海市场部门',
          id: 11,
          children: [
            {
              name: '外滩门店',
              id: 25,
            },
            {
              name: '明珠塔门店',
              id: 26,
            },
          ],
        },
      ],
    },
    {
      name: '深圳环宇科技（北京）集团有限公司',
      id: 21,
      children: [
        {
          name: '北京对外办事处',
          id: 22,
        },
        {
          name: '北京财务结算中心',
          id: 23,
        },
        {
          name: '北京行政中心',
          id: 24,
        },
      ],
    },
  ],
}

let ldata = {
  id: '1',
  name: 'Eve1',
  children: [
    {
      id: '2',
      name: 'Cain',
    },
    {
      id: '3',
      name: 'Caln',
      children: [
        {
          id: '18',
          name: 'N98i',
        },
        {
          id: '19',
          name: 'k30u',
          children: [
            {
              id: '13',
              name: 'Abel7',
              children: [
                {
                  id: '14',
                  name: 'Ens8',
                  children: [
                    {
                      id: '15',
                      name: 'nosv',
                    },
                  ],
                },
                {
                  id: '17',
                  name: 'Noi1',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Cani',
    },
    {
      id: '5',
      name: 'Seth',
      children: [
        {
          id: '6',
          name: 'Enso',
        },
        {
          id: '7',
          name: 'Novi',
        },
        {
          id: '9',
          name: 'Niam',
        },
        {
          id: '10',
          name: 'qlao',
          children: [
            {
              id: '11',
              name: 'Eno1',
            },
            {
              id: '8',
              name: 'Noa1',
            },
            {
              id: '12',
              name: 'No13',
            },
          ],
        },
      ],
    },
  ],
}

let sdata = {
  id: '1',
  name: '深圳国际什么软件有限公司',
  children: [
    {
      id: '2',
      name: '深圳国际什么软件有限公司罗湖办事处销售部东门老街营业厅',
      children: [
        {
          id: '6',
          name: '财务部门',
        },
        {
          id: '7',
          name: '后勤部门',
        },
        {
          id: '8',
          name: '行政部门',
        },
      ],
    },
    {
      id: '3',
      name: '广州办事处',
      children: [
        {
          id: '4',
          name: '市场部门',
        },
        {
          id: '5',
          name: '行政部门',
        },
      ],
    },
  ],
}

export const list = [
  {
    ppid: '',
    iid: '1',
    name: '金蝶中国',
  },
  {
    ppid: '1',
    iid: '2',
    name: '苍穹云',
  },
  {
    ppid: '1',
    iid: '3',
    name: '精斗云',
  },
  {
    ppid: '2',
    iid: '4',
    name: '组织发展',
  },
  {
    ppid: '2',
    iid: '5',
    name: '核心人力',
  },
]
