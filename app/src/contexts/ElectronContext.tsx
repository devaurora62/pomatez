import React, { useCallback, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import isElectron from "is-electron";

import { AppStateTypes, SettingTypes } from "store";
import { CounterContext } from "./CounterContext";
import { TraySVG } from "components";
import { encodeSvg } from "utils";

const SET_ALWAYS_ON_TOP = "SET_ALWAYS_ON_TOP";
const SET_FULLSCREEN_BREAK = "SET_FULLSCREEN_BREAK";
const SET_NATIVE_TITLEBAR = "SET_NATIVE_TITLEBAR";
const TRAY_ICON_UPDATE = "TRAY_ICON_UPDATE";
const SET_UI_THEME = "SET_UI_THEME";
const SET_MINIMIZE = "SET_MINIMIZE";
const SET_CLOSE = "SET_CLOSE";
const SET_SHOW = "SET_SHOW";

type ElectronProps = {
  onMinimizeCallback?: () => void;
  onExitCallback?: () => void;
  openExternalCallback?: () => void;
};

const ElectronContext = React.createContext<ElectronProps>({});

const ElectronProvider: React.FC = ({ children }) => {
  const { electron } = window;

  const timer = useSelector((state: AppStateTypes) => state.timer);

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const { count, duration, timerType, shouldFullscreen } = useContext(
    CounterContext
  );
  const dashOffset = (duration - count) * (64 / duration);

  const onMinimizeCallback = useCallback(() => {
    if (isElectron()) {
      electron.send(SET_MINIMIZE, {
        minimizeToTray: settings.minimizeToTray,
      });
    }
  }, [electron, settings.minimizeToTray]);

  const onExitCallback = useCallback(() => {
    if (isElectron()) {
      electron.send(SET_CLOSE, {
        closeToTray: settings.closeToTray,
      });
    }
  }, [electron, settings.closeToTray]);

  const openExternalCallback = useCallback(() => {
    if (isElectron()) {
      const links = document.querySelectorAll("a");

      Array.prototype.forEach.call(links, (link: HTMLAnchorElement) => {
        const url = link.getAttribute("href");
        if (url?.indexOf("http") === 0) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            electron.openExternal(url);
          });
        }
      });
    }
  }, [electron]);

  useEffect(() => {
    if (isElectron() && !settings.enableFullscreenBreak) {
      electron.send(SET_SHOW);
    }
  }, [electron, timer.timerType, settings.enableFullscreenBreak]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_ALWAYS_ON_TOP, {
        alwaysOnTop: settings.alwaysOnTop,
      });
    }
  }, [electron, settings.alwaysOnTop]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_FULLSCREEN_BREAK, {
        shouldFullscreen,
        alwaysOnTop: settings.alwaysOnTop,
      });
    }
  }, [electron, settings.alwaysOnTop, shouldFullscreen]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_UI_THEME, {
        isDarkMode: settings.enableDarkTheme,
      });
    }
  }, [electron, settings.enableDarkTheme]);

  useEffect(() => {
    if (isElectron()) {
      electron.send(SET_NATIVE_TITLEBAR, {
        useNativeTitlebar: settings.useNativeTitlebar,
      });
    }
  }, [electron, settings.useNativeTitlebar]);

  useEffect(() => {
    if (isElectron() && timer.playing) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 32;
      canvas.height = 32;

      let svgXML = encodeSvg(
        <TraySVG timerType={timerType} dashOffset={dashOffset} />
      );

      const img = new Image();
      img.src = svgXML;

      img.onload = function () {
        ctx?.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");

        electron.send(TRAY_ICON_UPDATE, dataUrl);
      };
    }
  }, [electron, timer.playing, timerType, dashOffset]);

  return (
    <ElectronContext.Provider
      value={{
        onMinimizeCallback,
        onExitCallback,
        openExternalCallback,
      }}
    >
      {children}
    </ElectronContext.Provider>
  );
};

export { ElectronContext, ElectronProvider };
