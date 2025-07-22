import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const GameContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  minHeight: "100vh",
  backgroundColor: "#E3F2FD",
}));

const MazeGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(10, 40px)",
  gridTemplateRows: "repeat(10, 40px)",
  gap: "2px",
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(10, 30px)",
    gridTemplateRows: "repeat(10, 30px)",
  },
}));

interface MazeCellProps {
  cellType: string;
}

const MazeCell = styled(Box)<MazeCellProps>(({ theme, cellType }) => ({
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: "bold",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    width: "30px",
    height: "30px",
    fontSize: "14px",
  },
  ...(cellType === "wall" && {
    backgroundColor: "#2E7D32",
    color: "white",
  }),
  ...(cellType === "path" && {
    backgroundColor: "#E8F5E8",
    border: "1px solid #A5D6A7",
  }),
  ...(cellType === "player" && {
    backgroundColor: "#4FC3F7",
    color: "white",
  }),
  ...(cellType === "healthy" && {
    backgroundColor: "#66BB6A",
    color: "white",
  }),
  ...(cellType === "unhealthy" && {
    backgroundColor: "#EF5350",
    color: "white",
  }),
  ...(cellType === "finish" && {
    backgroundColor: "#FFD54F",
    color: "#333",
  }),
}));

const StatsBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: "center",
  backgroundColor: "#fff",
  minWidth: "120px",
}));

const BloodPressureMaze = () => {
  // Game state
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(100);
  const [itemsCollected, setItemsCollected] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");

  // Maze layout (0=path, 1=wall, 2=healthy item, 3=unhealthy item, 4=finish)
  const [maze] = useState([
    [0, 1, 0, 0, 0, 1, 0, 2, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 2, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 2, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [3, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 3, 4],
  ]);

  const [collectedItems, setCollectedItems] = useState(new Set());

  // Health tips for different items
  const healthTips = {
    healthy: [
      "Excelente! Exercício regular ajuda a baixar a pressão arterial.",
      "Ótima escolha! Frutas e vegetais são ricos em potássio, que ajuda a controlar a pressão.",
      "Muito bem! Reduzir o sal na dieta é fundamental para a saúde cardiovascular.",
    ],
    unhealthy: [
      "Cuidado! O excesso de sal pode aumentar a pressão arterial.",
      "Atenção! Alimentos processados são ricos em sódio e prejudicam o coração.",
    ],
  };

  const movePlayer = useCallback(
    (direction: any) => {
      if (gameWon || gameOver) return;

      setPlayerPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        switch (direction) {
          case "up":
            newY = Math.max(0, prev.y - 1);
            break;
          case "down":
            newY = Math.min(9, prev.y + 1);
            break;
          case "left":
            newX = Math.max(0, prev.x - 1);
            break;
          case "right":
            newX = Math.min(9, prev.x + 1);
            break;
          default:
            return prev;
        }

        // Check if new position is a wall
        if (maze[newY][newX] === 1) {
          return prev; // Don't move
        }

        // Check what's at the new position
        const cellType = maze[newY][newX];
        const cellKey = `${newX}-${newY}`;

        if (!collectedItems.has(cellKey)) {
          if (cellType === 2) {
            // Healthy item
            setScore((prev) => prev + 20);
            setItemsCollected((prev) => prev + 1);
            setCollectedItems((prev) => new Set([...prev, cellKey]));
            setCurrentTip(
              healthTips.healthy[
                Math.floor(Math.random() * healthTips.healthy.length)
              ]
            );
            setShowTip(true);
          } else if (cellType === 3) {
            // Unhealthy item
            setScore((prev) => Math.max(0, prev - 30));
            setCollectedItems((prev) => new Set([...prev, cellKey]));
            setCurrentTip(
              healthTips.unhealthy[
                Math.floor(Math.random() * healthTips.unhealthy.length)
              ]
            );
            setShowTip(true);
          } else if (cellType === 4) {
            // Finish
            setGameWon(true);
          }
        }

        return { x: newX, y: newY };
      });
    },
    [maze, collectedItems, gameWon, gameOver, healthTips]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: { key: any; preventDefault: () => void }) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          movePlayer("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          movePlayer("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          movePlayer("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          movePlayer("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePlayer]);

  const resetGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setScore(100);
    setItemsCollected(0);
    setGameWon(false);
    setGameOver(false);
    setCollectedItems(new Set());
    setShowTip(false);
  };

  const getCellContent = (x: number, y: number) => {
    if (playerPos.x === x && playerPos.y === y) {
      return "🚶";
    }

    const cellKey = `${x}-${y}`;
    const cellType = maze[y][x];

    if (collectedItems.has(cellKey)) {
      return "";
    }

    switch (cellType) {
      case 1:
        return "🧱";
      case 2:
        return "🥗";
      case 3:
        return "🍔";
      case 4:
        return "🏁";
      default:
        return "";
    }
  };

  const getCellType = (x: number, y: number) => {
    if (playerPos.x === x && playerPos.y === y) {
      return "player";
    }

    const cellKey = `${x}-${y}`;
    const cellType = maze[y][x];

    if (collectedItems.has(cellKey)) {
      return "path";
    }

    switch (cellType) {
      case 1:
        return "wall";
      case 2:
        return "healthy";
      case 3:
        return "unhealthy";
      case 4:
        return "finish";
      default:
        return "path";
    }
  };

  return (
    <GameContainer>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Labirinto da Pressão Arterial
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <StatsBox>
          <FavoriteIcon sx={{ color: "#e91e63", mb: 1 }} />
          <Typography variant="h6">{score}</Typography>
          <Typography variant="caption">Pontos</Typography>
        </StatsBox>

        <StatsBox>
          <SportsScoreIcon sx={{ color: "#4caf50", mb: 1 }} />
          <Typography variant="h6">{itemsCollected}</Typography>
          <Typography variant="caption">Itens Saudáveis</Typography>
        </StatsBox>
      </Box>

      <MazeGrid>
        {maze.map((row, y) =>
          row.map((_cell, x) => (
            <MazeCell key={`${x}-${y}`} cellType={getCellType(x, y)}>
              {getCellContent(x, y)}
            </MazeCell>
          ))
        )}
      </MazeGrid>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={() => movePlayer("up")}>
          ↑
        </Button>
        <Button variant="contained" onClick={() => movePlayer("left")}>
          ←
        </Button>
        <Button variant="contained" onClick={() => movePlayer("down")}>
          ↓
        </Button>
        <Button variant="contained" onClick={() => movePlayer("right")}>
          →
        </Button>
      </Box>

      <Button
        variant="outlined"
        startIcon={<RestartAltIcon />}
        onClick={resetGame}
        sx={{ mb: 2 }}
      >
        Reiniciar Jogo
      </Button>

      <Typography
        variant="body2"
        sx={{ textAlign: "center", maxWidth: 400, color: "#666" }}
      >
        Use as setas do teclado ou os botões para mover. Colete alimentos
        saudáveis (🥗) e evite os não saudáveis (🍔). Chegue à linha de chegada
        (🏁) para vencer!
      </Typography>

      {/* Health Tip Dialog */}
      <Dialog open={showTip} onClose={() => setShowTip(false)}>
        <DialogTitle>💡 Dica de Saúde</DialogTitle>
        <DialogContent>
          <Typography>{currentTip}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTip(false)} variant="contained">
            Entendi!
          </Button>
        </DialogActions>
      </Dialog>

      {/* Win Dialog */}
      <Dialog open={gameWon} onClose={() => setGameWon(false)}>
        <DialogTitle>🎉 Parabéns!</DialogTitle>
        <DialogContent>
          <Typography>
            Você completou o labirinto! Pontuação final: {score} pontos.
            {itemsCollected > 0 &&
              ` Você coletou ${itemsCollected} itens saudáveis!`}
          </Typography>
          <Typography sx={{ mt: 2, fontWeight: "bold" }}>
            Lembre-se: Uma dieta equilibrada e exercícios regulares são
            fundamentais para manter a pressão arterial saudável!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetGame} variant="contained">
            Jogar Novamente
          </Button>
        </DialogActions>
      </Dialog>
    </GameContainer>
  );
};

export default BloodPressureMaze;
