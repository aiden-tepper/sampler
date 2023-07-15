import { useEffect, useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import * as Tone from 'tone'
import SamplerButton from './SamplerButton';
import { useContext } from "react";
import { SampleContext } from "../contexts/SampleContext";
import SampleList from "./SampleList";
import PianoSample from "./PianoSample";

let selectedSample = {}

function Sampler() {
  const { sampleList, setSampleList } = useContext(SampleContext);

  const [samplerButtons, setSamplerButtons] = useState(Array(16));
  const [selectedSamples, setSelectedSamples] = useState(Array(16));

  const [changeSamples, setChangeSamples] = useState(false);
  //const [selectedSample, setSelectedSample] = useState({})

  function playSample(num) {
    if (!changeSamples && selectedSamples[num] !== undefined) {
      //console.log(selectedSamples[num])
      //selectedSamples[num].player.toDestination().start()
      const player = selectedSamples[num].player.toDestination();
      Tone.loaded().then(() => {
        player.start();
      });
    } else if(changeSamples){
    
    let arr2 = selectedSamples
    arr2[num] = selectedSample
    setSelectedSamples(arr2)
    }
  }
  useEffect(() =>{
    console.log(samplerButtons)
  },[samplerButtons])

  useEffect(() => {
    setSelectedSamples(sampleList);
  }, [sampleList]);

  useEffect(() => {
    //console.log(selectedSamples)
    
    let arr = Array(16);
    for (let i = 0; i < 16; i++) {
      arr[i] = (
        <SamplerButton
          key={i}
          id={i}
          playSample={() => playSample(i)}
          sample={selectedSamples[i]}
        />
      );
    }
    setSamplerButtons(arr);
  }, [selectedSamples, changeSamples]);

  return (
    <div id="samplerButtons">
      <div>
        <Button>Record</Button>

        <Button
          onClick={() => {
            setChangeSamples(!changeSamples);
            console.log("Changed");
          }}
        >
          Change Samples
        </Button>
      </div>
      <Container>
        {samplerButtons.map((btn, index) => {
          return btn;
        })}
      </Container>
    </div>
  );
}

function Soundboard() {

  function handleSet(sample){
    //console.log("HANDLE SET")
    console.log(sample)
    selectedSample = sample

  }

  return (
    <div className="App">
      <h1>Sample Pad</h1>
      <div id="sampler">
        <Sampler />
        <PianoSample />
      </div>
      <div className="verticalLine"></div>
      <div id="sampleList">
        <SampleList handleSet={handleSet}/>
      </div>
    </div>
  );
}

export default Soundboard;
