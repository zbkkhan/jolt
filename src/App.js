import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
let i = 0;
class App extends Component {

  componentDidMount() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let overlayCanvas = document.getElementById('overlay_canvas');
    let overlayCtx = overlayCanvas.getContext('2d');
    overlayCtx.globalAlpha = 0.1
    let video = document.getElementById('video');
    let overlayVideo = document.getElementById('overlay_video')
    video.currentTime = 5;


// set canvas size = video size when known
    video.addEventListener('loadedmetadata', function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      overlayCanvas.width = video.videoWidth;
      overlayCanvas.height = video.videoHeight;
    });

    overlayVideo.addEventListener('loadedmetadata', function() {

    });

    video.addEventListener('play', function() {

      var $this = this; //cache
      (function loop() {
        if (!$this.paused && !$this.ended) {
          ctx.drawImage(video, 0, 0);
          ctx.font = "12px Arial";
          i = i + 0.5
          ctx.fillText("Hello World",i % 500, 120);
          overlayCtx.drawImage(overlayVideo, 0, 0);
          overlayCtx.font = "12px Arial";
          overlayCtx.fillText("Hello World",i % 500, 120);
          setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
      })();
    }, 0);
  }

  componentWillMount(){
  }

  render() {
    return (
      <div className="App">
        <h1>Jolt Video Editor</h1>
        <video id="video" src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" controls="false"></video>
        <video id="overlay_video" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" controls="false"></video>
        <div>
          <canvas id="canvas"></canvas>
          <canvas id="overlay_canvas"></canvas>
        </div>
      </div>
    );
  }
}

export default App;
