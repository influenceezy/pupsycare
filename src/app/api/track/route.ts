import { NextRequest } from 'next/server'
import { insertEvent } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    insertEvent({
      event_type: body.event_type ?? 'unknown',
      page_url: body.page_url,
      product_id: body.product_id,
      product_name: body.product_name,
      cart_items: body.cart_items ? JSON.stringify(body.cart_items) : undefined,
      cart_total: body.cart_total,
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      utm_content: body.utm_content,
      device: body.device,
      session_id: body.session_id,
      ip,
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 500 })
  }
}
