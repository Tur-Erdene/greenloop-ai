import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Та "GreenLoop AI"-ийн хог ангилах мэргэжилтэн. Хэрэглэгчийн илгээсэн ЗУРАГ дээр үндэслэн хогийг ангилах шаардлагатай.

ЧУХАЛ: Зөвхөн МОНГОЛ ХЭЛЭЭР хариу өг. JSON формат ашигла.

Хогийн ангилалууд:
- plastic (Хуванцар): PET, HDPE, бусад хуванцар. Усанд живдэггүй, хэврэг.
- paper (Цаас): Сонин, хайрцаг, картон. Усанд шингэдэг, хялбар хайлдаг.
- glass (Шил): Лонх, сав. Хатуу, гялганамтгай, хугарамтгай.
- metal (Металл): Лааз, таглаа, хөнгөн цагаан. Хатуу, мөнгөлөг өнгөтэй.
- organic (Органик): Хүнсний үлдэгдэл, хальс. Нойтон, ялзардаг.
- hazardous (Аюултай): Зай, батерей, эм, химийн бодис.
- general (Энгийн): Гялгар уут, чипсний боодол, тамхины иш. Дахин боловсруулагддаггүй.

Зурган дээр харагдаж буй зүйлийг таньж, дараах мэдээлэл өг:

1. Ангилал (category)
2. Тайлбар (description) - юу гэж харагдаж байна
3. Бэлдэх заавар (preparation) - хэрхэн бэлдэх
4. Хаана өгөх (location) - Улаанбаатар дахь ойрын цэгүүд
5. Хэмнэлт (impact) - дахин боловсруулбал ямар нөлөөтэй
6. Эко оноо (ecoPoints) - тоо (10-100 хооронд)
7. Анхааруулга (warning) - юунд анхаарах

Хэрвээ хог олон төрөл байвал бүгдийг жагсаа. Хэрвээ тодорхой биш бол хамгийн магадлал өндөртэй ангилалд хий.`;

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Зураг оруулна уу' },
        { status: 400 }
      );
    }

    // Validate base64 image
    if (!image.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Зөвхөн зураг оруулна уу (JPEG, PNG)' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI API key тохируулагдаагүй байна' },
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
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Энэ зураг дээр хог хаягдал харагдаж байна. Дахин боловсруулах ангилал, бэлдэх заавар, хаана өгөх, эко нөлөөг МОНГОЛ ХЭЛЭЭР JSON форматад өгөөрэй.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                  detail: 'low',
                },
              },
            ],
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI Vision API error:', errorData);
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

    // Parse JSON response
    let result;
    try {
      result = JSON.parse(reply);
    } catch (e) {
      // If not valid JSON, wrap in expected format
      result = {
        category: 'unknown',
        description: reply,
        preparation: 'Тодорхой биш',
        location: 'Хороо орчмын дахивар цэг',
        impact: 'Мэдээлэл хязгаарлагдмал',
        ecoPoints: 10,
        warning: 'Буцаад шалгаарай',
      };
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Analyze waste API error:', error);
    return NextResponse.json(
      { error: 'Сервер алдаа гарлаа', details: error.message },
      { status: 500 }
    );
  }
}
