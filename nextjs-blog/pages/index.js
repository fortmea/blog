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
        <link rel="manifest" href="manifest.json" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Blog jão" />
        <meta name="apple-mobile-web-app-title" content="Blog jão" />
        <meta name="theme-color" content="#1a1919" />
        <meta name="msapplication-navbutton-color" content="#1a1919" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta property="og:determiner" content="O" />
        <meta property="og:site_name" content="Blog do jão" />
        <meta property="og:title" content="Blog Jão" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:description"
          content="Um lugar para descrever minhas pesquisas, e desenvolvimentos profissionais e pessoais." />
        <link rel="icon" sizes="256x256" href="favicon.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="favicon.png"></link>
        <script src="https://kit.fontawesome.com/c1ff9f4537.js" crossorigin="anonymous"></script>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Analista de sistemas na FAUS cursos online.</p>
        <p>
          Visite meu{' '}
          <a href="https://github.com/fortmea"><i className="fa fa-github" aria-hidden="true"></i> Github</a> ou meu <a href="https://www.linkedin.com/in/jo%C3%A3o-walter-amadeu-2773b51b9/"><i className="fa fa-linkedin" aria-hidden="true"></i> LinkedIn</a>.
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
      
    }
  }
}
