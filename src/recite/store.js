import{ legacy_createStore} from"redux";
import Reducer from"./Reducer";
const store= legacy_createStore(Reducer)
export default store;
