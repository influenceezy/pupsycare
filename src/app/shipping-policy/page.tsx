import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Shipping timelines, charges, and delivery information for Pupsy Care India orders.',
}

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Shipping Policy</h1>
      <p className="text-muted text-sm mb-10">Last updated: August 7, 2026</p>

      <div className="prose">
        <p>
          This Shipping Policy applies to all orders placed on pupsycare.com, operated by Shash
          Digital Services Private Limited, trading as Pupsy Care.
        </p>

        <h2>1. Shipping Coverage</h2>
        <p>
          We currently ship across India. Orders are dispatched from our fulfilment centre and
          delivered via our courier partners to the shipping address provided at checkout.
        </p>

        <h2>2. Processing Time</h2>
        <p>
          Orders are typically processed and dispatched within 1–2 business days of confirmation.
          Orders placed on Sundays or public holidays will be processed on the next business day.
        </p>

        <h2>3. Delivery Timelines</h2>
        <p>
          Once dispatched, orders are generally delivered within 3–7 business days, depending on
          your location. Delivery timelines may vary during sale periods, festive seasons, or due
          to circumstances beyond our control (weather, courier delays, regional restrictions).
        </p>

        <h2>4. Shipping Charges</h2>
        <p>
          Shipping charges, if applicable, are calculated at checkout based on your order value and
          delivery location. Any free-shipping thresholds will be displayed on the Website at the
          time of purchase.
        </p>

        <h2>5. Order Tracking</h2>
        <p>
          Once your order is shipped, you will receive a tracking link via email, SMS, or WhatsApp
          to monitor your delivery status.
        </p>

        <h2>6. Delayed or Failed Delivery</h2>
        <p>
          If your order has not arrived within the expected timeframe, or if a delivery attempt has
          failed, please reach out to us with your order number so we can investigate with our
          courier partner.
        </p>

        <h2>7. Contact Us</h2>
        <p>For any shipping-related queries, please contact us:</p>
        <ul>
          <li>Legal Entity: Shash Digital Services Private Limited (trading as Pupsy Care)</li>
          <li>Registered Address: 00 Maliwada, Tijara, Tizara, Alwar - 301411, Rajasthan, India</li>
          <li>Phone: +91 99835 24747</li>
          <li>Email: hello@pupsycare.com</li>
        </ul>
      </div>
    </div>
  )
}
