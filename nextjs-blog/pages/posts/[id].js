import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import React, { useCallback, useRef } from 'react';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Comentarios from '../../components/comments'
export default function Post({ postData, params }) {
  const refer = useRef(null);

  /* const onButtonClick = useCallback(() => {
     console.log("Rodou")
     if (refer.current === null) {
       return
     }
 
     htmlToImage.toPng(refer.current, { cacheBust: true, })
       .then((dataUrl) => {
         const link = document.createElement('meta')
         link.setAttribute('property', 'og:image')
         link.content = dataUrl;
         var head = document.getElementsByTagName("head")[0]
         head.appendChild(link)
       })
       .catch((err) => {
         console.log(err)
       })
   }, [refer])*/
  return (
    <Layout>
      <Head>
        <meta property="og:title" content={postData.title} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="article" />
        <meta property='article:published_time' content={postData.date} />
        <meta property='og:image' content={`https://og.fortmea.tech/${postData.title}.png?theme=light&md=1&fontSize=100px&images=https://fortmea.tech/favicon.svg&images=${postData.catimage}`} />
        <meta property='article:author ' content='https://fortmea.tech/' />

        <title>{postData.title}</title>
      </Head>
      <article ref={refer} >
        <h3 className={utilStyles.headingXl} style={{ textAlign: 'center' }}>{postData.title}</h3>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Comentarios identi={params.id}></Comentarios>
      <div style={{ paddingTop: "2em" }}>
        <div style={{ float: 'left' }}>
          {postData.anterior != "" ? <a href={`/posts/${postData.anterior}`}>{`<- Anterior`}</a> : ""}
        </div>
        <div style={{ float: 'right' }}>
          {postData.proximo != "" ? <a href={`/posts/${postData.proximo}`}>{`Próximo ->`}</a> : ""}
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