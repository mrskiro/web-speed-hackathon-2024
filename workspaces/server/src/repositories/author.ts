import { eq, inArray } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import { err, ok } from 'neverthrow';
import type { Result } from 'neverthrow';

import type { DeleteAuthorRequestParams } from '@wsh-2024/schema/src/api/authors/DeleteAuthorRequestParams';
import type { DeleteAuthorResponse } from '@wsh-2024/schema/src/api/authors/DeleteAuthorResponse';
import type { GetAuthorListRequestQuery } from '@wsh-2024/schema/src/api/authors/GetAuthorListRequestQuery';
import type { GetAuthorListResponse } from '@wsh-2024/schema/src/api/authors/GetAuthorListResponse';
import type { GetAuthorRequestParams } from '@wsh-2024/schema/src/api/authors/GetAuthorRequestParams';
import type { GetAuthorAdminResponse, GetAuthorResponse } from '@wsh-2024/schema/src/api/authors/GetAuthorResponse';
import type { PatchAuthorRequestBody } from '@wsh-2024/schema/src/api/authors/PatchAuthorRequestBody';
import type { PatchAuthorRequestParams } from '@wsh-2024/schema/src/api/authors/PatchAuthorRequestParams';
import type { PatchAuthorResponse } from '@wsh-2024/schema/src/api/authors/PatchAuthorResponse';
import type { PostAuthorRequestBody } from '@wsh-2024/schema/src/api/authors/PostAuthorRequestBody';
import type { PostAuthorResponse } from '@wsh-2024/schema/src/api/authors/PostAuthorResponse';
import { author, book, episode, episodePage, feature, ranking } from '@wsh-2024/schema/src/models';

import { getDatabase } from '../database/drizzle';

type AuthorRepositoryInterface = {
  create(options: { body: PostAuthorRequestBody }): Promise<Result<PostAuthorResponse, HTTPException>>;
  delete(options: { params: DeleteAuthorRequestParams }): Promise<Result<DeleteAuthorResponse, HTTPException>>;
  read(options: { params: GetAuthorRequestParams }): Promise<Result<GetAuthorResponse, HTTPException>>;
  readAll(options: { query: GetAuthorListRequestQuery }): Promise<Result<GetAuthorListResponse, HTTPException>>;
  update(options: {
    body: PatchAuthorRequestBody;
    params: PatchAuthorRequestParams;
  }): Promise<Result<PatchAuthorResponse, HTTPException>>;
};

class AuthorRepository implements AuthorRepositoryInterface {
  async read(options: { params: GetAuthorRequestParams }): Promise<Result<GetAuthorResponse, HTTPException>> {
    try {
      const data = await getDatabase().query.author.findFirst({
        columns: {
          description: true,
          id: true,
          name: true,
        },
        orderBy(author, { asc }) {
          return asc(author.createdAt);
        },
        where(author, { eq }) {
          return eq(author.id, options.params.authorId);
        },
        with: {
          books: {
            columns: {
              description: true,
              id: true,
              name: true,
            },
            with: {
              episodes: {
                columns: {
                  chapter: true,
                  description: true,
                  id: true,
                  name: true,
                },
              },
              image: {
                columns: {
                  alt: true,
                  id: true,
                },
              },
            },
          },
          image: {
            columns: {
              alt: true,
              id: true,
            },
          },
        },
      });

      if (data == null) {
        throw new HTTPException(404, { message: `Author:${options.params.authorId} is not found` });
      }
      return ok(data);
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to read author:${options.params.authorId}.` }));
    }
  }

  async readForAdmin(options: {
    params: GetAuthorRequestParams;
  }): Promise<Result<GetAuthorAdminResponse, HTTPException>> {
    try {
      const data = await getDatabase().query.author.findFirst({
        columns: {
          description: true,
          id: true,
          name: true,
        },
        orderBy(author, { asc }) {
          return asc(author.createdAt);
        },
        where(author, { eq }) {
          return eq(author.id, options.params.authorId);
        },
        with: {
          books: {
            columns: {
              description: true,
              id: true,
              name: true,
            },
          },
          image: {
            columns: {
              alt: true,
              id: true,
            },
          },
        },
      });

      if (data == null) {
        throw new HTTPException(404, { message: `Author:${options.params.authorId} is not found from admin.` });
      }
      return ok(data);
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to read author:${options.params.authorId}.` }));
    }
  }

  async readAll(options: { query: GetAuthorListRequestQuery }): Promise<Result<GetAuthorListResponse, HTTPException>> {
    try {
      const data = await getDatabase().query.author.findMany({
        columns: {
          description: false,
          id: true,
          name: true,
        },
        limit: options.query.limit,
        offset: options.query.offset,
        where(author, { like }) {
          if (options.query.name != null) {
            return like(author.name, `%${options.query.name}%`);
          }
          return;
        },
      });

      return ok(data);
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to read author list.` }));
    }
  }

  async create(options: { body: PostAuthorRequestBody }): Promise<Result<PostAuthorResponse, HTTPException>> {
    try {
      const result = await getDatabase()
        .insert(author)
        .values(options.body)
        .returning({ authorId: author.id })
        .execute();

      if (result[0] == null) {
        throw new HTTPException(500, { message: 'Failed to create author.' });
      }
      return this.read({
        params: {
          authorId: result[0].authorId,
        },
      });
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to create author.` }));
    }
  }

  async update(options: {
    body: PatchAuthorRequestBody;
    params: PatchAuthorRequestParams;
  }): Promise<Result<PatchAuthorResponse, HTTPException>> {
    try {
      const result = await getDatabase()
        .update(author)
        .set(options.body)
        .where(eq(author.id, options.params.authorId))
        .returning({ authorId: author.id })
        .execute();

      if (result[0] == null) {
        throw new HTTPException(500, { message: `Failed to update author:${options.params.authorId}.` });
      }
      return ok({});
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to update author:${options.params.authorId}.` }));
    }
  }

  async delete(options: { params: DeleteAuthorRequestParams }): Promise<Result<DeleteAuthorResponse, HTTPException>> {
    try {
      await getDatabase().transaction(async (tx) => {
        await tx.delete(author).where(eq(author.id, options.params.authorId)).execute();
        const deleteBookRes = await tx
          .delete(book)
          .where(eq(book.authorId, options.params.authorId))
          .returning({
            bookId: book.id,
          })
          .execute();
        const bookIds = deleteBookRes.map((book) => book.bookId);
        await tx.delete(feature).where(inArray(feature.bookId, bookIds)).execute();
        await tx.delete(ranking).where(inArray(ranking.bookId, bookIds)).execute();
        const deleteEpisodeRes = await tx
          .delete(episode)
          .where(inArray(episode.bookId, bookIds))
          .returning({
            episodeId: episode.id,
          })
          .execute();
        const episodeIds = deleteEpisodeRes.map((episode) => episode.episodeId);
        await tx.delete(episodePage).where(inArray(episodePage.episodeId, episodeIds)).execute();
      });

      return ok({});
    } catch (cause) {
      if (cause instanceof HTTPException) {
        return err(cause);
      }
      return err(new HTTPException(500, { cause, message: `Failed to delete author:${options.params.authorId}.` }));
    }
  }
}

export const authorRepository = new AuthorRepository();
