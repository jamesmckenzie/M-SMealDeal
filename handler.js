'use strict';

module.exports.mealDeal = (event, context, callback) => {
  try {
    isMealDealAvailable();
  } catch (err) {
    console.log(err);
    callback(err);
  }

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

var request = require('request');
var cheerio = require('cheerio');

const isMealDealAvailable = () =>
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

      if (isAvailable) {
        pingSlack('Yes it fucking is!!');
      }
    }
  });

const pingSlack = message => {
  request.post({
    url:
      'https://hooks.slack.com/services/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',
    body: JSON.stringify({
      text:
        message +
        ' => <http://www.marksandspencer.com/c/food-to-order/dine-in>',
      username: 'is the meal deal on??',
      icon_emoji: ':monkey_face:',
    }),
  });
};
