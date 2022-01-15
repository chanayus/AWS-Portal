// import { HiChevronDown, HiChevronRight } from "react-icons/hi";

// import Image from "../main/Image";
// import { useState } from "react";

// const ResourceTreeItems = ({ item }) => {
//   const [showChildren, setShowChilden] = useState(false);

//   const handleClick = () => {
//     setShowChilden(!showChildren);
//   };
//   console.log(item);

//   return (
//     <>
//       <div onClick={() => handleClick()} className="dynamic-bg my-8 p-5 pl-3 flex items-center rounded shadow-sm cursor-pointer">
//         {showChildren && item.children ? (
//           <HiChevronDown className="hover:rotate-45 dynamic-text mr-2" size="2rem" />
//         ) : !showChildren && item.children ? (
//           <HiChevronRight className="hover:rotate-45 dynamic-text mr-2" size="2rem" />
//         ) : (
//           <div className="mr-5"></div>
//         )}
//         <Image classProps="w-10 mr-4 rounded" src={`/images/resourceIcon/${item.resourceType}.png`} width="36px" height="36px" alt="service-icon" />
//         <p className="w-max">{item.resourceId}</p>
//       </div>
//       {showChildren &&
//         (item.children ?? []).map((value) => (
//           <div className="ml-10">
//             <ResourceTreeItems item={value} />
//           </div>
//         ))}
//     </>
//   );
// };

// export default ResourceTreeItems;
