Module.register("MMM-CHAMPIONSQUEUE-LEADERBOARD", {
	// Default module config
	defaults: {
		updateInterval: 60, // minutes
		// lang: config.language,
		resultCount: 10, // Number of players to list
		showTitle: true, // Season - Split (ex. 2022 Spring Season - Split 1)
		showCurrentSplit: true, // Limit leaderboard to current split (vs current season)
		showRemainingTime: true, // Show remaining time for given split/season
		showPlayerWinRates: true, // Default
		showPlayerWinCount: false, // Off by default
		showPlayerLP: true // Default
	},

	// TODO: Styling for title, remaining time, rows
	// TODO: Add win rates to player rows
	// TODO: Add win counts to player rows
	// TODO: Add player lp

	// Module properties
	players: [],
	year: new Date().getFullYear(),
	seasonId: 0,
	seasonTitle: "",
	seasonShort: "",
	seasonOpenDate: null,
	seasonCloseDate: null,
	splitId: 0,
	splitTitle: "",
	splitOpenDate: null,
	splitCloseDate: null,

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
			splitId: this.splitId,
			splitTitle: this.splitTitle,
			splitOpenDate: this.splitOpenDate,
			splitCloseDate: this.splitCloseDate,
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
		if (!data || !data.hasOwnProperty("leaderboards") || data.leaderboards.length < 1) {
			return []; // Service is down or endpoint changed
		}
		const currentLeaderboard = data["leaderboards"][0];
		// Season
		this.seasonId = currentLeaderboard["seasonId"];
		this.seasonTitle = currentLeaderboard["title"];
		this.seasonShort = currentLeaderboard["shortTitle"];
		this.year = currentLeaderboard["year"];
		this.seasonOpenDate = currentLeaderboard["openDate"];
		this.seasonCloseDate = currentLeaderboard["closeDate"];
		// Split
		const currentSplit = currentLeaderboard["split"];
		this.splitId = currentSplit["splitId"];
		this.splitTitle = currentSplit["title"];
		this.splitOpenDate = currentSplit["openDate"];
		this.splitCloseDate = currentSplit["closeDate"];

		const results = currentLeaderboard.hasOwnProperty("lineup") && currentLeaderboard["lineup"];
		this.players = results.slice(0, resultCount);
		console.log(this.players);
		this.updateDom(500);
	}
});
