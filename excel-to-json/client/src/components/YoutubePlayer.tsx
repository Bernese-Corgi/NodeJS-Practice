import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import IconButton from './Icon/IconButton';
import './YoutubePlayer.css';

const Wrapper = () => <section className="youtubePlayerSection"></section>;

interface YoutubePlayerProps {
  videoList;
}

const YoutubePlayer = ({ videoList }: YoutubePlayerProps) => {
  /* ------------------------- video information state ------------------------ */
  interface VideoInfo {
    PublishedDate: string;
    VideoURL: string;
    Title: string;
    Description: string;
  }

  const initialVideoInfo = {
    PublishedDate: '',
    VideoURL: '',
    Title: '',
    Description: '',
  };

  const [videoInfo, setVideoInfo] = useState<VideoInfo>(initialVideoInfo);
  const [date, setDate] = useState<string>('');
  const [tags, setTags] = useState<string[] | null>(null);
  const [currentId, setCurrentId] = useState<number>(0);

  const { PublishedDate, VideoURL, Title, Description } = videoInfo;

  /* ----------------------------- component state ---------------------------- */
  const [hasDescription, setHasDescription] = useState<boolean>(false);

  /* ---------------------------- controller state ---------------------------- */
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(20);
  const [playedTime, setPlayedTime] = useState<number>(0);
  const [totalPlayTime, setTotalPlayTime] = useState<number>(0);
  // const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);
  const SKIP_SEC = 5;

  const handlePlayer = {
    onDuration: duration => setTotalPlayTime(duration),
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    // onBuffer: () => setIsBuffering(true),
    // onBufferEnd: () => setIsBuffering(false),
    onEnded: () => setCurrentId(prev => prev + 1),
  };

  const handleClickControl = {
    beforeSec: () => {
      if (playedTime === 0) {
        return;
      } else if (playedTime < 5) {
        playerRef.current?.seekTo(0);
        setPlayedTime(0);
      } else {
        playerRef.current?.seekTo(playedTime - 5);
        setPlayedTime(prev => prev - 5);
      }
    },
    afterSec: () => {
      playerRef.current?.seekTo(playedTime + 5);
      setPlayedTime(prev => prev + 5);
    },
    playOrPause: () => setPlaying(prev => !prev),
    prevSong: () => setCurrentId(prev => (prev === 0 ? 0 : prev - 1)),
    nextSong: () => setCurrentId(prev => prev + 1),
  };

  // ?????? ????????? ?????????
  useEffect(() => {
    videoList && setVideoInfo(videoList[currentId]);
  }, [currentId, videoList]);

  // ??????
  useEffect(() => {
    const date = new Date(PublishedDate);
    setDate(
      `${date.getFullYear()}??? ${date.getMonth() + 1}??? ${date.getDate()}???`
    );
  }, [PublishedDate]);

  useEffect(() => {
    if (!Description) return;

    const tagList = Description.match(/(#[\d|A-Z|a-z|???-???|???-???|???-???]*)/g);
    tagList ? setTags(tagList) : setTags(null);
  }, [Description, currentId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playerRef.current) {
        setPlayedTime(Math.floor(playerRef.current.getCurrentTime()));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="youtubePlayerSection">
        {/* title --------------------------------- */}
        <h3 className="title">{Title}</h3>

        <div className="playerSection">
          {/* player --------------------------------- */}
          <div className="playerWrapper">
            <ReactPlayer
              ref={playerRef}
              /* props --------------------------------- */
              className="reactPlayer"
              width="100%"
              height="100%"
              url={VideoURL}
              // controls
              playing={playing}
              volume={volume * 0.01}
              // pip
              /* event --------------------------------- */
              // onEnablePIP={() => console.log('EnablePIP')}
              onDuration={handlePlayer.onDuration}
              onPlay={handlePlayer.onPlay}
              onPause={handlePlayer.onPause}
              // onBuffer={handlePlayer.onBuffer}
              // onBufferEnd={handlePlayer.onBufferEnd}
              onEnded={handlePlayer.onEnded}
            />
          </div>
        </div>

        {/* controller ------------------------------ */}
        <div className="controller">
          <div className="progress-control">
            <label id="playProgress">?????? ????????? </label>
            <span>{Math.floor(playedTime / 60)}</span>
            <span> : </span>
            <span>
              {playedTime % 60 > 10 ? playedTime % 60 : '0' + (playedTime % 60)}
            </span>
            <span> / </span>
            <span>{Math.floor(totalPlayTime / 60)}</span>
            <span> : </span>
            <span>
              {totalPlayTime % 60 > 10
                ? totalPlayTime % 60
                : '0' + (totalPlayTime % 60)}
            </span>
            <input
              type="range"
              name=""
              id="playProgress"
              max={totalPlayTime}
              value={playedTime}
              onChange={e => {
                console.log(e.target.value);
                setPlayedTime(Number(e.target.value));
                playerRef.current?.seekTo(Number(e.target.value));
                setPlaying(true);
              }}
              style={{ width: '100%' }}
            />
          </div>

          <div className="player-control">
            <IconButton
              className="beforeSec"
              title="5??? ?????????"
              shape="arrow-rotate-left-solid"
              onClick={handleClickControl.beforeSec}
            />
            <span className="playAndSkip">
              <IconButton
                className="prevSong"
                title="?????????"
                shape="backward-step-solid"
                onClick={handleClickControl.prevSong}
              />
              <IconButton
                className={playing ? 'pause' : 'play'}
                title={playing ? '??????' : '??????'}
                shape={playing ? 'pause-solid' : 'play-solid'}
                onClick={handleClickControl.playOrPause}
              />
              <IconButton
                title="?????????"
                className="nextSong"
                shape="forward-step-solid"
                // TODO ????????? ????????? ????????????
                onClick={handleClickControl.nextSong}
              />
            </span>
            <IconButton
              className="afterSec"
              title="5??? ?????????"
              shape="arrow-rotate-right-solid"
              onClick={handleClickControl.afterSec}
            />
          </div>

          <div className="volume-control">
            <label id="volumeRange">??????</label>
            <input
              type="range"
              id="volumeRange"
              min="0"
              max="100"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
            />
          </div>
        </div>

        {/* information ------------------------------ */}
        {/* {hasDescription && ( */}
        <div className={`information ${hasDescription && 'activeInfo'}`}>
          {/* tags ---------------------------------- */}
          <div className="subInfo">
            {tags && (
              <ul className="tags">
                {tags.map((tag, i) => (
                  <li key={i} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <p className="date">{date}</p>
          </div>

          <p className="description">
            <span>??????????????? ?????????</span>
            <span className="descriptionContent">{Description}</span>
          </p>
        </div>
        {/* )} */}
        <IconButton
          className={`${hasDescription ? 'close' : 'open'} descriptionButton`}
          title=""
          shape="angles-down-solid"
          onClick={() => setHasDescription(prev => !prev)}
        />
        <div className={`dim ${hasDescription && 'activeDim'}`}></div>
      </section>
    </>
  );
};

export default YoutubePlayer;
