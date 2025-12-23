import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div className="max-w-7xl mx-auto my-8 text-center">
    <h1 className="font-bold text-6xl">Hello, world!</h1>
    <span className="text-sm font-medium text-slate-500 uppercase">Welcome to React Router!</span>
  </div>;
}
