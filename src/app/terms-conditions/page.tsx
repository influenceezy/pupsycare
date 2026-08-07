import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms and conditions governing your use of the Pupsy Care India website.',
}

export default function TermsConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Terms &amp; Conditions</h1>
      <p className="text-muted text-sm mb-10">Last updated: August 7, 2026</p>

      <div className="prose">
        <p>
          This website is owned and operated by Shash Digital Services Private Limited, trading as
          Pupsy Care. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of
          pupsycare.com (the &quot;Website&quot;) and the purchase of products through it. By accessing or
          using the Website, you agree to be bound by these Terms. If you do not agree, please do
          not use the Website.
        </p>

        <h2>1. Use of the Website</h2>
        <p>
          You agree to use the Website only for lawful purposes and in a manner that does not
          infringe the rights of, or restrict or inhibit the use and enjoyment of the Website by,
          any third party.
        </p>

        <h2>2. Products &amp; Pricing</h2>
        <p>
          We make every effort to display our products and their prices accurately. However, we
          reserve the right to correct any errors, inaccuracies, or omissions and to change or
          update information at any time without prior notice. Prices are listed in Indian Rupees
          (INR) and are inclusive of applicable taxes unless stated otherwise.
        </p>

        <h2>3. Orders &amp; Payment</h2>
        <p>
          By placing an order through the Website, you confirm that the information you provide is
          accurate and complete. All orders are subject to acceptance and availability. Payments
          are processed through secure third-party payment gateways; we do not store your card or
          payment credentials.
        </p>

        <h2>4. Shipping &amp; Delivery</h2>
        <p>
          Please refer to our Shipping Policy for details on delivery timelines, charges, and
          service areas.
        </p>

        <h2>5. Returns &amp; Refunds</h2>
        <p>
          Please refer to our Refund Policy for details on returns, exchanges, and refund
          eligibility.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content on the Website, including text, graphics, logos, images, and product
          formulations, is the property of Shash Digital Services Private Limited and is protected
          by applicable intellectual property laws. You may not reproduce, distribute, or use any
          content from the Website without our prior written consent.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          Our products are dietary supplements for dogs and are not intended to diagnose, treat,
          cure, or prevent any disease. Please consult a veterinarian before starting any new
          supplement, especially if your dog has an existing medical condition. To the fullest
          extent permitted by law, Shash Digital Services Private Limited shall not be liable for
          any indirect, incidental, or consequential damages arising from the use of our products
          or Website.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India. Any
          disputes arising out of or in connection with these Terms shall be subject to the
          exclusive jurisdiction of the courts at Alwar, Rajasthan.
        </p>

        <h2>9. Changes to These Terms</h2>
        <p>
          We reserve the right to update or modify these Terms at any time. Continued use of the
          Website after any changes constitutes acceptance of the revised Terms.
        </p>

        <h2>10. Contact Us</h2>
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
