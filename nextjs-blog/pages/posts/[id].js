import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Comentarios from '../../components/comments'

export default function Post({ postData, params }) {

  return (
    <Layout>
      <Head>

        <title>{postData.title}</title>
      </Head>
      <article>
        <h3 className={utilStyles.headingXl} style={{ textAlign: 'center' }}>{postData.title}</h3>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Comentarios identi={params.id}></Comentarios>
      <div style={{paddingTop: "2em"}}>
        <div style={{ float: 'left'}}>
          {postData.anterior != "" ? <a href={`/posts/${postData.anterior}`} className="button eight">{`<- Anterior`}</a> : ""}
        </div>
        <div style={{ float: 'right' }}>
          {postData.proximo != "" ? <a href={`/posts/${postData.proximo}`} className="button eight">{`Próximo ->`}</a> : ""}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {

  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
      params,
    }

  }

}