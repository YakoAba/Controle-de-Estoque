import React, { useState, useEffect } from "react";

const Alarm = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      const audio = document.getElementById("alarmAudio");
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    const playAlarm = () => {
      const audio = document.getElementById("alarmAudio");
      audio.play();
    };

    playAlarm();
    const interval = setInterval(playAlarm, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div>
      <audio id="alarmAudio" >
        <source src="vinheta-ifood.mp3" type="audio/mpeg"/>
      </audio>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Alarm;

