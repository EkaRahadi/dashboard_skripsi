import ParameterForm from 'components/ParameterForm';
import ResultCard from 'components/ResultCard';
import Sidebar from "components/Sidebar";
import { withRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { resultParameter } from "../store/index"

function Dashboard() {
    const param = useRecoilValue(resultParameter);
    return (
        <>
        <Sidebar/>
        <div className="md:ml-64">
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />
                <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-6">
                        <div className="xl:col-start-1 xl:col-end-5 px-4 mb-16">
                            <ParameterForm />
                        </div>
                        <div className="xl:col-start-5 xl:col-end-7 px-4 mb-16 mt-14">
                            <ResultCard data={param} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default withRouter(Dashboard);
