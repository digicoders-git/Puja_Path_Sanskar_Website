import { useNavigate } from "react-router-dom"
import logoImg from "../../assets/img.jpeg"
import { FaShieldAlt, FaStar } from "react-icons/fa"
import { FiCalendar, FiLock, FiMessageCircle } from "react-icons/fi"
import { FaUsers, FaRupeeSign } from "react-icons/fa"
import PanditRegistrationForm from "../../components/ui/PanditRegistrationForm"

const panditBenefits = [
  { icon: <FaUsers className="text-orange-500" size={20} />, title: "Reach More Customers", desc: "Get discovered by thousands of devotees searching for pandits in your city." },
  { icon: <FaRupeeSign className="text-green-500" size={20} />, title: "Earn More Income", desc: "Increase your bookings and grow your income with our platform." },
  { icon: <FaStar className="text-yellow-400" size={20} />, title: "Build Your Reputation", desc: "Collect reviews and ratings to build a strong online presence." },
  { icon: <FiCalendar className="text-blue-500" size={20} />, title: "Manage Bookings Easily", desc: "Accept or decline bookings, manage your schedule with ease." },
]

const Register = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">

      {/* Header */}
      <section className="bg-orange-500 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-orange-100 text-xs font-semibold px-3 py-1 rounded-full mb-3">🕉️ Join 5000+ Verified Pandits</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Register as Pandit</h1>
          <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto">Join PanditJi — India's most trusted platform to connect verified pandits with devotees across India.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-5 text-xs text-orange-100">
            {["✅ Free Registration", "🔒 100% Secure", "📱 Easy to Use", "⭐ Trusted Platform"].map(b => (
              <span key={b} className="bg-white/15 px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {[
            { value: "5000+", label: "Active Pandits" },
            { value: "1 Lakh+", label: "Pujas Completed" },
            { value: "50+", label: "Cities Covered" },
            { value: "4.8 ★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-lg sm:text-xl font-bold text-orange-500">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Info Panel */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col items-center text-center gap-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-300 shadow">
                <img src={logoImg} alt="PanditJi" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">PanditJi</h2>
              <p className="text-sm text-gray-500">India's most trusted platform to find & book verified pandits for every ceremony.</p>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <FaStar key={i} size={14} className="text-yellow-400" />)}
                <span className="text-xs text-gray-500 ml-1">4.8/5</span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="font-bold text-orange-700 text-sm mb-3">Why Register as a Pandit?</p>
              <div className="flex flex-col gap-3">
                {panditBenefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-2">
                    <div className="shrink-0 mt-0.5">{b.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{b.title}</p>
                      <p className="text-xs text-gray-500">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {[
              { icon: <FaShieldAlt className="text-orange-500" size={18} />, title: "Verified Listing", desc: "Your profile gets verified before going live." },
              { icon: <FiLock className="text-green-500" size={18} />, title: "Secure & Private", desc: "Your data is safe with us. We never share your information." },
              { icon: <FiMessageCircle className="text-purple-500" size={18} />, title: "24/7 Support", desc: "Our support team is always available to help you." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">{item.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5 sm:p-8 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">🧘 Pandit Registration Form</h2>
            <PanditRegistrationForm />
          </div>
        </div>
      </section>

    </div>
  )
}

export default Register
