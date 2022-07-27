import httpStatus from 'http-status';
import { NextApiRequest, NextApiResponse } from 'next';
import hash from 'object-hash';

import { PrismaClient } from '@prisma/client';

import { createUniqueRandomKey } from '../../lib/utils';

/**
 * This is an API Route located at /api/tinyurl
 * It generates new urls for us given some state or returns an existing one
 * if that state variant already exists in the db
 *
 * @location /api/tinyurl
 * @method: POST
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Route based on method
  const { method, body } = req;
  if (!('state' in body)) {
    return res.status(httpStatus.BAD_REQUEST).send({ err: true });
  }
  const { state } = body;

  // POST REQUEST
  // Add the new item
  if (method === 'POST') {
    const hashedJSON = hash({ ...state, grapher: null });
    const prisma = new PrismaClient();
    // If we have an url that exists already with the same hash return that instead
    const existingTinyUrl = await prisma.tiny_url.findFirst({
      where: { hash: hashedJSON },
    });
    if (existingTinyUrl) {
      return res.status(httpStatus.OK).send({ ...existingTinyUrl });
    }
    // If it doesn't exist create it and return it
    const tinyurl  = await prisma.tiny_url.create({
      data: {
        value: body.state,
        url: await createUniqueRandomKey(),
        adminUrl: await createUniqueRandomKey(8),
        hash: hashedJSON,
        hits: 0,
      },
    });

    return res.status(httpStatus.OK).send({ ...tinyurl });
  }

  return res.status(httpStatus.NOT_IMPLEMENTED).send({ err: true });
}

export default handler;
