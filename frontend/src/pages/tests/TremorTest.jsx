import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function TremorTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const deviations = useRef(0);
  const targetRef = useRef(null);

  const startTest = () => {
    setIsRunning(true);
    setScore(null);
    setTimeLeft(10);
    deviations.current = 0;
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      const finalScore = Math.max(0, 100 - (deviations.current * 2));
      setScore(finalScore);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleMouseMove = (e) => {
    if (!isRunning) return;
    if (!targetRef.current) return;
    
    const rect = targetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    if (dist > rect.width / 2) {
      deviations.current += 1;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Resting Tremor Analysis</h1>
      <p className="text-slate-500">Keep your mouse cursor perfectly still inside the circle for 10 seconds.</p>
      
      <Card>
        <CardContent className="p-12 text-center flex flex-col items-center">
          {!isRunning && score === null && (
            <Button onClick={startTest} size="lg">Start Analysis</Button>
          )}
          
          {isRunning && (
            <div className="space-y-8 w-full flex flex-col items-center" onMouseMove={handleMouseMove}>
              <div className="text-2xl font-bold text-slate-700">{timeLeft}s remaining</div>
              <div 
                ref={targetRef}
                className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center bg-blue-50 shadow-inner"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}

          {score !== null && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Test Complete</h2>
              <p className="text-lg text-slate-700">Stability Score: <span className="font-bold text-emerald-600">{score}%</span></p>
              <Button onClick={() => window.location.href='/dashboard'}>Return to Dashboard</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
