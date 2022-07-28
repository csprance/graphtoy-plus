import { PrismaClient } from '@prisma/client';

import { Formula } from './graphtoy/types';

export function isNumber(s: string) {
  if (['-', '-.', '.', ''].includes(s)) {
    return true;
  }
  const rgx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
  return s.match(rgx);
}

export const makeMapPartialByID = (index: number, partial: any) => (v: any) => {
  if (index === v.id) {
    return {
      ...v,
      ...partial,
    };
  }
  return v;
};

export const isBadNum = (num: number) =>
  isNaN(num) ||
  num === Number.NEGATIVE_INFINITY ||
  num === Number.POSITIVE_INFINITY ||
  Math.abs(num) > 1e9;

export const sortById = (a: Formula, b: Formula) =>
  a.id < b.id ? -1 : a.id > b.id ? 1 : 0;

export type Noop<T> = () => T;
export const noop: Noop<any> = () => {};

type ErrorWithMessage = {
  message: string;
};

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export const isProd = () => process.env.NODE_ENV === 'production';

export function createRandomKey(idLength: number = 5) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < idLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export async function createUniqueRandomKey(keyLength: number = 5) {
  const prisma = new PrismaClient();
  let key = createRandomKey(keyLength);
  // Do 5 iterations if we need to otherwise fail
  for (const item of Array(5)) {
    if (await prisma.tiny_url.findFirst({ where: { url: key } })) {
      key = createRandomKey(keyLength);
    } else {
      return key;
    }
  }
  throw Error('Could not reliably generate a unique key.');
}
