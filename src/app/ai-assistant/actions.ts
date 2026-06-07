"use server";

export interface ChatMessageParam {
  role: "user" | "model";
  text: string;
}

export async function askAssistant(
  prompt: string,
  budget: number,
  history: ChatMessageParam[]
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return "Hi there! I am currently running in **Demo Mode** because no `GEMINI_API_KEY` was found in the environment variables.\n\nTo connect me to a **live Gemini AI**, please create a `.env.local` file in the root of your project and add your API key:\n`GEMINI_API_KEY=your_actual_gemini_key`\n\nFor now, you can still type messages or use the **Quick Suggestions** buttons to try out my simulated canteen ordering flows!";
  }

  try {
    const systemInstruction = `You are the AI Food Assistant for the "AI Smart Canteen".
Your job is to help university students choose, configure, and order meals from the canteen menu, find deals within their budget, and provide friendly assistance.

Current User Configuration:
- Maximum Budget: Rs${budget}
- Active Student Offer: Flat 20% discount on all orders (requires email verification on the Deals page).

Canteen Menu:
1. Classic Beef Burger (Burger) - Rs299 | Rating: 4.8 | Subtitle: Juicy beef patty with fresh vegetables. Contains 28g protein.
2. Double Cheese Burger (Burger) - Rs399 | Rating: 4.9 | Subtitle: Two beef patties with extra cheese.
3. Chicken Burger (Burger) - Rs249 | Rating: 4.7 | Subtitle: Crispy chicken with special sauce.
4. Supreme Pizza (Pizza) - Rs449 | Rating: 4.9 | Subtitle: Loaded with pepperoni, olives, and bell peppers.
5. Cheese Burst Pizza (Pizza) - Rs499 | Rating: 4.8 | Subtitle: Overflowing gooey cheese mozzarella blend.
6. Thin Crust Veggie Pizza (Pizza) - Rs349 | Rating: 4.6 | Subtitle: Crisp crust with seasonal garden vegetables.
7. Hyderabadi Biryani (Biryani) - Rs279 | Rating: 4.8 | Subtitle: Fragrant long-grain basmati rice with spices.
8. Mango Smoothie (Drinks) - Rs129 | Rating: 4.5 | Subtitle: Fresh blended tropical sweet mangoes.

Active Combo Deals (shown on Deals Page):
- Student Mega Combo: Rs349 (was Rs549) - Burger + Fries + Drink + Dessert.
- Pizza Party Deal: Rs599 (was Rs898) - 2 Medium Pizzas + 2 Drinks.
- Biryani Special: Rs299 (was Rs499) - Biryani + Raita + Salad + Dessert.
- Breakfast Bundle: Rs199 (was Rs299) - Sandwich + Coffee + Juice.
- Healthy Meal: Rs249 (was Rs399) - Salad Bowl + Smoothie + Nuts.
- Late Night Snack: Rs279 (was Rs429) - Wings + Fries + Cola.
- AI Picked: Budget Saver - Rs199 (was Rs349) - Save 43%.
- AI Picked: High Protein - Rs329 (was Rs469) - Save 34% (includes double grilled chicken and healthy sides).

Response guidelines:
- Be highly conversational, helpful, and concise (keep replies within 2-4 sentences or a short bulleted list).
- If the user asks for suggestions within a budget, filter the menu/deals to show items costing ≤ Rs${budget}.
- If the user sends a deal-claiming prompt like "Apply the AI Picked Budget Saver deal...", confirm the deal (and discount) has been applied to their cart and ask if they are ready to order.
- Format pricing as Rs[amount] and highlight recommendations using markdown bold.
- Advise them to use the Deals page to verify their student status for an extra 20% off if relevant.`;

    // Map history to Gemini's expected API format
    const contents = [
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.7
          }
        })
      }
    );

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      console.error("Gemini API HTTP Error:", response.status, errBody);
      return "Sorry, I had trouble connecting to the AI model. Please check that your `GEMINI_API_KEY` is valid.";
    }

    const resJson = await response.json();
    const textReply = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
    return textReply || "I processed your request but could not compile a response. Please try again.";
  } catch (error) {
    console.error("Failed to query Gemini API:", error);
    return "I am having difficulty communicating with my AI servers. Please verify your internet connection and environment settings.";
  }
}
