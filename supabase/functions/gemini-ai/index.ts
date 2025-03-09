
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Missing Gemini API key');
    }

    const { action, data } = await req.json();
    
    let endpoint = '';
    let prompt = '';
    let requestData = {};
    
    switch (action) {
      case 'generateQuestions':
        endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        prompt = `Generate 3 challenging and relevant interview questions for a ${data.role} position.
                  First, interpret what skills and knowledge are required for this profession.
                  The interview type is "${data.interviewType}".
                  Make sure the questions are specific to this exact profession, not generic.
                  Format the response as a JSON array of objects with 'id' and 'text' properties.`;
        break;
      
      case 'generateFeedback':
        endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        prompt = `You are an expert interview coach specializing in ${data.role || 'professional'} positions.
                  
                  Analyze this interview answer:
                  
                  Question: ${data.question}
                  Answer: ${data.answer}
                  
                  Provide constructive feedback specific to this profession. Include strengths, areas for improvement, and an overall score out of 100.
                  Format the response as a JSON object with these properties:
                  - 'feedbackText' (string): Overall feedback
                  - 'strengths' (array of strings): Main strengths
                  - 'improvements' (array of strings): Areas to improve
                  - 'score' (number): Score between 0-100`;
        break;
      
      case 'generateAnalytics':
        endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        prompt = `Analyze the following interview data for a ${data.role} position to provide performance insights:
                  
                  Role: ${data.role}
                  Interview Type: ${data.interviewType}
                  Past Questions: ${JSON.stringify(data.pastQuestions)}
                  Feedback History: ${JSON.stringify(data.feedbackHistory)}
                  
                  Generate a comprehensive analysis including:
                  1. Overall performance trends
                  2. Key strengths demonstrated specific to this profession
                  3. Specific improvement areas relevant to this career path
                  4. Recommendations for future interviews in this field
                  
                  Format the response as a JSON object with:
                  - 'summary' (string): Overall analysis
                  - 'metrics' (object): Numerical scores for different aspects
                  - 'recommendations' (array of strings): Specific action items`;
        break;
      
      default:
        throw new Error('Invalid action specified');
    }
    
    requestData = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    // Make request to Gemini API
    const apiUrl = `${endpoint}?key=${geminiApiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    let processedResponse;
    
    // Extract and parse the text from Gemini's response
    try {
      const responseText = result.candidates[0].content.parts[0].text;
      
      // If the response is JSON, try to parse it
      if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
        processedResponse = JSON.parse(responseText);
      } else {
        // Handle non-JSON responses
        processedResponse = { rawResponse: responseText };
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      processedResponse = { 
        error: 'Failed to parse Gemini response',
        rawResponse: result.candidates[0].content.parts[0].text 
      };
    }

    return new Response(JSON.stringify(processedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in gemini-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
