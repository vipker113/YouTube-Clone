import React, { useState, useEffect } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link, useParams } from 'react-router-dom';
const Recommended = () => {
    const { categoryId, videoId } = useParams();
    const [apiData, setApiData] = useState([]);

    const fetchApiData = async () => {
        const videoData_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(videoData_url)
            .then((res) => res.json())
            .then((data) => setApiData(data.items));
    };

    useEffect(() => {
        fetchApiData();
    }, [categoryId]);

    return (
        <div className="recommended">
            {apiData.map((item, index) => {
                if (item.id === videoId) {
                    return null;
                }
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Recommended;
