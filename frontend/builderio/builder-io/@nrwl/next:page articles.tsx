import styles from './next:page articles.module.css';

/* eslint-disable-next-line */
export interface NextPageArticlesProps {}

export function NextPageArticles(props: NextPageArticlesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NextPageArticles!</h1>
    </div>
  );
}

export default NextPageArticles;
