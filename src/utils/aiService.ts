
import { supabase } from '@/integrations/supabase/client';

type Question = {
  id: number;
  text: string;
};

export type InterviewType = 'behavioral' | 'technical' | 'leadership';

// Function to generate interview questions
export async function generateQuestions(role: string, interviewType: InterviewType): Promise<Question[]> {
  try {
    // Validate input
    if (!role || role.trim() === '') {
      throw new Error('A valid profession is required');
    }
    
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: {
        action: 'generateQuestions',
        data: { role, interviewType }
      }
    });

    if (error) throw error;
    
    // Return data or fallback to mock questions if something went wrong
    if (Array.isArray(data)) {
      return data;
    } else if (data && data.rawResponse) {
      console.log("Raw response received:", data.rawResponse);
      // Try to extract JSON from the rawResponse
      try {
        const jsonMatch = data.rawResponse.match(/```json\n([\s\S]*?)\n```/) || 
                          data.rawResponse.match(/\[([\s\S]*?)\]/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0].startsWith('```') ? jsonMatch[1] : jsonMatch[0];
          const parsedData = JSON.parse(jsonString);
          if (Array.isArray(parsedData)) {
            return parsedData;
          }
        }
      } catch (parseError) {
        console.error("Error parsing JSON from raw response:", parseError);
      }
      return getDefaultQuestions(role, interviewType);
    } else {
      console.warn('Unexpected response format from Gemini AI:', data);
      return getDefaultQuestions(role, interviewType);
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    // Return mock questions as fallback
    return getDefaultQuestions(role, interviewType);
  }
}

// Function to generate feedback for an answer
export async function generateFeedback(question: string, answer: string, role?: string) {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: {
        action: 'generateFeedback',
        data: { question, answer, role }
      }
    });

    if (error) throw error;
    
    if (data && data.rawResponse) {
      try {
        const jsonMatch = data.rawResponse.match(/```json\n([\s\S]*?)\n```/) || 
                          data.rawResponse.match(/\{([\s\S]*?)\}/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0].startsWith('```') ? jsonMatch[1] : jsonMatch[0];
          return JSON.parse(jsonString);
        }
      } catch (parseError) {
        console.error("Error parsing JSON from feedback raw response:", parseError);
      }
    }
    
    return data || {
      feedbackText: "Your answer demonstrated good knowledge and structure, but could use more specific examples.",
      strengths: ["Clear communication", "Good structure"],
      improvements: ["Add more specific examples", "Quantify your achievements"],
      score: 75
    };
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
    
    if (data && data.rawResponse) {
      try {
        const jsonMatch = data.rawResponse.match(/```json\n([\s\S]*?)\n```/) || 
                          data.rawResponse.match(/\{([\s\S]*?)\}/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0].startsWith('```') ? jsonMatch[1] : jsonMatch[0];
          return JSON.parse(jsonString);
        }
      } catch (parseError) {
        console.error("Error parsing JSON from analytics raw response:", parseError);
      }
    }
    
    return data || {
      summary: `You've shown consistent improvement in your ${role} interview skills, particularly in communication and technical knowledge.`,
      metrics: {
        communication: 78,
        content: 85,
        confidence: 65,
        clarity: 82,
        structure: 90,
      },
      recommendations: [
        `Practice more ${role}-specific examples`,
        "Focus on quantifying your achievements",
        "Improve your storytelling skills",
        "Prepare better for follow-up questions"
      ]
    };
  } catch (error) {
    console.error('Error generating analytics:', error);
    // Return mock analytics as fallback
    return {
      summary: `You've shown consistent improvement in your ${role} interview skills, particularly in communication and technical knowledge.`,
      metrics: {
        communication: 78,
        content: 85,
        confidence: 65,
        clarity: 82,
        structure: 90,
      },
      recommendations: [
        `Practice more ${role}-specific examples`,
        "Focus on quantifying your achievements",
        "Improve your storytelling skills",
        "Prepare better for follow-up questions"
      ]
    };
  }
}

// Fallback questions by category
function getDefaultQuestions(role: string, type: InterviewType): Question[] {
  const defaultQuestions: Record<InterviewType, Question[]> = {
    behavioral: [
      { id: 1, text: `Tell me about a time when you had to adapt to a significant change at work as a ${role}.` },
      { id: 2, text: `Describe a situation where you had to resolve a conflict within your team during your ${role} work.` },
      { id: 3, text: `As a ${role}, tell me about a time when you failed at something. How did you handle it?` },
    ],
    technical: [
      { id: 1, text: `Explain how you would approach solving a complex problem in your role as a ${role}.` },
      { id: 2, text: `Describe a technically challenging project you worked on as a ${role} and how you overcame obstacles.` },
      { id: 3, text: `How do you stay updated with the latest technologies and methodologies in your field as a ${role}?` },
    ],
    leadership: [
      { id: 1, text: `Tell me about a time when you had to lead a team through a difficult situation in your ${role} position.` },
      { id: 2, text: `As a ${role}, how do you motivate team members who are struggling with their tasks?` },
      { id: 3, text: `Describe a situation where you had to make an unpopular decision as a ${role}.` },
    ],
  };
  
  return defaultQuestions[type];
}
