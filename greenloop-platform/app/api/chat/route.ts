import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Та "GreenLoop AI"-ийн экологийн зөвлөх юм. Таны зорилго:

1. Дахин боловсруулалт, тогтвортой хөгжил, CO₂ хуримтлал, хүрээлэн буй орчны хамгаалалттай холбоотой МОНГОЛ ХЭЛЭЭР мэргэжлийн зөвлөгөө өгөх
2. GreenLoop AI платформын талаар тайлбарлах:
   - CO₂ тооцоолуур (PET, HDPE, цаас, хөнгөн цагаан, шил)
   - Pickup tracking (хог хаягдал тээвэрлэлт хянах)
   - Eco rewards (эко оноо, badge, leaderboard)
   - Tree funding (мод тарих хандив)
   - ESG dashboard (байгууллагын тайлан)
3. Хэрэглэгчдийг урамшуулж, тогтвортой хөгжилд хувь нэмэр оруулахыг дэмжих
4. Дахин боловсруулалтын процесс, ангилал, үр нөлөө тайлбарлах

Чухал дүрэм:
- ХЭЗЭЭ Ч хуурамч мэдээлэл бүү өг
- Монгол орны нөхцөлд тохирсон зөвлөгөө өг
- Энгийн, ойлгомжтой хэлээр тайлбарлах
- CO₂ тооцоололд 1 кг PET = 3.5 кг CO₂, 1 кг цаас = 1.2 кг CO₂ гэх мэтчилэн баримт ашиглах
- Хэрэглэгчийг шүүмжилж, сөрөг мэдрэмж төрүүлэхгүй байх
- Хандагчтай найрсаг, мэргэжлийн байдлаар харилцах`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI API key not configured' },
        { status: 503 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'AI сервер алдаа гарлаа', details: errorData?.error?.message },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: 'AI хариу хоосон ирлээ' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Сервер алдаа гарлаа', details: error.message },
      { status: 500 }
    );
  }
}
