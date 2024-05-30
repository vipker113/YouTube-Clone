import React, { useEffect, useState } from 'react';
import './SearchVideo.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_KEY } from '../../data';
import moment from 'moment/moment';
const SearchVideo = ({ sidebar }) => {
    const { dataSearch, categoryId } = useParams();
    const [dataAPI, setDataAPI] = useState(null);
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const fetchVideoSeach = async () => {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${dataSearch}&key=${API_KEY}`;
        await fetch(url)
            .then((res) => res.json())
            .then((data) => setDataAPI(data.items));
    };

    const handleCategory = async (idvideo) => {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${idvideo}&key=${API_KEY}`;
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // setCategory(data.items[0].snippet.categoryId);
                navigate(`/video/${data.items[0].snippet.categoryId}/${idvideo}`);
            });
    };

    useEffect(() => {
        fetchVideoSeach();
    }, [dataSearch]);

    return (
        <>
            <Sidebar sidebar={sidebar} />
            <div className={`container ${sidebar ? '' : 'large-container'}`}>
                <div className="notify">
                    <p>
                        Search results for "<b>{dataSearch}</b>" ( total <b>25</b> results )
                    </p>
                </div>
                <div className="search-result">
                    {dataAPI ? (
                        dataAPI.map((item, index) => {
                            return (
                                <Link key={index} className="card" onClick={() => handleCategory(item.id.videoId)}>
                                    <div className="card-left">
                                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                                    </div>
                                    <div className="card-right">
                                        <h2>{item.snippet.title}</h2>
                                        <h3>{item.snippet.channelTitle}</h3>
                                        <p>192K Views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                                        <p className="descrp">{item.snippet.description}</p>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchVideo;
