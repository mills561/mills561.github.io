// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '1016110111538-s9lc4mmd3d8ehj04o39ju8k7tpt9isip.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

var IDS = {
  "David": 'davsan56@gmail.com',
  "Shawn": 'sswisty7@gmail.com',
  "Ethan P": 'ecp341@gmail.com',
  "Ethan G": 'gerrardletoux@gmail.com',
  "Justin": 'jmasterj512@gmail.com',
  "Kyle": 'devilsrage17@gmail.com',
  "Nick": 'nickd5142@gmail.com',
  "Sebastian": 'bm2ii1o7n8mr7lnv71g2o9dvrg@group.calendar.google.com',
  "Steve": 'wuebbst@gmail.com'
};

var EMAILS = {
  'davsan56@gmail.com' : 'david',
  'sswisty7@gmail.com' : 'shawn',
  'ecp341@gmail.com' : 'ethanp',
  'gerrardletoux@gmail.com' : 'ethang',
  'jmasterj512@gmail.com' : 'justin',
  'devilsrage17@gmail.com' : 'kyle',
  'nickd5142@gmail.com' : 'nick',
  'sebastiancoraccio@gmail.com' : 'sebastian',
  'wuebbst@gmail.com' : 'steve'
};

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
  gapi.auth.authorize(
  {
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
  // Hide auth UI, then load client library.
  authorizeDiv.style.display = 'none';
  loadCalendarApi();
  } else {
  // Show auth UI, allowing the user to initiate authorization by
  // clicking authorize button.
  authorizeDiv.style.display = 'inline';
  }
}

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
  for (var j = 0; j < Object.keys(IDS).length; j++) {
    var request = gapi.client.calendar.events.list({
      'calendarId': IDS[Object.keys(IDS)[j]],
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 1,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var events = resp.items;
      name = events[0].creator.email;
      id = EMAILS[name];

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          var where = event.location;
          appendPre(event.summary + ' (' + when + ')' + ' (' + where + ')\n', id);
        }
      } else {
        appendPre('No upcoming events found.', id);
      }
    });
  }
}

/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message, id) {
  var toAdd = document.getElementById(id);
  if (toAdd)
    toAdd.innerHTML += message;
}
