import BoxLoader from "./BoxLoader"

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center absolute w-full left-0 top-1/3 ">
      <div className="flex flex-col justify-center items-center rounded-md">
        <BoxLoader />
        <h2 className="font-light text-xl">Loading</h2>
      </div>
    </div>
  )
}

export default PageLoader
