import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SampleList from './SampleList';
import { useContext } from "react"
import { SampleContext } from '../contexts/SampleContext';
import * as Tone from 'tone';
import { Knob } from "react-rotary-knob";
import React from "react";

/*class Sample {
    constructor(id, name, length) {
        this.id = id;
        this.name = name;
        this.length = length;
    }
    
   useEffect(() => {
    fetch("http://localhost:3000/").then((res) => {
        //console.log({res});
        return res.text();
    }).then((data) => {
        console.log(data);
    });	
   }, []);

   return <div>
       
       <h2>Library Page</h2>
       <Button onClick={handleClick}>Login Page</Button>
       
   </div>
   }

}*/

global.workingID = -1;
global.distortion = 0;
global.bitcrush = 1;
global.pitchshift = 0;

const Library = () => {
    const { sampleList, setSampleList } = useContext(SampleContext);

    //const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
    // play as soon as the buffer is loaded
    /*player.autostart = true;
        const synth = new Tone.Synth().toDestination();*/

    //play a middle 'C' for the duration of an 8th note
    //synth.triggerAttackRelease("C4", "8n");

    const libraryList = sampleList.map((sample) =>
    <div>
        <Button onMouseDown={() => workingOn(sample.id)}>Edit Sample</Button>
        <li key={sample.id}>
        <b>{sample.id}: <font size="+2">{sample.name}</font></b>   <i>{sample.description}</i>, genre: {sample.genre}, length: {sample.length}s
        </li>
        </div>
    );


    function handleSet(sample){
        //console.log("HANDLE SET")
        console.log(sample)
      }

    return (
        <div className={"Library"}>
            <div className="Library-menu">
                <header>
                    <h1>Sample Library</h1>
                    <Button onMouseDown={()=>playCurrSample()}>Play</Button>
                    <span> </span>
                    <Button id={"save_button"}>Save</Button>
                    <span> </span>
                    <Button id={"sample_pad_button"}>Sample Pad</Button>
                </header>
                <hr />
            </div>
            <div className={"Library-content"}>
                <div className="left-half">
                    <ul className={"App-sample-list"}>{libraryList}</ul>
                </div>
                <VerticalLine />
                <div className="right-half">
                    <div>working on sample id: {global.workingID}</div>
                    <p> </p>
                    <div>Distortion: </div>
                    <DistortionKnob
                        style={{ display: "inline-block" }}
                        min={-1}
                        max={11}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200}
                        height={200}
                    />
                    <p></p>
                    <div>Pitch Shift: </div>
                    <PitchShiftKnob
                        style={{ display: "inline-block" }}
                        min={-24}
                        max={24}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200}
                        height={200}
                    />
                    <p></p>
                    <div>Bit Crushing: </div>
                    <BitCrushKnob
                        style={{ display: "inline-block" }}
                        min={1}
                        max={17}
                        unlockDistance={0}
                        preciseMode={false}
                        width={200}
                        height={200}
                    />
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    );
    function workingOn(newID) {
        global.workingID = newID;
        console.log(
            "working on sample id: " + global.workingID
        );
    }
    
    function playCurrSample() {
        let play;
        sampleList.forEach(sample => {
            if (sample.id == global.workingID) {
                play = sample;
            }
        });
        if (play !== undefined) {
            let distortionEffect = new Tone.Distortion(global.distortion * 0.1).toDestination();;
            let pitchShiftEffect = new Tone.PitchShift().toDestination();
            pitchShiftEffect.pitch = global.pitchshift;
            let bitCrusherEffect = new Tone.BitCrusher(global.bitcrush).toDestination();
            play.player.connect(distortionEffect);
            play.player.connect(pitchShiftEffect);
            play.player.connect(bitCrusherEffect);
            play.player.start();
        }
    }
}
const VerticalLine = () => {
    return <div style={{ borderLeft: '1px solid black', height: '800px' }} />
};

class DistortionKnob extends React.Component {
    constructor() {
        super();
        this.state = {
            value: -1
        };
         
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(val) {
        //ignore change if distance is greater than defined
        //here we use a distance of 200 because our max value is 1000
        //change if needed
        const maxDistance = 2;
        let distance = Math.abs(val - this.state.value);
        if (distance > maxDistance) {
            return;
        } else {
            this.setState({ value: val });
            global.distortion = Math.floor(this.state.value);
            console.log("changed global distortion");
        }
    }
    render() {
        let { value, ...rest } = this.props;
        let effectValue = "";
        if (this.state.value < 1) {
            effectValue = "off";
        }
        else {
            effectValue = Math.floor(this.state.value);
        }
        return (
            <div>
                <div>{effectValue}</div>
                <Knob value={this.state.value} onChange={this.handleOnChange} {...rest} />
            </div>
        );
    }
}

class BitCrushKnob extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 1
        };
         
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(val) {
        //ignore change if distance is greater than defined
        //here we use a distance of 200 because our max value is 1000
        //change if needed
        const maxDistance = 2;
        let distance = Math.abs(val - this.state.value);
        if (distance > maxDistance) {
            return;
        } else {
            this.setState({ value: val });
            global.bitcrush = Math.floor(this.state.value);
        }
        console.log(val);
    }
    render() {
        let { value, ...rest } = this.props;
        let effectValue = "";
        if (this.state.value < 1) {
            effectValue = "off";
        }
        else {
            effectValue = Math.floor(this.state.value);
        }
        return (
            <div>
                <div>{effectValue}</div>
                <Knob value={this.state.value} onChange={this.handleOnChange} {...rest} />
            </div>
        );
    }
}

class PitchShiftKnob extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0
        };
         
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(val) {
        //ignore change if distance is greater than defined
        //here we use a distance of 200 because our max value is 1000
        //change if needed
        const maxDistance = 2;
        let distance = Math.abs(val - this.state.value);
        if (distance > maxDistance) {
            return;
        } else {
            this.setState({ value: val });
            global.pitchshift = Math.floor(this.state.value);
        }
        console.log(val);
    }
    render() {
        let { value, ...rest } = this.props;
        let effectValue = "";
        effectValue = Math.floor(this.state.value);
        return (
            <div>
                <div>{effectValue}</div>
                <Knob value={this.state.value} onChange={this.handleOnChange} {...rest} />
            </div>
        );
    }
}

export default Library;
