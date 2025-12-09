import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from './Icons';

interface ActionPanelProps {
    onBack: () => void;
    onNext: () => void;
    isLastStep: boolean;
    canProceed: boolean;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ onBack, onNext, isLastStep, canProceed }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="max-w-5xl mx-auto flex justify-between gap-4">
            <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <button 
                onClick={onNext} 
                disabled={!canProceed} 
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all shadow-md ${canProceed ? (isLastStep ? 'bg-green-600 hover:bg-green-700' : 'bg-school-lightBlue hover:bg-school-blue') : 'bg-gray-300 cursor-not-allowed'}`}
            >
                {isLastStep ? <><CheckCircle className="w-5 h-5" /> Finish & Generate</> : <><ArrowRight className="w-5 h-5" /> Next Category</>}
            </button>
        </div>
    </div>
);