const Image = ({ src, width, height, classProps, alt }) => {
  const errorHandle = (e) => {
    e.target.src = "/images/resourceIcon/not-found.png"
  }

  return <img className={classProps} src={src} width={width} height={height} loading="lazy" alt={alt} onError={(e) => errorHandle(e)} />
}

export default Image
