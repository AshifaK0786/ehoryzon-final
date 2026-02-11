import React, { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Upload, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
}

const TRL_OPTIONS = [3, 4, 5, 6, 7, 8, 9];

const THEME_OPTIONS = [
  { value: "Mobility & Industry 4.0", label: "Mobility & Industry 4.0" },
  {
    value: "Clean and green Tech (sustainability)",
    label: "Clean and green Tech (sustainability)",
  },
  { value: "AI and Deeptech", label: "AI and Deeptech" },
  { value: "Agritech and healthcare", label: "Agritech and healthcare" },
  { value: "Open innovation", label: "Open innovation" },
];

// ✅ NEW: Mode options
const MODE_OPTIONS = [
  { value: "Offline", label: "Offline" },
  { value: "Online", label: "Online" },
];

const emptyMember = (): TeamMember => ({
  name: "",
  email: "",
  phone: "",
  college: "",
  year: "",
});

export default function PitchRegister() {
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState("");
  const [trl, setTrl] = useState(3);
  const [theme, setTheme] = useState(THEME_OPTIONS[0].value);

  // ✅ NEW: Mode dropdown state
  const [mode, setMode] = useState<string>(MODE_OPTIONS[0].value);

  // ✅ OPTIONAL pitch PDF
  const [abstractFile, setAbstractFile] = useState<File | null>(null);

  // ✅ min 2
  const [members, setMembers] = useState<TeamMember[]>([
    emptyMember(),
    emptyMember(),
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canAdd = members.length < 4;
  const canRemove = members.length > 2;

  // ✅ success popup (stay)
  const [successOpen, setSuccessOpen] = useState(false);
  const [successTeamId, setSuccessTeamId] = useState("");
  const [successTeamName, setSuccessTeamName] = useState("");

  const pitchDescriptionLines = useMemo(
    () => [
      "Teams register online and pay the registration fee.",
      "Pitch PDF can be uploaded later using Team ID.",
      "This is a single offline round conducted on the scheduled theme day.",
      "Teams must report at the venue and present their idea directly to the jury panel.",
      "Evaluation and results will be based on the live presentation.",
    ],
    []
  );

  const coordinatorLeftName = "SaiSanjay M K";
  const coordinatorLeftPhone = "+91 9080938997";
  const coordinatorRightName = "Pragatheeswari";
  const coordinatorRightPhone = "+91 6374040356";

  const abstractLabel = useMemo(() => {
    if (!abstractFile) return "Upload Pitch PDF (Optional)";
    return abstractFile.name;
  }, [abstractFile]);

  // ✅ payment screenshots REQUIRED
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const handleScreenshots = (fl?: FileList | null) => {
    if (!fl) return;
    setScreenshots(Array.from(fl));
  };

  // PPT template (public folder)
  const PITCH_TEMPLATE_URL = "/pitch_ppt.pptx";

  // ✅ Payment config
  const PITCH_FEE_PER_TEAM = 800; // (your UI says ₹800 per Team)
  const PITCH_UPI_ID = "pragatheeswariselvaraj@okaxis";
  const payeeName = "E-Horizon Pitch";

  const teamSize = members.length;
  const amount = PITCH_FEE_PER_TEAM;

  const tnPlain = `Pitch fee team size ${teamSize}`;
  const upiLink = PITCH_UPI_ID
    ? `upi://pay?pa=${encodeURIComponent(PITCH_UPI_ID)}&pn=${encodeURIComponent(
        payeeName
      )}&am=${encodeURIComponent(String(amount))}&cu=INR&tn=${encodeURIComponent(
        tnPlain
      )}`
    : "";

  const updateMember = (idx: number, key: keyof TeamMember, value: string) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [key]: value };
      return copy;
    });
  };

  const addMember = () => {
    if (!canAdd) return;
    setMembers((prev) => [...prev, emptyMember()]);
  };

  const removeMember = (idx: number) => {
    if (!canRemove) return;
    setMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    if (!teamName.trim()) return "Team name is required.";

    // ✅ NEW: mode required
    if (!mode.trim()) return "Mode of presentation is required.";

    // abstract OPTIONAL now
    if (abstractFile) {
      const isPdf =
        abstractFile.type === "application/pdf" ||
        abstractFile.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) return "Pitch file must be a PDF.";
    }

    if (members.length < 2 || members.length > 4)
      return "Team must have 2 to 4 members.";

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      if (!m.name.trim()) return `Member ${i + 1}: Name is required.`;
      if (!m.email.trim()) return `Member ${i + 1}: Email is required.`;
      if (!m.phone.trim()) return `Member ${i + 1}: Phone is required.`;
      if (!m.college.trim())
        return `Member ${i + 1}: College name is required.`;
      if (!m.year.trim())
        return `Member ${i + 1}: Year of studying is required.`;
    }

    // payment screenshot required
    if (!screenshots || screenshots.length === 0) {
      return "Payment screenshot is required.";
    }

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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("team_name", teamName);
      formData.append("trl_level", String(trl));
      formData.append("theme", theme);

      // ✅ NEW: send mode to backend
      formData.append("mode", mode);

      formData.append("members", JSON.stringify(members));

      // append only if uploaded
      if (abstractFile) {
        formData.append("abstract_pdf", abstractFile);
      }

      // payment screenshot(s)
      screenshots.forEach((f) => formData.append("payment_screenshots", f));

      const res = await fetch("https://sixter.xyz/pitch/register/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        let errorMessage = "Failed to submit registration.";

        if (contentType && contentType.includes("application/json")) {
          const payload = await res.json();
          errorMessage = JSON.stringify(payload);
        } else {
          errorMessage = await res.text();
        }

        throw new Error(errorMessage);
      }

      const payload = await res.json();

      // Show popup and stay
      setSuccessTeamId(payload?.team_id || "");
      setSuccessTeamName(payload?.team_name || teamName);
      setSuccessOpen(true);

      // reset form
      setTeamName("");
      setTrl(3);
      setTheme(THEME_OPTIONS[0].value);
      setMode(MODE_OPTIONS[0].value);
      setAbstractFile(null);
      setMembers([emptyMember(), emptyMember()]);
      setScreenshots([]);
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-xl border-b border-yellow-600/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/80 hover:text-yellow-300 transition"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="text-yellow-400 font-extrabold tracking-wide">
            Pitch Registration
          </div>

          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="rounded-3xl border border-yellow-600/25 bg-white/5 backdrop-blur-xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-black text-yellow-400">
            Register for Pitch Competition
          </h1>

          {/* Description */}
          <div className="mt-4">
            <div className="text-white/80 space-y-1">
              {pitchDescriptionLines.map((ln, i) => (
                <p key={i} className="leading-6">
                  {ln}
                </p>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <a
                href={`tel:${coordinatorLeftPhone}`}
                className="flex-1 max-w-[47%] inline-flex flex-col items-center justify-center gap-1 rounded-full px-5 py-2 bg-white/10 backdrop-blur-md text-white/85 hover:bg-yellow-400 hover:text-black transition"
              >
                <div className="text-sm font-medium text-white">
                  {coordinatorLeftName}
                </div>
                <div className="text-sm font-medium text-white">
                  {coordinatorLeftPhone}
                </div>
              </a>

              <a
                href={`tel:${coordinatorRightPhone}`}
                className="flex-1 max-w-[47%] inline-flex flex-col items-center justify-center gap-1 rounded-full px-5 py-2 bg-white/10 backdrop-blur-md text-white/85 hover:bg-yellow-400 hover:text-black transition"
              >
                <div className="text-sm font-medium text-white">
                  {coordinatorRightName}
                </div>
                <div className="text-sm font-medium text-white">
                  {coordinatorRightPhone}
                </div>
              </a>
            </div>
          </div>

          <p className="mt-4 text-white/70">
            Team size:{" "}
            <span className="text-white/90 font-semibold">2–4 members</span>. Payment is{" "}
            <span className="text-yellow-300 font-bold">₹800 per Team</span>.
          </p>

          {/* Template download */}
          <div className="mt-5 rounded-2xl border border-yellow-600/20 bg-black/20 p-4">
            <div className="text-white font-extrabold">Pitch Template</div>
            <p className="mt-1 text-sm text-white/70">
              Download the PPT template, fill it, export as PDF, then upload later using Team ID.
            </p>

            <a
              href={PITCH_TEMPLATE_URL}
              download="Pitch_Template.pptx"
              className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
            >
              <Download size={18} />
              Download PPT Template
            </a>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-10">
            {/* Team */}
            <section className="space-y-5">
              <h2 className="text-xl font-extrabold text-white">Team & Project</h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-white/70">Team Name</label>
                  <input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                    placeholder="Enter team name"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/70">TRL Level</label>
                  <select
                    value={trl}
                    onChange={(e) => setTrl(Number(e.target.value))}
                    className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                  >
                    {TRL_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        TRL {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white/70">Project Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                  >
                    {THEME_OPTIONS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ NEW: Mode dropdown */}
                <div>
                  <label className="text-sm text-white/70">Mode of Presentation</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                  >
                    {MODE_OPTIONS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>

                  <div className="mt-2 text-xs text-white/55">
                    Select how your team will present (Online/Offline).
                  </div>
                </div>

                {/* OPTIONAL Pitch PDF UI (glow + link) */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/70">Pitch PDF</label>

                    <span className="text-[11px] px-2 py-1 rounded-full bg-yellow-400 text-black font-extrabold">
                      OPTIONAL
                    </span>
                  </div>

                  <label className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 cursor-pointer hover:border-yellow-500/60 transition">
                    <div className="flex items-center gap-3 text-white/85">
                      <Upload size={18} className="text-yellow-400" />
                      <span className="truncate">{abstractLabel}</span>
                    </div>
                    <span className="text-xs text-white/50">PDF</span>

                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => setAbstractFile(e.target.files?.[0] || null)}
                    />
                  </label>

                  <div className="mt-2 rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-3 shadow-[0_0_22px_rgba(251,191,36,0.15)]">
                    <p className="text-xs text-white/75 leading-5">
                      You can upload your Pitch PDF later using your{" "}
                      <span className="text-yellow-300 font-bold">Team ID</span>. Please upload
                      before <span className="text-yellow-300 font-bold">Feb 19</span>.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/pitch/upload")}
                      className="mt-3 w-full rounded-full px-4 py-2 bg-white/10 text-white/90 font-bold hover:bg-white/15 transition"
                    >
                      Go to Pitch Upload Page →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Members */}
            <section className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-extrabold text-white">Team Members</h2>

                <button
                  type="button"
                  onClick={addMember}
                  disabled={!canAdd}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold transition
                    ${
                      canAdd
                        ? "bg-yellow-400 text-black hover:shadow-[0_0_18px_rgba(251,191,36,0.25)]"
                        : "bg-white/10 text-white/40 cursor-not-allowed"
                    }
                  `}
                >
                  <Plus size={18} /> Add Member
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {members.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-yellow-600/20 bg-black/30 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-white font-extrabold">Member {idx + 1}</div>

                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        disabled={!canRemove}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition
                          ${
                            canRemove
                              ? "bg-white/10 text-white/80 hover:bg-white/15"
                              : "bg-white/5 text-white/30 cursor-not-allowed"
                          }
                        `}
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>

                    <div className="mt-4 space-y-4">
                      <input
                        value={m.name}
                        onChange={(e) => updateMember(idx, "name", e.target.value)}
                        className="w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                        placeholder="Name"
                      />
                      <input
                        value={m.email}
                        onChange={(e) => updateMember(idx, "email", e.target.value)}
                        className="w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                        placeholder="Email"
                      />
                      <input
                        value={m.phone}
                        onChange={(e) => updateMember(idx, "phone", e.target.value)}
                        className="w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                        placeholder="Phone"
                      />
                      <input
                        value={m.college}
                        onChange={(e) => updateMember(idx, "college", e.target.value)}
                        className="w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                        placeholder="College Name"
                      />
                      <input
                        value={m.year}
                        onChange={(e) => updateMember(idx, "year", e.target.value)}
                        className="w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60"
                        placeholder="Year (e.g., 2nd year)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Payment */}
            <div className="rounded-2xl border border-yellow-600/20 bg-black/20 p-4">
              <div className="text-white font-extrabold">Payment</div>
              <p className="mt-1 text-sm text-white/70">
                Pay <span className="text-yellow-300 font-bold">₹{amount}</span> (₹800 per Team).
              </p>

              {!PITCH_UPI_ID ? (
                <div className="mt-3 rounded-2xl border border-yellow-600/20 bg-black/30 p-4 text-white/70">
                  UPI ID not configured.
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center gap-3">
                  <div className="bg-white p-3 rounded-2xl">
                    <QRCodeCanvas value={upiLink} size={220} includeMargin />
                  </div>

                  <a
                    href={upiLink}
                    className="rounded-full px-5 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-500"
                  >
                    Pay using UPI App
                  </a>

                  <div className="text-xs text-white/50 text-center">
                    If Google Pay fails, try PhonePe / Paytm / BHIM.
                  </div>
                </div>
              )}

              {/* Upload screenshots */}
              <div className="mt-5">
                <label className="block text-sm text-white/80 mb-2">
                  Upload payment screenshot(s) *
                </label>

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

            <div className="mb-6 flex justify-center">
              <a
                href={"https://chat.whatsapp.com/Ly2ZItKDCDN8vGnF5RdbNJ"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-sm transition-transform hover:scale-105"
              >
                Join WhatsApp Group
              </a>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 rounded-full px-6 py-4 font-black transition
                  ${
                    submitting
                      ? "bg-white/10 text-white/40 cursor-not-allowed"
                      : "bg-yellow-400 text-black hover:shadow-[0_0_26px_rgba(251,191,36,0.25)]"
                  }
                `}
              >
                {submitting ? "Submitting..." : "Submit Pitch Registration"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 rounded-full px-6 py-4 font-bold border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SUCCESS POPUP (STAYS) */}
      {successOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-yellow-600/25 bg-black/90 p-6 shadow-xl">
            <div className="text-xl font-extrabold text-yellow-400">
              Registration Successful ✅
            </div>

            <div className="mt-4 text-white/85 space-y-2">
              <div>
                <span className="text-white/60">Team Name:</span>{" "}
                <span className="font-bold">{successTeamName}</span>
              </div>
              <div>
                <span className="text-white/60">Team ID:</span>{" "}
                <span className="font-black text-yellow-300">{successTeamId}</span>
              </div>

              <div className="mt-2 text-sm text-white/60">
                Save this Team ID. You will use it to upload Pitch PDF later.
                 
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setSuccessOpen(false)}
                className="rounded-full px-5 py-2 bg-yellow-400 text-black font-bold hover:bg-yellow-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}