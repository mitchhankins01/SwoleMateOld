import firebase from 'react-native-firebase';

const AddWorkoutFB = (values, programId) => {
  let index = 0;

  const ref = firebase
    .firestore()
    .collection('userPrograms')
    .doc(programId)
    .collection('days');

  ref.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      index = 0;
    } else {
      querySnapshot.forEach((day) => {
        const data = day.data();
        if (data.index >= index) {
          index = Number(data.index) + 1;
        }
      });
    }

    const setRef = ref.doc();
    setRef
      .set({
        index,
        key: setRef.id,
        name: values.name,
        description: values.description,
        primaryGroup: values.primaryGroup,
        secondaryGroup: values.secondaryGroup,
        author: firebase.auth().currentUser.uid,
      })
      .then(() => {
        this.updateScreenIndex('selectedProgram');
      })
      .catch((error) => {
        this.error = error.message;
      });
  });
};

export { AddWorkoutFB };
