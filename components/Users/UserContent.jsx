import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ebook from "../../assets/images/Instructor/ebook.gif";
import AIAssistantImage from "../../assets/images/homepage/bot.png"; // Replace with your actual image file

import {
  faGraduationCap,
  faClock,
  faFileAlt,
  faImage,
  faVideo,
  faChevronUp,
  faChevronDown,
  faDownload, // Import the faDownload icon
  faFont
} from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "../../shared/VideoPlayer";
import ImageViewer from "../../shared/ImageViewer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getUserContents,
  getUserSections,
} from "../../redux/actions/courses-methods";
import { setIsSpinnerLoading } from "../../redux/slices/popups-slices/spinner-slice";
import MarkdownRenderer from "../../pages/Instructor/MarkdownRenderer";

const SectionHeader = ({ sectionTitle, onClick, isOpen }) => {
  return (
    <div
      className="flex items-center content-center justify-between bg-sky-950"
     
    >
      <div className="flex justify-between w-full py-3 md:space-x-60 md:px-6">
        <div className="font-semibold text-white">{sectionTitle}</div>
        <div className="ml-2 text-white cursor-pointer">
          <FontAwesomeIcon onClick={onClick} icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
      </div>
    </div>
  );
};

const SectionContent = ({ dispatch, access, slug, onSelect, isOpen, selectedContentUrl }) => {
  const sectionData = useSelector(
    (state) => state.courses.getusersectionContent[slug] || []
  );
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    const fetchUserContents = async () => {
      if (!access) {
        return;
      }
      dispatch(setIsSpinnerLoading(true));

      await getUserContents(dispatch, access, slug);

      dispatch(setIsSpinnerLoading(false));
    };

    fetchUserContents();
  }, [dispatch, access, slug]);

  useEffect(() => {
    if (sectionData !== lectures) {
      setLectures(sectionData);
    }
  }, [sectionData, lectures]);

  const renderIcon = (type) => {
    switch (type) {
      case "video":
        return [faVideo];
      case "image":
        return [faImage];
      case "file":
        return [faFileAlt, faDownload];
      default:
        return [faFont, faDownload];
    }
  };

  const renderTitle = (item) => {
    if (item.video) return item.video.title;
    if (item.image) return item.image.title;
    if (item.file) return item.file.title;
    return item.text.title;
  };

  const handleClick = (item) => {
    if (item.video) {
      onSelect("video", item.video.file);
    } else if (item.image) {
      onSelect("image", item.image.file);
    } else if (item.text) {
      onSelect("text", item.text.content);
    } else {
      onSelect("file", item.file.file);
    }
  };

  return (
    <div
      className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      {lectures.map((item, index) => (
        <div
          className="relative pt-2 bg-white shadow-lg "
          key={index}
        >
          <ul className="space-y-1">
            {Object.keys(item).map((key) => (
              <li
                className="relative border-b border-b-sky-950 border-opacity-80"
                key={key}
              >
                <div className="">
                  <div
                    className="cursor-pointer pl-14"
                    onClick={() => handleClick(item)}
                  >
                    <FontAwesomeIcon
                      icon={renderIcon(key)[0]}
                      className="absolute w-6 h-6 text-black transform -translate-y-1/2 left-3 top-1/2"
                    />

                    <div className="flex items-center space-x-10 ">
                      <div className="w-full py-2 focus:outline-none bg-white rounded-[1px] text-black/opacity-80 text-lg font-medium font-['Outfit']">
                        {renderTitle(item)}
                      </div>
                      <a href={selectedContentUrl} download>
                        <FontAwesomeIcon
                          icon={renderIcon(key)[1]}
                          className="w-6 h-6 mt-3 mr-5 transform -translate-y-1/2 text-primary-500 left-3 top-1/2"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


const UserContent = () => {
  const dispatch = useDispatch();
  const access = useSelector((state) => state.userAuth.access);
  const usercourse = useSelector((state) => state.courses.userSectionsData) || [];
  const slug = useParams();
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedContentUrl, setSelectedContentUrl] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [userSections, setUserSections] = useState(usercourse);
  const courseDetaile = useSelector((state) => state.courses.courseDetaile);
  const [courseData, setCourseData] = useState(courseDetaile || []);

  useEffect(() => {
    const fetchUserSections = async () => {
      dispatch(setIsSpinnerLoading(true));
      await getUserSections(dispatch, access, slug.slug);
      dispatch(setIsSpinnerLoading(false));
    };
    fetchUserSections();
  }, [access, dispatch, slug.slug]);

  useEffect(() => {
    setUserSections(usercourse || []);
  }, [usercourse]);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const handleSelectContent = (type, url) => {
    setSelectedContent(type);
    setSelectedContentUrl(url);
  };

  const renderSelectedContent = () => {
    if (!selectedContent) return null;
    switch (selectedContent) {
      case "video":
        return (
          <VideoPlayer
            url={selectedContentUrl}
            onClose={() => setSelectedContent(null)}
          />
        );
      case "image":
        return (
          <ImageViewer
            url={selectedContentUrl}
            onClose={() => setSelectedContent(null)}
          />
        );
      case "text":
        return <MarkdownRenderer markdownData={selectedContentUrl} />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="p-10 bg-[#004682] text-white mt-20">
        <h1 className="text-2xl font-bold">{courseData.title}</h1>
        <p>{courseData.overview}</p>
        <p className="mt-4 mb-2 text-sm">
          <span>
            <FontAwesomeIcon icon={faGraduationCap} /> 10 Students
          </span>
        </p>
        <p className="text-sm">
          <span>
            <FontAwesomeIcon icon={faClock} /> Last updated
          </span>
          <span> 24/6/2024</span>
        </p>
      </header>
      <div className="relative flex flex-col justify-around pt-10 pb-32 bg-white md:flex-row md:space-x-3 lg:space-x-4">
        <div className="flex flex-col items-center relative h-[80vh] w-full md:w-3/5">
          {renderSelectedContent()}
          <img
            className="mt-4 w-96"
            src={ebook}
            alt="ebook image"
            loading="lazy"
          />
        </div>
        <div className="bg-white ">
          <div className="flex flex-col justify-center gap-3 px-5 md:flex-row md:space-x-3 md:gap-0 lg:space-x-4 md:px-0">
            <div className="w-full md:w-auto ">
              <Link
                to={`/ChatBot/${slug.slug}`}
                style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)" }}
                onClick=""
                className="bg-white rounded-[10px] px-5 py-3 flex flex-col justify-center items-center opacity-90 text-[#004682] font-bold cursor-pointer w-full"
              >
                <img
                  src={AIAssistantImage}
                  className="w-8 py-1.5"
                  alt="plus image"
                  loading="lazy"
                />
                <span>Chat Bot</span>
              </Link>
            </div>
          </div>
          <div className="px-4 mt-4 ">
            {userSections.map((ele, index) => (
              <div key={index} className="mb-2">
                <SectionHeader
                  sectionTitle={ele.title}
                  onClick={() => toggleSection(index)}
                  isOpen={openSection === index}
                />
                <SectionContent
                  slug={ele.slug}
                  access={access}
                  dispatch={dispatch}
                  onSelect={handleSelectContent}
                  isOpen={openSection === index}
                  selectedContentUrl={selectedContentUrl} // Pass the selectedContentUrl
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


export default UserContent;
