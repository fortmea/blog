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
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useRouter } from "next/router";

const ffmpeg = createFFmpeg({
    corePath: "/ffmpeg/ffmpeg-core.js",
    // Use public address
    log: true,
});
export default function videosaver() {
    const [input, setInput] = useState('');
    const [downloadp, setDownloadp] = useState(0);
    const [downloading, setdownloading] = useState(false);
    const [audio, setaudio] = useState(false);
    const [error, seterror] = useState(false);
    const router = useRouter();
  const handleRefresh = () => {
    router.reload();
  };
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
            const address = "https://www.reddit.com/" + oadd.pathname.substring(0, oadd.pathname.length - 1) + ".json";
            const fetcher = async (url) => {
                const response = await axios.get(url);
                return response.data;
            }
            var data = (await fetcher(address))
            var url = ""
            var audio_url = ""
            data = data[0]["data"]["children"][0]["data"]
            if (!data["media"]) {
                url = data["crosspost_parent_list"][0]["media"]["reddit_video"]["fallback_url"];

            } else {
                url = data["media"]["reddit_video"]["fallback_url"];
            }
            audio_url = data['secure_media']['reddit_video']['hls_url'].split('HLS')[0]

            audio_url += 'HLS_AUDIO_128.aac'
            const filedata = async (url) => {
                const response = await axios.get(url, {
                    responseType: 'blob', onDownloadProgress: function (progressEvent) {
                        var prog = parseInt(progressEvent["loaded"]) / parseInt(progressEvent["total"])
                        setDownloadp(Math.ceil(prog * 100))
                    }
                });
                return response.data;
            }

            var vdata = await filedata(url)
            var adata = await filedata(audio_url)
            await ffmpeg.load();

            var videodata = await fetchFile(vdata)
            var audiodata = await fetchFile(adata);
            ffmpeg.FS('writeFile', 'video.mp4', videodata);
            ffmpeg.FS('writeFile', 'audio.aac', audiodata)
            await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.aac', '-c', 'copy', 'out.mp4');
            data = ffmpeg.FS('readFile', 'out.mp4');
            fileDownload(data.buffer, "video.mp4");
            handleRefresh()
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
            handleRefresh()
        }
        setdownloading(false)
    }
    return (<>
        <Head>
            <meta property="og:title" content="Reddit saver" />
            <script src="/coi-serviceworker.js"></script>
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
                                    <Form.Check type="checkbox" label="Audio? (usually takes longer, data needs to be processed)" style={{ fontSize: '0.8rem', marginTop: '1em' }} defaultChecked={audio}
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
                <Card.Footer>Some problems have been found with specific posts. Still working on a fix.</Card.Footer>
            </Card>
        </Container>
    </>
    )
}
