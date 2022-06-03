import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData, comments }) {
  console.log(comments)
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <hr></hr>
      <br></br>
      <h5>Comentários:</h5>
      <ul className={utilStyles.list}>
        {comments.map(({ nome, conteudo, id }) => (
          <div className='card'>
            <div className='container'>
              <li className={utilStyles.listItem} key={id}>
                <h5>{nome}</h5>
                <li>
                  <h4>{conteudo}</h4>
                </li>
                <hr></hr>
              </li></div>
          </div>
        ))}
      </ul>

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
  const res = await (await fetch('https://apiblogjaozim.herokuapp.com/comments/list/?id=' + params.id)).json()
  const comments = Object.values(res);
  console.log(res)
  //console.log(postData)
  return {
    props: {
      postData,
      comments
    },
    revalidate: 1, 
  }
  
}
