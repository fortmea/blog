import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import React from 'react';
import DateParser from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Comentarios from '../../components/comments'
import Topics from '../../components/topics';
export default function Post({ postData, params, topicos }) {

  return (
    <Layout>
      <Head>
        <meta property="og:title" content={postData.title} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="article" />
        <meta property='article:published_time' content={postData.date} />
        <meta property='og:image' content={`https://og.fortmea.tech/${postData.title}.png?theme=light&md=1&fontSize=100px&images=https://fortmea.tech/favicon.svg&images=${postData.catimage}`} />
        <meta property='article:author ' content='https://fortmea.tech/' />
        <meta property="og:description"
          content={`Um artigo sobre ${postData.title}`} />
        <title>{postData.title}</title>
      </Head>
      <article>
        <h3 className={utilStyles.headingXl} style={{ textAlign: 'center' }}>{postData.title}</h3>
        
        <div className={utilStyles.lightText}>
          <div><DateParser dateString={postData.date} />{postData.upd != "" ? "; Atualizado ":""}{postData.upd != "" ? (<DateParser dateString={postData.upd}></DateParser>) : ""}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: topicos }} style={{fontSize:"0.8em", marginTop:"0.8em"}} />
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
  var topicos = Topics(postData.ids, postData.titulos)
  return {
    props: {
      postData,
      params,
      topicos
    }

  }

}