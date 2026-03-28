import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Info, Trophy, User, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

// Mangala (Mankala) oyun kuralları:
// - 2 oyuncu, her biri 6 kuyu ve 1 hazine
// - Her kuyuda başlangıçta 4 taş
// - Sırayla bir kuyudaki tüm taşları alıp saat yönünde dağıt
// - Son taş hazinede biterse tekrar oyna
// - Son taş boş kuyuya gelirse karşıdaki kuyudaki taşları al
// - Tüm taşlar bitince en çok taş toplayan kazanır

interface GameState {
  pits: number[]; // 12 kuyu (0-5: Oyuncu 1, 6-11: Oyuncu 2)
  stores: number[]; // 2 hazine (0: Oyuncu 1, 1: Oyuncu 2)
  currentPlayer: number; // 0 veya 1
  gameOver: boolean;
  winner: number | null;
}

const INITIAL_PITS = 4;
const PITS_PER_PLAYER = 6;

function createInitialState(): GameState {
  return {
    pits: Array(12).fill(INITIAL_PITS),
    stores: [0, 0],
    currentPlayer: 0,
    gameOver: false,
    winner: null,
  };
}

export default function Mangala() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [selectedPit, setSelectedPit] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [gameMode, setGameMode] = useState<'pvp' | 'pve'>('pvp');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const resetGame = () => {
    setGameState(createInitialState());
    setSelectedPit(null);
    setIsAnimating(false);
    toast.info('Oyun sıfırlandı!');
  };

  const checkGameOver = (state: GameState): boolean => {
    const player1Pits = state.pits.slice(0, PITS_PER_PLAYER).reduce((a, b) => a + b, 0);
    const player2Pits = state.pits.slice(PITS_PER_PLAYER).reduce((a, b) => a + b, 0);
    return player1Pits === 0 || player2Pits === 0;
  };

  const endGame = (state: GameState): GameState => {
    const player1Pits = state.pits.slice(0, PITS_PER_PLAYER).reduce((a, b) => a + b, 0);
    const player2Pits = state.pits.slice(PITS_PER_PLAYER).reduce((a, b) => a + b, 0);
    
    const finalStores = [...state.stores];
    finalStores[0] += player1Pits;
    finalStores[1] += player2Pits;
    
    const winner = finalStores[0] > finalStores[1] ? 0 : finalStores[1] > finalStores[0] ? 1 : null;
    
    if (winner !== null) {
      toast.success(`${winner === 0 ? 'Oyuncu 1' : 'Oyuncu 2'} kazandı! 🎉`);
    } else {
      toast.info('Berabere!');
    }
    
    return {
      ...state,
      pits: Array(12).fill(0),
      stores: finalStores,
      gameOver: true,
      winner,
    };
  };

  const makeMove = useCallback((pitIndex: number) => {
    if (isAnimating || gameState.gameOver) return;
    
    const playerPitsStart = gameState.currentPlayer === 0 ? 0 : PITS_PER_PLAYER;
    const playerPitsEnd = playerPitsStart + PITS_PER_PLAYER;
    
    // Sadece kendi kuyularından oynayabilir
    if (pitIndex < playerPitsStart || pitIndex >= playerPitsEnd) {
      toast.error('Sadece kendi kuyularınızdan oynayabilirsiniz!');
      return;
    }
    
    // Boş kuyudan oynanamaz
    if (gameState.pits[pitIndex] === 0) {
      toast.error('Bu kuyu boş!');
      return;
    }

    setIsAnimating(true);
    setSelectedPit(pitIndex);

    setTimeout(() => {
      setGameState(prev => {
        const newPits = [...prev.pits];
        const newStores = [...prev.stores];
        let stones = newPits[pitIndex];
        newPits[pitIndex] = 0;
        
        let currentIndex = pitIndex;
        let lastPit = -1;
        
        while (stones > 0) {
          currentIndex = (currentIndex + 1) % 14;
          
          // Rakibin hazinesini atla
          if (prev.currentPlayer === 0 && currentIndex === 13) continue;
          if (prev.currentPlayer === 1 && currentIndex === 6) continue;
          
          if (currentIndex === 6) {
            newStores[0]++;
          } else if (currentIndex === 13) {
            newStores[1]++;
          } else {
            const pitIdx = currentIndex < 6 ? currentIndex : currentIndex - 1;
            newPits[pitIdx]++;
            lastPit = pitIdx;
          }
          stones--;
        }
        
        let nextPlayer = prev.currentPlayer === 0 ? 1 : 0;
        
        // Son taş kendi hazinesinde biterse tekrar oyna
        if (prev.currentPlayer === 0 && currentIndex === 6) {
          nextPlayer = 0;
          toast.success('Tekrar oynuyorsunuz!');
        } else if (prev.currentPlayer === 1 && currentIndex === 13) {
          nextPlayer = 1;
          toast.success('Tekrar oynuyorsunuz!');
        }
        
        // Son taş boş kuyuya gelirse karşıdaki taşları al
        if (lastPit !== -1 && newPits[lastPit] === 1) {
          const isOwnPit = prev.currentPlayer === 0 
            ? lastPit < PITS_PER_PLAYER 
            : lastPit >= PITS_PER_PLAYER;
          
          if (isOwnPit) {
            const oppositePit = 11 - lastPit;
            if (newPits[oppositePit] > 0) {
              const captured = newPits[oppositePit] + 1;
              newPits[oppositePit] = 0;
              newPits[lastPit] = 0;
              newStores[prev.currentPlayer] += captured;
              toast.success(`${captured} taş ele geçirdiniz!`);
            }
          }
        }
        
        const newState = {
          ...prev,
          pits: newPits,
          stores: newStores,
          currentPlayer: nextPlayer,
        };
        
        if (checkGameOver(newState)) {
          return endGame(newState);
        }
        
        return newState;
      });
      
      setIsAnimating(false);
      setSelectedPit(null);
    }, 600);
  }, [gameState, isAnimating]);

  // AI hamlesi
  useEffect(() => {
    if (gameMode === 'pve' && gameState.currentPlayer === 1 && !gameState.gameOver) {
      const timer = setTimeout(() => {
        const availablePits = gameState.pits
          .map((stones, idx) => ({ stones, idx }))
          .filter(({ idx }) => idx >= PITS_PER_PLAYER && idx < 12)
          .filter(({ stones }) => stones > 0);
        
        if (availablePits.length > 0) {
          let selectedPit;
          
          if (difficulty === 'hard') {
            // Zor seviye: En iyi hamleyi hesapla
            selectedPit = availablePits.reduce((best, current) => 
              current.stones > best.stones ? current : best
            ).idx;
          } else if (difficulty === 'medium') {
            // Orta seviye: Rastgele ama dolu kuyulardan
            selectedPit = availablePits[Math.floor(Math.random() * availablePits.length)].idx;
          } else {
            // Kolay: Tamamen rastgele
            selectedPit = availablePits[Math.floor(Math.random() * availablePits.length)].idx;
          }
          
          makeMove(selectedPit);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.gameOver, gameMode, difficulty, makeMove, gameState.pits]);

  const getPitStyle = (index: number) => {
    const isPlayer1 = index < PITS_PER_PLAYER;
    const isPlayer2 = index >= PITS_PER_PLAYER;
    const isCurrentPlayerPit = gameState.currentPlayer === 0 ? isPlayer1 : isPlayer2;
    const isSelected = selectedPit === index;
    
    return {
      backgroundColor: isSelected 
        ? 'var(--beyboru-gold)' 
        : isCurrentPlayerPit 
          ? 'rgba(212, 175, 55, 0.2)' 
          : 'var(--beyboru-accent)',
      border: `2px solid ${isCurrentPlayerPit ? 'var(--beyboru-gold)' : 'var(--beyboru-border)'}`,
      cursor: isCurrentPlayerPit && !isAnimating && !gameState.gameOver ? 'pointer' : 'default',
      opacity: isCurrentPlayerPit ? 1 : 0.7,
    };
  };

  return (
    <>
      <SEO
        title="Mangala | Geleneksel Türk Zeka Oyunu - Beybörü"
        description="Mangala (Mankala) - Geleneksel Türk zeka oyunu. 2 oyuncu, 12 kuyu, strateji ve zeka mücadelesi!"
        keywords="Mangala, Mankala, Türk oyunu, zeka oyunu, strateji oyunu, geleneksel oyun"
        url="https://beyborudestanlari.com.tr/oyunlar/mangala"
        type="website"
      />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--beyboru-bg)' }}>
        {/* Hero */}
        <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/oyunlar">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 
                  className="font-playfair text-3xl sm:text-4xl font-bold"
                  style={{ color: 'var(--beyboru-text)' }}
                >
                  Mangala
                </h1>
                <p style={{ color: 'var(--beyboru-text-muted)' }}>
                  Geleneksel Türk Zeka Oyunu
                </p>
              </div>
            </div>

            {/* Game Mode Selection */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              <Button
                variant={gameMode === 'pvp' ? 'default' : 'outline'}
                onClick={() => setGameMode('pvp')}
                className="gap-2"
                style={gameMode === 'pvp' ? { backgroundColor: 'var(--beyboru-gold)', color: '#000' } : {}}
              >
                <User className="w-4 h-4" />
                2 Oyuncu
              </Button>
              <Button
                variant={gameMode === 'pve' ? 'default' : 'outline'}
                onClick={() => setGameMode('pve')}
                className="gap-2"
                style={gameMode === 'pve' ? { backgroundColor: 'var(--beyboru-gold)', color: '#000' } : {}}
              >
                <Bot className="w-4 h-4" />
                Bilgisayara Karşı
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRules(!showRules)}
                className="gap-2"
              >
                <Info className="w-4 h-4" />
                Kurallar
              </Button>
              <Button
                variant="outline"
                onClick={resetGame}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Sıfırla
              </Button>
            </div>

            {/* Difficulty (PVE only) */}
            {gameMode === 'pve' && (
              <div className="flex gap-2 mb-6 justify-center">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <Button
                    key={diff}
                    variant={difficulty === diff ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDifficulty(diff)}
                    style={difficulty === diff ? { backgroundColor: 'var(--beyboru-gold)', color: '#000' } : {}}
                  >
                    {diff === 'easy' ? 'Kolay' : diff === 'medium' ? 'Orta' : 'Zor'}
                  </Button>
                ))}
              </div>
            )}

            {/* Rules */}
            {showRules && (
              <Card className="mb-6" style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--beyboru-text)' }}>
                    Oyun Kuralları
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--beyboru-text-muted)' }}>
                    <li>• Her oyuncunun 6 kuyusu ve 1 hazinesi vardır</li>
                    <li>• Her kuyuda başlangıçta 4 taş bulunur</li>
                    <li>• Sırayla bir kuyudaki tüm taşları alıp saat yönünde dağıtın</li>
                    <li>• Son taş hazinenizde biterse tekrar oynarsınız</li>
                    <li>• Son taş boş kuyunuza gelirse karşıdaki taşları alırsınız</li>
                    <li>• Tüm taşlar bitince en çok taş toplayan kazanır</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Game Board */}
            <Card 
              className="overflow-hidden"
              style={{ backgroundColor: 'var(--beyboru-surface)', border: '2px solid var(--beyboru-gold)' }}
            >
              <CardContent className="p-4 sm:p-8">
                {/* Player 2 Store */}
                <div className="flex justify-between items-center mb-4">
                  <div 
                    className="w-16 h-32 sm:w-24 sm:h-40 rounded-lg flex flex-col items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--beyboru-accent)',
                      border: '2px solid var(--beyboru-border)',
                    }}
                  >
                    <span className="text-xs mb-1" style={{ color: 'var(--beyboru-text-muted)' }}>
                      {gameMode === 'pve' ? 'Bilgisayar' : 'Oyuncu 2'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--beyboru-gold)' }}>
                      {gameState.stores[1]}
                    </span>
                    <Sparkles className="w-4 h-4 mt-1" style={{ color: 'var(--beyboru-gold)' }} />
                  </div>
                  
                  {/* Turn Indicator */}
                  <div 
                    className="px-4 py-2 rounded-full"
                    style={{ 
                      backgroundColor: gameState.currentPlayer === 0 
                        ? 'rgba(212, 175, 55, 0.2)' 
                        : 'var(--beyboru-accent)',
                      border: `2px solid ${gameState.currentPlayer === 0 ? 'var(--beyboru-gold)' : 'var(--beyboru-border)'}`,
                    }}
                  >
                    <span style={{ color: 'var(--beyboru-text)' }}>
                      {gameState.gameOver 
                        ? (gameState.winner === 0 ? '🎉 Oyuncu 1 Kazandı!' : gameState.winner === 1 ? `🎉 ${gameMode === 'pve' ? 'Bilgisayar' : 'Oyuncu 2'} Kazandı!` : '🤝 Berabere!')
                        : `Sıra: ${gameState.currentPlayer === 0 ? 'Oyuncu 1' : gameMode === 'pve' ? 'Bilgisayar' : 'Oyuncu 2'}`
                      }
                    </span>
                  </div>

                  <div 
                    className="w-16 h-32 sm:w-24 sm:h-40 rounded-lg flex flex-col items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--beyboru-accent)',
                      border: '2px solid var(--beyboru-border)',
                    }}
                  >
                    <span className="text-xs mb-1" style={{ color: 'var(--beyboru-text-muted)' }}>Oyuncu 1</span>
                    <span className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--beyboru-gold)' }}>
                      {gameState.stores[0]}
                    </span>
                    <Sparkles className="w-4 h-4 mt-1" style={{ color: 'var(--beyboru-gold)' }} />
                  </div>
                </div>

                {/* Pits Grid */}
                <div className="grid grid-cols-6 gap-2 sm:gap-4">
                  {/* Player 2 Pits (reversed for display) */}
                  {[...Array(PITS_PER_PLAYER)].map((_, i) => {
                    const pitIndex = 11 - i;
                    return (
                      <button
                        key={`p2-${i}`}
                        onClick={() => makeMove(pitIndex)}
                        disabled={isAnimating || gameState.gameOver || gameState.currentPlayer !== 1 || gameMode === 'pve'}
                        className="aspect-square rounded-lg flex items-center justify-center transition-all hover:scale-105"
                        style={getPitStyle(pitIndex)}
                      >
                        <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--beyboru-text)' }}>
                          {gameState.pits[pitIndex]}
                        </span>
                      </button>
                    );
                  })}
                  
                  {/* Player 1 Pits */}
                  {[...Array(PITS_PER_PLAYER)].map((_, i) => {
                    const pitIndex = i;
                    return (
                      <button
                        key={`p1-${i}`}
                        onClick={() => makeMove(pitIndex)}
                        disabled={isAnimating || gameState.gameOver || gameState.currentPlayer !== 0}
                        className="aspect-square rounded-lg flex items-center justify-center transition-all hover:scale-105"
                        style={getPitStyle(pitIndex)}
                      >
                        <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--beyboru-text)' }}>
                          {gameState.pits[pitIndex]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Pit Labels */}
                <div className="grid grid-cols-6 gap-2 sm:gap-4 mt-2">
                  {[...Array(PITS_PER_PLAYER)].map((_, i) => (
                    <div key={`label-${i}`} className="text-center">
                      <span className="text-xs" style={{ color: 'var(--beyboru-text-muted)' }}>
                        {6 - i}
                      </span>
                    </div>
                  ))}
                  {[...Array(PITS_PER_PLAYER)].map((_, i) => (
                    <div key={`label2-${i}`} className="text-center">
                      <span className="text-xs" style={{ color: 'var(--beyboru-text-muted)' }}>
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-4 text-center">
                  <Trophy className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                  <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>Toplam Taş</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--beyboru-text)' }}>
                    {gameState.pits.reduce((a, b) => a + b, 0) + gameState.stores.reduce((a, b) => a + b, 0)}
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-4 text-center">
                  <User className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                  <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>Oyuncu 1</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--beyboru-text)' }}>
                    {gameState.stores[0]}
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-4 text-center">
                  <Bot className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                  <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                    {gameMode === 'pve' ? 'Bilgisayar' : 'Oyuncu 2'}
                  </p>
                  <p className="text-xl font-bold" style={{ color: 'var(--beyboru-text)' }}>
                    {gameState.stores[1]}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
