import { createContext ,useReducer ,useEffect} from "react";
import profileReducer from "./profileReduce";

type User= {
  id: string;
  name: string;
  email: string;
  phone: string;
}
export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};
export type UserAction =
| {type:'FETCH_START'}
| {type:'FETCH_SUCCESS';payload:User}
| {type:'FETCH_FAILURE';error:string}
|{type:'CLEAR_USER'};


type profileContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
};
const profileContext = createContext<profileContextType | null>(null);
type Props = {
  children: React.ReactNode;
};
const initialUserState: UserState = {
  user: null,
  loading: false,
  error: null,
};



function ProfileProvider({ children }: Props) {


  const [state, dispatch] = useReducer(profileReducer, initialUserState);
 useEffect(()=>{
async function fetchUser() {
  try {
    dispatch({type:'FETCH_START'});
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    dispatch({ type: 'FETCH_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'FETCH_FAILURE', error: error });
  }
}

fetchUser();
 },[]);
   return( 
        <profileContext.Provider value={{state, dispatch }}>
            {children}
            </profileContext.Provider>
    )
} 
export { ProfileProvider,profileContext };
