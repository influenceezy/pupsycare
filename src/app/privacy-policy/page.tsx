import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Pupsy Care India collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Privacy Policy</h1>
      <p className="text-muted text-sm mb-10">Last updated: August 7, 2026</p>

      <div className="prose">
        <p>
          This Privacy Policy describes how Shash Digital Services Private Limited, trading as
          Pupsy Care (&quot;Pupsy Care&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), collects, uses, and protects
          the personal information of visitors and customers of pupsycare.com (the &quot;Website&quot;).
          By using the Website, you agree to the collection and use of information in accordance
          with this policy.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information when you interact with the Website:</p>
        <ul>
          <li>Contact details such as your name, email address, phone number, and shipping/billing address</li>
          <li>Order and payment information necessary to process and deliver your purchase</li>
          <li>Communications you send us via our contact form, email, or WhatsApp</li>
          <li>Technical data such as IP address, browser type, and pages visited, collected via cookies and analytics tools</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To process and fulfil your orders, including shipping and payment processing</li>
          <li>To communicate with you about your order, queries, or support requests</li>
          <li>To improve our Website, products, and customer experience</li>
          <li>To send updates or promotional communications, where you have consented to receive them</li>
          <li>To comply with applicable legal and regulatory requirements</li>
        </ul>

        <h2>3. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share information with trusted third
          parties such as payment gateways, courier and logistics partners, and IT service
          providers, solely for the purpose of fulfilling your order and operating the Website.
          These parties are required to keep your information confidential and use it only for
          the services they provide to us.
        </p>

        <h2>4. Cookies</h2>
        <p>
          The Website uses cookies and similar tracking technologies to enhance your browsing
          experience, analyse site traffic, and understand where our visitors come from. You can
          choose to disable cookies through your browser settings, though this may affect certain
          features of the Website.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement reasonable technical and organisational measures to protect your personal
          information from unauthorised access, alteration, disclosure, or destruction. However,
          no method of transmission over the internet is completely secure, and we cannot
          guarantee absolute security.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information held
          by us by contacting us using the details below.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated revision date.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us:
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
