const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const QUESTIONS = [
  { id: 1, cat: "GK", q: "Capital of India?", opt: ["New Delhi", "Mumbai", "Kolkata", "Chennai"], a: 0 },
  { id: 2, cat: "GK", q: "Largest planet?", opt: ["Earth", "Mars", "Jupiter", "Saturn"], a: 2 },
  { id: 3, cat: "GK", q: "Who wrote Ramayana?", opt: ["Ved Vyasa", "Valmiki", "Kalidasa", "Tulsidas"], a: 1 },
  { id: 4, cat: "GK", q: "National animal of India?", opt: ["Elephant", "Lion", "Tiger", "Peacock"], a: 2 },
  { id: 5, cat: "GK", q: "Smallest continent?", opt: ["Europe", "Australia", "Africa", "Asia"], a: 1 },
  { id: 6, cat: "GK", q: "States in India?", opt: ["25", "28", "30", "27"], a: 1 },
  { id: 7, cat: "GK", q: "Currency of Japan?", opt: ["Dollar", "Yen", "Rupee", "Euro"], a: 1 },
  { id: 8, cat: "GK", q: "Longest river?", opt: ["Ganga", "Amazon", "Nile", "Yangtze"], a: 2 },
  { id: 9, cat: "GK", q: "Founder of Microsoft?", opt: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Steve Wozniak"], a: 1 },
  { id: 10, cat: "GK", q: "Chemical symbol for water?", opt: ["HO", "H2O", "O2", "H2O2"], a: 1 },
  { id: 11, cat: "C++", q: "What is C++?", opt: ["Programming Language", "Database", "OS", "Hardware"], a: 0 },
  { id: 12, cat: "C++", q: "Who created C++?", opt: ["Bill Gates", "Bjarne Stroustrup", "Dennis Ritchie", "Steve Jobs"], a: 1 },
  { id: 13, cat: "C++", q: "Output symbol?", opt: ["cin", "cout", "printf", "scan"], a: 1 },
  { id: 14, cat: "C++", q: "Size of int?", opt: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"], a: 1 },
  { id: 15, cat: "C++", q: "NOT a data type?", opt: ["int", "float", "char", "stringy"], a: 3 },
  { id: 16, cat: "C++", q: "++ operator?", opt: ["Add 1", "Subtract 1", "Multiply", "Divide"], a: 0 },
  { id: 17, cat: "C++", q: "Entry point?", opt: ["start()", "main()", "begin()", "run()"], a: 1 },
  { id: 18, cat: "C++", q: "What is class?", opt: ["Blueprint for objects", "Variable", "Function", "Loop"], a: 0 },
  { id: 19, cat: "C++", q: "Input symbol?", opt: ["cout", "cin", "input", "read"], a: 1 },
  { id: 20, cat: "C++", q: "OOP?", opt: ["Object Oriented Programming", "Operating System", "Output Operation", "None"], a: 0 },
  { id: 21, cat: "HTML", q: "What does HTML stand for?", opt: ["HyperText Markup Language", "HighText Machine", "HyperTool", "Home Tool"], a: 0 },
  { id: 22, cat: "HTML", q: "Largest heading?", opt: ["<h1>", "<h6>", "<head>", "<heading>"], a: 0 },
  { id: 23, cat: "HTML", q: "Paragraph?", opt: ["<p>", "<paragraph>", "<text>", "<para>"], a: 0 },
  { id: 24, cat: "HTML", q: "Image tag?", opt: ["<img>", "<image>", "<pic>", "<imgref>"], a: 0 },
  { id: 25, cat: "HTML", q: "Image URL?", opt: ["src", "href", "url", "link"], a: 0 },
  { id: 26, cat: "HTML", q: "Hyperlink?", opt: ["<a href=u>l</a>", "<link u>", "<a u>", "<href u>"], a: 0 },
  { id: 27, cat: "HTML", q: "Table row?", opt: ["<tr>", "<td>", "<table>", "<row>"], a: 0 },
  { id: 28, cat: "HTML", q: "Bullet points?", opt: ["<ul>", "<ol>", "<li>", "<bullet>"], a: 0 },
  { id: 29, cat: "HTML", q: "<br> does?", opt: ["Line break", "Bold", "Break page", "None"], a: 0 },
  { id: 30, cat: "HTML", q: "Form?", opt: ["<form>", "<input>", "<textfield>", "<submit>"], a: 0 },
  { id: 31, cat: "JS", q: "What is JavaScript?", opt: ["Programming language", "Database", "OS", "Hardware"], a: 0 },
  { id: 32, cat: "JS", q: "Variable keyword?", opt: ["var", "variable", "int", "string"], a: 0 },
  { id: 33, cat: "JS", q: "DOM stands for?", opt: ["Document Object Model", "Data Object", "Doc Order", "Data Order"], a: 0 },
  { id: 34, cat: "JS", q: "String to int?", opt: ["parseInt()", "toString()", "concat()", "split()"], a: 0 },
  { id: 35, cat: "JS", q: "2 + '2'?", opt: ["4", "'22'", "Error", "22"], a: 1 },
  { id: 36, cat: "JS", q: "Comment?", opt: ["//", "#", "<!--", "**"], a: 0 },
  { id: 37, cat: "JS", q: "JSON?", opt: ["JS Object Notation", "JS Output", "Java Source", "JS Standard"], a: 0 },
  { id: 38, cat: "JS", q: "NOT valid type?", opt: ["Boolean", "Char", "String", "Number"], a: 1 },
  { id: 39, cat: "JS", q: "Function?", opt: ["function f()", "function:f()", "f:", "create f()"], a: 0 },
  { id: 40, cat: "JS", q: "Equality?", opt: ["==", "=", "===", "!="], a: 0 },
  { id: 41, cat: "CSS", q: "What does CSS stand for?", opt: ["Creative Style", "Computer Style", "Cascading Style", "Colorful Style"], a: 2 },
  { id: 42, cat: "CSS", q: "Text color?", opt: ["color", "text-color", "font-color", "text-style"], a: 0 },
  { id: 43, cat: "CSS", q: "Background color?", opt: ["background-color", "bg-color", "background", "color-bg"], a: 0 },
  { id: 44, cat: "CSS", q: "Select id?", opt: ["#demo", ".demo", "demo", "*demo"], a: 0 },
  { id: 45, cat: "CSS", q: "Select class?", opt: ["#test", ".test", "test", "*test"], a: 1 },
  { id: 46, cat: "CSS", q: "Font size?", opt: ["font-size", "size", "text-size", "fontsize"], a: 0 },
  { id: 47, cat: "CSS", q: "Set margin?", opt: ["margin", "spacing", "border-spacing", "gap"], a: 0 },
  { id: 48, cat: "CSS", q: "Set padding?", opt: ["padding", "margin", "spacing", "gap"], a: 0 },
  { id: 49, cat: "CSS", q: "Change font?", opt: ["font-family", "font", "text-font", "typeface"], a: 0 },
  { id: 50, cat: "CSS", q: "Bold text?", opt: ["font-weight:bold", "bold:true", "text-bold", "font-style"], a: 0 },
  { id: 51, cat: "Python", q: "What is Python?", opt: ["Programming language", "Database", "OS", "Hardware"], a: 0 },
  { id: 52, cat: "Python", q: "Who created Python?", opt: ["Guido van Rossum", "Bill Gates", "Dennis Ritchie", "Linus Torvalds"], a: 0 },
  { id: 53, cat: "Python", q: "Comment symbol?", opt: ["#", "//", "<!--", "**"], a: 0 },
  { id: 54, cat: "Python", q: "Print to console?", opt: ["print()", "console.log()", "printf()", "echo()"], a: 0 },
  { id: 55, cat: "Python", q: "NOT a data type?", opt: ["int", "float", "string", "char"], a: 3 },
  { id: 56, cat: "Python", q: "Function keyword?", opt: ["def", "function", "define", "func"], a: 0 },
  { id: 57, cat: "Python", q: "Loop through range?", opt: ["for", "while", "do-while", "repeat"], a: 0 },
  { id: 58, cat: "Python", q: "Create list?", opt: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"], a: 0 },
  { id: 59, cat: "Python", q: "2 + 3 * 4?", opt: ["14", "20", "18", "12"], a: 0 },
  { id: 60, cat: "Python", q: "Import module?", opt: ["import", "include", "require", "using"], a: 0 },
  { id: 61, cat: "ML", q: "What is Machine Learning?", opt: ["AI learns from data", "Manual prog", "Database", "OS"], a: 0 },
  { id: 62, cat: "ML", q: "NOT a type of ML?", opt: ["Supervised", "Unsupervised", "Reinforcement", "Deterministic"], a: 3 },
  { id: 63, cat: "ML", q: "Training data?", opt: ["Data to train model", "Test data", "Output", "Error"], a: 0 },
  { id: 64, cat: "ML", q: "Overfitting?", opt: ["Memorizes data", "Learns well", "Too simple", "Fails"], a: 0 },
  { id: 65, cat: "ML", q: "Supervised algo?", opt: ["Regression", "K-Means", "PCA", "DBSCAN"], a: 0 },
  { id: 66, cat: "ML", q: "Accuracy?", opt: ["Correct/Total", "Error rate", "Loss", "Time"], a: 0 },
  { id: 67, cat: "ML", q: "Neural network?", opt: ["Interconnected nodes", "Database", "Algo", "Hardware"], a: 0 },
  { id: 68, cat: "ML", q: "Deep learning?", opt: ["ML with deep nets", "Simple ML", "Manual", "Storage"], a: 0 },
  { id: 69, cat: "ML", q: "NOT classification?", opt: ["Linear Regression", "SVM", "Random Forest", "KNN"], a: 0 },
  { id: 70, cat: "ML", q: "Feature extraction?", opt: ["Select important", "Remove data", "Add data", "Store data"], a: 0 },
  { id: 71, cat: "Full Stack", q: "What is Full Stack?", opt: ["Frontend + Backend", "Only Frontend", "Only Backend", "DB only"], a: 0 },
  { id: 72, cat: "Full Stack", q: "NOT frontend?", opt: ["React", "Angular", "Vue", "Node.js"], a: 3 },
  { id: 73, cat: "Full Stack", q: "API?", opt: ["App Prog Interface", "Adv Program", "App Int", "Auto"], a: 0 },
  { id: 74, cat: "Full Stack", q: "Backend lang?", opt: ["Node.js", "React", "Angular", "Vue"], a: 0 },
  { id: 75, cat: "Full Stack", q: "REST API?", opt: ["RESTful Web", "Remote Enc", "Real Time", "None"], a: 0 },
  { id: 76, cat: "Full Stack", q: "NoSQL DB?", opt: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"], a: 0 },
  { id: 77, cat: "Full Stack", q: "CRUD?", opt: ["Create Read Update Delete", "Code Run Update Delete", "Create Run Update Data", "None"], a: 0 },
  { id: 78, cat: "Full Stack", q: "Version control?", opt: ["Git", "Node", "React", "Mongo"], a: 0 },
  { id: 79, cat: "Full Stack", q: "DevOps?", opt: ["Dev + Ops", "DB + Ops", "Deploy + Ops", "None"], a: 0 },
  { id: 80, cat: "Full Stack", q: "Cloud?", opt: ["AWS", "React", "Node", "Mongo"], a: 0 },
  { id: 81, cat: "DS", q: "What is Data Science?", opt: ["Insights from data", "DB management", "Web dev", "Hardware"], a: 0 },
  { id: 82, cat: "DS", q: "NOT a DS tool?", opt: ["Python", "R", "Excel", "Photoshop"], a: 3 },
  { id: 83, cat: "DS", q: "Data viz?", opt: ["Graphs/charts", "Cleaning", "Storage", "Backup"], a: 0 },
  { id: 84, cat: "DS", q: "Regression?", opt: ["Predict continuous", "Classification", "Clustering", "None"], a: 0 },
  { id: 85, cat: "DS", q: "Python lib?", opt: ["Pandas", "React", "Node", "Mongo"], a: 0 },
  { id: 86, cat: "DS", q: "Mean?", opt: ["Average", "Middle", "Most frequent", "None"], a: 0 },
  { id: 87, cat: "DS", q: "Median?", opt: ["Middle value", "Average", "Most frequent", "None"], a: 0 },
  { id: 88, cat: "DS", q: "Mode?", opt: ["Most frequent", "Average", "Middle", "None"], a: 0 },
  { id: 89, cat: "DS", q: "Big Data?", opt: ["Very large datasets", "Small datasets", "DB", "None"], a: 0 },
  { id: 90, cat: "DS", q: "Clustering algo?", opt: ["K-Means", "Regression", "SVM", "PCA"], a: 0 },
  { id: 91, cat: "AI & DS", q: "What is AI?", opt: ["Mimics human intelligence", "DB system", "Web dev", "Hardware"], a: 0 },
  { id: 92, cat: "AI & DS", q: "NOT a type of AI?", opt: ["Weak AI", "Strong AI", "Super AI", "Dark AI"], a: 3 },
  { id: 93, cat: "AI & DS", q: "What is ML?", opt: ["AI learns from data", "Manual prog", "Database", "OS"], a: 0 },
  { id: 94, cat: "AI & DS", q: "What is Deep Learning?", opt: ["ML with neural nets", "Simple ML", "Manual", "Storage"], a: 0 },
  { id: 95, cat: "AI & DS", q: "DS tool?", opt: ["Python", "React", "Node", "Mongo"], a: 0 },
  { id: 96, cat: "AI & DS", q: "Neural network?", opt: ["Interconnected nodes", "Database", "Algorithm", "Hardware"], a: 0 },
  { id: 97, cat: "AI & DS", q: "Classification?", opt: ["Predict categories", "Predict values", "Clustering", "None"], a: 0 },
  { id: 98, cat: "AI & DS", q: "Clustering?", opt: ["Grouping similar", "Classification", "Regression", "None"], a: 0 },
  { id: 99, cat: "AI & DS", q: "AI algorithm?", opt: ["Decision Tree", "SQL", "HTML", "CSS"], a: 0 },
  { id: 100, cat: "AI & DS", q: "NLP?", opt: ["Natural Language Processing", "New Language Program", "Natural Loop Process", "None"], a: 0 }
];

const userSessions = {};

app.post('/api/session/start', (req, res) => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2)}`;
  const category = req.body.category || 'ALL';

  const questions = category === 'ALL'
    ? QUESTIONS
    : QUESTIONS.filter(q => q.cat === category);

  userSessions[sessionId] = {
    questions,
    currentQuestion: 0,
    answers: [],
    score: 0,
    createdAt: new Date(),
    category
  };

  res.json({
    success: true,
    sessionId,
    totalQuestions: questions.length,
    category,
    currentQuestion: 0,
    currentQuestionData: questions[0]
  });
});

app.get('/api/session/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = userSessions[sessionId];

  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  const currentQuestionIndex = session.currentQuestion;
  const currentQuestionData = currentQuestionIndex < session.questions.length
    ? session.questions[currentQuestionIndex]
    : null;

  res.json({
    success: true,
    data: {
      sessionId,
      totalQuestions: session.questions.length,
      currentQuestion: session.currentQuestion,
      score: session.score,
      category: session.category,
      currentQuestionData,
      answersCount: session.answers.length,
      isCompleted: session.currentQuestion >= session.questions.length
    }
  });
});

app.get('/api/session/:sessionId/question', (req, res) => {
  const sessionId = req.params.sessionId;
  const index = parseInt(req.query.index || '0', 10);
  const session = userSessions[sessionId];

  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  if (index < 0 || index >= session.questions.length) {
    return res.status(400).json({ success: false, message: 'Invalid question index' });
  }

  const question = session.questions[index];

  res.json({
    success: true,
    data: {
      sessionId,
      currentIndex: index,
      totalQuestions: session.questions.length,
      previousIndex: index > 0 ? index - 1 : null,
      nextIndex: index < session.questions.length - 1 ? index + 1 : null,
      question
    }
  });
});

app.post('/api/session/answer', (req, res) => {
  const { sessionId, questionId, selectedOption } = req.body;

  if (!sessionId || questionId === undefined || selectedOption === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  const session = userSessions[sessionId];
  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  const question = session.questions.find(q => q.id === questionId);
  if (!question) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }

  const isCorrect = selectedOption === question.a;
  if (isCorrect) session.score++;

  session.answers.push({
    questionId,
    selectedOption,
    correctOption: question.a,
    isCorrect,
    question: question.q
  });

  session.currentQuestion++;

  res.json({
    success: true,
    isCorrect,
    score: session.score,
    currentQuestion: session.currentQuestion,
    totalQuestions: session.questions.length
  });
});

app.get('/api/session/:sessionId/results', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = userSessions[sessionId];

  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  const percentage = (session.score / session.questions.length) * 100;

  res.json({
    success: true,
    data: {
      score: session.score,
      totalQuestions: session.questions.length,
      accuracy: percentage.toFixed(1),
      answers: session.answers
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`✅ API endpoints ready`);
});