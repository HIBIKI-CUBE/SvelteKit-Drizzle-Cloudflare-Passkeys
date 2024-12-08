import { PUBLIC_RP_ID } from '$env/static/public';
import type { RequestHandler } from './$types';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { session } }) => {
  const options = await generateAuthenticationOptions({
    rpID: PUBLIC_RP_ID,
    userVerification: 'preferred',
    allowCredentials: [],
  });

  await session.regenerate();
  session.cookie.path = '/';
  await session.setData({
    challenge: options.challenge,
  });
  await session.save();

  return json({ options });
};
