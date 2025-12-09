
import React, { useState, useEffect, useRef } from 'react';

export const Header = () => {
    // Default YCIS Logo
    const DEFAULT_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8Amf8AlP8Alv8Alf8Alf8Alv8Alf8Alv8Alv8AmP8Alv8Alf8Alv8Alv8Alv8Alf8Alv8Alf8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv8Alv98W13UAAAIGElEQVR4nO2da3uqOhCGRQXkIiJ4QcW2ttb+/5/4mAnJTYIkA4rtvT7vD61FA5NJJpNkxkwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGP5/6C8X/W0f4fs47/t+3w/8Yd/3/aHv+4Hze9uH+h6a9h+Xy+V6vV4ul8v1et1f2z7Y99Bf2z7M93G5Xq/76/V6uV6v++v1erleb/sI38nlcrnebvvr9Xq5Xm/76/VyuV6vtxv/5XK9Xm/X6/VyuV6v1+v1cr1eb9fr5Xq9Xm/X6+V6vV6v1+v1er1erter1Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr";
    
    const [logo, setLogo] = useState(DEFAULT_LOGO);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const stored = localStorage.getItem('teacher_report_logo');
        if (stored) setLogo(stored);
    }, []);

    const handleLogoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setLogo(result);
                localStorage.setItem('teacher_report_logo', result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-school-blue text-white pt-8 pb-16 px-6 shadow-md border-b-4 border-school-lightBlue">
          <div className="max-w-5xl mx-auto flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
                <div className="relative group cursor-pointer" onClick={handleLogoClick} title="Click to change logo">
                    <div className="bg-white p-2 rounded-lg shadow-sm overflow-hidden">
                        <img 
                            src={logo} 
                            className="h-16 w-auto min-w-[64px] object-contain max-w-[200px]"
                            alt="School Logo"
                        />
                    </div>
                    {/* Upload Overlay Hint */}
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold px-2 py-1 bg-black/20 rounded">Change</span>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Teacher Report Assistant</h1>
                    <p className="opacity-80 mt-2 max-w-2xl text-blue-100">Generate comprehensive student reports in seconds.</p>
                </div>
            </div>
          </div>
        </div>
    );
};
    