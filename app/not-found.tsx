import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-col space-y-2">
      <h2>Sayfa Bulunamadı</h2>
      <p>Aradığnız sayfa şuanda bulunamadı </p>
      <Link className="bg-white/20 rounded-md p-2" href="/">
        Ana Sayfaya dön
      </Link>
    </div>
  );
}
