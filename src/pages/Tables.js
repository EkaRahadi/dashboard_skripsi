import TableCard from "components/TableCard";
import Sidebar from "components/Sidebar";
import { withRouter } from "react-router-dom";

function Dashboard() {
  return (
    <>
    <Sidebar/>
    <div className="md:ml-64">
      <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto"></div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <TableCard />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default withRouter(Dashboard);
