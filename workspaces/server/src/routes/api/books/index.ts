import { OpenAPIHono } from '@hono/zod-openapi';

import { deleteBookApp } from './deleteBook';
import { getBookApp } from './getBook';
import { getBookAdminApp } from './getBookAdmin';
import { getBookListApp } from './getBookList';
import { getBookListAdminApp } from './getBookListAdmin';
import { patchBookApp } from './patchBook';
import { postBookApp } from './postBook';

const app = new OpenAPIHono();

app.route('/', getBookApp);
app.route('/', getBookListApp);

app.route('/', getBookAdminApp);
app.route('/', getBookListAdminApp);
app.route('/', postBookApp);
app.route('/', patchBookApp);
app.route('/', deleteBookApp);

export { app as bookApp };
