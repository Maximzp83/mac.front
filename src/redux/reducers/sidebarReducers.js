// import * as types from '../constants';
import { 
	SIDEBAR_VISIBILITY_TOGGLE,
	SIDEBAR_VISIBILITY_SHOW,
	SIDEBAR_VISIBILITY_HIDE
} from '../constants';


const initialState = {
	isOpen: true,
	// isSticky: false
};

export default (state = initialState, actions) => {
	switch (actions.type) {
		case SIDEBAR_VISIBILITY_TOGGLE:
			return { ...state, isOpen: !state.isOpen };

		case SIDEBAR_VISIBILITY_SHOW:
			return { ...state, isOpen: true };

		case SIDEBAR_VISIBILITY_HIDE:
			return { ...state, isOpen: false };

		/*case types.SIDEBAR_STICKY_TOGGLE:
			return {
				...state,
				isSticky: !state.isSticky
			};
		case types.SIDEBAR_STICKY_ENABLE:
			return {
				...state,
				isSticky: true
			};*/
		/*case types.LAYOUT_BOXED_ENABLE:
		case types.LAYOUT_BOXED_TOGGLE:
		case types.SIDEBAR_STICKY_DISABLE:
			return {
				...state,
				isSticky: false
			};*/

		default:
			return state;
	}
}
