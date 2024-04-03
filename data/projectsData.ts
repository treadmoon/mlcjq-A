interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '组织结构图插件示例',
    description: ``,
    imgSrc: '/static/images/blog/pre1.png',
    href: '/projects/orgchart',
  },
  {
    title: 'canvas版结构图插件示例',
    description: ``,
    imgSrc: '/static/images/blog/color-floor.png',
    href: '/projects/orgchart',
  },
]

export default projectsData
