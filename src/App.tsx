import { AuthProvider } from "./context/AuthContext";
import { UsersProvider } from "./context/UsersContext";
import { TutelasProvider } from "./context/TutelasContext";
import AppRouter from "./router/AppRouter";
import ToastHost from "./components/ui/ToastHost";

export default function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <TutelasProvider>
          <AppRouter />
          <ToastHost />
        </TutelasProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
