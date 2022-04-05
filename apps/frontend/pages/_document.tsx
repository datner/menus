import Document, {
  Html,
  Main,
  NextScript,
  Head,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'he' ? 'rtl' : 'ltr';
    return (
      <Html lang={locale} dir={dir} className="h-full bg-white">
        <Head />
        <body className="h-full overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
