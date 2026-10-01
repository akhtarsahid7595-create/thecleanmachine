export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);

  if (requestUrl.hostname === 'thecleanmachine.pages.dev') {
    requestUrl.hostname = 'www.thecleanmachineglasgow.co.uk';
    return Response.redirect(requestUrl.toString(), 301);
  }

  return context.next();
}
