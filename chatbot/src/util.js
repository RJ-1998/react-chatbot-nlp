// import * as tf from "@tensorflow/tfjs";
import { tensor1d } from "@tensorflow/tfjs";
import faq from "./intents.json";
import md5 from "md5";

const intent_label_map = {
  goodbye: 1,
  greeting: 0,
  hours: 3,
  joke: 9,
  mopeds: 4,
  opentoday: 6,
  payments: 5,
  rental: 7,
  thanks: 2,
  today: 8,
};
const vocab_length = 66;
const maxlen = 7;
const THRESHOLD = 0.1;

// tokenize the sentence
const _tokenizer = (sentence) => {
  return sentence.split(" ");
};
// remove punctuation from sentence
const _rm_punctuation = (sentence) => {
  return sentence.replace(/[.,\/#@!$%\^&\*;:{}=\-_`~()]/g, "");
};
// convert to one_hot representation
const one_hot = (tokens) => {
  let result = [];

  for (const token in tokens) {
    let x = parseInt(md5(token), 16);
    while (x > 9999999999) {
      x = x / 10;
    }
    x = (parseInt(x) % (vocab_length - 1)) + 1;
    result.push(x);
  }
  return result;
};

// pad sequence for embedded_sentence
const pad_sequence = (tokens) => {
  const len = maxlen - tokens.length;
  for (let i = 0; i < len; i++) {
    tokens.push(0);
  }
  return tokens;
};

export const predict_answer = (sentence, model) => {
  // step 1: tokenize and remove punctuation
  let tokens = _tokenizer(_rm_punctuation(sentence));
  // step 2: remove stopwords and stemming
  // step 3: convert to one_hot encoding pf sentence
  const embedded_sentence = one_hot(tokens);
  // step 5: maybe convert tensor representation
  //   const embedded_tensor = tf.tensor(embedded_sentence);
  //   let padded_sequence = tf.pad(embedded_sentence, [
  //     [0, maxlen - embedded_sentence.length],
  //   ]);
  //   padded_sequence = padded_sequence.reshape([1, maxlen]);
  // step 6: predict the answer using the model
  // let padded_sequence = tf.broadcastTo(pad_sequence(embedded_sentence), [1, 7]);
  // console.log(padded_sequence.print());
  // step 4: pad sequence of the one_hot representation
  let tensor = tensor1d(pad_sequence(embedded_sentence), "float32").expandDims(
    0
  );

  const _x = model.predict(tensor).dataSync();
  const _res = Array.from(_x);
  let results = [];
  // step 7: get the probabilities of the question
  for (let i = 0; i < _res.length; i++) {
    if (_res[i] >= THRESHOLD) {
      results.push([i, _res[i]]);
    }
  }
  results.sort(function (a, b) {
    return b[1] - a[1]; // sort in descending order
  });
  // step 8: return the random answer from intent.json
  let response = "";
  for (const [key, value] of Object.entries(intent_label_map)) {
    if (value == results[0][0]) {
      for (const intent of faq.intents) {
        if (intent.tag == key) {
          response =
            intent.responses[
              Math.floor(Math.random() * intent.responses.length)
            ];
          break;
        }
      }
    }
  }

  console.log(response);
};
