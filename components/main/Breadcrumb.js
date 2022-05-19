import { useEffect, useState } from "react"

import { IoChevronForward } from "react-icons/io5"
import Link from "next/link"
import { useRouter } from "next/router"

const Breadcrumb = () => {
  let fullPath = "/"

  const pathCondition = {
    "/resources/region": "/resources?type=region",
    "/resources/iam": "/resources?type=iam",
    "/cost/region": "/cost?type=region",
    "/cost/iam": "/cost?type=iam",
  }
  const router = useRouter()
  const { asPath } = router
  const buffer = []
  const [path, setPath] = useState([])

  useEffect(() => {
    asPath.split("/").map((value, index) => {
      const obj = {}
      fullPath = index > 1 ? fullPath + "/" + value : fullPath + value
      obj.pathName = pathCondition[fullPath] ?? fullPath
      if (value.indexOf("?") >= 0) {
        obj.displayLink = value.slice(0, value.indexOf("?"))
      } else {
        obj.displayLink = value
      }
      obj.displayLink !== "detail" && buffer.push(obj)
      setPath(buffer)
    })
  }, [])

  return (
    <div className="flex items-center mb-4">
      {path.map((value, index) => (
        <div className="flex items-center dynamic-text" key={index}>
          <Link href={`${value.pathName}`}>
            <a className={`max-w-[22.5vw] truncate  capitalize ${index === path.length - 1 ? null : "opacity-70"}`}>
              {value.displayLink === "" ? "home" : value.displayLink}
            </a>
          </Link>
          {index === path.length - 1 ? null : <IoChevronForward size="1.1rem" className="opacity-70" style={{ margin: "0 8px" }} />}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumb
