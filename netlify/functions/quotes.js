const fetch = require('node-fetch');

exports.handler = async function(event) {
  const tickers = event.queryStringParameters.tickers;
  const type = event.queryStringParameters.type || 'iex';
  const sym = event.queryStringParameters.sym;
  const start = event.queryStringParameters.start;
  const KEY = '1b5507b37831fc3cd148a1dc3fffb26f4993f753';

  try {
    let url;
    if (type === 'hist') {
      url = `https://api.tiingo.com/tiingo/daily/${sym}/prices?startDate=${start}&token=${KEY}`;
    } else {
      url = `https://api.tiingo.com/iex/?tickers=${tickers}&token=${KEY}`;
    }

    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await r.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
```
