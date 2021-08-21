import React from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Paragraph from "@material-tailwind/react/Paragraph";

export default function EstimationForm() {
    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-xl">Estimation Cost Information</h2>
                </div>
            </CardHeader>
            <CardBody>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">KSLOC</span> is Thousands of Source Lines of Code i.e number of Lines of Code
                    </Paragraph>
                </div>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">Effort Multiplier</span> is the result of multiplication from 17 Cost Drivers
                    </Paragraph>
                </div>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">UMR</span> is the average amount of salary employee used for Calculate Monthly and Total Cost
                    </Paragraph>
                </div>
                <Button
                      color="blue"
                      buttonType="filled"
                      size="regular"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => {window.history.back()}}
                    >
                        Back
                    </Button>
            </CardBody>
        </Card>
    );
}
