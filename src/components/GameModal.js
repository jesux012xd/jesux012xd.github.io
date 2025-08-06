import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link, HardDrive, Info, Image as ImageIcon, Download, Youtube } from 'lucide-react';

const GameModal = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8 border border-gray-700"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            layoutId={`game-card-${game.id}`}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-4xl font-bold text-white mb-6 border-b pb-4 border-gray-700">{game.title}</h2>

            <div className="space-y-8">
              {/* Imágenes */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-blue-500" /> Galería
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {game.images.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`${game.title} - ${index + 1}`}
                      className="w-full h-52 object-cover rounded-lg shadow-md border border-gray-700"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 }}
                    />
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-3">
                  <Link className="w-6 h-6 text-green-500" /> Enlaces Útiles
                </h3>
                <div className="flex flex-wrap gap-4">
                  {game.links.descarga && (
                    <motion.a
                      href={game.links.descarga}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors font-medium text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-5 h-5 mr-3" /> Descargar Juego
                    </motion.a>
                  )}
                  {game.links.trailer && (
                    <motion.a
                      href={game.links.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-red-700 text-white rounded-lg shadow-md hover:bg-red-800 transition-colors font-medium text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Youtube className="w-5 h-5 mr-3" /> Ver Trailer
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Requisitos */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-3">
                  <HardDrive className="w-6 h-6 text-purple-500" /> Requisitos del Sistema
                </h3>
                <ul className="list-disc list-inside text-gray-300 text-lg space-y-2 pl-5">
                  {Object.entries(game.requirements).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-medium capitalize text-white">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Información */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-3">
                  <Info className="w-6 h-6 text-orange-500" /> Sobre el Juego
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">{game.info}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;
