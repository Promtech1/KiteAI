"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Clock, Flag } from "lucide-react"
import { useEffect, useState } from "react"
import type { QuizData } from "@/app/page"
import Image from "next/image"

interface QuizInterfaceProps {
  quizData: QuizData
  onAnswer: (answerIndex: number) => void
  onNext: () => void
  onPrevious: () => void
  onFinish: () => void
  onTimerUpdate: (timeRemaining: number) => void
}

export function QuizInterface({ quizData, onAnswer, onNext, onPrevious, onFinish, onTimerUpdate }: QuizInterfaceProps) {
  const currentQuestion = quizData.questions[quizData.currentQuestion]
  const progress = ((quizData.currentQuestion + 1) / quizData.questions.length) * 100
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeRemaining)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1
        onTimerUpdate(newTime)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimerUpdate])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const selectedAnswer = quizData.answers[quizData.currentQuestion]
  const canGoNext = quizData.currentQuestion < quizData.questions.length - 1
  const canGoPrevious = quizData.currentQuestion > 0
  const allQuestionsAnswered = quizData.answers.every((answer) => answer !== null)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header with logo, timer and progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/avatar.png" alt="Kite Quest" width={40} height={40} className="rounded-lg" />
          </div>

          <div className="flex items-center space-x-2 text-lg font-mono">
            <Clock className="w-5 h-5 text-accent" />
            <span className={`${timeRemaining <= 60 ? "text-destructive" : "text-foreground"}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Question {quizData.currentQuestion + 1} of {quizData.questions.length}
            </span>
            <span>
              Answered: {quizData.answers.filter((a) => a !== null).length}/{quizData.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-3 bg-card" />
        </div>

        {/* Question Card */}
        <Card className="p-8 border-border/50 bg-card/95 backdrop-blur-sm">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-balance leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onAnswer(index)}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  size="lg"
                  className={`p-6 text-left justify-start text-lg border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mr-4 flex-shrink-0 ${
                      selectedAnswer === index ? "bg-primary-foreground text-primary" : "bg-primary/20 text-primary"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-pretty">{option}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            {canGoNext ? (
              <Button
                onClick={onNext}
                disabled={selectedAnswer === null}
                size="lg"
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={onFinish}
                disabled={!allQuestionsAnswered}
                size="lg"
                className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Flag className="w-4 h-4" />
                <span>Finish Quiz</span>
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigation Dots */}
        <div className="flex justify-center flex-wrap gap-2">
          {quizData.questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                quizData.answers[index] !== null
                  ? "bg-accent"
                  : index === quizData.currentQuestion
                    ? "bg-primary"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
