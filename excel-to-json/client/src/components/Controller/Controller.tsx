import React from 'react';
import IconButton from '../Icon/IconButton';
import {
  ControllerIconWrapper,
  ControllerWrapper,
  PlaySliderWrapper,
  VolumeSliderWrapper,
} from './Controller.styled';
import { StyledSlider } from '../Slider.styled';
import Icon from '../Icon/Icon';

interface ControllerProps {
  controlConfig: {
    playing: boolean;
    duration: number;
    playedTime: number;
    volumn: number;
  };
  onControl;
}

const Controller = ({
  controlConfig: { playing, duration, playedTime, volumn },
  onControl,
}: ControllerProps) => {
  // 재생 진행도 계산
  const valueLabelFormat = (value: number) => {
    const min = Math.floor(value / 60);
    const sec = value % 60 >= 10 ? value % 60 : '0' + (value % 60);
    return `${min}:${sec}`;
  };

  return (
    <ControllerWrapper className="controlerWrapper">
      <PlaySliderWrapper>
        <StyledSlider
          min={0}
          max={duration}
          value={playedTime}
          onChange={onControl.playedTime}
          // valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          // labelColor="#000000"
          colorTheme="#000000"
        />

        <span className="sliderText">{valueLabelFormat(playedTime)}</span>
        <span className="sliderText">
          -{valueLabelFormat(duration - playedTime)}
        </span>
      </PlaySliderWrapper>
      <ControllerIconWrapper>
        <IconButton
          className="icon prevSong"
          title="이전곡"
          shape="backward-step-solid"
          onClick={onControl.prevSong}
        />
        <div className="middle">
          <IconButton
            className="icon beforeSec"
            title="5초 전으로"
            shape="backward-solid"
            onClick={onControl.beforeSec}
          />
          <IconButton
            className={`icon ${playing ? 'pause' : 'play'}`}
            title={playing ? '멈춤' : '재생'}
            shape={playing ? 'pause-solid' : 'play-solid'}
            onClick={playing ? onControl.pause : onControl.play}
          />
          <IconButton
            className="icon afterSec"
            title="5초 앞으로"
            shape="forward-solid"
            onClick={onControl.afterSec}
          />
        </div>
        <IconButton
          title="다음곡"
          className="icon nextSong"
          shape="forward-step-solid"
          onClick={onControl.nextSong}
        />
      </ControllerIconWrapper>
      <VolumeSliderWrapper>
        {volumn === 0 ? (
          <Icon className="icon volume-none" shape="volume-xmark-solid" />
        ) : (
          <Icon className="icon volume-down" shape="volume-high-solid" />
        )}
        <StyledSlider
          min={0}
          max={100}
          value={volumn}
          onChange={onControl.volumn}
          colorTheme="#000000"
        />
      </VolumeSliderWrapper>
    </ControllerWrapper>
  );
};

export default Controller;
