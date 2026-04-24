"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Area,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { annee: "2020–21", CEPE: 94, admis: 42, presents: 45 },
  { annee: "2021–22", CEPE: 96, admis: 47, presents: 49 },
  { annee: "2022–23", CEPE: 97, admis: 50, presents: 52 },
  { annee: "2023–24", CEPE: 100, admis: 54, presents: 54 },
  { annee: "2024–25", CEPE: 100, admis: 58, presents: 58 },
];

/* ─── Custom Tooltip ─────────────────────────────────────────────────── */
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-xl px-5 py-4 text-sm">
      <p className="font-display font-bold text-gray-800 mb-3">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-gray-500 font-medium">{p.name} :</span>
          <span className="font-bold text-gray-800">
            {p.value}
            {p.name.includes("Taux") ? "%" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Mini stat card ─────────────────────────────────────────────────── */
function MiniStat({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-md shadow-black/4 text-center">
      <p className="text-3xl font-display font-extrabold" style={{ color }}>
        {value}
      </p>
      <p className="text-sm font-bold text-gray-700 mt-1">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────── */
export default function ExamStatsChart() {
  return (
    <div className="space-y-8">
      {/* Mini stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MiniStat label="Taux CEPE 2025" value="100%" sub="5 ans consécutifs" color="#16a34a" />
        <MiniStat label="Admis 2025" value="58" sub="sur 58 présentés" color="#6B1645" />
        <MiniStat label="Mention TB" value="34" sub="élèves primés" color="#1d4ed8" />
      </div>

      {/* Bar chart – taux de réussite */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 md:p-8"
      >
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5821F]">
            Graphique 1
          </span>
          <h3 className="font-display font-extrabold text-xl text-gray-900 mt-1">
            Taux de réussite CEPE — 5 dernières années
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Pourcentage d&apos;élèves admis sur le total des présentés
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap="30%" barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="annee"
              tick={{ fontSize: 12, fontWeight: 600, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[75, 100]}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={42}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9f5ff", radius: 8 }} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 16, fontWeight: 600 }}
            />
            <ReferenceLine y={100} stroke="#16a34a" strokeDasharray="4 4" strokeWidth={1.5} />
            <Bar dataKey="CEPE" name="Taux CEPE (%)" fill="#6B1645" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Composed chart – candidats vs admis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 md:p-8"
      >
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B1645]">
            Graphique 2
          </span>
          <h3 className="font-display font-extrabold text-xl text-gray-900 mt-1">
            Évolution du nombre de candidats &amp; d&apos;admis
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Croissance régulière des effectifs présentés aux examens
          </p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="annee"
              tick={{ fontSize: 12, fontWeight: 600, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[35, 65]}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fff8f0", radius: 8 }} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 16, fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="presents"
              name="Candidats présentés"
              fill="#F5821F22"
              stroke="#F5821F"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="admis"
              name="Élèves admis"
              stroke="#6B1645"
              strokeWidth={3}
              dot={{ fill: "#6B1645", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
