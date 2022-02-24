import ResourceTreeItems from "./ResourceTreeItems";
import { useFetch } from "../../hooks/useFetch";
import BoxLoader from "../loader/BoxLoader";

const ResourceTree = () => {
  const { loading, data } = useFetch("/api/used", () => {}, false);

  if (loading) {
    return (
      <div className="flex justify-center mt-28 items-center">
        <BoxLoader />
      </div>
    );
  } else {
    return (
      <div>
        {(data ?? []).map((item, index) => (
          <div className="mb-12" key={item.resourceId}>
            <ResourceTreeItems item={item} />
          </div>
        ))}
      </div>
    );
  }
};

export default ResourceTree;
