package main

import (
	"fmt"

	rl "github.com/gen2brain/raylib-go/raylib"
)

const (
	screenWidth  = 800
	screenHeight = 600
	maxBunnies   = 200_000
)

type Bunny struct {
	Position rl.Vector2
	Speed    rl.Vector2
	Color    rl.Color
}

func main() {
	rl.InitWindow(screenWidth, screenHeight, "raylib bunnymark")
	defer rl.CloseWindow()

	texBunny := rl.LoadTexture("resources/bunnys.png")
	defer rl.UnloadTexture(texBunny)

	rectBunny := rl.NewRectangle(2, 47, 26, 37)
	bunnies := make([]*Bunny, 0, maxBunnies)

	rl.SetTargetFPS(60)

	for !rl.WindowShouldClose() {
		if rl.IsMouseButtonDown(rl.MouseLeftButton) {
			if len(bunnies) < maxBunnies {
				for i := 0; i < 100; i++ {
					r, g, b := rl.GetRandomValue(50, 240), rl.GetRandomValue(80, 240), rl.GetRandomValue(100, 240)
					bunny := &Bunny{}
					bunny.Position = rl.GetMousePosition()
					bunny.Speed.X = float32(rl.GetRandomValue(-250, 250)) / 60.0
					bunny.Speed.Y = float32(rl.GetRandomValue(-250, 250)) / 60.0
					bunny.Color = rl.NewColor(uint8(r), uint8(g), uint8(b), 255)
					bunnies = append(bunnies, bunny)
				}
			}
		}

		for _, b := range bunnies {
			b.Position.X += b.Speed.X
			b.Position.Y += b.Speed.Y

			if b.Position.X > float32(screenWidth) || b.Position.X < 0 {
				b.Speed.X *= -1
			}

			if b.Position.Y > float32(screenHeight) || b.Position.Y < 0 {
				b.Speed.Y *= -1
			}
		}

		rl.BeginDrawing()
		rl.ClearBackground(rl.RayWhite)

		for _, b := range bunnies {
			rl.DrawTextureRec(texBunny, rectBunny, b.Position, b.Color)
		}

		rl.DrawRectangle(0, 0, screenWidth, 40, rl.Black)
		rl.DrawText(fmt.Sprintf("bunnies: %d", len(bunnies)), 120, 10, 20, rl.Green)

		rl.DrawFPS(10, 10)
		rl.EndDrawing()
	}
}
