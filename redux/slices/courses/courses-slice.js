import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicCourses: [],
  coursesDependOnSubject: [],
  userData: null,
  subjectCourses: null,
  instructorCourses: null,
  userCourses: null,
  createCourseData: null,
  updateCourseData: null,
  detailCourse: null,
  sectionData: null,
  sectionsData: [],
  userSectionsData: [],
  updateSectionData: null,
  sectionContent: [],
  getsectionContent: {},
  getusersectionContent: {},
  lectureDeleted: null,
  lectureUpdated: null,
  transcriptdate: null,
  summarizeData: null,
  isEnrolled: null,
  transcriptVideoData: null,
  questionGenerationData: null,
  courseDetaile: null,
  questionAnswer: null,
};

const subjectCourseReducer = (state, action) => {
  return {
    ...state,
    subjectCourses: action.payload,
  };
};
const subjectCourseFailReducer = (state) => {
  return {
    ...state,
    subjectCourses: null,
  };
};

const getInstructorCoursesReducer = (state, action) => {
  return {
    ...state,
    instructorCourses: action.payload,
  };
};
const getInstructorCoursesFailReducer = (state) => {
  return {
    ...state,
    instructorCourses: null,
  };
};
const updateUserDataReducer = (state, action) => {
  return {
    ...state,
    userData: action.payload,
  };
};
const updateUserDataFailReducer = (state) => {
  return {
    ...state,
    userData: null,
  };
};
const detailCourseReducer = (state, action) => {
  return {
    ...state,
    detailCourse: action.payload,
  };
};
const detailCourseFailReducer = (state) => {
  return {
    ...state,
    detailCourse: null,
  };
};
const createSectionFailReducer = (state) => {
  return {
    ...state,
    sectionData: null,
  };
};
const getSectionsReducer = (state, action) => {
  return {
    ...state,
    sectionsData: action.payload,
  };
};
const getSectionsFailReducer = (state) => {
  return {
    ...state,
    sectionsData: [],
  };
};
const getUserSectionsReducer = (state, action) => {
  return {
    ...state,
    userSectionsData: action.payload,
  };
};
const getUserSectionsFailReducer = (state) => {
  return {
    ...state,
    userSectionsData: [],
  };
};
const updateSectionReducer = (state, action) => {
  return {
    ...state,
    updateSectionData: action.payload,
  };
};
const updateSectionFailReducer = (state) => {
  return {
    ...state,
    updateSectionData: null,
  };
};
const createContentReducer = (state, action) => {
  return {
    ...state,
    sectionContent: action.payload,
  };
};
const createContentFailReducer = (state) => {
  return {
    ...state,
    sectionContent: [],
  };
};
const getSectionContentReducer = (state = initialState, action) => {
  const { slug, content } = action.payload;
  return {
    ...state,
    getsectionContent: {
      ...state.getsectionContent,
      [slug]: [...content],
    },
  };
};

const getSectionContentFailReducer = (state = initialState, action) => {
  const { slug } = action.payload;
  return {
    ...state,
    getsectionContent: {
      ...state.getsectionContent,
      [slug]: [],
    },
  };
};

const getUserSectionContentReducer = (state = initialState, action) => {
  const { slug, content } = action.payload;
  return {
    ...state,
    getusersectionContent: {
      ...state.getusersectionContent,
      [slug]: [...content],
    },
  };
};

const getUserSectionContentFailReducer = (state = initialState, action) => {
  const { slug } = action.payload;
  return {
    ...state,
    getusersectionContent: {
      ...state.getusersectionContent,
      [slug]: [],
    },
  };
};

const deleteLectureReducer = (state, action) => {
  return {
    ...state,
    lectureDeleted: action.payload,
  };
};
const deleteLectureFailReducer = (state) => {
  return {
    ...state,
    lectureDeleted: null,
  };
};
const updateLectureReducer = (state, action) => {
  return {
    ...state,
    lectureUpdated: action.payload,
  };
};
const updateLectureFailReducer = (state) => {
  return {
    ...state,
    lectureUpdated: null,
  };
};
const getTranscriptReducer = (state, action) => {
  return {
    ...state,
    transcriptdate: action.payload,
  };
};
const getTranscriptFailReducer = (state) => {
  return {
    ...state,
    transcriptdate: null,
  };
};
const summarizeReducer = (state, action) => {
  return {
    ...state,
    summarizeData: action.payload,
  };
};
const summarizeFailReducer = (state) => {
  return {
    ...state,
    summarizeData: null,
  };
};

const getUserCoursesReducer = (state, action) => {
  return {
    ...state,
    userCourses: action.payload,
  };
};
const getUserCoursesFailReducer = (state) => {
  return {
    ...state,
    userCourses: null,
  };
};
const enrollCourseReducer = (state, action) => {
  return {
    ...state,
    isEnrolled: action.payload,
  };
};
const enrollCourseFailReducer = (state) => {
  return {
    ...state,
    isEnrolled: null,
  };
};
const getTranscriptVideoReducer = (state, action) => {
  return {
    ...state,
    transcriptVideoData: action.payload,
  };
};
const getTranscriptVideoFailReducer = (state) => {
  return {
    ...state,
    transcriptVideoData: null,
  };
};
const questionGenerationReducer = (state, action) => {
  return {
    ...state,
    questionGenerationData: action.payload,
  };
};
const questionGenerationFailReducer = (state) => {
  return {
    ...state,
    questionGenerationData: null,
  };
};
const getCourseDetaileReducer = (state, action) => {
  return {
    ...state,
    courseDetaile: action.payload,
  };
};
const getCourseDetaileFailReducer = (state) => {
  return {
    ...state,
    courseDetaile: null,
  };
};
const getAnswerQuestionReducer = (state, action) => {
  return {
    ...state,
    questionAnswer: action.payload,
  };
};
const getAnswerQuestionFailReducer = (state) => {
  return {
    ...state,
    questionAnswer: null,
  };
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    GETSUBJECTCOURSES_SUCCESS: subjectCourseReducer,
    GETSUBJECTCOURSES_FAIL: subjectCourseFailReducer,
    GETINSTRUCTORCOURSES_SUCCESS: getInstructorCoursesReducer,
    GETINSTRUCTORCOURSES_FAIL: getInstructorCoursesFailReducer,
    UPDATEUSERDATA_SUCCESS: updateUserDataReducer,
    UPDATEUSERDATA_FAIL: updateUserDataFailReducer,
    DETAILCOURSE_SUCCESS: detailCourseReducer,
    DETAILCOURSE_FAIL: detailCourseFailReducer,
    CREATESECTION_FAIL: createSectionFailReducer,
    GETSECTIONS_SUCCESS: getSectionsReducer,
    GETSECTIONS_FAIL: getSectionsFailReducer,
    GETUSERSECTIONS_SUCCESS: getUserSectionsReducer,
    GETUSERSECTIONS_FAIL: getUserSectionsFailReducer,
    UPDATESECTION_SUCCESS: updateSectionReducer,
    UPDATESECTION_FAIL: updateSectionFailReducer,
    CREATECONTENT_SUCCESS: createContentReducer,
    CREATECONTENT_FAIL: createContentFailReducer,
    GETCONTENTS_SUCCESS: getSectionContentReducer,
    GETCONTENTS_FAIL: getSectionContentFailReducer,
    GETUSERCONTENTS_SUCCESS: getUserSectionContentReducer,
    GETUSERCONTENTS_FAIL: getUserSectionContentFailReducer,
    DELETELECTURE_SUCCESS: deleteLectureReducer,
    DELETELECTURE_FAIL: deleteLectureFailReducer,
    UPDATELECTURE_SUCCESS: updateLectureReducer,
    UPDATELECTURE_FAIL: updateLectureFailReducer,
    GETTRANSCRIPTSECTION_SUCCESS: getTranscriptReducer,
    GETTRANSCRIPTSECTION_FAIL: getTranscriptFailReducer,
    SUMMARIZE_SUCCESS: summarizeReducer,
    SUMMARIZE_FAIL: summarizeFailReducer,
    GETUSERCOURSES_SUCCESS: getUserCoursesReducer,
    GETUSERCOURSES_FAIL: getUserCoursesFailReducer,
    ENROLLCOURSE_SUCCESS: enrollCourseReducer,
    ENROLLCOURSE_FAIL: enrollCourseFailReducer,
    GETTRANSCRIPTVIDEO_SUCCESS: getTranscriptVideoReducer,
    GETTRANSCRIPTVIDEO_FAIL: getTranscriptVideoFailReducer,
    QUESTIONGENERATION_SUCCESS: questionGenerationReducer,
    QUESTIONGENERATION_FAIL: questionGenerationFailReducer,
    GETCOURSEDETAILES_SUCCESS: getCourseDetaileReducer,
    GETCOURSEDETAILES_FAIL: getCourseDetaileFailReducer,
    CHATBOT_SUCCESS: getAnswerQuestionReducer,
    CHATBOT_FAIL: getAnswerQuestionFailReducer,
    setPublicCourses(state, action) {
      state.publicCourses = action.payload;
    },
    setCoursesDependOnSubject(state, action) {
      state.coursesDependOnSubject = action.payload;
    },
  },
});

export const {
  GETSUBJECTCOURSES_SUCCESS,
  GETSUBJECTCOURSES_FAIL,
  GETINSTRUCTORCOURSES_SUCCESS,
  GETINSTRUCTORCOURSES_FAIL,
  UPDATEUSERDATA_SUCCESS,
  UPDATEUSERDATA_FAIL,
  CREATECOURSE_SUCCESS,
  CREATECOURSE_FAIL,
  UPDATECOURSE_SUCCESS,
  UPDATECOURSE_FAIL,
  DETAILCOURSE_SUCCESS,
  DETAILCOURSE_FAIL,
  CREATESECTION_FAIL,
  GETSECTIONS_SUCCESS,
  GETSECTIONS_FAIL,
  UPDATESECTION_SUCCESS,
  UPDATESECTION_FAIL,
  CREATECONTENT_SUCCESS,
  CREATECONTENT_FAIL,
  GETCONTENTS_SUCCESS,
  GETCONTENTS_FAIL,
  DELETELECTURE_SUCCESS,
  DELETELECTURE_FAIL,
  UPDATELECTURE_SUCCESS,
  UPDATELECTURE_FAIL,
  GETTRANSCRIPTSECTION_SUCCESS,
  GETTRANSCRIPTSECTION_FAIL,
  SUMMARIZE_SUCCESS,
  SUMMARIZE_FAIL,
  setPublicCourses,
  setCoursesDependOnSubject,
  GETUSERCOURSES_SUCCESS,
  GETUSERCOURSES_FAIL,
  GETUSERSECTIONS_SUCCESS,
  GETUSERSECTIONS_FAIL,
  GETUSERCONTENTS_SUCCESS,
  GETUSERCONTENTS_FAIL,
  ENROLLCOURSE_SUCCESS,
  ENROLLCOURSE_FAIL,
  GETTRANSCRIPTVIDEO_SUCCESS,
  GETTRANSCRIPTVIDEO_FAIL,
  QUESTIONGENERATION_SUCCESS,
  QUESTIONGENERATION_FAIL,
  GETCOURSEDETAILES_SUCCESS,
  GETCOURSEDETAILES_FAIL,
  CHATBOT_SUCCESS,
  CHATBOT_FAIL,
} = courseSlice.actions;

export default courseSlice.reducer;
