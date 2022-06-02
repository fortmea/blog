import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <script src="https://kit.fontawesome.com/c1ff9f4537.js" crossorigin="anonymous"></script>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Analista de sistemas na FAUS cursos online.</p>
        <p>
          Visite meu <i className="fa fa-github" aria-hidden="true"></i>{' '}
          <a href="https://github.com/fortmea">Github</a> ou meu <i className="fa fa-linkedin" aria-hidden="true"></i> <a href="https://www.linkedin.com/in/jo%C3%A3o-walter-amadeu-2773b51b9/">linkedIn</a>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Publicações</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
      isDark: false
    }
  }
}
