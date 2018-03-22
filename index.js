var request = require('request');
var cheerio = require('cheerio');

request('http://www.marksandspencer.com/c/food-to-order/dine-in', function(
  err,
  resp,
  html
) {
  if (!err) {
    const $ = cheerio.load(html);
    const text = $('div[class=copy]')
      .find('p[class=width80]')
      .text();

    const isAvailable =
      text !==
      'Sorry, our Dine In for two offer is not available this week. So why not make the most of our other in-store food offers and delicious Food to Order range?';

    const result = isAvailable
      ? 'Yes it fucking is!!'
      : 'No, fuck off and come back another day';

    console.log(result);

    pingSlack(result);
  }
});

const pingSlack = message => {
  request.post({
    url:
      'https://hooks.slack.com/services/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',
    body: JSON.stringify({ text: message }),
  });
};
