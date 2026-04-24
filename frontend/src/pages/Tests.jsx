import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Activity, Brain, Eye } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Tests() {
  const navigate = useNavigate();

  const availableTests = [
    {
      id: 'reaction',
      title: 'Reaction Time Test',
      description: 'Measure your cognitive processing speed by responding to visual stimuli.',
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 'tremor',
      title: 'Resting Tremor Analysis',
      description: 'Use your device sensors to evaluate hand stability and resting tremors.',
      icon: PlayCircle,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      id: 'cognitive',
      title: 'Memory & Cognitive',
      description: 'A short assessment to evaluate short-term memory recall and pattern recognition.',
      icon: Brain,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      id: 'vision',
      title: 'Hand-Eye Coordination',
      description: 'Track moving objects on screen to determine your motor-visual coordination.',
      icon: Eye,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Neurological Tests</h1>
        <p className="text-slate-500">Select a clinical assessment to begin recording new data.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {availableTests.map((test) => (
          <Card key={test.id} className="hover:border-blue-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${test.bg} ${test.color}`}>
                  <test.icon size={24} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg text-slate-900">{test.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {test.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="primary" onClick={() => navigate(`/dashboard/tests/${test.id}`)}>Start Test</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
