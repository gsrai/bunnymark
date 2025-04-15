import { Scene } from "phaser";

const BUNNY_SPAWN_COUNT = 10;

export class Game extends Scene {
	camera: Phaser.Cameras.Scene2D.Camera;
	bunnies: Array<Phaser.GameObjects.Image>;
	bunnyCount: number;
	bunnyType: number;
	maxX: number;
	maxY: number;
	debugText: Phaser.GameObjects.Text;
	private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

	constructor() {
		super("Game");
		this.bunnies = [];
		this.bunnyCount = 0;
		this.bunnyType = 0;
		this.maxX = 0;
		this.maxY = 0;
	}

	preload() {
		this.load.setPath("assets");
		this.load.spritesheet("bunnys", "bunnys.png", {
			frameWidth: 26,
			frameHeight: 37,
		});
	}

	create() {
		this.maxX = this.sys.game.config.width as number;
		this.maxY = this.sys.game.config.height as number;

		this.emitter = this.add.particles(0, 0, "bunnys", {
			frame: this.bunnyType,
			frequency: -1,
			lifespan: 1000 * 3600,
			gravityY: 300,
			quantity: 1,
			emitting: false,
			bounce: 1,
			bounds: { x: 0, y: 0, width: this.maxX, height: this.maxY },
			speedX: { min: -300, max: 300 },
			speedY: { min: -300, max: 300 },
		});

		this.debugText = this.add.text(10, this.maxY - 20, "FPS: 0 | Bunnies: 0", {
			font: "16px Arial",
			color: "#ffffff",
		});

		this.input.on("pointerup", () => {
			this.bunnyType++;
			this.bunnyType %= 5;
			this.emitter.setEmitterFrame(this.bunnyType);
		});
	}

	update() {
		const pointer = this.input.activePointer;
		if (pointer.isDown) {
			this.emitter.emitParticleAt(pointer.x, pointer.y, BUNNY_SPAWN_COUNT);
			this.bunnyCount += BUNNY_SPAWN_COUNT;
		}
		this.debugText.setText(
			`FPS: ${Math.round(this.game.loop.actualFps)} | Bunnies ${this.bunnyCount}`,
		);
	}
}
