import Head from "next/head";
import Layout from "../components/layout";
import { LightgalleryItem } from "react-lightgallery";
import { LightgalleryProvider } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";
import { getSortedImagesData } from "../lib/images";
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Gallery({ allImagesData }) {
    var count = 0;
    return <>

        <Head>
            <title>Galeria</title>

        </Head>
        <Layout>
            <h1>Galeria de imagens</h1>
            <LightgalleryProvider style={{ width: "100%" }}>
                <Container style={{ width: "100%" }}>
                    <Row xs={4}>
                        {allImagesData.map(({ id, date, img, prompt, nprompt, model, seed, title }) => (
                            <Col key={id}>
                                <LightgalleryItem src={"../sd/" + img} key={id} group="sd">
                                    <div style={{ backgroundImage: "url(../sd/" + img + ")", backgroundClip: "unset", backgroundSize: "contain", backgroundRepeat: "no-repeat", height: 0, paddingTop: "100%", paddingBottom: "20%" }}>{title}</div>
                                </LightgalleryItem>
                            </Col>
                        ))
                        }
                    </Row>
                </Container>
            </LightgalleryProvider>
        </Layout>
    </>
}

export async function getStaticProps() {
    const allImagesData = getSortedImagesData()
    //console.log(allImagesData)
    return {
        props: {
            allImagesData,
        }
    }
}