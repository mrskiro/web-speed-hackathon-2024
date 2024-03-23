import type { GetBookListResponse } from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import { BookListItem } from '../../../features/book/components/BookListItem';
import { Flex } from '../../../foundation/components/Flex';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';

type Props = {
  books: GetBookListResponse;
};

export const SearchResult: React.FC<Props> = ({ books }) => {
  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
      {books.length === 0 && (
        <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
          関連作品は見つかりませんでした
        </Text>
      )}
    </Flex>
  );
};
