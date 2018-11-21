import usersReducer from '../users'



describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(
      {noData: true}
    )
  })

  it('should handle RECEIVE_USERS_DATA', () => {

    const inputValue0 = {
      '-LMfORGHgxYDl25ca6V2': {
        family: "asano",
        given: "kohei",
        position: "アルバイト",
        projects: ["アプリ開発","コーポレートスタッフ"],
        tags: ["TRAVIS","尊師"],
        icon: "https:firebaseapp."
      }
    }
    const expectedState0 = {
      '-LMfORGHgxYDl25ca6V2': {
        family: "asano",
        given: "kohei",
        position: "アルバイト",
        projects: ["アプリ開発","コーポレートスタッフ"],
        tags: ["TRAVIS","尊師"],
        icon: "https:firebaseapp."
      }
    }
    const inputValue1 = {
      '-LMfORGHgxYDl25ca6V2': {
        family: "asano",
        given: "kohei",
        position: "アルバイト",
        projects: ["アプリ開発","コーポレートスタッフ"],
        tags: ["TRAVIS","尊師"],
        icon: "https:firebaseapp."
      },
      '-LMfORGHgxYDl25ca6V2': {
        family: "asano",
        given: "kohei",
        position: "アルバイト",
        projects: ["アプリ開発","コーポレートスタッフ"],
        tags: ["TRAVIS","尊師"],
        icon: "https:firebaseapp."
      }
    }
    const expectedState1={
      '-LMfORGHgxYDl25ca6V2': {
        family: "asano",
        given: "kohei",
        position: "アルバイト",
        projects: ["アプリ開発","コーポレートスタッフ"],
        tags: ["TRAVIS","尊師"],
        icon: "https:firebaseapp."
      },
      '-LMfORGHgxYDl25ca6V2': {
        family: "asano",
        given: "kohei",
        position: "アルバイト",
        projects: ["アプリ開発","コーポレートスタッフ"],
        tags: ["TRAVIS","尊師"],
        icon: "https:firebaseapp."
      }
    }
    expect(
      usersReducer([],{type: 'RECEIVE_USERS_DATA',data: inputValue0})
    ).toEqual(expectedState0)

    expect(
      usersReducer([],{type: 'RECEIVE_USERS_DATA',data: inputValue1})
    ).toEqual(expectedState1)
  })
})
