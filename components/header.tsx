import Link from "next/link";
import HeaderAuth from "./header-auth";

export default function Header() {
  return (
    <nav className="fixed w-full h-20 flex justify-between items-center px-6 z-50 border-b border-gray-900 bg-background">
      <Link href="/">
        <div className="text-lg font-bold">Stonks</div>
      </Link>
      <HeaderAuth />
    </nav>
  );
}
