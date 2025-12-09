

import React, { useState, useEffect } from 'react';
import { 
    MessageSquare, Settings2, PlusCircle, X, Save, Pencil, Trash2, 
    Star, ThumbsUp, MinusCircle, AlertCircle,
    Brain, LinkIcon, Search, Lightbulb, Target, Heart, Zap, Briefcase, Agile
} from './Icons';
import { Category } from '../types';

interface CommentCategoryProps {
    category: Category;
    optionsMap: Record<string, string[]>;
    customOptionsMap: Record<string, string[]>;
    currentValue: string;
    onChange: (val: string) => void;
    onAddComment: (text: string, level: string) => void;
    onDeleteCustomComment: (text: string, level: string) => void;
    onEditCustomComment: (oldText: string, newText: string, level: string) => void;
    compact?: boolean;
    levels: string[];
}

export const CommentCategory: React.FC<CommentCategoryProps> = ({ 
    category, optionsMap, customOptionsMap, currentValue, onChange, 
    onAddComment, onDeleteCustomComment, onEditCustomComment, compact = false,
    levels
}) => {
    const [activeLevel, setActiveLevel] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isManaging, setIsManaging] = useState(false);
    const [editingComment, setEditingComment] = useState<string | null>(null);
    const [editedText, setEditedText] = useState("");

    // Reset state when category changes to prevent stale activeLevel causing crashes
    useEffect(() => {
        setActiveLevel(null);
        setIsAdding(false);
        setIsManaging(false);
        setNewComment("");
        setEditingComment(null);
        setEditedText("");
    }, [category.id]);

    const handleSaveNewComment = () => {
        if (newComment.trim() && activeLevel) {
            onAddComment(newComment.trim(), activeLevel);
            onChange(newComment.trim());
            setNewComment("");
            setIsAdding(false);
        }
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            // Standard
            case "Excellent": return Star;
            case "Good": return ThumbsUp;
            case "Average": return MinusCircle;
            case "Poor": return AlertCircle;
            // HPL
            case "Collaboration/Empathy": return Heart;
            case "Agile": return Agile;
            case "Hard Working": return Briefcase;
            // Legacy / Unused fallback for old data
            case "Meta-Thinking": return Brain;
            case "Linking": return LinkIcon;
            case "Analysing": return Search;
            case "Creating": return Lightbulb;
            case "Realising": return Target;
            case "Empathetic": return Heart;
            default: return null;
        }
    };

    // Safeguard lookups with || [] to prevent "Cannot read properties of undefined (reading 'map')"
    const activeOptions = (activeLevel && optionsMap && optionsMap[activeLevel]) || [];
    const customOptions = (activeLevel && customOptionsMap && customOptionsMap[activeLevel]) || [];

    return (
        <div className={`${compact ? 'p-4' : 'bg-white rounded-xl shadow-sm p-6 border-l-4 border-school-lightBlue'} transition-shadow relative`}>
            {!compact && (
                <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-school-lightBlue opacity-75" />
                    <h3 className="text-lg font-bold text-gray-800">{category.label}</h3>
                </div>
            )}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {levels && levels.map((lvl) => {
                        const Icon = getLevelIcon(lvl);
                        return (
                            <button key={lvl} onClick={() => { setActiveLevel(lvl); setIsAdding(false); setIsManaging(false); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${activeLevel === lvl ? 'bg-school-lightBlue text-white border-school-lightBlue shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                {Icon && <Icon className={`w-3.5 h-3.5 ${activeLevel === lvl ? 'text-blue-200' : 'text-gray-400'}`} />}
                                {lvl}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className={`space-y-3 transition-all duration-300 ${activeLevel ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                <div>
                    <div className="flex justify-between items-end mb-1">
                        <label className="text-xs text-gray-500 font-medium ml-1">{activeLevel ? `${activeLevel} Comments` : "Select a category..."}</label>
                        {activeLevel && (
                            <div className="flex gap-2">
                                <button onClick={() => setIsManaging(!isManaging)} className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:bg-gray-100 px-2 py-1 rounded"><Settings2 className="w-3 h-3" /></button>
                                {!isAdding && <button onClick={() => { setIsAdding(true); setIsManaging(false); }} className="flex items-center gap-1 text-xs font-semibold text-school-lightBlue hover:bg-blue-50 px-2 py-1 rounded"><PlusCircle className="w-3 h-3" /> Add New</button>}
                            </div>
                        )}
                    </div>
                    {isManaging && activeLevel && (
                        <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200"><span className="font-bold text-gray-700">Manage Custom Comments</span><button onClick={() => setIsManaging(false)}><X className="w-3 h-3 text-gray-400" /></button></div>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                                {customOptions.map((opt, idx) => (
                                    <div key={idx} className="bg-white p-2 rounded border border-gray-100 flex items-start gap-2 group">
                                        {editingComment === opt ? (
                                            <div className="flex-1 flex gap-2">
                                                <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} className="flex-1 border p-1 rounded text-xs" />
                                                <button onClick={() => { if (onEditCustomComment && editedText.trim()) { onEditCustomComment(opt, editedText, activeLevel); setEditingComment(null); } }}><Save className="w-3 h-3 text-green-600" /></button>
                                                <button onClick={() => setEditingComment(null)}><X className="w-3 h-3 text-red-500" /></button>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="flex-1 text-xs text-gray-700 leading-tight">{opt}</p>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                                                    <button onClick={() => { setEditingComment(opt); setEditedText(opt); }}><Pencil className="w-3 h-3 text-blue-500" /></button>
                                                    <button onClick={() => { if (onDeleteCustomComment && confirm("Delete?")) onDeleteCustomComment(opt, activeLevel); }}><Trash2 className="w-3 h-3 text-red-500" /></button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {isAdding && activeLevel ? (
                        <div className="mb-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                            <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Type comment here..." className="w-full p-2 border border-blue-200 rounded mb-2 text-sm" autoFocus />
                            <div className="flex justify-end gap-2"><button onClick={() => setIsAdding(false)} className="text-xs px-2 py-1 bg-white border rounded">Cancel</button><button onClick={handleSaveNewComment} disabled={!newComment.trim()} className="text-xs px-2 py-1 bg-school-lightBlue text-white rounded">Save</button></div>
                        </div>
                    ) : (
                        <div className="relative">
                            <select className="w-full p-2 pl-3 border border-gray-300 rounded-md bg-gray-50 text-sm appearance-none cursor-pointer" onChange={(e) => onChange(e.target.value)} value="" disabled={!activeLevel}>
                                <option value="" disabled>{activeLevel ? "Select a comment..." : "Select level first..."}</option>
                                {activeOptions.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    )}
                </div>
                <textarea rows={2} value={currentValue} onChange={(e) => onChange(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm leading-relaxed" placeholder="Selected comment appears here..."></textarea>
            </div>
        </div>
    );
};
