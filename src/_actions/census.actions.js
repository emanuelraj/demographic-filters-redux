import { userService } from '../_services/';

export const censusAction = {
    getCensusByFilter,
    getFilters
};

function getCensusByFilter(queryParams) {
    return dispatch => {
        if (queryParams) {
            queryParams = 'group_by="' + queryParams + '"';
        } else {
            queryParams = '';
        }

        let apiEndpoint = 'census?' + queryParams;
        userService.get(apiEndpoint)
            .then((response) => {
                console.log(response.data.data);
                dispatch(changeCensusList(response.data.data));
            }).catch((err) => {
                console.log("Error");
                console.log(err);
            })
    };
}

function getFilters() {
    return dispatch => {
        let apiEndpoint = 'census/demographics';
        userService.get(apiEndpoint)
            .then((response) => {
                console.log(response.data.data);
                dispatch(filterList(response.data.data));
                dispatch(censusAction.getCensusByFilter(response.data.data[0]));
            }).catch((err) => {
                console.log("Error");
                console.log(err);
            })
    };
}

export function changeCensusList(census) {
    return {
        type: "FETECHED_CENSUS_BY_FILTER",
        census: census
    }
}

export function filterList(demographic_filter) {
    return {
        type: "FETECHED_CENSUS_DEMOGRAPHIC_FILTERS",
        demographic_filter: demographic_filter
    }
}