import React, { useEffect, useState } from 'react';
import { Video } from './Video';
import { VideoItem } from './VideoItem';
import * as videoService from './VideoService';



export const VideoList = () => {

    const [videos, setVideos] = useState<Video[]>([]);

    const loadVideos = async () => {
        const res = await videoService.getVideos();
        const formatet = res.data.videos.map((video: Video) => {
            return {
                ...video,
                fecha: video.fecha ? new Date(video.fecha) : new Date(),

            };
        })
            .sort((a: any, b: any) => b.fecha.getTime() - a.fecha.getTime());

        setVideos(formatet);




    }

    useEffect(() => {
        loadVideos();

    }, [])


    return (
        <div>
            <div className="row">
                {videos.map((video) => {
                    return <VideoItem video={video} key={video._id} loadVideos={loadVideos} />
                })}
            </div>
        </div>
    )
}
