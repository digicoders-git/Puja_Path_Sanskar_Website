import { useState } from "react"
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiHelpCircle } from "react-icons/fi"
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaCheckCircle } from "react-icons/fa"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, ShieldCheck, Star, Building2, Landmark, Building } from "lucide-react"

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">

      {/* Header */}
      <section className="bg-orange-500 text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-orange-100 text-xs font-semibold px-3 py-1 rounded-full mb-3">🕉️ We're Here to Help</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto">We're here to help you with any queries about pandits, pujas, or bookings. Reach out anytime!</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: <Phone size={22} className="text-orange-500 mx-auto mb-1" />, value: "24/7", label: "Support Available" },
            { icon: <MessageSquare size={22} className="text-orange-500 mx-auto mb-1" />, value: "< 1 hr", label: "Avg Response Time" },
            { icon: <Users size={22} className="text-orange-500 mx-auto mb-1" />, value: "1 Lakh+", label: "Happy Customers" },
            { icon: <Star size={22} className="text-orange-500 mx-auto mb-1" />, value: "4.8 ★", label: "Support Rating" },
          ].map((s) => (
            <div key={s.label}>
              {s.icon}
              <p className="text-lg font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Info */}
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Get in Touch</h2>
              <p className="text-sm text-gray-500 leading-relaxed">Have questions about booking a pandit or listing your services? Our team is available to assist you every day.</p>
            </div>

            {[
              { icon: <FiPhone size={20} />, title: "Phone", lines: ["+91 98765 43210", "+91 91234 56789"] },
              { icon: <FiMail size={20} />, title: "Email", lines: ["support@panditji.in", "booking@panditji.in"] },
              { icon: <FiMapPin size={20} />, title: "Address", lines: ["123, Puja Nagar, Varanasi", "Uttar Pradesh - 221001"] },
              { icon: <FiClock size={20} />, title: "Working Hours", lines: ["Monday – Saturday", "9:00 AM – 7:00 PM"] },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">{item.title}</p>
                  {item.lines.map((l) => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="font-semibold text-gray-700 text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", color: "bg-blue-100 text-blue-600", icon: <FaFacebookF size={14} /> },
                  { label: "Instagram", color: "bg-pink-100 text-pink-600", icon: <FaInstagram size={14} /> },
                  { label: "YouTube", color: "bg-red-100 text-red-600", icon: <FaYoutube size={14} /> },
                  { label: "WhatsApp", color: "bg-green-100 text-green-600", icon: <FaWhatsapp size={14} /> },
                ].map((s) => (
                  <button key={s.label} title={s.label} className={`w-9 h-9 rounded-full ${s.color} flex items-center justify-center hover:opacity-80 transition`}>{s.icon}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Send us a Message</h2>
            <p className="text-sm text-gray-400 mb-6">We'll get back to you within 24 hours</p>

            {sent ? (
              <div className="text-center py-12">
                <FaCheckCircle className="mx-auto text-green-500 mb-3" size={52} />
                <p className="text-green-600 font-bold text-lg">Message Sent Successfully!</p>
                <p className="text-gray-400 text-sm mt-1">Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Name *</label>
                    <input required type="text" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Email Address *</label>
                  <input required type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Subject *</label>
                  <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 text-gray-600">
                    <option value="">Select a subject</option>
                    <option>Book a Pandit</option>
                    <option>Register as Pandit</option>
                    <option>Puja Enquiry</option>
                    <option>Payment Issue</option>
                    <option>Feedback / Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Message *</label>
                  <textarea required placeholder="Write your message here..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 resize-none" />
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2">
                  <FiSend size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="bg-orange-50 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">How Can We Help You?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <ShieldCheck size={28} className="text-orange-500" />, title: "Book a Pandit", desc: "Need help finding the right pandit for your ceremony? We'll guide you." },
              { icon: <Users size={28} className="text-orange-500" />, title: "Register as Pandit", desc: "Want to list your services? We'll help you get started quickly." },
              { icon: <MessageSquare size={28} className="text-orange-500" />, title: "Puja Enquiry", desc: "Have questions about a specific puja or ritual? Ask our experts." },
              { icon: <Star size={28} className="text-orange-500" />, title: "Feedback", desc: "Share your experience or suggestions to help us improve our services." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: "How do I book a pandit?", a: "Simply browse our pandit listings, click 'Book Now' on any available pandit, fill in your details and confirm the booking." },
            { q: "Are all pandits verified?", a: "Yes, every pandit on our platform goes through a thorough background check and verification process before listing." },
            { q: "Can I cancel a booking?", a: "Yes, bookings can be cancelled up to 24 hours before the scheduled puja. Contact us for assistance." },
            { q: "How do I register as a pandit?", a: "Click the 'Register' button in the navbar, select 'I am a Pandit', fill in your details and submit for verification." },
            { q: "What pujas are available?", a: "We offer 12+ puja types including Vivah, Griha Pravesh, Satyanarayan, Ganesh Puja, Havan, Namkaran and more." },
            { q: "Is there a service charge?", a: "No hidden charges. The price shown on the pandit's profile is the starting price. Final price is agreed with the pandit." },
          ].map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
              <p className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                <FiHelpCircle size={15} className="text-orange-400 shrink-0" /> {faq.q}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Our Offices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { city: "Varanasi (HQ)", address: "123, Puja Nagar, Varanasi, UP - 221001", phone: "+91 98765 43210", icon: <Building2 size={32} className="text-orange-500" /> },
              { city: "Delhi", address: "45, Connaught Place, New Delhi - 110001", phone: "+91 91234 56789", icon: <Landmark size={32} className="text-blue-500" /> },
              { city: "Mumbai", address: "78, Andheri West, Mumbai, MH - 400053", phone: "+91 90123 45678", icon: <Building size={32} className="text-purple-500" /> },
            ].map((office) => (
              <div key={office.city} className="bg-orange-50 rounded-xl p-5 border border-orange-100 hover:shadow-md transition">
                <div className="mb-3">{office.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{office.city}</h3>
                <p className="text-xs text-gray-500 flex items-start gap-1.5 mb-1.5">
                  <MapPin size={12} className="text-orange-400 mt-0.5 shrink-0" /> {office.address}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Phone size={12} className="text-orange-400 shrink-0" /> {office.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-50 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-black">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-black text-sm mb-6">Our support team is available Monday to Saturday, 9 AM to 7 PM. We're happy to help!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+919876543210" className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-full hover:bg-orange-50 transition flex items-center justify-center gap-2 shadow">
              <FiPhone size={16} /> Call Us Now
            </a>
            <a href="mailto:support@panditji.in" className=" bg-white border-2 border-white text-black font-semibold px-8 py-3 rounded-full hover:bg-orange-500/10 transition flex items-center justify-center gap-2">
              <FiMail size={16} /> Email Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact
