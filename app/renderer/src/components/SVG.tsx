import React from "react";
import {
	BonfireSVG,
	ConfigSVG,
	PauseSVG,
	PlaySVG,
	ProgressSVG,
	ResetSVG,
	SettingsSVG,
	TaskSVG,
	SkipSVG,
	TimerSVG,
	VolumeMuteSVG,
	VolumeOnSVG,
	ExternalSVG,
	OptionXSVG,
	HeadsetSVG,
	CafeSVG,
	AddSVG,
	PencilSVG,
	SaveSVG,
	TrashSVG,
	CloseSVG,
	FastFoodSVG,
	RefreshSVG,
	ChevronDownSVG,
	OptionYSVG,
	AlertSVG,
} from "assets/icons";

export type SVGTypes = {
	name:
		| "bonfire"
		| "headset"
		| "cafe"
		| "config"
		| "option-x"
		| "option-y"
		| "pause"
		| "play"
		| "progress"
		| "reset"
		| "settings"
		| "skip"
		| "task"
		| "timer"
		| "volume-mute"
		| "volume-on"
		| "external"
		| "add"
		| "pencil"
		| "save"
		| "trash"
		| "close"
		| "fast-food"
		| "refresh"
		| "alert"
		| "chevron-down";
};

const SVG: React.FC<SVGTypes> = ({ name }) => {
	switch (name) {
		case "bonfire":
			return <BonfireSVG />;
		case "headset":
			return <HeadsetSVG />;
		case "cafe":
			return <CafeSVG />;
		case "config":
			return <ConfigSVG />;
		case "option-x":
			return <OptionXSVG />;
		case "option-y":
			return <OptionYSVG />;
		case "pause":
			return <PauseSVG />;
		case "play":
			return <PlaySVG />;
		case "progress":
			return <ProgressSVG />;
		case "reset":
			return <ResetSVG />;
		case "settings":
			return <SettingsSVG />;
		case "skip":
			return <SkipSVG />;
		case "task":
			return <TaskSVG />;
		case "timer":
			return <TimerSVG />;
		case "volume-mute":
			return <VolumeMuteSVG />;
		case "volume-on":
			return <VolumeOnSVG />;
		case "external":
			return <ExternalSVG />;
		case "add":
			return <AddSVG />;
		case "pencil":
			return <PencilSVG />;
		case "save":
			return <SaveSVG />;
		case "trash":
			return <TrashSVG />;
		case "close":
			return <CloseSVG />;
		case "fast-food":
			return <FastFoodSVG />;
		case "refresh":
			return <RefreshSVG />;
		case "alert":
			return <AlertSVG />;
		case "chevron-down":
			return <ChevronDownSVG />;
		default:
			return <TimerSVG />;
	}
};

export default React.memo(SVG);
