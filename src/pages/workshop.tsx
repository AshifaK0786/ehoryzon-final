import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import AnimatedBackground from "../components/AnimatedBackground";

type Person = {
  name: string;
  roll: string;
  department: string;
  collegeName?: string;
  year: string;
  mobile: string;
  email: string;
};

const workshops = [
  { id: 1, name: "Inaugural AI 2.0", price: 100, day: 1 },
  { id: 2, name: "Smart Mobility in Industry 4.0", price: 200, day: 2 },
  { id: 3, name: "AI for Autonomous and Industrial Application", price: 300, day: 3 },
  { id: 4, name: "Rising Capital and Finance Management", price: 400, day: 4 },
  { id: 5, name: "Startup Legal and Ethical Steps", price: 500, day: 4 },
  { id: 6, name: "IPR and IP Management", price: 500, day: 4 },
  { id: 7, name: "Business Market Fit", price: 500, day: 4 },
  { id: 8, name: "Product Market Fit", price: 800, day: 4 },
  { id: 9, name: "Circular Economy", price: 800, day: 5 },
  { id: 10, name: "Precision Agriculture using IoT and AI", price: 800, day: 6 },
  { id: 11, name: "From Passion to Progress", price: 800, day: 7 },
];

export default function Workshop() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);
  const [collegeType, setCollegeType] = useState<"intra" | "inter" | "">("");
  const [person, setPerson] = useState<Person>({
    name: "",
    roll: "",
    department: "",
    collegeName: "",
    year: "1",
    mobile: "",
    email: "",
  });
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const departments = useMemo(
    () => [
      "Automobile Engineering",
      "Civil Engineering",
      "Mechanical Engineering",
      "Mechatronics Engineering",
      "Electronics and Instrumentation Engineering",
      "Electrical and Electronics Engineering",
      "Electronics and Communication Engineering",
      "Computer Science Engineering",
      "Information Technology",
      "Artificial Intelligence and Data Science",
      "Artificial Intelligence and Machine Learning",
      "Computer Science and Design",
      "Chemical Engineering",
      "Food Technology",
      "Architecture",
      "Master of Business Administration (MBA)",
      "Master of Computer Applications (MCA)",
      "B.Sc Computer Systems and Design",
      "B.Sc Information Systems",
      "B.Sc Software Systems",
      "M.Sc Software Systems",
    ],
    []
  );

  const handlePersonChange = (k: keyof Person, v: string) => {
    setPerson((p) => ({ ...p, [k]: v }));
  };

  const handleScreenshots = (fl?: FileList | null) => {
    if (!fl) return;
    setScreenshots(Array.from(fl));
  };

  const validate = () => {
    if (!selectedWorkshop) return "Please select a workshop";
    if (!collegeType) return "Please select Intra-college or Inter-college";
    if (!person.name.trim()) return "Name is required";
    if (!person.roll.trim()) return "Roll number is required";
    if (!person.department.trim()) return "Department is required";
    if (!person.mobile.trim()) return "Mobile number is required";
    if (!person.email.trim()) return "Email is required";

    if (collegeType === "inter" && !person.collegeName?.trim())
      return "College name is required for Inter-college";

    if (collegeType === "intra" && !person.email.endsWith("@kongu.edu"))
      return "Email must be a kongu.edu address for Intra-college";

    if (!screenshots || screenshots.length === 0) return "Payment screenshot is required";

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    const maxSizeBytes = 5 * 1024 * 1024;

    for (let i = 0; i < screenshots.length; i++) {
      const f = screenshots[i];
      if (!allowedTypes.includes(f.type)) {
        return `Invalid file type for "${f.name}". Upload JPG/PNG/PDF only.`;
      }
      if (f.size > maxSizeBytes) {
        return `"${f.name}" is too large. Max size is 5MB.`;
      }
    }

    return "";
  };

  const workshop = workshops.find((w) => w.id === selectedWorkshop);
  const amount = workshop?.price || 0;
  const upiId = "sahithsa020@okaxis";
  const payeeName = workshop?.name || "Workshop Fee";
  const tnPlain = `workshop ${selectedWorkshop} fee`;
  const upiLink = upiId
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(
        String(amount)
      )}&cu=INR&tn=${encodeURIComponent(tnPlain)}`
    : "";

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("workshop_id", String(selectedWorkshop));
      fd.append("workshop_name", workshop?.name || "");
      fd.append("lead_name", person.name.trim());
      fd.append("lead_roll", person.roll.trim());
      fd.append("lead_department", person.department.trim());
      fd.append("lead_year", person.year);
      fd.append("lead_mobile", person.mobile.trim());
      fd.append("lead_email", person.email.trim());
      fd.append("college_name", (person.collegeName || "").trim());
      fd.append("college_type", collegeType);
      if (screenshots[0]) fd.append("payment_screenshots", screenshots[0]);

      const res = await fetch(`https://sixter.xyz/workshop/register/`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const raw = await res.text();
        try {
          const data = JSON.parse(raw);
          throw new Error(data?.error ? String(data.error) : raw);
        } catch {
          throw new Error(raw || `Request failed (${res.status})`);
        }
      }

      setSuccessOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWorkshopClick = (id: number) => {
    setSelectedWorkshop(id);
    setShowForm(true);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const getPrice = (count: number) => {
    if (count === 0) return 0;
    if (count === 1) return 100;
    if (count === 2) return 200;
    if (count === 3) return 300;
    if (count === 4) return 400;
    if (count >= 5 && count <= 7) return 500;
    if (count >= 8) return 800;
    return 0;
  };

  const getPosterSrc = (id: number) => {
    // map ids 4..8 to poster filenames used in the static page
    switch (id) {
      case 4:
        return "/src/assets/workshop-product market fit.png";
      case 5:
        return "/src/assets/workshop-business market fit.png";
      case 6:
        return "/src/assets/workshop-finance.png";
      case 7:
        return "/src/assets/workshop startup,ethical.png";
      case 8:
        return "/src/assets/workshop ipr & ip management.png";
      default:
        return "/src/assets/kec.jfif";
    }
  };

  const proceedToRegister = () => {
    const amount = getPrice(selectedIds.length);
    const upi = encodeURIComponent("sahithsa020@okaxis");
    const title = encodeURIComponent("Workshops");
    const ids = selectedIds.join(',');
    navigate(`/register/custom?amount=${amount}&upi=${upi}&title=${title}&ids=${encodeURIComponent(ids)}`);
  };

  return (
    <div className="relative min-h-screen text-white">
      <AnimatedBackground />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => (showForm ? setShowForm(false) : navigate("/"))}
            className="mb-6 inline-flex items-center gap-3 text-white/90 hover:text-yellow-400"
          >
            <span className="p-2 rounded-full bg-black/20">
              <ArrowLeft size={18} />
            </span>
            <span className="text-lg font-semibold">Back</span>
          </button>

          {!showForm ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-black mb-2">
                  <span className="text-white">Workshop </span>
                  <span style={{ color: "#FFD300" }}>Selections</span>
                </h1>
                <p className="text-white/70">Select the workshops you want — pricing updates automatically</p>
              </div>

              {/* Multi-select grid: Row1 (1-3), Row2 posters (4-8), Row3 (9-11) */}
              <div className="space-y-8">
                <div className="flex justify-center gap-6 flex-wrap">
                  {workshops.slice(0, 3).map((w) => (
                    <div
                      key={w.id}
                      onClick={() => toggleSelect(w.id)}
                      className={`rounded-xl border p-6 w-80 cursor-pointer relative transition ${selectedIds.includes(w.id) ? "border-yellow-400 bg-yellow-400/10" : "border-yellow-600/30 bg-black/40"}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(w.id)}
                        readOnly
                        className="absolute top-4 right-4 w-5 h-5"
                      />
                      <div style={{ color: "#FFD300", fontWeight: 800, fontSize: 18 }}>{w.name} - ₹{w.price}</div>
                      <div className="text-white/70 mt-2 text-sm">{w.day ? `Day ${w.day}` : ""}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-6 flex-wrap">
                  {workshops.slice(3, 8).map((w) => (
                    <div
                      key={w.id}
                      onClick={() => toggleSelect(w.id)}
                      className={`rounded-xl border p-3 w-56 cursor-pointer relative poster-card transition ${selectedIds.includes(w.id) ? "border-yellow-400 bg-yellow-400/10" : "border-yellow-600/30 bg-black/40"}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(w.id)}
                        readOnly
                        className="absolute top-3 right-3 w-5 h-5"
                      />
                      <img src={getPosterSrc(w.id)} alt={w.name} className="w-full h-44 object-cover rounded-md mb-3" />
                      <div style={{ color: "#FFD300", fontWeight: 800 }}>{w.name}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-6 flex-wrap">
                  {workshops.slice(8, 11).map((w) => (
                    <div
                      key={w.id}
                      onClick={() => toggleSelect(w.id)}
                      className={`rounded-xl border p-6 w-80 cursor-pointer relative transition ${selectedIds.includes(w.id) ? "border-yellow-400 bg-yellow-400/10" : "border-yellow-600/30 bg-black/40"}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(w.id)}
                        readOnly
                        className="absolute top-4 right-4 w-5 h-5"
                      />
                      <div style={{ color: "#FFD300", fontWeight: 800, fontSize: 18 }}>{w.name} - ₹{w.price}</div>
                      <div className="text-white/70 mt-2 text-sm">{w.day ? `Day ${w.day}` : ""}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* bottom fixed footer */}
              <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-yellow-600/30 p-4 flex items-center justify-between z-50">
                <div className="text-yellow-300 font-extrabold">Total: ₹{getPrice(selectedIds.length)}</div>
                <div>
                  <button
                    onClick={() => proceedToRegister()}
                    className={`px-6 py-3 rounded-full font-bold ${selectedIds.length === 0 ? "bg-white/10 text-white/40 cursor-not-allowed" : "bg-yellow-400 text-black"}`}
                    disabled={selectedIds.length === 0}
                  >
                    Proceed to Register
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-black mb-4">Workshop Registration</h1>
              <p className="text-white/80 mb-6">
                Selected: <span style={{ color: "#FFD300" }}>{workshop?.name}</span> - ₹{amount}
              </p>

              <div className="rounded-3xl border border-yellow-600/25 bg-white/5 backdrop-blur-xl p-6 md:p-8">
                <form onSubmit={onSubmit} className="grid gap-6">
                  {error && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-200">{error}</div>
                  )}

                  <div>
                    <label className="text-sm text-white/70 font-semibold">Participation Type *</label>
                    <div className="mt-3 flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCollegeType("intra")}
                        className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition ${
                          collegeType === "intra"
                            ? "bg-yellow-400 text-black border border-yellow-400"
                            : "bg-black/40 border border-yellow-600/20 text-white hover:border-yellow-500/60"
                        }`}
                      >
                        Intra-College (KEC)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCollegeType("inter")}
                        className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition ${
                          collegeType === "inter"
                            ? "bg-yellow-400 text-black border border-yellow-400"
                            : "bg-black/40 border border-yellow-600/20 text-white hover:border-yellow-500/60"
                        }`}
                      >
                        Inter-College
                      </button>
                    </div>
                  </div>

                  {collegeType && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-white/70">Name *</label>
                          <input
                            value={person.name}
                            onChange={(e) => handlePersonChange("name", e.target.value)}
                            placeholder="Full name"
                            className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white/70">Roll Number *</label>
                          <input
                            value={person.roll}
                            onChange={(e) => handlePersonChange("roll", e.target.value)}
                            placeholder="Roll number"
                            className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {collegeType === "intra" ? (
                          <div>
                            <label className="text-sm text-white/70">Department *</label>
                            <select
                              value={person.department}
                              onChange={(e) => handlePersonChange("department", e.target.value)}
                              className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                            >
                              <option value="">Select department</option>
                              {departments.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <>
                            <div>
                              <label className="text-sm text-white/70">College Name *</label>
                              <input
                                value={person.collegeName || ""}
                                onChange={(e) => handlePersonChange("collegeName", e.target.value)}
                                placeholder="Your college name"
                                className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                              />
                            </div>
                            <div>
                              <label className="text-sm text-white/70">Department *</label>
                              <input
                                value={person.department}
                                onChange={(e) => handlePersonChange("department", e.target.value)}
                                placeholder="Your department"
                                className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <label className="text-sm text-white/70">Year of study *</label>
                          <select
                            value={person.year}
                            onChange={(e) => handlePersonChange("year", e.target.value)}
                            className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-white/70">Mobile Number *</label>
                          <input
                            value={person.mobile}
                            onChange={(e) => handlePersonChange("mobile", e.target.value)}
                            placeholder="Mobile number"
                            className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-white/70">
                            Email ID {collegeType === "intra" ? "(must be @kongu.edu)" : "(any email)"} *
                          </label>
                          <input
                            value={person.email}
                            onChange={(e) => handlePersonChange("email", e.target.value)}
                            placeholder={collegeType === "intra" ? "your@kongu.edu" : "your@email.com"}
                            className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-white/80 mb-1">Payment QR</label>
                        <p className="text-white/70 mb-2">
                          Scan to pay <span className="text-yellow-300 font-bold">₹{amount}</span>
                        </p>

                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-white p-3 rounded-2xl">
                            <QRCodeCanvas value={upiLink} size={220} includeMargin />
                          </div>

                          <a
                            href={upiLink}
                            className="rounded-full px-5 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-500"
                          >
                            Pay using UPI App
                          </a>
                        </div>

                        <div className="mt-5">
                          <label className="block text-sm text-white/80 mb-2">Upload payment screenshot *</label>
                          <div className="mt-2 border-2 border-dashed border-yellow-600/20 rounded-2xl p-4 bg-black/25 flex items-center justify-between gap-4">
                            <div className="flex-1 text-sm text-white/70">
                              {screenshots.length > 0 ? (
                                <div className="space-y-1">
                                  {screenshots.map((s, idx) => (
                                    <div key={idx} className="truncate">
                                      {s.name}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-white/60">No files selected</div>
                              )}
                            </div>

                            <label className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full cursor-pointer">
                              <input
                                type="file"
                                accept="image/*,application/pdf"
                                multiple
                                onChange={(e) => handleScreenshots(e.target.files)}
                                className="hidden"
                                required
                              />
                              Choose files
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={submitting}
                          className={`px-6 py-3 rounded-full font-bold ${
                            submitting ? "bg-white/20 text-white/60 cursor-not-allowed" : "bg-yellow-400 text-black"
                          }`}
                        >
                          {submitting ? "Submitting..." : "Submit Registration"}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {successOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-yellow-600/25 bg-black/90 p-6 shadow-xl">
            <div className="text-xl font-extrabold text-yellow-400">Success ✅</div>
            <div className="mt-2 text-white/80">Registered successfully!</div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-full px-5 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-500"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
