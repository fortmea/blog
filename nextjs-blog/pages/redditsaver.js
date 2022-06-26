import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import fileDownload from 'js-file-download'
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
export default function videosaver() {
    const [input, setInput] = useState('');
    const [downloadp, setDownloadp] = useState(0);
    const [downloading, setdownloading] = useState(false);
    const [audio, setaudio] = useState(false);
    const [error, seterror] = useState(false);
    useEffect(() => {
        document.querySelector("body").classList.add("redditsaver");
    });
    async function download() {
        setdownloading(true);
        let oadd;
        try {
            oadd = new URL(input);
        } catch (_) {
            setdownloading(false);
            seterror(true);
            return false;

        }

        if (audio) {
            const address = oadd.toString();
            const filedata = async (url) => {
                const response = await axios.get(("https://api.fortmea.tech/video?url=" + url), {
                    responseType: 'blob', onDownloadProgress: function (progressEvent) {
                        var prog = parseInt(progressEvent["loaded"]) / parseInt(progressEvent["total"])
                        setDownloadp(Math.ceil(prog * 100))
                    }
                });
                return response.data;
            }
            fileDownload(await filedata(address), "video.mp4")
        } else {
            const address = "https://www.reddit.com/" + oadd.pathname.substring(0, oadd.pathname.length - 1) + ".json";
            const fetcher = async (url) => {
                const response = await axios.get(url);
                return response.data;
            }
            var data = (await fetcher(address))
            var url = ""
            data = data[0]["data"]["children"][0]["data"]
            if (!data["media"]) {
                url = data["crosspost_parent_list"][0]["media"]["reddit_video"]["fallback_url"];
            } else {
                url = data["media"]["reddit_video"]["fallback_url"];
            }
            const filedata = async (url) => {
                const response = await axios.get(url, {
                    responseType: 'blob', onDownloadProgress: function (progressEvent) {
                        var prog = parseInt(progressEvent["loaded"]) / parseInt(progressEvent["total"])
                        setDownloadp(Math.ceil(prog * 100))
                    }
                });
                return response.data;
            }
            fileDownload(await filedata(url), "video.mp4")
        }
        setdownloading(false)
    }
    return (<>
        <Head>
            <meta property="og:title" content="Reddit saver" />
            <meta property="og:locale" content="pt_BR" />
            <meta property='og:image' content="https://og.fortmea.tech/Reddit saver - download videos from reddit, in their original quality.png?theme=light&md=1&fontSize=100px&images=https://fortmea.tech/favicon.svg" />
            <meta property="og:description"
                content={`A simple tool to download reddit videos.`} />

            <title>Reddit saver - download videos from Reddit</title>
        </Head>
        <Container>
            <Card style={{ width: '18rem', marginBottom: '2%' }}>
                <Card.Body>
                    <Card.Title>Download Reddit video</Card.Title>
                    <Form>
                        <fieldset>
                            <Form.Group className="mb-3">

                                <Form.Label htmlFor="inputurl">Link:</Form.Label>
                                <Collapse in={error}><div><Alert variant="danger" onClose={() => { seterror(false) }} dismissible>
                                    <Alert.Heading>Error!</Alert.Heading>
                                    <p>Invalid URL.</p>
                                </Alert></div></Collapse>

                                <Form.Control id="inputurl" value={input} onInput={(e) => { setInput(e.target.value); setdownloading(false); setDownloadp(0) }} placeholder="Insert video link here..." />
                                <Form.Group className="mb-3" controlId="Checkbox">
                                    <Form.Check type="checkbox" label="Audio? (usually takes longer, data processed server-side)" style={{ fontSize: '0.8rem', marginTop: '1em' }} defaultChecked={audio}
                                        onChange={() => setaudio(!audio)} />
                                </Form.Group>
                            </Form.Group>
                            <Button onClick={download} disabled={downloading}>Download {downloading ? <Spinner style={{ width: "1em", height: "1em" }} animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> : ""}</Button>
                        </fieldset>
                    </Form>
                    {downloading ? <div style={{ marginTop: '1em' }}><h5>Progress: </h5><ProgressBar now={downloadp} label={`${downloadp}%`} /></div> : ""}

                </Card.Body>
            </Card>
        </Container>
    </>
    )
}
