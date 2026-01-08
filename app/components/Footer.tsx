import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 text-sm">
        {/* Logo lab */}
        <div className="flex items-center gap-2">
          <Image src="/LogoHitam.png" alt="Logo" width={100} height={100} />
        </div>

        <p className="text-gray-800">© 2025 clients. All Rights Reserved.</p>

        {/* Logo ITB */}
        <Image
          src="/logo-itb.png"
          alt="Logo ITB"
          width={100}
          height={100}
        />
      </div>
    </footer>
  );
}
