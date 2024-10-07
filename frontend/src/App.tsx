import BookIcon from "@mui/icons-material/Book";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Typography } from "@mui/material";
import { Link, Outlet } from "@tanstack/react-router";
import "./app.css";

export function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <nav
        style={{
          width: "240px",
          backgroundColor: "hsl(220, 35%, 97%)",
          borderRight: "1px solid hsla(220, 20%, 80%, 0.4)",
        }}
      >
        <Link to="/" activeProps={{ className: "active" }}>
          <SmartToyIcon /> <Typography variant="subtitle2">Bots</Typography>
        </Link>

        <Link to="/workers" activeProps={{ className: "active" }}>
          <PlumbingIcon /> <Typography variant="subtitle2">Workers</Typography>
        </Link>

        <Link to="/logs" activeProps={{ className: "active" }}>
          <BookIcon /> <Typography variant="subtitle2">Logs</Typography>
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
