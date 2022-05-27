import { combineReducers } from "redux";
import { createStore } from "redux";

const initialState = { data: null };

const PanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_data":
      return {
        ...action.data,
      };

    default:
      return state;
  }
};
const MenubarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "editMenu":
      return {
        ...action.data,
      };

    default:
      return state;
  }
};

const AddEntityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addentity":
      return {
        ...action.data,
      };

    default:
      return state;
  }
};

const PageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "page":
      return {
        ...action.data,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  panel: PanelReducer,
  menubar: MenubarReducer,
  addentity: AddEntityReducer,
  pagereducer: PageReducer,
});

const store = createStore(rootReducer);

export default store;
