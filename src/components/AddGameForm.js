import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, X } from 'lucide-react';
import { defaultCategories } from '../mock/categories';

const AddGameForm = ({ onAddGame, onClose }) => {
  const [gameData, setGameData] = useState({
    title: '',
    thumbnail: '',
    images: ['', '', ''], // Permitir hasta 3 imágenes
    links: { descarga: '', trailer: '' },
    requirements: { os: '', processor: '', memory: '', graphics: '', storage: '' },
    info: '',
    category: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('links.')) {
      const linkKey = name.split('.')[1];
      setGameData(prev => ({ ...prev, links: { ...prev.links, [linkKey]: value } }));
    } else if (name.startsWith('requirements.')) {
      const reqKey = name.split('.')[1];
      setGameData(prev => ({ ...prev, requirements: { ...prev.requirements, [reqKey]: value } }));
    } else {
      setGameData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...gameData.images];
    newImages[index] = value;
    setGameData(prev => ({ ...prev, images: newImages }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setGameData(prev => {
      const newCategories = checked
        ? [...prev.category, value]
        : prev.category.filter(cat => cat !== value);
      return { ...prev, category: newCategories };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Limpiar URLs de imágenes vacías antes de enviar
    const cleanedGameData = {
      ...gameData,
      images: gameData.images.filter(img => img.trim() !== '')
    };
    onAddGame(cleanedGameData);
    onClose(); // Cierra el formulario después de añadir
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-8 border border-gray-700"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-white mb-6 border-b pb-4 border-gray-700 flex items-center">
          <PlusCircle className="w-7 h-7 mr-3 text-green-500" /> Añadir Nuevo Juego
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-300">
          {/* Basic Info */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium mb-2">Título del Juego</label>
            <input
              type="text"
              id="title"
              name="title"
              value={gameData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="thumbnail" className="block text-lg font-medium mb-2">URL de la Carátula (Thumbnail)</label>
            <input
              type="url"
              id="thumbnail"
              name="thumbnail"
              value={gameData.thumbnail}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-lg font-medium mb-2">URLs de Imágenes (Máx. 3)</label>
            {gameData.images.map((img, index) => (
              <input
                key={index}
                type="url"
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                placeholder={`Imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Links */}
          <div>
            <label className="block text-lg font-medium mb-2">Enlaces</label>
            <input
              type="url"
              name="links.descarga"
              value={gameData.links.descarga}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="URL de Descarga"
            />
            <input
              type="url"
              name="links.trailer"
              value={gameData.links.trailer}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="URL del Trailer"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-lg font-medium mb-2">Requisitos del Sistema</label>
            {Object.keys(gameData.requirements).map(key => (
              <input
                key={key}
                type="text"
                name={`requirements.${key}`}
                value={gameData.requirements[key]}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              />
            ))}
          </div>

          {/* Info */}
          <div>
            <label htmlFor="info" className="block text-lg font-medium mb-2">Información del Juego</label>
            <textarea
              id="info"
              name="info"
              value={gameData.info}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-lg font-medium mb-2">Categorías</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {defaultCategories.filter(cat => cat.id !== 'all').map(category => (
                <label key={category.id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={category.id}
                    checked={gameData.category.includes(category.id)}
                    onChange={handleCategoryChange}
                    className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-300">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusCircle className="w-6 h-6 mr-2" /> Añadir Juego
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddGameForm;