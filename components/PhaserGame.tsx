"use client";
import { useEffect, useRef } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    class StartScene extends Phaser.Scene {
      constructor() {
        super("StartScene");
      }

      preload() {
        this.load.image("bg_clean", "/game/bg_clean.webp");
      }

      create() {
        this.add.image(400, 300, "bg_clean").setDisplaySize(800, 600).setDepth(-1);
        this.add
          .text(400, 150, "🌍 Plant Trees Game", {
            fontSize: "36px",
            fontFamily: "Arial",
            color: "#00ff08",
            backgroundColor: "#222",
            padding: { x: 12, y: 6 },
          })
          .setOrigin(0.5);
        this.add
          .text(400, 210, "Choose Difficulty", {
            fontSize: "20px",
            fontFamily: "Arial",
            color: "#ffffff",
            backgroundColor: "#222",
            padding: { x: 12, y: 6 },
          })
          .setOrigin(0.5);

        const buttons = [
          { label: "🎮 Easy", mode: "easy", y: 280 },
          { label: "⚡ Normal", mode: "normal", y: 340 },
          { label: "🔥 Hard", mode: "hard", y: 400 },
        ];
        buttons.forEach((btn) => {
          const text = this.add
            .text(400, btn.y, btn.label, {
              fontSize: "24px",
              fontFamily: "Arial",
              color: "#fff",
              backgroundColor: "#222",
              padding: { x: 12, y: 6 },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
          text.on("pointerdown", () => {
            this.scene.start("MainScene", { difficulty: btn.mode, level: 1 });
          });
        });
      }
    }

    class MainScene extends Phaser.Scene {
      private pollutionLayer!: Phaser.GameObjects.Group;
      private treesLayer!: Phaser.GameObjects.Group;
      private bgPolluted!: Phaser.GameObjects.Image;
      private bgClean!: Phaser.GameObjects.Image;
      private score = 0;
      private scoreText!: Phaser.GameObjects.Text;
      private aqi = 300;
      private maxAQI = 300;
      private aqiText!: Phaser.GameObjects.Text;
      private aqiStatus!: Phaser.GameObjects.Text;
      private aqiBar!: Phaser.GameObjects.Graphics;
      private aqiBarBg!: Phaser.GameObjects.Graphics;
      private currentPercent = 0;
      private targetPercent = 0;
      private timerText!: Phaser.GameObjects.Text;
      private timeLeft = 0;
      private timerEvent?: Phaser.Time.TimerEvent;
      private music?: Phaser.Sound.BaseSound;
      private plantSfx?: Phaser.Sound.BaseSound;
      private spawnEvent?: Phaser.Time.TimerEvent;
      private isWon = false;
      private difficulty: "easy" | "normal" | "hard" = "normal";
      private level = 1;

      constructor() {
        super("MainScene");
      }

      init(data: { difficulty: "easy" | "normal" | "hard"; level: number }) {
        if (data.difficulty) this.difficulty = data.difficulty;
        if (data.level) this.level = data.level;
      }

      preload() {
        this.load.image("bg_polluted", "/game/bg_polluted.webp");
        this.load.image("bg_clean", "/game/bg_clean.webp");
        this.load.image("tree", "/game/tree.png");
        this.load.image("smoke", "/game/smoke.png");
        this.load.audio("plant", "/game/plant.mp3");
        this.load.audio("bg_music", "/game/bg_music.mp3");
      }

      create() {
        this.score = 0;
        this.isWon = false;
        let baseAQI = 200;
        let spawnDelay = 1000;
        let baseTime = 40;

        if (this.difficulty === "easy") {
          baseAQI = 200;
          spawnDelay = 1200;
          baseTime = 40;
        } else if (this.difficulty === "normal") {
          baseAQI = 300;
          spawnDelay = 900;
          baseTime = 30;
        } else if (this.difficulty === "hard") {
          baseAQI = 400;
          spawnDelay = 700;
          baseTime = 20;
        }

        this.aqi = baseAQI + (this.level - 1) * 80;
        this.maxAQI = this.aqi;
        this.timeLeft = Math.max(10, baseTime - (this.level - 1) * 2);
        spawnDelay = Math.max(300, spawnDelay - (this.level - 1) * 50);
        this.bgPolluted = this.add.image(400, 300, "bg_polluted").setDisplaySize(800, 600);
        this.bgClean = this.add.image(400, 300, "bg_clean").setDisplaySize(800, 600).setAlpha(0);
        this.treesLayer = this.add.group();
        this.pollutionLayer = this.add.group();

        try {
          this.music = this.sound.add("bg_music", { loop: true, volume: 0.4 });
          this.music.play();
        } catch {}
        try {
          this.plantSfx = this.sound.add("plant", { volume: 0.7 });
        } catch {}

        this.spawnInitialPollution(8);
        this.scoreText = this.add.text(20, 20, "🌳 Trees: 0", {
          fontSize: "18px",
          color: "#fff",
          backgroundColor: "#0008",
          padding: { x: 8, y: 4 },
        });
        this.aqiText = this.add.text(20, 50, `AQI: ${this.aqi}`, {
          fontSize: "18px",
          color: "#fff",
          backgroundColor: "#0008",
          padding: { x: 8, y: 4 },
        });
        this.aqiStatus = this.add.text(20, 80, this.getAQIStatus(this.aqi), {
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "#0008",
          padding: { x: 8, y: 4 },
        });
        this.timerText = this.add.text(650, 20, `⏰ ${this.timeLeft}`, {
          fontSize: "20px",
          color: "#fff",
          backgroundColor: "#0008",
          padding: { x: 8, y: 4 },
        });

        const btnMenuTop = this.add
          .text(780, 20, "🏠", {
            fontSize: "22px",
            color: "#fff",
            backgroundColor: "#0008",
            padding: { x: 8, y: 4 },
          })
          .setOrigin(1, 0)
          .setDepth(1000)
          .setInteractive({ useHandCursor: true });
        btnMenuTop.on("pointerdown", () => {
          if (this.music && this.music.isPlaying) this.music.stop();
          this.scene.start("StartScene");
        });

        this.aqiBarBg = this.add.graphics();
        this.aqiBarBg.fillStyle(0x222222, 0.9);
        this.aqiBarBg.fillRect(20, 120, 220, 22);
        this.aqiBar = this.add.graphics();
        this.updateAQI();
        this.timerEvent = this.time.addEvent({
          delay: 1000,
          loop: true,
          callback: () => {
            if (this.timeLeft > 0) {
              this.timeLeft--;
              this.timerText.setText(`⏰ ${this.timeLeft}`);
              if (this.timeLeft === 0 && !this.isWon) {
                this.handleLose();
              }
            }
          },
        });

        this.spawnEvent = this.time.addEvent({
          delay: spawnDelay,
          callback: () => {
            if (this.aqi > 0 && this.pollutionLayer.getLength() < 15 && !this.isWon) {
              this.spawnPollutionOnce();
            }
          },
          loop: true,
        });
      }

      private spawnInitialPollution(count: number) {
        for (let i = 0; i < count; i++) this.spawnPollutionOnce();
      }

      private spawnPollutionOnce() {
        const x = Phaser.Math.Between(50, 750);
        const yStart = Phaser.Math.Between(200, 580);
        const smoke = this.add.image(x, yStart, "smoke").setInteractive();
        smoke.setScale(0.14).setOrigin(0.5).setDepth(20);
        this.pollutionLayer.add(smoke);

        smoke.on("pointerdown", () => {
          if (this.isWon) return;
          const tree = this.add
            .image(smoke.x, smoke.y + 6, "tree")
            .setScale(0)
            .setDepth(10);
          this.treesLayer.add(tree);
          if (this.plantSfx && !this.plantSfx.isPlaying) this.plantSfx.play();

          this.tweens.add({
            targets: tree,
            scale: 0.28,
            duration: 500,
            ease: "Back.easeOut",
          });

          smoke.destroy();
          this.score++;
          this.scoreText.setText(`🌳 Trees: ${this.score}`);
          this.aqi = Math.max(0, this.aqi - 25);
          this.updateAQI();
          this.maybeCrossfadeBackground();

          if (this.aqi <= 0 && this.pollutionLayer.getLength() === 0) {
            this.handleWin();
          }
        });
      }

      private updateAQI() {
        this.aqiText.setText(`AQI: ${this.aqi}`);
        this.aqiStatus.setText(this.getAQIStatus(this.aqi));
        this.targetPercent = Phaser.Math.Clamp((this.maxAQI - this.aqi) / this.maxAQI, 0, 1);
        this.tweens.add({
          targets: this,
          currentPercent: this.targetPercent,
          duration: 300,
          ease: "Sine.easeInOut",
          onUpdate: () => this.drawAQIBar(),
        });
      }

      private drawAQIBar() {
        this.aqiBar.clear();
        let color = 0x00ff00;
        const percent = this.currentPercent;
        if (percent < 0.33) color = 0xff0000;
        else if (percent < 0.66) color = 0xffff00;
        else color = 0x00ff00;
        this.aqiBar.fillStyle(color, 1);
        this.aqiBar.fillRect(20, 120, 220 * this.currentPercent, 22);
      }

      private getAQIStatus(aqi: number) {
        if (aqi <= 50) return "Good 😊";
        if (aqi <= 100) return "Moderate 🙂";
        if (aqi <= 150) return "Unhealthy (sensitive) 😷";
        if (aqi <= 200) return "Unhealthy 😢";
        if (aqi <= 300) return "Very Unhealthy ☠️";
        return "Hazardous 💀";
      }

      private maybeCrossfadeBackground() {
        const alpha = Phaser.Math.Clamp((this.maxAQI - this.aqi) / this.maxAQI, 0, 1);
        this.tweens.add({ targets: this.bgClean, alpha, duration: 700 });
      }

      private handleWin() {
        if (this.isWon) return;
        this.isWon = true;
        if (this.spawnEvent) this.spawnEvent.remove(false);
        if (this.timerEvent) this.timerEvent.remove(false);

        this.tweens.add({ targets: this.bgClean, alpha: 1, duration: 800 });
        this.add
          .text(400, 260, `🎉 Congratulation, You passed level ${this.level}`, {
            fontSize: "28px",
            color: "#00ff88",
            backgroundColor: "#000a",
            padding: { x: 12, y: 8 },
          })
          .setDepth(1000)
          .setOrigin(0.5);

        const btnNext = this.add
          .text(400, 320, "➡️ Next Level", {
            fontSize: "20px",
            color: "#fff",
            backgroundColor: "#2b2b2b",
            padding: { x: 12, y: 8 },
          })
          .setDepth(1000)
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });
        btnNext.on("pointerdown", () => {
          this.scene.start("MainScene", {
            difficulty: this.difficulty,
            level: this.level + 1,
          });
        });

        const btnRestart = this.add
          .text(400, 370, "🔁 Back To Main Menu", {
            fontSize: "20px",
            color: "#fff",
            backgroundColor: "#444",
            padding: { x: 12, y: 8 },
          })
          .setDepth(1000)
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });
        btnRestart.on("pointerdown", () => {
          this.scene.start("StartScene");
        });

        if (this.music && this.music.isPlaying) this.music.stop();
      }

      private handleLose() {
        if (this.isWon) return;
        this.isWon = true;
        if (this.spawnEvent) this.spawnEvent.remove(false);
        this.add
          .text(400, 260, "⏰ Time's Up, Try Again", {
            fontSize: "26px",
            color: "#ff4444",
            backgroundColor: "#000a",
            padding: { x: 12, y: 8 },
          })
          .setDepth(1000)
          .setOrigin(0.5);

        const btnMenu = this.add
          .text(400, 370, "🏠 Main Menu", {
            fontSize: "20px",
            color: "#fff",
            backgroundColor: "#222",
            padding: { x: 12, y: 8 },
          })
          .setDepth(1000)
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });

        btnMenu.on("pointerdown", () => {
          this.scene.start("StartScene");
        });
        if (this.music && this.music.isPlaying) this.music.stop();
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#000",
      parent: "phaser-container",
      scene: [StartScene, MainScene],
    };
    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);
  return <div id="phaser-container" style={{ width: 800, height: 600 }} />;
};

export default PhaserGame;
