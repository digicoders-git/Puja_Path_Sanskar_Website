import { Link } from "react-router-dom"
import { FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi"
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa"
import logoImg from "../../assets/img.jpeg"

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-orange-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
              <img src={logoImg} alt="PanditJi" className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-xl font-bold">PanditJi</span>
          </div>
          <p className="text-sm text-orange-100 leading-relaxed">India's trusted platform to find verified pandits for all religious ceremonies and pujas.</p>
          <div className="flex gap-3 mt-1">
            {[
              { icon: <FaFacebookF size={14} />, color: "hover:bg-blue-600", label: "Facebook" },
              { icon: <FaInstagram size={14} />, color: "hover:bg-pink-600", label: "Instagram" },
              { icon: <FaYoutube size={14} />, color: "hover:bg-red-600", label: "YouTube" },
              { icon: <FaWhatsapp size={14} />, color: "hover:bg-green-600", label: "WhatsApp" },
            ].map((s) => (
              <button key={s.label} title={s.label} className={`w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white transition ${s.color}`}>
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 text-base">Popular Pujas</h3>
          <ul className="text-sm space-y-2 list-none p-0 m-0">
            {["Satyanarayan Puja", "Griha Pravesh", "Ganesh Puja", "Navratri Puja", "Vivah Puja", "Havan / Yagya"].map(p => (
              <li key={p} className="list-none">
                <Link to="/pujas" className="hover:text-white transition">
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 text-base">Quick Links</h3>
          <ul className="text-sm space-y-2 list-none p-0 m-0">
            {[
              { label: "Find a Pandit", to: "/pandits" },
              { label: "All Pujas", to: "/pujas" },
              { label: "Register as Pandit", to: "/register" },
              { label: "Contact Us", to: "/contact" },
              { label: "Top Cities", to: "/pandits" },
            ].map(l => (
              <li key={l.label} className="list-none">
                <Link to={l.to} className="hover:text-white transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 text-base">Contact Us</h3>
          <ul className="text-sm space-y-3 list-none p-0 m-0">
            <li className="list-none flex items-start gap-2"><FiMail size={15} className="mt-0.5 shrink-0 text-orange-200" /><span>support@panditji.in</span></li>
            <li className="list-none flex items-start gap-2"><FiPhone size={15} className="mt-0.5 shrink-0 text-orange-200" /><span>+91 98765 43210</span></li>
            <li className="list-none flex items-start gap-2"><FiClock size={15} className="mt-0.5 shrink-0 text-orange-200" /><span>Mon–Sat, 9am–7pm</span></li>
            <li className="list-none flex items-start gap-2"><FiMapPin size={15} className="mt-0.5 shrink-0 text-orange-200" /><span>123, Puja Nagar, Varanasi, UP</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-5 border-t border-orange-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-orange-200">
        <span>© {new Date().getFullYear()} PanditJi — All Rights Reserved</span>
        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Refund Policy</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
