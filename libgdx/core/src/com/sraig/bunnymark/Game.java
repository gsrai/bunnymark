package com.sraig.bunnymark;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.*;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.RandomXS128;
import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.viewport.ScreenViewport;

public class Game extends ApplicationAdapter {

    private static final int MEGABYTES = 1024 * 1024;

    private static OrthographicCamera camera;
    private static ScreenViewport viewport;
    private static SpriteBatch spriteBatch;
    private static Sprite sprite;

    private static BitmapFont labelFont;
    private static float labelX = 5;
    private static float labelY = 0;
    private String bunnyLabel = "";
    private String fpsLabel = "";
    private String sizeLabel = "";

    private static RandomXS128 random = new RandomXS128();
    private static float minX = 0;
    private static float maxX = 0;
    private static float minY = 0;
    private static float maxY = 0;
    private float fpsTime = 0;
    private int fpsCount = 0;
    private boolean touched = false;
    private Color color;

    private Array<Bunny> bunnies = new Array<>();

    private class Bunny {
        Vector2 position;
        Vector2 velocity;
        Color tint;

        public Bunny(Color tint) {
            this.tint = tint;
            position = new Vector2(10f, maxY / 2f);
            velocity = new Vector2(
                    random.nextInt(500) + 250 - 500,
                    random.nextInt(500) + 250
            );
        }
    }

    @Override
    public void create() {
        spriteBatch = new SpriteBatch(8191);
        sprite = new Sprite(new Texture("bunnys.png"), 2, 47, 26, 37);
        labelFont = new BitmapFont();
        labelFont.setColor(Color.WHITE);
        camera = new OrthographicCamera();
        viewport = new ScreenViewport(camera);
        viewport.apply();

        resize(Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
        color = new Color(1, 1, 1, 1);
        bunnies.add(new Bunny(color));
        bunnies.add(new Bunny(color));
        bunnyLabel = "2";
    }

    private void renderBunny(Bunny bunny, float dt) {
        bunny.position.mulAdd(bunny.velocity, dt);

        if (bunny.position.x < minX) {
            bunny.position.x = minX;
            bunny.velocity.x = -bunny.velocity.x;
        }

        if (bunny.position.x > maxX) {
            bunny.position.x = maxX;
            bunny.velocity.x = -bunny.velocity.x;
        }

        if (bunny.position.y < minY) {
            bunny.position.y = minY;
            bunny.velocity.y = -bunny.velocity.y;
        }

        if (bunny.position.y > maxY) {
            bunny.position.y = maxY;
            bunny.velocity.y = -bunny.velocity.y;
        }

        sprite.setPosition(bunny.position.x, bunny.position.y);
        sprite.setColor(bunny.tint);
        sprite.draw(spriteBatch);
    }

    @Override
    public void render() {
        if (Gdx.input.isTouched()) {
            if (!touched) {
                touched = true;
                color = new Color();
                color.r = random.nextFloat();
                color.g = random.nextFloat();
                color.b = random.nextFloat();
                color.a = 1;
            }
            for (int i = 0; i < 1000; i++) {
                bunnies.add(new Bunny(color));
            }
            bunnyLabel = "Bunnies: %d".formatted(bunnies.size);
        } else {
            touched = false;
        }

        float dt = Gdx.graphics.getDeltaTime();

        fpsTime += dt;
        fpsCount++;
        if (fpsTime > 1.0) {
            fpsLabel = "%.2f FPS".formatted(fpsCount / fpsTime);
            fpsTime = 0f;
            fpsCount = 0;
        }

        Gdx.gl20.glClearColor(0, 0, 0, 1);
        Gdx.gl20.glClear(GL20.GL_COLOR_BUFFER_BIT | GL20.GL_DEPTH_BUFFER_BIT);

        camera.update();
        spriteBatch.setProjectionMatrix(camera.combined);
        spriteBatch.begin();

        for (int i = 0, c = bunnies.size; i < c; i++) {
            renderBunny(bunnies.get(i), dt);
        }

        labelFont.draw(spriteBatch, bunnyLabel, labelX, labelY);
        labelFont.draw(spriteBatch, fpsLabel, labelX, labelY - 15);
        labelFont.draw(spriteBatch, sizeLabel, labelX, labelY - 30);
        labelFont.draw(spriteBatch, "Java Heap: %d MB | Native Heap %d MB".formatted(
                Gdx.app.getJavaHeap() / MEGABYTES,
                Gdx.app.getNativeHeap() / MEGABYTES
        ), labelX, labelY - 45);

        spriteBatch.end();
    }

    @Override
    public void resize(int width, int height) {
        viewport.update(width, height, true);
        maxX = camera.viewportWidth - sprite.getWidth();
        maxY = camera.viewportHeight - sprite.getHeight();
        labelY = camera.viewportHeight - 5;
        sizeLabel = "%d x %d (%d x %d)".formatted(width, height, Math.round(camera.viewportWidth), Math.round(camera.viewportHeight));
    }

    @Override
    public void dispose() {
        spriteBatch.dispose();
    }
}
