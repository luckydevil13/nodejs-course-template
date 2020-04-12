function logReq(req) {
  const url = req.url;
  const params = JSON.stringify(req.params);
  const body = JSON.stringify(req.body);

  console.log(`url: ${url} params: ${params} body: ${body}`);
}

function logError(error) {
  if (error.stack) {
    console.error(`[E] ${error.stack}`);
  } else {
    console.error(`[E] app error:${JSON.stringify(error)}`);
  }
}

module.exports = {
  logReq,
  logError
};
