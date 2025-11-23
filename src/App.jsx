import React, { useState, useEffect, useCallback, useMemo } from 'react';
import "./App.css";
import Navbar from './components/Navbar';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import Markdown from 'react-markdown';
import RingLoader from "react-spinners/RingLoader";
import { GoogleGenAI } from "@google/genai";

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
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const ai = new GoogleGenAI({ apiKey: "your_api_key_here" });

  const customStyles = {
    control: (provided) => ({ ...provided, backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff', width: "100%" }),
    menu: (provided) => ({ ...provided, backgroundColor: '#18181b', color: '#fff', width: "100%" }),
    singleValue: (provided) => ({ ...provided, color: '#fff', width: "100%" }),
    option: (provided, state) => ({ ...provided, backgroundColor: state.isFocused ? '#27272a' : '#18181b', color: '#fff', cursor: 'pointer' }),
    input: (provided) => ({ ...provided, color: '#fff', width: "100%" }),
    placeholder: (provided) => ({ ...provided, color: '#a1a1aa', width: "100%" }),
  };

  // ---------------- Language Templates ----------------
  const codeTemplates = {
    javascript: `// JavaScript Template
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10));`,

    python: `# Python Template
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
print(fibonacci(10))`,

    java: `// Java Template
public class Fibonacci {
  public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  public static void main(String[] args) {
    System.out.println(fibonacci(10));
  }
}`,

    csharp: `// C# Template
using System;
class Fibonacci {
  static int Fib(int n) {
    if (n <= 1) return n;
    return Fib(n-1)+Fib(n-2);
  }
  static void Main() {
    Console.WriteLine(Fib(10));
  }
}`,

    cpp: `// C++ Template
#include <iostream>
using namespace std;
int fibonacci(int n) {
  if(n <= 1) return n;
  return fibonacci(n-1)+fibonacci(n-2);
}
int main() {
  cout << fibonacci(10);
  return 0;
}`,

    php: `<?php
function fibonacci($n) {
  if($n <= 1) return $n;
  return fibonacci($n-1)+fibonacci($n-2);
}
echo fibonacci(10);
?>`,

    ruby: `# Ruby Template
def fibonacci(n)
  return n if n <= 1
  fibonacci(n-1)+fibonacci(n-2)
end
puts fibonacci(10)`,

    go: `// Go Template
package main
import "fmt"
func fibonacci(n int) int {
  if n <= 1 { return n }
  return fibonacci(n-1)+fibonacci(n-2)
}
func main() {
  fmt.Println(fibonacci(10))
}`,

    swift: `// Swift Template
func fibonacci(_ n: Int) -> Int {
  if n <= 1 { return n }
  return fibonacci(n-1)+fibonacci(n-2)
}
print(fibonacci(10))`,

    kotlin: `// Kotlin Template
fun fibonacci(n: Int): Int {
  if (n <= 1) return n
  return fibonacci(n-1)+fibonacci(n-2)
}
fun main() {
  println(fibonacci(10))
}`,

    typescript: `// TypeScript Template
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n-1)+fibonacci(n-2);
}
console.log(fibonacci(10));`,

    rust: `// Rust Template
fn fibonacci(n: u32) -> u32 {
  if n <= 1 { return n }
  fibonacci(n-1)+fibonacci(n-2)
}
fn main() { println!("{}", fibonacci(10)); }`,

    dart: `// Dart Template
int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n-1)+fibonacci(n-2);
}
void main() { print(fibonacci(10)); }`,

    scala: `// Scala Template
def fibonacci(n: Int): Int = {
  if(n <= 1) n else fibonacci(n-1)+fibonacci(n-2)
}
println(fibonacci(10))`,

    perl: `# Perl Template
sub fibonacci {
  my $n = shift;
  return $n if $n <= 1;
  return fibonacci($n-1)+fibonacci($n-2);
}
print fibonacci(10);`,

    haskell: `-- Haskell Template
fibonacci 0 = 0
fibonacci 1 = 1
fibonacci n = fibonacci(n-1)+fibonacci(n-2)
main = print (fibonacci 10)`,

    elixir: `# Elixir Template
defmodule Fibonacci do
  def fib(n) when n <= 1, do: n
  def fib(n), do: fib(n-1)+fib(n-2)
end
IO.puts Fibonacci.fib(10)`,

    r: `# R Template
fibonacci <- function(n) {
  if(n <= 1) return(n)
  fibonacci(n-1)+fibonacci(n-2)
}
print(fibonacci(10))`,

    matlab: `% MATLAB Template
function f = fibonacci(n)
  if n <= 1
      f = n;
  else
      f = fibonacci(n-1)+fibonacci(n-2);
  end
end
disp(fibonacci(10))`,

    bash: `# Bash Template
fibonacci() {
  if [ $1 -le 1 ]; then
    echo $1
  else
    echo $(( $(fibonacci $(($1-1))) + $(fibonacci $(($1-2))) ))
  fi
}
fibonacci 10`
  };

  // ---------------- Gemini AI Review ----------------
  const reviewCode = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter code first");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    setResponse("");
    setError("");

    try {
      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are an expert-level software developer.
Analyze this ${selectedOption.value} code thoroughly like a senior developer reviewing a pull request:

Code: ${code}

Provide:
1. Quality rating (Better, Good, Normal, Bad)
2. Detailed suggestions & best practices
3. Step-by-step explanation
4. Potential bugs or logical errors
5. Syntax/runtime errors
6. Fix recommendations`
      });
      setResponse(aiResponse.text);
    } catch (err) {
      console.error("AI Error:", err);
      setError("Failed to get AI response. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  }, [ai.models, code, selectedOption.value]);

  // ---------------- Save & Load ----------------
  const saveCode = useCallback(() => {
    if (!code.trim()) { setError("No code to save!"); setTimeout(() => setError(""), 3000); return; }
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
          const extension = file.name.split('.').pop().toLowerCase();
          const languageMap = {
            'js':'javascript','py':'python','java':'java','cs':'csharp','cpp':'cpp','c':'cpp',
            'php':'php','rb':'ruby','go':'go','swift':'swift','kt':'kotlin','ts':'typescript',
            'rs':'rust','dart':'dart','scala':'scala','pl':'perl','hs':'haskell','ex':'elixir',
            'r':'r','m':'matlab','sh':'bash'
          };
          if(languageMap[extension]) {
            const languageOption = options.find(opt => opt.value === languageMap[extension]);
            if(languageOption) setSelectedOption(languageOption);
          }
          setSuccess(`File "${file.name}" loaded successfully!`);
          setTimeout(() => setSuccess(""), 3000);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [options]);

  // ---------------- Keyboard Shortcuts ----------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.ctrlKey || e.metaKey) {
        switch(e.key){
          case 's': e.preventDefault(); saveCode(); break;
          case 'o': e.preventDefault(); loadCode(); break;
          case 'Enter': e.preventDefault(); reviewCode(); break;
          case 'k': e.preventDefault(); setIsDarkTheme(!isDarkTheme); break;
          default: break;
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDarkTheme, saveCode, loadCode, reviewCode]);

  return (
    <>
      <Navbar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      {error && <div className="error-message fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md">{error}</div>}
      {success && <div className="success-message fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md">{success}</div>}

      <div className="main flex justify-between" style={{ height: "calc(100vh - 90px)" }}>
        <div className="left h-[87.5%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <Select value={selectedOption} onChange={setSelectedOption} options={options} styles={customStyles} />
            <button onClick={reviewCode} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Review</button>
            <button onClick={saveCode} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Save</button>
            <button onClick={loadCode} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Load</button>
            <button onClick={() => {
              const template = codeTemplates[selectedOption.value];
              if(template){
                setCode(template);
                setSuccess(`Loaded ${selectedOption.label} template!`);
                setTimeout(() => setSuccess(""), 3000);
              } else {
                alert("No template available for this language!");
              }
            }} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Template</button>
          </div>
          <Editor height="100%" theme='vs-dark' language={selectedOption.value} value={code} onChange={setCode} />
        </div>

        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[101%]">
          <div className="topTab border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justify-between h-[60px]">
            <p className='font-[700] text-[17px]'>Response</p>
          </div>
          {loading && <RingLoader color='#3358eaff' />}
          <Markdown>{response}</Markdown>
        </div>
      </div>
    </>
  );
};

export default App;
