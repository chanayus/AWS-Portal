import { useEffect, useState, useContext } from "react"

import BoxLoader from "../loader/BoxLoader"
import ResourceTable from "../table/ResourceTable"
import ResourceTreeItems from "./ResourceTreeItems"
import { TableWrapper } from "../../styles/styleComponents"
import { autoTagFormatter } from "../../hooks/useFormat"
import dayjs from "dayjs"
import { useFetch } from "../../hooks/useFetch"
import { SetUserContext } from '../../pages/_app'

const ResourceTree = () => {
  const [used, setUsed] = useState([])
  const [unUsed, setUnUsed] = useState([])
  const { loading, data } = useFetch("/api/used", () => {}, false)
  const { user, getLocalUser } = useContext(SetUserContext)

  const mapFilterData = (json) => {

  }

  useEffect(() => {
    if (data.length !== 0) {
      data.unusedResources.map((value) => {
        value.region = value.ResourceARN.split(":")[3] === "" ? "-" : value.ResourceARN.split(":")[3]
        value.serviceName = value.ResourceARN.split(":")[2]
        value.Tags.map((item) => {
          if (item.Key === "cie2021") {
            value.owner = autoTagFormatter(item.Key, item.Value)
          } else {
            value[item.Key] = item.Value
          }
        })
      })
      console.log(data.usedResources)
      if (!user.user.isAdmin){
        const usedResources = data.usedResources.filter((value) => {
          let isOwner = value.Tags.some(tag => tag.Value === user.user.username)
          return isOwner > 0
        })
        const unusedResources = data.unusedResources.filter((value) => {
          return value.owner === user.user.username
        })
        setUsed(usedResources)
        setUnUsed(unusedResources)
      }
      else{
        setUsed(data.usedResources)
        setUnUsed(data.unusedResources)
      }
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
          {(used ?? []).map((item) => (
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
          <ResourceTable resources={unUsed} setResources={setUnUsed} />
        </div>
      </>
    )
  }
}

export default ResourceTree
