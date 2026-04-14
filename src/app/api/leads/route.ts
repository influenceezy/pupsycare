import { NextRequest } from 'next/server'
import { insertLead, insertEvent } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, phone, email, city, pincode, products, utm_source, utm_medium, utm_campaign, utm_content, session_id, device } = body

    if (!name || !phone) {
      return Response.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    const waitlist_position = Math.floor(Math.random() * (89 - 23 + 1)) + 23

    insertLead({
      name,
      phone,
      email,
      city,
      pincode,
      products: products ? JSON.stringify(products) : undefined,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      waitlist_position,
    })

    // Also track the event
    insertEvent({
      event_type: 'waitlist_signup',
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      session_id,
      device,
    })

    return Response.json({ ok: true, waitlist_position })
  } catch {
    return Response.json({ ok: false }, { status: 500 })
  }
}
