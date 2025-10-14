import React, { useState, useEffect, useCallback, useMemo } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import Markdown from 'react-markdown'
import RingLoader from "react-spinners/RingLoader";
import { apiService } from './services/api';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  const options = useMemo(() => [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ], []);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', // dark background (similar to bg-zinc-900)
      borderColor: '#3f3f46',
      color: '#fff',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', // dropdown bg
      color: '#fff',
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',  // selected option text
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#27272a' : '#18181b',  // hover effect
      color: '#fff',
      cursor: 'pointer',
      // width: "30%"
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a1a1aa',  // placeholder text color
      width: "100%"
    }),
  };

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const codeTemplates = {
    javascript: `// JavaScript Template
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10)); // Output: 55

// Optimized version with memoization
const memoizedFibonacci = (() => {
    const cache = {};
    return function(n) {
        if (n in cache) return cache[n];
        if (n <= 1) return n;
        cache[n] = memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
        return cache[n];
    };
})();`,
    python: `# Python Template
def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example usage
print(fibonacci(10))  # Output: 55

# Optimized version with memoization
from functools import lru_cache

@lru_cache(maxsize=None)
def memoized_fibonacci(n):
    if n <= 1:
        return n
    return memoized_fibonacci(n - 1) + memoized_fibonacci(n - 2)`,
    java: `// Java Template
public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10)); // Output: 55
    }
}`
  };

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const saveCode = useCallback(() => {
    if (!code.trim()) {
      setError("No code to save!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${selectedOption.value}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSuccess("Code saved successfully!");
    setTimeout(() => setSuccess(""), 3000);
  }, [code, selectedOption.value]);

  const loadCode = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.js,.py,.java,.cs,.cpp,.php,.rb,.go,.swift,.kt,.ts,.rs,.dart,.scala,.pl,.hs,.ex,.r,.m,.sh,.txt';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setCode(content);
          
          // Try to detect language from file extension
          const extension = file.name.split('.').pop().toLowerCase();
          const languageMap = {
            'js': 'javascript',
            'py': 'python',
            'java': 'java',
            'cs': 'csharp',
            'cpp': 'cpp',
            'c': 'cpp',
            'php': 'php',
            'rb': 'ruby',
            'go': 'go',
            'swift': 'swift',
            'kt': 'kotlin',
            'ts': 'typescript',
            'rs': 'rust',
            'dart': 'dart',
            'scala': 'scala',
            'pl': 'perl',
            'hs': 'haskell',
            'ex': 'elixir',
            'r': 'r',
            'm': 'matlab',
            'sh': 'bash'
          };
          
          if (languageMap[extension]) {
            const languageOption = options.find(opt => opt.value === languageMap[extension]);
            if (languageOption) {
              setSelectedOption(languageOption);
            }
          }
          
          setSuccess(`File "${file.name}" loaded successfully!`);
          setTimeout(() => setSuccess(""), 3000);
        };
        reader.readAsText(file);
      }
    };
    
    input.click();
  }, [setCode, setSelectedOption, options, setSuccess]);

  const fixCode = useCallback(async () => {
    if (code.trim() === "") {
      setError("Please enter code first");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    setResponse("");
    setLoading(true);

    try {
      const fixedCode = await apiService.fixCode(code, selectedOption.value);
      setCode(fixedCode);
      setSuccess("Code has been fixed!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Fix Code Error:", err);
      setError("Failed to fix code. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  }, [code, selectedOption.value, setCode, setSuccess, setError, setLoading, setResponse]);

  const reviewCode = useCallback(async () => {
    setResponse("");
    setError("");
    setLoading(true);
    
    try {
      const review = await apiService.reviewCode(code, selectedOption.value);
      setResponse(review);
    } catch (err) {
      setError("Failed to get AI response. Please try again.");
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  }, [code, selectedOption.value, setResponse, setError, setLoading]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveCode();
            break;
          case 'o':
            e.preventDefault();
            loadCode();
            break;
          case 'Enter':
            e.preventDefault();
            if (code.trim()) {
              reviewCode();
            }
            break;
          case 'k':
            e.preventDefault();
            setIsDarkTheme(!isDarkTheme);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [code, isDarkTheme, saveCode, loadCode, reviewCode]);

  return (
    <>
      <Navbar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      {error && (
        <div className="error-message fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="success-message fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md">
          {success}
        </div>
      )}
      <div className="main flex justify-between" style={{ height: "calc(100vh - 90px" }}>
        <div className="left h-[87.5%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <Select
              value={selectedOption}
              onChange={(e) => { setSelectedOption(e) }}
              options={options}
              styles={customStyles}
            />
            <button onClick={fixCode} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Fix Code</button>
            <button onClick={() => {
              if (code === "") {
                alert("Please enter code first")
              }
              else {
                reviewCode()
              }
            }} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Review</button>
            <button onClick={saveCode} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Save</button>
            <button onClick={() => {
              const template = codeTemplates[selectedOption.value];
              if (template) {
                setCode(template);
                alert(`Loaded ${selectedOption.label} template!`);
              } else {
                alert("No template available for this language!");
              }
            }} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Template</button>
          </div>

          <Editor height="100%" theme='vs-dark' language={selectedOption.value} value={code} onChange={(e) => { setCode(e) }} />
        </div>

        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[101%]">
          <div className="topTab border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justif-between h-[60px]">
            <p className='font-[700] text-[17px]'>Response</p>
          </div>
          {loading && <RingLoader color='#9333ea'/>}
          <Markdown>{response}</Markdown>
        </div>
      </div>
    </>
  )
}

export default App