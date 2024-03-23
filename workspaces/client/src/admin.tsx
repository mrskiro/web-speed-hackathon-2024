import ReactDOM from 'react-dom/client';

import { AdminApp } from '@wsh-2024/admin/src/index';

const main = async () => {
  const root = document.getElementById('root');

  ReactDOM.createRoot(root!).render(<AdminApp />);
};

main().catch(console.error);
