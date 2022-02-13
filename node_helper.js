/* Magic Mirror
 * Node Helper: MMM-CHAMPIONSQUEUE-LEADERBOARD
 *
 * By xadamxk
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var fetch = require("node-fetch");

module.exports = NodeHelper.create({
  // Override socketNotificationReceived method.
  socketNotificationReceived: function (notification, payload) {
    let self = this;
    const url = "https://d1fodqbtqsx6d3.cloudfront.net/leaderboards.json";
    if (notification === "MMM-CHAMPIONSQUEUE-LEADERBOARD-GET-STANDINGS") {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          self.sendSocketNotification(
            "MMM-CHAMPIONSQUEUE-LEADERBOARD-STANDINGS",
            json
          );
        });
    }
  }
});
