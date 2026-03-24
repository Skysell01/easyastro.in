import Image from "next/image";

export default function Header() {
  return (
    <header className="py-1 px-4 sm:px-6 lg:px-8 bg-transparent z-10">
      <div className="container mx-auto flex items-center justify-center">
        <Image
          src="/images/WhatsApp_Image_2026-03-19_at_3.40.37_PM-removebg-preview.png"
          alt="Easy Astro Logo"
          width={200}
          height={50}
          className="w-36 h-auto sm:w-52"
          priority
        />
      </div>
    </header>
  );
}
