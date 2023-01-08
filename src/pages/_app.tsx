/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable global-require */
/* eslint-disable import/extensions */

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import 'animate.css';
import '../styles/global.css';
import { useRef } from 'react';

require('../styles/style.css');

if (typeof window !== 'undefined') {
  require('flowbite/dist/flowbite.js');
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} key={router.route} />
    </QueryClientProvider>
  );
};

export default MyApp;
