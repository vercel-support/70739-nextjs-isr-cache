import Head from 'next/head'
import styles from '../styles/Home.module.css'
import moment from 'moment'
import { useRouter } from 'next/router'

function Home({now, nowCached}) {
  
  const router = useRouter()
  const { slug } = router.query
  console.log({router})
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Timestamp from /api/time generated <code className={styles.code}>{router.asPath}</code> at {' '}
          <code className={styles.code}>{moment(now).format()} <span style={{fontSize: 'xx-small'}}>({moment(now).fromNow()} [{(Date.now() - now) / 1000} seconds])</span></code>.
        </p>
        {/* <p className={styles.description}>
          Timestamp from /api/time-with-cache generated <code className={styles.code}>{router.asPath}</code> at {' '}
          <code className={styles.code}>{moment(nowCached).format()} <span style={{fontSize: 'xx-small'}}>({moment(nowCached).fromNow()} [{(Date.now() - nowCached) / 1000} seconds])</span></code>.
        </p> */}


        <div style={{textAlign: 'left', width: '100%'}}>
        router.isFallback:
          <pre>
            {
              router.isFallback ? `true` : `false`
            }
          </pre>
        </div>

        <div style={{textAlign: 'left', width: '100%'}}>
          router.query:
          <pre>
            {
              router ? JSON.stringify(router.query) : ''
            }
          </pre>
        </div>

        <div style={{textAlign: 'left', width: '100%'}}>
          router.asPath:
          <pre>
            {
              router ? router.asPath : ''
            }
          </pre>
        </div>

      </main>

    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://nextjs-time-api.vercel-support.app/api/time')
  const {now} = await res.json()
  // const resCached = await fetch('https://nextjs-time-api.vercel-support.app/api/time-with-cache')
  // const {now: nowCached} = await resCached.json()

  return {
    props: {
      now,
      nowCached
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 3600 seconds
    revalidate: 3600, // In seconds
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    fallback: true,
    paths: []
  }
}

export default Home