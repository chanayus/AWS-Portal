// import ResourceTreeItems from "./ResourceTreeItems";
// import { useFetch } from "../../hooks/useFetch";

// const ResourceTree = () => {
//   const { loading, data } = useFetch("/api/used", () => {}, false);
  
//   if (loading) {
//     return <></>;
//   } else {
//     return (
//       <div>
         
//         {(data.usedResources ?? []).map((item, index) => (
        
//          <div className="mb-12" key={index}> <ResourceTreeItems item={item} /></div>
//         ))}
//       </div>
//     );
//   }
// };

// export default ResourceTree;
