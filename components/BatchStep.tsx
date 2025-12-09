

import React from 'react';
import { Share2, Globe, User } from './Icons';
import { CommentCategory } from './CommentCategory';
import { Category, ClassData } from '../types';

interface BatchStepProps {
    category: Category;
    students: string[];
    classData: ClassData;
    optionsMap: Record<string, string[]>;
    customOptionsMap: Record<string, string[]>;
    reportPeriod: string;
    onUpdateStudent: (name: string, catId: string, val: string) => void;
    onAddCustomComment: (text: string, level: string) => void;
    onDeleteCustomComment: (text: string, level: string) => void;
    onEditCustomComment: (oldText: string, newText: string, level: string) => void;
    onShareWithP3: () => void;
    onShareAcrossAllSubjects: () => void;
    levels: string[];
}

export const BatchStep: React.FC<BatchStepProps> = ({ 
    category, students, classData, optionsMap, customOptionsMap, 
    reportPeriod, onUpdateStudent, onAddCustomComment, 
    onDeleteCustomComment, onEditCustomComment, onShareWithP3, 
    onShareAcrossAllSubjects, levels
}) => {
    const isHPLOrLanguage = category.id === 'HPL' || category.id === 'Language';
    
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-blue-50 border-l-4 border-school-lightBlue p-4 rounded-r-lg mb-6 flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h2 className="text-xl font-bold text-school-blue">Category: {category.label}</h2>
                </div>
                <div className="flex gap-2">
                    {reportPeriod === "Progress 2" && !isHPLOrLanguage && (
                        <button onClick={onShareWithP3} className="flex items-center gap-2 px-3 py-2 bg-white border border-school-lightBlue text-school-lightBlue rounded-lg text-xs font-bold shadow-sm">
                            <Share2 className="w-4 h-4" /> Share with P3 (This Subject Only)
                        </button>
                    )}
                    {isHPLOrLanguage && (
                        <button onClick={onShareAcrossAllSubjects} className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white border border-purple-700 rounded-lg text-xs font-bold shadow-sm">
                            <Globe className="w-4 h-4" /> Update for All Subjects
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {students.map((student, index) => (
                    <div key={student} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center gap-2">
                            <span className="bg-school-lightBlue text-white text-xs font-bold px-2 py-1 rounded-full">{index + 1}</span>
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> {student}</h3>
                        </div>
                        <div className="p-2">
                            <CommentCategory 
                                category={category} 
                                optionsMap={optionsMap} 
                                customOptionsMap={customOptionsMap} 
                                currentValue={classData[student]?.[category.id] || ""} 
                                onChange={(val) => onUpdateStudent(student, category.id, val)} 
                                onAddComment={onAddCustomComment} 
                                onDeleteCustomComment={onDeleteCustomComment} 
                                onEditCustomComment={onEditCustomComment} 
                                compact={true} 
                                levels={levels}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};