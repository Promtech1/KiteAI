"use client"

import { useState } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { QuizInterface } from "@/components/quiz-interface"
import { ScoreboardScreen } from "@/components/scoreboard-screen"

export type GameState = "welcome" | "quiz" | "scoreboard"

export interface QuizData {
  questions: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
  }>
  currentQuestion: number
  score: number
  answers: (number | null)[]
  timeRemaining: number
}

const kiteQuestions = [
  {
    id: 1,
    question: "How does the platform handle independent deployments?",
    options: ["Not allowed", "Allowed with platform guidelines", "Only through partners", "Only through marketplace"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What role do validators play in the KITE blockchain?",
    options: [
      "Only distribute tokens",
      "Only manage subnets",
      "Confirm transactions and maintain network security",
      "Only process data",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "How are validator rewards earned?",
    options: [
      "Fixed monthly payments",
      "Based on stake, workload, and accuracy",
      "Only through transaction fees",
      "Only through subnet ownership",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Where can you find a leaderboard of the top models in the BitMind ecosystem?",
    options: ["BitMind Hub", "Model Playground", "Leaderboard tab", "Subnet Tracker"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is emphasized in the DEPIN section?",
    options: ["Social networking", "Infrastructure development", "Content creation", "Token trading"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "What is the primary role of the Bitte Runtime?",
    options: [
      "Mining cryptocurrency",
      "Storing user data",
      "Managing task execution and coordination across the protocol",
      "Creating smart contracts",
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "How are platform activities tracked?",
    options: [
      "Only through user reports",
      "Only through manual monitoring",
      "Through on-chain registration",
      "Only through third parties",
    ],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "What can be configured in the Settings module?",
    options: [
      "Only notifications",
      "Wallet integrations, API keys, and account preferences",
      "Only display options",
      "Only security settings",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "What can users do in the Datasheet module?",
    options: [
      "Only view data statistics",
      "Run SQL queries and inspect data",
      "Only create visualizations",
      "Only export data",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "What is a key benefit of joining a subnet?",
    options: [
      "Free services",
      "Shared incentives and community-driven development",
      "Guaranteed income",
      "Exclusive access to all data",
    ],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "What are Open Agents in the Bitte ecosystem primarily designed to be?",
    options: [
      "Smart contract validators",
      "APIs that communicate with the runtime to perform user tasks",
      "Blockchain nodes",
      "Data storage systems",
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "What is a key responsibility of subnet owners?",
    options: [
      "Only technical maintenance",
      "Managing membership and reward distribution",
      "Only content moderation",
      "Only data storage",
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: "How is income distributed in subnets?",
    options: [
      "Equally among all members",
      "Based on platform decision",
      "Subnet owners can distribute among contributors",
      "Fixed monthly payments",
    ],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "How are large volumes of data uploaded to the platform?",
    options: [
      "Only through web interface",
      "Through CLI for agents and Python SDK",
      "Only through FTP",
      "Only through email",
    ],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: "Which subnet is used for Condensing Tokens in BitMind?",
    options: ["subnet 34", "subnet 22", "subnet 47", "subnet 1"],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "Which blockchain protocols does the Bitte AI Chat component support?",
    options: ["Only NEAR Protocol", "Only EVM blockchains", "Both NEAR Protocol and EVM blockchains", "Only Solana"],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "In Kite, who can register a new service on the MCP server?",
    options: [
      "Only the Kite core team",
      "Any developer with a KitePass and API credentials",
      "Validators only",
      "Wallet providers",
    ],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "What happens if an agent exceeds its authority in Kite?",
    options: [
      "It is jailed by validators",
      "Execution is halted via governance constraints",
      "It gets refunded",
      "It spawns a backup agent",
    ],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "What does PoAI guarantee in multi-agent workflows?",
    options: ["Gasless execution", "Anonymous agent activity", "Verifiable credit assignment", "Agent obfuscation"],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: "What is one benefit of service ID registration on Kite?",
    options: [
      "Unlimited compute access",
      "Human password resets",
      "Discoverability and verifiability by agents",
      "IPFS pinning",
    ],
    correctAnswer: 2,
  },
  {
    id: 21,
    question: "What is the primary advantage of running services on a blockchain like Kite?",
    options: [
      "No transaction fees",
      "Built-in verifiability, attribution, and payment settlement",
      "Guaranteed off-chain privacy",
      "Access to GPU compute",
    ],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "What type of AI systems does Kite primarily support?",
    options: [
      "Human-supervised only",
      "Autonomous systems capable of independent operation",
      "Static rule-based chatbots",
      "Non-networked AI",
    ],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "What is the relationship between Kite's payment and identity layers?",
    options: [
      "Payments are always anonymous",
      "Identity ensures accountability in financial transactions",
      "Payment and identity are separate and unrelated",
      "Identity only applies to governance votes",
    ],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "How do agents discover services on Kite?",
    options: [
      "Searchable on-chain service registry",
      "Manual word-of-mouth sharing",
      "Validator recommendations only",
      "Static off-chain database",
    ],
    correctAnswer: 0,
  },
]

const getRandomQuestions = (allQuestions: typeof kiteQuestions, count = 5) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("welcome")
  const [quizData, setQuizData] = useState<QuizData>({
    questions: [],
    currentQuestion: 0,
    score: 0,
    answers: [],
    timeRemaining: 600, // 10 minutes timer
  })

  const startQuiz = () => {
    const randomQuestions = getRandomQuestions(kiteQuestions, 5)
    setQuizData({
      questions: randomQuestions,
      currentQuestion: 0,
      score: 0,
      answers: new Array(randomQuestions.length).fill(null),
      timeRemaining: 600,
    })
    setGameState("quiz")
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...quizData.answers]
    newAnswers[quizData.currentQuestion] = answerIndex

    setQuizData({
      ...quizData,
      answers: newAnswers,
    })
  }

  const goToNextQuestion = () => {
    if (quizData.currentQuestion < quizData.questions.length - 1) {
      setQuizData({
        ...quizData,
        currentQuestion: quizData.currentQuestion + 1,
      })
    }
  }

  const goToPreviousQuestion = () => {
    if (quizData.currentQuestion > 0) {
      setQuizData({
        ...quizData,
        currentQuestion: quizData.currentQuestion - 1,
      })
    }
  }

  const finishQuiz = () => {
    const score = quizData.answers.reduce((acc, answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        return acc + 1
      }
      return acc
    }, 0)

    setQuizData({
      ...quizData,
      score,
    })
    setGameState("scoreboard")
  }

  const updateTimer = (timeRemaining: number) => {
    setQuizData({
      ...quizData,
      timeRemaining,
    })

    if (timeRemaining <= 0) {
      finishQuiz()
    }
  }

  const resetQuiz = () => {
    setGameState("welcome")
  }

  return (
    <main className="min-h-screen bg-background">
      {gameState === "welcome" && <WelcomeScreen onStart={startQuiz} />}
      {gameState === "quiz" && (
        <QuizInterface
          quizData={quizData}
          onAnswer={handleAnswer}
          onNext={goToNextQuestion}
          onPrevious={goToPreviousQuestion}
          onFinish={finishQuiz}
          onTimerUpdate={updateTimer}
        />
      )}
      {gameState === "scoreboard" && (
        <ScoreboardScreen
          score={quizData.score}
          totalQuestions={quizData.questions.length}
          questions={quizData.questions}
          userAnswers={quizData.answers}
          onPlayAgain={resetQuiz}
        />
      )}
    </main>
  )
}
