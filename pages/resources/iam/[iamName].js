import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Breadcrumb from "../../../components/main/Breadcrumb";
import { HiUser } from "react-icons/hi";
import PageLoader from "../../../components/loader/PageLoader";
import ResourceTable from "../../../components/resource/ResourceTable";
import SearchInput from "../../../components/input/SearchInput";
import { useFetch } from "../../../hooks/useFetch";
import { useRouter } from "next/router";
import { useTextFilter } from "../../../hooks/useFilter";

const SpecificResource = () => {
  const router = useRouter();
  const [resources, setResources] = useState([]);
  const { iamName } = router.query;
  const { loading, data } = useFetch("/api/resources", setResources, true);

  useEffect(() => {
    setResources(data.filter((value) => value.owner === iamName));
  }, [data]);

  const resourceFilter = (inputValue) => {
    const allData = data.filter((value) => value.owner === iamName)
    setResources(useTextFilter(allData, inputValue))
  }

  if (loading) {
    return (
      <PageLoader/>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-16">
          <div className=" w-12 h-12 font-bold rounded-md bg-gradient-to-r from-rose-600 to-rose-500 flex items-center justify-center">
            <HiUser color="#fcfcfc" size="2.2rem" />
          </div>
          <h1 className="ml-3 capitalize">{iamName !== "-" ? iamName : "ไม่มีการระบุ IAM"}</h1>
        </div>
        <div className="mt-10">
          <SearchInput setState={resourceFilter}/>
        </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
            <ResourceTable resources={resources} setResources={setResources} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
};

export default SpecificResource;
