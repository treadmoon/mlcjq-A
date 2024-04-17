export function getTagMaps(allposts): Record<string, number> {
  const res = {}
  allposts.map((post) => {
    post.tags.map((tag) => {
      res[tag] = res[tag] ? res[tag] + 1 : 1
    })
  })

  return res
}
