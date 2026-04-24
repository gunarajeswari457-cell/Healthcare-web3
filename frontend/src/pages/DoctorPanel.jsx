import React, { useState } from 'react';
import { Search, UserCircle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { InputField } from '../components/ui/InputField';
import { Button } from '../components/ui/Button';
import { ChartComponent } from '../components/ui/ChartComponent';

const MOCK_PATIENT_DB = {
  'patient@example.com': {
    name: 'Alice Johnson',
    age: 45,
    condition: 'Parkinson\'s Suspected',
    history: [
      { date: '2026-04-10', reactionTime: 290 },
      { date: '2026-04-15', reactionTime: 320 },
      { date: '2026-04-20', reactionTime: 380 },
      { date: '2026-04-24', reactionTime: 430 },
    ]
  }
};

export function DoctorPanel() {
  const [searchEmail, setSearchEmail] = useState('');
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const result = MOCK_PATIENT_DB[searchEmail.toLowerCase()];
      if (result) {
        setPatient(result);
      } else {
        setPatient(null);
        setError('Patient not found. Please try "patient@example.com"');
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Doctor Panel</h1>
        <p className="text-slate-500">Search and monitor your patients' neurological data.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4 items-end">
            <div className="flex-1">
              <InputField
                label="Search Patient by Email"
                id="search"
                type="email"
                placeholder="patient@example.com"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                error={error}
              />
            </div>
            <Button type="submit" isLoading={isLoading} className="mb-[2px] md:mb-0">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {patient && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Patient Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <UserCircle className="h-12 w-12 text-slate-300" />
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{patient.name}</h3>
                    <p className="text-sm text-slate-500">{searchEmail}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Age</span>
                    <span className="text-sm font-medium text-slate-900">{patient.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Condition</span>
                    <span className="text-sm font-medium text-slate-900">{patient.condition}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Disease Progression (Reaction Time)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartComponent 
                  labels={patient.history.map(h => h.date)}
                  data={patient.history.map(h => h.reactionTime)}
                  title="Reaction Time Trend (ms)"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 rounded-tl-lg">Date</th>
                      <th className="px-6 py-3">Reaction Time (ms)</th>
                      <th className="px-6 py-3">Risk Assessment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.history.slice().reverse().map((item, idx) => {
                      const isHighRisk = item.reactionTime > 400;
                      return (
                        <tr key={idx} className="bg-white border-b border-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{item.date}</td>
                          <td className="px-6 py-4 text-slate-600">{item.reactionTime}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isHighRisk ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                              {isHighRisk ? 'High Risk' : 'Moderate Risk'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
