import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Maturity Survey" },
    { name: "description", content: "IRM Maturity Survey Application" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Welcome />
      <div className="mt-8">
        <Link
          to="/irm"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Go to IRM Proof of Concept
        </Link>
      </div>
    </div>
  );
}
