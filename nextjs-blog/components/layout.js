import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import DarkModeToggle from './selector'
const name = 'João Walter Amadeu'
export const siteTitle = 'Blog pessoal de João Walter Amadeu'

export default function Layout({ children, home }) {
  var data = new Date().toLocaleDateString(
    'pt-br',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  ); 
  return (
    <div className={styles.container} >
      <Head>
        <script src="https://kit.fontawesome.com/c1ff9f4537.js" crossorigin="anonymous"></script>
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="description"
          content="Blog pessoal de João Walter Amadeu."
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>

        {home ? (
          <>
            <Image
              priority
              src="//images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl} style={{ textAlign: 'center' }}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="//images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit} style={{ textAlign: 'center' }}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main><br></br>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a><i className="fa fa-home" style={{ color: "#999" }} aria-hidden="true"></i> De volta ao início</a>
          </Link>
        </div>
      )}
      <br />
      <DarkModeToggle></DarkModeToggle>
      <h6>Data de build: {data}</h6>
    </div>

  )
}
