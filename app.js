
const path = require('path');
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const PORT = 5000;

const createStream = () => {
  const youtube = 'rtmp://a.rtmp.youtube.com/live2/';
  const stramkey = 'your-stream-key';
  const src = path.join(__dirname, "./video.mp4")
  const VBR="1500k"
  const FPS="30"
  const QUAL="ultrafast"
  const AUDIO_ENCODER="aac"

  ffmpeg()
    .addInput(src)
    .addOption("-c:v", "libx264")
    .addOption("-preset", QUAL)
    .addOption("-r", FPS)
    .addOption("-g", FPS * 2)
    .addOption("-b:v", VBR)
    .addOption("-c:a", AUDIO_ENCODER)
    .addOption("-threads", "6")
    .addOption("-ar", "44100")
    .addOption("-b:a", "128k")
    .addOption("-bufsize", "512k")
    .addOption("-pix_fmt", "yuv420p")
    .addOption("-f", "flv")
    .output(youtube + stramkey)
    .run();
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  createStream();
});
