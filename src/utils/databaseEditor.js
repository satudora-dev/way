import {fireStore} from '../firebase';

export const addNowToUsers=()=>{
	let nowGroupMap={office:false,eat:false};
	let usersRef=fireStore.collection('users');
	usersRef.get().then(snapshot=>{
		snapshot.forEach(doc => {
			usersRef.doc(doc.id).update({nowGroup: nowGroupMap});
		});
	});
}