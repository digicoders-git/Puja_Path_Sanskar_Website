import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logoImg from "../../assets/img.jpeg"
import { FaShieldAlt, FaStar, FaCheckCircle, FaUsers, FaRupeeSign } from "react-icons/fa"
import { FiCalendar, FiLock, FiMessageCircle, FiArrowRight } from "react-icons/fi"

const cities = [
  "Select City",
  "Varanasi", "Lucknow", "Prayagraj", "Agra", "Kanpur", "Mathura", "Vrindavan", "Ayodhya", "Meerut", "Noida", "Ghaziabad",
  "Delhi", "New Delhi", "Gurugram", "Faridabad",
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane",
  "Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota", "Bikaner", "Pushkar",
  "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Dwarka",
  "Bhopal", "Indore", "Ujjain", "Gwalior", "Jabalpur",
  "Bangalore", "Mysore", "Hubli", "Mangalore",
  "Chennai", "Coimbatore", "Madurai", "Salem",
  "Kolkata", "Howrah", "Durgapur", "Siliguri",
  "Patna", "Gaya", "Bodh Gaya", "Muzaffarpur",
  "Haridwar", "Rishikesh", "Dehradun", "Nainital",
  "Ranchi", "Jamshedpur", "Dhanbad",
  "Amritsar", "Ludhiana", "Chandigarh", "Jalandhar",
  "Hyderabad", "Visakhapatnam", "Vijayawada", "Tirupati",
  "Kochi", "Thiruvananthapuram", "Kozhikode",
  "Bhubaneswar", "Puri", "Cuttack",
  "Raipur", "Bilaspur", "Guwahati", "Shimla", "Manali",
]

const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
const labelCls = "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block"

const panditBenefits = [
  { icon: <FaUsers className="text-orange-500" size={20} />, title: "Reach More Customers", desc: "Get discovered by thousands of devotees searching for pandits in your city." },
  { icon: <FaRupeeSign className="text-green-500" size={20} />, title: "Earn More Income", desc: "Increase your bookings and grow your income with our platform." },
  { icon: <FaStar className="text-yellow-400" size={20} />, title: "Build Your Reputation", desc: "Collect reviews and ratings to build a strong online presence." },
  { icon: <FiCalendar className="text-blue-500" size={20} />, title: "Manage Bookings Easily", desc: "Accept or decline bookings, manage your schedule with ease." },
]

const Register = () => {
  const [tab, setTab] = useState("customer")
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const [customer, setCustomer] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "", dob: "", gender: "",
    houseNo: "", street: "", landmark: "", city: "", state: "", pincode: "",
  })

  const [pandit, setPandit] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "", aadhar: "",
    specialization: "", experience: "", languages: "", about: "", fee: "",
    houseNo: "", street: "", landmark: "", city: "", state: "", pincode: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      if (tab === "customer") setCustomer({ name: "", email: "", phone: "", password: "", confirmPassword: "", dob: "", gender: "", houseNo: "", street: "", landmark: "", city: "", state: "", pincode: "" })
      else setPandit({ name: "", email: "", phone: "", password: "", confirmPassword: "", aadhar: "", specialization: "", experience: "", languages: "", about: "", fee: "", houseNo: "", street: "", landmark: "", city: "", state: "", pincode: "" })
    }, 3000)
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">

      {/* Header */}
      <section className="bg-orange-500 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-orange-100 text-xs font-semibold px-3 py-1 rounded-full mb-3">🕉️ Join 1 Lakh+ Happy Users</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Create Your Account</h1>
          <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto">Join PanditJi — India's most trusted platform for booking verified pandits for every ceremony.</p>
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
            { value: "1 Lakh+", label: "Registered Users" },
            { value: "5000+", label: "Active Pandits" },
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

            {[
              { icon: <FaShieldAlt className="text-orange-500" size={18} />, title: "Verified Pandits", desc: "All pandits are background-checked and verified before listing." },
              { icon: <FiCalendar className="text-blue-500" size={18} />, title: "Easy Booking", desc: "Book a pandit in minutes with flexible date & time scheduling." },
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

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <span onClick={() => navigate("/")} className="text-orange-500 font-semibold cursor-pointer hover:underline">Login here</span>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5 sm:p-8 border border-gray-100">

            {/* Tabs */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
              <button onClick={() => { setTab("customer"); setSubmitted(false) }} className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition ${tab === "customer" ? "bg-orange-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                👤 Register as Customer
              </button>
              <button onClick={() => { setTab("pandit"); setSubmitted(false) }} className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition ${tab === "pandit" ? "bg-orange-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                🧘 Register as Pandit
              </button>
            </div>

            {/* Pandit Benefits Banner */}
            {tab === "pandit" && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="font-bold text-orange-700 text-sm mb-3">Why Register as a Pandit on PanditJi?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            )}

            {submitted ? (
              <div className="text-center py-12">
                <FaCheckCircle className="mx-auto text-green-500 mb-4" size={56} />
                <p className="text-green-600 font-bold text-xl">Registration Successful!</p>
                <p className="text-gray-400 text-sm mt-2">Welcome to PanditJi. You can now login to your account.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-full text-sm font-semibold transition">
                  Register Another
                </button>
              </div>
            ) : tab === "customer" ? (

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Section 1 */}
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">1</span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input required type="text" placeholder="Your full name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Mobile Number *</label>
                      <div className="flex gap-2">
                        <span className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50">+91</span>
                        <input required type="tel" placeholder="10-digit number" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Email Address *</label>
                      <input required type="email" placeholder="you@example.com" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Date of Birth</label>
                      <input type="date" value={customer.dob} onChange={(e) => setCustomer({ ...customer, dob: e.target.value })} className={inputCls + " text-gray-600"} />
                    </div>
                    <div>
                      <label className={labelCls}>Gender</label>
                      <select value={customer.gender} onChange={(e) => setCustomer({ ...customer, gender: e.target.value })} className={inputCls + " text-gray-600"}>
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Password *</label>
                      <input required type="password" placeholder="Create a password" value={customer.password} onChange={(e) => setCustomer({ ...customer, password: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Confirm Password *</label>
                      <input required type="password" placeholder="Re-enter password" value={customer.confirmPassword} onChange={(e) => setCustomer({ ...customer, confirmPassword: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Section 2 */}
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">2</span>
                    Home Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>House / Flat No. *</label>
                      <input required type="text" placeholder="e.g. A-204" value={customer.houseNo} onChange={(e) => setCustomer({ ...customer, houseNo: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Street / Colony *</label>
                      <input required type="text" placeholder="Street or colony name" value={customer.street} onChange={(e) => setCustomer({ ...customer, street: e.target.value })} className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Landmark</label>
                      <input type="text" placeholder="Near temple, school etc." value={customer.landmark} onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>City *</label>
                      <select required value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} className={inputCls + " text-gray-600"}>
                        {cities.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>State *</label>
                      <input required type="text" placeholder="e.g. Uttar Pradesh" value={customer.state} onChange={(e) => setCustomer({ ...customer, state: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>PIN Code *</label>
                      <input required type="text" placeholder="6-digit PIN code" maxLength={6} value={customer.pincode} onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400">By registering, you agree to our <span className="text-orange-500 cursor-pointer hover:underline">Terms of Service</span> & <span className="text-orange-500 cursor-pointer hover:underline">Privacy Policy</span></p>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2">
                  Create Customer Account <FiArrowRight size={16} />
                </button>
              </form>

            ) : (

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Section 1 */}
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">1</span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input required type="text" placeholder="Pandit's full name" value={pandit.name} onChange={(e) => setPandit({ ...pandit, name: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Mobile Number *</label>
                      <div className="flex gap-2">
                        <span className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50">+91</span>
                        <input required type="tel" placeholder="10-digit number" value={pandit.phone} onChange={(e) => setPandit({ ...pandit, phone: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Email Address *</label>
                      <input required type="email" placeholder="you@example.com" value={pandit.email} onChange={(e) => setPandit({ ...pandit, email: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Aadhar Number *</label>
                      <input required type="text" placeholder="12-digit Aadhar number" maxLength={12} value={pandit.aadhar} onChange={(e) => setPandit({ ...pandit, aadhar: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Starting Fee (₹) *</label>
                      <input required type="number" placeholder="e.g. 1100" value={pandit.fee} onChange={(e) => setPandit({ ...pandit, fee: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Password *</label>
                      <input required type="password" placeholder="Create a password" value={pandit.password} onChange={(e) => setPandit({ ...pandit, password: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Confirm Password *</label>
                      <input required type="password" placeholder="Re-enter password" value={pandit.confirmPassword} onChange={(e) => setPandit({ ...pandit, confirmPassword: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Section 2 */}
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">2</span>
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Specialization *</label>
                      <select required value={pandit.specialization} onChange={(e) => setPandit({ ...pandit, specialization: e.target.value })} className={inputCls + " text-gray-600"}>
                        <option value="">Select specialization</option>
                        {["Vivah Puja", "Griha Pravesh", "Satyanarayan Puja", "Ganesh Puja", "Navratri Puja", "Havan / Yagya", "Namkaran Sanskar", "Shradh Puja", "Navagraha Puja", "Vastu Shanti", "Katha / Pravachan", "All Pujas"].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Years of Experience *</label>
                      <input required type="number" min="1" placeholder="e.g. 10" value={pandit.experience} onChange={(e) => setPandit({ ...pandit, experience: e.target.value })} className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Languages Known *</label>
                      <input required type="text" placeholder="e.g. Hindi, Sanskrit, English" value={pandit.languages} onChange={(e) => setPandit({ ...pandit, languages: e.target.value })} className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>About Yourself *</label>
                      <textarea required placeholder="Brief description about your experience, qualifications and services..." value={pandit.about} onChange={(e) => setPandit({ ...pandit, about: e.target.value })} rows={3} className={inputCls + " resize-none"} />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Section 3 */}
                <div>
                  <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">3</span>
                    Residential Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>House / Flat No. *</label>
                      <input required type="text" placeholder="e.g. 12B" value={pandit.houseNo} onChange={(e) => setPandit({ ...pandit, houseNo: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Street / Mohalla *</label>
                      <input required type="text" placeholder="Street or mohalla name" value={pandit.street} onChange={(e) => setPandit({ ...pandit, street: e.target.value })} className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Landmark</label>
                      <input type="text" placeholder="Near mandir, school etc." value={pandit.landmark} onChange={(e) => setPandit({ ...pandit, landmark: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>City *</label>
                      <select required value={pandit.city} onChange={(e) => setPandit({ ...pandit, city: e.target.value })} className={inputCls + " text-gray-600"}>
                        {cities.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>State *</label>
                      <input required type="text" placeholder="e.g. Uttar Pradesh" value={pandit.state} onChange={(e) => setPandit({ ...pandit, state: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>PIN Code *</label>
                      <input required type="text" placeholder="6-digit PIN code" maxLength={6} value={pandit.pincode} onChange={(e) => setPandit({ ...pandit, pincode: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400">By registering, you agree to our <span className="text-orange-500 cursor-pointer hover:underline">Terms of Service</span> & <span className="text-orange-500 cursor-pointer hover:underline">Privacy Policy</span></p>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2">
                  Register as Pandit <FiArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Register
