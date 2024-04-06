import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import { setLoggedUsers } from "./store/reducers/user";


const ENDPOINT = "http://127.0.0.1:4001";

export default function App() {
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const routing = useRoutes(routes(loggedUser));

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.emit("new loggedUser", (data) => {
      dispatch(setLoggedUsers(data));
    })

    socket.on("new login", (data) => {
      dispatch(setLoggedUsers(data));
    });

    socket.on("new Group", (data) => {
      dispatch(data);
    });

    socket.on("new Thread", (data) => {
      dispatch(data);
    });
  }, []);
  return (
    <>
      {routing}
    </>
  );
}