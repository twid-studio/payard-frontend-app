import React, { useState, useRef, useEffect } from "react";
import s from "./VideoPlayer.module.scss";
import {
  motion,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import ReactPlayer from "react-player";
import clsx from "clsx";

export const VideoPlayer = ({
  url,
  preview = false,
  customClass = "",
  children="",
  ...rest
}) => {
  // #region
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(1);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const playedMotionValue = useMotionValue(0);
  const volumeMotionValue = useMotionValue(1);
  const clipPathDuration = useTransform(
    playedMotionValue,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      playedMotionValue.set(state.played);
    }
  };

  const handleMuted = () => {
    if (!muted) {
      setMuted(true);
      setVolume(0);
      volumeMotionValue.set(0);
    } else {
      setMuted(false);
      setVolume(1);
      volumeMotionValue.set(1);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    playedMotionValue.set(newValue);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setPlayed(0);
  };

  // #endregion

  return (
    <div
      className={`${s.video_wrapper} ${customClass}`}
      ref={containerRef}
      {...rest}
      onDoubleClick={() => handleFullscreen()}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        className={s.video}
        playing={isPlaying}
        volume={volume}
        muted={muted}
        onEnded={() => handleEnded()}
        // playsinline={true}
        progressInterval={100}
        onProgress={handleProgress}
      />
      {children}
      <div
        className={s.video__play_btn_wrapper}
        onClick={() => setIsPlaying(!isPlaying)}
      ></div>
      <div
        className={clsx(s.video_control, {
          [s.video_control_not_playing]: !isPlaying && !isFullscreen,
        })}
      >
        <div
          className={s.video__stop_button}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? (
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="white" />
              <path d="M15.5 13V27L26.5 20L15.5 13Z" fill="#38D091" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="white" />
              <rect x="16" y="14" width="2" height="14" fill="#38D091" />
              <rect x="22" y="14" width="2" height="14" fill="#38D091" />
            </svg>
          )}
        </div>
        <div className={s.video_control__center}>
          <div className={s.video_thumb}>
            <motion.span
              className={s.video__thumb_progress}
              style={{ clipPath: clipPathDuration }}
            />
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              onTouchStart={handleSeekMouseDown}
              onTouchEnd={handleSeekMouseUp}
              onChange={handleSeekChange}
              className={s.video__thumb_progress_seek}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
