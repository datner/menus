import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const { locale } = router;

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
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
