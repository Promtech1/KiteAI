"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full fade-in"></div>
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent/30 rounded-full fade-in"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-1 h-1 bg-secondary/30 rounded-full fade-in"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary/30 rounded-full fade-in"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <Card className="w-full max-w-2xl p-8 text-center border-border/50 bg-card/95 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Image src="/avatar.png" alt="Kite Quest Logo" width={80} height={80} className="rounded-lg" />
            </div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Test your knowledge of the Kite blockchain ecosystem, validators, subnets, and AI infrastructure.
              Challenge yourself with 5 randomized questions!
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onStart}
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground subtle-glow"
            >
              Start Quiz
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 text-sm text-muted-foreground">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">5</span>
              </div>
              <span>Questions</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center">
                <span className="text-accent-foreground font-bold">⏱️</span>
              </div>
              <span>10 Minutes</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center">
                <span className="text-secondary-foreground font-bold">🧠</span>
              </div>
              <span>Blockchain</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
