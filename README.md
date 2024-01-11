# 2048 Game

[**Game Demo**](https://h-asmter.github.io/2048/)

This project is a JavaScript implementation of the classic 2048 game.

## About the Game

The 2048 game is a puzzle game where the player slides numbered tiles on a grid to combine them and create a tile with the number 2048.

## Features

- **Performance Metrics:**
  ![Lighthouse Scores](https://imgdb.net/storage/uploads/f7b59a6cdaa643d9d0d987d8a6bf1d252ac8b1bda55097e37a27a984781b09a2.png)
  - [Test Performance Here](https://pagespeed.web.dev/analysis/https-h-amster-github-io-nothing/9tcd2d9jaf?form_factor=desktop)
- **Keyboard Controls**: Use arrow keys to move the tiles.
- **Swipe Gestures**: Swipe up, down, left, or right on touchscreen devices to move the tiles.
- **Merge Tiles**: Tiles with the same number merge into one when they collide.
- **Win & Lose Conditions**: Win by reaching the 2048 tile; the game ends when no more moves are possible.
- **Score System**: Increase your score by merging tiles.
- **Best Score Tracking**: Your best score is stored locally via `localStorage`.

## How to Play

- **Getting Started**: To play the game, [click here](https://techamster.github.io/2048/) and press "Start".
- **Keyboard Controls**: Use arrow keys to move tiles in up, down, left, or right directions.
- **Swipe Gestures**: Swipe up, down, left, or right on touchscreen devices to move tiles.

## Implementation Details

- The game logic is implemented in pure JavaScript without any external libraries.
- The grid layout is created using HTML and styled using CSS.
- Event listeners are used to capture keyboard input for tile movement.
- Pure CSS Implementation for Scroll Animations pn tile move.