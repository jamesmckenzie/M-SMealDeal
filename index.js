var request = require('request');
var cheerio = require('cheerio');

request('http://www.marksandspencer.com/c/food-to-order/dine-in', function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          const text = $('div[class=copy]').find('p[class=width80]').text(); 

          const isAvailable = text !== 'Sorry, our Dine In for two offer is not available this week. So why not make the most of our other in-store food offers and delicious Food to Order range?'


          console.log(isAvailable ? 'Yes it fucking is!!' : 'No, fuck off and come back another day');
      }
});