

import React, { useState } from 'react';
import { Copy, Check } from './Icons';

interface ResultPanelProps {
    prompt: string;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ prompt }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-8 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 border-gray-200">
                <h3 className="font-bold text-gray-700">Generated Class Report Document</h3>
                <div className="flex gap-2">
                    <button onClick={handleCopy} className="flex items-center gap-1.5 px-4 py-2 bg-school-lightBlue text-white rounded-lg hover:bg-school-blue font-bold shadow-sm transition-colors">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy All"}
                    </button>
                </div>
            </div>
            <div className="p-0">
                <textarea readOnly value={prompt} className="w-full min-h-[500px] p-6 bg-gray-50 resize-y focus:outline-none font-mono text-sm text-gray-800 leading-relaxed border-none" spellCheck={false} />
            </div>
        </div>
    );
};