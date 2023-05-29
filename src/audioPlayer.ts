const path = require('path');
const fs = require('fs');
const sound = require('sound-play');

class AudioPlayer {
  private _basePath: string;
  private _assetsPath: string;
  private _audioFiles: string[];

  private _isCurrentlyPlaying: boolean = false;

  constructor() {
    this._basePath = path.join(__dirname, '..');
    this._assetsPath = path.join(this._basePath, 'assets');

    this._audioFiles = this.getAudioFiles();
  }

  private getAudioFiles = (): string[] => {
    const audioFiles: string[] = [];

    fs.readdirSync(this._assetsPath).forEach((file: string) => {
      audioFiles.push(file);
    });

    return audioFiles;
  };

  playRandomSound = () => {
    const audio =
      this._audioFiles[Math.floor(Math.random() * this._audioFiles.length)];

    const audioPath = path.join(this._assetsPath, audio);

    if (this._isCurrentlyPlaying) {
      return;
    }

    this._isCurrentlyPlaying = true;
    sound.play(audioPath).then(() => {
      this._isCurrentlyPlaying = false;
    });
  };
}

export default AudioPlayer;
