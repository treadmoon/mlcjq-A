'use client'
import React, { useEffect, useRef } from 'react'
import { realData } from './data'
import { TreeChart } from './gang'

function Page() {
  const domRef = useRef(null)

  useEffect(() => {
    const kdChart = new TreeChart({
      data: realData, //realData
      htmlDom: domRef.current,
      selectCardInfo: (node) => (node.data['name'].indexOf('公司') >= 0 ? 'cai' : 'normal'),
      cardModel: {
        width: 120,
        height: 50,
        rx: 20,
        ry: 30,
      },
      cardInfo: {
        normal: [
          {
            tag: 'text',
            text: (node) => {
              return node.data.name
            },
            config: {
              x: 5,
              y: 15,
              fillStyle: (node) => {
                return node.data['name'].indexOf('公司') >= 0 ? '#67C23A' : '#409EFF'
              },
              fontSize: 12,
              linenum: 2,
            },
            on: 'click',
            bind: (node) => {
              // do sth
              console.log('name:', node.data.name)
            },
          },
          {
            tag: 'text',
            text: (node) => {
              return '哈哈哈哈哈哈洽哈哈哈'
            },
            config: {
              x: 5,
              y: 45,
              fillStyle: '#aaa',
              fontSize: 10,
              linenum: 1,
            },
          },
        ],
        cai: [
          {
            tag: 'text',
            text: (node) => {
              return node.data.name
            },
            config: {
              x: 5,
              y: 15,
              fillStyle: (node) => {
                return node.data['name'].indexOf('公司') >= 0 ? '#67C23A' : '#409EFF'
              },
              fontSize: 12,
              linenum: 2,
            },
            on: 'click',
            bind: (node) => {
              // do sth
              console.log('name:', node.data.name)
            },
          },
          {
            tag: 'text',
            text: (node) => {
              return '嘿嘿嘿嘿嘿嘿潶嘿嘿嘿'
            },
            config: {
              x: 5,
              y: 45,
              fillStyle: '#aaa',
              fontSize: 10,
              linenum: 1,
            },
          },
        ],
      },
    })

    kdChart.init()
  })

  return (
    <div
      ref={domRef}
      style={{ height: '400px', boxShadow: '0 0 1px 1px #aaa' }}
      className="chartWrapper"
      id="chartWrapper"
    ></div>
  )
}

export default Page
