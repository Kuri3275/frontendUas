<<<<<<< HEAD:src/components/Card.jsx
=======
import "../../style/layout.css";

>>>>>>> cf86cd2d776024070b378b4d77dea026e74ac96e:src/components/public/Card.jsx
export default function Card({ title, desc }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-2 transition">

      <div className="h-44 bg-gray-800 rounded-xl flex items-center justify-center mb-6 text-gray-500 text-lg">
        Thumbnail
      </div>

      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-gray-400 mb-8 leading-relaxed">
        {desc}
      </p>

      <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-lg">
        Pelajari
      </button>
    </div>
  );
}
