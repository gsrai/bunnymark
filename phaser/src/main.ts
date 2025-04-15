import { Game as MainGame } from "./scenes/Game";

import { Game, type Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: "game-container",
	backgroundColor: "#000000",
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0 },
		},
	},
	scene: [MainGame],
};

export default new Game(config);
