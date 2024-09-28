import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CodeMirror from 'codemirror';
import './codemirror-5.65.17/lib/codemirror.css';
import './codemirror-5.65.17/mode/javascript/javascript.js';
import './codemirror-5.65.17/mode/python/python.js';
import './codemirror-5.65.17/mode/clike/clike.js';
import './codemirror-5.65.17/theme/dracula.css';
import './codemirror-5.65.17/theme/eclipse.css';
import './codemirror-5.65.17/theme/material.css';
import './codemirror-5.65.17/theme/monokai.css';
import './editor.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('Java');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('dracula');
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'text/x-java',
      theme: 'dracula',
      lineNumbers: true,
      autoCloseBrackets: true,
    });

    editorRef.current = editor;
    editor.setSize('100%', '500');

    return () => {
      editor.toTextArea();
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const mode =
        language === 'Python'
          ? 'text/x-python'
          : language === 'C'
            ? 'text/x-csrc'
            : language === 'Cpp'
              ? 'text/x-c++src'
              : 'text/x-java';
      editorRef.current.setOption('mode', mode);
    }
  }, [language]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setOption('theme', theme);
    }
  }, [theme]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(''); // Clear the code
    setInput(''); // Clear the input
    setOutput(''); // Clear the output
  };

  const handleRun = async () => {
    const codeValue = editorRef.current.getValue();
    const payload = {
      code: codeValue,
      input,
      lang: language,
    };

    // Check if the code requires input based on its content
    const requiresInput = /input\s*\(|readline\s*\(|Scanner\s*\(/.test(codeValue);

    // If input is required and the user hasn't provided any input, show the message
    if (requiresInput && input.trim() === '') {
      setOutput('Please enter a number in the input box and click "Run".');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/compile', payload);
        setOutput(response.data.output || 'No output');
      } catch (error) {
        console.error('Error during API call:', error);
        setOutput('Error: ' + (error.response?.data?.output || error.message));
      }
    }
  };


  const captureScreenshot = () => {
    const screenshotName = prompt('Enter the name for your screenshot:', 'screenshot');
    if (screenshotName) {
      html2canvas(document.body).then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = screenshotName + '.png';
        link.click();
      });
    }
  };

  const saveAsPDF = () => {
    const pdfName = prompt('Enter the name for your PDF:', 'document');
    if (pdfName) {
      html2canvas(document.body).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 300, 297);
        pdf.save(pdfName + '.pdf');
      });
    }
  };

  return (
    <div className="container-fluid" id="color">
      <div className="row m-3">
        <div className="col-md-8 col-sm-12">
          <div className="d-flex justify-content-between mb-2 bg-dark rounded p-2 flex-wrap">
            <div className="w-auto mb-2 mb-md-0">
              <select
                className="form-select"
                id="languageSelect"
                onChange={(e) => handleLanguageChange(e.target.value)}
                value={language}
                style={{ width: '150px' }}
              >
                <option value="">Choose Language</option>
                <option value="Java">Java</option>
                <option value="Cpp">C++</option>
                <option value="Python">Python</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="w-auto mb-2 mb-md-0">
              <select
                className="form-select"
                id="themeSelect"
                onChange={(e) => setTheme(e.target.value)}
                value={theme}
                style={{ width: '150px' }}
              >
                <option value="">Choose Theme</option>
                <option value="dracula">Dracula</option>
                <option value="eclipse">Eclipse</option>
                <option value="material">Material</option>
                <option value="monokai">Monokai</option>
              </select>
            </div>
            <div className="d-flex w-auto justify-content-between">
            <button onClick={handleRun} className="btn btn-success me-2">
  <i className="bi bi-play-fill" style={{ fontSize: '2rem' }}></i> {/* Adjust the size as needed */}
</button>



            </div>
          </div>

          <textarea
            id="editor"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
            rows="10"
          />
        </div>

        <div className="col-md-4 col-sm-12">
          <div className="mb-3">
            <label htmlFor="input" className="styled">Input</label>
            <textarea
              id="input"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input for the code..."
              rows="5"
            />
          </div>
          <div>
            <label htmlFor="output" className="styled">Output</label>
            <textarea
              id="output"
              className="form-control"
              value={output}
              readOnly
              rows="5"
            />
          </div>

          <div className="d-flex flex-column flex-md-row mt-2">
            <button onClick={captureScreenshot} className="btn btn-success me-2 mb-2 mb-md-0 me-md-2 w-auto">
              Screenshot
            </button>
            <button onClick={saveAsPDF} className="btn btn-success me-2 w-auto">
              Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
