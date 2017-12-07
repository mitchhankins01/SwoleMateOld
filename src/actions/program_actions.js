import firebase from 'react-native-firebase';

// Various
export const UPDATE_SCREEN_INDEX = 'UPDATE_SCREEN_INDEX';
export const UPDATE_SELECTED_DAY_KEY = 'UPDATE_SELECTED_DAY_KEY';
// Fetch All Programs
export const FETCH_ALL_PROGRAMS = 'FETCH_ALL_PROGRAMS';
export const FETCH_ALL_PROGRAMS_FAILURE = 'FETCH_ALL_PROGRAMS_FAILURE';
export const FETCH_ALL_PROGRAMS_SUCCESS = 'FETCH_ALL_PROGRAMS_SUCCESS';
// Fetch All exercises
export const FETCH_ALL_EXERCISES = 'FETCH_ALL_EXERCISES';
export const FETCH_ALL_EXERCISES_FAILURE = 'FETCH_ALL_EXERCISES_FAILURE';
export const FETCH_ALL_EXERCISES_SUCCESS = 'FETCH_ALL_EXERCISES_SUCCESS';
// Fetch Program
export const FETCH_PROGRAM = 'FETCH_PROGRAM';
export const FETCH_PROGRAM_FAILURE = 'FETCH_PROGRAM_FAILURE';
export const FETCH_PROGRAM_SUCCESS = 'FETCH_PROGRAM_SUCCESS';
// Add New Program
export const ADD_PROGRAM = 'ADD_PROGRAM';
export const ADD_PROGRAM_FAILURE = 'ADD_PROGRAM_FAILURE';
// Add New Program Day
export const ADD_PROGRAM_DAY = 'ADD_PROGRAM_DAY';
export const ADD_PROGRAM_DAY_FAILURE = 'ADD_PROGRAM_DAY_FAILURE';
// Add New Program Exercise
export const ADD_PROGRAM_EXERCISE = 'ADD_PROGRAM_EXERCISE';
export const ADD_PROGRAM_EXERCISE_FAILURE = 'ADD_PROGRAM_EXERCISE_FAILURE';

// IMPLEMENT, move all exceptionals to one function to reduce clutter

// Various
export const updateScreenIndex = index => {
  return {
    payload: index,
    type: UPDATE_SCREEN_INDEX,
  };
};

export const updateSelectedDayKey = key => {
  return {
    payload: key,
    type: UPDATE_SELECTED_DAY_KEY,
  };
};

// Fetch All Programs
export const fetchAllPrograms = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_PROGRAMS });

    const uid = firebase.auth().currentUser.uid;
    const programs = [];

    firebase.firestore().collection('userPrograms').where('author', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(program => {
        const {
          author, frequency, description, level, name, type
        } = program.data();

        programs.push({
          type,
          name,
          level,
          author,
          program,
          frequency,
          description,
          key: program.id,
        });
      });
      fetchAllProgramsSuccess(dispatch, programs);
    })
    .catch(error => {
      fetchAllProgramsFailure(dispatch, error);
    });
  };
};

const fetchAllProgramsFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_ALL_PROGRAMS_FAILURE,
  });
};

const fetchAllProgramsSuccess = (dispatch, programs) => {
  dispatch({
    payload: programs,
    type: FETCH_ALL_PROGRAMS_SUCCESS,
  });
};

// Fetch All Exercises
export const fetchAllExercises = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_EXERCISES });

    const exercises = [];

    firebase.firestore().collection('exercises')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(exercise => {
        const {
          description, group, key, name
        } = exercise.data();

        exercises.push({
          key,
          name,
          group,
          description,
        });
      });
      fetchAllExercisesSuccess(dispatch, exercises);
    })
    .catch(error => {
      // IMPLEMENT, error is not coming through
      fetchAllExercisesFailure(dispatch, error);
    });
  };
};

const fetchAllExercisesFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_ALL_EXERCISES_FAILURE,
  });
};

const fetchAllExercisesSuccess = (dispatch, exercises) => {
  dispatch({
    payload: exercises,
    type: FETCH_ALL_EXERCISES_SUCCESS,
  });
};


// Fetch Program
export const fetchProgram = selectedProgram => {
  return (dispatch) => {
    dispatch({ type: FETCH_PROGRAM });

    const info = [];
    const days = [];
    const exercises = [];

    // Testing using onSnapshot
    // const uid = firebase.auth().currentUser.uid;
    // firebase.firestore().collection('users').doc(uid)
    // .onSnapshot(userDoc => {
    //   console.log(userDoc.data());
    // }, (error) => {
    //   console.log(error);
    // });

    // Get primaryProgram key and program details
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(uid).get()
    .then(userDoc => {
      const program = selectedProgram || userDoc.data().primaryProgram;

      const programRef = firebase.firestore()
        .collection('userPrograms').doc(program);

      programRef.get()
      .then(thisProgram => {
        const { author, frequency, description, level, name, type } = thisProgram.data();
        info.push({ author, frequency, description, level, name, type, key: thisProgram.id });
      })
      .catch(error => {
        fetchProgramFailure(dispatch, error);
      });

      programRef.collection('days').get()
      .then(querySnapshot => {
        querySnapshot.forEach(day => {
          const { author, description, key, name, primaryGroup, secondaryGroup } = day.data();
          days.push({ author, description, key, name, primaryGroup, secondaryGroup });
        });
      })
      .catch(error => {
        fetchProgramFailure(dispatch, error);
      });

      programRef.collection('exercises').get()
      .then(querySnapshot => {
        querySnapshot.forEach(details => {
          const { author, day, exerciseKey, key, reps, rest, sets } = details.data();
          exercises.push({
            day,
            key,
            reps,
            rest,
            sets,
            author,
            exerciseKey,
          });
        });
        fetchProgramSuccess(dispatch, info, days, exercises);
      })
      .catch(error => {
        fetchProgramFailure(dispatch, error);
      });
    })
    .catch(error => {
      fetchProgramFailure(dispatch, error);
    });
  };
};

const fetchProgramFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: FETCH_PROGRAM_FAILURE,
  });
};

const fetchProgramSuccess = (dispatch, info, days, exercises) => {
  dispatch({
    info,
    days,
    exercises,
    type: FETCH_PROGRAM_SUCCESS,
  });
};

// Add Program
export const addProgram = values => {
  return (dispatch) => {
    dispatch({ type: ADD_PROGRAM });

    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.firestore().collection('userPrograms');

    ref.add({
      author: uid,
      type: values.type,
      name: values.name,
      level: values.level,
      frequency: values.frequency,
      description: values.description,
    })
    .then(() => {
      dispatch(fetchAllPrograms());
    })
    .catch(error => {
      addProgramFailure(dispatch, error);
    });
  };
};

const addProgramFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: ADD_PROGRAM_FAILURE,
  });
};

// Add Program
export const addProgramDay = (values, programInfo) => {
  return (dispatch) => {
    dispatch({ type: ADD_PROGRAM_DAY });

    const programKey = programInfo[0].key;
    const uid = firebase.auth().currentUser.uid;

    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('days')
    .doc();

    ref.set({
      author: uid,
      key: ref.id,
      name: values.name,
      description: values.description,
      primaryGroup: values.primaryGroup,
      secondaryGroup: values.secondaryGroup,
    })
    .then(() => {
      fetchProgram();
    })
    .catch(error => {
      console.log(error.message);
      addProgramDayFailure(dispatch, error);
    });
  };
};

const addProgramDayFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: ADD_PROGRAM_DAY_FAILURE,
  });
};

// Add Program Exercise
export const addProgramExercise = (values, programInfo, selectedDayKey, selectedExerciseKey) => {
  return (dispatch) => {
    dispatch({ type: ADD_PROGRAM_EXERCISE });

    const programKey = programInfo[0].key;

    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('exercises')
    .doc();

    ref.set({
      author: uid,
      key: ref.id,
      sets: values.sets,
      reps: values.reps,
      rest: values.rest,
      day: selectedDayKey,
      exerciseKey: selectedExerciseKey,
    })
    .then(() => {
      fetchProgram();
    })
    .catch(error => {
      addProgramExerciseFailure(dispatch, error);
    });
  };
};

const addProgramExerciseFailure = (dispatch, error) => {
  dispatch({
    payload: error,
    type: ADD_PROGRAM_EXERCISE_FAILURE,
  });
};

// Delete
export const deleteProgram = deleteKey => {
  return (dispatch) => {
    firebase.firestore().collection('userPrograms').doc(deleteKey)
    .delete()
    .then(() => {
      dispatch(fetchAllPrograms());
    })
    .catch(error => {
      dispatch(fetchAllPrograms());
    });
  };
};

export const deleteProgramDay = (programInfo, deleteKey) => {
  return (dispatch) => {
    const programKey = programInfo[0].key;

    firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('days')
    .doc(deleteKey)
    .delete()
    .then(() => {
      dispatch(fetchProgram());
    })
    .catch(error => {
      dispatch(fetchProgram());
    });
  };
};

export const deleteProgramExercise = (programInfo, deleteKey) => {
  return (dispatch) => {
    const programKey = programInfo[0].key;

    firebase.firestore()
    .collection('userPrograms')
    .doc(programKey)
    .collection('exercises')
    .doc(deleteKey)
    .delete()
    .then(() => {
      dispatch(fetchProgram());
    })
    .catch(error => {
      dispatch(fetchProgram());
    });
  };
};
