import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="noflash.js" />
          <Main className="principal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;