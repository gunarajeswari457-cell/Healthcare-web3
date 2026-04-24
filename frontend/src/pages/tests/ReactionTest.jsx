import React, { useState, useRef } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function ReactionTest() {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, finished
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(0);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 3000) + 1000;
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setGameState('idle');
      alert('You clicked too early! Try again.');
    } else if (gameState === 'ready') {
      const endTime = Date.now();
      setReactionTime(endTime - startTimeRef.current);
      setGameState('finished');
    } else if (gameState === 'finished' || gameState === 'idle') {
      startTest();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reaction Time Test</h1>
      <Card>
        <CardContent className="p-12 text-center">
          <div 
            onClick={handleClick}
            className={`h-64 w-full rounded-2xl flex items-center justify-center cursor-pointer transition-colors select-none ${
              gameState === 'idle' ? 'bg-blue-100 hover:bg-blue-200' :
              gameState === 'waiting' ? 'bg-red-500' :
              gameState === 'ready' ? 'bg-emerald-500' :
              'bg-blue-100 hover:bg-blue-200'
            }`}
          >
            <h2 className={`text-2xl font-bold ${
              gameState === 'waiting' || gameState === 'ready' ? 'text-white' : 'text-blue-800'
            }`}>
              {gameState === 'idle' ? 'Click to Start' :
               gameState === 'waiting' ? 'Wait for Green...' :
               gameState === 'ready' ? 'CLICK NOW!' :
               `${reactionTime} ms. Click to try again.`}
            </h2>
          </div>
          {gameState === 'finished' && (
            <div className="mt-8 space-y-4">
              <p className="text-lg text-slate-700">Your Reaction Time: <span className="font-bold text-slate-900">{reactionTime} ms</span></p>
              <Button onClick={() => window.location.href='/dashboard'}>Return to Dashboard</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
