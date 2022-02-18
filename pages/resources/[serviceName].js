import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Breadcrumb from "../../components/main/Breadcrumb";
import { FaList } from "react-icons/fa";
import Image from "../../components/main/Image";
import { MdAccountTree } from "react-icons/md";
import PageLoader from "../../components/loader/PageLoader";
import ResourceTable from "../../components/resource/ResourceTable";
import ResourceTree from "../../components/resource/ResourceTree";
import SearchInput from "../../components/input/SearchInput";
import { getUniqueResourceType } from "../../hooks/getUniqueData";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { useTextFilter } from "../../hooks/useFilter";

const SpecificResource = () => {
  const router = useRouter();
  const { serviceName: serviceQuery, resource_type: typeQuery } = router.query;
  const [resources, setResources] = useState([]); // all resource use for display
  const { loading, data } = useFetch("/api/resources", setResources, true);

  const [serviceName, setServiceName] = useState("");
  const [currentType, setCurrentType] = useState([]); // for display resourceType
  const [resourceType, setResourceType] = useState(getUniqueResourceType(data, serviceName)); // all resourceType
  const [displayType, setDisplayType] = useState("table");

  useEffect(() => {
    if (data.length) {
      setResources(data.filter((value) => value.serviceName === serviceName));
      setResourceType(getUniqueResourceType(data, serviceName));
    }
    if (router.isReady) {
      setServiceName(serviceQuery);
      // check query sting is includes in resourceType List
      if (getUniqueResourceType(data, serviceName).includes(typeQuery)) {
        setCurrentType(typeQuery);
      }
    }
  }, [data, router.isReady]);

  const changeType = (typeValue) => {
    if (currentType.includes(typeValue)) {
      const filtered = currentType.filter((value) => value !== typeValue);
      setCurrentType(filtered);
      if (filtered.length === 0) {
        // display all Data
        setResources(data.filter((value) => value.serviceName === serviceName));
      } else {
        // remove selected type
        setResources(data.filter((value) => filtered.includes(value.resourceType)));
      }
    } else {
      // display only selected type
      setCurrentType([...currentType, typeValue]);
      setResources(data.filter((value) => [...currentType, typeValue].includes(value.resourceType)));
    }
  };

  const resourceFilter = (inputValue) => {
    const allData = currentType.length === 0 ? data.filter((value) => value.serviceName === serviceName) : data.filter((value) => currentType.includes(value.resourceType));
    setResources(useTextFilter(allData, inputValue));
  };

  const changeDisplayRender = () => {
    return (
      <div className="flex items-center ml-6">
        <div className="flex md:justify-end ">
          <button className="w-10 h-10 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("table")}>
            <FaList size="1.4rem" color={displayType === "table" ? "#468ffd" : "#bdbdbd"} className="mx-auto" />
          </button>
          <button className="w-10 h-10 ml-3 dynamic-bg shadow-sm rounded" onClick={() => setDisplayType("tree")}>
            <MdAccountTree size="1.4rem" color={displayType === "tree" ? "#468ffd" : "#bdbdbd"} className="mx-auto" />
          </button>
        </div>
      </div>
    );
  };


  if (loading) {
    return <PageLoader />;
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-8">
          <Image classProps="rounded" src={`/images/resourceIcon/${serviceName}.png`} alt="service-Img" width={48} height={48} />
          <h1 className="ml-3 capitalize">{serviceName}</h1>
        </div>

        <AnimatePresence exitBeforeEnter>
          {displayType === "tree" ? (
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"tree"}>
              <div className={`mt-10 flex ${displayType === "table" ? "justify-between" : "justify-end"}`}>{router.asPath === "/resources/ec2" && changeDisplayRender() }</div>
              <ResourceTree />
            </motion.div>
          ) : (
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
              <Grid className="lg:grid-cols-2 md:gap-y-2 gap-3">
                {resourceType.length !== 1 && displayType !== "tree" && (
                  <>
                    {resourceType.map((value, index) => (
                      <button
                        key={index}
                        className={`flex justify-between items-center p-4 py-3 dynamic-bg shadow-sm rounded ${currentType.includes(value) && "active"}`}
                        onClick={() => changeType(value)}
                      >
                        <p className="capitalize text-left">{value}</p>
                        <h2 className="text-xl">{data.filter((value) => value.serviceName === serviceName).filter((item) => item.resourceType === value).length}</h2>
                      </button>
                    ))}
                  </>
                )}
              </Grid>
              <div className={`mt-10 flex ${displayType === "table" ? "justify-between" : "justify-end"}`}>
                <SearchInput setState={resourceFilter} />
                {router.asPath === "/resources/ec2" && changeDisplayRender()}
              </div>
              <ResourceTable resources={resources} setResources={setResources} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
  button {
    transition: 0.35s;
    &.active {
      box-shadow: 0 0 3px 2px ${(props) => props.theme.blue};
    }
  }
`;

export default SpecificResource;
