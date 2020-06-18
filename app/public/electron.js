"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var helpers_1 = require("./helpers");
var store_1 = __importDefault(require("./store"));
require("v8-compile-cache");
var onProduction = electron_1.app.isPackaged;
var trayIcon = path_1.default.join(__dirname, "../src/assets/logos/tray-dark.png");
var onlySingleIntance = electron_1.app.requestSingleInstanceLock();
var win;
electron_1.Menu.setApplicationMenu(null);
var hasFrame = store_1.default.get("useNativeTitlebar") || false;
function createMainWindow() {
    win = new electron_1.BrowserWindow({
        width: 340,
        height: 500,
        resizable: false,
        maximizable: false,
        show: false,
        frame: hasFrame,
        icon: helpers_1.getIcon(),
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            backgroundThrottling: false,
            preload: path_1.default.join(__dirname, "preload.js"),
        },
    });
    win.loadURL(!onProduction
        ? "http://localhost:3000"
        : "file://" + path_1.default.join(__dirname, "index.html"));
    win.once("ready-to-show", function () {
        win === null || win === void 0 ? void 0 : win.show();
    });
    win.on("closed", function () {
        win = null;
    });
}
if (!onlySingleIntance) {
    electron_1.app.quit();
}
else {
    electron_1.app.on("second-instance", function () {
        if (win) {
            if (win.isMinimized()) {
                win.restore();
            }
            else if (!win.isVisible()) {
                win.show();
            }
            else {
                win.focus();
            }
        }
    });
    electron_1.app.on("ready", function () {
        createMainWindow();
        var tray = helpers_1.createSystemTray({
            icon: trayIcon,
            template: [
                {
                    label: "Quit",
                    role: "quit",
                },
            ],
        });
        tray.on("click", function () {
            if (!(win === null || win === void 0 ? void 0 : win.isVisible())) {
                win === null || win === void 0 ? void 0 : win.show();
            }
            else {
                if (!(win === null || win === void 0 ? void 0 : win.isFullScreen())) {
                    win === null || win === void 0 ? void 0 : win.hide();
                }
            }
        });
        if (onProduction) {
            if (win) {
                var blockKeys = [
                    "CommandOrControl+R",
                    "CommandOrControl+Shift+R",
                    "CommandOrControl+Alt+Q",
                    "F11",
                ];
                helpers_1.blockShortcutKeys(win, blockKeys);
            }
        }
        helpers_1.activateGlobalShortcuts([
            {
                key: "Alt+Shift+H",
                callback: function () {
                    win === null || win === void 0 ? void 0 : win.hide();
                },
            },
            {
                key: "Alt+Shift+S",
                callback: function () {
                    win === null || win === void 0 ? void 0 : win.show();
                },
            },
        ]);
        var autoUpdater = helpers_1.activateAutoUpdate({});
        electron_1.ipcMain.on(helpers_1.SET_ALWAYS_ON_TOP, function (e, _a) {
            var alwaysOnTop = _a.alwaysOnTop;
            win === null || win === void 0 ? void 0 : win.setAlwaysOnTop(alwaysOnTop);
        });
        electron_1.ipcMain.on(helpers_1.SET_FULLSCREEN_BREAK, function (e, args) {
            var shouldFullscreen = args.shouldFullscreen, alwaysOnTop = args.alwaysOnTop;
            if (shouldFullscreen) {
                win === null || win === void 0 ? void 0 : win.show();
                win === null || win === void 0 ? void 0 : win.focus();
                win === null || win === void 0 ? void 0 : win.setAlwaysOnTop(true, "screen-saver");
                win === null || win === void 0 ? void 0 : win.setSkipTaskbar(true);
                win === null || win === void 0 ? void 0 : win.setFullScreen(true);
                win === null || win === void 0 ? void 0 : win.setVisibleOnAllWorkspaces(true);
                electron_1.globalShortcut.unregister("Alt+Shift+H");
                if (!(win === null || win === void 0 ? void 0 : win.isVisible())) {
                    win === null || win === void 0 ? void 0 : win.show();
                    win === null || win === void 0 ? void 0 : win.focus();
                }
            }
            else {
                win === null || win === void 0 ? void 0 : win.setAlwaysOnTop(alwaysOnTop, "screen-saver");
                win === null || win === void 0 ? void 0 : win.setSkipTaskbar(false);
                win === null || win === void 0 ? void 0 : win.setFullScreen(false);
                win === null || win === void 0 ? void 0 : win.setVisibleOnAllWorkspaces(false);
                electron_1.globalShortcut.register("Alt+Shift+H", function () {
                    win === null || win === void 0 ? void 0 : win.hide();
                });
                if (win === null || win === void 0 ? void 0 : win.isFullScreen())
                    win === null || win === void 0 ? void 0 : win.setFullScreen(false);
            }
        });
        electron_1.ipcMain.on(helpers_1.SET_UI_THEME, function (e, _a) {
            var isDarkMode = _a.isDarkMode;
            var backgroundColor = isDarkMode ? "#141e25" : "#fff";
            win === null || win === void 0 ? void 0 : win.setBackgroundColor(backgroundColor);
        });
        electron_1.ipcMain.on(helpers_1.SET_NATIVE_TITLEBAR, function (e, _a) {
            var useNativeTitlebar = _a.useNativeTitlebar;
            if (hasFrame !== useNativeTitlebar) {
                store_1.default.set("useNativeTitlebar", useNativeTitlebar);
                electron_1.app.relaunch();
                electron_1.app.exit();
            }
        });
        electron_1.ipcMain.on(helpers_1.SET_MINIMIZE, function () {
            win === null || win === void 0 ? void 0 : win.minimize();
        });
        electron_1.ipcMain.on(helpers_1.SET_HIDE, function () {
            win === null || win === void 0 ? void 0 : win.hide();
        });
    });
}
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (win === null) {
        createMainWindow();
    }
});
electron_1.app.on("will-quit", function () {
    electron_1.globalShortcut.unregisterAll();
});
electron_1.app.setLoginItemSettings({ openAtLogin: true });
electron_1.app.setAppUserModelId("electron.app.PRODUCTIVITY_TIMER");
electron_1.app.allowRendererProcessReuse = true;
