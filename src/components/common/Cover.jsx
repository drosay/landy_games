const Cover = ({ url, name }) => {
  const coverStyles = {
    width: "100%",
    height: "100%",
  };
  return <img style={coverStyles} src={url} title={name} alt={name} />;
};

export default Cover;
