import PropTypes from "prop-types";
import {
  faCircleInfo,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultImage from "../../../assets/images/Instructor/thumbnail.webp";
import Dropdown from "../../../shared/Dropdown";
import { closeModal } from "../../../redux/slices/Instructor/OpenClose";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import ImageFileUploader from "../../../shared/Inputs/ImageFileUploader";
import BlurModal from "../../../shared/BlurModal";
import {
  createCourse,
  updateCourse,
} from "../../../redux/actions/courses-methods";
import { setIsSpinnerLoading } from "../../../redux/slices/popups-slices/spinner-slice";

const CreateNewCourse = React.memo(({ instructorCourseDetails: course }) => {
  const categories = useSelector((state) => state.courses.subjectCourses);
  const access = useSelector((state) => state.userAuth.access);
  const spinner = useSelector((state) => state.spinner);
  const dispatch = useDispatch();

  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [missingError, setMissingError] = useState(false);

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef(0);

  useEffect(() => {
    if (course) {
      setThumbnail(course.image || "");
      setImage(course.image || "");
      const category = categories.find((cat) => cat.title === course.subject);
      setSelectedCategoryId(category ? category.id : null);
      titleRef.current.value = course.title || "";
      descriptionRef.current.value = course.overview || "";
      priceRef.current.value = course.price || 0;
    }
  }, [course, categories]);

  const handleSelectedSubject = (selectedOption) => {
    const selectedSubject = categories.find(
      (item) => item.title === selectedOption
    );
    setSelectedCategoryId(selectedSubject ? selectedSubject.id : null);
  };

  const handleDeleteThumbnail = () => {
    setImage("");
    setThumbnail("");
  };

  const handleCloseCreateCourse = () => {
    dispatch(closeModal());
  };

  const handleUploadedImage = (file) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setThumbnail(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSavingCourseInformation = async () => {
    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const price = +priceRef.current.value;

    if (!title || !price || !description || (!selectedCategoryId && !course)) {
      setMissingError(true);
      return;
    }

    setMissingError(false);
    dispatch(setIsSpinnerLoading(true));

    if (!course) {
      await createCourse(
        dispatch,
        access,
        selectedCategoryId,
        title,
        description,
        price,
        image
      );
    } else {
      const imageChanged = course.image !== thumbnail;
      await updateCourse(
        dispatch,
        access,
        course.slug,
        selectedCategoryId,
        title,
        description,
        price,
        imageChanged ? image : undefined
      );
    }

    handleCloseCreateCourse();
    dispatch(setIsSpinnerLoading(false));
  };

  const labelClasses = "block mb-1 text-sm lg:text-base lg:font-semibold";
  const inputClasses =
    "p-2 text-base rounded-sm w-full mb-2 outline-none caret-indigo-800 border border-black border-opacity-80";

  return (
    <>
      <BlurModal />
      <div className="lg:w-[70vw] w-[95vw] h-[75vh] lg:h-[70vh] overflow-y-scroll z-30 bg-white rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl">
        <div className="flex items-center w-full px-4 py-4 bg-green-400 rounded-t-lg">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold lg:text-2xl text-indigo-950">
              Course Info
            </h2>
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-blue-500 h-9 w-9"
            />
          </div>
          <button
            onClick={handleCloseCreateCourse}
            className="p-1 ml-auto text-base font-semibold tracking-tight duration-300 rounded-lg md:p-2 bg-zinc-300 hover:bg-zinc-400"
          >
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 py-4 lg:gap-10 lg:py-10 lg:px-20 lg:grid-cols-2">
          <div className="flex flex-col items-start justify-between gap-6">
            <div className="w-full md:flex md:items-center md:justify-between lg:block">
              <img
                src={thumbnail || defaultImage}
                alt="course thumbnail"
                className="h-48 mx-auto border border-black border-opacity-50 w-80 lg:w-3/4"
              />
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 lg:mt-10 lg:justify-between">
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="flex items-center gap-2 p-2 text-base font-semibold uppercase duration-300 border border-black rounded-lg cursor-pointer bg-zinc-300 hover:bg-zinc-400 border-opacity-80"
                  >
                    <FontAwesomeIcon icon={faUpload} />
                    Upload Thumbnail
                  </label>
                  <ImageFileUploader
                    name="thumbnail"
                    getImage={handleUploadedImage}
                  />
                </div>
                <div
                  onClick={handleDeleteThumbnail}
                  className={`relative py-1 px-4 duration-300 rounded-full cursor-pointer ${
                    thumbnail
                      ? "bg-red-800 hover:bg-red-900 pr-10"
                      : "bg-zinc-800 hover:bg-zinc-900 pl-10"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className={`absolute duration-300 top-0 p-2 bg-white rounded-full ${
                      thumbnail
                        ? "text-red-800 left-3/4"
                        : "text-zinc-800 -left-1"
                    }`}
                  />
                  <span className="text-base font-semibold tracking-tight text-white">
                    Delete
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 lg:items-end">
              <button
                disabled={spinner.isSpinnerLoading}
                onClick={handleSavingCourseInformation}
                className={`px-6 py-2 text-lg font-semibold tracking-tight text-white duration-300 rounded-lg ${
                  missingError && !spinner.isSpinnerLoading
                    ? "bg-red-900 hover:bg-red-800"
                    : "bg-stone-900"
                } ${
                  spinner.isSpinnerLoading &&
                  "bg-gray-600 text-gray-700 cursor-not-allowed"
                }`}
              >
                Save
              </button>
              {missingError && (
                <span className="text-sm italic text-red-700 capitalize">
                  incomplete information
                </span>
              )}
            </div>
          </div>
          <div>
            <div>
              <p className={`${labelClasses} -mb-2`}>Categories: </p>
              {categories && (
                <Dropdown
                  options={categories.map((item) => item.title)}
                  getSelectedOption={handleSelectedSubject}
                  label="Select a subject"
                  modifiedCourseSubject={course ? course.subject : null}
                />
              )}
            </div>
            <div>
              <label htmlFor="title" className={labelClasses}>
                Title:
              </label>
              <input
                type="text"
                ref={titleRef}
                id="title"
                name="title"
                className={`${inputClasses} lg:font-bold`}
              />
            </div>
            <div>
              <label htmlFor="description" className={labelClasses}>
                Description:
              </label>
              <textarea
                ref={descriptionRef}
                name="description"
                id="description"
                cols="30"
                rows="5"
                className={`${inputClasses} resize-none`}
              />
            </div>
            <div className="relative">
              <label htmlFor="price" className={labelClasses}>
                Price:
              </label>
              <span className="absolute text-2xl font-bold select-none top-7 lg:top-8 left-2">
                $
              </span>
              <input
                type="number"
                ref={priceRef}
                id="price"
                name="price"
                min={0}
                className={`${inputClasses} font-semibold pl-6`}
              />
              <p className="text-xs font-medium opacity-50 lg:mt-2">
                Note: Dealing only in US dollars
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

CreateNewCourse.displayName = "CreateNewCourse";

CreateNewCourse.propTypes = {
  instructorCourseDetails: PropTypes.object,
};

export default CreateNewCourse;
