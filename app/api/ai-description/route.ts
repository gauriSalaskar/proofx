import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { achievement } = await request.json();

    // Use Anthropic API if key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 150,
          messages: [
            {
              role: 'user',
              content: `Write a professional 1-2 sentence certificate description for this achievement: "${achievement}". 
              Make it formal, impressive, and suitable for a credential certificate. 
              Return only the description text, nothing else.`,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const description = data.content?.[0]?.text?.trim();
        if (description) {
          return NextResponse.json({ description });
        }
      }
    }

    // Fallback: template-based descriptions
    const templates: Record<string, string> = {
      default: `This certificate recognizes outstanding performance and dedication demonstrated through the achievement of "${achievement}", reflecting exceptional skill and commitment to excellence.`,
      hackathon: `This certificate is proudly awarded in recognition of innovative thinking, technical excellence, and collaborative spirit demonstrated at the hackathon competition.`,
      developer: `This credential certifies the holder's demonstrated proficiency in software development, showcasing advanced technical skills and problem-solving capabilities.`,
      leadership: `This certificate honors distinguished leadership, strategic vision, and the ability to inspire and guide teams toward achieving outstanding results.`,
    };

    const lower = achievement.toLowerCase();
    let description = templates.default;
    if (lower.includes('hackathon') || lower.includes('winner') || lower.includes('champion')) {
      description = templates.hackathon;
    } else if (lower.includes('dev') || lower.includes('code') || lower.includes('engineer')) {
      description = templates.developer;
    } else if (lower.includes('lead') || lower.includes('manage') || lower.includes('direct')) {
      description = templates.leadership;
    }

    return NextResponse.json({ description: description.replace('"${achievement}"', `"${achievement}"`) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
  }
}
