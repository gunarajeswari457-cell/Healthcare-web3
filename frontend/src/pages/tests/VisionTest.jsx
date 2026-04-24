import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function VisionTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [clicks, setClicks] = useState(0);

  const startTest = () => {
    setIsRunning(true);
    setScore(null);
    setTimeLeft(15);
    setClicks(0);
    moveDot();
  };

  const moveDot = () => {
    const top = Math.floor(Math.random() * 80) + 10;
    const left = Math.floor(Math.random() * 80) + 10;
    setPosition({ top: `${top}%`, left: `${left}%` });
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setScore(clicks);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleDotClick = () => {
    if (!isRunning) return;
    setClicks(c => c + 1);
    moveDot();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hand-Eye Coordination</h1>
      
      <Card>
        <CardContent className="p-6">
          {!isRunning && score === null && (
            <div className="text-center py-12 space-y-4">
              <p className="text-slate-600">Click the moving target as many times as possible in 15 seconds.</p>
              <Button onClick={startTest} size="lg">Start Test</Button>
            </div>
          )}
          
          {isRunning && (
            <div className="relative h-[400px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden cursor-crosshair">
              <div className="absolute top-4 left-4 font-bold text-slate-600">Time: {timeLeft}s</div>
              <div className="absolute top-4 right-4 font-bold text-slate-600">Score: {clicks}</div>
              
              <div 
                onClick={handleDotClick}
                style={{ top: position.top, left: position.left }}
                className="absolute w-8 h-8 bg-red-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
              />
            </div>
          )}

          {score !== null && (
            <div className="text-center py-12 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Test Complete</h2>
              <p className="text-lg text-slate-700">Targets hit: <span className="font-bold text-emerald-600">{score}</span></p>
              <div className="flex justify-center gap-4 mt-4">
                <Button variant="outline" onClick={startTest}>Try Again</Button>
                <Button onClick={() => window.location.href='/dashboard'}>Return to Dashboard</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
