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
                    <h2 className="text-white text-xl">Parameter Information</h2>
                </div>
            </CardHeader>
            <CardBody>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">A</span> is the constant value of effort with projects of size which increases
                    </Paragraph>
                </div>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">B</span> is the constant of the exponential value of the relative economy and diseconomies
                    </Paragraph>
                </div>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">C</span> is the schedule coefficient value constant
                    </Paragraph>
                </div>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">D</span> is the base-exponent scaling value constant
                    </Paragraph>
                </div>
                <div>
                    <Paragraph color="blueGray">
                        <span className="font-bold">Set Default Button</span> is button when it click, it will set the parameter as default value for estimation formula
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
