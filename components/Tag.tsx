import Link from 'next/link'
import { slug } from 'github-slugger'

import styles from './styles.module.css'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={`${styles['iTag']} mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400`}
    >
      <span className={styles['icon']}>#</span>
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
