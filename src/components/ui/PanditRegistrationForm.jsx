import { useState, useRef } from "react"
import { CheckCircle, Upload } from "lucide-react"

const INDIAN_BANKS = [
  "Airtel Payments Bank", "AU Small Finance Bank", "Axis Bank", "Bandhan Bank",
  "Bank of Baroda", "Bank of India", "Bank of Maharashtra", "Canara Bank",
  "Capital Small Finance Bank", "Central Bank of India", "City Union Bank",
  "Corporation Bank", "CSB Bank", "DCB Bank", "Dhanlaxmi Bank",
  "Equitas Small Finance Bank", "ESAF Small Finance Bank", "Federal Bank",
  "Fino Payments Bank", "HDFC Bank", "HSBC Bank", "ICICI Bank",
  "IDBI Bank", "IDFC First Bank", "India Post Payments Bank", "Indian Bank",
  "Indian Overseas Bank", "IndusInd Bank", "Jana Small Finance Bank",
  "Jammu & Kashmir Bank", "Jio Payments Bank", "Karnataka Bank",
  "Karur Vysya Bank", "Kotak Mahindra Bank", "Lakshmi Vilas Bank",
  "North East Small Finance Bank", "NSDL Payments Bank", "Paytm Payments Bank",
  "Punjab & Sind Bank", "Punjab National Bank", "RBL Bank", "Saraswat Bank",
  "Shivalik Small Finance Bank", "South Indian Bank", "State Bank of India",
  "Suryoday Small Finance Bank", "Tamilnad Mercantile Bank", "UCO Bank",
  "ujjivan Small Finance Bank", "Union Bank of India", "Unity Small Finance Bank",
  "Utkarsh Small Finance Bank", "Yes Bank",
]

const BankInput = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([])
  const [showList, setShowList] = useState(false)
  const ref = useRef(null)

  const handleChange = (e) => {
    const val = e.target.value
    onChange(val)
    if (val.trim().length > 0) {
      setSuggestions(INDIAN_BANKS.filter(b => b.toLowerCase().includes(val.toLowerCase())))
      setShowList(true)
    } else {
      setShowList(false)
    }
  }

  const handleSelect = (bank) => {
    onChange(bank)
    setShowList(false)
  }

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        placeholder="e.g. State Bank of India"
        value={value}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowList(false), 150)}
        onFocus={() => value && setSuggestions(INDIAN_BANKS.filter(b => b.toLowerCase().includes(value.toLowerCase()))) || setShowList(!!value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
        autoComplete="off"
      />
      {showList && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
          {suggestions.map(bank => (
            <li key={bank} onMouseDown={() => handleSelect(bank)} className="px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer">
              {bank}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const inputCls = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
const labelCls = "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const SectionHeader = ({ step, title }) => (
  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-orange-100">
    <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0">{step}</span>
    <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">{title}</h3>
  </div>
)

const FileUpload = ({ label, accept, multiple, value, onChange }) => (
  <div>
    <label className={labelCls}>{label}</label>
    <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-orange-400 transition">
      <Upload size={16} className="text-orange-400 shrink-0" />
      <span className="text-sm text-gray-500 truncate">
        {multiple
          ? (value?.length > 0 ? `${value.length} file(s) selected` : "Click to upload (multiple allowed)")
          : (value ? value.name : "Click to upload")}
      </span>
      <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={onChange} />
    </label>
  </div>
)

const initialForm = {
  fullName: "", mobile: "", altMobile: "", email: "", dob: "", gender: "",
  currentAddress: "", permanentAddress: "", city: "", pincode: "",
  aadhar: "", aadharFile: null, pan: "",
  profilePhoto: null, pujaPhotos: [], video: null,
  experience: "", gurukul: "", specialization: "", languages: "",
  basicCharge: "", akhandCharge: "", perDayCharge: "", travelCharge: "",
  mantraLevel: "", timeDiscipline: "", dressCode: "", eventHandling: "",
  bhajan: false, astrology: false, vastu: false, havan: false, corporate: false,
  availableCities: "", travelWilling: "", maxDistance: "",
  availability: "", availableDays: [], emergency: "",
  upiId: "", bankName: "", accountNo: "", ifsc: "",
  declaration: false,
}

const PanditRegistrationForm = ({ onSubmit }) => {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const toggleDay = (day) => setForm(f => ({
    ...f,
    availableDays: f.availableDays.includes(day)
      ? f.availableDays.filter(d => d !== day)
      : [...f.availableDays, day]
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    onSubmit && onSubmit(form)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={56} />
        <p className="text-green-600 font-bold text-xl">Registration Submitted!</p>
        <p className="text-gray-400 text-sm mt-2">Our team will verify your details and contact you within 24 hours.</p>
        <button onClick={() => { setSubmitted(false); setForm(initialForm) }} className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-full text-sm font-semibold transition">
          Register Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* 1. Basic Details */}
      <div>
        <SectionHeader step={1} title="Basic Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input required type="text" placeholder="Pandit's full name" value={form.fullName} onChange={e => set("fullName", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Mobile Number *</label>
            <div className="flex gap-2">
              <span className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50">+91</span>
              <input required type="tel" maxLength={10} placeholder="10-digit number" value={form.mobile} onChange={e => set("mobile", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Alternate Number</label>
            <div className="flex gap-2">
              <span className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-500 bg-gray-50">+91</span>
              <input type="tel" maxLength={10} placeholder="Optional" value={form.altMobile} onChange={e => set("altMobile", e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Email ID *</label>
            <input required type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Date of Birth *</label>
            <input required type="date" value={form.dob} onChange={e => set("dob", e.target.value)} className={inputCls + " text-gray-600"} />
          </div>
          <div>
            <label className={labelCls}>Gender *</label>
            <select required value={form.gender} onChange={e => set("gender", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select Gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Address */}
      <div>
        <SectionHeader step={2} title="Address Details" />
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Current Address *</label>
            <textarea required rows={2} placeholder="House no, street, colony..." value={form.currentAddress} onChange={e => set("currentAddress", e.target.value)} className={inputCls + " resize-none"} />
          </div>
          <div>
            <label className={labelCls}>Permanent Address *</label>
            <textarea required rows={2} placeholder="Permanent address if different..." value={form.permanentAddress} onChange={e => set("permanentAddress", e.target.value)} className={inputCls + " resize-none"} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>City *</label>
              <input required type="text" placeholder="e.g. Varanasi" value={form.city} onChange={e => set("city", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Pincode *</label>
              <input required type="text" maxLength={6} placeholder="6-digit pincode" value={form.pincode} onChange={e => set("pincode", e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Identity */}
      <div>
        <SectionHeader step={3} title="Identity Verification" />
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Aadhar Card Number *</label>
            <input required type="text" maxLength={12} placeholder="12-digit Aadhar number" value={form.aadhar} onChange={e => set("aadhar", e.target.value)} className={inputCls} />
          </div>
          <FileUpload label="Upload Aadhar Card *" accept=".jpg,.jpeg,.png,.pdf" value={form.aadharFile} onChange={e => set("aadharFile", e.target.files[0])} />
          <div>
            <label className={labelCls}>PAN Card <span className="text-gray-400 normal-case font-normal">(Optional)</span></label>
            <input type="text" maxLength={10} placeholder="e.g. ABCDE1234F" value={form.pan} onChange={e => set("pan", e.target.value.toUpperCase())} className={inputCls} />
          </div>
        </div>
      </div>

      {/* 4. Photos & Media */}
      <div>
        <SectionHeader step={4} title="Photo & Media Upload" />
        <div className="flex flex-col gap-4">
          <FileUpload label="Profile Photo *" accept=".jpg,.jpeg,.png" value={form.profilePhoto} onChange={e => set("profilePhoto", e.target.files[0])} />
          <FileUpload label="Puja Photos" accept=".jpg,.jpeg,.png" multiple value={form.pujaPhotos} onChange={e => set("pujaPhotos", Array.from(e.target.files))} />
          <FileUpload label="Video (Optional)" accept=".mp4,.mov" value={form.video} onChange={e => set("video", e.target.files[0])} />
        </div>
      </div>

      {/* 5. Experience */}
      <div>
        <SectionHeader step={5} title="Experience & Qualification" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Total Experience (Years) *</label>
            <input required type="number" min="0" placeholder="e.g. 10" value={form.experience} onChange={e => set("experience", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Training / Gurukul</label>
            <input type="text" placeholder="e.g. Kashi Vidyapeeth" value={form.gurukul} onChange={e => set("gurukul", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Specialization *</label>
            <select required value={form.specialization} onChange={e => set("specialization", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select specialization</option>
              {["Vivah Puja", "Griha Pravesh", "Satyanarayan Puja", "Ganesh Puja", "Navratri Puja", "Havan / Yagya", "Namkaran Sanskar", "Shradh Puja", "Navagraha Puja", "Vastu Shanti", "Katha / Pravachan", "All Pujas"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Languages Known *</label>
            <input required type="text" placeholder="e.g. Hindi, Sanskrit, English" value={form.languages} onChange={e => set("languages", e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* 6. Pricing */}
      <div>
        <SectionHeader step={6} title="Puja Services & Pricing" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Basic Puja Charges (₹) *</label>
            <input required type="number" placeholder="e.g. 1100" value={form.basicCharge} onChange={e => set("basicCharge", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Akhand Paath Charges (₹)</label>
            <input type="number" placeholder="e.g. 5100" value={form.akhandCharge} onChange={e => set("akhandCharge", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Per Day Charges (₹)</label>
            <input type="number" placeholder="e.g. 2500" value={form.perDayCharge} onChange={e => set("perDayCharge", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Travel Charges (₹/km)</label>
            <input type="number" placeholder="e.g. 10" value={form.travelCharge} onChange={e => set("travelCharge", e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* 7. Quality */}
      <div>
        <SectionHeader step={7} title="Quality & Skill Assessment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Mantra Level *</label>
            <select required value={form.mantraLevel} onChange={e => set("mantraLevel", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select level</option>
              <option>Beginner</option><option>Intermediate</option><option>Expert</option><option>Vedic Scholar</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Time Discipline *</label>
            <select required value={form.timeDiscipline} onChange={e => set("timeDiscipline", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select</option>
              <option>Always On Time</option><option>Usually On Time</option><option>Flexible</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Dress Code *</label>
            <select required value={form.dressCode} onChange={e => set("dressCode", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select</option>
              <option>Traditional Dhoti-Kurta</option><option>Formal Kurta</option><option>As per occasion</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Event Handling *</label>
            <select required value={form.eventHandling} onChange={e => set("eventHandling", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select</option>
              <option>Small Gatherings</option><option>Medium Events</option><option>Large Events</option><option>All Types</option>
            </select>
          </div>
        </div>
      </div>

      {/* 8. Extra Skills */}
      <div>
        <SectionHeader step={8} title="Extra Skills" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "bhajan", label: "Bhajan / Kirtan", desc: "Can perform devotional songs" },
            { key: "astrology", label: "Astrology", desc: "Kundali, horoscope reading" },
            { key: "vastu", label: "Vastu Shastra", desc: "Home & office vastu consultation" },
            { key: "havan", label: "Havan / Yagya", desc: "Sacred fire rituals" },
            { key: "corporate", label: "Corporate Experience", desc: "Office inaugurations, events" },
          ].map(({ key, label, desc }) => (
            <label key={key} className={`flex items-start gap-3 border-2 rounded-xl p-3 cursor-pointer transition ${form[key] ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
              <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} className="accent-orange-500 mt-0.5 w-4 h-4 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 9. Travel */}
      <div>
        <SectionHeader step={9} title="Availability & Travel" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Available Cities *</label>
            <input required type="text" placeholder="e.g. Varanasi, Prayagraj, Lucknow" value={form.availableCities} onChange={e => set("availableCities", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Travel Willingness *</label>
            <select required value={form.travelWilling} onChange={e => set("travelWilling", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select</option>
              <option>Local Only (within city)</option><option>Nearby Districts</option><option>State Level</option><option>Pan India</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Max Distance (km)</label>
            <input type="number" placeholder="e.g. 50" value={form.maxDistance} onChange={e => set("maxDistance", e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* 10. Schedule */}
      <div>
        <SectionHeader step={10} title="Availability Schedule" />
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Availability Type *</label>
            <div className="flex gap-3">
              {["Full-time", "Part-time"].map(opt => (
                <label key={opt} className={`flex-1 flex items-center justify-center gap-2 border-2 rounded-xl py-3 cursor-pointer transition text-sm font-semibold ${form.availability === opt ? "border-orange-400 bg-orange-50 text-orange-600" : "border-gray-200 text-gray-500 hover:border-orange-200"}`}>
                  <input type="radio" name="availability" value={opt} checked={form.availability === opt} onChange={e => set("availability", e.target.value)} className="accent-orange-500" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Available Days *</label>
            <div className="flex flex-wrap gap-2">
              {days.map(day => (
                <button key={day} type="button" onClick={() => toggleDay(day)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition ${form.availableDays.includes(day) ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-500 border-gray-200 hover:border-orange-300"}`}>
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>Emergency Booking *</label>
            <select required value={form.emergency} onChange={e => set("emergency", e.target.value)} className={inputCls + " text-gray-600"}>
              <option value="">Select</option>
              <option>Available (within 2 hours)</option><option>Available (same day)</option><option>Not Available</option>
            </select>
          </div>
        </div>
      </div>

      {/* 11. Payment */}
      <div>
        <SectionHeader step={11} title="Payment Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>UPI ID *</label>
            <input required type="text" placeholder="e.g. pandit@upi" value={form.upiId} onChange={e => set("upiId", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2"><p className="text-xs text-gray-400 text-center">— or Bank Details —</p></div>
          <div>
            <label className={labelCls}>Bank Name</label>
            <BankInput value={form.bankName} onChange={val => set("bankName", val)} />
          </div>
          <div>
            <label className={labelCls}>Account Number</label>
            <input type="text" placeholder="Account number" value={form.accountNo} onChange={e => set("accountNo", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>IFSC Code</label>
            <input type="text" placeholder="e.g. SBIN0001234" value={form.ifsc} onChange={e => set("ifsc", e.target.value.toUpperCase())} className={inputCls} />
          </div>
        </div>
      </div>

      {/* 12. Declaration */}
      <div>
        <SectionHeader step={12} title="Declaration" />
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
          <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
            <li>I confirm that all information provided is true and accurate.</li>
            <li>I agree to perform puja services with full devotion and professionalism.</li>
            <li>I understand that false information may lead to account suspension.</li>
            <li>I agree to PanditJi's Terms of Service and Privacy Policy.</li>
            <li>I consent to background verification by PanditJi team.</li>
          </ul>
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" required checked={form.declaration} onChange={e => set("declaration", e.target.checked)} className="accent-orange-500 w-4 h-4 mt-0.5 shrink-0" />
          <span className="text-sm text-gray-600">I have read and agree to all the above terms. All information provided is correct to the best of my knowledge.</span>
        </label>
      </div>

      <button type="submit" disabled={!form.declaration} className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2">
        <CheckCircle size={16} /> Submit Registration
      </button>

    </form>
  )
}

export default PanditRegistrationForm
