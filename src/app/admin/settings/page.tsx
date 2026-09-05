"use client";

import { useEffect, useState } from "react";

interface Settings {
  phone: string;
  phoneSecondary: string | null;
  whatsappNumber: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  announcementText: string;
  announcementHref: string;
  announcementActive: boolean;
  youtubeSubscribers: string;
  happyCustomersStat: string;
}

const fields: { name: keyof Settings; label: string; type: "text" | "checkbox" }[] = [
  { name: "phone", label: "Primary Phone", type: "text" },
  { name: "phoneSecondary", label: "Secondary Phone", type: "text" },
  { name: "whatsappNumber", label: "WhatsApp Number (no + or spaces)", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "facebookUrl", label: "Facebook URL", type: "text" },
  { name: "instagramUrl", label: "Instagram URL", type: "text" },
  { name: "youtubeUrl", label: "YouTube URL", type: "text" },
  { name: "youtubeSubscribers", label: "YouTube Subscriber Count Label", type: "text" },
  { name: "happyCustomersStat", label: "Happy Customers Stat (homepage hero)", type: "text" },
  { name: "announcementText", label: "Announcement Bar Text", type: "text" },
  { name: "announcementHref", label: "Announcement Bar Link", type: "text" },
  { name: "announcementActive", label: "Announcement Bar Active", type: "checkbox" },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setValues);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage("Saved successfully.");
    } catch {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (!values) return <p className="text-sm text-[#6b625b]">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1d1a19]">Site Settings</h1>
      <p className="mt-1 text-sm text-[#6b625b]">Contact info, social links and announcement bar.</p>

      <form onSubmit={onSubmit} className="mt-6 max-w-xl space-y-5 rounded-lg border border-[#e5ddd2] bg-white p-6">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            {field.type === "checkbox" ? (
              <label className="flex items-center gap-2 text-sm font-semibold text-[#1d1a19]">
                <input
                  type="checkbox"
                  checked={Boolean(values[field.name])}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.checked })}
                />
                {field.label}
              </label>
            ) : (
              <>
                <label className="text-sm font-semibold text-[#1d1a19]">{field.label}</label>
                <input
                  type="text"
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  className="rounded-md border border-[#e5ddd2] px-3 py-2 text-sm focus:border-[#9e1b26] focus:outline-none"
                />
              </>
            )}
          </div>
        ))}

        {message && <p className="text-sm font-medium text-[#1d1a19]">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-[#9e1b26] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7a141c] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
