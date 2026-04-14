import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story behind Pupsy Care India — built by a dog parent who wanted better for his fur baby.',
}

const team = [
  { name: 'Aryan Kapoor', role: 'Founder & CEO', initials: 'AK', bio: 'Dog dad to Bruno (a 9-year-old Lab). Started Pupsy after spending months searching for quality joint supplements for Bruno.' },
  { name: 'Dr. Priya Mehta', role: 'Veterinary Advisor', initials: 'PM', bio: 'Small animal veterinarian with 10+ years of experience. Formulated both our core products.' },
  { name: 'Neha Sharma', role: 'Head of Operations', initials: 'NS', bio: 'Ex-FMCG. Ensures every order reaches you with care and our supply chain stays clean.' },
]

const values = [
  { icon: '🔬', title: 'Science First', desc: 'Every ingredient we use has peer-reviewed evidence behind it. We don\'t add trendy extras that don\'t do anything.' },
  { icon: '🌿', title: 'Natural & Clean', desc: 'No artificial colours, flavours, or fillers. If it doesn\'t belong in a healthy dog\'s diet, it doesn\'t belong in our chews.' },
  { icon: '🇮🇳', title: 'Proudly Indian', desc: 'Formulated for Indian dogs, in Indian climates, manufactured in India. We\'re building a brand that belongs here.' },
  { icon: '💬', title: 'Honest Always', desc: 'We tell you exactly what\'s in our products and how much. No proprietary blends. No vague claims. Just truth.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream border-b border-border py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                Our Story
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-text leading-tight mb-5">
                Built by a dog parent.<br />For dog parents.
              </h1>
              <p className="text-muted leading-relaxed mb-4">
                It started with Bruno — a 7-year-old Labrador who started slowing down. His walks got shorter,
                mornings got harder. Our founder spent months trying to find a joint supplement that actually
                worked, was made with clean ingredients, and didn&apos;t cost a fortune.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                He couldn&apos;t find one. So he built Pupsy Care.
              </p>
              <p className="text-muted leading-relaxed">
                We partnered with Dr. Priya Mehta, a small animal veterinarian with a decade of clinical experience,
                and spent six months developing formulas that would actually make a difference — not just look good
                on a label.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80"
                alt="A dog and its owner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-text mb-4">Our Mission</h2>
        <p className="text-xl text-muted leading-relaxed italic">
          &ldquo;To give every Indian dog parent access to honest, effective, science-backed supplements
          — because they can&apos;t tell you where it hurts, but you can still do something about it.&rdquo;
        </p>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-text mb-10 text-center">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-border p-5 text-center">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-text mb-2 text-sm">{v.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-text mb-10 text-center">The Team</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-cream rounded-2xl border border-border p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {member.initials}
              </div>
              <h3 className="font-bold text-text mb-0.5">{member.name}</h3>
              <p className="text-xs text-primary font-semibold mb-3">{member.role}</p>
              <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet our products</h2>
          <p className="text-white/80 mb-8">
            Everything we&apos;ve built — the mission, the team, the values — comes down to two things in a jar.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-cream transition-colors"
          >
            Shop Happy Joints & Shine Coat →
          </Link>
        </div>
      </section>
    </>
  )
}
