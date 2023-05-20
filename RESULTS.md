# Game library comparison

All window sizes were at 800x600
on an M1 Max

## Libgdx

~370k bunnies at ~60 fps

70% CPU (45 threads) | 78% GPU | 585 MB RAM

(34% CPU (36 threads), 65% GPU, 300MB ram 60 FPS w/ 140k bunnies - compared to raylib)

(890MB ram 37 FPS w/ 600k bunnies! - 70% CPU (45 threads) | 80% GPU)

~449k bunnies at ~55 fps

70% CPU (45 threads) | 81% GPU | 611 MB RAM

GC pause was for 1 second at least, 25fps!

### Pros

- IntelliJ IDE
- Kotlin?
- Easy multi-platform
- Successful example project (Mindustry, Minecraft)
- Easy multiplayer (Steamworks4J, robust networking)
- Game server would be easy (graalvm, loom, netty, NIO, kryonet etc)

## Raylib

~140k bunnies at ~60 fps

70% CPU (6 threads) | 90% GPU | 105 MB RAM

## Bevy

~80k bunnies at ~60 fps

65% CPU (21 threads) | 88% GPU | 375 MB RAM

(515MB ram 35 FPS w/ 140k bunnies - compared to raylib)

## Pixi.js

~66k bunnies at ~60 fps

## Ebitengine

~87k bunnies at ~60 fps

102% CPU (22 threads) | 20% GPU | 225 MB RAM

(292MB ram 34 FPS w/ 140k bunnies - compared to raylib)

## Raylib-go

~200k bunnies at ~60 fps

97% CPU (14 threads) | 96% GPU | 95 MB RAM

## GGEZ

~300k bunnies at ~57 fps

100% CPU (45 threads) | 55% GPU | 400 MB RAM

## Summary

| Library    | Bunnies | FPS | CPU               | GPU | RAM    |
| ---------- | ------- | --- | ----------------- | --- | ------ |
| Libgdx     | 370k    | 60  | 70% (45 threads)  | 78% | 585 MB |
| Raylib     | 140k    | 60  | 70% (6 threads)   | 90% | 105 MB |
| Raylib-go  | 200k    | 60  | 97% (14 threads)  | 96% | 95 MB  |
| Bevy       | 80k     | 60  | 65% (21 threads)  | 88% | 375 MB |
| Pixi.js    | 66k     | 60  | ?                 | ?   | ?      |
| Ebitengine | 87k     | 60  | 102% (22 threads) | 20% | 225 MB |
| GGEZ       | 300k    | 57  | 100% (45 threads) | 55% | 400 MB |

