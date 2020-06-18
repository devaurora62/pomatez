import { BrowserWindow, app, ipcMain, globalShortcut, Menu } from "electron";
import path from "path";
import {
  activateGlobalShortcuts,
  activateAutoUpdate,
  blockShortcutKeys,
  createSystemTray,
  getIcon,
  SET_ALWAYS_ON_TOP,
  SET_FULLSCREEN_BREAK,
  SET_MINIMIZE,
  SET_HIDE,
  SET_UI_THEME,
  SET_NATIVE_TITLEBAR,
} from "./helpers";
import store from "./store";

import "v8-compile-cache";

const onProduction = app.isPackaged;

const trayIcon = path.join(__dirname, "../src/assets/logos/tray-dark.png");

const onlySingleIntance = app.requestSingleInstanceLock();

let win: BrowserWindow | null;

Menu.setApplicationMenu(null);

const hasFrame: boolean = store.get("useNativeTitlebar") || false;

function createMainWindow() {
  win = new BrowserWindow({
    width: 340,
    height: 500,
    resizable: false,
    maximizable: false,
    show: false,
    frame: hasFrame,
    icon: getIcon(),
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    !onProduction
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "index.html")}`
  );

  win.once("ready-to-show", () => {
    win?.show();
  });

  win.on("closed", () => {
    win = null;
  });
}

if (!onlySingleIntance) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      } else if (!win.isVisible()) {
        win.show();
      } else {
        win.focus();
      }
    }
  });

  app.on("ready", () => {
    createMainWindow();

    const tray = createSystemTray({
      icon: trayIcon,
      template: [
        {
          label: "Quit",
          role: "quit",
        },
      ],
    });

    tray.on("click", () => {
      if (!win?.isVisible()) {
        win?.show();
      } else {
        if (!win?.isFullScreen()) {
          win?.hide();
        }
      }
    });

    if (onProduction) {
      if (win) {
        const blockKeys = [
          "CommandOrControl+R",
          "CommandOrControl+Shift+R",
          "CommandOrControl+Alt+Q",
          "F11",
        ];
        blockShortcutKeys(win, blockKeys);
      }
    }

    activateGlobalShortcuts([
      {
        key: "Alt+Shift+H",
        callback: () => {
          win?.hide();
        },
      },
      {
        key: "Alt+Shift+S",
        callback: () => {
          win?.show();
        },
      },
    ]);

    const autoUpdater = activateAutoUpdate({});

    ipcMain.on(SET_ALWAYS_ON_TOP, (e, { alwaysOnTop }) => {
      win?.setAlwaysOnTop(alwaysOnTop);
    });

    ipcMain.on(SET_FULLSCREEN_BREAK, (e, args) => {
      const { shouldFullscreen, alwaysOnTop } = args;

      if (shouldFullscreen) {
        win?.show();
        win?.focus();
        win?.setAlwaysOnTop(true, "screen-saver");
        win?.setSkipTaskbar(true);
        win?.setFullScreen(true);
        win?.setVisibleOnAllWorkspaces(true);

        globalShortcut.unregister("Alt+Shift+H");

        if (!win?.isVisible()) {
          win?.show();
          win?.focus();
        }
      } else {
        win?.setAlwaysOnTop(alwaysOnTop, "screen-saver");

        win?.setSkipTaskbar(false);
        win?.setFullScreen(false);
        win?.setVisibleOnAllWorkspaces(false);

        globalShortcut.register("Alt+Shift+H", () => {
          win?.hide();
        });

        if (win?.isFullScreen()) win?.setFullScreen(false);
      }
    });

    ipcMain.on(SET_UI_THEME, (e, { isDarkMode }) => {
      const backgroundColor = isDarkMode ? "#141e25" : "#fff";
      win?.setBackgroundColor(backgroundColor);
    });

    ipcMain.on(SET_NATIVE_TITLEBAR, (e, { useNativeTitlebar }) => {
      if (hasFrame !== useNativeTitlebar) {
        store.set("useNativeTitlebar", useNativeTitlebar);
        app.relaunch();
        app.exit();
      }
    });

    ipcMain.on(SET_MINIMIZE, () => {
      win?.minimize();
    });

    ipcMain.on(SET_HIDE, () => {
      win?.hide();
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createMainWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.setLoginItemSettings({ openAtLogin: true });
app.setAppUserModelId("electron.app.PRODUCTIVITY_TIMER");

app.allowRendererProcessReuse = true;
