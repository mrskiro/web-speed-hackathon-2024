import { Link as RouterLink } from 'react-router-dom';
type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export const Link: React.FC<Props> = ({ children, href, ...rest }) => {
  return (
    <RouterLink className={rest.className} to={href}>
      {children}
    </RouterLink>
  );
};
