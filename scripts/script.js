var app = angular.module("calendar", ['gapi']);

app.value('GoogleApp', {
    apiKey: 'AIzaSyB437jFIIQlajkktwog2MCGO6YBNgFrGyk',
    clientId: '1016110111538-s9lc4mmd3d8ehj04o39ju8k7tpt9isip.apps.googleusercontent.com',
    scopes: [
      'https://www.googleapis.com/auth/calendar.readonly'
    ]
  });

app.controller("app", function ($scope, Calendar) {
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

  GAPI.init();

  // /**
  // * Check if current user has authorized this application.
  // */
  // function checkAuth() {
  //   gapi.auth.authorize(
  //   {
  //     'client_id': CLIENT_ID,
  //     'scope': SCOPES.join(' '),
  //     'immediate': true
  //   }, handleAuthResult);
  // }

  // /**
  // * Handle response from authorization server.
  // *
  // * @param {Object} authResult Authorization result.
  // */
  // function handleAuthResult(authResult) {
  //   var authorizeDiv = document.getElementById('authorize-div');
  //   if (authResult && !authResult.error) {
  //   // Hide auth UI, then load client library.
  //   authorizeDiv.style.display = 'none';
  //   $scope.loadCalendarApi();
  //   } else {
  //   // Show auth UI, allowing the user to initiate authorization by
  //   // clicking authorize button.
  //   authorizeDiv.style.display = 'inline';
  //   }
  // }

  // /**
  // * Initiate auth flow in response to user clicking authorize button.
  // *
  // * @param {Event} event Button click event.
  // */
  // $scope.handleAuthClick = function(event) {
  //   gapi.auth.authorize(
  //     {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
  //     handleAuthResult);
  //   return false;
  // }

  /**
  * Load Google Calendar client library. List upcoming events
  * once client library is loaded.
  */
  $scope.loadCalendarApi = function() {
    // gapi.client.load('calendar', 'v3', listUpcomingEvents);

    // for (var i = 0; i < Object.keys(IDS).length; i++) {
      var cal = Calendar.getCalendars(IDS[Object.keys(IDS)[0]]);
      console.log(cal);
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
        var name = events[0].creator.displayName;
        if (!name) {
          name = events[0].creator.email;
        }
        appendPre(name + ' Next events:');

        if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            var where = event.location;
            appendPre(event.summary + ' (' + when + ')' + ' (' + where + ')');
          }
        } else {
          appendPre('No upcoming events found.');
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
  function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }
});
