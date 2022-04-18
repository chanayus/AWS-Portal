const Image = ({ src, width, height, classProps, alt, clickFunc = () => {} }) => {
  const errorHandle = (e) => {
    e.target.src = "/images/resourceIcon/not-found.png"
  }

  return (
    <img
      className={classProps}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      alt={alt}
      onError={(e) => errorHandle(e)}
      onClick={() => clickFunc()}
    />
  )
}

export default Image
