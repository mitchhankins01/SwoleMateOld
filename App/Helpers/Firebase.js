import firebase from 'react-native-firebase';

const ToggleDown = (days, programId, item, exercises, dayKey) => {
  switch (item.type) {
    default:
      return;
    case 'workout': {
      if (item.index >= days.length - 1) return;
      const target = item;
      const subTarget = days[target.index + 1];
      const targetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('days')
        .doc(target.key);
      const subTargetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('days')
        .doc(subTarget.key);

      targetRef
        .update({
          index: Number(target.index) + 1,
        })
        .catch((error) => {
          this.error = error.message;
        });

      subTargetRef
        .update({
          index: Number(target.index),
        })
        .catch((error) => {
          this.error = error.message;
        });
      break;
    }
    case 'exercise': {
      const filteredExercises = exercises.filter(exercise => exercise.day === dayKey);
      if (item.index >= filteredExercises.length - 1) return;
      const target = item;
      const subTarget = filteredExercises[target.index + 1];
      const targetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('exercises')
        .doc(target.key);
      const subTargetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('exercises')
        .doc(subTarget.key);

      targetRef
        .update({
          index: Number(target.index) + 1,
        })
        .catch((error) => {
          this.error = error.message;
        });

      subTargetRef
        .update({
          index: Number(target.index),
        })
        .catch((error) => {
          this.error = error.message;
        });
      break;
    }
  }
};

const ToggleUp = (days, programId, item, exercises, dayKey) => {
  if (item.index === 0) return;
  switch (item.type) {
    default:
      return;
    case 'workout': {
      const target = item;
      const subTarget = days[target.index - 1];
      const targetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('days')
        .doc(target.key);
      const subTargetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('days')
        .doc(subTarget.key);
      targetRef
        .update({
          index: Number(target.index) - 1,
        })
        .catch((error) => {
          this.error = error.message;
        });
      subTargetRef
        .update({
          index: Number(target.index),
        })
        .catch((error) => {
          this.error = error.message;
        });
      break;
    }
    case 'exercise': {
      const target = item;
      const filteredExercises = exercises.filter(exercise => exercise.day === dayKey);
      const subTarget = filteredExercises[target.index - 1];
      const targetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('exercises')
        .doc(target.key);
      const subTargetRef = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('exercises')
        .doc(subTarget.key);

      targetRef
        .update({
          index: Number(target.index) - 1,
        })
        .catch((error) => {
          this.error = error.message;
        });

      subTargetRef
        .update({
          index: Number(target.index),
        })
        .catch((error) => {
          this.error = error.message;
        });
      break;
    }
  }
};

const EditWorkoutFB = (values, programId, item) => {
  const ref = firebase
    .firestore()
    .collection('userPrograms')
    .doc(programId)
    .collection('days')
    .doc(item.key);

  ref
    .update({
      name: values.name,
      description: values.description,
      primaryGroup: values.primaryGroup,
      secondaryGroup: values.secondaryGroup,
      author: firebase.auth().currentUser.uid,
    })
    .then(() => {})
    .catch((error) => {
      this.error = error.message;
    });
};
const EditExerciseFB = (values, programId, dayKey, exerciseId, item) => {
  const ref = firebase
    .firestore()
    .collection('userPrograms')
    .doc(programId)
    .collection('exercises')
    .doc(item.key);

  ref
    .update({
      reps: values.reps,
      sets: values.sets,
      rest: values.rest,
    })
    .then(() => {})
    .catch((error) => {
      this.error = error.message;
    });
};

const DeleteFB = (programId, dayKey, type, key) => {
  switch (type) {
    default:
      return;
    case 'workout': {
      const ref = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('days');
      // delete and fix indices other days
      ref
        .doc(key)
        .delete()
        .then(() => {
          ref
            .orderBy('index')
            .get()
            .then((querySnapshot) => {
              querySnapshot.docChanges.forEach((updateDay) => {
                const updateRef = updateDay.doc.ref.path;
                firebase
                  .firestore()
                  .doc(updateRef)
                  .update({ index: updateDay.newIndex });
              });
            });
        })
        .catch((error) => {
          this.error = error.message;
        });
      break;
    }
    case 'exercise': {
      const ref = firebase
        .firestore()
        .collection('userPrograms')
        .doc(programId)
        .collection('exercises');

      // delete and fix indices
      ref
        .doc(key)
        .delete()
        .then(() => {
          ref
            .orderBy('index')
            .get()
            .then((querySnapshot) => {
              querySnapshot.docChanges.forEach((updateExercise) => {
                if (updateExercise.doc.data().day !== programId) return;
                const updateRef = updateExercise.doc.ref.path;
                firebase
                  .firestore()
                  .doc(updateRef)
                  .update({ index: updateExercise.newIndex });
              });
            });
        })
        .catch((error) => {
          this.error = error.message;
        });
    }
  }
};

const AddExerciseFB = (values, programId, dayKey, exerciseId) => {
  let index = 0;

  const ref = firebase
    .firestore()
    .collection('userPrograms')
    .doc(programId)
    .collection('exercises');

  ref.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      index = 0;
    } else {
      querySnapshot.forEach((exercise) => {
        const data = exercise.data();
        if (data.day !== dayKey) return;
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
        sets: values.sets,
        reps: values.reps,
        rest: values.rest,
        day: dayKey,
        exerciseKey: exerciseId,
        author: firebase.auth().currentUser.uid,
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  });
};

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

export {
  AddWorkoutFB,
  AddExerciseFB,
  DeleteFB,
  EditWorkoutFB,
  EditExerciseFB,
  ToggleUp,
  ToggleDown,
};
