import * as react_jsx_runtime from 'react/jsx-runtime'

type TocItem = {
  value: string
  url: string
  depth: number
}
type Toc = TocItem[]

interface TOCInlineProps {
  toc: Toc
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
  collapse?: boolean
  ulClassName?: string
}
interface NestedTocItem extends TocItem {
  children?: NestedTocItem[]
}
/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * `asDisclosure` will wrap the TOC in a `details` element with a `summary` element.
 * `collapse` will collapse the TOC when `AsDisclosure` is true.
 *
 * If you are using tailwind css and want to revert to the default HTML list style, set `ulClassName="[&_ul]:list-[revert]"`
 * @param {TOCInlineProps} {
 *   toc,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 *   collapse = false,
 *   ulClassName = '',
 * }
 *
 */
declare const TOCInline: ({
  toc,
  fromHeading,
  toHeading,
  asDisclosure,
  exclude,
  collapse,
  ulClassName,
}: TOCInlineProps) => react_jsx_runtime.JSX.Element

export { NestedTocItem, TOCInlineProps, TOCInline as default }
