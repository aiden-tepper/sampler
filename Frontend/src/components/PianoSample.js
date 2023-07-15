import { useContext } from "react";
import { SampleContext } from "../contexts/SampleContext";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import * as Tone from "tone";
import { Sample } from "./Sample";

function getNoteFromMidiNumber(midiNote) {
  const note_names = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  return note_names[midiNote % 12] + (Math.floor(midiNote / 12) - 1);
}

function PianoSample() {
  const { sampleList, setSampleList } = useContext(SampleContext);
  //console.log(sampleList);
  const firstNote = MidiNumbers.fromNote("c4");
  const lastNote = MidiNumbers.fromNote("b4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber) => {
        // Play a given note - see notes below
        const recorder = new Tone.Recorder();
        const synth = new Tone.Synth().connect(recorder).toDestination();
        const note = getNoteFromMidiNumber(midiNumber);
        recorder.start();
        synth.triggerAttackRelease(note, "8n");
        setTimeout(async () => {
          // the recorded audio is returned as a blob
          const recording = await recorder.stop();
          // download the recording by creating an anchor element and blob url
          const url = URL.createObjectURL(recording);
          const s = new Sample(midiNumber, note, recorder.toSeconds(), url);
          sampleList.unshift(s);
          setSampleList(sampleList);
        }, 4000);
      }}
      stopNote={(midiNumber) => {
        // Stop playing a given note - see notes below
      }}
      width={400}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
}
export default PianoSample;
