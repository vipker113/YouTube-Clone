import React, { useState, useRef } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { API_KEY } from '../../data';

const Navbar = ({ setSidebar }) => {
    const [valueSearch, setValueSearch] = useState('');
    const [dataSearch, setDataSearch] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null); // Ref để truy cập ô tìm kiếm

    let timerId;

    const handleSearchVideo = () => {
        navigate(`/video/${valueSearch}`);
    };

    const handleChange = async (event) => {
        const searchQuery = event.target.value;
        setValueSearch(searchQuery);
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=7&q=${searchQuery}&key=${API_KEY}`;
        clearTimeout(timerId);

        timerId = setTimeout(async () => {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => setDataSearch(data.items));
        }, 500);
    };

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    // const handleBlur = () => {
    //     // Chỉ ẩn kết quả gợi ý nếu không có focus vào ô tìm kiếm hoặc gợi ý
    //     if (!inputRef.current.contains(document.activeElement)) {
    //         setShowSuggestions(false);
    //     }
    // };

    const handleSuggestionClick = (title) => {
        setValueSearch(title);
        setDataSearch(title);
        console.log(title);
        setShowSuggestions(false); // Ẩn kết quả gợi ý sau khi chọn một gợi ý
        navigate(`/video/${title}`);
    };

    return (
        <nav className="flex-div">
            <div className="nav-left flex-div">
                <img className="menu-icon" onClick={() => setSidebar((prev) => !prev)} src={menu_icon} alt="" />
                <Link to={'/'}>
                    <img className="logo" src={logo} alt="" />
                </Link>
            </div>
            <div className="nav-middle flex-div">
                <div className="search-box flex-div" ref={inputRef}>
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        // onBlur={handleBlur}
                    />
                    <img onClick={handleSearchVideo} src={search_icon} alt="" />
                </div>
                {showSuggestions && dataSearch && valueSearch !== '' ? (
                    <div className="suggestion-box">
                        <ul>
                            {dataSearch.map((item, index) => (
                                <li onClick={() => handleSuggestionClick(item.snippet.title)} key={index}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    {item.snippet.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={profile_icon} className="user-icon" alt="" />
            </div>
        </nav>
    );
};

export default Navbar;
