import usersReducer from './users'



describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(
      {noData: true}
    )
  })

  it('should handle RECEIVE_USERS_DATA', () => {
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
      usersReducer([],
        {
          type: 'RECEIVE_USERS_DATA',data: {
            "-LMfORGHgxYDl25ca6V2" : {
              "family" : "asano" ,
              "given" : "kohei" ,
              "icon" : "https:firebaseapp." ,
              "position" : "アルバイト" ,
              "projects" : {
                "アプリ開発" : true ,
                "コーポレートスタッフ" : true ,
              },
              "mei" : "あさの",
              "sei" : "こうへい",
              "tags" : {
                "TRAVIS" : "USER_KEY" ,
                "尊師" : "USER_KEY"
              }
            }
          }
        }
      )
    ).toEqual(expectedState0)

    expect(
      usersReducer([],{
        type: 'RECEIVE_USERS_DATA',
        data: {
          "-LMfORGHgxYDl25ca6V2" : {
            "family" : "asano" ,
            "given" : "kohei" ,
            "icon" : "https:firebaseapp." ,
            "position" : "アルバイト" ,
            "projects" : {
              "アプリ開発" : true ,
              "コーポレートスタッフ" : true ,
            },
            "mei" : "あさの",
            "sei" : "こうへい",
            "tags" : {
              "TRAVIS" : "USER_KEY" ,
              "尊師" : "USER_KEY"
            }
          },
          "-LMfORGHgxYDl25ca6V2" : {
            "family" : "asano" ,
            "given" : "kohei" ,
            "icon" : "https:firebaseapp." ,
            "position" : "アルバイト" ,
            "projects" : {
              "アプリ開発" : true ,
              "コーポレートスタッフ" : true ,
            },
            "mei" : "あさの",
            "sei" : "こうへい",
            "tags" : {
              "TRAVIS" : "USER_KEY" ,
              "尊師" : "USER_KEY"
            }
          }
        }
      })
    ).toEqual(expectedState1)
  })
})
