import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export const ColorChangeCards = ({ cards, onCardClick, lang }) => {
  return (
    <div className="py-8">
      <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            heading={card.heading}
            description={card.description}
            imgSrc={card.imgSrc}
            onClick={() => onCardClick(card.id)}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ heading, description, imgSrc, onClick, lang }) => {
  const isArabic = lang === "ar";
  
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      onClick={onClick}
      className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all hover:shadow-lg"
    >
      <div
        className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent transition-opacity duration-500 md:opacity-80 group-hover:opacity-100" />
      
      <div className="relative z-20 flex h-full flex-col justify-between p-6 text-white/90 transition-colors duration-500 group-hover:text-white">
        <ArrowRight 
          className="ms-auto h-8 w-8 transition-transform duration-500 rtl:-scale-x-100 group-hover:-rotate-45" 
        />
        <div>
          <h4 className="mb-2">
            <AnimatedWord word={heading} />
          </h4>
          <p className="text-sm font-medium leading-relaxed opacity-90 group-hover:opacity-100">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const letterVariants = {
  hover: {
    y: "-50%",
  },
};

const AnimatedLetter = ({ letter }) => {
  return (
    <div className="inline-block h-[28px] overflow-hidden font-bold">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{letter === " " ? "\u00A0" : letter}</span>
        <span>{letter === " " ? "\u00A0" : letter}</span>
      </motion.span>
    </div>
  );
};

const AnimatedWord = ({ word }) => {
  return (
    <div className="inline-block h-6 md:h-7 overflow-hidden font-bold text-base md:text-lg lg:text-xl lg:h-8 whitespace-nowrap">
      <motion.span
        className="flex flex-col"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{word}</span>
        <span>{word}</span>
      </motion.span>
    </div>
  );
};
