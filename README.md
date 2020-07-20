<p align="center">
  <a href="https://roldanjrcodearts9711.github.io/productivity-timer/">
    <img src="assets/logo.png" alt="Productivity Timer logo" width="72" height="72">
  </a>
</p>

<h1 align="center">PRODUCTIVITY TIMER</h1>

<p align="center">
  Multi-platform time management app based on Pomodoro Technique <br> that will help boost your productivity.
   <br>
  <br>
  <a href="#sparkles-features">Features</a>
  .
  <a href="#fire-roadmap">Road Map</a>
  .
  <a href="https://roldanjrcodearts9711.github.io/productivity-timer/">Download</a>
  .
  <a href="#cyclone-development">Development</a>
  .
  <a href="#computer-installation">Installation</a>
  .
  <a href="#privacy">Privacy</a>
  .
  <a href="#license">License</a>
  <br>
  <br>
</p>

![App Preview](/assets/Preview.png)

[![productivity-timer](https://snapcraft.io//productivity-timer/badge.svg)](https://snapcraft.io/productivity-timer)
[![Build Status](https://travis-ci.com/roldanjrCodeArts9711/productivity-timer.svg?branch=master)](https://travis-ci.com/roldanjrCodeArts9711/productivity-timer)
[![Total Downloads](https://img.shields.io/github/downloads/roldanjrCodeArts9711/productivity-timer/total)](https://github.com/roldanjrCodeArts9711/productivity-timer/releases)
[![Version](https://img.shields.io/github/v/release/roldanjrCodeArts9711/productivity-timer)](https://github.com/roldanjrCodeArts9711/productivity-timer/releases)
[![License](https://img.shields.io/github/license/roldanjrCodeArts9711/productivity-timer)](https://github.com/roldanjrCodeArts9711/productivity-timer/blob/master/LICENSE)

## :sparkles: Features

- **Always On Top**. If enabled, the app will always on top of other apps running on user's Operating System.

- **Full Screen Breaks**. If enabled, the app will interrupt the user by occupying the whole screen so that the user will be force to take a break.

- **Special Breaks**. If enabled, the user will be allowed to set some special time when the user really need to take a break.

- **Strict Mode**. If enabled, the app will strictly follow user's configuration and prevent the user from resetting, pausing and skipping the timer when it has started.

- **Dark Theme**. Allowing the user to use Dark Mode to reduce eye strain and improves visibility for user with low vision and those who are sensitive to bright light.

- **Toggle Native Titlebar**. Enable user to switch between default custom titlebar to a native titlebar.

- **Progress Animation**. Allowing the user to disable timer progress animation to reduce the CPU usage to the app least required. It is really useful for some people.

- **Desktop Notification**. If enabled, the app will allow the user to be notified from time to time. Notification property is divided into 3 types NONE, NORMAL and EXTRA.

- **Auto-start Work Time**. If enabled, the app will automatically start after the timer ends. It is useful when the user did not want to always start the timer manually from time to time.

- **Minimize to Tray**. If enabled, clicking the minimize button will not minimize the app. It will be hidden and being send to Tray instead of minimizing on the Taskbar.

- **Close to Tray**. If enabled, clicking the close button will not quit the app. It will be hidden and being send to Tray instead of closing and quitting the app.

- **Progress on Tray**. The app will show progress animation on tray. This feature can be activate if Minimize to Tray of Close to Tray is enabled. Useful when the timer is being hidden.

- **Keyboard Shortcuts**. Provide some useful keyboard shortcuts allowing the user to use the app conveniently.

- **Customizable Rules**. Allowing the user to modify the default rules of Pomodoro Principle to fit on their personal preference.

- **Built-in Task List**. Allowing the user to create tasks they wanted to accomplish and enable them to mark a particular task as done showing some accomplishments.

- **Auto Updates**. With the Automatic Updates feature, it keep the app up to date with the latest updates and enhancements. User no longer have to search for critical updates; it delivers them directly to the computer.

## :fire: Roadmap

- **Customizable Shortcuts**. Provide a way to make the default keyboard shortcuts customizable by the user.

- **Website Blocker**. Enable user to block specific website while working in order to focus.

- **Productivity Report**. Provide some useful summary about user's productivity to have some sense of accomplishments.

## :cyclone: Development

This app is built using [React](https://reactjs.org/), [Electron](https://www.electronjs.org/), and [Typescript](https://www.typescriptlang.org/).

### :zap: Quick Setup

1. Install all app dependencies.

   ```sh
   yarn install or npm install
   ```

2. Start the development server.

   ```sh
   yarn develop or npm run develop
   ```

3. Start the electron.

   ```sh
   yarn electron or npm run electron
   ```

4. If you want to run `yarn develop` and `yarn electron` concurrently.

   ```sh
   yarn start:app or npm run start:app
   ```

### 🛠 Building for Production

1. Build Windows installer.

   ```sh
   yarn build:win or npm run build:win
   ```

2. Build macOS installer.

   ```sh
   yarn build:mac or npm run build:mac
   ```

3. Build Linux installer.

   ```sh
   yarn build:linux or npm run build:linux
   ```

## :computer: Installation

Download the latest version from the [Releases Page](https://github.com/roldanjrCodeArts9711/productivity-timer/releases/latest)

or from the :point_right: [Official Website](https://roldanjrcodearts9711.github.io/productivity-timer/) .

Available for Windows, macOS, and Linux.

> For linux users. You can directly install it from SnapStore.

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/productivity-timer)

## Privacy

This app has analytics that will track number of users([analytics.ts](https://github.com/roldanjrCodeArts9711/productivity-timer/blob/master/app/electron/helpers/analytics.ts)).

## License

MIT © [Roldan Montilla Jr](https://github.com/roldanjrCodeArts9711)
