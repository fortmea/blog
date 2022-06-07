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
          <h2 className={utilStyles.headingXl} style={{textAlign:'center'}}>{postData.title}</h2>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      <Comentarios identi={params.id}></Comentarios>
      
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