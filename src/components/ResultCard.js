import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import H5 from '@material-tailwind/react/Heading5';
import LeadText from '@material-tailwind/react/LeadText';
import React from 'react';

export default function ProfileCard(data) {
    return (
        <Card>
            <div className="text-center">
                <H5 color="gray">Estimation Result</H5>
            </div>
            <CardBody>
                <div className="border-t border-lightBlue-200 text-center px-2 ">
                    <LeadText color="blueGray">
                    {data.data}
                    </LeadText>
                </div>
            </CardBody>
        </Card>
    );
}
