import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import Login from "../components/login/Login";
import Loading from "../components/loading/Loading";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoUrl: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
