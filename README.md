<p align="center">
  <a href="#">
    <img src="assets/logo.png" alt="Productivity Timer logo" width="72" height="72">
  </a>
</p>

<h1 align="center">PRODUCTIVITY TIMER</h1>

<p align="center">
  Wonderful app that will help boost your productivity
   <br>
  <br>
  <a href="#overview">Overview</a>
  .
  <a href="#features">Features</a>
  .
  <a href="#road-map">Road Map</a>
  .
  <a href="#download">Download</a>
  <br>
  <br>
</p>

![App Preview](/assets/Preview.png)

[![productivity-timer](https://snapcraft.io//productivity-timer/badge.svg)](https://snapcraft.io/productivity-timer)
[![Snap Status](https://build.snapcraft.io/badge/roldanjrCodeArts9711/productivity-timer.svg)](https://build.snapcraft.io/user/roldanjrCodeArts9711/productivity-timer)
[![Build Status](https://travis-ci.com/roldanjrCodeArts9711/productivity-timer.svg?branch=master)](https://travis-ci.com/roldanjrCodeArts9711/productivity-timer)
[![Total Downloads](https://img.shields.io/github/downloads/roldanjrCodeArts9711/productivity-timer/total)](https://github.com/roldanjrCodeArts9711/productivity-timer/releases)
[![Version](https://img.shields.io/github/v/release/roldanjrCodeArts9711/productivity-timer)](https://github.com/roldanjrCodeArts9711/productivity-timer/releases)
[![License](https://img.shields.io/github/license/roldanjrCodeArts9711/productivity-timer)](https://github.com/roldanjrCodeArts9711/productivity-timer/blob/master/LICENSE)

## Overview

This app is base on [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) added with some features that might help you a lot.

> **Useful Blogs About Pomodoro Technique**:

> **Topic**: [The pomodoro technique](https://www.focusboosterapp.com/the-pomodoro-technique)

> **Topic**: [Productivity 101: An Introduction to The Pomodoro Technique](https://lifehacker.com/productivity-101-a-primer-to-the-pomodoro-technique-1598992730)

> **Topic**: [Do more and have fun with time management](https://francescocirillo.com/pages/pomodoro-technique)

## Features

- Always On Top

  > It make the app always on top of all other apps running on your Operating System. `( default: disabled )`

- Notifications

  > Shows some notification from time to time if necessary.

  > **NOTE**: Notification Property is divided into three category.

  1. **NONE** - No notification will appear.
  2. **NORMAL** - Necessary notification will only appear.
  3. **EXTRA** - `( default )` Warn you _30 seconds_ before your _WORK TIME FINISH_, _60 seconds_ before your _SHORT BREAK FINISH_, _LONG BREAK FINISH_ and _SPECIAL BREAK FINISH_.

- Special Breaks

  > Allows you to set some special time when you really need to take a break.

  > **Example**: Lunch Break, Dinner Break and etc... `( default: enabled )`

* Strict Mode

  > **NOTE**: Full Screen On Break feature of `version 1` is being moved here due to some request of users.

  > If **Enabled**: It will strictly follows what you had set on your configuration and it will make every break fullscreen so that you will force to take a break. `( default: enabled )`

* Dark Theme

  > Enable to use `Dark Mode` version of the app to reduce strain. `( default: depends on your operating system prefered color scheme )`

* Lock Settings

  > If **Enabled**: Your settings that you had set will be locked. `( default: disabled )`

- Built-in Task List

  > Allows you to create a list of task that you want to accomplish.

## Road Map

- Add web blocker feature.
- Add option to switch to native titlebar.
- Create official website that includes documentation.
- Add productivity report requested. Feature request mentioned here [#68](https://github.com/roldanjrCodeArts9711/productivity-timer/issues/68).

## Development

**For Contributors**

PRODUCTIVITY TIMER is built with [React](https://reactjs.org/), [Electron](https://www.electronjs.org/), and [Typescript](https://www.typescriptlang.org/).

### Setup

```bash
# install all dependencies
yarn install

# start the react app
yarn develop

# start electron
yarn electron

# runs `yarn develop` and `yarn electron` concurrently
yarn start:app

# build window installer
yarn build:win

# build mac installer
yarn build:mac

# build linux installer
yarn build:linux
```

## Download

Available for Window, Mac, and Linux.

> For linux users. You can directly install it from SnapStore.

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/productivity-timer)

Download the latest version from the [Releases Page](https://github.com/roldanjrCodeArts9711/productivity-timer/releases).

## License

MIT © [Roldan Montilla Jr](https://github.com/roldanjrCodeArts9711)
