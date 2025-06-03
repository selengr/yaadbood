import NextLink, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

export const LinkBehaviour = forwardRef(function LinkBehaviour(props: LinkProps, ref) {
  return <NextLink {...props} ref={ref as any} />;
});
