import React, { useState } from 'react';
import { Library, Calendar, Users, Save, X, Edit3, ArrowRight } from './Icons';

interface ClassSetupProps {
    subject: string;
    setSubject: (s: string) => void;
    subjectOptions: string[];
    onStartClass: (students: string[]) => void;
    onAddSubject: (s: string, type: 'full' | 'shared') => void;
    reportPeriod: string;
    setReportPeriod: (s: string) => void;
    mockTitles: string[];
    onUpdateMockTitle: (idx: number, val: string) => void;
}

export const ClassSetup: React.FC<ClassSetupProps> = ({ 
    subject, setSubject, subjectOptions, onStartClass, 
    onAddSubject, reportPeriod, setReportPeriod, 
    mockTitles, onUpdateMockTitle 
}) => {
    const [namesInput, setNamesInput] = useState("");
    const [isCreatingSubject, setIsCreatingSubject] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState("");
    const [newSubjectType, setNewSubjectType] = useState<'full' | 'shared'>('full');

    const handleStart = () => {
        const students = namesInput.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        if (students.length === 0) {
            alert("Please enter at least one student name.");
            return;
        }
        onStartClass(students);
    };

    const handleSaveSubject = () => {
        if (newSubjectName.trim()) {
            onAddSubject(newSubjectName.trim(), newSubjectType);
            setIsCreatingSubject(false);
            setNewSubjectName("");
            setNewSubjectType('full');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-school-lightBlue animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Class Setup</h2>
            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Library className="w-4 h-4 text-school-lightBlue" /> 1. Select Subject
                    </label>
                    {isCreatingSubject ? (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Subject Name</label>
                            <input type="text" autoFocus value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} placeholder="e.g. Year 8 Science" className="w-full p-3 border border-school-lightBlue rounded-lg outline-none mb-4 bg-white" />
                            
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Report Structure</label>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <label className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all ${newSubjectType === 'full' ? 'bg-white border-school-lightBlue shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                                    <input type="radio" name="reportType" checked={newSubjectType === 'full'} onChange={() => setNewSubjectType('full')} className="w-4 h-4 text-school-lightBlue focus:ring-school-lightBlue" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-800">Full Report</span>
                                        <span className="text-xs text-gray-500">5 Categories</span>
                                    </div>
                                </label>
                                <label className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all ${newSubjectType === 'shared' ? 'bg-white border-school-lightBlue shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                                    <input type="radio" name="reportType" checked={newSubjectType === 'shared'} onChange={() => setNewSubjectType('shared')} className="w-4 h-4 text-school-lightBlue focus:ring-school-lightBlue" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-800">Shared Report</span>
                                        <span className="text-xs text-gray-500">Year 9 Style (3+ Optional)</span>
                                    </div>
                                </label>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <button onClick={() => setIsCreatingSubject(false)} className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50">Cancel</button>
                                <button onClick={handleSaveSubject} disabled={!newSubjectName.trim()} className="px-4 py-2 bg-school-lightBlue text-white rounded-lg font-bold text-sm shadow-sm hover:bg-school-blue disabled:opacity-50">Create Subject</button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <select value={subject} onChange={(e) => e.target.value === "__NEW__" ? (setIsCreatingSubject(true), setSubject("")) : setSubject(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none cursor-pointer text-lg">
                                <option value="">-- Select Subject --</option>
                                {subjectOptions.map(subj => <option key={subj} value={subj}>{subj}</option>)}
                                <option disabled>────────────────</option>
                                <option value="__NEW__" className="font-bold text-school-lightBlue">+ Add New Subject...</option>
                            </select>
                        </div>
                    )}
                </div>
                <div className={`space-y-2 transition-opacity duration-300 ${!subject ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Calendar className="w-4 h-4 text-school-lightBlue" /> 2. Select Report Period
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {["Progress 2", "Progress 3", "Mocks"].map(p => (
                            <button key={p} onClick={() => setReportPeriod(p)} className={`p-4 rounded-lg border-2 font-bold ${reportPeriod === p ? (p === "Mocks" ? 'border-school-red bg-school-red text-white' : 'border-school-lightBlue bg-school-lightBlue text-white') : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                    {reportPeriod === "Mocks" && (
                        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-2">
                            <h3 className="text-school-red font-bold text-sm flex items-center gap-2 mb-2"><Edit3 className="w-4 h-4" /> Configure Mock Categories</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[0, 1, 2, 3, 4].map((idx) => (
                                    <input key={idx} type="text" value={mockTitles?.[idx] || ""} onChange={(e) => onUpdateMockTitle && onUpdateMockTitle(idx, e.target.value)} placeholder={`Mock Category ${idx + 1}`} className="p-2 text-sm border border-red-200 rounded" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className={`space-y-2 transition-opacity duration-300 ${!subject ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Users className="w-4 h-4 text-school-lightBlue" /> 3. Enter Student Names (One per line)
                    </label>
                    <textarea value={namesInput} onChange={(e) => setNamesInput(e.target.value)} placeholder="Alice Smith&#10;Bob Jones" className="w-full p-4 border border-gray-300 rounded-lg h-64 text-gray-700 leading-relaxed" />
                </div>
                <button onClick={handleStart} disabled={!subject || !namesInput.trim()} className="w-full bg-school-red text-white font-bold py-4 rounded-lg shadow-md hover:bg-school-redHover disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-lg">
                    Start Report Cycle <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};