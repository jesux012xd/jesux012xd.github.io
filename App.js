import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';
import AddGameForm from './components/AddGameForm';
import { defaultGames } from './mock/games';
import { defaultCategories } from './mock/categories';
import * as LucideIcons from 'lucide-react';
import { Search, Plus } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'gameVaultGames';

const App = () => {
  // Inicializa los juegos desde localStorage o con los juegos por defecto
  const [games, setGames] = useState(() => {
    try {
      const storedGames = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedGames ? JSON.parse(storedGames) : defaultGames;
    } catch (error) {
      console.error("Error al leer de localStorage:", error);
      return defaultGames;
    }
  });

  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Guarda los juegos en localStorage cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
    } catch (error) {
      console.error("Error al escribir en localStorage:", error);
    }
  }, [games]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddGame = (newGameData) => {
    const newGame = {
      ...newGameData,
      id: String(Date.now()), // Genera un ID único basado en la marca de tiempo
      images: newGameData.images.filter(img => img.trim() !== '') // Filtra imágenes vacías
    };
    setGames(prevGames => [...prevGames, newGame]);
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || (game.category && game.category.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 font-sans text-gray-100">
      <motion.header
        className="text-center mb-12 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            GameVault
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Tu santuario digital para los mejores juegos, con un diseño tan elegante que querrás vivir aquí.
        </p>
        <div className="relative mt-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Busca tu próxima obsesión..."
            className="w-full px-5 py-3 pl-12 rounded-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </motion.header>

      {/* Categorías y botón de añadir juego */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {defaultCategories.map((category) => {
          const IconComponent = LucideIcons[category.icon];
          return (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center px-5 py-2 rounded-full font-medium text-lg transition-all duration-300
                          ${selectedCategory === category.id
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                          }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
              {category.name}
            </motion.button>
          );
        })}
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-5 py-2 rounded-full font-medium text-lg bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5 mr-2" /> Añadir Juego
        </motion.button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onClick={handleGameClick} />
          ))
        ) : (
          <motion.p
            className="col-span-full text-center text-gray-400 text-2xl mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ¡Ups! Parece que ese juego se ha escondido en otra dimensión. Intenta con otro nombre, genio.
          </motion.p>
        )}
      </motion.div>

      <GameModal game={selectedGame} onClose={handleCloseModal} />
      {showAddForm && <AddGameForm onAddGame={handleAddGame} onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default App;