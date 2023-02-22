import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import jsonlint from 'jsonlint-mod';
import '../index.less';

declare global {
  interface Window {
    jsonlint?: any;
  }
}

if (!window.jsonlint) {
  window.jsonlint = jsonlint;
}

const DEFAULT_OPTIONS = {
  mode: 'json',
  gutters: ['CodeMirror-lint-markers'],
  styleActiveLine: true,
  lineNumbers: true,
  line: true,
  lint: true,
};

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const JsonMode = (props) => {
  const { value, onChange, mode = 'json', lint, height, width } = props;
  const options = { ...DEFAULT_OPTIONS, mode, lint, height, width };
  return (
    <div style={{ position: 'relative' }}>
      <CodeMirror
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
        value={value || ''}
        options={options}
      />
      {value && isJson(value) && (
        <span
          className="text-description color-primary"
          style={{
            position: 'absolute',
            right: 20,
            top: 5,
            zIndex: 25,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (isJson(value)) {
              onChange(JSON.stringify(JSON.parse(value), null, 4));
            }
          }}
        >
          格式化
        </span>
      )}
    </div>
  );
};

export default JsonMode;
