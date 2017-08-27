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
            // console.log('Oh no! error' + JSON.stringify(err));
          } else {
            // console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body);
          }
        })
    })();
  });
}
;


///// CREATE NEW SPACE


export function addSpaceAPI(data) {
  return new Promise((resolve, reject) => {
    request.post(UrlAPI + 'spaces' + '/')
      .set('Content-Type', 'application/json')
      .send(data)
      .end(function(err, res) {
        if (err || !res.ok) {
          // console.log('Oh no! error' + JSON.stringify(err));
        } else {
          // console.log('yay posted ' + JSON.stringify(res.body));
          resolve(res.body);
        }
      })
  });
}
;

//// GET ALL EVENTS

export function fetchEventsAPI() {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.get(UrlAPI + 'events' + '/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            // console.log('Oh no! error' + JSON.stringify(err));
          } else {
            // console.log('yay got ' + JSON.stringify(res.body));
            resolve(res.body);
          }
        })
    })();
  });
}
;



/////// DELETE A SPACES



export function deleteSpaceAPI(object) {
  return new Promise((resolve, reject) => {
    var getResult = (() => {
      request.del(UrlAPI + 'spaces' + '/' + object.spaceId)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            // console.log('Oh no! error' + JSON.stringify(err));
          } else {
            // console.log('yay got ' + JSON.stringify(res.body));
            resolve({
              index: object.index
            });
          }
        })
    })();
  });
}
;



////////////////////////////////////// UPDATE A SPACE


export function updateSpaceAPI(data) {
  const id = data.spaceId;
  return new Promise((resolve, reject) => {
    request.put(UrlAPI + 'spaces' + '/' + id)
      .set('Content-Type', 'application/json')
      .send(data)
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('Oh no! error' + JSON.stringify(err));
        } else {
          console.log('yay posted ' +res.body);
          resolve(data);
        }
      })
  });
}
