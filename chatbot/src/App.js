import { useEffect } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import { predict_answer } from "./util";

function App() {
  useEffect(async () => {
    let outputs_ = [];
    let emodel;
    const model = await tf.loadLayersModel(
      "http://localhost:4001/static/model.json"
    );
    outputs_ = [model.output, model.getLayer("dense_1").output];
    emodel = tf.model({ inputs: model.input, outputs: outputs_ });
    predict_answer("hello! world", emodel);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Yo</p>
      </header>
    </div>
  );
}

export default App;
