import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ChartComponent } from '../components/ui/ChartComponent';
import { InputField } from '../components/ui/InputField';
import { Button } from '../components/ui/Button';
import { patientAPI } from '../services/api';

export function PatientDashboard() {
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({ reactionTime: '', stability: '', coordination: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userEmail = localStorage.getItem('email') || 'patient@example.com';

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await patientAPI.getTests(userEmail);
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTests();
  }, [userEmail]);

  // Derived metrics
  const avgReactionTime = history.length > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.reactionTime, 0) / history.length) 
    : 0;
  const latestTest = history.length > 0 ? history[history.length - 1] : null;

  const getStatusInfo = (time) => {
    if (!time) return { text: 'N/A', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: Activity };
    if (time > 400) return { text: 'High Risk', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle };
    if (time > 300) return { text: 'Moderate Risk', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: ShieldAlert };
    return { text: 'Normal', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2 };
  };

  const latestStatus = getStatusInfo(latestTest?.reactionTime);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reactionTime || !formData.stability || !formData.coordination) return;
    
    setIsSubmitting(true);
    try {
      const newTest = await patientAPI.addTest(userEmail, {
        reactionTime: Number(formData.reactionTime),
        stability: Number(formData.stability),
        coordination: Number(formData.coordination),
      });
      setHistory([...history, newTest]);
      setFormData({ reactionTime: '', stability: '', coordination: '' });
    } catch (error) {
      console.error("Failed to submit test", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Monitor your neurological health metrics and test history.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Average Reaction Time</p>
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold text-slate-900">{avgReactionTime || '--'}</h2>
              <span className="text-sm text-slate-500">ms</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`border ${latestStatus.border}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Current Health Status</p>
              <latestStatus.icon className={`h-4 w-4 ${latestStatus.color}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className={`text-2xl font-bold ${latestStatus.color}`}>{latestStatus.text}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-500">Latest Assessment</p>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{latestTest?.date || 'No Data'}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Chart Section */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Reaction Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <ChartComponent 
                labels={history.map(h => h.date)} 
                data={history.map(h => h.reactionTime)} 
                title="Reaction Time (ms)"
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-slate-400 text-sm">
                No data available to display chart.
              </div>
            )}
          </CardContent>
        </Card>

        {/* New Test Input */}
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Record New Test</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Reaction Time (ms)"
                type="number"
                placeholder="e.g. 250"
                value={formData.reactionTime}
                onChange={e => setFormData({...formData, reactionTime: e.target.value})}
              />
              <InputField
                label="Finger Stability (%)"
                type="number"
                placeholder="e.g. 85"
                value={formData.stability}
                onChange={e => setFormData({...formData, stability: e.target.value})}
              />
              <InputField
                label="Hand-Eye Coord. (%)"
                type="number"
                placeholder="e.g. 90"
                value={formData.coordination}
                onChange={e => setFormData({...formData, coordination: e.target.value})}
              />
              <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
                Save Results
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {history.length > 0 ? (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 rounded-tl-lg">Date</th>
                    <th className="px-6 py-3">Reaction Time (ms)</th>
                    <th className="px-6 py-3">Stability (%)</th>
                    <th className="px-6 py-3">Coordination (%)</th>
                    <th className="px-6 py-3 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice().reverse().map((item) => {
                    const statusInfo = getStatusInfo(item.reactionTime);
                    return (
                      <tr key={item.id} className="bg-white border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{item.date}</td>
                        <td className="px-6 py-4 text-slate-600">{item.reactionTime}</td>
                        <td className="px-6 py-4 text-slate-600">{item.stability}%</td>
                        <td className="px-6 py-4 text-slate-600">{item.coordination}%</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-sm text-slate-500">
                No tests recorded yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
