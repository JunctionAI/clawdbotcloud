import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface TryOnRequest {
  selfieImage: string; // base64
  clothingImage: string; // base64 or URL
  prompt?: string;
}

export async function generateTryOn(request: TryOnRequest): Promise<string> {
  try {
    // Using Gemini 2.5 Flash for image generation/manipulation
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = request.prompt || `
      You are a fashion AI assistant. Create a realistic virtual try-on visualization.
      
      Task: Overlay the clothing item onto the person in the selfie while maintaining:
      - Natural body proportions and pose
      - Realistic lighting and shadows
      - Proper fit and draping of fabric
      - Consistent image quality and style
      
      Blend the clothing seamlessly with the original image background and person.
      
      Return only the final composite image.
    `;

    // Convert base64 images to the format Gemini expects
    const selfieData = request.selfieImage.replace(/^data:image\/\w+;base64,/, '');
    const clothingData = request.clothingImage.replace(/^data:image\/\w+;base64,/, '');

    const parts = [
      { text: prompt },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: selfieData,
        },
      },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: clothingData,
        },
      },
    ];

    const result = await model.generateContent(parts);
    const response = await result.response;
    const text = response.text();

    // For now, we'll return a simulated result
    // In production, Gemini would need to support image output or we'd use a different service
    // This is a placeholder implementation
    return request.selfieImage; // Placeholder - would return generated image
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate try-on image. Please check your API key and try again.');
  }
}

export async function analyzeStyle(imageBase64: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
      Analyze this person's style and appearance. Provide:
      1. Body type and proportions
      2. Current clothing style
      3. Recommended clothing categories
      4. Color palette suggestions
      
      Keep it brief and actionable.
    `;

    const imageData = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData,
        },
      },
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Style analysis error:', error);
    throw new Error('Failed to analyze style');
  }
}
