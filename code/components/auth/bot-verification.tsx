'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface BotVerificationProps {
  onVerified: () => void
}

export default function BotVerification({ onVerified }: BotVerificationProps) {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [challenges, setChallenges] = useState<number[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userAnswers, setUserAnswers] = useState<boolean[]>([])

  useEffect(() => {
    generateChallenges()
  }, [])

  const generateChallenges = () => {
    const newChallenges = Array(3)
      .fill(0)
      .map(() => Math.random() > 0.5 ? 1 : 0)
    setChallenges(newChallenges)
    setCurrentChallenge(0)
    setUserAnswers([])
  }

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...userAnswers, answer]
    setUserAnswers(newAnswers)

    if (newAnswers.length === challenges.length) {
      const allCorrect = newAnswers.every((ans, idx) => ans === Boolean(challenges[idx]))
      if (allCorrect) {
        setIsVerified(true)
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          onVerified()
        }, 800)
      } else {
        generateChallenges()
      }
    } else {
      setCurrentChallenge(newAnswers.length)
    }
  }

  const getChallengeText = () => {
    const isEven = challenges[currentChallenge] === 0
    return {
      question: isEven 
        ? `Is the number ${Math.floor(Math.random() * 20)} even?`
        : `Is the number ${Math.floor(Math.random() * 20) + 1} odd?`,
      correct: isEven ? (Math.floor(Math.random() * 20) % 2 === 0) : ((Math.floor(Math.random() * 20) + 1) % 2 === 1),
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 animate-fade-in shadow-2xl border border-orange-100 dark:border-gray-800 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 bg-clip-text text-transparent flex items-center justify-center gap-2">
            {isVerified ? (
              <>
                <Check className="w-6 h-6" /> Verified
              </>
            ) : (
              'Are you human?'
            )}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {isVerified 
              ? 'Verification complete! Redirecting...'
              : `Question ${currentChallenge + 1} of ${challenges.length}`}
          </p>
        </CardHeader>
        <CardContent>
          {!isVerified && challenges.length > 0 && (
            <div className="space-y-6 animate-scale-in">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800 text-center">
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Click the correct answer
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleAnswer(true)}
                    variant="outline"
                    className="border-orange-300 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 transform transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleAnswer(false)}
                    variant="outline"
                    className="border-orange-300 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 transform transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    No
                  </Button>
                </div>
              </div>

              <div className="flex gap-1">
                {challenges.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      idx < userAnswers.length
                        ? 'bg-orange-600'
                        : idx === currentChallenge
                        ? 'bg-orange-400 animate-pulse-soft'
                        : 'bg-orange-100 dark:bg-orange-900/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {isVerified && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-orange-600 dark:text-orange-500" />
              </div>
              <p className="text-sm text-muted-foreground">You're verified!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
