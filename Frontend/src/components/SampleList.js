import { useState, useEffect } from "react"
import { useContext } from "react"
import { SampleContext } from "../contexts/SampleContext"
import { Button } from "react-bootstrap"
import { Sample } from "./Sample";
import * as Tone from 'tone'
function SampleList(props) {
  const { sampleList, setSampleList } = useContext(SampleContext);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://${process.env.REACT_APP_BE_DOMAIN}:${process.env.REACT_APP_BE_PORT}/sample`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const jsonRes = await response.json();

      const samples = jsonRes.data.map(s => (new Sample(s.sample_id, s.name, s.description, s.genre, s.length, s.file_location)
       // <Sample id={s.sample_id} name={s.name} desc={s.description} genre={s.genre} path={s.file_location} length={999}/>
        /*id: s.sample_id,
        name: s.name,
        desc: s.description,
        genre: s.genre,
        url: s.file_location,
        length: 999*/
    ));

      setSampleList(samples);
    })();
  }, []);

  const buffers = sampleList.map((sample) => {
    const buffer = new Tone.ToneAudioBuffer("./sounds/" + sample.path, () => {
      //console.log(buffer);
      //console.log("./sounds/" + sample.path + " loaded");
    });
    return buffer;
  });

  const [sampleListings, setSampleListings] = useState([]);
  useEffect(() => {

    setSampleListings(sampleList.map((sample) => {
      console.log(sample)

      return (<ul key={sample.id}>
        <SampleListing listSample={sample} handleSet={props.handleSet}></SampleListing>
      </ul>)
    }))
  }, [sampleList])

  return (
    <>
      <div className="sampleList">
        <h2>Sample List</h2>
        {sampleListings}
      </div>
    </>
  );
}

function handlePlay(sample) {
  //const path = "./sounds/" + sample.path;
  const player = sample.player;
  Tone.loaded().then(() => {
    player.start();
  });
}

function SampleListing(props) {
  let sample = props.listSample;
  
  
  return (
    <div draggable="true" className="sampleListing">
      <b>{sample.id}: <font size="+2">{sample.name}</font></b>   <i>{sample.description}</i>, genre: {sample.genre}, length: {sample.length}s
      <div>
        <Button onClick={(e)=>sample.player.toDestination().start()}>Play</Button>
        <Button onClick={(e)=>sample.player.toDestination().stop()}>Stop</Button>
        <Button onClick={(e)=>props.handleSet(sample)}>Select</Button>
      </div>
    </div>
  );}

export default SampleList;
