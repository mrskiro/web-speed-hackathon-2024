import { OpenAPIHono } from '@hono/zod-openapi';

import { deleteAuthorApp } from './deleteAuthor';
import { getAuthorApp } from './getAuthor';
import { getAuthorAdminApp } from './getAuthorAdmin';
import { getAuthorListApp } from './getAuthorList';
import { getAuthorListAdminApp } from './getAuthorListAdmin';
import { patchAuthorApp } from './patchAuthor';
import { postAuthorApp } from './postAuthor';

const app = new OpenAPIHono();

app.route('/', getAuthorApp);
app.route('/', getAuthorListApp);

app.route('/', getAuthorAdminApp);
app.route('/', getAuthorListAdminApp);
app.route('/', postAuthorApp);
app.route('/', patchAuthorApp);
app.route('/', deleteAuthorApp);

export { app as authorApp };
