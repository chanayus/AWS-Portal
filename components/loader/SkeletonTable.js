import { TableWrapper } from "../../styles/styleComponents"

const SkeletonTable = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="skeleton w-1/3 h-4"></div>
        <div className="skeleton w-1/12 h-4"></div>
      </div>
      <TableWrapper className="mt-6">
        <table>
          <thead>
            <tr>
              <th>
                <div className="my-1 skeleton w-1/3 h-4"></div>
              </th>
              <th>
                <div className="my-1 skeleton w-1/3 h-4"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="my-1 skeleton w-1/2 h-4"></div>
              </td>
              <td>
                <div className="my-1 skeleton w-1/2 h-4"></div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="my-1 skeleton w-1/2 h-4"></div>
              </td>
              <td>
                <div className="my-1 skeleton w-1/2 h-4"></div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="skeleton w-1/2 h-4 bg-gray-400"></div>
              </td>
              <td>
                <div className="skeleton w-1/2 h-4 bg-gray-400"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </TableWrapper>
    </>
  )
}

export default SkeletonTable
