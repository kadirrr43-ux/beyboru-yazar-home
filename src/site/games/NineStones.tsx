import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Info, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

// 9 Taş (Dokuz Taş) - Geleneksel Türk Zeka Oyunu
// Amaç: 3 taşı bir sıraya getirmek (üçlü yapmak)
// Kurallar:
// - 2 oyuncu, her biri 9 taş
// - Taşları boş noktalara yerleştir (aşama 1)
// - Üçlü yapınca rakibin bir taşını al
// - Tüm taşlar yerleştirilince hareket etme aşaması başlar (aşama 2)
// - 3 taşı kalan oyuncu serbestçe hareket edebilir (uçan)
// - 2 taşı kalan oyuncu kaybeder

interface Point {
  id: number;
  x: number;
  y: number;
  connections: number[];
}

interface GameState {
  board: (number | null)[]; // null = boş, 0 = oyuncu 1, 1 = oyuncu 2
  currentPlayer: number;
  phase: 'placement' | 'movement' | 'removal';
  stonesPlaced: number[];
  stonesRemoved: number[];
  selectedPoint: number | null;
  gameOver: boolean;
  winner: number | null;
}

// Oyun tahtası noktaları (3 kare)
const BOARD_POINTS: Point[] = [
  // Dış kare
  { id: 0, x: 0, y: 0, connections: [1, 9] },
  { id: 1, x: 50, y: 0, connections: [0, 2, 17] },
  { id: 2, x: 100, y: 0, connections: [1, 3] },
  { id: 3, x: 100, y: 50, connections: [2, 4, 11] },
  { id: 4, x: 100, y: 100, connections: [3, 5] },
  { id: 5, x: 50, y: 100, connections: [4, 6, 14] },
  { id: 6, x: 0, y: 100, connections: [5, 7] },
  { id: 7, x: 0, y: 50, connections: [6, 8, 12] },
  // Orta kare
  { id: 8, x: 17, y: 50, connections: [7, 9, 13] },
  { id: 9, x: 17, y: 17, connections: [0, 8, 10] },
  { id: 10, x: 50, y: 17, connections: [9, 11, 18] },
  { id: 11, x: 83, y: 17, connections: [3, 10, 12] },
  { id: 12, x: 83, y: 50, connections: [7, 11, 13] },
  { id: 13, x: 83, y: 83, connections: [8, 12, 14] },
  { id: 14, x: 50, y: 83, connections: [5, 13, 15] },
  { id: 15, x: 17, y: 83, connections: [14, 16] },
  { id: 16, x: 17, y: 50, connections: [15, 8] },
  // İç kare
  { id: 17, x: 33, y: 50, connections: [1, 18] },
  { id: 18, x: 33, y: 33, connections: [10, 17, 19] },
  { id: 19, x: 50, y: 33, connections: [18, 20] },
  { id: 20, x: 67, y: 33, connections: [19, 21] },
  { id: 21, x: 67, y: 50, connections: [20, 22] },
  { id: 22, x: 67, y: 67, connections: [21, 23] },
  { id: 23, x: 50, y: 67, connections: [22, 24] },
  { id: 24, x: 33, y: 67, connections: [23, 18] },
];

// Üçlü kombinasyonlar (mill)
const MILLS = [
  // Yatay üçlüler
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [9, 10, 11], [12, 13, 14], [15, 16, 17],
  [18, 19, 20], [21, 22, 23],
  // Dikey üçlüler
  [0, 9, 18], [1, 10, 19], [2, 11, 20],
  [3, 12, 21], [4, 13, 22], [5, 14, 23],
  [6, 15, 24], [7, 16, 19],
];

const INITIAL_STONES = 9;

function createInitialState(): GameState {
  return {
    board: Array(25).fill(null),
    currentPlayer: 0,
    phase: 'placement',
    stonesPlaced: [0, 0],
    stonesRemoved: [0, 0],
    selectedPoint: null,
    gameOver: false,
    winner: null,
  };
}

export default function NineStones() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [showRules, setShowRules] = useState(false);
  const [gameMode, setGameMode] = useState<'pvp' | 'pve'>('pvp');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const resetGame = () => {
    setGameState(createInitialState());
    toast.info('Oyun sıfırlandı!');
  };

  const checkMill = (board: (number | null)[], point: number, player: number): boolean => {
    return MILLS.some(mill => 
      mill.includes(point) && 
      mill.every(p => board[p] === player)
    );
  };

  const countStones = (board: (number | null)[], player: number): number => {
    return board.filter(s => s === player).length;
  };

  const getValidMoves = (board: (number | null)[], point: number, player: number): number[] => {
    const stoneCount = countStones(board, player);
    const canFly = stoneCount === 3;
    
    if (canFly) {
      // Uçan: Herhangi bir boş noktaya gidebilir
      return board.map((s, i) => s === null ? i : -1).filter(i => i !== -1);
    }
    
    // Normal hareket: Sadece bağlı noktalara
    return BOARD_POINTS[point].connections.filter(p => board[p] === null);
  };

  const checkGameOver = (board: (number | null)[]): { gameOver: boolean; winner: number | null } => {
    const p1Stones = countStones(board, 0);
    const p2Stones = countStones(board, 1);
    
    if (p1Stones < 3) return { gameOver: true, winner: 1 };
    if (p2Stones < 3) return { gameOver: true, winner: 0 };
    
    // Hareket kontrolü
    for (let player = 0; player <= 1; player++) {
      const playerPoints = board.map((s, i) => s === player ? i : -1).filter(i => i !== -1);
      const canMove = playerPoints.some(p => getValidMoves(board, p, player).length > 0);
      if (!canMove && countStones(board, player) > 3) {
        return { gameOver: true, winner: player === 0 ? 1 : 0 };
      }
    }
    
    return { gameOver: false, winner: null };
  };

  const handlePointClick = useCallback((pointId: number) => {
    if (gameState.gameOver) return;
    
    const { board, currentPlayer, phase, selectedPoint, stonesPlaced } = gameState;
    
    if (phase === 'placement') {
      // Yerleştirme aşaması
      if (board[pointId] !== null) {
        toast.error('Bu nokta dolu!');
        return;
      }
      
      const newBoard = [...board];
      newBoard[pointId] = currentPlayer;
      
      const newStonesPlaced = [...stonesPlaced];
      newStonesPlaced[currentPlayer]++;
      
      const madeMill = checkMill(newBoard, pointId, currentPlayer);
      
      if (madeMill) {
        toast.success('Üçlü yaptınız! Rakibin bir taşını alın.');
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          stonesPlaced: newStonesPlaced,
          phase: 'removal',
        }));
        return;
      }
      
      const allPlaced = newStonesPlaced[0] === INITIAL_STONES && newStonesPlaced[1] === INITIAL_STONES;
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        stonesPlaced: newStonesPlaced,
        phase: allPlaced ? 'movement' : 'placement',
        currentPlayer: prev.currentPlayer === 0 ? 1 : 0,
      }));
      
    } else if (phase === 'removal') {
      // Taş alma aşaması
      if (board[pointId] === null || board[pointId] === currentPlayer) {
        toast.error('Rakibinizin taşını seçin!');
        return;
      }
      
      // Üçlüdeki taşlar alınamaz (opsiyonel kural)
      const inMill = checkMill(board, pointId, board[pointId] as number);
      const allInMill = board.every((s, i) => 
        s !== (currentPlayer === 0 ? 1 : 0) || checkMill(board, i, s)
      );
      
      if (inMill && !allInMill) {
        toast.error('Üçlüdeki taşlar alınamaz!');
        return;
      }
      
      const newBoard = [...board];
      newBoard[pointId] = null;
      
      const newStonesRemoved = [...gameState.stonesRemoved];
      newStonesRemoved[currentPlayer]++;
      
      const allPlaced = stonesPlaced[0] === INITIAL_STONES && stonesPlaced[1] === INITIAL_STONES;
      
      const { gameOver, winner } = checkGameOver(newBoard);
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        stonesRemoved: newStonesRemoved,
        phase: allPlaced ? 'movement' : 'placement',
        currentPlayer: prev.currentPlayer === 0 ? 1 : 0,
        gameOver,
        winner,
      }));
      
      if (gameOver && winner !== null) {
        toast.success(`${winner === 0 ? 'Oyuncu 1' : 'Oyuncu 2'} kazandı! 🎉`);
      }
      
    } else if (phase === 'movement') {
      // Hareket aşaması
      if (selectedPoint === null) {
        // Taş seç
        if (board[pointId] !== currentPlayer) {
          toast.error('Kendi taşınızı seçin!');
          return;
        }
        
        const validMoves = getValidMoves(board, pointId, currentPlayer);
        if (validMoves.length === 0) {
          toast.error('Bu taş hareket edemez!');
          return;
        }
        
        setGameState(prev => ({ ...prev, selectedPoint: pointId }));
        
      } else {
        // Taş hareket ettir
        if (pointId === selectedPoint) {
          setGameState(prev => ({ ...prev, selectedPoint: null }));
          return;
        }
        
        const validMoves = getValidMoves(board, selectedPoint, currentPlayer);
        
        if (!validMoves.includes(pointId)) {
          toast.error('Geçersiz hamle!');
          return;
        }
        
        const newBoard = [...board];
        newBoard[pointId] = currentPlayer;
        newBoard[selectedPoint] = null;
        
        const madeMill = checkMill(newBoard, pointId, currentPlayer);
        
        if (madeMill) {
          toast.success('Üçlü yaptınız! Rakibin bir taşını alın.');
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            selectedPoint: null,
            phase: 'removal',
          }));
          return;
        }
        
        const { gameOver, winner } = checkGameOver(newBoard);
        
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          selectedPoint: null,
          currentPlayer: prev.currentPlayer === 0 ? 1 : 0,
          gameOver,
          winner,
        }));
        
        if (gameOver && winner !== null) {
          toast.success(`${winner === 0 ? 'Oyuncu 1' : 'Oyuncu 2'} kazandı! 🎉`);
        }
      }
    }
  }, [gameState]);

  // AI hamlesi
  useEffect(() => {
    if (gameMode === 'pve' && gameState.currentPlayer === 1 && !gameState.gameOver) {
      const timer = setTimeout(() => {
        const { board, phase } = gameState;
        
        if (phase === 'placement') {
          // Yerleştirme: Rastgele boş nokta
          const emptyPoints = board.map((s, i) => s === null ? i : -1).filter(i => i !== -1);
          if (emptyPoints.length > 0) {
            const point = emptyPoints[Math.floor(Math.random() * emptyPoints.length)];
            handlePointClick(point);
          }
        } else if (phase === 'removal') {
          // Taş alma: Rastgele rakip taşı
          const opponentPoints = board.map((s, i) => s === 0 ? i : -1).filter(i => i !== -1);
          const validRemovals = opponentPoints.filter(p => !checkMill(board, p, 0));
          const targets = validRemovals.length > 0 ? validRemovals : opponentPoints;
          if (targets.length > 0) {
            handlePointClick(targets[Math.floor(Math.random() * targets.length)]);
          }
        } else if (phase === 'movement') {
          // Hareket: Rastgele geçerli hamle
          const playerPoints = board.map((s, i) => s === 1 ? i : -1).filter(i => i !== -1);
          const validMoves: { from: number; to: number }[] = [];
          
          playerPoints.forEach(from => {
            getValidMoves(board, from, 1).forEach(to => {
              validMoves.push({ from, to });
            });
          });
          
          if (validMoves.length > 0) {
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];
            handlePointClick(move.from);
            setTimeout(() => handlePointClick(move.to), 300);
          }
        }
      }, difficulty === 'easy' ? 1000 : difficulty === 'medium' ? 1500 : 2000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, gameMode, difficulty, handlePointClick]);

  const getPointStyle = (pointId: number) => {
    const stone = gameState.board[pointId];
    const isSelected = gameState.selectedPoint === pointId;
    const isValidMove = gameState.selectedPoint !== null && 
      getValidMoves(gameState.board, gameState.selectedPoint, gameState.currentPlayer).includes(pointId);
    
    let backgroundColor = 'var(--beyboru-accent)';
    let borderColor = 'var(--beyboru-border)';
    
    if (stone === 0) {
      backgroundColor = 'var(--beyboru-gold)';
      borderColor = 'var(--beyboru-gold)';
    } else if (stone === 1) {
      backgroundColor = '#8B4513';
      borderColor = '#8B4513';
    }
    
    if (isSelected) {
      borderColor = '#00ff00';
    } else if (isValidMove) {
      borderColor = 'var(--beyboru-gold)';
      backgroundColor = 'rgba(212, 175, 55, 0.3)';
    }
    
    return {
      backgroundColor,
      border: `3px solid ${borderColor}`,
      cursor: gameState.currentPlayer === 0 || gameMode === 'pvp' ? 'pointer' : 'default',
    };
  };

  const p1Stones = countStones(gameState.board, 0);
  const p2Stones = countStones(gameState.board, 1);
  const p1Remaining = INITIAL_STONES - gameState.stonesPlaced[0];
  const p2Remaining = INITIAL_STONES - gameState.stonesPlaced[1];

  return (
    <>
      <SEO
        title="9 Taş | Geleneksel Türk Zeka Oyunu - Beybörü"
        description="9 Taş (Dokuz Taş) - Geleneksel Türk zeka oyunu. Üçlü yap, strateji kur, kazan!"
        keywords="9 Taş, Dokuz Taş, Türk oyunu, zeka oyunu, strateji oyunu, mill oyunu"
        url="https://beyborudestanlari.com.tr/oyunlar/9-tas"
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
                  9 Taş
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
                    <li>• Her oyuncunun 9 taşı vardır</li>
                    <li>• Amaç: 3 taşı bir sıraya getirmek (üçlü/mill yapmak)</li>
                    <li>• Üçlü yapınca rakibin bir taşını alırsınız</li>
                    <li>• Tüm taşlar yerleştirilince hareket etme aşaması başlar</li>
                    <li>• 3 taşı kalan oyuncu serbestçe hareket edebilir (uçan)</li>
                    <li>• 2 taşı kalan oyuncu kaybeder</li>
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
                {/* Turn Indicator */}
                <div className="flex justify-center mb-4">
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
                        : `Aşama: ${gameState.phase === 'placement' ? 'Yerleştirme' : gameState.phase === 'removal' ? 'Taş Alma' : 'Hareket'} | Sıra: ${gameState.currentPlayer === 0 ? 'Oyuncu 1' : gameMode === 'pve' ? 'Bilgisayar' : 'Oyuncu 2'}`
                      }
                    </span>
                  </div>
                </div>

                {/* Board Grid */}
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Board Lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    {/* Dış kare */}
                    <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--beyboru-gold)" strokeWidth="0.5" />
                    {/* Orta kare */}
                    <rect x="17" y="17" width="66" height="66" fill="none" stroke="var(--beyboru-gold)" strokeWidth="0.5" />
                    {/* İç kare */}
                    <rect x="33" y="33" width="34" height="34" fill="none" stroke="var(--beyboru-gold)" strokeWidth="0.5" />
                    {/* Çapraz çizgiler */}
                    <line x1="50" y1="0" x2="50" y2="33" stroke="var(--beyboru-gold)" strokeWidth="0.5" />
                    <line x1="50" y1="67" x2="50" y2="100" stroke="var(--beyboru-gold)" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="33" y2="50" stroke="var(--beyboru-gold)" strokeWidth="0.5" />
                    <line x1="67" y1="50" x2="100" y2="50" stroke="var(--beyboru-gold)" strokeWidth="0.5" />
                  </svg>

                  {/* Points */}
                  {BOARD_POINTS.map((point) => (
                    <button
                      key={point.id}
                      onClick={() => handlePointClick(point.id)}
                      disabled={gameMode === 'pve' && gameState.currentPlayer === 1}
                      className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        ...getPointStyle(point.id),
                      }}
                    />
                  ))}
                </div>

                {/* Instructions */}
                <div className="text-center mt-4">
                  <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                    {gameState.phase === 'placement' && 'Taşlarınızı boş noktalara yerleştirin'}
                    {gameState.phase === 'removal' && 'Rakibinizin bir taşını seçip alın'}
                    {gameState.phase === 'movement' && !gameState.selectedPoint && 'Hareket ettireceğiniz taşı seçin'}
                    {gameState.phase === 'movement' && gameState.selectedPoint && 'Taşı hareket ettireceğiniz noktayı seçin'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--beyboru-gold)' }} />
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--beyboru-text)' }}>Oyuncu 1</p>
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                        Tahta: {p1Stones} | Bekleyen: {p1Remaining} | Alınan: {gameState.stonesRemoved[0]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: 'var(--beyboru-surface)', border: '1px solid var(--beyboru-border)' }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#8B4513' }} />
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--beyboru-text)' }}>
                        {gameMode === 'pve' ? 'Bilgisayar' : 'Oyuncu 2'}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--beyboru-text-muted)' }}>
                        Tahta: {p2Stones} | Bekleyen: {p2Remaining} | Alınan: {gameState.stonesRemoved[1]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
