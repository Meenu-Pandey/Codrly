AI Code Reviewer & Editor

A React-based code editor with AI-powered code review, multi-language support, templates, and file save/load functionality. Integrated with Google Gemini AI, this tool provides developers with detailed code analysis, best practices, and suggestions for improvement.

Features

Multi-language support: JavaScript, Python, Java, C#, C++, PHP, Ruby, Go, Swift, Kotlin, TypeScript, Rust, Dart, Scala, Perl, Haskell, Elixir, R, MATLAB, Bash.

Language templates: Preloaded boilerplate code for all supported languages.

AI code review: Powered by Google Gemini AI for quality analysis, suggestions, bug detection, and syntax/runtime error checks.

Interactive editor: Monaco Editor with dark/light theme toggle.

Save & Load: Save your code locally and load code files with automatic language detection.

Keyboard shortcuts:

Ctrl + S → Save code

Ctrl + O → Load code

Ctrl + Enter → Review code

Ctrl + K → Toggle dark/light theme

Markdown response viewer: Displays AI-generated review in an easy-to-read format.

Loading indicators: Visual feedback while AI generates responses.

Installation

Clone the repository

git clone https://github.com/yourusername/ai-code-reviewer.git
cd ai-code-reviewer


Install dependencies

npm install


Set your Google Gemini AI API key

Replace YOUR_API_KEY in App.js:

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

Usage

Start the development server

npm start


Open your browser at http://localhost:3000.

Steps to use the editor:

Select the programming language from the dropdown.

Load a template by clicking the Template button.

Write or paste your code in the editor.

Click Review to get AI suggestions.

Save or load your code using the Save/Load buttons.

Dependencies

React

Monaco Editor

React-Select

React-Markdown

React-Spinners

Google GenAI SDK

File Structure
ai-code-reviewer/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── App.js
│   └── App.css
├── package.json
└── README.md

Future Enhancements

Auto-fix code using AI suggestions.

Theme customization with multiple color schemes.

GitHub Gist integration for saving/loading code online.

Collaborative real-time editing with AI review for teams.

License

This project is licensed under the MIT License.
