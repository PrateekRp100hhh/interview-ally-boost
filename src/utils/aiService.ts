
import { supabase } from '@/integrations/supabase/client';

type Question = {
  id: number;
  text: string;
};

export type InterviewType = 'behavioral' | 'technical' | 'leadership';

// Function to generate interview questions
export async function generateQuestions(role: string, interviewType: InterviewType): Promise<Question[]> {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: {
        action: 'generateQuestions',
        data: { role, interviewType }
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error generating questions:', error);
    // Return mock questions as fallback
    return [
      { id: 1, text: `What makes you a good candidate for this ${role} position?` },
      { id: 2, text: "Describe your greatest professional achievement." },
      { id: 3, text: "How do you handle difficult challenges in your work?" },
    ];
  }
}

// Function to generate feedback for an answer
export async function generateFeedback(question: string, answer: string) {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: {
        action: 'generateFeedback',
        data: { question, answer }
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error generating feedback:', error);
    // Return mock feedback as fallback
    return {
      feedbackText: "Your answer demonstrated good knowledge and structure, but could use more specific examples.",
      strengths: ["Clear communication", "Good structure"],
      improvements: ["Add more specific examples", "Quantify your achievements"],
      score: 75
    };
  }
}

// Function to generate analytics based on interview history
export async function generateAnalytics(role: string, interviewType: InterviewType, pastQuestions: any[], feedbackHistory: any[]) {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: {
        action: 'generateAnalytics',
        data: { role, interviewType, pastQuestions, feedbackHistory }
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error generating analytics:', error);
    // Return mock analytics as fallback
    return {
      summary: "You've shown consistent improvement in your interview skills, particularly in communication and technical knowledge.",
      metrics: {
        communication: 78,
        content: 85,
        confidence: 65,
        clarity: 82,
        structure: 90,
      },
      recommendations: [
        "Practice more industry-specific examples",
        "Focus on quantifying your achievements",
        "Improve your storytelling skills",
        "Prepare better for follow-up questions"
      ]
    };
  }
}
