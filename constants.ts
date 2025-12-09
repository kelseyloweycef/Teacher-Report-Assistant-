
const HPL_HIGH_ADDITIONS = ["Consistently seeks out opportunities to contribute to class discussions and collaborative work.", "Contributes thoughtfully to group work, actively listening to others.", "Plays a valuable and empathetic role in the class.", "Demonstrates confidence in their knowledge.", "Approaches lessons with confidence.", "Brings energy and enthusiasm to the classroom.", "Communicates ideas clearly and persuasively."];
const HPL_AVERAGE_ADDITIONS = ["A willing and able collaborative learner.", "Works effectively in teams.", "Works effectively with classmates on shared tasks.", "Presents their own views clearly."];
const HPL_LOW_ADDITIONS = ["Is developing their collaborative skills.", "Is beginning to recognise the value of collaboration.", "Would benefit from building confidence in teams.", "Is developing the confidence to share views."];

export const LANGUAGE_HIGH_ADDITIONS = [];
export const LANGUAGE_AVERAGE_ADDITIONS = [];
export const LANGUAGE_LOW_ADDITIONS = [];

const HPL_ATTRIBUTES = {
    "Collaboration/Empathy": [],
    "Agile": [],
    "Hard Working": []
};

export const COMMENT_BANK: any = {
    "IB History": {
        "HPL": HPL_ATTRIBUTES,
        "Language": { "Excellent": LANGUAGE_HIGH_ADDITIONS, "Good": LANGUAGE_AVERAGE_ADDITIONS, "Average": LANGUAGE_AVERAGE_ADDITIONS, "Poor": LANGUAGE_LOW_ADDITIONS },
        "Assessment": { "Excellent": ["Demonstrates excellent grasp of key historical concepts."], "Good": ["Shows a good understanding of historical events."], "Average": ["Shows a basic understanding of historical events."], "Poor": ["Shows a limited understanding of key knowledge."] },
        "Homework": { "Excellent": ["Consistently completes homework to a very high standard."], "Good": ["Regularly completes homework tasks."], "Average": ["Usually completes homework tasks."], "Poor": ["Homework completion is inconsistent."] },
        "Improvement": { "Excellent": ["Continue refining essay introductions."], "Good": ["Focus on adding greater critical depth."], "Average": ["Focus on adding greater critical depth."], "Poor": ["Develop clearer arguments."] }
    },
    "IGCSE History": {
        "HPL": HPL_ATTRIBUTES,
        "Language": { "Excellent": LANGUAGE_HIGH_ADDITIONS, "Good": LANGUAGE_AVERAGE_ADDITIONS, "Average": LANGUAGE_AVERAGE_ADDITIONS, "Poor": LANGUAGE_LOW_ADDITIONS },
        "Assessment": { "Excellent": ["Demonstrates excellent grasp of key concepts."], "Good": ["Shows good understanding of events."], "Average": ["Shows satisfactory understanding of events."], "Poor": ["Limited understanding of key knowledge."] },
        "Homework": { "Excellent": ["Consistently completes homework to a high standard."], "Good": ["Regularly completes tasks."], "Average": ["Usually completes tasks."], "Poor": ["Homework completion is inconsistent."] },
        "Improvement": { "Excellent": ["Continue refining essay introductions."], "Good": ["Focus on adding depth to analysis."], "Average": ["Focus on adding depth to analysis."], "Poor": ["Develop clearer arguments."] }
    },
    "Year 9 History": {
        "Assessment": { "Excellent": ["Excellent grasp of causes."], "Good": ["Sound understanding."], "Average": ["Developing understanding."], "Poor": ["Struggles with dates."] },
        "Improvement": { "Excellent": ["Integrate historiography."], "Good": ["Focus on 'Why'."], "Average": ["Focus on 'Why'."], "Poor": ["Revise timelines."] },
        "HPL": HPL_ATTRIBUTES,
        "Homework": { "Excellent": ["Exceptional standard."], "Good": ["Completed on time."], "Average": ["Usually on time."], "Poor": ["Frequently late."] },
        "Language": { "Excellent": LANGUAGE_HIGH_ADDITIONS, "Good": LANGUAGE_AVERAGE_ADDITIONS, "Average": LANGUAGE_AVERAGE_ADDITIONS, "Poor": LANGUAGE_LOW_ADDITIONS }
    },
    "Year 9 Geography": {
        "Assessment": { "Excellent": ["Excellent analysis."], "Good": ["Good understanding."], "Average": ["Satisfactory understanding."], "Poor": ["Limited map skills."] },
        "Improvement": { "Excellent": ["Specific case studies."], "Good": ["Specific data."], "Average": ["Specific data."], "Poor": ["Grid references."] },
        "HPL": HPL_ATTRIBUTES,
        "Homework": { "Excellent": ["Exceptional standard."], "Good": ["Completed on time."], "Average": ["Usually on time."], "Poor": ["Frequently late."] },
        "Language": { "Excellent": LANGUAGE_HIGH_ADDITIONS, "Good": LANGUAGE_AVERAGE_ADDITIONS, "Average": LANGUAGE_AVERAGE_ADDITIONS, "Poor": LANGUAGE_LOW_ADDITIONS }
    }
};