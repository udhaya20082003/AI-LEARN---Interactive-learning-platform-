import propsTypes from "prop-types";

// A component that allows users to upload an image file.
const ImageFileUploader = (props) => {
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    props.getImage(file);
  };

  return (
    <input
      type="file"
      name={props.name}
      id={props.name}
      accept="image/*" // Accepts all image formats
      className="hidden"
      onChange={handleUploadImage}
    />
  );
};
ImageFileUploader.propTypes = {
  name: propsTypes.string.isRequired,
  getImage: propsTypes.func.isRequired,
};

export default ImageFileUploader;
