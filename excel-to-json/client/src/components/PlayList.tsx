import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import YoutubePlayer from './YoutubePlayer';

interface PlayListProps {}

const PlayList = ({}: PlayListProps) => {
  const [videoList, setVideoList] = useState<any[]>();

  const getAllPlaylist = async () => {
    try {
      // TODO 가져오는 개수 제한
      const res = await axios.get('/api/allPlaylist');
      setVideoList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllPlaylist();
  }, []);

  const filteredList = videoList?.filter((video, i) => i < 11 && video);

  if (!videoList) return null;

  return (
    <>
      <ul>
        {filteredList?.map((video, i) => (
          <li key={i}>{video.Title}</li>
        ))}
      </ul>
      <YoutubePlayer videoList={videoList} />
    </>
  );
};

export default PlayList;
