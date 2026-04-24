import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/ui/InputField';

export function CognitiveTest() {
  const [stage, setStage] = useState('start'); 
  const [sequence, setSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [level, setLevel] = useState(4); 

  const startLevel = (digits) => {
    let seq = '';
    for(let i=0; i<digits; i++) seq += Math.floor(Math.random() * 10);
    setSequence(seq);
    setStage('show');
    setUserInput('');
    
    setTimeout(() => {
      setStage('input');
    }, 2500); 
  };

  const handleStart = () => {
    setLevel(4);
    startLevel(4);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === sequence) {
      if (level === 8) {
        setStage('result');
      } else {
        setLevel(l => l + 1);
        startLevel(level + 1);
      }
    } else {
      setStage('result');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Memory & Cognitive Test</h1>
      
      <Card>
        <CardContent className="p-12 text-center flex flex-col items-center">
          {stage === 'start' && (
            <div className="space-y-4">
              <p className="text-slate-600 mb-6">Memorize the sequence of numbers. They will disappear after a few seconds.</p>
              <Button onClick={handleStart} size="lg">Start Assessment</Button>
            </div>
          )}

          {stage === 'show' && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Level {level - 3}</p>
              <div className="text-6xl font-bold tracking-[0.5em] ml-[0.5em] text-slate-900">{sequence}</div>
            </div>
          )}

          {stage === 'input' && (
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
              <p className="text-sm font-bold text-slate-500 uppercase">Level {level - 3}</p>
              <InputField
                label="Enter the sequence"
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                autoFocus
                autoComplete="off"
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          )}

          {stage === 'result' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Test Complete</h2>
              <p className="text-lg text-slate-700">Memory Capacity: <span className="font-bold text-blue-600">{level - 1} Digits</span></p>
              <Button onClick={() => window.location.href='/dashboard'}>Return to Dashboard</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
