"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ScoreboardScreenProps {
  score: number
  totalQuestions: number
  questions: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
  }>
  userAnswers: (number | null)[]
  onPlayAgain: () => void
}

export function ScoreboardScreen({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onPlayAgain,
}: ScoreboardScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const percentage = Math.round((score / totalQuestions) * 100)

  const getRank = () => {
    if (percentage >= 90) return { rank: "Kite Master", color: "text-accent", icon: "🏆" }
    if (percentage >= 75) return { rank: "Blockchain Expert", color: "text-primary", icon: "⭐" }
    if (percentage >= 60) return { rank: "Validator", color: "text-secondary", icon: "🔗" }
    if (percentage >= 40) return { rank: "Node Operator", color: "text-muted-foreground", icon: "⚡" }
    return { rank: "Future Builder", color: "text-muted-foreground", icon: "🚀" }
  }

  const rankInfo = getRank()

  useEffect(() => {
    if (score > 0) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [score])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className="w-full max-w-4xl p-8 text-center border-border/50 bg-card/95 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <Image src="/avatar.png" alt="Kite Quest" width={50} height={50} className="rounded-lg" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Quiz Complete!</h1>
            </div>

            <div className="space-y-2">
              <div className="text-6xl md:text-8xl font-bold text-secondary">
                {score}/{totalQuestions}
              </div>
              <div className="text-2xl text-muted-foreground">{percentage}% Correct</div>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <span className="text-3xl">{rankInfo.icon}</span>
              <span className={`text-xl font-bold ${rankInfo.color}`}>{rankInfo.rank}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-primary font-bold text-lg">{score}</div>
              <div className="text-muted-foreground">Correct</div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="text-secondary font-bold text-lg">{totalQuestions - score}</div>
              <div className="text-muted-foreground">Incorrect</div>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="text-accent font-bold text-lg">{percentage}%</div>
              <div className="text-muted-foreground">Accuracy</div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={() => setShowReview(!showReview)} variant="outline" className="mb-4">
              {showReview ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Hide Review
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Review Answers
                </>
              )}
            </Button>
          </div>

          {showReview && (
            <div className="space-y-4 text-left">
              <h3 className="text-xl font-bold text-center mb-6">Answer Review</h3>
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <Card
                    key={question.id}
                    className={`p-4 border-2 ${
                      isCorrect ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm">Question {index + 1}</h4>
                        <span className={`text-sm font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">{question.question}</p>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-muted-foreground">Your answer:</span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {userAnswer !== null ? question.options[userAnswer] : "No answer"}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-muted-foreground">Correct answer:</span>
                            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                              {question.options[question.correctAnswer]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={onPlayAgain}
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground subtle-glow"
            >
              Play Again
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
