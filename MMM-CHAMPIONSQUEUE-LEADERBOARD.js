Module.register("MMM-CHAMPIONSQUEUE-LEADERBOARD", {
  // Default module config
  defaults: {
    updateInterval: 60, // minutes
    // lang: config.language,
    resultCount: 10, // Number of players' results to list
    showTitle: true, // Season - Split (ex. 2022 Spring Season - Split 1)
    showCurrentSplit: true, // Limit leaderboard to current split (uses current season otherwise)
    showRemainingTime: true, // Show remaining time for given split/season
    showPlayerLP: false, // Replace rank ordinal with the player's LP
    showPlayerWinCount: false, // Show wins-losses count
    showPlayerWinRates: true // Show win rate rounded to 1 decimal
  },

  // Module properties
  players: [],
  year: new Date().getFullYear(),
  seasonId: 0,
  seasonTitle: "",
  seasonShort: "",
  seasonOpenDate: null,
  seasonCloseDate: null,
  seasonDaysRemaining: 0,
  splitId: 0,
  splitTitle: "",
  splitOpenDate: null,
  splitCloseDate: null,
  splitDaysRemaining: 0,

  // Start the module.
  start: function () {
    // Get initial API data
    this.getData();

    // Schedule update poll
    var self = this;
    setInterval(function () {
      self.getData();
    }, self.config.updateInterval * 60 * 1000); //convert to milliseconds
  },

  getTranslations() {
    return {
      en: "translations/en.json"
    };
  },
  getStyles: function () {
    return ["MMM-CHAMPIONSQUEUE-LEADERBOARD.css"];
  },
  getTemplate() {
    return `templates/standings.njk`;
  },
  getTemplateData() {
    return {
      players: this.players,
      seasonId: this.seasonId,
      seasonTitle: this.seasonTitle,
      seasonShort: this.seasonShort,
      seasonOpenDate: this.seasonOpenDate,
      seasonCloseDate: this.seasonCloseDate,
      seasonDaysRemaining: this.seasonDaysRemaining,
      splitId: this.splitId,
      splitTitle: this.splitTitle,
      splitOpenDate: this.splitOpenDate,
      splitCloseDate: this.splitCloseDate,
      splitDaysRemaining: this.splitDaysRemaining,
      config: this.config
    };
  },

  // Fetch schedule for provided tournament ids
  getData: function () {
    this.sendSocketNotification("MMM-CHAMPIONSQUEUE-LEADERBOARD-GET-STANDINGS");
  },
  // Schedule data is coming back
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-CHAMPIONSQUEUE-LEADERBOARD-STANDINGS") {
      this.getStandingData(payload);
    }
  },
  // Condense standing data and render it
  getStandingData: function (data) {
    const resultCount = this.config.resultCount;
    if (
      !data ||
      !data.hasOwnProperty("leaderboards") ||
      data.leaderboards.length < 1
    ) {
      return []; // Service is down or endpoint changed
    }
    const currentSeason = data["leaderboards"][0];
    // Season
    this.seasonId = currentSeason["seasonId"];
    this.seasonTitle = currentSeason["title"];
    this.seasonShort = currentSeason["shortTitle"];
    this.year = currentSeason["year"];
    this.seasonOpenDate = currentSeason["openDate"];
    this.seasonCloseDate = currentSeason["closeDate"];
    const seasonClose = new Date(currentSeason["closeDate"]);
    const today = new Date();
    this.seasonDaysRemaining = Math.round(
      (seasonClose.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    // Split
    const currentSplit = currentSeason["split"];
    this.splitId = currentSplit["splitId"];
    this.splitTitle = currentSplit["title"];
    this.splitOpenDate = currentSplit["openDate"];
    this.splitCloseDate = currentSplit["closeDate"];
    const splitClose = new Date(currentSplit["closeDate"]);
    this.splitDaysRemaining = Math.round(
      (splitClose.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    const results =
      currentSeason.hasOwnProperty("lineup") && currentSeason["lineup"];
    this.players = results.slice(0, resultCount);
    this.updateDom(500);
  }
});
