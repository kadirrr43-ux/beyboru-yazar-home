import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Info, Trophy, Clock, Sparkles, Eye, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

// Beybörü Mahjong - Beybörü karakterleri ve sembolleriyle Mahjong
// Geleneksel Mahjong kuralları + Beybörü teması

interface Tile {
  id: number;
  type: 'character' | 'symbol' | 'element' | 'special';
  value: string;
  name: string;
  matched: boolean;
}

interface GameState {
  tiles: Tile[];
  selectedTiles: number[];
  matchedPairs: number;
  moves: number;
  time: number;
  gameOver: boolean;
  won: boolean;
  hints: number;
  shuffles: number;
}

// Beybörü temalı karakterler ve semboller
const BEYBORU_TILES = [
  // Karakterler
  { type: 'character' as const, value: 'aras', name: 'Profesör Aras' },
  { type: 'character' as const, value: 'selin', name: 'Dr. Selin' },
  { type: 'character' as const, value: 'kerem', name: 'Kerem' },
  { type: 'character' as const, value: 'yusuf', name: 'Yusuf' },
  { type: 'character' as const, value: 'fatima', name: 'Fatıma' },
  { type: 'character' as const, value: 'zeynep', name: 'Zeynep Ana' },
  // Semboller
  { type: 'symbol' as const, value: 'bozkurt', name: 'Bozkurt' },
  { type: 'symbol' as const, value: 'ergenekon', name: 'Ergenekon' },
  { type: 'symbol' as const, value: 'gokturk', name: 'Göktürk' },
  { type: 'symbol' as const, value: 'osmanlica', name: 'Osmanlıca' },
  { type: 'symbol' as const, value: 'crescent', name: 'Hilal' },
  { type: 'symbol' as const, value: 'star', name: 'Yıldız' },
  // Elementler
  { type: 'element' as const, value: 'fire', name: 'Ateş' },
  { type: 'element' as const, value: 'water', name: 'Su' },
  { type: 'element' as const, value: 'earth', name: 'Toprak' },
  { type: 'element' as const, value: 'air', name: 'Hava' },
  { type: 'element' as const, value: 'metal', name: 'Metal' },
  { type: 'element' as const, value: 'wood', name: 'Odun' },
  // Özel
  { type: 'special' as const, value: 'book', name: 'Kitap' },
  { type: 'special' as const, value: 'pen', name: 'Kalem' },
  { type: 'special' as const, value: 'wolf', name: 'Kurt' },
  { type: 'special' as const, value: 'sun', name: 'Güneş' },
];

// Tile görünümleri (emoji ve renkler)
const TILE_STYLES: Record<string, { emoji: string; color: string }> = {
  aras: { emoji: '👨‍🏫', color: '#D4AF37' },
  selin: { emoji: '👩‍🔬', color: '#D4AF37' },
  kerem: { emoji: '👨‍💻', color: '#8B4513' },
  yusuf: { emoji: '👨‍👦', color: '#4A90D9' },
  fatima: { emoji: '👩‍🌾', color: '#4A90D9' },
  zeynep: { emoji: '👵', color: '#4A90D9' },
  bozkurt: { emoji: '🐺', color: '#C0C0C0' },
  ergenekon: { emoji: '⛰️', color: '#C0C0C0' },
  gokturk: { emoji: '𐰀', color: '#C0C0C0' },
  osmanlica: { emoji: 'ا', color: '#C0C0C0' },
  crescent: { emoji: '🌙', color: '#FFD700' },
  star: { emoji: '⭐', color: '#FFD700' },
  fire: { emoji: '🔥', color: '#FF4500' },
  water: { emoji: '💧', color: '#4169E1' },
  earth: { emoji: '🌍', color: '#8B4513' },
  air: { emoji: '💨', color: '#87CEEB' },
  metal: { emoji: '⚙️', color: '#708090' },
  wood: { emoji: '🌲', color: '#228B22' },
  book: { emoji: '📖', color: '#8B4513' },
  pen: { emoji: '✒️', color: '#2F4F4F' },
  wolf: { emoji: '🐺', color: '#696969' },
  sun: { emoji: '☀️', color: '#FFA500' },
};

function createTiles(): Tile[] {
  const tiles: Tile[] = [];
  let id = 0;
  
  // Her tile'dan 4 tane oluştur (2 çift)
  BEYBORU_TILES.forEach((tile) => {
    for (let i = 0; i < 4; i++) {
      tiles.push({
        id: id++,
        type: tile.type,
        value: tile.value,
        name: tile.name,
        matched: false,
      });
    }
  });
  
  // Karıştır
  return shuffleArray(tiles);
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function createInitialState(): GameState {
  return {
    tiles: createTiles(),
    selectedTiles: [],
    matchedPairs: 0,
    moves: 0,
    time: 0,
    gameOver: false,
    won: false,
    hints: 3,
    shuffles: 3,
  };
}

export default function BeyboruMahjong() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [showRules, setShowRules] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && !gameState.gameOver) {
      interval = setInterval(() => {
        setGameState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameState.gameOver]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetGame = () => {
    setGameState(createInitialState());
    setIsTimerRunning(false);
    toast.info('Oyun sıfırlandı!');
  };

  const handleTileClick = useCallback((tileId: number) => {
    if (gameState.gameOver) return;
    
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    
    const tile = gameState.tiles.find(t => t.id === tileId);
    if (!tile || tile.matched) return;
    
    const { selectedTiles } = gameState;
    
    // Zaten seçiliyse seçimi kaldır
    if (selectedTiles.includes(tileId)) {
      setGameState(prev => ({
        ...prev,
        selectedTiles: prev.selectedTiles.filter(id => id !== tileId),
      }));
      return;
    }
    
    // 2'den fazla seçilemez
    if (selectedTiles.length >= 2) {
      setGameState(prev => ({ ...prev, selectedTiles: [tileId] }));
      return;
    }
    
    // Yeni seçim ekle
    const newSelected = [...selectedTiles, tileId];
    setGameState(prev => ({ ...prev, selectedTiles: newSelected }));
    
    // 2 tile seçildiyse eşleşme kontrolü
    if (newSelected.length === 2) {
      const tile1 = gameState.tiles.find(t => t.id === newSelected[0]);
      const tile2 = gameState.tiles.find(t => t.id === newSelected[1]);
      
      if (tile1 && tile2 && tile1.value === tile2.value) {
        // Eşleşme!
        setTimeout(() => {
          setGameState(prev => {
            const newTiles = prev.tiles.map(t => 
              t.id === tile1.id || t.id === tile2.id ? { ...t, matched: true } : t
            );
            const newMatchedPairs = prev.matchedPairs + 1;
            const allMatched = newMatchedPairs === BEYBORU_TILES.length * 2;
            
            if (allMatched) {
              toast.success('Tebrikler! Tüm eşleşmeleri buldunuz! 🎉');
            } else {
              toast.success(`${tile1.name} eşleşti!`);
            }
            
            return {
              ...prev,
              tiles: newTiles,
              selectedTiles: [],
              matchedPairs: newMatchedPairs,
              moves: prev.moves + 1,
              gameOver: allMatched,
              won: allMatched,
            };
          });
        }, 300);
      } else {
        // Eşleşme yok
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            selectedTiles: [],
            moves: prev.moves + 1,
          }));
        }, 800);
      }
    }
  }, [gameState, isTimerRunning]);

  const useHint = () => {
    if (gameState.hints <= 0 || gameState.gameOver) {
      toast.error('İpucu hakkınız kalmadı!');
      return;
    }
    
    // Eşleşebilecek bir çift bul
    const unmatchedTiles = gameState.tiles.filter(t => !t.matched);
    const valueCounts: Record<string, number[]> = {};
    
    unmatchedTiles.forEach(tile => {
      if (!valueCounts[tile.value]) {
        valueCounts[tile.value] = [];
      }
      valueCounts[tile.value].push(tile.id);
    });
    
    const pair = Object.values(valueCounts).find(ids => ids.length >= 2);
    
    if (pair) {
      setGameState(prev => ({
        ...prev,
        selectedTiles: [pair[0], pair[1]],
        hints: prev.hints - 1,
      }));
      
      setTimeout(() => {
        setGameState(prev => ({ ...prev, selectedTiles: [] }));
      }, 2000);
      
      toast.info('İpucu gösterildi!');
    }
  };

  const shuffleTiles = () => {
    if (gameState.shuffles <= 0 || gameState.gameOver) {
      toast.error('Karıştırma hakkınız kalmadı!');
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      tiles: shuffleArray(prev.tiles),
      selectedTiles: [],
      shuffles: prev.shuffles - 1,
    }));
    
    toast.info('Taşlar karıştırıldı!');
  };

  const getTileStyle = (tile: Tile) => {
    const isSelected = gameState.selectedTiles.includes(tile.id);
    const style = TILE_STYLES[tile.value] || { emoji: '❓', color: '#888' };
    
    if (tile.matched) {
      return {
        opacity: 0,
        pointerEvents: 'none' as const,
        transform: 'scale(0)',
      };
    }
    
    return {
      backgroundColor: isSelected ? 'var(--beyboru-gold)' : 'var(--beyboru-surface)',
      border: `3px solid ${isSelected ? '#00ff00' : style.color}`,
      boxShadow: isSelected ? '0 0 15px var(--beyboru-gold)' : 'none',
    };
  };

  return (
    <>
      <SEO
        title="Beybörü Mahjong | Beybörü Karakterleriyle Eşleştirme - Beybörü"
        description="Beybörü Mahjong - Kitap karakterleri ve sembolleriyle eşleştirme oyunu. Ergenekon, Kudüs ve daha fazlası!"
        keywords="Beybörü Mahjong, eşleştirme oyunu, hafıza oyunu, Beybörü karakterleri, Türk oyunu"
        url="https://beyborudestanlari.com.tr/oyunlar/mahjong"
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
                  Beybörü Mahjong
                </h1>
                <p style={{ color: 'var(--beyboru-text-muted)' }}>
                  Karakterleri ve Sembolleri Eşleştir
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
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
              <Button
                variant="outline"
                onClick={useHint}
                disabled={gameState.hints <= 0 || gameState.gameOver}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                İpucu ({gameState.hints})
              </Button>
              <Button
                variant="outline"
                onClick={shuffleTiles}
                disabled={gameState.shuffles <= 0 || gameState.gameOver}
                className="gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Karıştır ({gameState.shuffles})
              </Button>
            </div>

            {/* Rules */}
            {showRules && (
              <Card className="mb-6" style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--beyboru-text)' }}>
                    Oyun Kuralları
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--beyboru-text-muted)' }}>
                    <li>• Aynı karakter veya sembolü taşıyan 2 taşı eşleştirin</li>
                    <li>• Tüm eşleşmeleri en kısa sürede ve en az hamlede tamamlayın</li>
                    <li>• İpucu kullanarak eşleşebilecek bir çift görebilirsiniz</li>
                    <li>• Karıştırarak taşların yerlerini değiştirebilirsiniz</li>
                    <li>• Beybörü evreninin karakterlerini ve sembollerini keşfedin!</li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--beyboru-gold)' }} />
                  <p className="text-lg font-bold" style={{ color: 'var(--beyboru-text)' }}>
                    {formatTime(gameState.time)}
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-3 text-center">
                  <Sparkles className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--beyboru-gold)' }} />
                  <p className="text-lg font-bold" style={{ color: 'var(--beyboru-text)' }}>
                    {gameState.matchedPairs}/{BEYBORU_TILES.length * 2}
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-3 text-center">
                  <Trophy className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--beyboru-gold)' }} />
                  <p className="text-lg font-bold" style={{ color: 'var(--beyboru-text)' }}>
                    {gameState.moves}
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-3 text-center">
                  <Eye className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--beyboru-gold)' }} />
                  <p className="text-lg font-bold" style={{ color: 'var(--beyboru-text)' }}>
                    {gameState.hints}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Game Board */}
            <Card 
              className="overflow-hidden"
              style={{ backgroundColor: 'var(--beyboru-surface)', border: '2px solid var(--beyboru-gold)' }}
            >
              <CardContent className="p-4 sm:p-6">
                {gameState.won && (
                  <div className="text-center mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                    <Trophy className="w-12 h-12 mx-auto mb-2" style={{ color: 'var(--beyboru-gold)' }} />
                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--beyboru-text)' }}>
                      Tebrikler! 🎉
                    </h2>
                    <p style={{ color: 'var(--beyboru-text-muted)' }}>
                      Tüm eşleşmeleri {gameState.moves} hamlede ve {formatTime(gameState.time)} sürede tamamladınız!
                    </p>
                    <Button 
                      onClick={resetGame}
                      className="mt-4 gap-2"
                      style={{ backgroundColor: 'var(--beyboru-gold)', color: '#000' }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Tekrar Oyna
                    </Button>
                  </div>
                )}

                {/* Tiles Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
                  {gameState.tiles.map((tile) => {
                    const style = TILE_STYLES[tile.value] || { emoji: '❓', color: '#888' };
                    return (
                      <button
                        key={tile.id}
                        onClick={() => handleTileClick(tile.id)}
                        disabled={tile.matched || gameState.gameOver}
                        className="aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
                        style={getTileStyle(tile)}
                      >
                        <span className="text-2xl sm:text-3xl">{style.emoji}</span>
                        <span className="text-[8px] sm:text-[10px] mt-1 truncate w-full px-1" style={{ color: 'var(--beyboru-text)' }}>
                          {tile.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="mt-6" style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3" style={{ color: 'var(--beyboru-text)' }}>
                  Beybörü Koleksiyonu
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BEYBORU_TILES.map((tile) => {
                    const style = TILE_STYLES[tile.value] || { emoji: '❓', color: '#888' };
                    return (
                      <div 
                        key={tile.value}
                        className="flex items-center gap-2 p-2 rounded"
                        style={{ backgroundColor: 'var(--beyboru-bg)' }}
                      >
                        <span className="text-xl">{style.emoji}</span>
                        <span className="text-xs" style={{ color: 'var(--beyboru-text-muted)' }}>
                          {tile.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
