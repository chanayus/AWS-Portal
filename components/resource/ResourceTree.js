import { useEffect, useState } from "react"

import BoxLoader from "../loader/BoxLoader"
import ResourceTreeItems from "./ResourceTreeItems"
import { TableWrapper } from "../../styles/styleComponents"
import { autoTagFormatter } from "../../hooks/useFormat"
import dayjs from "dayjs"
import { useFetch } from "../../hooks/useFetch"

const ResourceTree = () => {
  const { loading, data } = useFetch("/api/used", () => {}, false)
  const [unUsed, setUnUsed] = useState([])
  const manualTagCondition = ["cie21", "ict21"]

  useEffect(() => {
    if (data.length !== 0) {
      data.unusedResources.map((value) => {
        value.Tags.map((item) => {
          if (item.Key === "cie2021") {
            value.owner = autoTagFormatter(item.Key, item.Value)
          } else {
            value[item.Key] = item.Value
          }
        })
      })
      setUnUsed(data.unusedResources)
    }
  }, [data])

  if (loading) {
    return (
      <div className="flex justify-center mt-28 items-center">
        <BoxLoader />
      </div>
    )
  } else {
    return (
      <>
        <div layout className="mt-4">
          <div className="flex items-center opacity-80">
            <h2 className="text-2xl whitespace-nowrap mr-3">Used Resources</h2>
            <div className="w-full h-[2px] dynamic-bg-invert"></div>
          </div>
          {(data.usedResources ?? []).map((item) => (
            <div className="mb-12" key={item.resourceId}>
              <ResourceTreeItems item={item} />
            </div>
          ))}
        </div>

        <div layout className="mt-4">
          <div className="flex items-center opacity-80">
            <h2 className="text-2xl whitespace-nowrap mr-3">Unused Resources</h2>
            <div className="w-full h-[2px] dynamic-bg-invert"></div>
          </div>
          <TableWrapper className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <table>
              <thead className="non-sticky sm:hidden">
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>สร้างเมื่อ</th>
                  <th>สร้างโดย</th>
                </tr>
              </thead>
              <tbody>
                {unUsed.map((value, index) => (
                  <tr key={index}>
                    <td className="sm:hidden">{value.resourceType}</td>
                    <td className="sm:hidden">{value.Name ?? "-"}</td>
                    <td className="sm:hidden">
                      {dayjs(value.createdAt).format("D/MM/YYYY H:mm") === "Invalid Date" ? "-" : dayjs(value.createdAt).format("D/MM/YYYY H:mm")}
                    </td>
                    <td className="sm:hidden">{value.owner}</td>

                    <td className="hidden sm:block pt-3 px-3 w-full">
                      <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                        <b>Type</b>
                        <p className="text-right">{value.resourceType}</p>
                      </div>
                      <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                        <b>Name</b>
                        <p className="text-right">{value.Name ?? "-"}</p>
                      </div>
                      <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                        <b>สร้างเมื่อ</b>
                        <p className="text-right">
                          {dayjs(value.createdAt).format("D/MM/YYYY H:mm") === "Invalid Date" ? "-" : dayjs(value.createdAt).format("D/MM/YYYY H:mm")}
                        </p>
                      </div>
                      <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                        <b>สร้างโดย</b>
                        <p className="text-right">{value.owner}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </div>
      </>
    )
  }
}

export default ResourceTree
