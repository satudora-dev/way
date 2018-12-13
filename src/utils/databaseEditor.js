import { fireStore } from '../firebase';

import nowGroupList from '../components/nowGroupList';

export const addNowToUsers=()=>{
  let nowGroupMap = {};
  for (let i in nowGroupList) nowGroupMap[nowGroupList[i]] = false;

	let usersRef=fireStore.collection('users');
	usersRef.get().then(snapshot=>{
		snapshot.forEach(doc => {
			usersRef.doc(doc.id).update({nowGroup: nowGroupMap});
		});
	});
}