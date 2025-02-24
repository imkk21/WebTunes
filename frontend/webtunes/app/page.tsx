import ProtectedRoute from "../lib/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <h1>Welcome to WebTunes!</h1>
    </ProtectedRoute>
  );
}