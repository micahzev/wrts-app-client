import request from 'superagent';
import { apiURL } from '~/src/config';
const UrlAPI = apiURL;


//// GET ALL SPACES

export function fetchSpacesAPI() {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.get(UrlAPI + 'spaces' + '/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log('Oh no! error' + JSON.stringify(err));
          } else {
            console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body);
          }
        })
    })();
  });
}
;
