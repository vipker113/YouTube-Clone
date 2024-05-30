import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY } from '../../data';
import { value_converter } from '../../data';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
    const { videoId } = useParams();
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const [activeComment, setActiveComment] = useState(true);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url)
            .then((res) => res.json())
            .then((data) => setApiData(data.items[0]));
    };

    const fetchOrtherData = async () => {
        // Fetch Channel Data
        const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
            apiData ? apiData.snippet.channelId : ''
        }&key=${API_KEY}`;
        await fetch(channelDetails_url)
            .then((res) => res.json())
            .then((data) => {
                if (data.items) {
                    setChannelData(data.items[0]);
                }
            });

        // Fetch Comment Data
        const allComment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(allComment_url)
            .then((res) => res.json())
            .then((data) => setCommentData(data.items));
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        fetchOrtherData();
    }, [apiData]);

    return (
        <div className="play-video">
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe
                // src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
            <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>
            <div className="play-video-info">
                <p>
                    {value_converter(apiData ? apiData.statistics.viewCount : '0')} Views &bull;{' '}
                    {apiData ? moment(apiData.snippet.publishedAt).fromNow() : 'Today'}
                </p>
                <div className="">
                    <span>
                        <img src={like} alt="" />
                        {value_converter(apiData ? apiData.statistics.likeCount : 0)}
                    </span>
                    <span>
                        <img src={dislike} alt="" />
                        338
                    </span>
                    <span>
                        <img src={share} alt="" />
                        Share
                    </span>
                    <span>
                        <img src={save} alt="" />
                        Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="" />
                <div className="">
                    <p>{apiData ? apiData.snippet.channelTitle : 'Title Channel'}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : 0} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.localized.title : ''}</p>
                <p>{apiData ? apiData.snippet.localized.description : ''}</p>
                <hr />
                <h4 onClick={() => setActiveComment(!activeComment)}>
                    {apiData ? value_converter(apiData.statistics.commentCount) : '0'} Comments{' '}
                    <i className={`fa-solid fa-chevron-down ${activeComment === true ? 'rotate' : ''}`}></i>{' '}
                </h4>

                {/* Comment */}
                {activeComment === true ? (
                    commentData.map((item, index) => {
                        return (
                            <div key={index} className="comment">
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                                <div className="">
                                    <h3>
                                        {item.snippet.topLevelComment.snippet.authorDisplayName}{' '}
                                        <span>
                                            {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                                        </span>
                                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                        <div className="comment-action">
                                            <img src={like} alt="" />
                                            <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                            <img src={dislike} alt="" />
                                            <span>0</span>
                                        </div>
                                    </h3>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default PlayVideo;
