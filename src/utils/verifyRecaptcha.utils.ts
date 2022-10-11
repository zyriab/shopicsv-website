export default async function verifyRecaptcha(token: string) {
  const res = await fetch(process.env.REACT_APP_RECAPTCHA_VERIFY_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (res.status !== 200) {
    return false;
  }

  return true;
}
