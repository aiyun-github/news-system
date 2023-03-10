export const LoadingReducer = (prevState = { isLoading: false }, action) => {
    let { type } = action
    switch(type) {
        case 'change_collapsed':
            let newsState = {...prevState}
            newsState.isLoading = !newsState.isLoading
            return newsState
        default:
            return prevState
    }
}