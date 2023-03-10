export const LoadingReducer = (prevState = { isLoading: false }, action) => {
    let { type } = action
    switch(type) {
        case 'change_loading':
            let newsState = {...prevState}
            newsState.isLoading = !newsState.isLoading
            return newsState
        default:
            return prevState
    }
}