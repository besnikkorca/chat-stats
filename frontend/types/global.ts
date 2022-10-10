import type { AppProps as NextAppProps } from 'next/app';

export type Value = string | number | readonly string[] | undefined;

export type GenericVoidFunc = (...args: any[]) => void;

export type Children = React.ReactNode | React.ReactNode[];

interface CustomPageProps {
  requiresAuth?: boolean;
}

export type AppProps = NextAppProps<CustomPageProps>;
