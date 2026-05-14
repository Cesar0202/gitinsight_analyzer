/**
 * AIService.js
 * Responsibility: Handle communication with AI Models (Llama 3 via Groq)
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const AIService = {
  /**
   * Generates technical insights using Llama 3
   */
  async getDeveloperInsights(userData, stats, repos) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!apiKey || apiKey.includes("tu_llave")) {
      console.warn("AI Insights: VITE_GROQ_API_KEY no configurada correctamente.");
      return null;
    }

    // Prompt optimizado para 6 insights
    const prompt = `Analiza este perfil de desarrollador de ${userData.platform}:
    - Usuario: ${userData.login}
    - Bio: ${userData.bio}
    - Score Técnico: ${stats.activityScore}/100
    - Lenguajes: ${stats.langData.map(l => l.name).join(", ")}
    - Total Stars: ${stats.totalStars}
    - Proyectos clave: ${repos.slice(0, 3).map(r => r.name).join(", ")}

    Genera una lista de exactamente 6 insights técnicos cortos y profesionales en español. 
    Enfócate en su stack tecnológico y relevancia.
    Responde ÚNICAMENTE en formato JSON válido con esta estructura:
    {"insights": ["frase 1", "frase 2", "frase 3", "frase 4", "frase 5", "frase 6"]}`;

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey.trim()}`, // .trim() para evitar espacios accidentales
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { 
              role: "system", 
              content: "Eres un experto en reclutamiento técnico. Tu salida debe ser siempre JSON puro." 
            },
            { role: "user", content: prompt }
          ],
          temperature: 0.4,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Groq API Error Details:", errorData);
        return null;
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const content = JSON.parse(data.choices[0].message.content);
        return content.insights;
      }
      
      return null;
    } catch (error) {
      console.error("AI Service Network/Parse Error:", error);
      return null;
    }
  }
};
