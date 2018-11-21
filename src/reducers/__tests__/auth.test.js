import authReducer from '../auth'



describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {noData: true}
    )
  })

  it('should handle SET_CURRENT_USER', () => {

    const inputValue0 = null
    const expectedState0 = {currentUserID: null}
    const inputValue1 = "TETE"
    const expectedState1 = {currentUserID: "TETE"}
    expect(
      authReducer([],{type: 'SET_CURRENT_USER',currentUserID: inputValue0})
    ).toEqual(expectedState0)

    expect(
      authReducer([],{type: 'SET_CURRENT_USER',currentUserID: inputValue1})
    ).toEqual(expectedState1)
  })
})
