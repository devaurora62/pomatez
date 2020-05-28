import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  setPlay,
  skipTimer,
  setRound,
  setTimerType,
  STAY_FOCUS,
  SHORT_BREAK,
  LONG_BREAK,
  SPECIAL_BREAK,
  togglenotificationSoundOn,
  SettingTypes,
} from "store";
import {
  StyledControl,
  StyledControlMain,
  StyledStrictIndicator,
  StyledLockIndicator,
} from "styles";
import { SVG } from "components";

import Sessions from "./Sessions";
import ResetButton from "./ResetButton";
import PlayButton from "./PlayButton";
import SkipButton from "./SkipButton";
import VolumeButton from "./VolumeButton";

type Props = {
  resetTimerAction: () => void;
};

const Control: React.FC<Props> = ({ resetTimerAction }) => {
  const { timer, config } = useSelector((state: AppStateTypes) => ({
    timer: state.timer,
    config: state.config,
  }));

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const dispatch = useDispatch();

  const onResetCallback = useCallback(() => {
    if (timer.playing && settings.enableStrictMode) return;
    resetTimerAction();
  }, [resetTimerAction, timer.playing, settings.enableStrictMode]);

  const onPlayCallback = useCallback(() => {
    if (timer.playing && settings.enableStrictMode) return;
    dispatch(setPlay());
  }, [dispatch, timer.playing, settings.enableStrictMode]);

  const onNotifacationSoundCallback = useCallback(() => {
    dispatch(togglenotificationSoundOn());
  }, [dispatch]);

  const onSkipAction = useCallback(() => {
    if (timer.playing && settings.enableStrictMode) return;

    switch (timer.timerType) {
      case STAY_FOCUS:
        if (timer.round < config.sessionRounds) {
          dispatch(skipTimer("SHORT_BREAK"));
        } else {
          dispatch(skipTimer("LONG_BREAK"));
        }
        if (!timer.playing) dispatch(setPlay());
        break;

      case SHORT_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        dispatch(setRound(timer.round + 1));
        if (!timer.playing) dispatch(setPlay());
        break;

      case LONG_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        dispatch(setRound(1));
        if (!timer.playing) dispatch(setPlay());
        break;

      case SPECIAL_BREAK:
        dispatch(skipTimer("STAY_FOCUS"));
        if (!timer.playing) dispatch(setPlay());
        break;
    }
  }, [
    dispatch,
    timer.round,
    timer.playing,
    timer.timerType,
    settings.enableStrictMode,
    config.sessionRounds,
  ]);

  const onResetSessionCallback = useCallback(() => {
    dispatch(setTimerType("STAY_FOCUS"));
    dispatch(setRound(1));
  }, [dispatch]);

  return (
    <StyledControl type={timer.timerType}>
      <Sessions
        timerType={timer.timerType}
        round={timer.round}
        sessionRounds={config.sessionRounds}
        onClick={onResetSessionCallback}
      />

      <StyledControlMain>
        <ResetButton onClick={onResetCallback} />
        <PlayButton playing={timer.playing} onClick={onPlayCallback} />
        <SkipButton onClick={onSkipAction} />
        <VolumeButton
          soundOn={settings.notificationSoundOn}
          onClick={onNotifacationSoundCallback}
        />
      </StyledControlMain>

      {settings.enableStrictMode && !settings.isSettingLock && (
        <StyledStrictIndicator>
          <SVG name="hand" />
        </StyledStrictIndicator>
      )}

      {settings.isSettingLock && (
        <StyledLockIndicator>
          <SVG name="lock" />
        </StyledLockIndicator>
      )}
    </StyledControl>
  );
};

export default React.memo(Control);
