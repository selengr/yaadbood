import { ReactElement, ReactNode } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

export interface IChildren {
     children: ReactNode | Array<ReactNode> | ReactElement | Array<ReactElement>;
}

const cacheRtl = createCache({
     key: 'muirtl',
     stylisPlugins: [prefixer, rtlPlugin]
});
export const RTL = (props: IChildren) => {
     return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
};
