const firebasemock = require('firebase-mock');
const mockfirestore = new firebasemock.MockFirestore();

jest.mock('../../firebase', () => {
  return {
    fireStore: mockfirestore,
  };
});

const profileActions = require('../profile');

const dispatch = jest.fn();

describe('profile actions test', () => {
  it('editName test', () => {
    const expectedData0 = {
      Test: {
        given_en:'Test',
        family_en:'Mike'
      }
    };
    profileActions.editName(['Test','Mike'], 'Test')(dispatch);
    expect(mockfirestore.collection('users').flush().data).toEqual(expectedData0)
  })


  it('addTag, deleteTag test', () => {
    const expectedData1 = {
      Test: {
        given_en:'Test',
        family_en:'Mike',
        tags: {
          "_elements": ["TEST_TAG"],
          "methodName": "FieldValue.arrayUnion"
        }
      }
    };
    profileActions.addTag('TEST_TAG', 'Test')(dispatch);
    profileActions.addTag('TEST_TAG', 'Test')(dispatch);
    expect(mockfirestore.collection('users').flush().data).toEqual(expectedData1)

    const expectedData2 = {
      Test: {
        given_en:'Test',
        family_en:'Mike',
        tags: {
          "_elements": ["TEST_TAG"],
          "methodName": 'FieldValue.arrayRemove'
        }
      }
    };
    profileActions.deleteTag('TEST_TAG', 'Test')(dispatch);
    expect(mockfirestore.collection('users').flush().data).toEqual(expectedData2)
  })

  it('updatePosition, updateProjects test', () => {

    const expectedData3 = {
      Test: {
        given_en:'Test',
        family_en:'Mike',
        tags: {
          "_elements": ["TEST_TAG"],
          "methodName": 'FieldValue.arrayRemove'
        },
        position: 'アルバイト',
      }
    };
    profileActions.updatePosition('社員','アルバイト','Test')(dispatch);
    expect(mockfirestore.collection('users').flush().data).toEqual(expectedData3);
    // console.log(mockfirestore.collection('positions').flush().data)

    const expectedData4 = {
      Test: {
        given_en:'Test',
        family_en:'Mike',
        tags: {
          "_elements": ["TEST_TAG"],
          "methodName": 'FieldValue.arrayRemove'
        },
        position: 'アルバイト',
        projects: ['app', 'camera']
      }
    };
    profileActions.updateProjects(['app'],['app', 'camera'], 'Test')(dispatch)
    expect(mockfirestore.collection('users').flush().data).toEqual(expectedData4);
  })
})
