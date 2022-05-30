import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import IconButton from './Icon/IconButton';
import './YoutubePlayer.css';

const Wrapper = () => <section className="youtubePlayerSection"></section>;

interface YoutubePlayerProps {}

const YoutubePlayer = ({}: YoutubePlayerProps) => {
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

  const [videoList, setVideoList] = useState<any[]>();
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

  const getAllPlaylist = async () => {
    try {
      const res = await axios.get('/api/allPlaylist');
      setVideoList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllPlaylist();
  }, []);

  // 다음 곡으로 넘어감
  useEffect(() => {
    videoList && setVideoInfo(videoList[currentId]);
  }, [currentId, videoList]);

  // 날짜
  useEffect(() => {
    const date = new Date(PublishedDate);
    setDate(
      `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    );
  }, [PublishedDate]);

  useEffect(() => {
    if (!Description) return;

    const tagList = Description.match(/(#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*)/g);
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
            <label id="playProgress">재생 진행도 </label>
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
              title="5초 전으로"
              shape="arrow-rotate-left-solid"
              onClick={handleClickControl.beforeSec}
            />
            <span className="playAndSkip">
              <IconButton
                className="prevSong"
                title="이전곡"
                shape="backward-step-solid"
                onClick={handleClickControl.prevSong}
              />
              <IconButton
                className={playing ? 'pause' : 'play'}
                title={playing ? '멈춤' : '재생'}
                shape={playing ? 'pause-solid' : 'play-solid'}
                onClick={handleClickControl.playOrPause}
              />
              <IconButton
                title="다음곡"
                className="nextSong"
                shape="forward-step-solid"
                // TODO 마지막 곡일때 예외처리
                onClick={handleClickControl.nextSong}
              />
            </span>
            <IconButton
              className="afterSec"
              title="5초 앞으로"
              shape="arrow-rotate-right-solid"
              onClick={handleClickControl.afterSec}
            />
          </div>

          <div className="volume-control">
            <label id="volumeRange">볼륨</label>
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
            <span>아티스트의 한마디</span>
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
