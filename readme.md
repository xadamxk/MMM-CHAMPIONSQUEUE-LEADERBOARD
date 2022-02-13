# MMM-LOLESPORTS-STANDINGS
Displays LOL Champions Queue standings on your magic mirror!
Module for <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a>.

Other league related modules:
- TBD
- TBD

## Preview
<img src="https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD/blob/main/screenshots/default_format.png?raw=true" title="Preview"  />

<details> 
  <summary>Season Format:</summary>
  <img src="https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD/blob/main/screenshots/season_format.png?raw=true" title="Preview Season Format"  />
	<pre><code>
config: {
	showCurrentSplit: false,
    showRemainingTime: false	
}
	</code></pre>
</details>

<details> 
  <summary>LP Format:</summary>
  <img src="https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD/blob/main/screenshots/lp_format.png?raw=true" title="Preview LP Format"  />
	<pre><code>
config: {
    showPlayerLP: true,
    showPlayerWinCount: true,
    showPlayerWinRates: false
}
	</code></pre>
</details>

<details> 
  <summary>Minimal Format:</summary>
  <img src="https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD/blob/main/screenshots/minimal_format.png?raw=true" title="Minimal LP Format"  />
	<pre><code>
config: {
    showTitle: false,
    showRemainingTime: false,
    showPlayerWinRates: false
}
	</code></pre>
</details>

## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD.git
````

## Configuration
Add `MMM-CHAMPIONSQUEUE-LEADERBOARD` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
	{
			module: "MMM-CHAMPIONSQUEUE-LEADERBOARD",
			position: "bottom_left",
			config: {}
	}
]
````
### Configuration Options

| **Option** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `updateInterval` | integer | '60' | Number of minutes to poll api for updates. |
| `resultCount` | integer | '10' | Number of players' results to list. |
| `showTitle` | boolean | 'true' | Show table title in format of Season - Split (ex. 2022 Spring Season - Split 1). |
| `showCurrentSplit` | boolean | 'true' | Limit leaderboard to current split (uses current season otherwise). |
| `showRemainingTime` | boolean | 'true' | Show remaining time for given split/season. |
| `showPlayerLP` | boolean | 'false' | Replace rank ordinal with the player's LP. |
| `showPlayerWinCount` | boolean | 'false' | Show wins-losses count. |
| `showPlayerWinRates` | boolean | 'true' | Show win rate rounded to 1 decimal. |

