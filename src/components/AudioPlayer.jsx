import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaForward, FaBackward, FaShareAlt, FaVolumeUp, FaVolumeDown, FaCog } from 'react-icons/fa'; 

const songsList = [
  { id: 1, title: "Sajani re", artist: "Arijit Singh", artistImage: "assets/arijitSingh.jpeg", src: "assets/beat1.mp3", rating: 0 },
  { id: 2, title: "Shape Of You", artist: "Ed Sheeran", artistImage: "assets/edSheeran.jpeg", src: "assets/beat2.mp3", rating: 0 },
];

const AudioPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [ratings, setRatings] = useState(songsList.map(song => song.rating));
  const [volume, setVolume] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown

  const currentSong = songsList[currentSongIndex];

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    
    const waveformHeight = isSmallScreen ? 40 : 70;
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#fff',
      progressColor: '#00A4E4',
      height: waveformHeight,
    });

    wavesurferRef.current.load(currentSong.src);
    wavesurferRef.current.setVolume(volume);

    wavesurferRef.current.on('finish', () => {
      nextSong();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [isSmallScreen]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.load(currentSong.src);
      wavesurferRef.current.on('ready', () => {
        if (isPlaying) {
          wavesurferRef.current.play();
        }
      });
    }
  }, [currentSong.src]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const togglePlayPause = () => {
    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const increaseVolume = () => {
    setVolume(prevVolume => {
      let newVolume = Math.min(prevVolume + 0.1, 1);
      if (wavesurferRef.current) {
        wavesurferRef.current.setVolume(newVolume);
      }
      return newVolume;
    });
  };

  const decreaseVolume = () => {
    setVolume(prevVolume => {
      let newVolume = Math.max(prevVolume - 0.1, 0);
      if (wavesurferRef.current) {
        wavesurferRef.current.setVolume(newVolume);
      }
      return newVolume;
    });
  };

  const forward = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.skip(10);
    }
  };

  const backward = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.skip(-10);
    }
  };

  const handleSpeed = (speed) => {
    setPlaybackRate(speed);
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(speed);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex < songsList.length - 1 ? prevIndex + 1 : 0
    );

    if (wavesurferRef.current) {
      wavesurferRef.current.load(songsList[(currentSongIndex + 1) % songsList.length].src);
      const playPromise = wavesurferRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => console.error("Playback failed:", error));
      }
    }
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : songsList.length - 1
    );

    if (wavesurferRef.current) {
      wavesurferRef.current.load(songsList[(currentSongIndex - 1 + songsList.length) % songsList.length].src);
      wavesurferRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleWaveformClick = (e) => {
    const bounds = waveformRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(percentage);
      if (!isPlaying) {
        togglePlayPause();
      }
    }
  };

  const shareSong = () => {
    const shareData = {
      title: currentSong.title,
      text: `Check out this song by ${currentSong.artist}: ${currentSong.title}`,
      url: window.location.href,
    };

    navigator.share(shareData)
      .then(() => console.log('Share successful'))
      .catch((error) => console.error('Error sharing:', error));
  };

  const handleRatingChange = (index, newRating) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = newRating;
    setRatings(updatedRatings);
  };

  return (
    <div style={{ width: "100%" }} className="fixed bottom-0 left-0 right-0 mx-auto bg-black text-white shadow-lg text-center pb-4 z-40">
      {/* Top bar for small screens */}
      {isSmallScreen && (
        <div className="flex items-center justify-between px-2 py-1 border-b border-gray-800">
          {/* Options Section - Left */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="bg-dark-brown text-white p-1 rounded text-sm"
            >
              <FaCog size={16} />
            </button>
            {dropdownOpen && (
              <div 
                ref={dropdownRef} 
                className="absolute z-50 bg-black text-white rounded shadow-lg left-0 top-full mt-1"
                style={{
                  minWidth: '120px',
                  border: '1px solid #333'
                }}
              >
                <div className="flex flex-col items-start p-1">
                  <div className="flex w-full space-x-1 mb-1">
                    <button onClick={decreaseVolume} className="flex-1 p-1 hover:bg-electric-blue rounded">
                      <FaVolumeDown size={14} />
                    </button>
                    <button onClick={increaseVolume} className="flex-1 p-1 hover:bg-electric-blue rounded">
                      <FaVolumeUp size={14} />
                    </button>
                  </div>
                  <div className="flex w-full space-x-1">
                    <button 
                      onClick={() => handleSpeed(0.75)} 
                      className={`flex-1 px-1 py-0.5 rounded text-xs ${playbackRate === 0.75 ? "bg-electric-blue" : ""}`}
                    >
                      0.75x
                    </button>
                    <button 
                      onClick={() => handleSpeed(1)} 
                      className={`flex-1 px-1 py-0.5 rounded text-xs ${playbackRate === 1 ? "bg-electric-blue" : ""}`}
                    >
                      1x
                    </button>
                    <button 
                      onClick={() => handleSpeed(1.25)} 
                      className={`flex-1 px-1 py-0.5 rounded text-xs ${playbackRate === 1.25 ? "bg-electric-blue" : ""}`}
                    >
                      1.25x
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Share Button - Center */}
          <button onClick={shareSong} className="bg-dark-brown text-white p-1 rounded hover:bg-electric-blue">
            <FaShareAlt size={16} />
          </button>

          {/* Stars - Right */}
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                onClick={() => handleRatingChange(currentSongIndex, star)}
                style={{ cursor: 'pointer', color: star <= ratings[currentSongIndex] ? 'gold' : 'gray', fontSize: '16px' }}
                className="px-0.5"
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex items-center mt-2 justify-between">
      <div className="flex items-center  ml-2 mb-2 md:mb-0">
  <div className={`flex flex-col items-center ${isSmallScreen ? 'items-center' : 'flex-row'}`}>
    <img 
      src={currentSong.artistImage} 
      alt={currentSong.artist} 
      className="w-10 h-10 md:w-14 md:h-14 rounded-full" 
      loading="lazy" 
    />
    <div className={` ${isSmallScreen ? 'text-center' : ''}`}>
      <h2 className={`text-lg font-bold ${isSmallScreen ? 'text-xs' : ''}`}>{currentSong.title}</h2>
      <p className={`text-xs text-gray-200 ${isSmallScreen ? 'text-xs' : ''}`}>{currentSong.artist}</p>
    </div>
  </div>
</div>


        <div className="flex flex-grow items-center">
          <div ref={waveformRef} onClick={handleWaveformClick} className="cursor-pointer mb-2 mt-2 w-full md:w-3/4 mx-auto"></div>
          {!isSmallScreen && (
            <button onClick={shareSong} className="bg-dark-brown text-white mx-2 px-2 py-2 rounded hover:bg-electric-blue">
              <FaShareAlt />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        {!isSmallScreen && (
          <div className="flex space-x-2 mx-2 mb-2 md:mb-0">
            <button onClick={() => handleSpeed(0.75)} className={`px-2 py-1 rounded ${playbackRate === 0.75 ? "bg-electric-blue text-white" : "bg-dark-brown text-white"} hover:bg-electric-blue`}>0.75x</button>
            <button onClick={() => handleSpeed(1)} className={`px-2 py-1 rounded ${playbackRate === 1 ? "bg-electric-blue text-white" : "bg-dark-brown text-white"} hover:bg-electric-blue`}>1x</button>
            <button onClick={() => handleSpeed(1.25)} className={`px-2 py-1 rounded ${playbackRate === 1.25 ? "bg-electric-blue text-white" : "bg-dark-brown text-white"} hover:bg-electric-blue`}>1.25x</button>
            <button onClick={decreaseVolume} className="bg-dark-brown text-white p-1 rounded hover:bg-electric-blue"><FaVolumeDown size={16} /></button>
            <button onClick={increaseVolume} className="bg-dark-brown text-white p-1 rounded hover:bg-electric-blue"><FaVolumeUp size={16} /></button>
          </div>
        )}

        <div className="flex space-x-2 items-center justify-center flex-grow mb-2 md:mb-0">
          <button onClick={prevSong} className="bg-dark-brown text-white px-2 py-1 rounded hover:bg-electric-blue"><FaBackward size={16} /></button>
          <button onClick={backward} className="bg-dark-brown text-white px-2 py-1 rounded hover:bg-electric-blue"><img src="assets/10-.png" width="20px" height="20px" alt="Backward by 10 seconds" /></button>
          <button onClick={togglePlayPause} className="bg-electric-blue text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">{isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}</button>
          <button onClick={forward} className="bg-dark-brown text-white px-2 py-1 rounded hover:bg-electric-blue"><img src="assets/10+.png" width="20px" height="20px" alt="Forward by 10 seconds" /></button>
          <button onClick={nextSong} className="bg-dark-brown text-white px-2 py-1 rounded hover:bg-electric-blue"><FaForward size={16} /></button>
        </div>

        {!isSmallScreen && (
          <div className="flex mt-2 mr-10">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                onClick={() => handleRatingChange(currentSongIndex, star)}
                style={{ cursor: 'pointer', color: star <= ratings[currentSongIndex] ? 'gold' : 'gray', fontSize: '26px' }}
              >
                ★
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
