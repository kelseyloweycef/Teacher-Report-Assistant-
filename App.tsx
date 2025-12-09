
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ClassSetup } from './components/ClassSetup';
import { BatchStep } from './components/BatchStep';
import { ResultPanel } from './components/ResultPanel';
import { ActionPanel } from './components/ActionPanel';
import { COMMENT_BANK, LANGUAGE_HIGH_ADDITIONS, LANGUAGE_AVERAGE_ADDITIONS, LANGUAGE_LOW_ADDITIONS } from './constants';
import { Category, CommentBankMap, MockTitlesMap, ClassData } from './types';
import { Users, CheckCircle2 } from './components/Icons';

const STANDARD_LEVELS = ["Excellent", "Good", "Average", "Poor"];
const HPL_LEVELS = ["Collaboration/Empathy", "Agile", "Hard Working"];

export default function App() {
  const [subject, setSubject] = useState<string>("");
  const [students, setStudents] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [customSubjects, setCustomSubjects] = useState<string[]>([]);
  const [reportPeriod, setReportPeriod] = useState<string>("Progress 2");
  const [classData, setClassData] = useState<ClassData>({});
  const [customBank, setCustomBank] = useState<CommentBankMap>({});
  const [finalBatchPrompt, setFinalBatchPrompt] = useState<string>("");
  const [mockTitles, setMockTitles] = useState<MockTitlesMap>({});
  const [subjectTypes, setSubjectTypes] = useState<Record<string, 'full' | 'shared'>>({});

  useEffect(() => {
    // 1. Check for shared data injected into the HTML (for "Share App" functionality)
    const sharedDataElement = document.getElementById('shared-data');
    if (sharedDataElement && sharedDataElement.textContent) {
        try {
            const shared = JSON.parse(sharedDataElement.textContent);
            
            // Merge Custom Comments
            if (shared.custom_comments) {
                const sharedComments = JSON.parse(shared.custom_comments);
                const currentComments = JSON.parse(localStorage.getItem('teacher_report_custom_comments') || '{}');
                
                // Deep merge
                const mergedComments = { ...currentComments };
                Object.keys(sharedComments).forEach(subjKey => {
                    if (!mergedComments[subjKey]) mergedComments[subjKey] = {};
                    Object.keys(sharedComments[subjKey]).forEach(catKey => {
                        if (!mergedComments[subjKey][catKey]) mergedComments[subjKey][catKey] = {};
                        Object.keys(sharedComments[subjKey][catKey]).forEach(level => {
                            const existing = mergedComments[subjKey][catKey][level] || [];
                            const incoming = sharedComments[subjKey][catKey][level] || [];
                            mergedComments[subjKey][catKey][level] = Array.from(new Set([...existing, ...incoming]));
                        });
                    });
                });
                localStorage.setItem('teacher_report_custom_comments', JSON.stringify(mergedComments));
                setCustomBank(mergedComments);
            }

            // Merge Custom Subjects
            if (shared.custom_subjects) {
                const sharedSubjs = JSON.parse(shared.custom_subjects);
                const currentSubjs = JSON.parse(localStorage.getItem('teacher_report_custom_subjects') || '[]');
                const mergedSubjs = Array.from(new Set([...currentSubjs, ...sharedSubjs]));
                localStorage.setItem('teacher_report_custom_subjects', JSON.stringify(mergedSubjs));
                setCustomSubjects(mergedSubjs);
            }

            // Merge Subject Types
            if (shared.subject_types) {
                const sharedTypes = JSON.parse(shared.subject_types);
                const currentTypes = JSON.parse(localStorage.getItem('teacher_report_subject_types') || '{}');
                const mergedTypes = { ...currentTypes, ...sharedTypes };
                localStorage.setItem('teacher_report_subject_types', JSON.stringify(mergedTypes));
                setSubjectTypes(mergedTypes);
            }

            // Merge Mock Titles
            if (shared.mock_titles) {
                 const sharedMocks = JSON.parse(shared.mock_titles);
                 const currentMocks = JSON.parse(localStorage.getItem('teacher_report_mock_titles') || '{}');
                 const mergedMocks = { ...currentMocks, ...sharedMocks };
                 localStorage.setItem('teacher_report_mock_titles', JSON.stringify(mergedMocks));
                 setMockTitles(mergedMocks);
            }

        } catch (e) {
            console.error("Error merging shared data", e);
        }
    } else {
        // 2. Normal Load if no shared data found
        try {
            const storedBank = localStorage.getItem('teacher_report_custom_comments');
            if (storedBank) setCustomBank(JSON.parse(storedBank));

            const storedSubjects = localStorage.getItem('teacher_report_custom_subjects');
            if (storedSubjects) setCustomSubjects(JSON.parse(storedSubjects));

            const storedMocks = localStorage.getItem('teacher_report_mock_titles');
            if (storedMocks) setMockTitles(JSON.parse(storedMocks));

            const storedTypes = localStorage.getItem('teacher_report_subject_types');
            if (storedTypes) setSubjectTypes(JSON.parse(storedTypes));
        } catch (err) {
            console.error(err);
        }
    }
  }, []);

  const handleAddSubject = (newSubject: string, type: 'full' | 'shared') => {
    if (!newSubject.trim()) return;

    // Update Type
    const updatedTypes = { ...subjectTypes, [newSubject]: type };
    setSubjectTypes(updatedTypes);
    localStorage.setItem('teacher_report_subject_types', JSON.stringify(updatedTypes));

    if (Object.keys(COMMENT_BANK).includes(newSubject) || customSubjects.includes(newSubject)) {
      setSubject(newSubject);
      return;
    }
    
    setCustomBank(prev => {
      const next = { ...prev };
      const existingSharedHPL = Object.keys(prev).find(k => k.endsWith('::SHARED') && prev[k]?.['HPL']);
      
      if (existingSharedHPL) {
          const sourceData = prev[existingSharedHPL]['HPL'];
          const newKey = `${newSubject}::SHARED`;
          next[newKey] = {
              ...(next[newKey] || {}),
              'HPL': sourceData
          };
      }

      const newSharedKey = `${newSubject}::SHARED`;
      const existingSharedLang = Object.keys(prev).find(k => k.endsWith('::SHARED') && prev[k]?.['Language']);
      
      let newLangData: any = {
           "Excellent": LANGUAGE_HIGH_ADDITIONS, 
           "Good": LANGUAGE_AVERAGE_ADDITIONS, 
           "Average": LANGUAGE_AVERAGE_ADDITIONS, 
           "Poor": LANGUAGE_LOW_ADDITIONS 
      };

      if (existingSharedLang) {
          const sourceLang = prev[existingSharedLang]['Language'];
          ["Excellent", "Good", "Average", "Poor"].forEach(level => {
               const defaults = newLangData[level] || [];
               const customs = sourceLang[level] || [];
               newLangData[level] = Array.from(new Set([...defaults, ...customs]));
          });
      }

      next[newSharedKey] = {
          ...(next[newSharedKey] || {}),
          'Language': newLangData
      };

      localStorage.setItem('teacher_report_custom_comments', JSON.stringify(next));
      return next;
    });

    const updated = [...customSubjects, newSubject];
    setCustomSubjects(updated);
    localStorage.setItem('teacher_report_custom_subjects', JSON.stringify(updated));
    setSubject(newSubject);
  };

  const handleUpdateMockTitle = (idx: number, val: string) => {
    setMockTitles(prev => {
      const current = prev[subject] || ["", "", "", "", ""];
      const next = [...current];
      next[idx] = val;
      const updated = { ...prev, [subject]: next };
      localStorage.setItem('teacher_report_mock_titles', JSON.stringify(updated));
      return updated;
    });
  };

  const getCategories = (): Category[] => {
    if (reportPeriod === "Mocks") {
      const titles = mockTitles[subject] || ["", "", "", "", ""];
      return titles.map((t, i) => ({ id: `Mock${i + 1}`, label: t.trim() })).filter(c => c.label.length > 0);
    }

    const isShared = subjectTypes[subject] === 'shared';
    // Only Year 9 subjects (or explicitly shared types) get the optional structure
    const isYear9 = !subjectTypes[subject] && subject.startsWith("Year 9");

    if (isShared || isYear9) {
      return [
        { id: "Assessment", label: "Assessment" },
        { id: "Improvement", label: "Improvement" },
        { id: "HPL", label: "HPL (Approaches to Learning) (Optional)", optional: true },
        { id: "Language", label: "Language (Optional)", optional: true },
        { id: "Homework", label: "Homework (Optional)", optional: true }
      ];
    }
    // Full report structure for all other subjects (IB, IGCSE, etc.)
    return [
      { id: "HPL", label: "HPL (Approaches to Learning)" },
      { id: "Language", label: "Language" },
      { id: "Assessment", label: "Assessment" },
      { id: "Homework", label: "Homework" },
      { id: "Improvement", label: "Improvement" }
    ];
  };

  const categories = subject ? getCategories() : [];
  const isSetup = students.length === 0;
  const isResultStep = !isSetup && currentStepIndex === categories.length;
  const activeCategory = (!isSetup && !isResultStep) ? categories[currentStepIndex] : null;

  const handleStartClass = (names: string[]) => {
    if (reportPeriod === "Mocks" && categories.length === 0) {
      alert("Please configure mock categories.");
      return;
    }
    setStudents(names);
    setCurrentStepIndex(0);
    const initClassData: ClassData = {};
    names.forEach(name => { initClassData[name] = {}; });
    setClassData(initClassData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBankKey = (catId: string) => (catId === 'HPL' || catId === 'Language') ? `${subject}::SHARED` : `${subject}::${reportPeriod}`;

  const handleUpdateStudent = (name: string, catId: string, val: string) => {
    setClassData(prev => ({ ...prev, [name]: { ...prev[name], [catId]: val } }));
  };

  const updateCustomBank = (updater: (prev: CommentBankMap) => CommentBankMap) => {
    setCustomBank(prev => {
      const next = updater(prev);
      localStorage.setItem('teacher_report_custom_comments', JSON.stringify(next));
      return next;
    });
  };

  const handleAddCustomComment = (catId: string, text: string, level: string) => {
    updateCustomBank(prev => {
      const key = getBankKey(catId);
      const subjBank = prev[key] || {};
      const catBank = subjBank[catId] || {};
      const lvlArr = catBank[level] || [];
      if (lvlArr.includes(text)) return prev;
      return { ...prev, [key]: { ...subjBank, [catId]: { ...catBank, [level]: [...lvlArr, text] } } };
    });
  };

  const handleDeleteCustomComment = (text: string, level: string) => {
    if (!activeCategory) return;
    updateCustomBank(prev => {
      const catId = activeCategory.id;
      const key = getBankKey(catId);
      const subjBank = prev[key] || {};
      const catBank = subjBank[catId] || {};
      const lvlArr = catBank[level] || [];
      return { ...prev, [key]: { ...subjBank, [catId]: { ...catBank, [level]: lvlArr.filter(c => c !== text) } } };
    });
  };

  const handleEditCustomComment = (oldText: string, newText: string, level: string) => {
    if (!activeCategory) return;
    updateCustomBank(prev => {
      const catId = activeCategory.id;
      const key = getBankKey(catId);
      const subjBank = prev[key] || {};
      const catBank = subjBank[catId] || {};
      const lvlArr = catBank[level] || [];
      return { ...prev, [key]: { ...subjBank, [catId]: { ...catBank, [level]: lvlArr.map(c => c === oldText ? newText : c) } } };
    });
  };

  const handleShareWithP3 = () => {
    if (reportPeriod !== "Progress 2" || !activeCategory) return;
    updateCustomBank(prev => {
      const catId = activeCategory.id;
      const srcKey = getBankKey(catId);
      const targetKey = `${subject}::Progress 3`;
      const data = prev[srcKey]?.[catId];
      if (!data) {
        alert("No comments to share.");
        return prev;
      }
      const existingTarget = prev[targetKey] || {};
      return { ...prev, [targetKey]: { ...existingTarget, [catId]: data } };
    });
    alert("Shared to P3.");
  };

  const getLevels = (catId: string) => catId === 'HPL' ? HPL_LEVELS : STANDARD_LEVELS;

  const handleShareAcrossAllSubjects = () => {
    if (!activeCategory) return;
    updateCustomBank(prev => {
      const catId = activeCategory.id;
      const srcKey = `${subject}::SHARED`;
      const data = prev[srcKey]?.[catId];
      if (!data) {
        alert("No comments to share.");
        return prev;
      }
      const next = { ...prev };
      const currentLevels = getLevels(catId);
      [...Object.keys(COMMENT_BANK), ...customSubjects].forEach(tSubj => {
        if (tSubj === subject) return;
        const tKey = `${tSubj}::SHARED`;
        const existingSubj = next[tKey] || {};
        const existingCat = existingSubj[catId] || {};
        const merged = { ...existingCat };
        currentLevels.forEach(l => {
          merged[l] = Array.from(new Set([...(existingCat[l] || []), ...(data[l] || [])]));
        });
        next[tKey] = { ...existingSubj, [catId]: merged };
      });
      return next;
    });
    alert("Shared across subjects.");
  };

  const getOptionsMap = (catId: string, customOnly = false) => {
    const map: Record<string, string[]> = {};
    const levels = getLevels(catId);
    levels.forEach(l => map[l] = []);
    
    if (!subject) return map;
    const key = getBankKey(catId);
    
    levels.forEach(l => {
      const staticOpts = (!customOnly && reportPeriod !== "Mocks") ? (COMMENT_BANK[subject]?.[catId]?.[l] || []) : [];
      const customOpts = customBank[key]?.[catId]?.[l] || [];
      let legacy: string[] = [];
      if (reportPeriod === "Progress 2") {
        legacy = customBank[subject]?.[catId]?.[l] || [];
      }
      map[l] = Array.from(new Set([...staticOpts, ...customOpts, ...legacy]));
    });
    return map;
  };

  const generateFinalBatch = () => {
    let out = "";
    students.forEach(s => {
      out += `${s}\n`;
      categories.forEach(c => {
        const txt = classData[s]?.[c.id];
        if (txt) out += `• ${txt.replace(/\n/g, ' ').trim()}\n`;
      });
      out += `\n-----------------------------------\n\n`;
    });
    setFinalBatchPrompt(out);
  };

  const handleNext = () => {
    if (currentStepIndex === categories.length - 1) {
      generateFinalBatch();
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStepIndex === 0) {
      if (confirm("Reset class?")) {
        setStudents([]);
        setSubject("");
      }
    } else {
      setCurrentStepIndex(currentStepIndex - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        {!isSetup && !isResultStep && (
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4 flex items-center justify-between sticky top-4 z-40 border border-gray-200">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-school-lightBlue" />
              <span className="font-bold text-gray-700">{students.length} Students</span>
              <span className="text-gray-400">|</span>
              <span className="text-sm font-medium text-gray-500">{subject}</span>
              <span className="text-gray-400">|</span>
              <span className="text-sm font-medium text-school-red">{reportPeriod}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Step {currentStepIndex + 1} of {categories.length}</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-school-lightBlue transition-all duration-500" style={{ width: `${((currentStepIndex + 1) / categories.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        )}

        {isSetup && (
          <ClassSetup
            subject={subject}
            setSubject={setSubject}
            subjectOptions={[...Object.keys(COMMENT_BANK), ...customSubjects].sort()}
            onStartClass={handleStartClass}
            onAddSubject={handleAddSubject}
            reportPeriod={reportPeriod}
            setReportPeriod={setReportPeriod}
            mockTitles={mockTitles[subject] || ["", "", "", "", ""]}
            onUpdateMockTitle={handleUpdateMockTitle}
          />
        )}

        {activeCategory && (
          <BatchStep
            category={activeCategory}
            students={students}
            classData={classData}
            optionsMap={getOptionsMap(activeCategory.id)}
            customOptionsMap={getOptionsMap(activeCategory.id, true)}
            reportPeriod={reportPeriod}
            onUpdateStudent={handleUpdateStudent}
            onAddCustomComment={(t, l) => handleAddCustomComment(activeCategory.id, t, l)}
            onDeleteCustomComment={handleDeleteCustomComment}
            onEditCustomComment={handleEditCustomComment}
            onShareWithP3={handleShareWithP3}
            onShareAcrossAllSubjects={handleShareAcrossAllSubjects}
            levels={getLevels(activeCategory.id)}
          />
        )}

        {isResultStep && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800">Class Reports Generated!</h2>
            </div>
            <ResultPanel prompt={finalBatchPrompt} />
            <div className="mt-8 text-center">
              <button onClick={() => window.location.reload()} className="text-gray-500 hover:text-gray-700 underline">Start Over</button>
            </div>
          </div>
        )}
      </main>
      {!isSetup && !isResultStep && (
        <ActionPanel
          onBack={handleBack}
          onNext={handleNext}
          isLastStep={currentStepIndex === categories.length - 1}
          canProceed={true}
        />
      )}
    </div>
  );
}
