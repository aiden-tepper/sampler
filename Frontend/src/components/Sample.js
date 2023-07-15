import * as Tone from "tone";

class Sample {
  constructor(id, name, description, genre, length, url, player) {
    this.id = id;
    this.name = name;
    this.length = length;
    this.description = description;
    
    this.genre = genre;
    if (url) {
      this.url = url
      this.player = new Tone.Player(`./sounds/${url}`)
      Tone.loaded().then(() => {
        player.start();
      });
    }
    if (player) {
      this.player = player;
    }
  }
}

export { Sample };
