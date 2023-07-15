import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
const SamplerButton = (props) => {
      return (
        <Button className="btn btn-secondary btn-square" onClick={() => props.playSample(props.id)}></Button>
      );
    
  }
  export default SamplerButton;