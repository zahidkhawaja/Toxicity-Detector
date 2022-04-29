import './App.css';
import { useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [phrase, setPhrase] = useState();
  const [objectData, setObjectData] = useState();
  const [loading, setLoading] = useState();

    // TensorFlow 
  function runTensorflow() {
    // Prediction confidence
    const theshold = 0.9;

    // Load model - optionally pass in a theshold and array of labels
    toxicity.load(theshold).then(model => {
    // Just a phrase, in this case
    const sentences = [phrase]

    model.classify(sentences).then(predictions => {
      setObjectData(predictions);
      setLoading(false);
    })
  })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setPhrase(e.target.value);
    runTensorflow();
    setLoading(true);
}


  return (
    <div className="App">
      <header className="App-header">
        <h1>Toxicity Detector</h1>
      </header>
      <div className = "body">
        <div className = "tensordiv">
        <a className = "tensorflow" target="_blank" rel="noreferrer" href="https://www.tensorflow.org/">Powered by TensorFlow</a>
        </div>

      <div className = "main-app">
        <form onSubmit = {handleSubmit}>
          <textarea className = "phrase-box" rows = "10" cols = "50" type = "text" placeholder = "Enter a phrase" 
          onChange = {(e) => setPhrase(e.target.value)}
          required>
          </textarea>
          <div className = "submit-div">
          <input className = "submit-button" type = "submit" value = "Submit" />
          </div>
        </form>
        <div className = "results">
          <div className = "circular">
          {loading ?
            <CircularProgress color = "secondary" /> : null}
            </div>
          {objectData ? 
          objectData.map(arr => {
            if(arr.results[0].match) {
              return (
              <p className = "detected">{arr.label}: detected</p>
              )
              } else {
                return (
                  <p className = "ok">{arr.label}: not detected</p>
                )
              }
          })
          
          : <p>Nothing to show. Try entering a phrase.</p>}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
