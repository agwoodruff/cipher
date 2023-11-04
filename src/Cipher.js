import { useState } from "react";

function Cipher() {
    const [direction, setDirection] = useState('left');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [output, setOutput] = useState('');

    const [vigMessage, setVigMessage] = useState('');
    const [vigKey, setVigKey] = useState('');
    const [vigOutput, setVigOutput] = useState('');

    const caesarCipher = (e, isEncoded) => {
        var newOutput = "";
        var messNoSpaces = message.toLowerCase().replace(/[^a-z]/gi, ''); // take away spaces, capital letters and special characters

        for (var i=0; i < messNoSpaces.length; i++) {
            var oldCharCode = messNoSpaces[i].charCodeAt(0) - 97;
            var newCharCode = 0;
            var newLetter = "";

            if (direction == "left") {
                if (isEncoded) { //for decoding already encoded ciphers
                    newCharCode = Number(97) + (Number(oldCharCode) + Number(amount));
                }
                else { //encode message
                    newCharCode = Number(97) + (Number(oldCharCode) - Number(amount));
                }

            }
            else { // if shift direction is right
                if (isEncoded) { //for decoding already encoded ciphers
                    newCharCode = Number(97) + (Number(oldCharCode) - Number(amount));
                }
                else { //encode message
                    newCharCode = Number(97) + (Number(oldCharCode) + Number(amount));
                }
            }
            // if newCharCode is less than 97 (a)
            if (newCharCode < 97) {
                newCharCode = Number(123) - (Number(97) - Number(newCharCode));
            }

            // if newCharCode is more than 122 (z)
            if (newCharCode > 122) {
                newCharCode = Number(96) + (Number(newCharCode) - Number(122));
            }

            newLetter = String.fromCharCode(newCharCode);
            newOutput += newLetter;
        }
        setOutput(newOutput);
        e.preventDefault();
    }

    const vigenereCipher = (e) => {
        var newOutput = "";
        var newLetter = "";
        var messNoSpaces = vigMessage.toLowerCase().replace(/[^a-z]/gi, '');
        var keyNoSpaces = vigKey.toLowerCase().replace(/[^a-z]/gi, '');

        var keyArray = messNoSpaces.split("").map((o,i)=> keyNoSpaces[i%keyNoSpaces.length]);

        for (var i=0; i < messNoSpaces.length; i++) {
            var key = keyArray[i];
            var oldCharCode = messNoSpaces[i].charCodeAt(0) - 97;
            var keyCharCode = key.charCodeAt(0) - 97;
            var newCharCode = oldCharCode + keyCharCode + 97;

            // if newCharCode is less than 97 (a)
            if (newCharCode < 97) {
                newCharCode = Number(123) - (Number(97) - Number(newCharCode));
            }
            // if newCharCode is more than 122 (z)
            else if (newCharCode > 122) {
                newCharCode = Number(96) + (Number(newCharCode) - Number(122));
            }            

            newLetter = String.fromCharCode(newCharCode);
            newOutput += newLetter;

        }
        setVigOutput(newOutput);
        e.preventDefault();
    }

  return (
    <>
      <h1>Cipher Demo</h1>
      <section id="cipher-encode">
        <p>Encode a message using a Caesar cipher.</p>
        <form>
            <p>Shift direction:</p>
            <input className="form-check-input" type="radio" id="left" name="direction" value="left" onChange={(e) => {
                setDirection('left');
            }} />
            <label className="form-check-label" htmlFor="left">Left</label><br/>
            <input className="form-check-input" type="radio" id="right" name="direction" value="right" onChange={(e) => {
                setDirection('right');
            }} />
            <label className="form-check-label" htmlFor="right">Right</label><br/>
            
            <label htmlFor="shift-num">Shift amount: </label>
            <input type="number" id="shift-num" name="shift-num" onChange={(e) => {
                setAmount(e.target.value);
            }}/>

            <label htmlFor="message">Input message:</label>
            <input type="text" id="message" name="message" onChange={(e) => {
                setMessage(e.target.value);
            }}/>
            <input className="btn btn-info" type="submit" value="Encode Message" onClick={(e) => {caesarCipher(e, false);}}/>
            <input className="btn btn-info" type="submit" value="Decode Message" onClick={(e) => {caesarCipher(e, true);}}/>
        </form>
        <p>Output message: {output}</p>
      </section>

      <section id="cipher-decode">
        <p>Encode a message with a Vigenère cipher.</p>
        <form onSubmit={vigenereCipher}>
            <label htmlFor="key">Key:</label>
            <input type="text" id="key" name="key" onChange={(e) => {
                setVigKey(e.target.value);
            }}/>
            <label htmlFor="message">Input message:</label>
            <input type="text" id="message" name="message" onChange={(e) => {
                setVigMessage(e.target.value);
            }}/>
            <input class="btn btn-info" type="submit" value="Encode Message"/>
        </form>
        <p>Encoded message: {vigOutput} </p>
      </section>
    </>
  );
}

export default Cipher;
