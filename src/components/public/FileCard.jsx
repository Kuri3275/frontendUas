import React from "react";
import Card from "./Card";
import { Code, Cpu, Shield, Rocket } from "lucide-react";

export default function FileCard() {
  const services = [
    { title: "Frontend", desc: "Modern UI/UX", icon: Code },
    { title: "Backend", desc: "Power Systems", icon: Cpu },
    { title: "Database", desc: "Data Security", icon: Shield },
    { title: "Deploy", desc: "Cloud Launch", icon: Rocket },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="
            relative rounded-3xl bg-gradient-to-b from-white/10 to-transparent
            border border-white/10 backdrop-blur-xl
            hover:border-blue-500/50 transition-all shadow-2xl
          "
        >
          <Card title={service.title} desc={service.desc} icon={service.icon} />
        </div>
      ))}
    </div>
  );
}
