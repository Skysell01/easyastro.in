"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import  Link  from "next/link";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-[#F8D7E1] backdrop-blur-sm border-b border-border"
    >
      <div className="container-narrow py-4 flex items-center justify-center">
        <Link href="/">
          {/* <img src={logo} alt="Soulmap Creations Logo" className="h-8 md:h-10 w-auto object-contain" /> */}
           <Image src='/hindi-2/logo_2.png' alt="Soulmap Creations" width={200} 
            height={50}  className="h-12 md:h-16" />
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
