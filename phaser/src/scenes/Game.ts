import { Scene } from "phaser";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  bunnies: Array<Phaser.GameObjects.Image>;
  bunnyCount: number;
  bunnyType: number;
  maxX: number;
  maxY: number;
  fpsText: string;

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
    this.maxX = this.sys.game.config.width;
    this.maxY = this.sys.game.config.height;

    this.fpsText = this.add.text(10, this.maxY - 20, "FPS: 0", {
      font: "16px Arial",
      fill: "#ffffff",
    });

    this.input.on("pointerdown", () => this.addBunnies(1000));
    this.input.on("pointerup", () => {
      this.bunnyType++;
      this.bunnyType %= 5;
    });
  }

  addBunnies(num: number) {
    for (let i = 0; i < num; i++) {
      const bunny = this.physics.add.image(
        Phaser.Math.Between(0, this.maxX),
        Phaser.Math.Between(0, this.maxY),
        "bunnys",
        this.bunnyType
      );

      bunny.setVelocity(
        Phaser.Math.Between(-300, 300),
        Phaser.Math.Between(-300, 300)
      );
      bunny.setBounce(1, 1);
      bunny.setCollideWorldBounds(true);

      this.bunnies.push(bunny);
    }

    this.bunnyCount += num;
    console.log(`Bunnies: ${this.bunnyCount}`);
  }

  update() {
    this.fpsText.setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
  }
}
