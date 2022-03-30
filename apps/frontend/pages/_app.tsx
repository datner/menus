import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import client from 'apollo-client';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

function CustomApp({ Component, pageProps, router }: AppProps) {
  const { locale } = router;
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={locale === 'he-IL'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}

export default appWithTranslation(CustomApp);
