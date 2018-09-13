import { userService } from '../_services/';

const initialState = {
    anchor: 'left',
    census: [],
    table_columns: [],
    demographic_filter: []
};


export function census(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_CENSUS_BY_FILTER':
            let column_headers = Object.keys(action.census[0]);
            let table_columns = []
            column_headers.forEach(function (element) {
                table_columns.push(userService.humanizeKey(element))
            });
            return {
                ...state,
                census: action.census,
                table_columns: table_columns
            };
        case 'FETECHED_CENSUS_DEMOGRAPHIC_FILTERS':
            return {
                ...state,
                demographic_filter: action.demographic_filter
            };

        default:
            return state
    }
}


