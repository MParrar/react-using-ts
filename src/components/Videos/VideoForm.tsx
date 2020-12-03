import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Video } from './Video';
import { createVideo, getVideoById, updateVideo } from './VideoService';
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';
import { title } from 'process';

type inputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
    id?: string
}
export const VideoForm = () => {



    const history = useHistory();
    const params = useParams<Params>();
    const mom = Date.now();


    const getVideo = async (id: string) => {
        const res = await getVideoById(id);
        const { title, url, description } = res.data.videoFound;
        setVideo({ title, url, description });
    };

    useEffect(() => {
        if (params.id) getVideo(params.id);
    }, [params.id]);

    const initialState = {
        description: '',
        title: '',
        url: '',
        fecha: mom.toString()
    }

    // const {title,url,description} = initialState;

    const [video, setVideo] = useState<Video | any>(initialState);


    const handleInputChange = (e: inputChange) => {
        let ahora = new Date();
        setVideo({
            ...video,
            fecha: ahora.toString(),
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!params.id) {
            const resp = await createVideo(video);
            console.log(resp);
            toast.success('New Video added');
        } else {
            await updateVideo(params.id, video);
            toast.success('Video updated');
        }

        history.push('/');
    }


    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>New video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    name="title"
                                    placeholder="Write a title for this vide"
                                    className="form-control"
                                    value={video.title}
                                    onChange={handleInputChange}
                                    autoFocus />
                            </div>
                            <div className="form-group">
                                <input type="text"
                                    name="url"
                                    value={video.url}
                                    onChange={handleInputChange}

                                    placeholder="https://somesite.com"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <textarea name="description"
                                    rows={2}
                                    value={video.description}
                                    className="form-control"
                                    onChange={handleInputChange}
                                    placeholder="Write a description"></textarea>
                            </div>
                            {
                                params.id ?
                                    <button className="btn btn-info">Update Video</button>
                                    :
                                    <button className="btn btn-primary">Create Video</button>

                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
