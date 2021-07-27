import Page from 'components/login/Page';
import EstimationForm from 'components/EstimationForm';
import ResultCard from 'components/ResultCard';
import { useRecoilValue } from "recoil";
import { resultCost } from "../store/index"

export default function LandingPage() {
    const cost = useRecoilValue(resultCost);
    return (
        <Page>
            <div className="px-3 md:px-8 h-40" />
                <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-6">
                        <div className="xl:col-start-1 xl:col-end-5 px-4 mb-16">
                            <EstimationForm />
                        </div>
                        <div className="xl:col-start-5 xl:col-end-7 px-4 mb-16 mt-14">
                            <ResultCard data={cost}/>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
