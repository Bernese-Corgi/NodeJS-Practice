import styled from 'styled-components';

export const ControllerWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  margin: 3em;
  padding: 3em;
  border: 1px solid #000000;
  border-radius: 2em;
`;

export const ControllerIconWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  margin-bottom: 3%;

  .middle {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  button {
    cursor: pointer;
  }

  .icon {
    transition: ease-in-out 300ms;
    border-radius: 50%;
    fill: #000000;
  }

  .play,
  .pause {
    width: 3.2em;
    height: 3.2em;
    padding: 0.6em;
  }

  .beforeSec,
  .afterSec {
    width: 2.2em;
    height: 2.2em;
    padding: 0.5em;
  }

  .prevSong,
  .nextSong {
    width: 2.8em;
    height: 2.8em;
    padding: 0.6em;
  }

  /* svg 위치 조정 */
  .play {
    svg {
      transform: translateX(8%);
    }
  }

  .beforeSec {
    svg {
      transform: translateX(-8%);
    }
  }

  .afterSec {
    svg {
      transform: translateX(8%);
    }
  }

  /* 버튼 호버 시 효과 */
  .icon:hover {
    background-color: #00000010;
  }

  .play:hover {
    background-color: #ffc93c90;
  }

  /* 버튼 클릭 시 효과 */
  .beforeSec:active {
    transform: translateX(-8%);
  }
  .afterSec:active {
    transform: translateX(8%);
  }

  .play:active,
  .pause:active,
  .prevSong:active,
  .nextSong:active {
    padding: 0.7em;
  }
`;

export const PlaySliderWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3%;

  .sliderText {
    font-size: 1.2em;
    color: #00000090;
  }
`;

export const VolumeSliderWrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 40%;

  .icon {
    width: 2.2em;
    height: 2.2em;
    margin-right: 2.2em;
  }
`;
