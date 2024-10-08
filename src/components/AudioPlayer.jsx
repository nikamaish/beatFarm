import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaForward, FaBackward, FaShareAlt } from 'react-icons/fa'; // Import Font Awesome icons
import { GiSpeedometer } from 'react-icons/gi'; // Import speedometer icon for playback speed

const songsList = [
  { id: 1, title: "Sajani re", artist: "Arijit Singh", artistImage: "assets/arijitSingh.jpeg", src: "assets/beat1.mp3", rating: 0 },
  { id: 2, title: "Shape Of You", artist: "Ed Sheeran", artistImage: "assets/edSheeran.jpeg", src: "/assets/beat2.mp3", rating: 0 },
];

const AudioPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [ratings, setRatings] = useState(songsList.map(song => song.rating));
  const [volume, setVolume] = useState(1); // Initialize volume state


  const currentSong = songsList[currentSongIndex];

  // Initialize WaveSurfer
  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#fff',
      progressColor: '#00A4E4',
      height: 70,
    });

    wavesurferRef.current.load(currentSong.src);
    wavesurferRef.current.setVolume(volume); // Set initial volume


    wavesurferRef.current.on('finish', () => {
      nextSong();
    });

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

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
      // Increase volume by 10% (0.1 in 0-1 range)
      let newVolume = Math.min(prevVolume + 0.1, 1); // Ensure it doesn't go above 100% (1)

      if (wavesurferRef.current) {
        wavesurferRef.current.setVolume(newVolume);
      }

      return newVolume;
    });
  };

  const decreaseVolume = () => {
    setVolume(prevVolume => {
      // Decrease volume by 10% (0.1 in 0-1 range)
      let newVolume = Math.max(prevVolume - 0.1, 0); // Ensure it doesn't go below 0%

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
    <div style={{ width: "100%" }} className="fixed bottom-0 left-0 right-0 mx-auto  bg-black text-white shadow-lg text-center pb-4 z-50"> {/* Fixed position at bottom */}

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={currentSong.artistImage} alt={currentSong.artist} className="w-12 h-12 md:w-14 md:h-14 rounded-full" loading="lazy" />
          <div>
            <h2 className="text-lg font-bold ml-2">{currentSong.title}</h2>
            <p className="text-xs text-gray-200">{currentSong.artist}</p>
          </div>
        </div>
        <div ref={waveformRef} onClick={handleWaveformClick} className="cursor-pointer mb-2 mt-2 w-full md:w-3/4 mx-auto"></div>
        <button onClick={shareSong} className="bg-dark-brown text-white mx-2 px-2 py-2 my-2 rounded hover:bg-electric-blue">
          <FaShareAlt />
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Speed Buttons */}
        <div className="flex space-x-2 mx-2 mb-2 md:mb-0">
          <button onClick={() => handleSpeed(0.75)} className={`px-2 py-2 rounded ${playbackRate === 0.75 ? "bg-electric-blue text-white" : "bg-dark-brown text-white"} hover:bg-electric-blue`}>0.75x</button>
          <button onClick={() => handleSpeed(1)} className={`px-2 py-2 rounded ${playbackRate === 1 ? "bg-electric-blue text-white" : "bg-dark-brown text-white"} hover:bg-electric-blue`}>1x</button>
          <button onClick={() => handleSpeed(1.25)} className={`px-2 py-2 rounded ${playbackRate === 1.25 ? "bg-electric-blue text-white" : "bg-dark-brown text-white"} hover:bg-electric-blue`}>1.25x</button>
          {/* <div className="flex space-x-2 mx-2 mb-2 md:mb-0"> */}
          <button onClick={decreaseVolume} className="bg-dark-brown text-white px-4 py-2 rounded hover:bg-electric-blue"><img src="/assets/v-.png" width="20px" alt="image" /></button>
          <button onClick={increaseVolume} className="bg-dark-brown text-white px-4 py-2 rounded hover:bg-electric-blue"><img src="/assets/v+.png" width="20px" alt="image" /></button>
        </div>

        {/* Playback Controls */}
        <div className="flex space-x-4 items-center justify-center flex-grow mb-2 md:mb-0">
          <button onClick={prevSong} className="bg-dark-brown text-white px-4 py-2 rounded hover:bg-electric-blue"><FaBackward /></button>
          <button onClick={backward} className="bg-dark-brown text-white px-4 py-2 rounded hover:bg-electric-blue"><img src="assets/10-.png" width="20px" height="20px" alt="Backward by 10 seconds" loading="lazy" /></button>
          <button onClick={togglePlayPause} className="bg-electric-blue text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">{isPlaying ? <FaPause /> : <FaPlay />}</button>
          <button onClick={forward} className="bg-dark-brown text-white px-4 py-2 rounded hover:bg-electric-blue"><img src="assets/10+.png" width="20px" height="20px" alt="Forward by 10 seconds" loading="lazy" /></button>
          <button onClick={nextSong} className="bg-dark-brown text-white px-4 py-2 rounded hover:bg-electric-blue"><FaForward /></button>
        </div>

        {/* Rating */}
        <div className="flex mt-2 mr-10">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => handleRatingChange(currentSongIndex, star)}
              style={{ cursor: 'pointer', color: star <= ratings[currentSongIndex] ? 'gold' : 'gray', fontSize: '26px' }} // Increased font size
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;