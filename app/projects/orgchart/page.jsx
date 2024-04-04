'use client'
/* eslint-disable react/jsx-no-undef */
import { useLayoutEffect, useRef, useState } from 'react'

import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons'

import { Button, Dropdown, Select, Space, Switch, Tooltip } from 'antd'

import pbk from './img/pbk.png'

// 依赖d3js
import KdChart from '../../../plugin/kdChart'

import { createDataPro } from './utils/createData'

import { baseCardSize, customChartItemAttr } from './utils/config'

import { cardModelMap, preViewCardModelMap } from './utils/cardModel'

import { computedCoordinate } from './utils/computedCoordinate'
import { mygetPathScheme } from './utils/pathScheme'

import { childloadType, childloadType2, rotate90, setLeaf } from './utils/operate'

import CanvasChart from './download/canvasChart'
import { getDownConfig } from './download/config'
import SavePPT from './download/chart2ppt'

import './index.css'
import './style/iconcool.css'
import './style/index.css'

import appConfig from './utils/public'

const items = [
  {
    label: '导出PDF',
    key: '1',
  },
  {
    label: '导出PPT',
    key: '2',
  },
]

// 制造数据
const mateData = createDataPro(5, 3)

function Index() {
  // 绘图容器
  const chartWrapper = useRef(null)

  const itChart = useRef(null)

  const rotateLevel = useRef(-1)

  const [loc, setLoc] = useState({
    top: -1,
    left: -1,
  })

  const [isEdit, setEdit] = useState(false)

  const [cardTips, setCardTips] = useState({
    top: -1,
    left: -1,
    text: '',
  })

  const [dir, setDir] = useState('1')

  // 设置卡片属性
  const setTreeDataAttribute = (node) => customChartItemAttr(node, rotateLevel.current)

  //计算卡片坐标 rotateLevel
  const computedLocMap = (node) => computedCoordinate(node, rotateLevel.current)
  // 卡片连线规则
  const getPathScheme = (node) => mygetPathScheme(node, rotateLevel.current)

  useLayoutEffect(() => {
    // 初始化插件
    itChart.current = new KdChart({
      // 设置容器
      chartWrapper: chartWrapper.current,
      // 卡片基础尺寸
      baseCardSize,
      // 打开方向
      direction: 1,
      // 设置卡片属性
      setTreeDataAttribute,
      //计算卡片坐标
      computedLocMap,
      // 卡片连线规则
      getPathScheme,
      mateData,
    })

    // 绘制主图
    itChart.current.initMainView({
      // 绘图业务数据
      treeData: mateData,
      // 卡片模板
      cardModelMap,
    })

    // 绘制缩略图
    itChart.current.initPreView({
      // 缩略图尺寸
      previewSvgSize: {
        w: 180,
        h: 100,
      },
      // 缩略图的卡片模板，描述卡片如何绘制
      preViewCardModelMap,
    })

    // 移入卡片
    itChart.current.on('hoverCardIn', ({ domLoc, node }) => {
      if (node.data.level >= rotateLevel.current && rotateLevel.current > 0) {
        setLoc({
          left: domLoc.x + 1 - (baseCardSize.w - baseCardSize.h) / 2,
          top: domLoc.y - 1,
        })
      } else {
        setLoc({
          left: domLoc.x + 1,
          top: domLoc.y - 1,
        })
      }
    })

    // 移出卡片
    itChart.current.on('hoverCardOut', ({ event }) => {
      if ((event?.relatedTarget?.nodeName ?? '') === 'svg') {
        setLoc({
          left: -1,
        })
      }
    })

    // 移入卡片元素
    itChart.current.on('hoverCardElementIn', ({ domLoc, cardModel }) => {
      // console.log("", domLoc, cardModel.tips);
      setCardTips({
        left: domLoc.x + 16,
        top: domLoc.y + 16,
        text: cardModel.tips,
      })
    })

    // 移出卡片元素
    itChart.current.on('hoverCardElementOut', () => {
      setCardTips({
        left: -1,
      })
    })

    // 卡片操作
    itChart.current.on('operateCard', (params) => {
      console.log('操作卡片', params)
    })
  }, [])

  const downPPT = () => {
    const _kdchart = itChart.current
    const { cardModelMap } = _kdchart.mainViewApp
    const { baseCardSize, direction } = _kdchart

    const config = {
      nodes: _kdchart.chartDataApp.chartData.getNodes(),
      links: _kdchart.chartDataApp.chartData.getLinks(),
      rootNode: _kdchart.chartDataApp.chartData,
      baseCardSize,
      cardModel: cardModelMap,
      elbowRatio: 0.66,
      direction,
      borderColor: '#000000',
      fontColor: '#000000',
      backColor: '#ffffff',
      linkColor: '#777777',
      rate: 1,
      altImg: pbk,
    }

    const kdppt = new SavePPT(config)

    kdppt.down('组织架构图' + parseInt(Math.random() * 999)).then(() => {
      console.log('down load ppt success')
    })
  }

  return (
    <div className="container">
      <div className="tool-bar">
        {dir == '1' && (
          <div className="form">
            <span className="title">
              结构图布局
              <Tooltip
                placement="bottomLeft"
                title={
                  <span style={{ fontSize: 12, color: '#999' }}>
                    <p>1.直接点击按钮,改变全局布局</p>
                    <p>2.选中某张卡片,再点击按钮,改变局部布局</p>
                  </span>
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
              :
            </span>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  rotateLevel.current = -1
                  childloadType(itChart.current, 0)

                  appConfig.setConfig('平铺', (appConfig.getConfig('平铺') ?? 0) + 1)
                }}
              >
                平铺
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  rotateLevel.current = -1
                  childloadType(itChart.current, 1)
                }}
              >
                单列
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  rotateLevel.current = -1
                  childloadType2(itChart.current)
                }}
              >
                双列
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  rotateLevel.current = 1 //level-1
                  rotate90(itChart.current)
                  // itChart.current.resetCoordinate();
                }}
              >
                纵向
              </Button>
              {/* <Button
              type="primary"
              onClick={() => {
                itChart.current.emit("showPreView", false);
              }}
            >
              显隐缩略图
            </Button> */}
            </Space>
          </div>
        )}

        <div
          className="form"
          style={{
            display: isEdit ? '' : 'none',
          }}
        >
          <span className="title">卡片挂载：</span>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setLeaf(itChart.current, 0)
              }}
            >
              下
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setLeaf(itChart.current, 1)
              }}
            >
              左
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setLeaf(itChart.current, 2)
              }}
            >
              右
            </Button>
          </Space>
        </div>
        {/* <div className="form">
          <span className="title">缩放：</span>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                itChart.current.emit("scaleChart", true);
                // console.log(itChart.current.getData("scaleValue"));
                // itChart.current.emit("showPreView", true);
                // itChart.current.setData("preViewPostion", {
                //   top: "unset",
                //   bottom: "10px",
                // });
              }}
            >
              +
            </Button>
            <Button
              type="primary"
              onClick={() => {
                itChart.current.emit("scaleChart", false);
                // itChart.current.emit("showPreView", false);
              }}
            >
              -
            </Button>
            <Button
              type="primary"
              onClick={() => {
                itChart.current.emit("setChartScale", 1);
              }}
            >
              100%
            </Button>
          </Space>
        </div> */}
        <div className="form">
          <span className="title">结构图方向：</span>
          <Select
            defaultValue="1"
            style={{
              width: 80,
            }}
            onChange={(e) => {
              setDir(e)
              itChart.current.setData('direction', parseInt(e))
              // 如何重绘
              itChart.current.resizeChartWrapper()
            }}
            options={[
              {
                value: '1',
                label: '下',
              },
              {
                value: '2',
                label: '右',
              },

              {
                value: '3',
                label: '上',
              },
              {
                value: '4',
                label: '左',
              },
            ]}
          />
        </div>
        <Dropdown.Button
          style={{
            width: 150,
            marginLeft: 6,
          }}
          icon={<DownOutlined />}
          menu={{
            items,
            onClick: (e) => {
              switch (e.key) {
                case '1':
                  new CanvasChart(getDownConfig(itChart.current, rotateLevel.current, pbk)).then(
                    (res) => {
                      res.downPdf('组织架构图' + parseInt(Math.random() * 999))
                    }
                  )
                  break
                case '2':
                  downPPT()
                  break
              }
            },
          }}
          onClick={() => {
            new CanvasChart(getDownConfig(itChart.current, rotateLevel.current, pbk)).then(
              (res) => {
                res.downPng('组织架构图' + parseInt(Math.random() * 999))
              }
            )
          }}
        >
          导出PNG
        </Dropdown.Button>
        <Switch
          checkedChildren="编辑"
          unCheckedChildren="查看"
          defaultChecked={isEdit}
          onChange={(e) => {
            itChart.current.setData('editStatus', e)
            setEdit(e)
          }}
        />
        {isEdit && (
          <Tooltip
            placement="bottomLeft"
            style={{ marginLeft: 2 }}
            title={<span style={{ fontSize: 12, color: '#999' }}>拖动卡片进行排序,变更上下级</span>}
          >
            <QuestionCircleOutlined />
          </Tooltip>
        )}
      </div>
      <div ref={chartWrapper} className="chart-wrapper">
        <div
          className="card-menus"
          style={{
            ...loc,
            display: loc.left < 0 ? 'none' : '',
          }}
          onMouseLeave={() => {
            setLoc({
              left: -1,
            })
          }}
        >
          {!isEdit && (
            <ul>
              <li>详</li>
            </ul>
          )}
          {isEdit && (
            <ul>
              <li>删</li>
              <li>增</li>
            </ul>
          )}
        </div>
        <div
          className="card-tips"
          style={{
            left: cardTips.left,
            top: cardTips.top,
            display: cardTips.left < 0 ? 'none' : '',
          }}
          onMouseLeave={() => {
            setLoc({
              left: -1,
            })
          }}
        >
          {cardTips.text}
        </div>
      </div>
    </div>
  )
}

export default Index
