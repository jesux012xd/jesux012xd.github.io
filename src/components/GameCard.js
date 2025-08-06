import React from 'react';
import { motion } from 'framer-motion';

const GameCard = ({ game, onClick }) => {
  return (
    <motion.div
      className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden cursor-pointer
                 hover:shadow-xl hover:border-blue-600 transition-all duration-300 ease-in-out
                 flex flex-col items-center text-center p-3 transform hover:-translate-y-1"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(game)}
      layoutId={`game-card-${game.id}`}
    >
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full h-40 object-cover rounded-md mb-3 border border-gray-600"
      />
      <h3 className="text-md font-semibold text-white truncate w-full px-1">{game.title}</h3>
    </motion.div>
  );
};

export default GameCard;