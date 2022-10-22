export default async function verifyRecaptcha(token: string) {
  try {
    const res = await fetch(process.env.GATSBY_RECAPTCHA_VERIFY_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    return res.status === 200;
  } catch (e) {
    throw e;
  }
}
