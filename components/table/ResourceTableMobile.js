import { CheckBox } from "../../styles/styleComponents"
import { FaCheck } from "react-icons/fa"
import Image from "../main/Image"
import { chooseHandle } from "../../hooks/selectHandle"
import dayjs from "dayjs"

const ResourceTableMobile = ({ value, isServicePage, displayResources, setDisplayResources }) => {
  return (
    <td className="hidden sm:block pt-3 px-3">
      <div className="hidden sm:flex justify-between items-center my-1 pb-1">
        <div className="flex items-center ">
          <Image
            classProps="w-8 rounded"
            src={`/images/resourceIcon/${value.serviceName}.png`}
            width={"24px"}
            height={"24px"}
            alt="service-icon-mobile"
          />
          <div className="flex flex-col justify-center ml-2">
            {isServicePage ? null : <p className="font-medium capitalize">{value.serviceName}</p>}
            {value.serviceName === value.resourceType ? null : <p>{value.resourceType}</p>}
          </div>
        </div>
        <div>
          <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, displayResources, setDisplayResources)}>
            {value.isChoose ? <FaCheck color="white" size="0.75rem" /> : null}
          </CheckBox>
        </div>
      </div>
      <div className="hidden sm:flex justify-between my-2 pt-1">
        <b>Region</b>
        <p className="text-right">{value.region ? value.region : "-"}</p>
      </div>
      <div className="hidden sm:flex justify-between my-2">
        <b>สร้างเมื่อ</b>
        <p className="text-right">
          {dayjs(value.createdAt).format("D/MM/YYYY H:mm") === "Invalid Date" ? "-" : dayjs(value.createdAt).format("D/MM/YYYY H:mm")}
        </p>
      </div>
      <div className="hidden sm:flex justify-between my-2">
        <b>สร้างโดย</b>
        <p className="text-right">{value.owner ? value.owner : "-"}</p>
      </div>
      <div className="hidden sm:flex justify-between my-2">
        <b>id</b>
        <p className="text-right">{`${value.resourceId.substring(0, 10)}${value.resourceId.length > 10 ? "..." : ""}`}</p>
      </div>
    </td>
  )
}

export default ResourceTableMobile
