import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import H5 from '@material-tailwind/react/Heading5';
import LeadText from '@material-tailwind/react/LeadText';

export default function ProfileCard() {
    return (
        <Card>
            <div className="text-center">
                <H5 color="gray">Estimation Result</H5>
            </div>
            <CardBody>
                <div className="border-t border-lightBlue-200 text-center px-2 ">
                    <LeadText color="blueGray">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aliquam molestie nisi ac mauris dictum blandit. 
                    Fusce nec libero vitae libero sodales luctus. Sed feugiat tortor ac ipsum semper congue. 
                    Cras pulvinar, purus et molestie ultricies, sem dui congue ex, 
                    accumsan efficitur magna urna id nulla. Suspendisse ullamcorper at nibh eget imperdiet. 
                    </LeadText>
                </div>
            </CardBody>
        </Card>
    );
}
