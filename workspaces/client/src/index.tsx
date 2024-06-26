import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

// import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();
  const root = document.getElementById('root');

  ReactDOM.createRoot(root!).render(
    <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
      <BrowserRouter>
        <ClientApp />
      </BrowserRouter>
    </SWRConfig>,
  );
};

main().catch(console.error);
