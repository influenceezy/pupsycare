import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Returns, exchanges, and refund eligibility for Pupsy Care India orders.',
}

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Refund Policy</h1>
      <p className="text-muted text-sm mb-10">Last updated: August 7, 2026</p>

      <div className="prose">
        <p>
          This Refund Policy applies to all orders placed on pupsycare.com, operated by Shash
          Digital Services Private Limited, trading as Pupsy Care. We want you and your dog to be
          happy with every order — here&apos;s how returns and refunds work.
        </p>

        <h2>1. Eligibility for Returns</h2>
        <p>
          As our products are consumable dietary supplements, we are only able to accept returns in
          the following cases:
        </p>
        <ul>
          <li>You received a damaged, defective, or incorrect product</li>
          <li>The product was significantly different from what was described on the Website</li>
          <li>The item is unopened, unused, and in its original sealed packaging</li>
        </ul>
        <p>
          Requests must be raised within 7 days of delivery, along with your order number and
          photos of the issue where applicable.
        </p>

        <h2>2. Non-Returnable Items</h2>
        <p>
          For hygiene and safety reasons, opened or used products, and items without their original
          packaging, cannot be returned unless found to be defective.
        </p>

        <h2>3. Refund Process</h2>
        <p>
          Once your return is received and inspected, we will notify you of the approval or
          rejection of your refund. Approved refunds are processed to your original payment method
          within 5–7 business days.
        </p>

        <h2>4. Exchanges</h2>
        <p>
          If you received a damaged or incorrect product, we&apos;re happy to arrange a replacement
          instead of a refund, subject to stock availability.
        </p>

        <h2>5. Cancellations</h2>
        <p>
          Orders can be cancelled free of charge before they are dispatched. Once an order has been
          shipped, it cannot be cancelled, but you may initiate a return once delivered, subject to
          the eligibility criteria above.
        </p>

        <h2>6. How to Request a Return or Refund</h2>
        <p>
          To initiate a return, exchange, or refund request, please contact us with your order
          number and details of the issue:
        </p>
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
