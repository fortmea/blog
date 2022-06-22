import Layout from '../components/layout'
import React from 'react';
import Head from 'next/head'
export default function e404() {
    return (
        <Layout>
            <Head>
                <script>
                        const queryString = window.location.search;
                        const urlParams = new URLSearchParams(queryString);
                        document.getElementById("pagina").innerHTML = "A página "+urlParams.get('caminho')+" não foi encontrada."
                </script>
                <meta property="og:title" content="Erro 404" />
                <meta property="og:locale" content="pt_BR" />
                <meta property='og:image' content="https://og.fortmea.tech/Erro 404 - Página não encontrada.png?theme=light&md=1&fontSize=100px&images=https://fortmea.tech/favicon.svg" />
                <meta property="og:description"
                    content={`Erro 404`} />
                <title>Erro 404 - Não Encontrado</title>
            </Head>
            <div className="card">
                <div className='container'><h3>Erro 404!</h3><p id="pagina"></p></div>
                </div>
            
        </Layout>
    )
}
