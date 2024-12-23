import programmer from "../../assets/images/homepage/programmer.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CourseCard from "../../shared/Courses/CourseCard";
import { useSelector } from "react-redux";

const settings = {
  dots: true,
  className: "center",
  centerMode: true,
  infinite: true,
  slidesToShow: 4,
  speed: 2000,
  autoplay: true,
  autoplaySpeed: 2000,
  rows: 1,
  slidesPerRow: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        centerPadding: "20px",
        slidesToShow: 2,
        slidesPerRow: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

const Courses = () => {
  const publicCourses = useSelector((state) => state.courses.publicCourses);

  const categories = useSelector((state) => state.courses.subjectCourses);

  // Render all courses categories:
  const coursesCategories =
    categories &&
    categories.map((item) => (
      <li
        key={item.id}
        className="p-2 font-playfair capitalize font-bold flex items-center justify-center text-[11px] lg:text-sm duration-300 border-2 rounded-lg lg:rounded-full hover:bg-black hover:text-white"
      >
        <Link to={`/all-courses/${item.slug}`}>{item.title}</Link>
      </li>
    ));

  // Render all courses inside a slider:
  const renderSuggestedCourses = publicCourses != undefined && (
    <Slider {...settings}>
      {publicCourses.map((course) => (
        <CourseCard key={course.slug} {...course} type={"Enroll"} />
      ))}
    </Slider>
  );

  return (
    <section className="container py-20 text-center">
      <div className="mb-10">
        <h2 className="text-3xl font-bold lg:mx-40 lg:text-4xl font-playfair">
          A broad selection of courses
        </h2>
        <h4 className="mt-6 text-base font-bold lg:text-xl text-primary-700">
          Build your ideas and implement them with the computer !
        </h4>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-2 mx-2 mb-10">
        {categories && coursesCategories}
      </ul>

      <div className="lg:w-3/4 relative mx-6 lg:mx-auto p-2 lg:p-8 bg-[#F7F2F2] border-2 shadow-lg rounded-3xl">
        <img
          src={programmer}
          alt="programmer"
          className="hidden md:block w-[80px] h-[80px] lg:w-[200px] lg:h-[200px] mb-4 absolute -top-8 -left-8 lg:-top-4 lg:-left-16 border-4 lg:border-8 border-secondary-700 rounded-full"
        />

        <p className="text-[11px] font-bold lg:text-xl lg:pl-[8rem] lg:text-start">
          Build your ideas and implement them with the computer !
        </p>
        <div className="flex items-center justify-center my-4 font-bold lg:text-sm leading-5 lg:leading-7 text-[10px] md:text-justify lg:pl-[8rem] md:px-[4rem] px-[2rem] lg:py-4">
          <p>
            Welcome, I am your assistant here to introduce you to
            programming,software, and the world of software, and to create your
            first application through a group of courses that qualify you for
            the labor market with the latest existing technologies, knowing that
            programming is fundamental to the technologies that humans have
            achieved.
          </p>
        </div>
        <Link
          to="/all-courses/"
          className="flex justify-end px-4 py-2 ml-auto text-[10px] text-white capitalize duration-200 rounded-lg lg:px-8 lg:py-4 w-fit lg:text-xl bg-primary-700 hover:bg-primary-500"
        >
          explore programming
        </Link>
      </div>

      {publicCourses != undefined &&
        publicCourses.length > 4 &&
        renderSuggestedCourses}
    </section>
  );
};

export default Courses;
